import React, { useState } from 'react';
import { Sparkles, RefreshCw, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { BESSConfig, DispatchSummary, ISOType } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface AiAdvisorCardProps {
  iso: ISOType;
  targetDate: string;
  config: BESSConfig;
  summary: DispatchSummary;
  avgSpread: number;
  peakHour: number;
  lowHour: number;
  degradationPenaltyEnabled: boolean;
  isMultiSettlement: boolean;
}

export const AiAdvisorCard: React.FC<AiAdvisorCardProps> = ({
  iso,
  targetDate,
  config,
  summary,
  avgSpread,
  peakHour,
  lowHour,
  degradationPenaltyEnabled,
  isMultiSettlement,
}) => {
  const { t, language } = useLanguage();
  const [adviceText, setAdviceText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const fetchAdvice = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          market: iso,
          targetDate,
          capacityMWh: config.capacityMWh,
          inverterMW: config.inverterMW,
          batteryModel: `${config.capacityMWh}MWh / ${config.inverterMW}MW LFP Containerized (6000 EFC)`,
          totalProfit: summary.netDailyProfit,
          arbitrageRevenue: summary.totalGrossArbitrage,
          asRevenue: summary.totalAncillaryRevenue,
          degradationCost: summary.totalDegradationCost,
          cyclesCount: summary.equivalentFullCycles,
          avgSpread,
          peakPriceHour: peakHour,
          lowPriceHour: lowHour,
          degradationPenaltyEnabled,
          isMultiSettlement,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate advice (${response.status})`);
      }

      const data = await response.json();
      setAdviceText(data.advice || null);
    } catch (err: any) {
      console.error('Error getting AI advice:', err);
      setError(err.message || 'Unable to connect to AI Advisor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-blue-50/40 border border-blue-200 rounded-xl p-5 shadow-xs text-slate-900 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-700">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                {t.aiAdvisorTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              {t.aiAdvisorDesc} ({iso})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="generate-ai-briefing-btn"
            onClick={fetchAdvice}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-xs font-bold text-white shadow-2xs transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? t.synthesizing : adviceText ? t.rerunBriefing : t.generateBriefing}</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="pt-2 border-t border-slate-200">
          {isLoading ? (
            <div className="flex items-center gap-3 py-6 justify-center text-slate-600 text-xs font-medium">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>{t.analyzingBaseline}</span>
            </div>
          ) : error ? (
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-3.5 text-xs text-rose-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                type="button"
                onClick={fetchAdvice}
                className="px-2.5 py-1 rounded bg-rose-600 text-white font-semibold hover:bg-rose-700 text-[11px] shrink-0 cursor-pointer"
              >
                {t.retry}
              </button>
            </div>
          ) : adviceText ? (
            <div className="space-y-2">
              <div className="prose prose-sm max-w-none text-xs text-slate-800 leading-relaxed font-normal bg-white border border-slate-200 rounded-lg p-4 shadow-2xs whitespace-pre-line">
                {adviceText}
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-600 italic py-2 flex items-center justify-between">
              <span>{t.aiAdvisorPlaceholder}</span>
              <button
                onClick={fetchAdvice}
                className="text-blue-700 font-bold hover:underline not-italic ml-2 cursor-pointer"
              >
                {t.analyzeNow}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

