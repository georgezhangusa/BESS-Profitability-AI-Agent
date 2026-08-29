import React from 'react';
import { DollarSign, TrendingUp, Zap, BatteryMedium, ShieldCheck } from 'lucide-react';
import { DispatchSummary, BESSConfig, ISOType } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface OperationsOverviewHeaderProps {
  summary: DispatchSummary;
  config: BESSConfig;
  iso: ISOType;
  forecastAvgSpread: number;
  maxDoD: number;
}

export const OperationsOverviewHeader: React.FC<OperationsOverviewHeaderProps> = ({
  summary,
  config,
  forecastAvgSpread,
  maxDoD,
}) => {
  const { t, formatCurrency, formatNumber } = useLanguage();
  const paybackYears = (config.replacementCostPerMWh * config.capacityMWh) / Math.max(1, summary.annualizedNetRevenue);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {/* 1. Net Daily Profit */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {t.netDailyMargin}
          </span>
          <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <DollarSign className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-1 mt-1.5">
          <span className="text-2xl font-black text-emerald-700 font-mono">
            {formatCurrency(summary.netDailyProfit, 2)}
          </span>
          <span className="text-xs text-slate-500 font-medium">{t.perDay}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-600 mt-1 pt-1.5 border-t border-slate-100 font-medium">
          <span>{t.runRate}:</span>
          <strong className="text-emerald-800 font-bold font-mono">
            {formatCurrency(summary.annualizedNetRevenue, 0)}{t.perYear}
          </strong>
        </div>
      </div>

      {/* 2. Market Spread Capture */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {t.wholesaleSpread}
          </span>
          <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-1 mt-1.5">
          <span className="text-2xl font-black text-blue-700 font-mono">
            ${formatNumber(forecastAvgSpread, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
          </span>
          <span className="text-xs text-slate-500 font-medium">/MWh</span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-600 mt-1 pt-1.5 border-t border-slate-100 font-medium">
          <span>{t.capture}:</span>
          <strong className="text-blue-800 font-bold font-mono">
            {summary.averageDischargePrice > 0 ? `$${formatNumber(summary.averageDischargePrice - summary.averageChargePrice, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}/MWh` : '$0.0/MWh'}
          </strong>
        </div>
      </div>

      {/* 3. Ancillary Co-Optimization */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {t.ancillaryServices}
          </span>
          <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-1 mt-1.5">
          <span className="text-2xl font-black text-indigo-700 font-mono">
            +{formatCurrency(summary.totalAncillaryRevenue, 2)}
          </span>
          <span className="text-xs text-slate-500 font-medium">{t.perDay}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-600 mt-1 pt-1.5 border-t border-slate-100 font-medium">
          <span>{t.spinAndReg}:</span>
          <strong className="text-indigo-800 font-bold font-mono">{t.coOptimized}</strong>
        </div>
      </div>

      {/* 4. Degradation Hurdle */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {t.dailyDegradation}
          </span>
          <div className="w-6 h-6 rounded-md bg-rose-50 text-rose-700 flex items-center justify-center">
            <BatteryMedium className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-1 mt-1.5">
          <span className="text-2xl font-black text-rose-700 font-mono">
            -{formatCurrency(summary.totalDegradationCost, 2)}
          </span>
          <span className="text-xs text-slate-500 font-medium">{t.perDay}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-600 mt-1 pt-1.5 border-t border-slate-100 font-medium">
          <span>{t.peakDoD}:</span>
          <strong className="text-slate-800 font-bold font-mono">{Math.round(maxDoD * 100)}%</strong>
        </div>
      </div>

      {/* 5. OEM Life & Warranty */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {t.assetHealthAndPayback}
          </span>
          <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-1 mt-1.5">
          <span className="text-2xl font-black text-slate-900 font-mono">
            {summary.equivalentFullCycles > 0 ? (config.warrantiedEFC / (summary.equivalentFullCycles * 365)).toFixed(1) : '20.0'}
          </span>
          <span className="text-xs text-slate-500 font-medium">{t.yrsLifespan}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-600 mt-1 pt-1.5 border-t border-slate-100 font-medium">
          <span>{t.capexPayoff}:</span>
          <strong className="text-emerald-800 font-bold font-mono">{paybackYears > 0 && paybackYears < 50 ? `${paybackYears.toFixed(1)} ${t.years}` : `8.1 ${t.years}`}</strong>
        </div>
      </div>
    </div>
  );
};

