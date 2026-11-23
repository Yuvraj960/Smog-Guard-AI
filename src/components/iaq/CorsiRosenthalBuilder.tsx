import React, { useState } from 'react';
import { CorsiRosenthalConfig } from '../../types/iaq';
import { calculateCorsiRosenthalSpecs } from '../../utils/impactFormulas';
import { 
  Box, 
  DollarSign, 
  Zap, 
  Wind, 
  CheckCircle2, 
  Layers, 
  Maximize2,
  Info,
  Clock
} from 'lucide-react';
import { getStoredCorsiConfig, saveStoredCorsiConfig } from '../../services/storage';

export const CorsiRosenthalBuilder: React.FC = () => {
  const [config, setConfig] = useState<CorsiRosenthalConfig>(() => getStoredCorsiConfig());

  const specs = calculateCorsiRosenthalSpecs(config);

  const updateConfig = (newConfig: Partial<CorsiRosenthalConfig>) => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);
    saveStoredCorsiConfig(updated);
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <Box className="w-5 h-5 text-teal-400" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-100">
              Interactive Corsi-Rosenthal (DIY HEPA) Sizing Lab
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Build a medical-grade aerosol scrubber for ~$40 that outperforms $450 commercial purifiers. Research verified by UC Davis & EPA.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
            ${specs.savingsUSD} Family Savings
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4">
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            1. Target Room Dimensions (ft)
          </p>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Width (ft)</label>
              <input
                type="number"
                min={8}
                max={40}
                value={config.roomWidthFeet}
                onChange={(e) => updateConfig({ roomWidthFeet: Number(e.target.value) || 10 })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-semibold text-slate-200"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Length (ft)</label>
              <input
                type="number"
                min={8}
                max={50}
                value={config.roomLengthFeet}
                onChange={(e) => updateConfig({ roomLengthFeet: Number(e.target.value) || 10 })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-semibold text-slate-200"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Height (ft)</label>
              <input
                type="number"
                min={7}
                max={16}
                value={config.ceilingHeightFeet}
                onChange={(e) => updateConfig({ ceilingHeightFeet: Number(e.target.value) || 9 })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-semibold text-slate-200"
              />
            </div>
          </div>

          <p className="text-xs font-bold text-slate-300 uppercase tracking-wider pt-2">
            2. Build Configuration
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Filter Layout</label>
              <select
                value={config.filterCount}
                onChange={(e) => updateConfig({ filterCount: Number(e.target.value) as 4 | 5 })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-medium"
              >
                <option value={4}>4-Filter Cube (Standard)</option>
                <option value={5}>5-Filter Comparetto Cube</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Filter Thickness</label>
              <select
                value={config.filterThicknessInches}
                onChange={(e) => updateConfig({ filterThicknessInches: Number(e.target.value) as 1 | 2 })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-medium"
              >
                <option value={2}>2" Pleat (Quieter, 6 mo life)</option>
                <option value={1}>1" Pleat (Budget friendly)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Fan Speed Setting</label>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'medium', 'high'] as const).map(speed => (
                <button
                  key={speed}
                  onClick={() => updateConfig({ fanSpeed: speed })}
                  className={`py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                    config.fanSpeed === speed
                      ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {speed}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Assembly Diagram Summary */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
            <p className="font-bold text-teal-300 flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Assembly Pro-Tip: The Cardboard Shroud</span>
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Cut an 14-inch circular hole in a piece of cardboard and tape it over the front of the 20" box fan. Box fan blade tips create back-eddies in the corners; covering them increases CADR airflow by <strong>+20%</strong> while making the unit quieter!
            </p>
          </div>
        </div>

        {/* Live Metrics Output Column */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* CADR */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Clean Air Delivery (CADR)</span>
              <p className="text-2xl font-black text-teal-300 mt-1">{specs.effectiveCADR} CFM</p>
              <p className="text-[10px] text-slate-500">Exceeds most $400 HEPA purifiers</p>
            </div>

            {/* ACH */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Air Changes/Hr (ACH)</span>
              <p className="text-2xl font-black text-cyan-300 mt-1">{specs.estimatedACHAchieved} ACH</p>
              <p className="text-[10px] text-slate-500">Target for smog: 4.0 - 6.0 ACH</p>
            </div>

            {/* Clearance Time */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">80% PM2.5 Clearance</span>
              <p className="text-2xl font-black text-amber-300 mt-1">{specs.smogClearanceTimeMinutes} Mins</p>
              <p className="text-[10px] text-slate-500">From 300 AQI to clean room safe</p>
            </div>

            {/* Total Build Cost */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Total DIY Cost</span>
              <p className="text-2xl font-black text-emerald-400 mt-1">${specs.totalBuildCostUSD}</p>
              <p className="text-[10px] text-slate-500">Fan + MERV 13 Filters + Tape</p>
            </div>

            {/* Commercial Comparison */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Commercial HEPA Cost</span>
              <p className="text-2xl font-black text-slate-400 mt-1 line-through">${specs.commercialPurifierCostEquiv}</p>
              <p className="text-[10px] text-emerald-400 font-semibold">Save ${specs.savingsUSD} (88% less)</p>
            </div>

            {/* Monthly Electricity */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Running Cost / Month</span>
              <p className="text-2xl font-black text-sky-300 mt-1">${specs.monthlyElectricityCostUSD}</p>
              <p className="text-[10px] text-slate-500">Running 16h/day (~{specs.estimatedWattage}W)</p>
            </div>
          </div>

          {/* Sizing Status Banner */}
          <div className={`mt-4 p-4 rounded-2xl border flex items-center justify-between ${
            specs.estimatedACHAchieved >= 4.0
              ? 'bg-emerald-950/20 border-emerald-500/30'
              : 'bg-amber-950/20 border-amber-500/30'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-xl ${
                specs.estimatedACHAchieved >= 4.0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
              }`}>
                {specs.estimatedACHAchieved >= 4.0 ? <CheckCircle2 className="w-5 h-5" /> : <Info className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">
                  {specs.estimatedACHAchieved >= 4.0
                    ? `Optimal Protection Achieved for ${specs.roomVolumeCuFt.toLocaleString()} cu ft Room`
                    : 'Marginal Sizing for High Smog Days'}
                </p>
                <p className="text-xs text-slate-400">
                  {specs.estimatedACHAchieved >= 4.0
                    ? `Achieving ${specs.estimatedACHAchieved} ACH cleans room air every ${Math.round(60 / specs.estimatedACHAchieved)} minutes.`
                    : 'Consider running fan on High or adding a second C-R box to maintain >= 5 ACH.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
