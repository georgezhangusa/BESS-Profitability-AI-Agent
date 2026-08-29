import React, { useState, useEffect } from 'react';
import { Activity, X } from 'lucide-react';
import { BESSConfig, ISOType } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface LiveTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BESSConfig;
  iso: ISOType;
  nodeName: string;
}

export const LiveTelemetryModal: React.FC<LiveTelemetryModalProps> = ({
  isOpen,
  onClose,
  config,
  iso,
  nodeName,
}) => {
  const { t, formatNumber } = useLanguage();
  const [currentSoc] = useState<number>(0.64);
  const [voltage, setVoltage] = useState<number>(824.5);
  const [currentAmps] = useState<number>(-142.3);
  const [cellTempAvg, setCellTempAvg] = useState<number>(24.8);
  const [cellTempMax, setCellTempMax] = useState<number>(26.2);
  const [gridFreq, setGridFreq] = useState<number>(60.01);
  const [hvacPowerKW, setHvacPowerKW] = useState<number>(28.4);
  const [modbusPackets, setModbusPackets] = useState<number>(142850);

  // Simulate real-time SCADA telemetry jitter
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setGridFreq(59.97 + Math.random() * 0.06);
      setVoltage(820 + Math.random() * 10);
      setCellTempAvg(24.5 + Math.random() * 0.8);
      setCellTempMax(25.8 + Math.random() * 0.9);
      setHvacPowerKW(25 + Math.random() * 6);
      setModbusPackets((prev) => prev + 12);
    }, 1500);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPowerMW = ((voltage * currentAmps) / 1000000).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white border border-slate-300 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-5 text-slate-900 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-700">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">
                  {t.scadaModalTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {t.scadaLiveFeed}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                {config.capacityMWh}MWh / {config.inverterMW}MW Containerized LFP Array • Node: {nodeName} ({iso})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Gauges Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-50 border border-slate-300 rounded-xl p-3.5 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.scadaGridFreq}</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-blue-700 font-mono">
                {formatNumber(gridFreq, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-slate-600 font-medium">Hz</span>
            </div>
            <span className="text-xs text-emerald-800 font-semibold block mt-0.5">{t.scadaFreqLocked}</span>
          </div>

          <div className="bg-slate-50 border border-slate-300 rounded-xl p-3.5 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.scadaRealTimeSoc}</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-cyan-700 font-mono">
                {formatNumber(currentSoc * 100, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%
              </span>
            </div>
            <span className="text-xs text-slate-600 font-medium block mt-0.5">{formatNumber(currentSoc * config.capacityMWh, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MWh</span>
          </div>

          <div className="bg-slate-50 border border-slate-300 rounded-xl p-3.5 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.scadaDcVoltage}</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-slate-800 font-mono">
                {formatNumber(voltage, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
              </span>
              <span className="text-xs text-slate-600 font-medium">VDC</span>
            </div>
            <span className="text-xs text-slate-600 font-medium block mt-0.5">Nominal 800V String</span>
          </div>

          <div className="bg-slate-50 border border-slate-300 rounded-xl p-3.5 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.scadaCellTempAvg}</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-amber-700 font-mono">
                {formatNumber(cellTempAvg, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}°
              </span>
              <span className="text-xs text-slate-600 font-medium">C</span>
            </div>
            <span className="text-xs text-slate-600 font-medium block mt-0.5">{t.scadaCellTempMax}: {formatNumber(cellTempMax, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}°C</span>
          </div>
        </div>

        {/* BMS Hardware Registers */}
        <div className="bg-slate-50 border border-slate-300 rounded-xl p-4 space-y-3 shadow-2xs text-xs font-mono">
          <div className="flex items-center justify-between text-slate-700 pb-2 border-b border-slate-200">
            <span className="font-sans font-bold uppercase text-slate-800">{t.scadaRegistersTitle}</span>
            <span className="text-slate-500 font-mono">Port: 502 | Unit ID: 1 | Packets: {formatNumber(modbusPackets)}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-800 font-medium">
            <div className="bg-white border border-slate-200 rounded-lg p-2.5 space-y-1.5 shadow-2xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">40001 ({t.scadaInverterPcs}):</span>
                <span className="text-blue-700 font-bold">GRID_FOLLOWING_PQ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">40002 ({t.scadaInverterPower}):</span>
                <span className="text-slate-900 font-bold">{currentPowerMW} MW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">40003 (Reactive Setpoint):</span>
                <span className="text-slate-900">0.00 MVAR</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-2.5 space-y-1.5 shadow-2xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">40004 ({t.scadaHvacSystem}):</span>
                <span className="text-amber-800 font-bold">{formatNumber(hvacPowerKW, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} kW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">40005 ({t.scadaIsoResistance}):</span>
                <span className="text-emerald-700 font-bold">&gt; 50 MΩ ({t.statusNominal})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">40006 ({t.scadaDcContactor}):</span>
                <span className="text-emerald-700 font-bold">MAIN_CLOSED_ENERGIZED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
            <span className="font-semibold text-slate-800">EMS Telemetry Loop Online (Modbus / DNP3)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-2xs transition-colors cursor-pointer"
          >
            {t.done}
          </button>
        </div>
      </div>
    </div>
  );
};

