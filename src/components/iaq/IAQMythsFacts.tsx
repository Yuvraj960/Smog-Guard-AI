import React from 'react';
import { IAQMyth } from '../../types/iaq';
import { HelpCircle, Check, X, AlertTriangle } from 'lucide-react';

const MYTHS: IAQMyth[] = [
  {
    id: 'm1',
    myth: '"Filling my living room with snake plants and peace lilies will filter winter PM2.5."',
    verdict: 'Busted',
    scientificExplanation: 'NASA’s famous 1989 clean air study evaluated trace gaseous VOCs in sealed space chambers. Plants have zero active airflow mechanisms to capture aerodynamic PM2.5 particulate matter. To match one $35 Corsi-Rosenthal box, you would need over 1,200 potted plants in a single bedroom.',
    practicalTakeaway: 'Enjoy plants for aesthetics and humidity, but never rely on them as smog filters. Active mechanical HEPA/MERV filtration is required.',
    citation: 'Drexel University IAQ Meta-Analysis, Prof. Michael Waring'
  },
  {
    id: 'm2',
    myth: '"Dry sweeping every morning keeps dust and outdoor soot from accumulating."',
    verdict: 'Busted',
    scientificExplanation: 'Standard dry brooms and non-HEPA vacuum exhausts don’t capture microscopic PM2.5; they act as particle cannons, resuspending settled toxic soot straight into the 0.5–1.5 meter breathing zone where children and pets inhale them for the next 4 hours.',
    practicalTakeaway: 'Always use damp microfiber mops or swiffers. Damp mopping binds fine particulates into liquid without resuspension.',
    citation: 'World Health Organization (WHO) Guidelines for Indoor Air Quality'
  },
  {
    id: 'm3',
    myth: '"Running an ultrasonic cool-mist humidifier with normal tap water cleans the air."',
    verdict: 'Partial Truth',
    scientificExplanation: 'While adequate humidity (40–50%) keeps respiratory mucous membranes lubricated, ultrasonic humidifiers atomize dissolved minerals (calcium, magnesium, chlorine) in tap water directly into respirable mineral PM2.5 dust clouds! Air monitors will often spike to 200+ AQI from tap water mist alone.',
    practicalTakeaway: 'Only use distilled or reverse-osmosis (RO) water in ultrasonic humidifiers, or use evaporative wick humidifiers which leave minerals on the wick.',
    citation: 'EPA Indoor Air Quality Science & Aerosol Medicine Studies'
  },
  {
    id: 'm4',
    myth: '"Setting car ventilation to Recirculation during smoggy commutes is much safer."',
    verdict: 'Confirmed',
    scientificExplanation: 'Modern vehicle cabin air filters are typically rated around MERV 8 to 11. When set to "Fresh Air", cabin air replaces every 60–90 seconds directly from the bumper-level exhaust stream of the vehicle in front of you. Pressing "Recirculation" recirculates cabin air through the filter repeatedly, slashing in-cabin PM2.5 by 75% to 85% within 3 minutes.',
    practicalTakeaway: 'Press the Recirculate button as soon as you enter urban traffic or smoggy corridors.',
    citation: 'UC Riverside Center for Environmental Research & Technology (CE-CERT)'
  }
];

export const IAQMythsFacts: React.FC = () => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex items-center space-x-2.5 pb-6 border-b border-slate-800">
        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-100">
            Indoor Air Quality: Aerosol Science vs Common Myths
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Separating peer-reviewed building physics and aerosol science from popular internet misconceptions.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {MYTHS.map(item => (
          <div
            key={item.id}
            className="p-5 rounded-2xl border border-slate-800/80 bg-slate-950/70 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 ${
                  item.verdict === 'Busted'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : item.verdict === 'Confirmed'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {item.verdict === 'Busted' ? <X className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                  <span>{item.verdict}</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Fact Check</span>
              </div>

              <h4 className="text-sm font-bold text-slate-200 mt-2">
                {item.myth}
              </h4>

              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                {item.scientificExplanation}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-900">
              <p className="text-xs text-teal-300 font-semibold">
                Actionable Rule: <span className="text-slate-300 font-normal">{item.practicalTakeaway}</span>
              </p>
              <p className="text-[9px] text-slate-500 mt-1 truncate">
                Source: {item.citation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
