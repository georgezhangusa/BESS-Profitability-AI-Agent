export type ISOType = 'CAISO' | 'ERCOT' | 'PJM' | 'ISO-NE' | 'NYISO';

export type BESSCapacity = 4 | 8 | 16;

export interface MarketNode {
  id: string;
  name: string;
  iso: ISOType;
  description: string;
  volatility: 'Moderate' | 'High' | 'Extreme';
  avgSpread: number;
}

export interface BESSConfig {
  capacityMWh: BESSCapacity;
  inverterMW: number; // e.g. 2 MW for 4 MWh (2h duration, 0.5C)
  durationHours: number;
  chemistry: 'LFP' | 'NMC';
  roundTripEfficiency: number; // e.g. 0.88 (88%)
  maxSoC: number; // e.g. 0.95 (95%)
  minSoC: number; // e.g. 0.05 (5%)
  initialSoC: number; // e.g. 0.50 (50%)
  auxiliaryLoadPct: number; // e.g. 0.02 (2% continuous HVAC/BMS tare)
  replacementCostPerMWh: number; // e.g. $125,000 / MWh
  warrantiedEFC: number; // e.g. 6000 cycles
  maxCyclesPerDay: number; // e.g. 1.25 cycles/day warranty cap
}

export interface HourlyMarketData {
  hour: number;
  timeLabel: string;
  // Historical 5 years of LMPs on same calendar day ($/MWh)
  historyYears: {
    year2021: number;
    year2022: number;
    year2023: number;
    year2024: number;
    year2025: number;
  };
  historicalAvgLMP: number;
  forecastLMP: number; // Predicted Day-Ahead LMP ($/MWh)
  realTimeLMP: number; // Predicted Real-Time LMP ($/MWh)
  systemDemandMW: number; // Grid Demand (GW or MW)
  renewableGenerationMW: number; // Solar + Wind output
  ancillaryServicePrice: number; // Reg Up / Spin reserve price ($/MW-h)
}

export interface HourlyDispatchResult {
  hour: number;
  timeLabel: string;
  lmp: number;
  demandMW: number;
  action: 'CHARGE' | 'DISCHARGE' | 'HOLD' | 'REG_UP' | 'SPIN_RESERVE';
  powerMW: number; // Positive for discharge, negative for charge
  energyChargedMWh: number;
  energyDischargedMWh: number;
  ancillaryServiceMW: number;
  socStart: number; // 0.0 to 1.0
  socEnd: number; // 0.0 to 1.0
  arbitrageRevenue: number;
  ancillaryRevenue: number;
  auxiliaryCost: number;
  degradationCost: number;
  netHourlyProfit: number;
  cycleStress: number; // Non-linear DoD penalty weight
}

export interface DispatchSummary {
  totalGrossArbitrage: number;
  totalAncillaryRevenue: number;
  totalRevenue: number;
  totalDegradationCost: number;
  totalAuxiliaryCost: number;
  netDailyProfit: number;
  equivalentFullCycles: number;
  roundTripEfficiencyActual: number;
  averageDischargePrice: number;
  averageChargePrice: number;
  priceSpreadCaptured: number;
  energyDischargedTotalMWh: number;
  energyChargedTotalMWh: number;
  annualizedRoiPct: number;
  annualizedNetRevenue: number;
  estimatedBatteryLifeYears: number;
  warrantyCompliance: 'Compliant' | 'Warning' | 'Exceeded';
}

export interface MarketIntelligence {
  duckCurveSeverity: 'Mild' | 'Moderate' | 'Severe';
  peakPriceHour: number;
  lowPriceHour: number;
  maxSpread: number;
  riskFactor: string;
  renewableCurtailementRisk: boolean;
}

export interface SensitivityScenario {
  name: string;
  gasPriceModifier: number; // e.g. 1.0, 1.3 (+30%), 0.7 (-30%)
  weatherModifier: 'Normal' | 'Heatwave (+8°F)' | 'Cold Snap (-15°F)';
  batteryCostModifier: number; // $/MWh
  arbitrageProfit: number;
  netProfit: number;
  roiPct: number;
}
