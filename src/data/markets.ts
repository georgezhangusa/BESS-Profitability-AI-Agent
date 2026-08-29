import { ISOType, MarketNode } from '../types';

export const MARKET_NODES: Record<ISOType, MarketNode[]> = {
  CAISO: [
    {
      id: 'TH_SP15_GEN-APND',
      name: 'SP15 South Path (Solar Heavy Hub)',
      iso: 'CAISO',
      description: 'Major southern California trading hub with heavy midday solar over-generation (deep duck curve) and aggressive evening ramp.',
      volatility: 'High',
      avgSpread: 124.5,
    },
    {
      id: 'TH_NP15_GEN-APND',
      name: 'NP15 North Path (Hydro/Gas Mix)',
      iso: 'CAISO',
      description: 'Northern California price node influenced by Pacific Northwest hydro imports, wind from Altamont, and Bay Area peak loads.',
      volatility: 'Moderate',
      avgSpread: 98.2,
    },
    {
      id: 'TH_ZP26_GEN-APND',
      name: 'ZP26 Central Zone (Central Valley)',
      iso: 'CAISO',
      description: 'Central transmission corridor connecting northern and southern grids with transmission congestion dynamics.',
      volatility: 'Moderate',
      avgSpread: 89.0,
    }
  ],
  ERCOT: [
    {
      id: 'HB_HOUSTON',
      name: 'Houston Commercial & Petrochem Hub',
      iso: 'ERCOT',
      description: 'High industrial load pocket with severe summer peak volatility ($5,000/MWh price cap ceiling) and coastal humidity peaks.',
      volatility: 'Extreme',
      avgSpread: 215.0,
    },
    {
      id: 'HB_NORTH',
      name: 'North Hub (Dallas-Fort Worth)',
      iso: 'ERCOT',
      description: 'High population cooling/heating load hub with substantial transmission constraints from West Texas wind corridors.',
      volatility: 'High',
      avgSpread: 168.0,
    },
    {
      id: 'HB_WEST',
      name: 'West Hub (Wind & Solar Generation Pocket)',
      iso: 'ERCOT',
      description: 'Abundant renewable curtailment leading to frequent negative pricing during high wind hours and fast ramp demands.',
      volatility: 'Extreme',
      avgSpread: 184.2,
    }
  ],
  PJM: [
    {
      id: 'PJM_WESTERN_HUB',
      name: 'PJM Western Hub (Liquid Mid-Atlantic)',
      iso: 'PJM',
      description: 'The premier liquid wholesale power trading benchmark in North America, dominated by gas, coal, nuclear base, and RegD signal.',
      volatility: 'Moderate',
      avgSpread: 84.6,
    },
    {
      id: 'PSEG_ZONE',
      name: 'PSEG Zone (Northern NJ / NYC Metro)',
      iso: 'PJM',
      description: 'Constrained coastal zone with capacity performance requirements and high ancillary services value.',
      volatility: 'Moderate',
      avgSpread: 95.4,
    },
    {
      id: 'AEP_ZONE',
      name: 'AEP Zone (Appalachian / Ohio)',
      iso: 'PJM',
      description: 'Midwestern industrial corridor with heavy winter heating demands and fast frequency regulation needs.',
      volatility: 'Moderate',
      avgSpread: 76.8,
    }
  ],
  'ISO-NE': [
    {
      id: 'ISONE_MASS_HUB',
      name: 'ISO-NE Massachusetts Hub',
      iso: 'ISO-NE',
      description: 'New England price benchmark vulnerable to winter LNG pipeline constraints and summer offshore wind ramps.',
      volatility: 'High',
      avgSpread: 112.0,
    }
  ],
  NYISO: [
    {
      id: 'NYISO_ZONE_J',
      name: 'NYISO Zone J (New York City)',
      iso: 'NYISO',
      description: 'Dense urban load pocket with transmission bottlenecks into Manhattan and high capacity market value.',
      volatility: 'High',
      avgSpread: 135.0,
    }
  ]
};

export const MARKET_CHARACTERISTICS: Record<ISOType, {
  duckCurve: boolean;
  extremeSpikes: boolean;
  regulationPremium: boolean;
  marketRules: string;
  ancillaryTypes: string[];
  peakHours: string;
  lowHours: string;
}> = {
  CAISO: {
    duckCurve: true,
    extremeSpikes: false,
    regulationPremium: false,
    marketRules: 'Day-Ahead Market (DAM) closes at 10:00 PPT. 4-hour Resource Adequacy (RA) showing standard between 17:00-21:00.',
    ancillaryTypes: ['Regulation Up', 'Regulation Down', 'Spinning Reserve', 'Non-Spinning Reserve'],
    peakHours: '17:00 - 21:00 (Sunset Solar Cliff)',
    lowHours: '10:00 - 15:00 (Midday Solar Flood / Negative LMPs)',
  },
  ERCOT: {
    duckCurve: false,
    extremeSpikes: true,
    regulationPremium: true,
    marketRules: 'Energy-only market with $5,000/MWh Value of Lost Load (VOLL) cap. High revenue from ECRS and Responsive Reserve Service (RRS).',
    ancillaryTypes: ['ECRS (ERCOT Contingency Reserve)', 'RRS (Responsive Reserve)', 'Reg Up', 'Reg Down'],
    peakHours: '15:00 - 20:00 (Summer Heat Peak / Scarcity Spikes)',
    lowHours: '02:00 - 06:00 (Nighttime West Texas Wind Surges)',
  },
  PJM: {
    duckCurve: false,
    extremeSpikes: false,
    regulationPremium: true,
    marketRules: 'Two-settlement market with rigorous Capacity Performance (RPM) and dynamic fast-responding RegD frequency regulation market.',
    ancillaryTypes: ['RegD (Fast Frequency Response)', 'RegA (Traditional Regulation)', 'Synchronized Reserve', 'Day-Ahead Scheduling Reserve'],
    peakHours: '07:00 - 09:00 & 17:00 - 20:00 (Dual Morning/Evening Peaks)',
    lowHours: '01:00 - 05:00 (Overnight Baseload Lull)',
  },
  'ISO-NE': {
    duckCurve: false,
    extremeSpikes: true,
    regulationPremium: false,
    marketRules: 'High gas-dependence creates extreme winter price spikes when LNG spot prices surge.',
    ancillaryTypes: ['Regulation', 'Ten-Minute Spinning Reserve (TMSR)', 'Thirty-Minute Operating Reserve (TMOR)'],
    peakHours: '17:00 - 20:00',
    lowHours: '02:00 - 05:00',
  },
  NYISO: {
    duckCurve: false,
    extremeSpikes: false,
    regulationPremium: true,
    marketRules: 'Locational ICAP capacity market with in-city (Zone J) deliverability constraints.',
    ancillaryTypes: ['Regulation', '10-Minute Synchronized', '10-Minute Non-Synchronized'],
    peakHours: '14:00 - 19:00',
    lowHours: '02:00 - 06:00',
  }
};
