import React, { useState } from 'react';
import { RoutineItem, FamilyProfile } from '../../types/family';
import { CurrentAirQuality } from '../../types/aqi';
import { RoutineCard } from './RoutineCard';
import { 
  CalendarCheck, 
  Sparkles, 
  SlidersHorizontal, 
  Leaf, 
  ShieldCheck, 
  Heart,
  RefreshCw
} from 'lucide-react';
import { generateSmartFamilyRoutine } from '../../services/localHeuristics';

interface RoutineOptimizerProps {
  aqiData: CurrentAirQuality;
  profile: FamilyProfile;
  onOpenFamilyModal: () => void;
  onAskAI: (prompt: string) => void;
}

export const RoutineOptimizer: React.FC<RoutineOptimizerProps> = ({
  aqiData,
  profile,
  onOpenFamilyModal,
  onAskAI
}) => {
  const [routines, setRoutines] = useState<RoutineItem[]>(() => 
    generateSmartFamilyRoutine(aqiData, profile)
  );
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Cumulative daily savings
  const totalGramsSaved = Math.round(
    routines.reduce((acc, curr) => acc + curr.emissionSavedGramsPM25, 0) * 10
  ) / 10;
  const totalHoursAvoided = Math.round(
    routines.reduce((acc, curr) => acc + curr.personalExposureAvoidedHours, 0) * 10
  ) / 10;
  const totalUgInhaledAvoided = routines.reduce((acc, curr) => acc + curr.inhalationDeltaUg, 0);

  const handleRefresh = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setRoutines(generateSmartFamilyRoutine(aqiData, profile));
      setIsRegenerating(false);
    }, 400);
  };

  const filteredRoutines = filterCategory === 'all'
    ? routines
    : routines.filter(r => r.category === filterCategory);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 sm:p-8 backdrop-blur-sm">
      {/* Header and Summary stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <CalendarCheck className="w-5 h-5 text-teal-400" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-100">
              Personalized Smog Day Routine Optimizer
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Engineered for <strong className="text-slate-200">{profile.familyName}</strong> ({profile.members.length} members) at AQI <strong className="text-amber-400">{aqiData.us_aqi}</strong>. Time-shifts exposure away from nocturnal inversions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenFamilyModal}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-teal-400" />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={handleRefresh}
            disabled={isRegenerating}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 text-xs font-bold transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>Recalculate</span>
          </button>

          <button
            onClick={() => onAskAI(`What is the optimal smog day schedule for my family today? Current AQI is ${aqiData.us_aqi}.`)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-500/40 text-purple-300 text-xs font-semibold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Ask GenAI Co-pilot</span>
          </button>
        </div>
      </div>

      {/* Cumulative Impact Ledger Bar */}
      <div className="my-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Local PM2.5 Prevented</p>
            <p className="text-xl font-black text-slate-100">+{totalGramsSaved} Grams</p>
            <p className="text-[10px] text-slate-500">By avoiding idling & biomass heating</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Toxic Peak Hours Avoided</p>
            <p className="text-xl font-black text-slate-100">{totalHoursAvoided} Hours</p>
            <p className="text-slate-500 text-[10px]">Time-shifted into clean safe windows</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Personal Inhaled PM2.5 Avoided</p>
            <p className="text-xl font-black text-slate-100">{totalUgInhaledAvoided} µg</p>
            <p className="text-slate-500 text-[10px]">Kept out of alveolar capillaries</p>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {[
          { key: 'all', label: 'All Routine Steps' },
          { key: 'school', label: 'School Drop-off' },
          { key: 'indoor', label: 'Indoor Sanctuary' },
          { key: 'ventilation', label: 'Safe Ventilation' },
          { key: 'commute', label: 'Transit / Commute' },
          { key: 'heating', label: 'Heating & Cooking' },
        ].map(cat => (
          <button
            key={cat.key}
            onClick={() => setFilterCategory(cat.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterCategory === cat.key
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Routine Cards List */}
      <div className="space-y-4">
        {filteredRoutines.map(item => (
          <RoutineCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
