import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ConfigPanel } from './components/ConfigPanel';
import { MarketForecastView } from './components/MarketForecastView';
import { DispatchScheduleView } from './components/DispatchScheduleView';
import { DegradationRoIView } from './components/DegradationRoIView';
import { RevenueWaterfall } from './components/RevenueWaterfall';
import { AiAdvisorCard } from './components/AiAdvisorCard';
import { FeatureGapAnalysis } from './components/FeatureGapAnalysis';
import { LiveTelemetryModal } from './components/LiveTelemetryModal';
import { OperationsOverviewHeader } from './components/OperationsOverviewHeader';
import { useLanguage } from './i18n/LanguageContext';
import {
  ISOType,
  BESSCapacity,
  BESSConfig,
} from './types';
import { MARKET_NODES } from './data/markets';
import { generate5YearHistoricalAndForecast } from './utils/forecasting';
import { optimizeBESSDispatch } from './utils/optimization';
import {
  Zap,
  TrendingUp,
  BatteryMedium,
  ShieldCheck,
  Layers,
} from 'lucide-react';

export function App() {
  const { t } = useLanguage();

  // 1. Scenario & Asset State (Requirement 1)
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  const [targetDate, setTargetDate] = useState<string>(tomorrowStr);
  const [selectedIso, setSelectedIso] = useState<ISOType>('CAISO'); // Default CAISO
  const [selectedNodeId, setSelectedNodeId] = useState<string>('TH_SP15_GEN-APND');

  // Asset Physical Configuration (Default 4MWh)
  const [bessConfig, setBessConfig] = useState<BESSConfig>({
    capacityMWh: 4, // Requirement 1 default
    inverterMW: 2, // 2-hour standard duration
    durationHours: 2,
    chemistry: 'LFP',
    roundTripEfficiency: 0.88, // 88% RTE for modern LFP
    maxSoC: 0.95, // 95% upper limit
    minSoC: 0.05, // 5% lower limit
    initialSoC: 0.50, // 50% start of day
    auxiliaryLoadPct: 0.02, // 2% HVAC/parasitic tare
    replacementCostPerMWh: 125000, // $125k/MWh
    warrantiedEFC: 6000, // 6,000 cycles to 80% SoH
    maxCyclesPerDay: 1.25, // 1.25 EFC/day OEM warranty cap
  });

  // Operational Strategy Toggles
  const [enableAncillaryServices, setEnableAncillaryServices] = useState<boolean>(true);
  const [enableDegradationHurdle, setEnableDegradationHurdle] = useState<boolean>(true);
  const [enableMultiSettlement, setEnableMultiSettlement] = useState<boolean>(false);
  const [enableWarrantyCap, setEnableWarrantyCap] = useState<boolean>(true);
  const [enableAuxiliaryLoss, setEnableAuxiliaryLoss] = useState<boolean>(true);

  // Scenario Multipliers
  const [gasPriceModifier, setGasPriceModifier] = useState<number>(1.0);
  const [weatherTempAnomaly, setWeatherTempAnomaly] = useState<number>(0);

  // Navigation & Modals
  const [activeTab, setActiveTab] = useState<'overview' | 'forecast' | 'dispatch' | 'degradation' | 'gap-analysis'>('overview');
  const [isTelemetryOpen, setIsTelemetryOpen] = useState<boolean>(false);
  const [isGapAnalysisOpen, setIsGapAnalysisOpen] = useState<boolean>(false);

  // Active pricing node details
  const activeNode = useMemo(() => {
    const nodes = MARKET_NODES[selectedIso] || [];
    return nodes.find((n) => n.id === selectedNodeId) || nodes[0] || { id: 'default', name: 'Regional Hub', iso: selectedIso, description: '', volatility: 'Moderate' as const, avgSpread: 100 };
  }, [selectedIso, selectedNodeId]);

  // 2. Generate 5-Year Historical + ML Forecast (Requirement 2)
  const forecastResults = useMemo(() => {
    return generate5YearHistoricalAndForecast({
      iso: selectedIso,
      nodeId: selectedNodeId,
      targetDate,
      weatherTempAnomaly,
      gasPriceModifier,
    });
  }, [selectedIso, selectedNodeId, targetDate, weatherTempAnomaly, gasPriceModifier]);

  // 3. Optimize BESS Dispatch & Arbitrage Strategy (Requirements 2 & 3)
  const optimizationResults = useMemo(() => {
    return optimizeBESSDispatch(
      bessConfig,
      forecastResults.hourlyData,
      {
        enableAncillaryServices,
        enableDegradationHurdle,
        enableMultiSettlement,
        enableWarrantyCap,
        enableAuxiliaryLoss,
      }
    );
  }, [
    bessConfig,
    forecastResults.hourlyData,
    enableAncillaryServices,
    enableDegradationHurdle,
    enableMultiSettlement,
    enableWarrantyCap,
    enableAuxiliaryLoss,
  ]);

  // Find Peak and Low price hours for AI briefing
  const { peakHour, lowHour } = useMemo(() => {
    let maxP = -999;
    let minP = 9999;
    let pHour = 18;
    let lHour = 12;

    forecastResults.hourlyData.forEach((d) => {
      if (d.forecastLMP > maxP) {
        maxP = d.forecastLMP;
        pHour = d.hour;
      }
      if (d.forecastLMP < minP) {
        minP = d.forecastLMP;
        lHour = d.hour;
      }
    });

    return { peakHour: pHour, lowHour: lHour };
  }, [forecastResults.hourlyData]);

  // Handle Preset Strategy Quick Clicks from Gap Analysis
  const handleApplyGapPreset = (presetId: string) => {
    if (presetId === 'ancillary') {
      setEnableAncillaryServices(true);
      setActiveTab('dispatch');
    } else if (presetId === 'multi-settlement') {
      setEnableMultiSettlement(true);
      setActiveTab('dispatch');
    } else if (presetId === 'nonlinear-dod') {
      setEnableDegradationHurdle(true);
      setActiveTab('degradation');
    } else if (presetId === 'thermal-aux') {
      setEnableAuxiliaryLoss(true);
      setActiveTab('dispatch');
    } else if (presetId === 'oem-warranty') {
      setEnableWarrantyCap(true);
      setActiveTab('degradation');
    } else if (presetId === 'scada-api') {
      setIsTelemetryOpen(true);
    }
  };

  // Reset to default
  const handleResetDefaults = () => {
    setSelectedIso('CAISO');
    setSelectedNodeId('TH_SP15_GEN-APND');
    setBessConfig({
      capacityMWh: 4,
      inverterMW: 2,
      durationHours: 2,
      chemistry: 'LFP',
      roundTripEfficiency: 0.88,
      maxSoC: 0.95,
      minSoC: 0.05,
      initialSoC: 0.50,
      auxiliaryLoadPct: 0.02,
      replacementCostPerMWh: 125000,
      warrantiedEFC: 6000,
      maxCyclesPerDay: 1.25,
    });
    setEnableAncillaryServices(true);
    setEnableDegradationHurdle(true);
    setEnableMultiSettlement(false);
    setEnableWarrantyCap(true);
    setEnableAuxiliaryLoss(true);
    setGasPriceModifier(1.0);
    setWeatherTempAnomaly(0);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased">
      {/* Top Header */}
      <Header
        iso={selectedIso}
        nodeName={activeNode.name}
        capacityMWh={bessConfig.capacityMWh}
        inverterMW={bessConfig.inverterMW}
        onOpenTelemetry={() => setIsTelemetryOpen(true)}
        onOpenGapAnalysis={() => setIsGapAnalysisOpen(true)}
      />

      {/* Main App Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Asset & Market Configuration Panel (Requirements 1 & 3) */}
        <ConfigPanel
          targetDate={targetDate}
          onDateChange={setTargetDate}
          selectedIso={selectedIso}
          onIsoChange={(newIso) => {
            setSelectedIso(newIso);
            const nodes = MARKET_NODES[newIso];
            if (nodes && nodes.length > 0) {
              setSelectedNodeId(nodes[0].id);
            }
          }}
          selectedNodeId={selectedNodeId}
          onNodeChange={setSelectedNodeId}
          bessConfig={bessConfig}
          onConfigChange={(newCfg) => setBessConfig((prev) => ({ ...prev, ...newCfg }))}
          enableAncillaryServices={enableAncillaryServices}
          onToggleAncillary={setEnableAncillaryServices}
          enableDegradationHurdle={enableDegradationHurdle}
          onToggleDegradationHurdle={setEnableDegradationHurdle}
          enableMultiSettlement={enableMultiSettlement}
          onToggleMultiSettlement={setEnableMultiSettlement}
          enableWarrantyCap={enableWarrantyCap}
          onToggleWarrantyCap={setEnableWarrantyCap}
          enableAuxiliaryLoss={enableAuxiliaryLoss}
          onToggleAuxiliaryLoss={setEnableAuxiliaryLoss}
          gasPriceModifier={gasPriceModifier}
          onGasPriceChange={setGasPriceModifier}
          weatherTempAnomaly={weatherTempAnomaly}
          onWeatherTempChange={setWeatherTempAnomaly}
          onResetDefaults={handleResetDefaults}
        />

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 pb-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 w-full text-xs">
            <button
              id="tab-dispatch"
              onClick={() => setActiveTab('dispatch')}
              className={`w-full px-3 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 cursor-pointer text-center select-none transition-all duration-100 ${
                activeTab === 'dispatch'
                  ? 'bg-blue-600 text-white shadow-[0_4px_0_0_#1d4ed8] active:shadow-[0_1px_0_0_#1d4ed8] active:translate-y-[3px] border border-blue-500'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-300 shadow-[0_4px_0_0_#cbd5e1] hover:shadow-[0_4px_0_0_#94a3b8] hover:bg-slate-50 active:shadow-[0_1px_0_0_#cbd5e1] active:translate-y-[3px]'
              }`}
            >
              <Zap className="w-4 h-4 shrink-0" />
              <span className="truncate">{t.tabDispatch}</span>
            </button>

            <button
              id="tab-overview"
              onClick={() => setActiveTab('overview')}
              className={`w-full px-3 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 cursor-pointer text-center select-none transition-all duration-100 ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-[0_4px_0_0_#1d4ed8] active:shadow-[0_1px_0_0_#1d4ed8] active:translate-y-[3px] border border-blue-500'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-300 shadow-[0_4px_0_0_#cbd5e1] hover:shadow-[0_4px_0_0_#94a3b8] hover:bg-slate-50 active:shadow-[0_1px_0_0_#cbd5e1] active:translate-y-[3px]'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span className="truncate">{t.tabOverview}</span>
            </button>

            <button
              id="tab-forecast"
              onClick={() => setActiveTab('forecast')}
              className={`w-full px-3 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 cursor-pointer text-center select-none transition-all duration-100 ${
                activeTab === 'forecast'
                  ? 'bg-blue-600 text-white shadow-[0_4px_0_0_#1d4ed8] active:shadow-[0_1px_0_0_#1d4ed8] active:translate-y-[3px] border border-blue-500'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-300 shadow-[0_4px_0_0_#cbd5e1] hover:shadow-[0_4px_0_0_#94a3b8] hover:bg-slate-50 active:shadow-[0_1px_0_0_#cbd5e1] active:translate-y-[3px]'
              }`}
            >
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span className="truncate">{t.tabForecast}</span>
            </button>

            <button
              id="tab-degradation"
              onClick={() => setActiveTab('degradation')}
              className={`w-full px-3 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 cursor-pointer text-center select-none transition-all duration-100 ${
                activeTab === 'degradation'
                  ? 'bg-blue-600 text-white shadow-[0_4px_0_0_#1d4ed8] active:shadow-[0_1px_0_0_#1d4ed8] active:translate-y-[3px] border border-blue-500'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-300 shadow-[0_4px_0_0_#cbd5e1] hover:shadow-[0_4px_0_0_#94a3b8] hover:bg-slate-50 active:shadow-[0_1px_0_0_#cbd5e1] active:translate-y-[3px]'
              }`}
            >
              <BatteryMedium className="w-4 h-4 shrink-0" />
              <span className="truncate">{t.tabDegradation}</span>
            </button>

            <button
              id="tab-gap-analysis"
              onClick={() => setActiveTab('gap-analysis')}
              className={`w-full px-3 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 cursor-pointer text-center select-none transition-all duration-100 ${
                activeTab === 'gap-analysis'
                  ? 'bg-blue-600 text-white shadow-[0_4px_0_0_#1d4ed8] active:shadow-[0_1px_0_0_#1d4ed8] active:translate-y-[3px] border border-blue-500'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-300 shadow-[0_4px_0_0_#cbd5e1] hover:shadow-[0_4px_0_0_#94a3b8] hover:bg-slate-50 active:shadow-[0_1px_0_0_#cbd5e1] active:translate-y-[3px]'
              }`}
            >
              <ShieldCheck className={`w-4 h-4 shrink-0 ${activeTab === 'gap-analysis' ? 'text-white' : 'text-blue-600'}`} />
              <span className="truncate">{t.tabMarginImprovement}</span>
            </button>
          </div>
        </div>

        {/* Tab Views */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Key Metrics Header Strip */}
            <OperationsOverviewHeader
              summary={optimizationResults.summary}
              config={bessConfig}
              iso={selectedIso}
              forecastAvgSpread={forecastResults.forecastAvgSpread}
              maxDoD={optimizationResults.maxDoD}
            />

            {/* AI Quantitative Briefing */}
            <AiAdvisorCard
              iso={selectedIso}
              targetDate={targetDate}
              config={bessConfig}
              summary={optimizationResults.summary}
              avgSpread={forecastResults.forecastAvgSpread}
              peakHour={peakHour}
              lowHour={lowHour}
              degradationPenaltyEnabled={enableDegradationHurdle}
              isMultiSettlement={enableMultiSettlement}
            />

            {/* Revenue & Cost Waterfall */}
            <RevenueWaterfall summary={optimizationResults.summary} />
          </div>
        )}

        {activeTab === 'forecast' && (
          <MarketForecastView
            hourlyData={forecastResults.hourlyData}
            iso={selectedIso}
            nodeName={activeNode.name}
            targetDate={targetDate}
            historicalPeakAvg={forecastResults.historicalPeakAvg}
            historicalOffPeakAvg={forecastResults.historicalOffPeakAvg}
            forecastMaxLMP={forecastResults.forecastMaxLMP}
            forecastMinLMP={forecastResults.forecastMinLMP}
            forecastAvgSpread={forecastResults.forecastAvgSpread}
            duckCurveDepth={forecastResults.duckCurveDepth}
          />
        )}

        {activeTab === 'dispatch' && (
          <DispatchScheduleView
            hourlySchedule={optimizationResults.hourlySchedule}
            summary={optimizationResults.summary}
            config={bessConfig}
            targetDate={targetDate}
          />
        )}

        {activeTab === 'degradation' && (
          <DegradationRoIView
            config={bessConfig}
            summary={optimizationResults.summary}
            maxDoD={optimizationResults.maxDoD}
          />
        )}

        {activeTab === 'gap-analysis' && (
          <FeatureGapAnalysis
            currentIso={selectedIso}
            onApplyPreset={handleApplyGapPreset}
          />
        )}
      </main>

      {/* Gap Analysis Slide-over / Modal (if opened via Header button) */}
      {isGapAnalysisOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-300 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <FeatureGapAnalysis
              currentIso={selectedIso}
              onApplyPreset={(id) => {
                handleApplyGapPreset(id);
                setIsGapAnalysisOpen(false);
              }}
              onClose={() => setIsGapAnalysisOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Live SCADA Telemetry Modal */}
      <LiveTelemetryModal
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
        config={bessConfig}
        iso={selectedIso}
        nodeName={activeNode.name}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-600 py-4 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">{t.appTitle}</span>
            <span>•</span>
            <span className="text-slate-800 font-semibold">{t.appDeveloper}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

