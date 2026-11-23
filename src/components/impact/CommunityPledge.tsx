import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CommunityPledge as CommunityPledgeType } from '../../types/impact';
import { ShieldCheck, Heart, Award, CheckCircle2, Circle } from 'lucide-react';
import { getStoredPledges, saveStoredPledges } from '../../services/storage';

const INITIAL_PLEDGES: CommunityPledgeType[] = [
  {
    id: 'p1',
    category: 'school',
    title: 'Zero-Idling School Zone Action',
    description: 'Turn off car engines immediately when waiting at school gates, daycare drop-offs, and curbside pickup zones.',
    impactPerHouseholdWeekly: { co2Kg: 5.2, pm25Grams: 0.12 },
    pledged: true,
    participantCount: 412
  },
  {
    id: 'p2',
    category: 'heating',
    title: 'Clean Heat & Zero Biomass Burning',
    description: 'Never burn wood, fallen leaves, garden clippings, or trash. Use electric heat pumps or zoned thermal warm layers.',
    impactPerHouseholdWeekly: { co2Kg: 18.0, pm25Grams: 35.0 },
    pledged: false,
    participantCount: 298
  },
  {
    id: 'p3',
    category: 'transit',
    title: 'Commute Carpool & Shared Transit Shift',
    description: 'Switch at least 2 commutes per week from solo gasoline car to shared metro, electric bus, or neighborhood carpools.',
    impactPerHouseholdWeekly: { co2Kg: 12.5, pm25Grams: 0.28 },
    pledged: false,
    participantCount: 345
  },
  {
    id: 'p4',
    category: 'monitoring',
    title: 'Build or Gift a DIY Air Purifier',
    description: 'Construct a Corsi-Rosenthal Box for your home or sponsor one for a local school classroom, clinic, or elderly neighbor.',
    impactPerHouseholdWeekly: { co2Kg: 0, pm25Grams: 0 },
    pledged: false,
    participantCount: 189
  }
];

export const CommunityPledge: React.FC = () => {
  const [pledgedIds, setPledgedIds] = useState<string[]>(() => getStoredPledges());

  const handleTogglePledge = (id: string) => {
    const isPledging = !pledgedIds.includes(id);
    const updated = isPledging
      ? [...pledgedIds, id]
      : pledgedIds.filter(item => item !== id);

    setPledgedIds(updated);
    saveStoredPledges(updated);

    if (isPledging) {
      // Trigger festive eco confetti!
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#14B8A6', '#10B981', '#38BDF8', '#F59E0B']
      });
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-100">
              Community Smog Defense Action Pledges
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Join hundreds of families committing to zero-cost, high-impact smog reduction habits.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold text-teal-300 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>{pledgedIds.length} Pledges Active by You</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {INITIAL_PLEDGES.map(item => {
          const isPledged = pledgedIds.includes(item.id);
          const currentCount = item.participantCount + (isPledged ? 1 : 0);

          return (
            <div
              key={item.id}
              onClick={() => handleTogglePledge(item.id)}
              role="button"
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isPledged
                  ? 'bg-teal-950/20 border-teal-500/40 shadow-lg shadow-teal-500/5'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                    {item.category} Pledge
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-slate-400">
                    <span className="font-semibold text-slate-200">{currentCount}</span>
                    <span>Pledged</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 mt-1">
                  <div className="pt-0.5 text-teal-400 shrink-0">
                    {isPledged ? (
                      <CheckCircle2 className="w-5 h-5 fill-teal-500/20" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">
                  Weekly Impact:{' '}
                  <strong className="text-emerald-300">
                    {item.impactPerHouseholdWeekly.co2Kg > 0 ? `-${item.impactPerHouseholdWeekly.co2Kg}kg CO₂` : 'Clean Air Unit'}
                  </strong>
                </span>
                <span className={`font-bold ${isPledged ? 'text-teal-300' : 'text-slate-500'}`}>
                  {isPledged ? '✓ Pledged' : '+ Take Pledge'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
