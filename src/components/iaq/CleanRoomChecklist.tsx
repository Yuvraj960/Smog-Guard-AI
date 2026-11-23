import React, { useState } from 'react';
import { CleanRoomStep } from '../../types/iaq';
import { ShieldCheck, CheckCircle2, Circle, AlertCircle, Sparkles } from 'lucide-react';
import { getStoredCompletedChecklist, saveStoredCompletedChecklist } from '../../services/storage';

const INITIAL_STEPS: CleanRoomStep[] = [
  {
    id: 'c1',
    category: 'sealing',
    title: 'Under-Door Draft Stopper',
    instruction: 'Place a rolled damp bath towel or foam draft-stopper snugly along the bottom gap of the sanctuary bedroom door.',
    diyMaterial: 'Bath towel or foam pipe insulation',
    impactScore: 'Critical',
    completed: true
  },
  {
    id: 'c2',
    category: 'purification',
    title: 'Purifier Elevated & Central Placement',
    instruction: 'Position your Corsi-Rosenthal box or HEPA unit 2-3 feet off the floor, away from heavy drapery or walls for 360° airflow intake.',
    diyMaterial: 'Stool or bedside table',
    impactScore: 'Critical',
    completed: true
  },
  {
    id: 'c3',
    category: 'sealing',
    title: 'Low-Tack Window Perimeter Sealing',
    instruction: 'If winter winds cause window frame rattling or air whistling, run blue painter tape along the window sash seams to cut infiltration by 70%.',
    diyMaterial: 'Painter tape or removable weatherstrip rope',
    impactScore: 'High',
    completed: false
  },
  {
    id: 'c4',
    category: 'behavior',
    title: 'Wet-Mop Only (Never Dry Sweep!)',
    instruction: 'Dry brooms and vacuum cleaners without HEPA exhaust violently resuspend settled toxic fine dust back into breathing air. Always damp-mop surfaces.',
    diyMaterial: 'Damp microfiber cloth & mop',
    impactScore: 'Critical',
    completed: false
  },
  {
    id: 'c5',
    category: 'behavior',
    title: 'Zero Scented Candles or Incense',
    instruction: 'A single burning candle or joss stick emits indoor PM2.5 concentrations exceeding 400 µg/m³ in closed rooms. Keep room strictly scent-free.',
    diyMaterial: 'Zero cost behavior shift',
    impactScore: 'Critical',
    completed: false
  },
  {
    id: 'c6',
    category: 'ventilation',
    title: 'Air Lock Entry Protocol',
    instruction: 'When family members enter or exit the clean sanctuary room, close the door immediately behind you to prevent outdoor hallway infiltration.',
    diyMaterial: 'Family habit practice',
    impactScore: 'High',
    completed: false
  }
];

export const CleanRoomChecklist: React.FC = () => {
  const [completedIds, setCompletedIds] = useState<string[]>(() => getStoredCompletedChecklist());

  const toggleStep = (id: string) => {
    const next = completedIds.includes(id)
      ? completedIds.filter(item => item !== id)
      : [...completedIds, id];
    setCompletedIds(next);
    saveStoredCompletedChecklist(next);
  };

  const progressPercent = Math.round((completedIds.length / INITIAL_STEPS.length) * 100);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-100">
              Emergency Clean Room Sanctuary Protocol
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            When ambient AQI exceeds 250, designate one room as the airtight family safe haven.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full sm:w-48">
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="text-slate-400">Sanctuary Status</span>
            <span className="text-teal-300">{progressPercent}% Sealed</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist items */}
      <div className="mt-6 space-y-3">
        {INITIAL_STEPS.map(step => {
          const isDone = completedIds.includes(step.id);
          return (
            <div
              key={step.id}
              onClick={() => toggleStep(step.id)}
              role="button"
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
                isDone
                  ? 'bg-teal-950/20 border-teal-500/30 text-slate-200'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="pt-0.5 text-teal-400 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 fill-teal-500/20" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-600" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                    {step.title}
                  </h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    step.impactScore === 'Critical'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {step.impactScore} Impact
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {step.instruction}
                </p>
                <div className="mt-2 text-[11px] text-teal-400/90 font-medium">
                  DIY Material: <span className="text-slate-300">{step.diyMaterial}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
