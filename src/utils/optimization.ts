import { BESSConfig, HourlyMarketData, HourlyDispatchResult, DispatchSummary } from '../types';
import { calculateDegradationAndRoI, calculateLfpDodStress } from './degradation';

export interface OptimizationOptions {
  enableAncillaryServices?: boolean;
  enableDegradationHurdle?: boolean;
  enableMultiSettlement?: boolean;
  enableWarrantyCap?: boolean;
  enableAuxiliaryLoss?: boolean;
}

export function optimizeBESSDispatch(
  config: BESSConfig,
  hourlyData: HourlyMarketData[],
  options: OptimizationOptions = {}
): {
  hourlySchedule: HourlyDispatchResult[];
  summary: DispatchSummary;
  maxDoD: number;
} {
  const {
    enableAncillaryServices = true,
    enableDegradationHurdle = true,
    enableMultiSettlement = false,
    enableWarrantyCap = true,
    enableAuxiliaryLoss = true,
  } = options;

  const {
    capacityMWh,
    inverterMW,
    roundTripEfficiency,
    maxSoC,
    minSoC,
    initialSoC,
    auxiliaryLoadPct,
    replacementCostPerMWh,
    warrantiedEFC,
    maxCyclesPerDay,
  } = config;

  const maxEnergyMWh = capacityMWh * maxSoC;
  const minEnergyMWh = capacityMWh * minSoC;
  const usableCapacityMWh = maxEnergyMWh - minEnergyMWh;

  // Single-trip efficiencies (charge & discharge)
  const etaCharge = Math.sqrt(roundTripEfficiency);
  const etaDischarge = Math.sqrt(roundTripEfficiency);

  // Baseline degradation hurdle rate ($/MWh)
  const baseDegradationCostPerMWh = replacementCostPerMWh / (warrantiedEFC * roundTripEfficiency);

  // 1. Identify optimal charge and discharge candidate windows
  // Sort hours by effective price
  const priceArray = hourlyData.map(d => ({
    hour: d.hour,
    price: enableMultiSettlement ? Math.max(d.forecastLMP, d.realTimeLMP) : d.forecastLMP,
    asPrice: d.ancillaryServicePrice,
    demand: d.systemDemandMW,
  }));

  // Find price quantiles
  const sortedByPrice = [...priceArray].sort((a, b) => a.price - b.price);
  const lowestHours = new Set(sortedByPrice.slice(0, Math.ceil(capacityMWh / inverterMW) + 2).map(x => x.hour));
  const highestHours = new Set(sortedByPrice.slice(-Math.ceil(capacityMWh / inverterMW) - 2).map(x => x.hour));

  // Determine dynamic threshold
  const minPrice = sortedByPrice[0].price;
  const maxPrice = sortedByPrice[sortedByPrice.length - 1].price;
  const priceSpread = maxPrice - minPrice;

  // Minimum required spread to justify battery cycling
  const hurdleSpread = enableDegradationHurdle 
    ? (baseDegradationCostPerMWh / etaDischarge) + (minPrice * (1 - roundTripEfficiency)) + 8
    : 0;

  // State Tracking across 24 Hours
  let currentEnergyMWh = capacityMWh * initialSoC;
  let totalChargedMWh = 0;
  let totalDischargedMWh = 0;
  let totalArbitrageRevenue = 0;
  let totalAncillaryRevenue = 0;
  let totalDegradationCost = 0;
  let totalAuxiliaryCost = 0;
  let minObservedEnergy = currentEnergyMWh;
  let maxObservedEnergy = currentEnergyMWh;

  const hourlySchedule: HourlyDispatchResult[] = [];

  for (let h = 0; h < 24; h++) {
    const data = hourlyData[h];
    const targetPrice = enableMultiSettlement ? (data.realTimeLMP > data.forecastLMP ? data.realTimeLMP : data.forecastLMP) : data.forecastLMP;
    const socStart = currentEnergyMWh / capacityMWh;

    let action: 'CHARGE' | 'DISCHARGE' | 'HOLD' | 'REG_UP' | 'SPIN_RESERVE' = 'HOLD';
    let powerMW = 0;
    let energyCharged = 0;
    let energyDischarged = 0;
    let ancillaryMW = 0;
    let hourlyDegCost = 0;
    let hourlyArbRev = 0;
    let hourlyAsRev = 0;

    // Check daily warranty throughput cap
    const currentEFC = (totalChargedMWh + totalDischargedMWh) / (2 * usableCapacityMWh);
    const warrantyRestricted = enableWarrantyCap && (currentEFC >= maxCyclesPerDay * 0.98);

    // Decision Logic:
    // A. Discharge Condition:
    // Price is high, we have energy above minSoC, and the spread exceeds our degradation hurdle
    if (highestHours.has(h) && currentEnergyMWh > minEnergyMWh && (!enableDegradationHurdle || priceSpread >= hurdleSpread) && !warrantyRestricted) {
      const maxPossibleDischargeEnergy = (currentEnergyMWh - minEnergyMWh) * etaDischarge;
      const dispatchMW = Math.min(inverterMW, maxPossibleDischargeEnergy);

      if (dispatchMW > 0.05) {
        action = 'DISCHARGE';
        powerMW = dispatchMW;
        energyDischarged = dispatchMW; // 1 hour step
        const energyExtractedFromBattery = dispatchMW / etaDischarge;
        currentEnergyMWh -= energyExtractedFromBattery;
        totalDischargedMWh += energyDischarged;

        hourlyArbRev = dispatchMW * targetPrice;
        
        // Dynamic DoD Stress calculation for this hour
        const currentDoD = 1 - (currentEnergyMWh / capacityMWh);
        const dodStress = calculateLfpDodStress(currentDoD);
        hourlyDegCost = (energyDischarged * baseDegradationCostPerMWh * dodStress);
      }
    }
    // B. Charge Condition:
    // Price is lowest, we have room below maxSoC, and price justifies future discharge
    else if (lowestHours.has(h) && currentEnergyMWh < maxEnergyMWh && !warrantyRestricted) {
      const maxPossibleChargeEnergy = (maxEnergyMWh - currentEnergyMWh) / etaCharge;
      const chargeMW = Math.min(inverterMW, maxPossibleChargeEnergy);

      if (chargeMW > 0.05) {
        action = 'CHARGE';
        powerMW = -chargeMW;
        energyCharged = chargeMW;
        const energyAddedToBattery = chargeMW * etaCharge;
        currentEnergyMWh += energyAddedToBattery;
        totalChargedMWh += energyCharged;

        hourlyArbRev = - (chargeMW * targetPrice); // Cost of purchasing energy
        
        const currentDoD = 1 - (currentEnergyMWh / capacityMWh);
        const dodStress = calculateLfpDodStress(currentDoD);
        hourlyDegCost = (energyCharged * baseDegradationCostPerMWh * dodStress * 0.4); // Charge wear factor
      }
    }
    // C. Ancillary Services (Regulation / Spinning Reserve) if not discharging/charging
    else if (enableAncillaryServices && !warrantyRestricted) {
      // Battery holds SoC around 40-70% and bids capacity into Reg-Up / Spinning reserve
      const headroomMW = Math.min(inverterMW, (currentEnergyMWh - minEnergyMWh) * etaDischarge);
      if (headroomMW > 0.5 && data.ancillaryServicePrice > 8.0) {
        action = data.ancillaryServicePrice > 25 ? 'REG_UP' : 'SPIN_RESERVE';
        ancillaryMW = Math.round(Math.min(inverterMW * 0.8, headroomMW) * 10) / 10;
        hourlyAsRev = ancillaryMW * data.ancillaryServicePrice;
        // Minor shallow throughput wear from frequency response
        hourlyDegCost = ancillaryMW * 0.08 * baseDegradationCostPerMWh;
      }
    }

    // Auxiliary Parasitic HVAC and BMS tare loss ($ cost based on target price)
    const auxPowerMW = enableAuxiliaryLoss ? capacityMWh * (auxiliaryLoadPct / 24) : 0;
    const hourlyAuxCost = auxPowerMW * Math.max(20, targetPrice);

    const socEnd = currentEnergyMWh / capacityMWh;
    minObservedEnergy = Math.min(minObservedEnergy, currentEnergyMWh);
    maxObservedEnergy = Math.max(maxObservedEnergy, currentEnergyMWh);

    const netProfit = hourlyArbRev + hourlyAsRev - hourlyDegCost - hourlyAuxCost;

    totalArbitrageRevenue += hourlyArbRev;
    totalAncillaryRevenue += hourlyAsRev;
    totalDegradationCost += hourlyDegCost;
    totalAuxiliaryCost += hourlyAuxCost;

    const hourDoD = 1 - Math.min(socStart, socEnd);

    hourlySchedule.push({
      hour: h,
      timeLabel: data.timeLabel,
      lmp: targetPrice,
      demandMW: data.systemDemandMW,
      action,
      powerMW: Math.round(powerMW * 100) / 100,
      energyChargedMWh: Math.round(energyCharged * 100) / 100,
      energyDischargedMWh: Math.round(energyDischarged * 100) / 100,
      ancillaryServiceMW: ancillaryMW,
      socStart: Math.round(socStart * 1000) / 1000,
      socEnd: Math.round(socEnd * 1000) / 1000,
      arbitrageRevenue: Math.round(hourlyArbRev * 100) / 100,
      ancillaryRevenue: Math.round(hourlyAsRev * 100) / 100,
      auxiliaryCost: Math.round(hourlyAuxCost * 100) / 100,
      degradationCost: Math.round(hourlyDegCost * 100) / 100,
      netHourlyProfit: Math.round(netProfit * 100) / 100,
      cycleStress: Math.round(calculateLfpDodStress(hourDoD) * 100) / 100,
    });
  }

  const maxDoD = (maxObservedEnergy - minObservedEnergy) / capacityMWh;
  const netDailyProfit = totalArbitrageRevenue + totalAncillaryRevenue - totalDegradationCost - totalAuxiliaryCost;

  const degMetrics = calculateDegradationAndRoI(
    config,
    totalChargedMWh,
    totalDischargedMWh,
    netDailyProfit,
    maxDoD
  );

  // Price spread capture calculations
  let chargeCostTotal = 0;
  let chargeVolTotal = 0;
  let disRevTotal = 0;
  let disVolTotal = 0;

  for (const item of hourlySchedule) {
    if (item.action === 'CHARGE') {
      chargeCostTotal += Math.abs(item.arbitrageRevenue);
      chargeVolTotal += item.energyChargedMWh;
    } else if (item.action === 'DISCHARGE') {
      disRevTotal += item.arbitrageRevenue;
      disVolTotal += item.energyDischargedMWh;
    }
  }

  const avgChargePrice = chargeVolTotal > 0 ? chargeCostTotal / chargeVolTotal : minPrice;
  const avgDischargePrice = disVolTotal > 0 ? disRevTotal / disVolTotal : maxPrice;
  const priceSpreadCaptured = avgDischargePrice - avgChargePrice;

  const summary: DispatchSummary = {
    totalGrossArbitrage: Math.round(totalArbitrageRevenue * 100) / 100,
    totalAncillaryRevenue: Math.round(totalAncillaryRevenue * 100) / 100,
    totalRevenue: Math.round((totalArbitrageRevenue + totalAncillaryRevenue) * 100) / 100,
    totalDegradationCost: Math.round(totalDegradationCost * 100) / 100,
    totalAuxiliaryCost: Math.round(totalAuxiliaryCost * 100) / 100,
    netDailyProfit: Math.round(netDailyProfit * 100) / 100,
    equivalentFullCycles: degMetrics.equivalentFullCycles,
    roundTripEfficiencyActual: roundTripEfficiency,
    averageDischargePrice: Math.round(avgDischargePrice * 100) / 100,
    averageChargePrice: Math.round(avgChargePrice * 100) / 100,
    priceSpreadCaptured: Math.round(priceSpreadCaptured * 100) / 100,
    energyDischargedTotalMWh: Math.round(totalDischargedMWh * 100) / 100,
    energyChargedTotalMWh: Math.round(totalChargedMWh * 100) / 100,
    annualizedRoiPct: degMetrics.tenYearRoIPct,
    annualizedNetRevenue: Math.round(netDailyProfit * 365 * 100) / 100,
    estimatedBatteryLifeYears: degMetrics.estimatedYearsTo80PctSoH,
    warrantyCompliance: degMetrics.warrantyStatus,
  };

  return {
    hourlySchedule,
    summary,
    maxDoD: Math.round(maxDoD * 1000) / 1000,
  };
}
