import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { DollarSign } from 'lucide-react';
import { DispatchSummary } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface RevenueWaterfallProps {
  summary: DispatchSummary;
}

export const RevenueWaterfall: React.FC<RevenueWaterfallProps> = ({ summary }) => {
  const { t, formatCurrency, formatNumber } = useLanguage();
  const {
    totalGrossArbitrage,
    totalAncillaryRevenue,
    totalDegradationCost,
    totalAuxiliaryCost,
    netDailyProfit,
    annualizedNetRevenue,
  } = summary;

  const waterfallData = [
    {
      name: t.arbitrageRev,
      value: Math.max(0, totalGrossArbitrage),
      type: 'positive',
      formatted: `+$${formatNumber(totalGrossArbitrage, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      name: t.ancillaryRev,
      value: totalAncillaryRevenue,
      type: 'positive',
      formatted: `+$${formatNumber(totalAncillaryRevenue, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      name: t.degradation,
      value: -totalDegradationCost,
      type: 'negative',
      formatted: `-$${formatNumber(totalDegradationCost, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      name: t.auxParasitic,
      value: -totalAuxiliaryCost,
      type: 'negative',
      formatted: `-$${formatNumber(totalAuxiliaryCost, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      name: t.netDailyMargin,
      value: netDailyProfit,
      type: 'total',
      formatted: `$${formatNumber(netDailyProfit, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs text-slate-900 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-extrabold text-slate-900">{t.waterfallTitle}</h3>
          </div>
          <p className="text-xs text-slate-600 mt-0.5 font-medium">
            {t.waterfallSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 border border-emerald-300 rounded-lg px-3 py-1.5 text-right shadow-2xs">
            <span className="text-xs font-bold text-emerald-800 block">{t.annualizedRunRate}</span>
            <span className="text-sm font-black text-emerald-700 font-mono">
              ${formatNumber(annualizedNetRevenue)}/yr
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
        {/* Waterfall Chart */}
        <div className="lg:col-span-2 bg-slate-50/80 border border-slate-300 rounded-xl p-4 shadow-2xs">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waterfallData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }} />
                <YAxis
                  stroke="#64748b"
                  tick={{ fontSize: 11, fill: '#334155' }}
                  tickFormatter={(val) => `$${val}`}
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
                  formatter={(val: any) => [`$${Math.abs(Number(val)).toFixed(2)}`, 'Value']}
                />
                <ReferenceLine y={0} stroke="#94a3b8" />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {waterfallData.map((entry, index) => {
                    let color = '#2563eb';
                    if (entry.type === 'positive') color = '#059669';
                    if (entry.type === 'negative') color = '#e11d48';
                    if (entry.type === 'total') color = '#4f46e5';
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Metric Cards */}
        <div className="space-y-2.5">
          <div className="bg-slate-50 border border-slate-300 rounded-lg p-3 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-8 rounded-full bg-emerald-500"></div>
              <div>
                <span className="text-xs font-bold text-slate-600 block">{t.wholesaleArbitrage}</span>
                <span className="text-xs text-slate-500 font-medium">LMP Buy/Sell Spreads</span>
              </div>
            </div>
            <span className="text-base font-extrabold text-emerald-700 font-mono">
              +${formatNumber(totalGrossArbitrage, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-300 rounded-lg p-3 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-8 rounded-full bg-blue-500"></div>
              <div>
                <span className="text-xs font-bold text-slate-600 block">{t.ancillaryServices}</span>
                <span className="text-xs text-slate-500 font-medium">Reg Up / Spin Reserves</span>
              </div>
            </div>
            <span className="text-base font-extrabold text-blue-700 font-mono">
              +${formatNumber(totalAncillaryRevenue, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-300 rounded-lg p-3 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-8 rounded-full bg-rose-500"></div>
              <div>
                <span className="text-xs font-bold text-slate-600 block">{t.lfpDegCost}</span>
                <span className="text-xs text-slate-500 font-medium">DoD Mechanical Strain</span>
              </div>
            </div>
            <span className="text-base font-extrabold text-rose-700 font-mono">
              -${formatNumber(totalDegradationCost, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-300 rounded-lg p-3 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-8 rounded-full bg-amber-500"></div>
              <div>
                <span className="text-xs font-bold text-slate-600 block">{t.auxThermalTare}</span>
                <span className="text-xs text-slate-500 font-medium">HVAC Chiller Load (2%)</span>
              </div>
            </div>
            <span className="text-base font-extrabold text-amber-800 font-mono">
              -${formatNumber(totalAuxiliaryCost, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="bg-indigo-50 border border-indigo-300 rounded-lg p-3 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-8 rounded-full bg-indigo-600"></div>
              <div>
                <span className="text-xs font-bold text-indigo-900 block">{t.netDailyMargin}</span>
                <span className="text-xs text-indigo-700 font-medium">Realized Bottom Line</span>
              </div>
            </div>
            <span className="text-lg font-black text-indigo-700 font-mono">
              ${formatNumber(netDailyProfit, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

