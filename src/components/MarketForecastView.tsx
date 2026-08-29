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
import { TrendingUp, Info } from 'lucide-react';
import { HourlyMarketData, ISOType } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface MarketForecastViewProps {
  hourlyData: HourlyMarketData[];
  iso: ISOType;
  nodeName: string;
  targetDate: string;
  historicalPeakAvg: number;
  historicalOffPeakAvg: number;
  forecastMaxLMP: number;
  forecastMinLMP: number;
  forecastAvgSpread: number;
  duckCurveDepth: number;
}

export const MarketForecastView: React.FC<MarketForecastViewProps> = ({
  hourlyData,
  nodeName,
  targetDate,
  historicalPeakAvg,
  forecastMaxLMP,
  forecastMinLMP,
  forecastAvgSpread,
  duckCurveDepth,
}) => {
  const { t, formatCurrency, formatNumber } = useLanguage();
  const [showAllYears, setShowAllYears] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'prices' | 'demand' | 'co-plot'>('prices');

  // Format chart dataset
  const chartData = hourlyData.map((d) => ({
    hour: d.timeLabel,
    [`2021 ${t.actualSuffix}`]: d.historyYears.year2021,
    [`2022 ${t.actualSuffix}`]: d.historyYears.year2022,
    [`2023 ${t.actualSuffix}`]: d.historyYears.year2023,
    [`2024 ${t.actualSuffix}`]: d.historyYears.year2024,
    [`2025 ${t.actualSuffix}`]: d.historyYears.year2025,
    [t.fiveYrHistAvg]: d.historicalAvgLMP,
    [t.mlPredictedDaLmp]: d.forecastLMP,
    [t.realTimeLmpEst]: d.realTimeLMP,
    [t.systemDemandGw]: (d.systemDemandMW / 1000).toFixed(1),
    [t.solarWindGw]: (d.renewableGenerationMW / 1000).toFixed(1),
    [t.netLoadGw]: Math.max(0, (d.systemDemandMW - d.renewableGenerationMW) / 1000).toFixed(1),
  }));

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs text-slate-900 space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-extrabold text-slate-900">
              {t.marketForecastTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-0.5 font-medium">
            {t.marketForecastSubtitle} <span className="text-blue-700 font-bold">{targetDate}</span> {t.atHub} <span className="text-slate-800 font-semibold">{nodeName}</span>
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-300 text-xs font-semibold">
          <button
            onClick={() => setViewMode('prices')}
            className={`px-3 py-1.5 rounded-md font-bold transition-colors cursor-pointer ${
              viewMode === 'prices'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.lmpWholesalePrices}
          </button>
          <button
            onClick={() => setViewMode('demand')}
            className={`px-3 py-1.5 rounded-md font-bold transition-colors cursor-pointer ${
              viewMode === 'demand'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.gridDemandRenewables}
          </button>
          <button
            onClick={() => setViewMode('co-plot')}
            className={`px-3 py-1.5 rounded-md font-bold transition-colors cursor-pointer ${
              viewMode === 'co-plot'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.combinedCoPlot}
          </button>
        </div>
      </div>

      {/* KPI Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-slate-50 border border-slate-300 rounded-xl p-3.5 shadow-2xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.forecastPriceSpread}</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-blue-700 font-mono">
              ${formatNumber(forecastAvgSpread, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
            </span>
            <span className="text-xs text-slate-600 font-medium">/MWh</span>
          </div>
          <span className="text-xs font-bold text-emerald-700 block mt-0.5">{t.arbitrageReady}</span>
        </div>

        <div className="bg-slate-50 border border-slate-300 rounded-xl p-3.5 shadow-2xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.peakPredictedLmp}</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-amber-700 font-mono">
              ${formatNumber(forecastMaxLMP, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
            </span>
            <span className="text-xs text-slate-600 font-medium">/MWh</span>
          </div>
          <span className="text-xs font-semibold text-slate-700 block mt-0.5">{t.sunsetRamp}</span>
        </div>

        <div className="bg-slate-50 border border-slate-300 rounded-xl p-3.5 shadow-2xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.lowestOffPeakLmp}</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-2xl font-black font-mono ${forecastMinLMP < 0 ? 'text-sky-700' : 'text-slate-900'}`}>
              ${formatNumber(forecastMinLMP, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
            </span>
            <span className="text-xs text-slate-600 font-medium">/MWh</span>
          </div>
          <span className="text-xs font-semibold text-slate-700 block mt-0.5">{forecastMinLMP < 0 ? t.negativeLmp : t.optimalChargingLull}</span>
        </div>

        <div className="bg-slate-50 border border-slate-300 rounded-xl p-3.5 shadow-2xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.fiveYrHistPeakAvg}</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-800 font-mono">
              ${formatNumber(historicalPeakAvg, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
            </span>
            <span className="text-xs text-slate-600 font-medium">/MWh</span>
          </div>
          <span className="text-xs text-slate-500 block mt-0.5">{t.mean20212025}</span>
        </div>

        <div className="bg-slate-50 border border-slate-300 rounded-xl p-3.5 shadow-2xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.duckRampDepth}</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-indigo-700 font-mono">
              ${formatNumber(duckCurveDepth, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
            </span>
            <span className="text-xs text-slate-600 font-medium">/MWh</span>
          </div>
          <span className="text-xs text-slate-500 block mt-0.5">{t.netLoadVolatility}</span>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="bg-slate-50/80 border border-slate-300 rounded-xl p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-700 font-bold">{t.chartDisplay}:</span>
            {viewMode === 'prices' && (
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-800 font-medium hover:text-blue-700">
                <input
                  type="checkbox"
                  checked={showAllYears}
                  onChange={(e) => setShowAllYears(e.target.checked)}
                  className="rounded border-slate-400 text-blue-600"
                />
                <span>{t.show5IndividualYears}</span>
              </label>
            )}
          </div>
          <span className="text-slate-600 font-semibold text-xs">{t.twentyFourHourHorizon}</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {viewMode === 'prices' ? (
              <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 11, fill: '#334155' }} />
                <YAxis
                  stroke="#64748b"
                  tick={{ fontSize: 11, fill: '#334155' }}
                  tickFormatter={(val) => `$${val}`}
                  domain={['auto', 'auto']}
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
                  formatter={(value: any, name: any) => [`$${value}/MWh`, name]}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />

                {/* 5-Year Individual Lines */}
                {showAllYears && (
                  <>
                    <Line type="monotone" dataKey={`2021 ${t.actualSuffix}`} stroke="#94a3b8" strokeWidth={1} strokeDasharray="2 2" dot={false} />
                    <Line type="monotone" dataKey={`2022 ${t.actualSuffix}`} stroke="#64748b" strokeWidth={1} strokeDasharray="2 2" dot={false} />
                    <Line type="monotone" dataKey={`2023 ${t.actualSuffix}`} stroke="#475569" strokeWidth={1} strokeDasharray="2 2" dot={false} />
                    <Line type="monotone" dataKey={`2024 ${t.actualSuffix}`} stroke="#334155" strokeWidth={1} strokeDasharray="2 2" dot={false} />
                    <Line type="monotone" dataKey={`2025 ${t.actualSuffix}`} stroke="#6366f1" strokeWidth={1.5} dot={false} />
                  </>
                )}

                {/* 5-Yr Historical Average */}
                <Line type="monotone" dataKey={t.fiveYrHistAvg} stroke="#d97706" strokeWidth={2.5} strokeDasharray="4 4" dot={false} />

                {/* ML Predictive Day-Ahead Curve */}
                <Line type="monotone" dataKey={t.mlPredictedDaLmp} stroke="#2563eb" strokeWidth={3} dot={{ r: 3, fill: '#2563eb' }} activeDot={{ r: 6 }} />

                {/* Real-Time Imbalance Curve */}
                <Line type="monotone" dataKey={t.realTimeLmpEst} stroke="#0891b2" strokeWidth={1.5} dot={false} />
              </ComposedChart>
            ) : viewMode === 'demand' ? (
              <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 11, fill: '#334155' }} />
                <YAxis
                  stroke="#64748b"
                  tick={{ fontSize: 11, fill: '#334155' }}
                  tickFormatter={(val) => `${val} GW`}
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
                  formatter={(value: any, name: any) => [`${value} GW`, name]}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />

                <Area type="monotone" dataKey={t.systemDemandGw} fill="#3b82f6" fillOpacity={0.15} stroke="#2563eb" strokeWidth={2} />
                <Area type="monotone" dataKey={t.solarWindGw} fill="#10b981" fillOpacity={0.2} stroke="#059669" strokeWidth={2} />
                <Line type="monotone" dataKey={t.netLoadGw} stroke="#e11d48" strokeWidth={2.5} dot={false} />
              </ComposedChart>
            ) : (
              <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 11, fill: '#334155' }} />
                <YAxis yAxisId="left" stroke="#2563eb" tick={{ fontSize: 11, fill: '#1d4ed8' }} tickFormatter={(v) => `$${v}`} />
                <YAxis yAxisId="right" orientation="right" stroke="#059669" tick={{ fontSize: 11, fill: '#047857' }} tickFormatter={(v) => `${v} GW`} />
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
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line yAxisId="left" type="monotone" dataKey={t.mlPredictedDaLmp} stroke="#2563eb" strokeWidth={3} dot={false} />
                <Line yAxisId="left" type="monotone" dataKey={t.fiveYrHistAvg} stroke="#d97706" strokeWidth={2} strokeDasharray="3 3" dot={false} />
                <Area yAxisId="right" type="monotone" dataKey={t.systemDemandGw} fill="#3b82f6" fillOpacity={0.12} stroke="#2563eb" strokeWidth={1.5} />
                <Line yAxisId="right" type="monotone" dataKey={t.solarWindGw} stroke="#059669" strokeWidth={1.5} dot={false} />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Methodological Context Note for Operations Manager */}
      <div className="bg-slate-50 border border-slate-300 rounded-lg p-3.5 flex items-start gap-3 text-xs">
        <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-slate-900">{t.forecastMethodologyTitle}:</span>
          <p className="text-slate-700 leading-relaxed font-normal">
            {t.forecastMethodologyText}
          </p>
        </div>
      </div>
    </div>
  );
};

