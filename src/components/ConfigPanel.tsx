import React, { useState } from 'react';
import { Calendar, Globe2, Battery, Sliders, Shield, RefreshCw } from 'lucide-react';
import { ISOType, BESSCapacity, BESSConfig } from '../types';
import { MARKET_NODES, MARKET_CHARACTERISTICS } from '../data/markets';
import { DatePickerPopover } from './DatePickerPopover';
import { useLanguage } from '../i18n/LanguageContext';

interface ConfigPanelProps {
  targetDate: string;
  onDateChange: (date: string) => void;
  selectedIso: ISOType;
  onIsoChange: (iso: ISOType) => void;
  selectedNodeId: string;
  onNodeChange: (nodeId: string) => void;
  bessConfig: BESSConfig;
  onConfigChange: (newConfig: Partial<BESSConfig>) => void;
  // Strategy toggles
  enableAncillaryServices: boolean;
  onToggleAncillary: (val: boolean) => void;
  enableDegradationHurdle: boolean;
  onToggleDegradationHurdle: (val: boolean) => void;
  enableMultiSettlement: boolean;
  onToggleMultiSettlement: (val: boolean) => void;
  enableWarrantyCap: boolean;
  onToggleWarrantyCap: (val: boolean) => void;
  enableAuxiliaryLoss: boolean;
  onToggleAuxiliaryLoss: (val: boolean) => void;
  // Sensitivity sliders
  gasPriceModifier: number;
  onGasPriceChange: (val: number) => void;
  weatherTempAnomaly: number;
  onWeatherTempChange: (val: number) => void;
  onResetDefaults: () => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  targetDate,
  onDateChange,
  selectedIso,
  onIsoChange,
  selectedNodeId,
  onNodeChange,
  bessConfig,
  onConfigChange,
  enableAncillaryServices,
  onToggleAncillary,
  enableDegradationHurdle,
  onToggleDegradationHurdle,
  enableMultiSettlement,
  onToggleMultiSettlement,
  enableWarrantyCap,
  onToggleWarrantyCap,
  onResetDefaults,
}) => {
  const { t } = useLanguage();
  const currentNodes = MARKET_NODES[selectedIso] || [];
  const characteristics = MARKET_CHARACTERISTICS[selectedIso];
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  // Quick preset dates
  const handlePresetDate = (type: 'tomorrow' | 'summer' | 'winter' | 'spring') => {
    const today = new Date();
    let target = new Date();
    if (type === 'tomorrow') {
      target.setDate(today.getDate() + 1);
    } else if (type === 'summer') {
      target = new Date(today.getFullYear(), 6, 22); // July 22
    } else if (type === 'winter') {
      target = new Date(today.getFullYear(), 0, 18); // Jan 18
    } else if (type === 'spring') {
      target = new Date(today.getFullYear(), 3, 15); // April 15 (Deep Solar Duck)
    }
    onDateChange(target.toISOString().split('T')[0]);
  };

  const handleCapacityChange = (cap: BESSCapacity) => {
    // Default 2-hour duration (0.5C)
    const newInverterMW = cap / 2;
    onConfigChange({
      capacityMWh: cap,
      inverterMW: newInverterMW,
      durationHours: 2,
    });
  };

  const handleDurationChange = (durationHours: number) => {
    const newInverterMW = Math.round((bessConfig.capacityMWh / durationHours) * 100) / 100;
    onConfigChange({
      durationHours,
      inverterMW: newInverterMW,
    });
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs text-slate-800 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-2">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-600" />
          <h2 className="text-sm font-bold tracking-wide uppercase text-slate-900">
            {t.configTitle}
          </h2>
        </div>
        <button
          onClick={onResetDefaults}
          className="text-xs text-slate-600 hover:text-blue-600 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
          title="Reset to default CAISO 4MWh configuration"
        >
          <RefreshCw className="w-3 h-3" />
          <span>{t.resetDefaults}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Target Future Date Selector (Requirement 1) */}
        <div className="space-y-2 relative">
          <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.targetTradingDate}</span>
          </label>
          <div className="relative">
            <input
              id="target-date-input"
              type="date"
              value={targetDate}
              onClick={() => setIsCalendarOpen(true)}
              onChange={(e) => {
                onDateChange(e.target.value);
              }}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition-colors cursor-pointer"
            />
            {/* Expandable Selectable Calendar Popover */}
            <DatePickerPopover
              selectedDate={targetDate}
              onSelectDate={(newDate) => onDateChange(newDate)}
              isOpen={isCalendarOpen}
              onClose={() => setIsCalendarOpen(false)}
            />
          </div>
          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => handlePresetDate('tomorrow')}
              className="px-2 py-0.5 text-[11px] font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors cursor-pointer"
            >
              {t.tomorrow}
            </button>
            <button
              type="button"
              onClick={() => handlePresetDate('summer')}
              className="px-2 py-0.5 text-[11px] font-semibold rounded bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 transition-colors cursor-pointer"
            >
              {t.summerPeak}
            </button>
            <button
              type="button"
              onClick={() => handlePresetDate('spring')}
              className="px-2 py-0.5 text-[11px] font-semibold rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 transition-colors cursor-pointer"
            >
              {t.solarDuckSpring}
            </button>
            <button
              type="button"
              onClick={() => handlePresetDate('winter')}
              className="px-2 py-0.5 text-[11px] font-semibold rounded bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-300 transition-colors cursor-pointer"
            >
              {t.winterFreeze}
            </button>
          </div>
        </div>

        {/* 2. Wholesaler / ISO Selector (Requirement 1 - Default CAISO) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.wholesaleMarketIso}</span>
          </label>
          <select
            id="iso-selector"
            value={selectedIso}
            onChange={(e) => {
              const newIso = e.target.value as ISOType;
              onIsoChange(newIso);
              const nodes = MARKET_NODES[newIso];
              if (nodes && nodes.length > 0) {
                onNodeChange(nodes[0].id);
              }
            }}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition-colors cursor-pointer"
          >
            <option value="CAISO">CAISO (California ISO) </option>
            <option value="ERCOT">ERCOT (Texas Interconnection)</option>
            <option value="PJM">PJM Interconnection (Mid-Atlantic)</option>
            <option value="ISO-NE">ISO-NE (New England)</option>
            <option value="NYISO">NYISO (New York ISO)</option>
          </select>

          {/* Pricing Node / Hub dropdown */}
          <div className="pt-0.5">
            <label className="block text-[11px] font-medium text-slate-500 mb-1">{t.pricingNodeHub}:</label>
            <select
              id="node-selector"
              value={selectedNodeId}
              onChange={(e) => onNodeChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-600 focus:bg-white cursor-pointer"
            >
              {currentNodes.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. BESS Capacity Selector (Requirement 1 - Default 4MWh) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Battery className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.bessCapacityLfp}</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[4, 8, 16].map((cap) => {
              const isSelected = bessConfig.capacityMWh === cap;
              return (
                <button
                  key={cap}
                  id={`cap-btn-${cap}`}
                  type="button"
                  onClick={() => handleCapacityChange(cap as BESSCapacity)}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold border transition-all flex flex-col items-center justify-center cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  <span className="text-sm font-bold">{cap} MWh</span>
                  <span className="text-[10px] opacity-85">{cap === 4 ? t.defaultLabel : `${cap / 4}x ${t.stackLabel}`}</span>
                </button>
              );
            })}
          </div>

          {/* Inverter Duration / C-Rate */}
          <div className="flex items-center justify-between pt-1 text-xs text-slate-600 font-medium">
            <span>{t.inverterRating}:</span>
            <div className="flex gap-1">
              {[1, 2, 4].map((dur) => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => handleDurationChange(dur)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold border cursor-pointer ${
                    bessConfig.durationHours === dur
                      ? 'bg-blue-50 border-blue-400 text-blue-800'
                      : 'bg-slate-50 border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {dur}h ({bessConfig.capacityMWh / dur} MW)
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Degradation & Market Strategy Toggles */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.operationalConstraints}</span>
          </label>
          <div className="space-y-1.5 bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs">
            {/* LFP Degradation Hurdle Defense */}
            <label className="flex items-center justify-between cursor-pointer text-slate-700 hover:text-slate-900">
              <span className="flex items-center gap-1 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{t.dodDegradationHurdle}</span>
              </span>
              <input
                id="toggle-deg-hurdle"
                type="checkbox"
                checked={enableDegradationHurdle}
                onChange={(e) => onToggleDegradationHurdle(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
              />
            </label>

            {/* Ancillary Services Co-Optimization */}
            <label className="flex items-center justify-between cursor-pointer text-slate-700 hover:text-slate-900">
              <span className="flex items-center gap-1 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>{t.ancillaryServicesAs}</span>
              </span>
              <input
                id="toggle-ancillary"
                type="checkbox"
                checked={enableAncillaryServices}
                onChange={(e) => onToggleAncillary(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
              />
            </label>

            {/* Multi-Settlement DAM/RTM */}
            <label className="flex items-center justify-between cursor-pointer text-slate-700 hover:text-slate-900">
              <span className="flex items-center gap-1 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>{t.multiSettlementDamRtm}</span>
              </span>
              <input
                id="toggle-multisettle"
                type="checkbox"
                checked={enableMultiSettlement}
                onChange={(e) => onToggleMultiSettlement(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
              />
            </label>

            {/* Warranty Cap Guard */}
            <label className="flex items-center justify-between cursor-pointer text-slate-700 hover:text-slate-900">
              <span className="flex items-center gap-1 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                <span>{t.oemWarrantyCap}</span>
              </span>
              <input
                id="toggle-warranty"
                type="checkbox"
                checked={enableWarrantyCap}
                onChange={(e) => onToggleWarrantyCap(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>

      {/* ISO Market Note banner */}
      <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono font-semibold text-[11px] border border-slate-300">
            {selectedIso} {t.profile}
          </span>
          <span className="font-medium">{characteristics?.marketRules}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span>{t.peakWindow}: <strong className="text-amber-700">{characteristics?.peakHours}</strong></span>
          <span>{t.lowWindow}: <strong className="text-emerald-700">{characteristics?.lowHours}</strong></span>
        </div>
      </div>
    </div>
  );
};

