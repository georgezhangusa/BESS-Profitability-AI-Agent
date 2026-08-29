import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { BatteryMedium, ShieldCheck } from 'lucide-react';
import { BESSConfig, DispatchSummary } from '../types';
import { calculateDegradationAndRoI } from '../utils/degradation';
import { useLanguage } from '../i18n/LanguageContext';

interface DegradationRoIViewProps {
  config: BESSConfig;
  summary: DispatchSummary;
  maxDoD: number;
}

export const DegradationRoIView: React.FC<DegradationRoIViewProps> = ({
  config,
  summary,
  maxDoD,
}) => {
  const { t, formatCurrency, formatNumber } = useLanguage();
  const [customReplacementCost, setCustomReplacementCost] = useState<number>(config.replacementCostPerMWh);

  const activeConfig = {
    ...config,
    replacementCostPerMWh: customReplacementCost,
  };

  const metrics = calculateDegradationAndRoI(
    activeConfig,
    summary.energyChargedTotalMWh,
    summary.energyDischargedTotalMWh,
    summary.netDailyProfit,
    maxDoD
  );

  // Generate DoD vs Cycle Life Curve dataset (Empirical LFP Physics)
  const dodCurveData = [
    { dod: '10%', dodVal: 0.1, cycles: 45000, stress: 0.02, costPerMWh: 3.2 },
    { dod: '20%', dodVal: 0.2, cycles: 28000, stress: 0.08, costPerMWh: 5.8 },
    { dod: '30%', dodVal: 0.3, cycles: 18000, stress: 0.17, costPerMWh: 9.1 },
    { dod: '40%', dodVal: 0.4, cycles: 13000, stress: 0.29, costPerMWh: 12.8 },
    { dod: '50%', dodVal: 0.5, cycles: 10000, stress: 0.43, costPerMWh: 16.9 },
    { dod: '60%', dodVal: 0.6, cycles: 8200, stress: 0.60, costPerMWh: 21.2 },
    { dod: '70%', dodVal: 0.7, cycles: 6900, stress: 0.79, costPerMWh: 25.8 },
    { dod: '80%', dodVal: 0.8, cycles: 6000, stress: 1.00, costPerMWh: 30.6 },
    { dod: '90%', dodVal: 0.9, cycles: 5100, stress: 1.24, costPerMWh: 35.7 },
    { dod: '100%', dodVal: 1.0, cycles: 4300, stress: 1.50, costPerMWh: 41.2 },
  ];

  const currentDodPct = Math.round(maxDoD * 100);

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs text-slate-900 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <BatteryMedium className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-extrabold text-slate-900">
              {t.degradationRoiTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-0.5 font-medium">
            {t.degradationRoiSubtitle}
          </p>
        </div>

        {/* Warranty Status Pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 font-medium">{t.warrantyStatusLabel}:</span>
          {metrics.warrantyStatus === 'Compliant' ? (
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.compliantWarranty}</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold flex items-center gap-1">
              <span>{t.warrantyRisk} ({metrics.equivalentFullCycles.toFixed(2)} EFC)</span>
            </span>
          )}
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-50 border border-slate-300 rounded-xl p-3 shadow-2xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.dodStressLevel}</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-blue-700 font-mono">
              {metrics.dodStressFactor}x
            </span>
          </div>
          <span className="text-xs text-slate-600 font-medium block mt-0.5">{currentDodPct}% {t.peakDepth}</span>
        </div>

        <div className="bg-slate-50 border border-slate-300 rounded-xl p-3 shadow-2xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.marginalDegCost}</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-rose-700 font-mono">
              ${formatNumber(metrics.marginalCostPerMWh, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
            </span>
            <span className="text-xs text-slate-600 font-medium">/MWh</span>
          </div>
          <span className="text-xs text-slate-600 font-medium block mt-0.5">{t.minHurdleSpread}</span>
        </div>

        <div className="bg-slate-50 border border-slate-300 rounded-xl p-3 shadow-2xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.dailyEfcUsed}</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-indigo-700 font-mono">
              {formatNumber(metrics.equivalentFullCycles, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs text-slate-600 font-medium">{t.cyclesUnit}</span>
          </div>
          <span className="text-xs text-slate-600 font-medium block mt-0.5">{t.maxCyclesLimit}</span>
        </div>

        <div className="bg-slate-50 border border-slate-300 rounded-xl p-3 shadow-2xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.batteryLifespan}</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-emerald-700 font-mono">
              {metrics.estimatedYearsTo80PctSoH}
            </span>
            <span className="text-xs text-slate-600 font-medium">{t.yearsUnit}</span>
          </div>
          <span className="text-xs text-slate-600 font-medium block mt-0.5">{t.until80Soh}</span>
        </div>

        <div className="bg-slate-50 border border-slate-300 rounded-xl p-3 shadow-2xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.simplePayback}</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-amber-700 font-mono">
              {formatNumber(metrics.paybackPeriodYears, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
            </span>
            <span className="text-xs text-slate-600 font-medium">{t.yearsUnit}</span>
          </div>
          <span className="text-xs text-slate-600 font-medium block mt-0.5">{t.capexPayoff}</span>
        </div>

        <div className="bg-slate-50 border border-slate-300 rounded-xl p-3 shadow-2xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.tenYearProjectRoi}</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-emerald-700 font-mono">
              {formatNumber(metrics.tenYearRoIPct, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%
            </span>
          </div>
          <span className="text-xs text-emerald-800 font-semibold block mt-0.5">{t.internalReturn}</span>
        </div>
      </div>

      {/* Interactive LFP Non-Linear Stress Curve & Capital Asset Assumptions (Unified Section) */}
      <div className="bg-slate-50/80 border border-slate-300 rounded-xl p-4 shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Degradation vs DoD Curve */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span>{t.lfpCycleDegTitle}</span>
              </span>
              <span className="text-xs text-slate-600 font-semibold">Stress ∝ DoD^1.8</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={dodCurveData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="dod" stroke="#64748b" tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }} />
                  <YAxis
                    yAxisId="left"
                    stroke="#2563eb"
                    tick={{ fontSize: 11, fill: '#1d4ed8' }}
                    tickFormatter={(v) => `${v.toLocaleString()}`}
                    domain={[0, 50000]}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#e11d48"
                    tick={{ fontSize: 11, fill: '#be123c' }}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#cbd5e1',
                      borderRadius: '8px',
                      color: '#0f172a',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />

                  <Area yAxisId="left" type="monotone" dataKey="cycles" name={t.warrantiedLifetimeCycles} fill="#3b82f6" fillOpacity={0.15} stroke="#2563eb" strokeWidth={2.5} />
                  <Line yAxisId="right" type="monotone" dataKey="costPerMWh" name={t.marginalDegCostLine} stroke="#e11d48" strokeWidth={2.5} dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Capital Asset Assumptions */}
          <div className="space-y-3 text-xs lg:border-l lg:border-slate-300 lg:pl-6">
            <span className="font-bold text-slate-800 uppercase tracking-wider block border-b border-slate-200 pb-2">
              {t.capitalAssetAssumptions}
            </span>

            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-slate-700 font-semibold mb-1">
                  <span>{t.cellReplacementCost}:</span>
                  <strong className="text-slate-900 font-mono font-bold">${formatNumber(customReplacementCost)} / MWh</strong>
                </div>
                <input
                  type="range"
                  min={80000}
                  max={200000}
                  step={5000}
                  value={customReplacementCost}
                  onChange={(e) => setCustomReplacementCost(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-0.5">
                  <span>$80k (Future LFP)</span>
                  <span>$200k (Heavy Turnkey)</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium">{t.bessTotalCapex}:</span>
                  <span className="font-bold text-slate-900 font-mono">${formatNumber(metrics.totalInstalledCapEx)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium">{t.lcosLabel}:</span>
                  <span className="font-bold text-blue-700 font-mono">${formatNumber(metrics.lcosPerMWh, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/MWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium">{t.degDailyDeduction}:</span>
                  <span className="font-bold text-rose-700 font-mono">-${formatNumber(summary.totalDegradationCost, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/day</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2">
                  <span className="text-slate-800 font-bold">{t.tenYrTotalNetProfit}:</span>
                  <span className="font-extrabold text-emerald-700 font-mono">${formatNumber(Math.round(summary.netDailyProfit * 365 * 10 - metrics.totalInstalledCapEx))}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

