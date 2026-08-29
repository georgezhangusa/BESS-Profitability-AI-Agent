import { BESSConfig } from '../types';

export interface DegradationMetrics {
  marginalCostPerMWh: number; // $/MWh baseline
  equivalentFullCycles: number; // EFC per day
  dodStressFactor: number; // Non-linear multiplier
  dailyCapacityLossPct: number; // e.g. 0.005%
  estimatedYearsTo80PctSoH: number; // Years until 80% End-of-Life
  warrantyCyclesUsedPerDay: number;
  warrantyStatus: 'Compliant' | 'Warning' | 'Exceeded';
  totalInstalledCapEx: number; // $ Total capital cost
  paybackPeriodYears: number;
  tenYearRoIPct: number;
  lcosPerMWh: number; // Levelized cost of storage ($/MWh)
}

export function calculateLfpDodStress(depthOfDischargePct: number): number {
  // LFP non-linear stress curve:
  // Shallow cycling (e.g. 20-50% DoD) exerts much less mechanical strain than 90-100% full swing
  // Empirical LFP stress formula: Stress = (DoD / 0.80)^1.8
  const dodNormalized = Math.max(0.05, Math.min(1.0, depthOfDischargePct));
  return Math.pow(dodNormalized / 0.80, 1.8);
}

export function calculateDegradationAndRoI(
  config: BESSConfig,
  totalChargedMWh: number,
  totalDischargedMWh: number,
  netDailyProfit: number,
  maxDailyDoD: number
): DegradationMetrics {
  const { capacityMWh, replacementCostPerMWh, warrantiedEFC, maxCyclesPerDay, roundTripEfficiency } = config;

  // Capital expenditure benchmark ($300k/MWh for 4MWh with containerized inverter + balance of plant)
  const capexPerMWh = capacityMWh >= 16 ? 260000 : capacityMWh >= 8 ? 285000 : 310000;
  const totalInstalledCapEx = capacityMWh * capexPerMWh;

  // Equivalent Full Cycles (EFC) = (Total Discharged MWh + Total Charged MWh) / (2 * Usable Capacity MWh)
  const usableCapacityMWh = capacityMWh * (config.maxSoC - config.minSoC);
  const throughputMWh = (totalChargedMWh + totalDischargedMWh) / 2;
  const equivalentFullCycles = throughputMWh / Math.max(0.1, usableCapacityMWh);

  // Non-linear DoD Stress Factor
  const dodStressFactor = calculateLfpDodStress(maxDailyDoD);

  // Marginal Degradation Cost per MWh Discharged ($/MWh)
  const baseDegradationPerMWh = (replacementCostPerMWh / (warrantiedEFC * roundTripEfficiency));
  const marginalCostPerMWh = baseDegradationPerMWh * dodStressFactor;

  // Daily capacity loss percentage (LFP standard ~0.0033% per EFC to hit 20% loss at 6,000 EFC)
  const dailyCapacityLossPct = (equivalentFullCycles / warrantiedEFC) * 20; // % loss of capacity
  
  // Estimated battery life in years based on daily cycling
  const annualCycles = equivalentFullCycles * 365;
  const estimatedYearsTo80PctSoH = annualCycles > 0 ? Math.min(20, warrantiedEFC / annualCycles) : 15;

  // Warranty evaluation
  const warrantyCyclesUsedPerDay = equivalentFullCycles;
  let warrantyStatus: 'Compliant' | 'Warning' | 'Exceeded' = 'Compliant';
  if (equivalentFullCycles > maxCyclesPerDay * 1.15) {
    warrantyStatus = 'Exceeded';
  } else if (equivalentFullCycles > maxCyclesPerDay * 0.95) {
    warrantyStatus = 'Warning';
  }

  // Financial Metrics:
  // Annualized net cash flow
  const annualizedNetProfit = netDailyProfit * 365;
  
  // Payback Period (CapEx / Annualized Net Cash Flow)
  const paybackPeriodYears = annualizedNetProfit > 0 ? totalInstalledCapEx / annualizedNetProfit : 99;

  // 10-Year RoI %: (10 * Net Profit - CapEx) / CapEx * 100
  const tenYearNet = (annualizedNetProfit * 10) - totalInstalledCapEx;
  const tenYearRoIPct = Math.round((tenYearNet / totalInstalledCapEx) * 100);

  // Levelized Cost of Storage (LCOS) in $/MWh
  // Total Lifetime Costs / Total Lifetime Discharged Energy
  const lifetimeYears = Math.min(15, estimatedYearsTo80PctSoH);
  const lifetimeDischargedMWh = totalDischargedMWh * 365 * lifetimeYears;
  const lifetimeOpex = totalInstalledCapEx * 0.018 * lifetimeYears; // 1.8% annual O&M + insurance
  const totalLifetimeCost = totalInstalledCapEx + lifetimeOpex + (annualizedNetProfit > 0 ? 0 : 0);
  const lcosPerMWh = lifetimeDischargedMWh > 0 ? (totalLifetimeCost / lifetimeDischargedMWh) : 165;

  return {
    marginalCostPerMWh: Math.round(marginalCostPerMWh * 100) / 100,
    equivalentFullCycles: Math.round(equivalentFullCycles * 1000) / 1000,
    dodStressFactor: Math.round(dodStressFactor * 100) / 100,
    dailyCapacityLossPct: Math.round(dailyCapacityLossPct * 10000) / 10000,
    estimatedYearsTo80PctSoH: Math.round(estimatedYearsTo80PctSoH * 10) / 10,
    warrantyCyclesUsedPerDay: Math.round(warrantyCyclesUsedPerDay * 100) / 100,
    warrantyStatus,
    totalInstalledCapEx,
    paybackPeriodYears: Math.round(paybackPeriodYears * 10) / 10,
    tenYearRoIPct,
    lcosPerMWh: Math.round(lcosPerMWh * 100) / 100,
  };
}
