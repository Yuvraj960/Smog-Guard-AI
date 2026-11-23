import React from 'react';
import { RoutineItem } from '../../types/family';
import { 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle,
  Leaf,
  HeartPulse
} from 'lucide-react';

interface RoutineCardProps {
  item: RoutineItem;
}

export const RoutineCard: React.FC<RoutineCardProps> = ({ item }) => {
  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-700 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center space-x-2.5">
          <span className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/20 text-xs font-bold font-mono">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>{item.timeSlot}</span>
          </span>
          <h4 className="text-sm sm:text-base font-bold text-slate-100">
            {item.activity}
          </h4>
        </div>
        <span className="self-start sm:self-center px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-semibold">
          {item.badge}
        </span>
      </div>

      {/* Routine Comparison Grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Recommended Low-Emission Action */}
        <div className="p-3.5 rounded-xl bg-teal-950/20 border border-teal-500/30">
          <div className="flex items-center space-x-1.5 text-teal-400 font-bold mb-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Recommended SmogGuard Routine</span>
          </div>
          <p className="text-slate-200 leading-relaxed">
            {item.recommendedAction}
          </p>
        </div>

        {/* Conventional High-Emission / Exposure Habit */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-400">
          <div className="flex items-center space-x-1.5 text-rose-400 font-bold mb-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Conventional High-Risk Habit</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            {item.conventionalAlternative}
          </p>
        </div>
      </div>

      {/* Vulnerability Notice if any */}
      {item.vulnerabilityNotice && (
        <div className="mt-3 p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 flex items-start space-x-2 text-xs text-amber-200/90">
          <HeartPulse className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>{item.vulnerabilityNotice}</p>
        </div>
      )}

      {/* Direct Impact Calculation Bar */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px]">
        <div className="flex items-center space-x-1.5 text-slate-400">
          <Leaf className="w-3.5 h-3.5 text-emerald-400" />
          <span>Local PM2.5 Prevented:</span>
          <strong className="text-emerald-300">+{item.emissionSavedGramsPM25} g</strong>
        </div>

        <div className="flex items-center space-x-1.5 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
          <span>Toxic Exposure Avoided:</span>
          <strong className="text-teal-300">{item.personalExposureAvoidedHours} hrs</strong>
        </div>

        <div className="flex items-center space-x-1.5 text-slate-400">
          <HeartPulse className="w-3.5 h-3.5 text-cyan-400" />
          <span>Inhaled PM2.5 Kept Out:</span>
          <strong className="text-cyan-300">{item.inhalationDeltaUg} µg</strong>
        </div>
      </div>
    </div>
  );
};
