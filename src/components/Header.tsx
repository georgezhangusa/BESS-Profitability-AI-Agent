import React from 'react';
import { BatteryCharging, Activity, Zap } from 'lucide-react';
import { ISOType, BESSCapacity } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  iso: ISOType;
  nodeName: string;
  capacityMWh: BESSCapacity;
  inverterMW: number;
  onOpenTelemetry: () => void;
  onOpenGapAnalysis?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  iso,
  capacityMWh,
  inverterMW,
  onOpenTelemetry,
}) => {
  const { t } = useLanguage();

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm text-white">
            <BatteryCharging className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                {t.appTitle}
              </h1>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-blue-900/60 text-blue-300 border border-blue-700/60">
                {t.appVersion}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-400">
              {t.appDeveloper}
            </p>
          </div>
        </div>

        {/* Live Operational Context Badges, Language Selector & Action Buttons */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Active Asset Badge */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-100 font-bold">{capacityMWh} MWh / {inverterMW} MW</span>
            <span className="text-slate-500">|</span>
            <span className="text-blue-400 font-bold">{iso}</span>
          </div>

          {/* Real-Time Grid Status */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-200 font-semibold">{t.scadaOnline}</span>
            <span className="text-slate-400 font-mono">60.00 Hz</span>
          </div>

          {/* Language Switcher Button */}
          <LanguageSelector variant="dropdown" />

          {/* Telemetry Modal Button */}
          <button
            id="open-telemetry-btn"
            onClick={onOpenTelemetry}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 hover:text-slate-900 shadow-[0_4px_0_0_#94a3b8] hover:shadow-[0_4px_0_0_#64748b] active:shadow-[0_1px_0_0_#94a3b8] active:translate-y-[3px] transition-all cursor-pointer select-none"
          >
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.liveScada}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

