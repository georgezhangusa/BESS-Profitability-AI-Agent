import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { Zap, Download, ArrowUpRight, ArrowDownRight, Pause } from 'lucide-react';
import { HourlyDispatchResult, DispatchSummary, BESSConfig } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface DispatchScheduleViewProps {
  hourlySchedule: HourlyDispatchResult[];
  summary: DispatchSummary;
  config: BESSConfig;
  targetDate: string;
}

export const DispatchScheduleView: React.FC<DispatchScheduleViewProps> = ({
  hourlySchedule,
  summary,
  config,
  targetDate,
}) => {
  const { t, formatCurrency, formatNumber } = useLanguage();
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  // Prepare chart dataset
  const chartData = hourlySchedule.map((d) => ({
    hour: d.timeLabel,
    rawHour: d.hour,
    [t.wholesaleLmpChart]: d.lmp,
    [t.dischargePowerMw]: d.powerMW > 0 ? d.powerMW : 0,
    [t.chargePowerMw]: d.powerMW < 0 ? Math.abs(d.powerMW) : 0,
    [t.asReserveMw]: d.ancillaryServiceMW,
    [t.stateOfChargePct]: Math.round(d.socEnd * 100),
    'Net Margin ($)': d.netHourlyProfit,
    action: d.action,
  }));

  // CSV Export handler
  const handleExportCSV = () => {
    const headers = [
      'Hour',
      'Time',
      'Action',
      'LMP_USD_MWh',
      'Power_MW',
      'Charged_MWh',
      'Discharged_MWh',
      'AS_Reserve_MW',
      'SoC_Start_Pct',
      'SoC_End_Pct',
      'Arbitrage_Revenue_USD',
      'Ancillary_Revenue_USD',
      'Degradation_Cost_USD',
      'Aux_Cost_USD',
      'Net_Hourly_Profit_USD',
    ];

    const rows = hourlySchedule.map((r) => [
      r.hour,
      r.timeLabel,
      r.action,
      r.lmp,
      r.powerMW,
      r.energyChargedMWh,
      r.energyDischargedMWh,
      r.ancillaryServiceMW,
      (r.socStart * 100).toFixed(1),
      (r.socEnd * 100).toFixed(1),
      r.arbitrageRevenue,
      r.ancillaryRevenue,
      r.degradationCost,
      r.auxiliaryCost,
      r.netHourlyProfit,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BESS_Dispatch_Schedule_${config.capacityMWh}MWh_${targetDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs text-slate-900 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-extrabold text-slate-900">
              {t.optimalDispatchTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-0.5 font-medium">
            {t.optimalDispatchSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="export-csv-btn"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.exportDispatchCsv}</span>
          </button>
        </div>
      </div>

      {/* Summary Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-50 border border-slate-300 rounded-xl p-3.5 shadow-2xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.grossDischarged}</span>
          <span className="text-2xl font-black text-amber-700 font-mono">
            {formatNumber(summary.energyDischargedTotalMWh, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} MWh
          </span>
          <div className="text-xs text-slate-700 mt-0.5 font-medium">
            {t.avgSell}: <strong className="text-amber-800 font-bold">${formatNumber(summary.averageDischargePrice, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}/MWh</strong>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-300 rounded-xl p-3.5 shadow-2xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.grossCharged}</span>
          <span className="text-2xl font-black text-blue-700 font-mono">
            {formatNumber(summary.energyChargedTotalMWh, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} MWh
          </span>
          <div className="text-xs text-slate-700 mt-0.5 font-medium">
            {t.avgBuy}: <strong className="text-blue-800 font-bold">${formatNumber(summary.averageChargePrice, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}/MWh</strong>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-300 rounded-xl p-3.5 shadow-2xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.capturedSpread}</span>
          <span className="text-2xl font-black text-indigo-700 font-mono">
            +${formatNumber(summary.priceSpreadCaptured, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
          </span>
          <span className="text-xs text-slate-600 block mt-0.5 font-medium">{t.arbitrageCapture}</span>
        </div>

        <div className="bg-slate-50 border border-slate-300 rounded-xl p-3.5 shadow-2xs">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.dailyNetCashFlow}</span>
          <span className="text-2xl font-black text-emerald-700 font-mono">
            {formatCurrency(summary.netDailyProfit, 2)}
          </span>
          <span className="text-xs text-emerald-800 block mt-0.5 font-semibold">{t.afterDegAux}</span>
        </div>
      </div>

      {/* Synchronized 24-Hour Dispatch Charts */}
      <div className="space-y-4 bg-slate-50/80 border border-slate-300 rounded-xl p-4 shadow-2xs">
        {/* Top Chart: Power Dispatch MW + LMP */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>{t.powerDispatchMwLmp}</span>
            </span>
            <span className="text-xs text-slate-600 font-medium">{t.dischargeSellChargeBuy}</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 11, fill: '#334155' }} />
                <YAxis yAxisId="left" stroke="#2563eb" tick={{ fontSize: 11, fill: '#1d4ed8' }} tickFormatter={(v) => `$${v}`} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#d97706"
                  tick={{ fontSize: 11, fill: '#b45309' }}
                  tickFormatter={(v) => `${v}MW`}
                  domain={[0, config.inverterMW * 1.2]}
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
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />

                <Line yAxisId="left" type="monotone" dataKey={t.wholesaleLmpChart} stroke="#2563eb" strokeWidth={2.5} dot={false} />
                <Bar yAxisId="right" dataKey={t.dischargePowerMw} fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey={t.chargePowerMw} fill="#0284c7" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey={t.asReserveMw} fill="#7c3aed" radius={[4, 4, 0, 0]} opacity={0.7} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Chart: State of Charge (%) Trajectory */}
        <div className="pt-3 border-t border-slate-200">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-600"></span>
              <span>{t.socTrajectory}</span>
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <span>{t.minLimit}: <strong className="text-slate-800 font-bold">{config.minSoC * 100}%</strong></span>
              <span>{t.maxLimit}: <strong className="text-slate-800 font-bold">{config.maxSoC * 100}%</strong></span>
            </div>
          </div>

          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 11, fill: '#334155' }} />
                <YAxis stroke="#0284c7" tick={{ fontSize: 11, fill: '#0369a1' }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                <ReferenceLine y={config.minSoC * 100} stroke="#dc2626" strokeDasharray="3 3" label={{ value: `Min SoC (${config.minSoC * 100}%)`, fill: '#dc2626', fontSize: 10 }} />
                <ReferenceLine y={config.maxSoC * 100} stroke="#dc2626" strokeDasharray="3 3" label={{ value: `Max SoC (${config.maxSoC * 100}%)`, fill: '#dc2626', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#cbd5e1',
                    borderRadius: '8px',
                    color: '#0f172a',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={(val: any) => [`${val}%`, t.socTrajectory]}
                />
                <Line type="monotone" dataKey={t.stateOfChargePct} stroke="#0284c7" strokeWidth={3} dot={{ r: 2 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Hourly Dispatch Schedule Plan Table */}
      <div className="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-3 bg-slate-50 border-b border-slate-300 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800">{t.settlementTableTitle}</span>
          <span className="text-slate-500 font-medium">{t.clickRowDrilldown}</span>
        </div>

        <div className="overflow-x-auto max-h-72 overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 sticky top-0 z-10 border-b border-slate-300 font-mono text-xs font-bold">
              <tr>
                <th className="py-2.5 px-3">{t.hourCol}</th>
                <th className="py-2.5 px-3">{t.lmpCol}</th>
                <th className="py-2.5 px-3">{t.actionCol}</th>
                <th className="py-2.5 px-3 text-right">{t.powerMwCol}</th>
                <th className="py-2.5 px-3 text-right">{t.energyMwhCol}</th>
                <th className="py-2.5 px-3 text-right">{t.socTrajectoryCol}</th>
                <th className="py-2.5 px-3 text-right">{t.arbitragePlCol}</th>
                <th className="py-2.5 px-3 text-right">{t.asRevenueCol}</th>
                <th className="py-2.5 px-3 text-right">{t.degCostCol}</th>
                <th className="py-2.5 px-3 text-right">{t.netMarginCol}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono text-xs">
              {hourlySchedule.map((row) => {
                const isSelected = selectedHour === row.hour;
                return (
                  <tr
                    key={row.hour}
                    onClick={() => setSelectedHour(isSelected ? null : row.hour)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-blue-50 text-slate-900 font-medium'
                        : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <td className="py-2 px-3 font-bold text-slate-900">{row.timeLabel}</td>
                    <td className="py-2 px-3 font-extrabold text-blue-700">${row.lmp.toFixed(2)}</td>
                    <td className="py-2 px-3">
                      {row.action === 'CHARGE' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-300 font-sans text-xs font-bold">
                          <ArrowDownRight className="w-3 h-3 text-sky-700" />
                          {t.actionCharge}
                        </span>
                      ) : row.action === 'DISCHARGE' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-300 font-sans text-xs font-bold">
                          <ArrowUpRight className="w-3 h-3 text-amber-700" />
                          {t.actionDischarge}
                        </span>
                      ) : row.action === 'REG_UP' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-300 font-sans text-xs font-bold">
                          {t.actionRegUp} ({row.ancillaryServiceMW}MW)
                        </span>
                      ) : row.action === 'SPIN_RESERVE' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-300 font-sans text-xs font-bold">
                          {t.actionSpinRes} ({row.ancillaryServiceMW}MW)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-sans text-xs font-medium border border-slate-200">
                          <Pause className="w-2.5 h-2.5 text-slate-400" />
                          {t.actionHoldIdle}
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-right">
                      {row.powerMW !== 0 ? (
                        <span className={row.powerMW > 0 ? 'text-amber-800 font-bold' : 'text-sky-800 font-bold'}>
                          {row.powerMW > 0 ? `+${row.powerMW.toFixed(2)}` : row.powerMW.toFixed(2)} MW
                        </span>
                      ) : (
                        <span className="text-slate-400">0.00 MW</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-right text-slate-700 font-medium">
                      {row.action === 'CHARGE' ? `${row.energyChargedMWh.toFixed(2)} MWh` : row.action === 'DISCHARGE' ? `${row.energyDischargedMWh.toFixed(2)} MWh` : '—'}
                    </td>
                    <td className="py-2 px-3 text-right text-slate-700 font-sans text-xs">
                      {(row.socStart * 100).toFixed(0)}% → <strong className="text-slate-900 font-bold">{(row.socEnd * 100).toFixed(0)}%</strong>
                    </td>
                    <td className="py-2 px-3 text-right">
                      {row.arbitrageRevenue !== 0 ? (
                        <span className={row.arbitrageRevenue > 0 ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                          {row.arbitrageRevenue > 0 ? `+$${row.arbitrageRevenue.toFixed(2)}` : `-$${Math.abs(row.arbitrageRevenue).toFixed(2)}`}
                        </span>
                      ) : (
                        <span className="text-slate-400">$0.00</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-right text-purple-700 font-semibold">
                      {row.ancillaryRevenue > 0 ? `+$${row.ancillaryRevenue.toFixed(2)}` : '—'}
                    </td>
                    <td className="py-2 px-3 text-right text-rose-700 font-medium">
                      {row.degradationCost > 0 ? `-$${row.degradationCost.toFixed(2)}` : '$0.00'}
                    </td>
                    <td className="py-2 px-3 text-right font-extrabold">
                      <span className={row.netHourlyProfit > 0 ? 'text-emerald-700' : row.netHourlyProfit < 0 ? 'text-rose-700' : 'text-slate-400'}>
                        {row.netHourlyProfit > 0 ? `+$${row.netHourlyProfit.toFixed(2)}` : row.netHourlyProfit < 0 ? `-$${Math.abs(row.netHourlyProfit).toFixed(2)}` : '$0.00'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

