import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { ISOType } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface FeatureGapAnalysisProps {
  currentIso: ISOType;
  onApplyPreset: (presetName: string) => void;
  onClose?: () => void;
}

export const FeatureGapAnalysis: React.FC<FeatureGapAnalysisProps> = ({
  currentIso,
  onApplyPreset,
  onClose,
}) => {
  const { t } = useLanguage();

  const gapItems = [
    {
      id: 'ancillary',
      title: t.gapItem1Title,
      status: t.implementedInEngine,
      category: t.revenueExpansion,
      impact: '+25% to +45% Revenue Uplift',
      description: t.gapItem1Desc,
      actionLabel: t.gapItem1Action,
      isHot: true,
    },
    {
      id: 'multi-settlement',
      title: t.gapItem2Title,
      status: t.implementedInEngine,
      category: t.marketExecution,
      impact: 'Captures 5-Minute Price Spikes',
      description: t.gapItem2Desc,
      actionLabel: t.gapItem2Action,
      isHot: true,
    },
    {
      id: 'nonlinear-dod',
      title: t.gapItem3Title,
      status: t.implementedInEngine,
      category: t.assetLongevity,
      impact: '+40% Extended Battery Life',
      description: t.gapItem3Desc,
      actionLabel: t.gapItem3Action,
      isHot: false,
    },
    {
      id: 'thermal-aux',
      title: t.gapItem4Title,
      status: t.implementedInEngine,
      category: t.operationalAccuracy,
      impact: 'Prevents 3-5% Revenue Overestimation',
      description: t.gapItem4Desc,
      actionLabel: t.gapItem4Action,
      isHot: false,
    },
    {
      id: 'oem-warranty',
      title: t.gapItem5Title,
      status: t.implementedInEngine,
      category: t.riskMitigation,
      impact: 'Guarantees 10-15 Year Warranty',
      description: t.gapItem5Desc,
      actionLabel: t.gapItem5Action,
      isHot: false,
    },
    {
      id: 'capacity-ra',
      title: t.gapItem6Title,
      status: t.engineReady,
      category: t.fixedCapacityRevenue,
      impact: '+$3,000 to +$8,000 / MW-month',
      description: t.gapItem6Desc,
      actionLabel: t.gapItem6Action,
      isHot: true,
    },
    {
      id: 'scada-api',
      title: t.gapItem7Title,
      status: t.protocolSimulated,
      category: t.executionInfrastructure,
      impact: 'Sub-Second Automated Execution',
      description: t.gapItem7Desc,
      actionLabel: t.gapItem7Action,
      isHot: false,
    },
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs text-slate-900 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-extrabold text-slate-900">
              {t.featureGapTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-0.5 font-medium">
            {t.featureGapSubtitle}
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            {t.closePanel}
          </button>
        )}
      </div>

      {/* Grid of Key Features & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gapItems.map((item) => (
          <div
            key={item.id}
            className="bg-slate-50 border border-slate-300 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-2xs hover:border-blue-400 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h4>
                {item.isHot && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300 shrink-0">
                    {t.highValue}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold">
                  {item.category}
                </span>
                <span className="text-emerald-800 font-bold">{t.impactLabel}: {item.impact}</span>
              </div>

              <p className="text-xs text-slate-700 font-normal leading-relaxed">{item.description}</p>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{item.status}</span>
              </div>

              <button
                onClick={() => onApplyPreset(item.id)}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
              >
                <span>{item.actionLabel}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ISO-Specific Nuances Table */}
      <div className="bg-slate-50 border border-slate-300 rounded-xl p-4 space-y-3 shadow-2xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          {t.regionalMarketRules}
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 border-b border-slate-300 font-bold font-mono">
              <tr>
                <th className="py-2 px-3">{t.wholesaler}</th>
                <th className="py-2 px-3">{t.topRevenueDriver}</th>
                <th className="py-2 px-3">{t.primaryRisk}</th>
                <th className="py-2 px-3">{t.optimalConfig}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800 font-medium">
              <tr className={currentIso === 'CAISO' ? 'bg-blue-50/80 font-bold' : ''}>
                <td className="py-2.5 px-3 font-bold text-blue-800">{t.caisoRowTitle}</td>
                <td className="py-2.5 px-3">{t.caisoDriver}</td>
                <td className="py-2.5 px-3 text-rose-800 font-semibold">{t.caisoRisk}</td>
                <td className="py-2.5 px-3">{t.caisoConfig}</td>
              </tr>
              <tr className={currentIso === 'ERCOT' ? 'bg-blue-50/80 font-bold' : ''}>
                <td className="py-2.5 px-3 font-bold text-amber-800">{t.ercotRowTitle}</td>
                <td className="py-2.5 px-3">{t.ercotDriver}</td>
                <td className="py-2.5 px-3 text-rose-800 font-semibold">{t.ercotRisk}</td>
                <td className="py-2.5 px-3">{t.ercotConfig}</td>
              </tr>
              <tr className={currentIso === 'PJM' ? 'bg-blue-50/80 font-bold' : ''}>
                <td className="py-2.5 px-3 font-bold text-purple-800">{t.pjmRowTitle}</td>
                <td className="py-2.5 px-3">{t.pjmDriver}</td>
                <td className="py-2.5 px-3 text-rose-800 font-semibold">{t.pjmRisk}</td>
                <td className="py-2.5 px-3">{t.pjmConfig}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

