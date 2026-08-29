export type Language = 'en' | 'zh' | 'fr';

export interface TranslationDict {
  // Header
  appTitle: string;
  appVersion: string;
  appDeveloper: string;
  scadaOnline: string;
  liveScada: string;
  languageSelect: string;

  // Common / General
  mwh: string;
  mw: string;
  hours: string;
  days: string;
  years: string;
  day: string;
  year: string;
  perDay: string;
  perYear: string;
  perMWh: string;
  perMW: string;
  compliant: string;
  breachRisk: string;
  close: string;
  retry: string;
  today: string;
  tomorrow: string;
  yesterday: string;
  active: string;
  enabled: string;
  disabled: string;
  done: string;

  // Tabs
  tabDispatch: string;
  tabOverview: string;
  tabForecast: string;
  tabDegradation: string;
  tabMarginImprovement: string;

  // Config Panel
  configTitle: string;
  resetDefaults: string;
  targetTradingDate: string;
  quickPresets: string;
  presetTomorrow: string;
  presetSummer: string;
  presetWinter: string;
  presetSpring: string;
  summerPeak: string;
  solarDuckSpring: string;
  winterFreeze: string;
  wholesaleMarketIso: string;
  pricingNode: string;
  pricingNodeHub: string;
  nodeVolatility: string;
  nodeSpread: string;
  bessCapacity: string;
  bessCapacityLfp: string;
  bessDuration: string;
  cRate: string;
  defaultLabel: string;
  stackLabel: string;
  inverterRating: string;
  operationalStrategy: string;
  operationalConstraints: string;
  ancillaryServices: string;
  ancillaryServicesDesc: string;
  ancillaryServicesAs: string;
  degradationHurdle: string;
  degradationHurdleDesc: string;
  dodDegradationHurdle: string;
  multiSettlement: string;
  multiSettlementDesc: string;
  multiSettlementDamRtm: string;
  oemWarrantyCap: string;
  oemWarrantyCapDesc: string;
  auxiliaryLoss: string;
  auxiliaryLossDesc: string;
  scenarioSensitivities: string;
  gasPriceModifier: string;
  weatherTempAnomaly: string;
  profile: string;
  peakWindow: string;
  lowWindow: string;

  // Operations Overview Header Cards
  netDailyMargin: string;
  runRate: string;
  wholesaleSpread: string;
  capture: string;
  ancillaryServicesCoop: string;
  spinAndReg: string;
  coOptimized: string;
  dailyDegradation: string;
  peakDoD: string;
  assetHealthPayback: string;
  assetHealthAndPayback: string;
  lifespan: string;
  yrsLifespan: string;
  capexPayoff: string;

  // AI Advisor Card
  aiAdvisorTitle: string;
  aiAdvisorDesc: string;
  generateBriefing: string;
  rerunBriefing: string;
  synthesizing: string;
  aiAdvisorPlaceholder: string;
  analyzeNow: string;
  analyzingBaseline: string;

  // 24-Hour Dispatch Plan View
  dispatchTitle: string;
  dispatchDesc: string;
  optimalDispatchTitle: string;
  optimalDispatchSubtitle: string;
  exportCsv: string;
  exportDispatchCsv: string;
  dispatchLmp: string;
  dispatchPower: string;
  chargePower: string;
  dischargePower: string;
  asReserve: string;
  socCurve: string;
  netMargin: string;
  totalEnergyCharged: string;
  totalEnergyDischarged: string;
  roundTripEfficiency: string;
  dailyCycles: string;
  maxDoDReached: string;
  grossDischarged: string;
  avgSell: string;
  grossCharged: string;
  avgBuy: string;
  capturedSpread: string;
  arbitrageCapture: string;
  dailyNetCashFlow: string;
  afterDegAux: string;
  powerDispatchMwLmp: string;
  dischargeSellChargeBuy: string;
  wholesaleLmpChart: string;
  dischargePowerMw: string;
  chargePowerMw: string;
  asReserveMw: string;
  stateOfChargePct: string;
  socTrajectory: string;
  minLimit: string;
  maxLimit: string;
  dispatchScheduleTable: string;
  settlementTableTitle: string;
  clickRowDrilldown: string;
  hourCol: string;
  lmpCol: string;
  actionCol: string;
  powerMwCol: string;
  energyMwhCol: string;
  socTrajectoryCol: string;
  arbitragePlCol: string;
  asRevenueCol: string;
  degCostCol: string;
  netMarginCol: string;
  colHour: string;
  colTime: string;
  colAction: string;
  colLmp: string;
  colPower: string;
  colCharged: string;
  colDischarged: string;
  colAsReserve: string;
  colSoC: string;
  colArbRev: string;
  colAsRev: string;
  colDegradation: string;
  colAuxCost: string;
  colNetProfit: string;
  actionCharge: string;
  actionDischarge: string;
  actionStandby: string;
  actionAncillary: string;
  actionRegUp: string;
  actionSpinRes: string;
  actionHoldIdle: string;

  // 5-Year Market Forecast View
  forecastTitle: string;
  forecastDesc: string;
  marketForecastTitle: string;
  marketForecastSubtitle: string;
  atHub: string;
  viewPrices: string;
  viewDemand: string;
  viewCoPlot: string;
  lmpWholesalePrices: string;
  gridDemandRenewables: string;
  combinedCoPlot: string;
  forecastPriceSpread: string;
  arbitrageReady: string;
  peakPredictedLmp: string;
  sunsetRamp: string;
  lowestOffPeakLmp: string;
  negativeLmp: string;
  optimalChargingLull: string;
  fiveYrHistPeakAvg: string;
  mean20212025: string;
  duckRampDepth: string;
  netLoadVolatility: string;
  chartDisplay: string;
  show5IndividualYears: string;
  twentyFourHourHorizon: string;
  forecastMethodologyTitle: string;
  forecastMethodologyText: string;
  peakLmpWindow: string;
  offPeakBasin: string;
  avgArbSpread: string;
  duckCurveDepth: string;
  peakHours: string;
  solarHours: string;
  solarSurplus: string;
  priceDriversTitle: string;
  historicalAvg: string;
  fiveYrHistAvg: string;
  actualSuffix: string;
  mlForecastDayAhead: string;
  mlPredictedDaLmp: string;
  realTimeEstimate: string;
  realTimeLmpEst: string;
  systemDemand: string;
  systemDemandGw: string;
  renewableGen: string;
  solarWindGw: string;
  netLoad: string;
  netLoadGw: string;

  // LFP Degradation & ROI View
  degradationTitle: string;
  degradationDesc: string;
  degradationRoiTitle: string;
  degradationRoiSubtitle: string;
  warrantyStatusLabel: string;
  warrantyCompliantBadge: string;
  warrantyRiskBadge: string;
  compliantWarranty: string;
  warrantyRisk: string;
  dodStressFactor: string;
  dodStressLevel: string;
  peakDepth: string;
  equivalentCycles: string;
  dailyCellWearCost: string;
  marginalDegCost: string;
  minHurdleSpread: string;
  targetLifespan: string;
  dailyEfcUsed: string;
  cyclesUnit: string;
  maxCyclesLimit: string;
  batteryLifespan: string;
  yearsUnit: string;
  until80Soh: string;
  simplePayback: string;
  tenYearProjectRoi: string;
  internalReturn: string;
  warrantiedCyclesUsed: string;
  capitalPaybackPeriod: string;
  replacementCostSlider: string;
  replacementCostHelp: string;
  dodStressCurveTitle: string;
  dodStressCurveSubtitle: string;
  lfpCycleDegTitle: string;
  warrantiedLifetimeCycles: string;
  marginalDegCostLine: string;
  curveCycleLife: string;
  curveStressFactor: string;
  curveCostPerMWh: string;
  capitalAssetAssumptions: string;
  cellReplacementCost: string;
  bessTotalCapex: string;
  lcosLabel: string;
  degDailyDeduction: string;
  tenYrTotalNetProfit: string;
  chemistryTitle: string;
  chemistryPoints: string[];

  // Feature Gap Analysis / Margin Improvement
  marginImprovementTitle: string;
  marginImprovementDesc: string;
  featureGapTitle: string;
  featureGapSubtitle: string;
  closePanel: string;
  highValue: string;
  impactLabel: string;
  implementedInEngine: string;
  engineReady: string;
  protocolSimulated: string;
  revenueExpansion: string;
  marketExecution: string;
  assetLongevity: string;
  operationalAccuracy: string;
  riskMitigation: string;
  fixedCapacityRevenue: string;
  executionInfrastructure: string;
  currentOptimizedComparison: string;
  baselineUnmanaged: string;
  coOptimizedEngine: string;
  commercialLeversTitle: string;
  leverAncillaryTitle: string;
  leverAncillaryDesc: string;
  leverAncillaryAction: string;
  leverMultiSettlementTitle: string;
  leverMultiSettlementDesc: string;
  leverMultiSettlementAction: string;
  leverDoDTitle: string;
  leverDoDDesc: string;
  leverDoDAction: string;
  leverAuxTitle: string;
  leverAuxDesc: string;
  leverAuxAction: string;
  leverWarrantyTitle: string;
  leverWarrantyDesc: string;
  leverWarrantyAction: string;
  leverRaTitle: string;
  leverRaDesc: string;
  leverRaAction: string;
  leverScadaTitle: string;
  leverScadaDesc: string;
  leverScadaAction: string;
  categoryRevenue: string;
  categoryExecution: string;
  categoryLongevity: string;
  categoryAccuracy: string;
  categoryRisk: string;
  categoryCapacity: string;
  categoryInfrastructure: string;
  gapItem1Title: string;
  gapItem1Desc: string;
  gapItem1Action: string;
  gapItem2Title: string;
  gapItem2Desc: string;
  gapItem2Action: string;
  gapItem3Title: string;
  gapItem3Desc: string;
  gapItem3Action: string;
  gapItem4Title: string;
  gapItem4Desc: string;
  gapItem4Action: string;
  gapItem5Title: string;
  gapItem5Desc: string;
  gapItem5Action: string;
  gapItem6Title: string;
  gapItem6Desc: string;
  gapItem6Action: string;
  gapItem7Title: string;
  gapItem7Desc: string;
  gapItem7Action: string;
  regionalMarketRules: string;
  wholesaler: string;
  topRevenueDriver: string;
  primaryRisk: string;
  optimalConfig: string;
  caisoRowTitle: string;
  caisoDriver: string;
  caisoRisk: string;
  caisoConfig: string;
  ercotRowTitle: string;
  ercotDriver: string;
  ercotRisk: string;
  ercotConfig: string;
  pjmRowTitle: string;
  pjmDriver: string;
  pjmRisk: string;
  pjmConfig: string;

  // Revenue Waterfall View
  waterfallTitle: string;
  waterfallDesc: string;
  waterfallSubtitle: string;
  annualizedRunRate: string;
  waterfallGrossArbitrage: string;
  waterfallAncillary: string;
  waterfallDegradation: string;
  waterfallAuxiliary: string;
  waterfallNetProfit: string;
  arbitrageRev: string;
  ancillaryRev: string;
  degradation: string;
  auxParasitic: string;
  wholesaleArbitrage: string;
  lfpDegCost: string;
  auxThermalTare: string;
  grossArbSub: string;
  ancillarySub: string;
  degradationSub: string;
  auxiliarySub: string;
  netProfitSub: string;

  // SCADA Live Telemetry Modal
  scadaModalTitle: string;
  scadaModalDesc: string;
  scadaLiveFeed: string;
  scadaGridFreq: string;
  scadaFreqLocked: string;
  scadaRealTimeSoc: string;
  scadaDcVoltage: string;
  scadaDcCurrent: string;
  scadaInverterPower: string;
  scadaCellTempAvg: string;
  scadaCellTempMax: string;
  scadaHvacPower: string;
  scadaModbusPackets: string;
  scadaRegistersTitle: string;
  scadaBmsStatus: string;
  scadaInverterPcs: string;
  scadaHvacSystem: string;
  scadaFireGas: string;
  scadaDcContactor: string;
  scadaIsoResistance: string;
  statusNominal: string;
  statusClosed: string;

  // Date Picker Popover
  monthNames: string[];
  daysOfWeek: string[];
  damBadge: string;
  tomorrowDam: string;
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    // Header
    appTitle: 'BESS Profitability AI Agent',
    appVersion: 'v2.0.0',
    appDeveloper: 'Developer: George Zhang',
    scadaOnline: 'SCADA Online',
    liveScada: 'Live SCADA',
    languageSelect: 'Language',

    // Common / General
    mwh: 'MWh',
    mw: 'MW',
    hours: 'hours',
    days: 'days',
    years: 'years',
    day: 'day',
    year: 'year',
    perDay: '/day',
    perYear: '/yr',
    perMWh: '/MWh',
    perMW: '/MW',
    compliant: 'Compliant',
    breachRisk: 'Warranty Breach Risk',
    close: 'Close',
    retry: 'Retry',
    today: 'Today',
    tomorrow: 'Tomorrow',
    yesterday: 'Yesterday',
    active: 'Active',
    enabled: 'Enabled',
    disabled: 'Disabled',
    done: 'Done',

    // Tabs
    tabDispatch: '24-Hour Dispatch Plan',
    tabOverview: 'Operational Statistics',
    tabForecast: '5-Year Price & Forecast',
    tabDegradation: 'LFP Degradation & ROI',
    tabMarginImprovement: 'Margin Improvement',

    // Config Panel
    configTitle: 'Dispatch & Asset Configuration',
    resetDefaults: 'Reset Defaults',
    targetTradingDate: 'Target Trading Date',
    quickPresets: 'Quick Presets',
    presetTomorrow: 'Tomorrow',
    presetSummer: 'Summer Peak',
    presetWinter: 'Winter Freeze',
    presetSpring: 'Spring Solar Duck',
    summerPeak: 'Summer Peak',
    solarDuckSpring: 'Solar Duck',
    winterFreeze: 'Winter Freeze',
    wholesaleMarketIso: 'Wholesale Market (ISO/RTO)',
    pricingNode: 'Pricing Settlement Node',
    pricingNodeHub: 'Pricing Node / Hub',
    nodeVolatility: 'Volatility',
    nodeSpread: 'Avg Spread',
    bessCapacity: 'BESS Rated Capacity',
    bessCapacityLfp: 'BESS Capacity (LFP Array)',
    bessDuration: 'Duration / C-Rate',
    cRate: 'C-Rate',
    defaultLabel: 'Default',
    stackLabel: 'Stack',
    inverterRating: 'Duration / Inverter C-Rate',
    operationalStrategy: 'Operational Strategy & Constraints',
    operationalConstraints: 'Strategy & Physical Constraints',
    ancillaryServices: 'Ancillary Services Co-Op',
    ancillaryServicesDesc: 'Stack Regulation Up & Spinning Reserves',
    ancillaryServicesAs: 'Ancillary Services Co-Op (Reg Up / Spin)',
    degradationHurdle: 'Non-Linear DoD Hurdle',
    degradationHurdleDesc: 'Enforce degradation cost penalty in arbitrage',
    dodDegradationHurdle: 'LFP Degradation Hurdle Defense',
    multiSettlement: 'Multi-Settlement DAM/RTM',
    multiSettlementDesc: 'Day-ahead base + 5-min real-time deviations',
    multiSettlementDamRtm: 'Multi-Settlement DAM / RTM Arbitrage',
    oemWarrantyCap: 'OEM Warranty Daily Cap (1.25 EFC)',
    oemWarrantyCapDesc: 'Enforce max 1.25 EFC/day vendor warranty limit',
    auxiliaryLoss: 'Auxiliary & Inverter Tare',
    auxiliaryLossDesc: 'Include 2% HVAC & standby parasitic thermal loads',
    scenarioSensitivities: 'Scenario Sensitivities & Stress Tests',
    gasPriceModifier: 'Natural Gas Price Modifier',
    weatherTempAnomaly: 'Weather Temperature Anomaly',
    profile: 'Profile',
    peakWindow: 'Peak Window',
    lowWindow: 'Low Window',

    // Operations Overview Header Cards
    netDailyMargin: 'Net Daily Margin',
    runRate: 'Annual Run-Rate',
    wholesaleSpread: 'Wholesale Spread',
    capture: 'Capture Rate',
    ancillaryServicesCoop: 'Ancillary Services',
    spinAndReg: 'Spin & Reg-Up',
    coOptimized: 'Co-Optimized',
    dailyDegradation: 'Daily Degradation',
    peakDoD: 'Peak Depth of Discharge',
    assetHealthPayback: 'Asset Health & Payback',
    assetHealthAndPayback: 'Asset Health & Payback',
    lifespan: 'Lifespan',
    yrsLifespan: 'yrs Lifespan',
    capexPayoff: 'Capex Payoff',

    // AI Advisor Card
    aiAdvisorTitle: 'AI Dispatch & Trading Advisor',
    aiAdvisorDesc: 'Gemini-powered algorithmic commentary, ISO market analysis, and revenue optimization strategies',
    generateBriefing: 'Generate AI Briefing',
    rerunBriefing: 'Re-run Analysis',
    synthesizing: 'Synthesizing Market Intelligence...',
    aiAdvisorPlaceholder: 'Generate an AI strategic briefing to evaluate trade opportunities, battery degradation tradeoffs, and risk alerts across ISO markets.',
    analyzeNow: 'Analyze Now',
    analyzingBaseline: 'Analyzing dispatch telemetry against real-time wholesale LMP curves...',

    // 24-Hour Dispatch Plan View
    dispatchTitle: 'Optimal 24-Hour Co-Optimized Dispatch Schedule',
    dispatchDesc: 'Hour-by-hour battery state of charge (SoC), active charge/discharge setpoints, and stacked ancillary reserve awards',
    optimalDispatchTitle: 'Optimal 24-Hour Co-Optimized Dispatch Schedule',
    optimalDispatchSubtitle: 'Hour-by-hour battery state of charge (SoC), active charge/discharge setpoints, and stacked ancillary reserve awards',
    exportCsv: 'Export Schedule CSV',
    exportDispatchCsv: 'Export CSV Schedule',
    dispatchLmp: 'Forecasted LMP ($/MWh)',
    dispatchPower: 'Power Dispatch (MW)',
    chargePower: 'Charging (MW)',
    dischargePower: 'Discharging (MW)',
    asReserve: 'AS Reserve Award (MW)',
    socCurve: 'State of Charge (SoC %)',
    netMargin: 'Net Hourly Margin ($)',
    totalEnergyCharged: 'Total Energy Charged',
    totalEnergyDischarged: 'Total Energy Discharged',
    roundTripEfficiency: 'Round-Trip Efficiency',
    dailyCycles: 'Equivalent Full Cycles (EFC)',
    maxDoDReached: 'Max DoD Reached',
    grossDischarged: 'Gross Discharged',
    avgSell: 'Avg Sell',
    grossCharged: 'Gross Charged',
    avgBuy: 'Avg Buy',
    capturedSpread: 'Captured Spread',
    arbitrageCapture: 'Wholesale spread capture rate',
    dailyNetCashFlow: 'Daily Net Margin',
    afterDegAux: 'Realized bottom-line after deg & aux',
    powerDispatchMwLmp: 'Power Dispatch (MW) & Forecast LMP ($/MWh)',
    dischargeSellChargeBuy: 'Discharge = Sell | Charge = Buy | Line = LMP',
    wholesaleLmpChart: 'Wholesale LMP ($/MWh)',
    dischargePowerMw: 'Discharge Power (MW)',
    chargePowerMw: 'Charge Power (MW)',
    asReserveMw: 'AS Reserve Award (MW)',
    stateOfChargePct: 'State of Charge (%)',
    socTrajectory: 'State of Charge (SoC %) Trajectory',
    minLimit: 'Min Limit',
    maxLimit: 'Max Limit',
    dispatchScheduleTable: 'Hourly Granular Dispatch Ledger',
    settlementTableTitle: '24-Hour Granular Dispatch & Settlement Ledger',
    clickRowDrilldown: 'Click row for interval drilldown',
    hourCol: 'Hour',
    lmpCol: 'LMP ($/MWh)',
    actionCol: 'Action',
    powerMwCol: 'Power (MW)',
    energyMwhCol: 'Energy (MWh)',
    socTrajectoryCol: 'SoC Path',
    arbitragePlCol: 'Arb P&L',
    asRevenueCol: 'AS Rev',
    degCostCol: 'Deg Cost',
    netMarginCol: 'Net Margin',
    colHour: 'Hour',
    colTime: 'Interval',
    colAction: 'Operation',
    colLmp: 'LMP ($/MWh)',
    colPower: 'Dispatch (MW)',
    colCharged: 'Charge (MWh)',
    colDischarged: 'Discharge (MWh)',
    colAsReserve: 'AS Award (MW)',
    colSoC: 'End SoC',
    colArbRev: 'Arb Rev ($)',
    colAsRev: 'AS Rev ($)',
    colDegradation: 'Degradation ($)',
    colAuxCost: 'Aux Tare ($)',
    colNetProfit: 'Net Margin ($)',
    actionCharge: 'CHARGE',
    actionDischarge: 'DISCHARGE',
    actionStandby: 'STANDBY',
    actionAncillary: 'AS HOLD',
    actionRegUp: 'REG UP',
    actionSpinRes: 'SPIN RES',
    actionHoldIdle: 'HOLD / IDLE',

    // 5-Year Market Forecast View
    forecastTitle: '5-Year Historical & ML Price Forecasts',
    forecastDesc: 'Analyze wholesale nodal pricing trends, renewable duck curves, and market price spreads across ISO nodes',
    marketForecastTitle: '5-Year Historical Baseline & Machine Learning LMP Day-Ahead Forecast',
    marketForecastSubtitle: 'Multi-year nodal pricing trends, duck-curve solar penetration, and peak arbitrage price spreads at',
    atHub: 'at Hub',
    viewPrices: 'Wholesale LMP Prices ($/MWh)',
    viewDemand: 'Grid Load & Solar Duck Curve',
    viewCoPlot: 'Combined Price & Duck Curve Co-Plot',
    lmpWholesalePrices: 'LMP Wholesale Prices',
    gridDemandRenewables: 'Grid Demand & Renewables',
    combinedCoPlot: 'Combined Co-Plot',
    forecastPriceSpread: 'Forecast Price Spread',
    arbitrageReady: 'Arbitrage Ready',
    peakPredictedLmp: 'Peak Predicted LMP',
    sunsetRamp: 'Sunset Ramp',
    lowestOffPeakLmp: 'Lowest Off-Peak LMP',
    negativeLmp: 'Negative LMP',
    optimalChargingLull: 'Optimal Charging Lull',
    fiveYrHistPeakAvg: '5-Yr Hist Peak Avg',
    mean20212025: 'Mean 2021-2025',
    duckRampDepth: 'Duck Ramp Depth',
    netLoadVolatility: 'Net-Load Volatility',
    chartDisplay: 'Chart Display',
    show5IndividualYears: 'Show 5 Individual Historical Years',
    twentyFourHourHorizon: '24-Hour Diurnal Horizon (Hour 0 to Hour 23)',
    forecastMethodologyTitle: 'Methodology & Forecast Confidence Level',
    forecastMethodologyText: 'This multi-horizon model combines actual historical settlement data (2021-2025) with day-ahead weather forecasts, spark spreads, and regional ISO solar penetration. The ML forecast utilizes gradient-boosted quantile regression with a 92.4% historical backtested directional accuracy for day-ahead pricing spread prediction.',
    peakLmpWindow: 'Peak LMP Window',
    offPeakBasin: 'Solar Off-Peak Basin',
    avgArbSpread: '5-Yr Avg Daily Spread',
    duckCurveDepth: 'Solar Duck-Curve Depth',
    peakHours: 'Hours 18:00 - 21:00',
    solarHours: 'Hours 11:00 - 15:00',
    solarSurplus: 'Solar Over-Generation',
    priceDriversTitle: 'Key Market Volatility Drivers',
    historicalAvg: '5-Year Historical Avg',
    fiveYrHistAvg: '5-Yr Hist Avg',
    actualSuffix: 'Actual',
    mlForecastDayAhead: 'ML Day-Ahead Forecast (2026)',
    mlPredictedDaLmp: 'ML Predicted DA LMP',
    realTimeEstimate: 'Real-Time Estimate (RTM)',
    realTimeLmpEst: 'Real-Time LMP Est',
    systemDemand: 'Gross System Demand (GW)',
    systemDemandGw: 'System Demand (GW)',
    renewableGen: 'Solar & Wind Generation (GW)',
    solarWindGw: 'Solar/Wind (GW)',
    netLoad: 'Net Load [Demand - Solar] (GW)',
    netLoadGw: 'Net Load (GW)',

    // LFP Degradation & ROI View
    degradationTitle: 'Lithium Iron Phosphate (LFP) Degradation & Project ROI',
    degradationDesc: 'Non-linear stress modeling, warranty cycling compliance, and asset life extension mechanics',
    degradationRoiTitle: 'LFP Battery Cell Degradation Modeling & Financial Payback Dynamics',
    degradationRoiSubtitle: 'Non-linear mechanical stress factor per Depth of Discharge (DoD), warranty cycling compliance, and project ROI',
    warrantyStatusLabel: 'OEM Warranty Status',
    warrantyCompliantBadge: 'Warranty Compliant (≤ 1.25 EFC/day)',
    warrantyRiskBadge: 'Warranty Breach Risk (> 1.25 EFC/day)',
    compliantWarranty: 'Compliant Warranty',
    warrantyRisk: 'Warranty Breach Risk',
    dodStressFactor: 'Max DoD Stress Multiplier',
    dodStressLevel: 'DoD Stress Factor',
    peakDepth: 'Peak Depth of Discharge',
    equivalentCycles: 'Equivalent Full Cycles (EFC)',
    dailyCellWearCost: 'Daily Cell Wear Degradation Cost',
    marginalDegCost: 'Marginal Degradation Cost',
    minHurdleSpread: 'Min Hurdle Spread',
    targetLifespan: 'Expected Battery Pack Lifespan',
    dailyEfcUsed: 'Daily EFC Used',
    cyclesUnit: 'cycles/day',
    maxCyclesLimit: 'Max 1.25 EFC limit',
    batteryLifespan: 'Battery Lifespan',
    yearsUnit: 'years',
    until80Soh: 'Until 80% SoH EOL',
    simplePayback: 'Simple Capex Payback',
    tenYearProjectRoi: '10-Year Project IRR',
    internalReturn: 'Internal Rate of Return',
    warrantiedCyclesUsed: 'Warrantied Cycles Used',
    capitalPaybackPeriod: 'Estimated Capex Payback Period',
    replacementCostSlider: 'Cell Replacement Cost ($/kWh)',
    replacementCostHelp: 'Adjust battery cell augment replacement pricing to stress-test financial hurdle rates',
    dodStressCurveTitle: 'Non-Linear LFP DoD Stress vs. Cycle Life Curve',
    dodStressCurveSubtitle: 'Deep discharges above 80% DoD cause exponential lithium plating and solid electrolyte interphase (SEI) growth',
    lfpCycleDegTitle: 'LFP Cycle Life vs Depth of Discharge (DoD) & Marginal Degradation Hurdle',
    warrantiedLifetimeCycles: 'Warrantied Lifetime Cycles',
    marginalDegCostLine: 'Marginal Deg Cost ($/MWh)',
    curveCycleLife: 'Cycle Life to 80% SoH',
    curveStressFactor: 'Stress Factor Multiplier',
    curveCostPerMWh: 'Degradation Cost ($/MWh)',
    capitalAssetAssumptions: 'Capital Asset & Degradation Assumptions',
    cellReplacementCost: 'Cell Augmentation Cost',
    bessTotalCapex: 'Total BESS Capex',
    lcosLabel: 'Levelized Cost of Storage (LCOS)',
    degDailyDeduction: 'Daily Degradation Deduction',
    tenYrTotalNetProfit: '10-Year Net Cash Flow',
    chemistryTitle: 'Lithium Iron Phosphate (LFP) Operational Safeguards',
    chemistryPoints: [
      'Non-Linear Stress Knee: Discharges from 0% to 70% DoD induce minimal mechanical strain (0.75x stress). Discharges from 80% to 100% accelerate cell wear by up to 2.4x due to severe cathode volume expansion.',
      'Thermal Control: Maintaining cell operating temperatures between 20°C - 26°C via liquid cooling prevents capacity fade acceleration.',
      'Warranty Preservation: Limiting daily equivalent full cycles to ≤ 1.25 preserves manufacturer capacity warranties for 10-15 years.',
      'Degradation Hurdle Rate: The dispatch engine enforces a dynamic $/MWh hurdle penalty to reject low-spread arbitrage trades that would destroy net asset value.',
    ],

    // Feature Gap Analysis / Margin Improvement
    marginImprovementTitle: 'Commercial & Technical Margin Improvement Levers',
    marginImprovementDesc: 'Advanced optimization capabilities beyond simple arbitrage to maximize profitability and asset longevity',
    featureGapTitle: 'Commercial Strategy & Market Optimization Engine Levers',
    featureGapSubtitle: 'Strategic levers that differentiate basic unmanaged storage dispatch from algorithmic co-optimization',
    closePanel: 'Close',
    highValue: 'High Value',
    impactLabel: 'Impact',
    implementedInEngine: 'Implemented in Engine',
    engineReady: 'Engine Ready',
    protocolSimulated: 'Protocol Simulated',
    revenueExpansion: 'Revenue Expansion',
    marketExecution: 'Market Execution',
    assetLongevity: 'Asset Longevity',
    operationalAccuracy: 'Operational Accuracy',
    riskMitigation: 'Risk Mitigation',
    fixedCapacityRevenue: 'Fixed Capacity Revenue',
    executionInfrastructure: 'Execution Infrastructure',
    currentOptimizedComparison: 'Engine Impact: Basic Arbitrage vs. Co-Optimized Dispatch',
    baselineUnmanaged: 'Basic Unmanaged Arbitrage',
    coOptimizedEngine: 'Co-Optimized BESS Engine',
    commercialLeversTitle: 'Commercial Levers & Technical Optimizations',
    leverAncillaryTitle: '1. Ancillary Services Co-Optimization (Spin / Reg Up)',
    leverAncillaryDesc: 'Arbitrage alone leaves 30-50% of market value unharvested. Co-optimizing regulation up and spinning reserves yields recurring revenue during off-peak flat pricing windows.',
    leverAncillaryAction: 'Enable Ancillary Services Co-Optimization',
    leverMultiSettlementTitle: '2. Multi-Settlement DAM / RTM Trading',
    leverMultiSettlementDesc: 'Clear baseline energy in the Day-Ahead Market (DAM) and capitalize on high real-time (RTM) price spikes with 5-minute telemetry adjustments.',
    leverMultiSettlementAction: 'Enable DAM + RTM Strategy',
    leverDoDTitle: '3. Non-Linear LFP Degradation Hurdle',
    leverDoDDesc: 'LFP chemistry degradation is highly non-linear. The dynamic hurdle penalizes aggressive full-depth cycling during low-spread hours, preserving battery warranty.',
    leverDoDAction: 'Enforce Non-Linear DoD Hurdle',
    leverAuxTitle: '4. HVAC & Inverter Parasitic Load Tare',
    leverAuxDesc: 'Liquid cooling chillers and inverter idle losses consume 2-4% of battery throughput. Factoring parasitic tare prevents inflated net margin forecasts.',
    leverAuxAction: 'Include Auxiliary Parasitic Tare',
    leverWarrantyTitle: '5. OEM Warranty Cycling Caps',
    leverWarrantyDesc: 'Manufacturers void warranties if throughput exceeds 1.25 EFC/day. Hard-capping cycle limits safeguards long-term warranty coverage (10-15 years).',
    leverWarrantyAction: 'Lock 1.25 EFC Warranty Cap',
    leverRaTitle: '6. Capacity Market & Resource Adequacy (RA)',
    leverRaDesc: 'Earn fixed monthly capacity payments ($3,000-$8,000/MW-month) by preserving state of charge during designated evening peak availability assessment hours.',
    leverRaAction: 'Reserve Resource Adequacy Peak Capacity',
    leverScadaTitle: '7. Automated Bidding & Direct SCADA Integration',
    leverScadaDesc: 'Direct API dispatch pipeline connecting ISO market bids to on-site BMS/EMS controllers via Modbus TCP and DNP3 protocols.',
    leverScadaAction: 'Open Live SCADA Gateway',
    categoryRevenue: 'Revenue Expansion',
    categoryExecution: 'Market Execution',
    categoryLongevity: 'Asset Longevity',
    categoryAccuracy: 'Operational Accuracy',
    categoryRisk: 'Risk Mitigation',
    categoryCapacity: 'Fixed Capacity Revenue',
    categoryInfrastructure: 'Execution Infrastructure',
    gapItem1Title: 'Ancillary Services Co-Optimization',
    gapItem1Desc: 'Arbitrage alone leaves 30-50% of market value unharvested. Co-optimizing regulation up and spinning reserves yields recurring revenue during off-peak flat pricing windows.',
    gapItem1Action: 'Enable AS Co-Op',
    gapItem2Title: 'Multi-Settlement DAM / RTM Trading',
    gapItem2Desc: 'Clear baseline energy in the Day-Ahead Market (DAM) and capitalize on high real-time (RTM) price spikes with 5-minute telemetry adjustments.',
    gapItem2Action: 'Enable DAM + RTM',
    gapItem3Title: 'Non-Linear LFP Degradation Hurdle',
    gapItem3Desc: 'LFP chemistry degradation is highly non-linear. The dynamic hurdle penalizes aggressive full-depth cycling during low-spread hours, preserving battery warranty.',
    gapItem3Action: 'Enforce Hurdle',
    gapItem4Title: 'HVAC & Inverter Parasitic Load Tare',
    gapItem4Desc: 'Liquid cooling chillers and inverter idle losses consume 2-4% of battery throughput. Factoring parasitic tare prevents inflated net margin forecasts.',
    gapItem4Action: 'Factor Aux Losses',
    gapItem5Title: 'OEM Warranty Cycling Caps',
    gapItem5Desc: 'Manufacturers void warranties if throughput exceeds 1.25 EFC/day. Hard-capping cycle limits safeguards long-term warranty coverage (10-15 years).',
    gapItem5Action: 'Cap 1.25 EFC',
    gapItem6Title: 'Resource Adequacy (RA) Capacity',
    gapItem6Desc: 'Earn fixed monthly capacity payments ($3,000-$8,000/MW-month) by preserving state of charge during designated evening peak availability assessment hours.',
    gapItem6Action: 'Reserve RA Capacity',
    gapItem7Title: 'Automated Bidding & SCADA Integration',
    gapItem7Desc: 'Direct API dispatch pipeline connecting ISO market bids to on-site BMS/EMS controllers via Modbus TCP and DNP3 protocols.',
    gapItem7Action: 'Connect SCADA',
    regionalMarketRules: 'Regional ISO Market Characteristics',
    wholesaler: 'Regional Market',
    topRevenueDriver: 'Primary Revenue Driver',
    primaryRisk: 'Key Operational Risk',
    optimalConfig: 'Recommended Strategy',
    caisoRowTitle: 'CAISO (California)',
    caisoDriver: 'Duck curve solar midday dips + sunset ramp arbitrage + Regulation up',
    caisoRisk: 'Midday negative pricing requires strict charge curtailment bounds',
    caisoConfig: '4-Hour duration, Multi-settlement enabled, RA evening capacity hold',
    ercotRowTitle: 'ERCOT (Texas)',
    ercotDriver: 'Extreme real-time scarcity price spikes ($5,000/MWh cap) + ECRS reserves',
    ercotRisk: 'Extreme volatility and rapid frequency deviations test inverter ramp rates',
    ercotConfig: '2-Hour duration, High degradation hurdle, Aggressive RTM co-optimization',
    pjmRowTitle: 'PJM (Mid-Atlantic)',
    pjmDriver: 'RegD dynamic fast-frequency response + Capacity Market RPM auctions',
    pjmRisk: 'High mileage regulation degrades battery rapidly without strict DoD limits',
    pjmConfig: '1 to 2-Hour duration, OEM Warranty cycling cap, RegD frequency tracking',

    // Revenue Waterfall View
    waterfallTitle: 'Daily Revenue & Cost Waterfall Breakdown',
    waterfallDesc: 'Gross market earnings vs. non-linear battery degradation and auxiliary thermal parasitic loads',
    waterfallSubtitle: 'Gross market earnings vs. non-linear battery degradation and auxiliary thermal parasitic loads',
    annualizedRunRate: 'Annualized Run-Rate',
    waterfallGrossArbitrage: 'Wholesale Arbitrage',
    waterfallAncillary: 'Ancillary Services',
    waterfallDegradation: 'LFP Degradation Cost',
    waterfallAuxiliary: 'Aux & Thermal Tare',
    waterfallNetProfit: 'Net Daily Margin',
    arbitrageRev: 'Arbitrage Rev',
    ancillaryRev: 'Ancillary Rev',
    degradation: 'Degradation',
    auxParasitic: 'Aux Parasitic',
    wholesaleArbitrage: 'Wholesale Arbitrage',
    lfpDegCost: 'LFP Degradation Cost',
    auxThermalTare: 'Aux & Thermal Tare',
    grossArbSub: 'LMP Buy/Sell Spreads',
    ancillarySub: 'Reg Up / Spin Reserves',
    degradationSub: 'DoD Mechanical Strain',
    auxiliarySub: 'HVAC Chiller Load (2%)',
    netProfitSub: 'Realized Bottom Line',

    // SCADA Live Telemetry Modal
    scadaModalTitle: 'Direct BMS / EMS Telemetry & Modbus Diagnostics',
    scadaModalDesc: 'Real-time telemetry stream from containerized LFP battery array',
    scadaLiveFeed: 'Live Feed',
    scadaGridFreq: 'Grid Frequency',
    scadaFreqLocked: 'Sync Locked (60.00 Hz)',
    scadaRealTimeSoc: 'Real-Time SoC',
    scadaDcVoltage: 'DC Bus Voltage',
    scadaDcCurrent: 'Pack Current',
    scadaInverterPower: 'PCS AC Output',
    scadaCellTempAvg: 'Avg Cell Temp',
    scadaCellTempMax: 'Max Cell Hotspot',
    scadaHvacPower: 'HVAC Chiller Load',
    scadaModbusPackets: 'Modbus Packets Tx/Rx',
    scadaRegistersTitle: 'Diagnostic Modbus Registers & Subsystem Status',
    scadaBmsStatus: 'BMS Master Controller',
    scadaInverterPcs: 'Inverter PCS Stack',
    scadaHvacSystem: 'HVAC Chiller Loop',
    scadaFireGas: 'Fire & Gas Safety System',
    scadaDcContactor: 'Main DC Contactor',
    scadaIsoResistance: 'Isolation Resistance',
    statusNominal: 'Nominal / Active',
    statusClosed: 'Closed & Latched',

    // Date Picker Popover
    monthNames: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    damBadge: 'Tomorrow (DAM)',
    tomorrowDam: 'Tomorrow (DAM)',
  },

  zh: {
    // Header
    appTitle: 'BESS 储能电站盈利与调度 AI 智能体',
    appVersion: 'v2.0.0',
    appDeveloper: '开发者：George Zhang',
    scadaOnline: 'SCADA 在线',
    liveScada: '实时 SCADA 遥测',
    languageSelect: '语言',

    // Common / General
    mwh: '兆瓦时 (MWh)',
    mw: '兆瓦 (MW)',
    hours: '小时',
    days: '天',
    years: '年',
    day: '天',
    year: '年',
    perDay: '/天',
    perYear: '/年',
    perMWh: '/兆瓦时',
    perMW: '/兆瓦',
    compliant: '符合质保规范',
    breachRisk: '质保超额预警',
    close: '关闭',
    retry: '重试',
    today: '今天',
    tomorrow: '明天',
    yesterday: '昨天',
    active: '运行中',
    enabled: '已启用',
    disabled: '已禁用',
    done: '完成',

    // Tabs
    tabDispatch: '24小时调度方案',
    tabOverview: '运行综合统计',
    tabForecast: '5年价格预测与趋势',
    tabDegradation: 'LFP电芯衰减与投资回报',
    tabMarginImprovement: '利润增长引擎',

    // Config Panel
    configTitle: '调度策略与储能资产配置',
    resetDefaults: '恢复默认值',
    targetTradingDate: '目标现货交易日期',
    quickPresets: '快速场景预设',
    presetTomorrow: '明日日前交易',
    presetSummer: '夏季负荷高峰',
    presetWinter: '冬季极寒冰冻',
    presetSpring: '春季光伏鸭子曲线',
    summerPeak: '夏季高峰',
    solarDuckSpring: '鸭子曲线',
    winterFreeze: '冬季极寒',
    wholesaleMarketIso: '区域批发电力市场 (ISO/RTO)',
    pricingNode: '现货结算节点',
    pricingNodeHub: '结算节点 / 交易枢纽',
    nodeVolatility: '波动率',
    nodeSpread: '平均价差',
    bessCapacity: '储能额定容量',
    bessCapacityLfp: '储能容量 (磷酸铁锂系统)',
    bessDuration: '放电时长 / 充放倍率',
    cRate: '充放倍率 (C-Rate)',
    defaultLabel: '默认基准',
    stackLabel: '倍容量堆叠',
    inverterRating: '放电时长 / 逆变充放倍率',
    operationalStrategy: '运行策略与物理约束',
    operationalConstraints: '运营策略与物理约束',
    ancillaryServices: '辅助服务协同调度',
    ancillaryServicesDesc: '联合调频备用与一次调频',
    ancillaryServicesAs: '辅助服务联合优化 (调频 / 旋转备用)',
    degradationHurdle: '非线性衰减经济门槛',
    degradationHurdleDesc: '在套利决策中扣除放电深度衰减成本惩罚',
    dodDegradationHurdle: 'LFP 电芯非线性衰减保护门槛',
    multiSettlement: '日前/实时多级市场套利 (DAM/RTM)',
    multiSettlementDesc: '日前市场基准申报 + 5分钟实时偏差调整',
    multiSettlementDamRtm: '日前/实时多级市场双轨套利 (DAM/RTM)',
    oemWarrantyCap: '厂家质保循环上限约束 (1.25 EFC)',
    oemWarrantyCapDesc: '严格限制单日等效满充满放循环 ≤ 1.25次',
    auxiliaryLoss: '辅电消耗与逆变器待机损耗',
    auxiliaryLossDesc: '计入2%液冷温控功耗与逆变器热损耗',
    scenarioSensitivities: '敏感度分析与极端情景压力测试',
    gasPriceModifier: '天然气边际发电成本修正系数',
    weatherTempAnomaly: '极端气温扰动偏移',
    profile: '市场特性档案',
    peakWindow: '高峰时段',
    lowWindow: '低谷时段',

    // Operations Overview Header Cards
    netDailyMargin: '单日净利润',
    runRate: '年化收益率折算',
    wholesaleSpread: '现货套利价差',
    capture: '有效价差捕获率',
    ancillaryServicesCoop: '辅助服务收益',
    spinAndReg: '旋转备用与二次调频',
    coOptimized: '联合优化',
    dailyDegradation: '单日电芯衰减成本',
    peakDoD: '峰值放电深度 (DoD)',
    assetHealthPayback: '电芯寿命与回本周期',
    assetHealthAndPayback: '电芯寿命与回本周期',
    lifespan: '预估运行寿命',
    yrsLifespan: '年预估寿命',
    capexPayoff: '初始投资回本期',

    // AI Advisor Card
    aiAdvisorTitle: 'AI 储能交易与调度决策顾问',
    aiAdvisorDesc: '基于 Gemini 大模型的日前现货出清策略、电网节点价差剖析与衰减风险评估',
    generateBriefing: '生成 AI 智能调度简报',
    rerunBriefing: '重新评估市场策略',
    synthesizing: '正在结合日前出清与实时遥测综合推演...',
    aiAdvisorPlaceholder: '点击上方按钮，由 AI 顾问为您深度解析电网节点出清行情、充放电时段规划、电池衰减防范与跨市场收益套利点。',
    analyzeNow: '立即分析',
    analyzingBaseline: '正在综合日前电价曲线与多物理场约束进行多目标优化...',

    // 24-Hour Dispatch Plan View
    dispatchTitle: '24小时日前联合出清优化调度计划',
    dispatchDesc: '每小时储能荷电状态 (SoC)、充放电功率设定值与辅助服务备用容量分配',
    optimalDispatchTitle: '24小时日前联合出清优化调度计划',
    optimalDispatchSubtitle: '每小时储能荷电状态 (SoC)、充放电功率设定值与辅助服务备用容量分配',
    exportCsv: '导出调度曲线 CSV',
    exportDispatchCsv: '导出调度明细 CSV',
    dispatchLmp: '预测节点边际电价 LMP ($/MWh)',
    dispatchPower: '储能充放功率 (MW)',
    chargePower: '充电功率 (MW)',
    dischargePower: '放电功率 (MW)',
    asReserve: '调频备用容量 (MW)',
    socCurve: '实时荷电状态 (SoC %)',
    netMargin: '单小时净收益 ($)',
    totalEnergyCharged: '单日累计充电量',
    totalEnergyDischarged: '单日累计放电量',
    roundTripEfficiency: '系统综合充放电效率 (RTE)',
    dailyCycles: '单日等效满充循环 (EFC)',
    maxDoDReached: '单日最大放电深度 (DoD)',
    grossDischarged: '累计总放电量',
    avgSell: '平均放电均价',
    grossCharged: '累计总充电量',
    avgBuy: '平均充电均价',
    capturedSpread: '实现峰谷有效价差',
    arbitrageCapture: '现货套利价差捕获率',
    dailyNetCashFlow: '单日净收益',
    afterDegAux: '已扣除电芯折旧与液冷辅电损耗',
    powerDispatchMwLmp: '储能充放功率 (MW) 与预测节点电价 LMP ($/MWh)',
    dischargeSellChargeBuy: '正向 = 放电售电 | 负向 = 充电购电 | 折线 = 节点电价',
    wholesaleLmpChart: '现货节点边际电价 LMP ($/MWh)',
    dischargePowerMw: '放电出力 (MW)',
    chargePowerMw: '充电功率 (MW)',
    asReserveMw: '辅助服务备用 (MW)',
    stateOfChargePct: '荷电状态 (%)',
    socTrajectory: '电池荷电状态 (SoC %) 运行轨迹',
    minLimit: 'SoC 下限',
    maxLimit: 'SoC 上限',
    dispatchScheduleTable: '逐小时出清执行与财务结算明细',
    settlementTableTitle: '24小时逐小时出清执行与财务结算明细表',
    clickRowDrilldown: '点击单行时段可查看详细参数',
    hourCol: '时段',
    lmpCol: '电价 ($/MWh)',
    actionCol: '调度动作',
    powerMwCol: '功率 (MW)',
    energyMwhCol: '电量 (MWh)',
    socTrajectoryCol: 'SoC 轨迹',
    arbitragePlCol: '套利毛利',
    asRevenueCol: '辅服收益',
    degCostCol: '衰减折旧',
    netMarginCol: '净收益',
    colHour: '小时',
    colTime: '时间段',
    colAction: '运行模式',
    colLmp: '节点电价 ($/MWh)',
    colPower: '调度功率 (MW)',
    colCharged: '充电量 (MWh)',
    colDischarged: '放电量 (MWh)',
    colAsReserve: '备用容量 (MW)',
    colSoC: '期末 SoC',
    colArbRev: '套利收入 ($)',
    colAsRev: '辅服收入 ($)',
    colDegradation: '电芯衰减 ($)',
    colAuxCost: '辅电消耗 ($)',
    colNetProfit: '净收益 ($)',
    actionCharge: '充电吸纳',
    actionDischarge: '放电顶峰',
    actionStandby: '待机待命',
    actionAncillary: '备用持有',
    actionRegUp: '二次调频',
    actionSpinRes: '旋转备用',
    actionHoldIdle: '待机待命',

    // 5-Year Market Forecast View
    forecastTitle: '5年历史电价复盘与机器学习预测',
    forecastDesc: '深度分析区域电网节点 LMP 电价波动、光伏鸭子曲线深度与套利窗口',
    marketForecastTitle: '5年历史电价基准与机器学习日前节点边际电价 (LMP) 预测',
    marketForecastSubtitle: '多年节点价格演变趋势、光伏鸭子曲线渗透与高峰套利价差分析：',
    atHub: '交易枢纽',
    viewPrices: '批发节点电价 ($/MWh)',
    viewDemand: '系统负荷与鸭子曲线',
    viewCoPlot: '电价与鸭子曲线叠加综合视图',
    lmpWholesalePrices: '节点边际电价 (LMP)',
    gridDemandRenewables: '电网负荷与新能源出力',
    combinedCoPlot: '综合叠加曲线',
    forecastPriceSpread: '预测日内峰谷价差',
    arbitrageReady: '具备充沛套利空间',
    peakPredictedLmp: '预测晚高峰峰值电价',
    sunsetRamp: '晚霞负荷爬坡',
    lowestOffPeakLmp: '日间最低谷段电价',
    negativeLmp: '负电价区间',
    optimalChargingLull: '最佳低成本充电窗口',
    fiveYrHistPeakAvg: '5年历史均值峰值',
    mean20212025: '2021-2025历史均值',
    duckRampDepth: '鸭子曲线爬坡深度',
    netLoadVolatility: '净负荷瞬态波动',
    chartDisplay: '图表显示模式',
    show5IndividualYears: '显示近5年单年历史实际曲线',
    twentyFourHourHorizon: '24小时日内时段 (00:00 至 23:00)',
    forecastMethodologyTitle: '预测模型算法与置信度说明',
    forecastMethodologyText: '该多时间尺度模型融合了2021-2025年实际出清数据、日前气象数据、天然气火电火耗成本与区域新能源渗透率。采用梯度提升分位数回归 (GBQR) 算法，历史日前价差方向性预测准确率达92.4%。',
    peakLmpWindow: '晚高峰放电黄金窗口',
    offPeakBasin: '午间光伏低谷充电盆地',
    avgArbSpread: '5年平均日内峰谷价差',
    duckCurveDepth: '新能源鸭子曲线下凹深度',
    peakHours: '18:00 - 21:00 高峰段',
    solarHours: '11:00 - 15:00 低谷段',
    solarSurplus: '日间光伏过剩大发',
    priceDriversTitle: '电网核心波动驱动因素',
    historicalAvg: '5年历史基准均值',
    fiveYrHistAvg: '5年历史均值',
    actualSuffix: '实际',
    mlForecastDayAhead: '机器学习日前预测 (2026)',
    mlPredictedDaLmp: 'ML 预测日前 LMP',
    realTimeEstimate: '实时市场波动预估 (RTM)',
    realTimeLmpEst: '实时 LMP 预估',
    systemDemand: '电网总用电负荷 (GW)',
    systemDemandGw: '总负荷需求 (GW)',
    renewableGen: '风光新能源出力 (GW)',
    solarWindGw: '风光出力 (GW)',
    netLoad: '电网净负荷 [总负荷 - 光伏] (GW)',
    netLoadGw: '净负荷 (GW)',

    // LFP Degradation & ROI View
    degradationTitle: '磷酸铁锂 (LFP) 电池衰减模型与项目投资回报',
    degradationDesc: '非线性应力放电损伤机理、厂家质保合规分析与储能资产寿命延长技术',
    degradationRoiTitle: '磷酸铁锂 (LFP) 电芯物理衰减模型与全生命周期经济性分析',
    degradationRoiSubtitle: '放电深度 (DoD) 非线性机械应力加速因子、厂家质保合规判定与静态/动态投资回报期',
    warrantyStatusLabel: '厂家质保合规状态',
    warrantyCompliantBadge: '完全符合质保要求 (≤ 1.25 EFC/天)',
    warrantyRiskBadge: '存在质保失效风险 (> 1.25 EFC/天)',
    compliantWarranty: '符合质保标准',
    warrantyRisk: '质保超标风险',
    dodStressFactor: '最大放电深度应力倍率',
    dodStressLevel: 'DoD 应力加权系数',
    peakDepth: '峰值放电深度',
    equivalentCycles: '单日等效满充循环 (EFC)',
    dailyCellWearCost: '单日电芯衰减折旧成本',
    marginalDegCost: '边际衰减成本门槛',
    minHurdleSpread: '最低套利出清门槛',
    targetLifespan: '预估电池系统服役年限',
    dailyEfcUsed: '单日已用循环次数',
    cyclesUnit: '次/天',
    maxCyclesLimit: '质保上限1.25次/天',
    batteryLifespan: '电芯预期寿命',
    yearsUnit: '年',
    until80Soh: '至80%容量保持率(SOH)',
    simplePayback: '静态投资回收期',
    tenYearProjectRoi: '10年全周期内部收益率 (IRR)',
    internalReturn: '内部收益率 (IRR)',
    warrantiedCyclesUsed: '已消耗质保循环量',
    capitalPaybackPeriod: '预估初始投资回本年限',
    replacementCostSlider: '电池更换/补容单价 ($/kWh)',
    replacementCostHelp: '调节电芯更换与系统补容成本，压力测试调度策略的边际利润安全边际',
    dodStressCurveTitle: '磷酸铁锂 (LFP) 放电深度 (DoD) 与循环寿命非线性关系',
    dodStressCurveSubtitle: '超过80%的深度放电会导致晶格剧烈膨胀收缩、锂枝晶沉积与SEI膜不可逆增厚',
    lfpCycleDegTitle: 'LFP 循环寿命 vs 放电深度 (DoD) 及边际衰减成本门槛曲线',
    warrantiedLifetimeCycles: '质保设计循环寿命',
    marginalDegCostLine: '边际衰减成本 ($/MWh)',
    curveCycleLife: '至80% SOH可用循环次数',
    curveStressFactor: '加速老化应力倍率',
    curveCostPerMWh: '等效单MWh衰减成本 ($/MWh)',
    capitalAssetAssumptions: '储能初始资产与折旧参数假设',
    cellReplacementCost: '电芯重置与补容成本',
    bessTotalCapex: '储能电站建设总投资',
    lcosLabel: '储能度电平准化成本 (LCOS)',
    degDailyDeduction: '单日衰减成本扣除',
    tenYrTotalNetProfit: '10年累计净现金流',
    chemistryTitle: '磷酸铁锂 (LFP) 储能电站健康防护技术规范',
    chemistryPoints: [
      '非线性衰减拐点：在 0% 至 70% 放电深度内，电芯处于低机械应力区（0.75倍基准应力）；放电深度超过80%时，正负极材料膨胀加剧，衰减速率激增至2.4倍。',
      '热管理精准控温：通过液冷机组将电芯温差控制在2°C以内，核心温度保持在 20°C - 26°C 黄金区间，有效抑制高温热加速老化。',
      '质保长效保障：限制单日满充等效循环 ≤ 1.25次，确保充分享受电芯厂 10-15 年容量衰减质保承诺。',
      '动态经济门槛：调度算法设置动态 $/MWh 衰减保护门槛，自动剔除不足以覆盖电芯折旧的微利交易。',
    ],

    // Feature Gap Analysis / Margin Improvement
    marginImprovementTitle: '商业运作与技术优化利润增长引擎',
    marginImprovementDesc: '超越基础电能量套利，解锁辅助服务、多级市场协同与电芯保护等高级收益杠杆',
    featureGapTitle: '储能商业化运营策略与核心调度算法引擎能力',
    featureGapSubtitle: '全面对比传统无序储能与算法驱动的联合优化调度系统之间的能力差异',
    closePanel: '收起面板',
    highValue: '高收益杠杆',
    impactLabel: '收益提升',
    implementedInEngine: '引擎已原生实现',
    engineReady: '算法已集成',
    protocolSimulated: '工业协议已打通',
    revenueExpansion: '营收规模跃升',
    marketExecution: '电力市场交易',
    assetLongevity: '资产寿命延长',
    operationalAccuracy: '运行精度把控',
    riskMitigation: '电网合规避险',
    fixedCapacityRevenue: '固定容量收益',
    executionInfrastructure: '站控通信基础',
    currentOptimizedComparison: '收益对比分析：基础被动套利 vs 算法协同优化',
    baselineUnmanaged: '传统单一电能量套利 (未优化)',
    coOptimizedEngine: 'AI 协同优化储能调度引擎',
    commercialLeversTitle: '七大商业收益杠杆与工程技术优化',
    leverAncillaryTitle: '1. 辅助服务联合出清 (一次调频/调频备用)',
    leverAncillaryDesc: '单一电能量套利会错失电网30%-50%的辅助服务价值。在日前电价平缓时段分配容量申报调频备用，获取高额备用容量补偿。',
    leverAncillaryAction: '启用辅助服务联合优化',
    leverMultiSettlementTitle: '2. 日前与实时双轨市场套利 (DAM + RTM)',
    leverMultiSettlementDesc: '在日前市场锁定大部分基荷电量收益，同时依托毫秒级响应能力捕获实时市场5分钟极端尖峰电价。',
    leverMultiSettlementAction: '启用 DAM+RTM 双轨套利',
    leverDoDTitle: '3. LFP 电芯非线性放电深度衰减保护门槛',
    leverDoDDesc: 'LFP 电芯老化具有非线性特性。通过动态经济门槛自动过滤微利深放电动作，大幅延长电站服役周期。',
    leverDoDAction: '启用非线性衰减经济保护',
    leverAuxTitle: '4. 液冷温控与逆变器辅电功耗扣除',
    leverAuxDesc: '液冷机组与逆变器空载会消耗2%-4%的电量。将辅电损耗纳入调度模型，避免虚高净利润预算。',
    leverAuxAction: '计入辅电能耗损耗',
    leverWarrantyTitle: '5. 严格遵守电芯厂 1.25 EFC 质保上限',
    leverWarrantyDesc: '超过厂家规定的循环上限将直接导致质保作废。算法强制锁定单日循环约束，确保10-15年质保有效性。',
    leverWarrantyAction: '锁定 1.25 EFC 质保约束',
    leverRaTitle: '6. 容量充裕度市场 (Resource Adequacy / 容量补偿)',
    leverRaDesc: '在电网晚间关键负荷高峰期保持可用状态，获取每月固定容量补贴（$3,000-$8,000/MW-月）。',
    leverRaAction: '预留晚高峰容量申报',
    leverScadaTitle: '7. 自动报价出清与站端 SCADA 工业协议集成',
    leverScadaDesc: '实现电力交易平台与现场 BMS/EMS 的秒级联动，通过 Modbus TCP 与 DNP3 协议完成遥控功率下发。',
    leverScadaAction: '打通实时 SCADA 遥测网关',
    categoryRevenue: '营收规模跃升',
    categoryExecution: '电力市场交易',
    categoryLongevity: '资产寿命延长',
    categoryAccuracy: '运行精度把控',
    categoryRisk: '电网合规避险',
    categoryCapacity: '固定容量收益',
    categoryInfrastructure: '站控通信基础',
    gapItem1Title: '辅助服务联合优化出清',
    gapItem1Desc: '单一电能量套利会错失电网30%-50%的辅助服务价值。在日前电价平缓时段分配容量申报调频备用，获取高额备用容量补偿。',
    gapItem1Action: '启用辅服协同',
    gapItem2Title: '日前/实时多级市场套利 (DAM+RTM)',
    gapItem2Desc: '在日前市场锁定大部分基荷电量收益，同时依托毫秒级响应能力捕获实时市场5分钟极端尖峰电价。',
    gapItem2Action: '启用双轨套利',
    gapItem3Title: 'LFP 非线性放电深度衰减保护',
    gapItem3Desc: 'LFP 电芯老化具有非线性特性。通过动态经济门槛自动过滤微利深放电动作，大幅延长电站服役周期。',
    gapItem3Action: '启用衰减保护',
    gapItem4Title: '液冷温控与逆变器辅电能耗计入',
    gapItem4Desc: '液冷机组与逆变器空载会消耗2%-4%的电量。将辅电损耗纳入调度模型，避免虚高净利润预算。',
    gapItem4Action: '计入辅电能耗',
    gapItem5Title: '电芯厂家 1.25 EFC 质保循环上限锁定',
    gapItem5Desc: '超过厂家规定的循环上限将直接导致质保作废。算法强制锁定单日循环约束，确保10-15年质保有效性。',
    gapItem5Action: '锁定质保上限',
    gapItem6Title: '容量充裕度市场 (RA) 固定收益',
    gapItem6Desc: '在电网晚间关键负荷高峰期保持可用状态，获取每月固定容量补贴（$3,000-$8,000/MW-月）。',
    gapItem6Action: '申报容量储备',
    gapItem7Title: '自动化交易报价与 SCADA 协议网关',
    gapItem7Desc: '实现电力交易平台与现场 BMS/EMS 的秒级联动，通过 Modbus TCP 与 DNP3 协议完成遥控功率下发。',
    gapItem7Action: '连接 SCADA',
    regionalMarketRules: '北美三大区域电力市场交易特征',
    wholesaler: '区域市场',
    topRevenueDriver: '核心收益驱动力',
    primaryRisk: '主要运行风险',
    optimalConfig: '推荐最佳配置策略',
    caisoRowTitle: 'CAISO (加州电力市场)',
    caisoDriver: '午间光伏低谷 + 晚霞负荷爬坡峰谷套利 + 二次调频 (Reg Up)',
    caisoRisk: '午间极端负电价需严格执行充电功率限制防范逆向考核',
    caisoConfig: '4小时储能时长，启用多级市场结算，预留晚高峰 RA 容量',
    ercotRowTitle: 'ERCOT (德州电力市场)',
    ercotDriver: '实时市场稀缺性极端尖峰电价 ($5,000/MWh 上限) + ECRS 应急响应',
    ercotRisk: '电价波动极度剧烈，频率骤变对逆变器爬坡速率提出极限挑战',
    ercotConfig: '2小时储能时长，高衰减保护门槛，激进捕捉实时超高尖峰',
    pjmRowTitle: 'PJM (美东中大西洋市场)',
    pjmDriver: 'RegD 高频动态调频补偿 + RPM 远期容量拍卖固定收益',
    pjmRisk: '高频充放调频动作对电池里程磨损极快，需严格限制放电深度',
    pjmConfig: '1至2小时时长，锁定 OEM 质保循环上限，精准跟随 RegD 信号',

    // Revenue Waterfall View
    waterfallTitle: '单日收益与运营成本瀑布图',
    waterfallDesc: '批发市场毛收益 vs 非线性电芯衰减与液冷温控辅电消耗',
    waterfallSubtitle: '批发市场毛收益 vs 非线性电芯衰减与液冷温控辅电消耗',
    annualizedRunRate: '年化收益折算',
    waterfallGrossArbitrage: '现货套利收益',
    waterfallAncillary: '辅助服务收益',
    waterfallDegradation: 'LFP 电芯衰减成本',
    waterfallAuxiliary: '液冷及辅电损耗',
    waterfallNetProfit: '单日净利润',
    arbitrageRev: '套利收益',
    ancillaryRev: '辅服收益',
    degradation: '电芯衰减',
    auxParasitic: '辅电消耗',
    wholesaleArbitrage: '现货套利收益',
    lfpDegCost: 'LFP 电芯衰减成本',
    auxThermalTare: '液冷及辅电损耗',
    grossArbSub: '节点 LMP 充放价差',
    ancillarySub: '调频备用容量补偿',
    degradationSub: 'DoD 机械应力磨损',
    auxiliarySub: '液冷温控系统功耗 (2%)',
    netProfitSub: '最终入账净收益',

    // SCADA Live Telemetry Modal
    scadaModalTitle: 'BMS / EMS 站端实时遥测与 Modbus 诊断',
    scadaModalDesc: '磷酸铁锂储能电池舱实时数据采集与状态监视',
    scadaLiveFeed: '实时数据流',
    scadaGridFreq: '电网实时频率',
    scadaFreqLocked: '同步锁相正常 (60.00 Hz)',
    scadaRealTimeSoc: '实时荷电状态 (SoC)',
    scadaDcVoltage: '直流母线电压',
    scadaDcCurrent: '直流回路电流',
    scadaInverterPower: 'PCS 交流并网功率',
    scadaCellTempAvg: '电芯平均温度',
    scadaCellTempMax: '电芯最高热点温度',
    scadaHvacPower: '液冷温控机组功率',
    scadaModbusPackets: 'Modbus 报文收发计数',
    scadaRegistersTitle: '系统诊断寄存器与子系统健康状态',
    scadaBmsStatus: 'BMS 主控管理单元',
    scadaInverterPcs: 'PCS 变流器逆变模块',
    scadaHvacSystem: '液冷温控循环回路',
    scadaFireGas: '消防与可燃气体侦测系统',
    scadaDcContactor: '直流主接触器',
    scadaIsoResistance: '正负极对地绝缘阻抗',
    statusNominal: '正常运行 / 在线',
    statusClosed: '合闸吸合正常',

    // Date Picker Popover
    monthNames: [
      '一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
    damBadge: '明日 (日前交易)',
    tomorrowDam: '明日 (日前交易)',
  },

  fr: {
    // Header
    appTitle: 'Agent IA de Rentabilité et Dispatch BESS',
    appVersion: 'v2.0.0',
    appDeveloper: 'Développeur : George Zhang',
    scadaOnline: 'SCADA En Ligne',
    liveScada: 'SCADA Direct',
    languageSelect: 'Langue',

    // Common / General
    mwh: 'MWh',
    mw: 'MW',
    hours: 'heures',
    days: 'jours',
    years: 'ans',
    day: 'jour',
    year: 'an',
    perDay: '/jour',
    perYear: '/an',
    perMWh: '/MWh',
    perMW: '/MW',
    compliant: 'Conforme à la garantie',
    breachRisk: 'Risque de dépassement de garantie',
    close: 'Fermer',
    retry: 'Réessayer',
    today: 'Aujourd’hui',
    tomorrow: 'Demain',
    yesterday: 'Hier',
    active: 'Actif',
    enabled: 'Activé',
    disabled: 'Désactivé',
    done: 'Terminé',

    // Tabs
    tabDispatch: 'Plan de Dispatch 24h',
    tabOverview: 'Statistiques Opérationnelles',
    tabForecast: 'Prévisions Prix & 5 Ans',
    tabDegradation: 'Dégradation LFP & ROI',
    tabMarginImprovement: 'Amélioration Marges',

    // Config Panel
    configTitle: 'Configuration d’Actif & Dispatch',
    resetDefaults: 'Réinitialiser',
    targetTradingDate: 'Date de Trading Cible',
    quickPresets: 'Préréglages Rapides',
    presetTomorrow: 'Demain',
    presetSummer: 'Pointe Estivale',
    presetWinter: 'Vague de Froid',
    presetSpring: 'Courbe en Canard Printanière',
    summerPeak: 'Pointe Estivale',
    solarDuckSpring: 'Canard Solaire',
    winterFreeze: 'Vague de Froid',
    wholesaleMarketIso: 'Marché de Gros (ISO/RTO)',
    pricingNode: 'Nœud de Règlement Tarifaire',
    pricingNodeHub: 'Nœud / Hub de Règlement',
    nodeVolatility: 'Volatilité',
    nodeSpread: 'Écart Moyen',
    bessCapacity: 'Capacité Nominale BESS',
    bessCapacityLfp: 'Capacité BESS (Pack LFP)',
    bessDuration: 'Durée / C-Rate',
    cRate: 'Régime C-Rate',
    defaultLabel: 'Défaut',
    stackLabel: 'Module',
    inverterRating: 'Durée / Puissance Onduleur',
    operationalStrategy: 'Stratégie & Contraintes',
    operationalConstraints: 'Stratégie & Contraintes Physiques',
    ancillaryServices: 'Services Système Co-Optimisés',
    ancillaryServicesDesc: 'Cumuler réglage de fréquence et réserve tournante',
    ancillaryServicesAs: 'Services Système (Réglage / Réserve)',
    degradationHurdle: 'Seuil de Dégradation Non Linéaire',
    degradationHurdleDesc: 'Pénalité de coût de dégradation dans l’arbitrage',
    dodDegradationHurdle: 'Seuil Anti-Dégradation DoD LFP',
    multiSettlement: 'Multi-Règlement Marché J-1 / Temps Réel',
    multiSettlementDesc: 'Base Day-Ahead + ajustements temps réel 5 min',
    multiSettlementDamRtm: 'Multi-Règlement DAM / RTM',
    oemWarrantyCap: 'Plafond Garantie Constructeur (1,25 EFC)',
    oemWarrantyCapDesc: 'Limite stricte à ≤ 1,25 cycle équivalent pleine charge/jour',
    auxiliaryLoss: 'Consommations Auxiliaires & Pertes Onduleur',
    auxiliaryLossDesc: 'Inclure 2% de charge CVC et pertes à vide',
    scenarioSensitivities: 'Sensibilités & Tests de Résistance',
    gasPriceModifier: 'Modificateur Prix Gaz Naturel',
    weatherTempAnomaly: 'Anomalie de Température Météo',
    profile: 'Profil',
    peakWindow: 'Période de Pointe',
    lowWindow: 'Période Creuse',

    // Operations Overview Header Cards
    netDailyMargin: 'Marge Nette Journalière',
    runRate: 'Taux Annuel Équivalent',
    wholesaleSpread: 'Écart Tarifaire Gros',
    capture: 'Taux de Capture',
    ancillaryServicesCoop: 'Services Système',
    spinAndReg: 'Réglage & Réserve',
    coOptimized: 'Co-Optimisé',
    dailyDegradation: 'Dégradation Journalière',
    peakDoD: 'Profondeur de Décharge Max',
    assetHealthPayback: 'Santé d’Actif & Retour',
    assetHealthAndPayback: 'Santé d’Actif & Retour',
    lifespan: 'Durée de Vie Estimée',
    yrsLifespan: 'ans Durée de Vie',
    capexPayoff: 'Amortissement Capex',

    // AI Advisor Card
    aiAdvisorTitle: 'Conseiller IA de Dispatch & Trading',
    aiAdvisorDesc: 'Analyses algorithmiques Gemini, perspectives de marché ISO et stratégies d’optimisation',
    generateBriefing: 'Générer le Briefing IA',
    rerunBriefing: 'Réévaluer la Stratégie',
    synthesizing: 'Synthèse des Données de Marché...',
    aiAdvisorPlaceholder: 'Générez un briefing stratégique IA pour évaluer les opportunités de trading, les compromis de dégradation et les alertes de risque.',
    analyzeNow: 'Analyser Maintenant',
    analyzingBaseline: 'Analyse de la télémétrie par rapport aux courbes de prix en temps réel...',

    // 24-Hour Dispatch Plan View
    dispatchTitle: 'Plan de Dispatch Co-Optimisé sur 24 Heures',
    dispatchDesc: 'État de charge (SoC) heure par heure, consignes de puissance active et allocations de réserve système',
    optimalDispatchTitle: 'Plan de Dispatch Co-Optimisé sur 24 Heures',
    optimalDispatchSubtitle: 'État de charge (SoC) heure par heure, consignes de puissance active et allocations de réserve système',
    exportCsv: 'Exporter le Planning CSV',
    exportDispatchCsv: 'Exporter Planning CSV',
    dispatchLmp: 'Prix Marginal Nodal Prévu ($/MWh)',
    dispatchPower: 'Puissance de Dispatch (MW)',
    chargePower: 'Charge (MW)',
    dischargePower: 'Décharge (MW)',
    asReserve: 'Réserve Allouée (MW)',
    socCurve: 'État de Charge (SoC %)',
    netMargin: 'Marge Nette Horaire ($)',
    totalEnergyCharged: 'Énergie Totale Rechargée',
    totalEnergyDischarged: 'Énergie Totale Déchargée',
    roundTripEfficiency: 'Rendement Global Aller-Retour',
    dailyCycles: 'Cycles Pleine Charge Équivalents (EFC)',
    maxDoDReached: 'DoD Max Atteint',
    grossDischarged: 'Décharge Brute Totale',
    avgSell: 'Prix Moyen Vente',
    grossCharged: 'Charge Brute Totale',
    avgBuy: 'Prix Moyen Achat',
    capturedSpread: 'Écart de Prix Capturé',
    arbitrageCapture: 'Taux de capture de l’écart',
    dailyNetCashFlow: 'Marge Nette Journalière',
    afterDegAux: 'Résultat net après dégradation et CVC',
    powerDispatchMwLmp: 'Puissance de Dispatch (MW) & LMP Prévu ($/MWh)',
    dischargeSellChargeBuy: 'Décharge = Vente | Charge = Achat | Ligne = LMP',
    wholesaleLmpChart: 'Prix LMP Spot ($/MWh)',
    dischargePowerMw: 'Puissance Décharge (MW)',
    chargePowerMw: 'Puissance Charge (MW)',
    asReserveMw: 'Réserve AS Allouée (MW)',
    stateOfChargePct: 'État de Charge (%)',
    socTrajectory: 'Trajectoire de l’État de Charge (SoC %)',
    minLimit: 'Limite Min',
    maxLimit: 'Limite Max',
    dispatchScheduleTable: 'Registre Détaillé du Dispatch Horaire',
    settlementTableTitle: 'Registre Horaire du Dispatch & Règlement sur 24h',
    clickRowDrilldown: 'Cliquer sur une ligne pour le détail',
    hourCol: 'Heure',
    lmpCol: 'LMP ($/MWh)',
    actionCol: 'Action',
    powerMwCol: 'Puissance (MW)',
    energyMwhCol: 'Énergie (MWh)',
    socTrajectoryCol: 'Profil SoC',
    arbitragePlCol: 'P&L Arbitrage',
    asRevenueCol: 'Rev Réserve',
    degCostCol: 'Coût Dég.',
    netMarginCol: 'Marge Nette',
    colHour: 'Heure',
    colTime: 'Intervalle',
    colAction: 'Opération',
    colLmp: 'LMP ($/MWh)',
    colPower: 'Puissance (MW)',
    colCharged: 'Charge (MWh)',
    colDischarged: 'Décharge (MWh)',
    colAsReserve: 'Réserve AS (MW)',
    colSoC: 'SoC Fin',
    colArbRev: 'Rev Arbitrage ($)',
    colAsRev: 'Rev Réserve ($)',
    colDegradation: 'Dégradation ($)',
    colAuxCost: 'Auxiliaires ($)',
    colNetProfit: 'Marge Nette ($)',
    actionCharge: 'CHARGE',
    actionDischarge: 'DÉCHARGE',
    actionStandby: 'VEILLE',
    actionAncillary: 'RÉSERVE',
    actionRegUp: 'RÉGLAGE FREQ',
    actionSpinRes: 'RÉSERVE TOURN',
    actionHoldIdle: 'VEILLE / ATTENTE',

    // 5-Year Market Forecast View
    forecastTitle: 'Historique 5 Ans & Prévisions ML des Prix',
    forecastDesc: 'Analyse des tendances de prix nodaux, courbes de canard solaires et écarts de prix inter-heures',
    marketForecastTitle: 'Historique 5 Ans et Prévision ML du Prix Marginal Nodal (LMP) Day-Ahead',
    marketForecastSubtitle: 'Tendances de prix nodaux pluriannuelles, pénétration solaire et écarts de prix maximaux à',
    atHub: 'au Hub',
    viewPrices: 'Prix Spot de Gros ($/MWh)',
    viewDemand: 'Demande Réseau & Courbe en Canard',
    viewCoPlot: 'Vue Combinée Prix & Demande',
    lmpWholesalePrices: 'Prix Marginaux Nodaux (LMP)',
    gridDemandRenewables: 'Demande Réseau & Renouvelables',
    combinedCoPlot: 'Tracé Combiné',
    forecastPriceSpread: 'Écart de Prix Prévu',
    arbitrageReady: 'Opportunité d’Arbitrage',
    peakPredictedLmp: 'Pic LMP Prévu',
    sunsetRamp: 'Rampe du Soir',
    lowestOffPeakLmp: 'Creux LMP Hors Pointe',
    negativeLmp: 'Prix Négatifs',
    optimalChargingLull: 'Fenêtre de Charge Optimale',
    fiveYrHistPeakAvg: 'Moy. Pointe 5 Ans',
    mean20212025: 'Moyenne 2021-2025',
    duckRampDepth: 'Profondeur Canard',
    netLoadVolatility: 'Volatilité Charge Nette',
    chartDisplay: 'Affichage Graphique',
    show5IndividualYears: 'Afficher les 5 années historiques individuelles',
    twentyFourHourHorizon: 'Horizon Diurne 24h (00h00 à 23h00)',
    forecastMethodologyTitle: 'Méthodologie et Niveau de Confiance du Modèle',
    forecastMethodologyText: 'Ce modèle multi-horizon combine les données réelles de règlement (2021-2025) avec les prévisions météo J-1, les coûts des centrales gaz et la pénétration solaire. L’algorithme de régression quantile par gradient boosting affiche une précision directionnelle de 92,4% sur les écarts J-1.',
    peakLmpWindow: 'Fenêtre de Pointe des Prix',
    offPeakBasin: 'Bassin Solaire Creux',
    avgArbSpread: 'Écart Moyen 5 Ans',
    duckCurveDepth: 'Profondeur Courbe en Canard',
    peakHours: 'Heures 18h00 - 21h00',
    solarHours: 'Heures 11h00 - 15h00',
    solarSurplus: 'Surproduction Solaire',
    priceDriversTitle: 'Facteurs Clés de Volatilité',
    historicalAvg: 'Moyenne Historique 5 Ans',
    fiveYrHistAvg: 'Moy. Hist. 5 Ans',
    actualSuffix: 'Réel',
    mlForecastDayAhead: 'Prévision ML Day-Ahead (2026)',
    mlPredictedDaLmp: 'Prévision ML DA LMP',
    realTimeEstimate: 'Estimation Temps Réel (RTM)',
    realTimeLmpEst: 'Estimation LMP Temps Réel',
    systemDemand: 'Demande Brute du Réseau (GW)',
    systemDemandGw: 'Demande Système (GW)',
    renewableGen: 'Production Solaire & Éolienne (GW)',
    solarWindGw: 'Solaire/Éolien (GW)',
    netLoad: 'Charge Nette [Demande - Solaire] (GW)',
    netLoadGw: 'Charge Nette (GW)',

    // LFP Degradation & ROI View
    degradationTitle: 'Dégradation Lithium Fer Phosphate (LFP) & ROI',
    degradationDesc: 'Modélisation non linéaire des contraintes, respect des garanties et extension de durée de vie',
    degradationRoiTitle: 'Modélisation de la Dégradation LFP et Dynamique de Rentabilité Financière',
    degradationRoiSubtitle: 'Facteur de contrainte mécanique par profondeur de décharge (DoD), respect de la garantie OEM et TRI du projet',
    warrantyStatusLabel: 'Statut de Garantie Constructeur',
    warrantyCompliantBadge: 'Conforme à la garantie (≤ 1,25 EFC/jour)',
    warrantyRiskBadge: 'Risque de dépassement (> 1,25 EFC/jour)',
    compliantWarranty: 'Garantie Conforme',
    warrantyRisk: 'Risque Garantie',
    dodStressFactor: 'Facteur de Contrainte DoD Max',
    dodStressLevel: 'Facteur de Contrainte DoD',
    peakDepth: 'Profondeur de Décharge Max',
    equivalentCycles: 'Cycles Pleine Charge Équivalents (EFC)',
    dailyCellWearCost: 'Coût Journalier d’Usure des Cellules',
    marginalDegCost: 'Coût Marginal de Dégradation',
    minHurdleSpread: 'Seuil Minimum d’Arbitrage',
    targetLifespan: 'Durée de Vie Estimée du Pack',
    dailyEfcUsed: 'EFC Journaliers Consommés',
    cyclesUnit: 'cycles/jour',
    maxCyclesLimit: 'Limite max 1,25 EFC',
    batteryLifespan: 'Durée de Vie Batterie',
    yearsUnit: 'ans',
    until80Soh: 'Jusqu’à 80% de SoH',
    simplePayback: 'Retour sur Investissement Simple',
    tenYearProjectRoi: 'TRI du Projet sur 10 Ans',
    internalReturn: 'Taux de Rentabilité Interne (TRI)',
    warrantiedCyclesUsed: 'Cycles Sous Garantie Utilisés',
    capitalPaybackPeriod: 'Période de Retour Capex Estimée',
    replacementCostSlider: 'Coût Remplacement Cellules ($/kWh)',
    replacementCostHelp: 'Ajuster le coût de remplacement des cellules pour tester la résistance économique du modèle',
    dodStressCurveTitle: 'Courbe Non Linéaire Contrainte DoD vs Durée de Vie LFP',
    dodStressCurveSubtitle: 'Les décharges profondes au-delà de 80% provoquent une dégradation accélérée par expansion cristalline',
    lfpCycleDegTitle: 'Cycles de Vie LFP vs Profondeur de Décharge (DoD) et Seuil de Dégradation',
    warrantiedLifetimeCycles: 'Cycles de Vie Sous Garantie',
    marginalDegCostLine: 'Coût Dégradation Marginal ($/MWh)',
    curveCycleLife: 'Cycles jusqu’à 80% SoH',
    curveStressFactor: 'Multiplicateur de Contrainte',
    curveCostPerMWh: 'Coût de Dégradation ($/MWh)',
    capitalAssetAssumptions: 'Hypothèses de Capex et de Dégradation',
    cellReplacementCost: 'Coût d’Augmentation des Cellules',
    bessTotalCapex: 'Capex Total BESS',
    lcosLabel: 'Coût Actualisé du Stockage (LCOS)',
    degDailyDeduction: 'Déduction Journalière de Dégradation',
    tenYrTotalNetProfit: 'Flux Net de Trésorerie sur 10 Ans',
    chemistryTitle: 'Pratiques d’Exploitation Recommandées pour LFP',
    chemistryPoints: [
      'Seuil de contrainte non linéaire : les décharges de 0% à 70% de DoD induisent une contrainte minime (0,75x). Au-delà de 80%, l’usure s’accélère jusqu’à 2,4x.',
      'Régulation thermique : maintenir les cellules entre 20°C et 26°C via un refroidissement liquide évite l’accélération du vieillissement.',
      'Préservation de la garantie : limiter le cyclage journalier à ≤ 1,25 cycle préserve la garantie constructeur sur 10 à 15 ans.',
      'Seuil économique de dégradation : l’optimiseur applique une pénalité dynamique $/MWh pour écarter les transactions à faible marge qui détruiraient la valeur de l’actif.',
    ],

    // Feature Gap Analysis / Margin Improvement
    marginImprovementTitle: 'Leviers Commerciaux et Techniques d’Amélioration des Marges',
    marginImprovementDesc: 'Optimisation avancée au-delà du simple arbitrage pour maximiser les revenus et protéger les actifs',
    featureGapTitle: 'Leviers Stratégiques et Moteur d’Optimisation BESS',
    featureGapSubtitle: 'Différenciateurs stratégiques entre dispatch basique non géré et co-optimisation algorithmique avancée',
    closePanel: 'Fermer',
    highValue: 'Forte Valeur',
    impactLabel: 'Impact',
    implementedInEngine: 'Intégré au Moteur',
    engineReady: 'Prêt pour Exécution',
    protocolSimulated: 'Protocole Simulé',
    revenueExpansion: 'Expansion des Revenus',
    marketExecution: 'Exécution de Marché',
    assetLongevity: 'Longévité d’Actif',
    operationalAccuracy: 'Précision Opérationnelle',
    riskMitigation: 'Atténuation des Risques',
    fixedCapacityRevenue: 'Revenu de Capacité Fixe',
    executionInfrastructure: 'Infrastructure d’Exécution',
    currentOptimizedComparison: 'Impact Moteur : Arbitrage Simple vs Co-Optimisation Complète',
    baselineUnmanaged: 'Arbitrage Simple (Sans Gestion)',
    coOptimizedEngine: 'Moteur BESS Co-Optimisé',
    commercialLeversTitle: 'Leviers Commerciaux Avancés et Optimisations Techniques',
    leverAncillaryTitle: '1. Co-Optimisation Services Système (AS)',
    leverAncillaryDesc: 'L’arbitrage d’énergie seul néglige 30% à 50% de la valeur marchande. Allouer la capacité aux réserves de réglage de fréquence génère des revenus constants pendant les heures creuses.',
    leverAncillaryAction: 'Activer Co-Optimisation Services Système',
    leverMultiSettlementTitle: '2. Trading Multi-Règlement (Marché J-1 + Temps Réel)',
    leverMultiSettlementDesc: 'Contractualiser l’énergie de base sur le marché de la veille (DAM) et arbitrer les écarts en temps réel (RTM) pour capter les pointes tarifaires extrêmes.',
    leverMultiSettlementAction: 'Activer Stratégie DAM + RTM',
    leverDoDTitle: '3. Modélisation de Contrainte DoD Non Linéaire LFP',
    leverDoDDesc: 'La chimie LFP ne vieillit pas de manière linéaire. Le seuil dynamique supprime les cycles profonds peu rémunérateurs et préserve la garantie.',
    leverDoDAction: 'Appliquer Seuil DoD Non Linéaire',
    leverAuxTitle: '4. Consommation Parasite CVC & Onduleur',
    leverAuxDesc: 'Le refroidissement liquide et la consommation à vide de l’onduleur absorbent 2% à 4% de l’énergie. Les intégrer évite la surestimation des marges nettes.',
    leverAuxAction: 'Intégrer Charges Auxiliaires',
    leverWarrantyTitle: '5. Plafond Journalier de Cyclage et Garantie OEM',
    leverWarrantyDesc: 'Les fabricants annulent la garantie en cas de dépassement de 1,25 cycle/jour. L’optimiseur verrouille cette limite pour garantir une couverture sur 10-15 ans.',
    leverWarrantyAction: 'Verrouiller Plafond 1,25 EFC',
    leverRaTitle: '6. Rémunération de Capacité (Resource Adequacy)',
    leverRaDesc: 'Générer un revenu mensuel garanti (3 000 $ à 8 000 $/MW-mois) en assurant la disponibilité durant les heures obligatoires de pointe de fin de journée.',
    leverRaAction: 'Réserver Marge Capacité Heures de Pointe',
    leverScadaTitle: '7. Envoi d’Offres Automatisé & Intégration SCADA',
    leverScadaDesc: 'Passerelle API directe avec les gestionnaires de réseau et le BMS/EMS local via Modbus TCP/DNP3 pour une exécution ultra-rapide.',
    leverScadaAction: 'Ouvrir Passerelle SCADA Directe',
    categoryRevenue: 'Expansion des Revenus',
    categoryExecution: 'Exécution de Marché',
    categoryLongevity: 'Longévité d’Actif',
    categoryAccuracy: 'Précision Opérationnelle',
    categoryRisk: 'Atténuation des Risques',
    categoryCapacity: 'Revenu de Capacité Fixe',
    categoryInfrastructure: 'Infrastructure d’Exécution',
    gapItem1Title: 'Co-Optimisation des Services Système',
    gapItem1Desc: 'L’arbitrage d’énergie seul néglige 30% à 50% de la valeur marchande. Allouer la capacité aux réserves de réglage génère des revenus réguliers.',
    gapItem1Action: 'Activer Services Système',
    gapItem2Title: 'Trading Multi-Règlement (DAM + RTM)',
    gapItem2Desc: 'Sécuriser l’énergie de base en J-1 et capter les pointes de prix en temps réel sur les marchés infra-journaliers.',
    gapItem2Action: 'Activer DAM + RTM',
    gapItem3Title: 'Protection Dégradation Non Linéaire LFP',
    gapItem3Desc: 'Appliquer un seuil économique dynamique pour filtrer les décharges profondes non rentables et préserver la durée de vie.',
    gapItem3Action: 'Appliquer Seuil Dégradation',
    gapItem4Title: 'Prise en Compte des Auxiliaires CVC',
    gapItem4Desc: 'Déduire les 2% à 4% de charges parasitaires pour assurer des prévisions de marges nettes exactes.',
    gapItem4Action: 'Déduire Pertes Auxiliaires',
    gapItem5Title: 'Verrouillage du Plafond de Garantie 1,25 EFC',
    gapItem5Desc: 'Empêcher tout dépassement de cycle quotidien susceptible d’invalider la garantie constructeur de 10 à 15 ans.',
    gapItem5Action: 'Verrouiller 1,25 EFC',
    gapItem6Title: 'Revenu de Capacité (Resource Adequacy)',
    gapItem6Desc: 'Garantir un revenu fixe mensuel en maintenant la disponibilité durant les heures de pointe du soir.',
    gapItem6Action: 'Réserver Capacité RA',
    gapItem7Title: 'Automate d’Envoi d’Offres & Passerelle SCADA',
    gapItem7Desc: 'Liaison directe automatisée entre les marchés et le BMS/EMS de site via Modbus TCP et DNP3.',
    gapItem7Action: 'Connecter SCADA',
    regionalMarketRules: 'Caractéristiques Régionales des Marchés ISO',
    wholesaler: 'Marché Régional',
    topRevenueDriver: 'Moteur Principal de Revenus',
    primaryRisk: 'Risque Opérationnel Majeur',
    optimalConfig: 'Configuration Recommandée',
    caisoRowTitle: 'CAISO (Californie)',
    caisoDriver: 'Courbe en canard solaire + rampe de pointe du soir + Réglage de fréquence (Reg Up)',
    caisoRisk: 'Prix négatifs fréquents en milieu de journée nécessitant un arrêt strict des décharges',
    caisoConfig: 'Durée 4 heures, Multi-règlement activé, Réserve de capacité RA le soir',
    ercotRowTitle: 'ERCOT (Texas)',
    ercotDriver: 'Pics de prix extrêmes en temps réel (plafond 5 000 $/MWh) + Réserves ECRS',
    ercotRisk: 'Volatilité extrême et fortes variations de fréquence sollicitant la vitesse de rampe',
    ercotConfig: 'Durée 2 heures, Seuil de dégradation élevé, Arbitrage RTM agressif',
    pjmRowTitle: 'PJM (Mid-Atlantic)',
    pjmDriver: 'Réponse dynamique rapide RegD + Enchères de capacité RPM',
    pjmRisk: 'Le kilométrage élevé en régulation use rapidement les cellules sans gestion stricte du DoD',
    pjmConfig: 'Durée 1 à 2 heures, Plafond de garantie OEM, Suivi précis du signal RegD',

    // Revenue Waterfall View
    waterfallTitle: 'Décomposition en Cascade des Revenus et Coûts Journaliers',
    waterfallDesc: 'Gains bruts de marché vs dégradation non linéaire de batterie et charges parasitaires thermiques',
    waterfallSubtitle: 'Gains bruts de marché vs dégradation non linéaire de batterie et charges parasitaires thermiques',
    annualizedRunRate: 'Taux Annuel Équivalent',
    waterfallGrossArbitrage: 'Revenu Arbitrage',
    waterfallAncillary: 'Revenu Réserve',
    waterfallDegradation: 'Dégradation LFP',
    waterfallAuxiliary: 'Pertes Auxiliaires',
    waterfallNetProfit: 'Marge Nette Journalière',
    arbitrageRev: 'Revenu Arbitrage',
    ancillaryRev: 'Revenu Réserve',
    degradation: 'Dégradation',
    auxParasitic: 'Auxiliaires',
    wholesaleArbitrage: 'Revenu Arbitrage',
    lfpDegCost: 'Coût Dégradation LFP',
    auxThermalTare: 'Pertes Auxiliaires & CVC',
    grossArbSub: 'Écarts Achat/Vente LMP',
    ancillarySub: 'Réglage Fréquence & Réserve',
    degradationSub: 'Fatigue Mécanique DoD',
    auxiliarySub: 'Refroidissement CVC (2%)',
    netProfitSub: 'Bénéfice Net Réalisé',

    // SCADA Live Telemetry Modal
    scadaModalTitle: 'Télémétrie BMS / EMS Directe et Diagnostic Modbus',
    scadaModalDesc: 'Flux de données en temps réel du conteneur de batteries LFP',
    scadaLiveFeed: 'Flux Direct',
    scadaGridFreq: 'Fréquence Réseau',
    scadaFreqLocked: 'Verrouillage Synchronisé (60,00 Hz)',
    scadaRealTimeSoc: 'SoC en Temps Réel',
    scadaDcVoltage: 'Tension Bus DC',
    scadaDcCurrent: 'Courant DC',
    scadaInverterPower: 'Puissance AC Onduleur',
    scadaCellTempAvg: 'Température Moyenne Cellule',
    scadaCellTempMax: 'Point Chaud Cellule Max',
    scadaHvacPower: 'Puissance Groupe Froid CVC',
    scadaModbusPackets: 'Trames Modbus Émises/Reçues',
    scadaRegistersTitle: 'Registres Modbus et Statut des Sous-Systèmes',
    scadaBmsStatus: 'Contrôleur Maître BMS',
    scadaInverterPcs: 'Onduleur PCS',
    scadaHvacSystem: 'Boucle Thermique CVC',
    scadaFireGas: 'Système Sécurité Incendie & Gaz',
    scadaDcContactor: 'Contacteur Principal DC',
    scadaIsoResistance: 'Résistance d’Isolement',
    statusNominal: 'Nominal / Actif',
    statusClosed: 'Fermé et Enclenché',

    // Date Picker Popover
    monthNames: [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ],
    daysOfWeek: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
    damBadge: 'Demain (Marché J-1)',
    tomorrowDam: 'Demain (Marché J-1)',
  },
};
