import React from 'react';
import { X, CloudRain, Sun, Flame, Wind, ArrowDown, ArrowUp, ShieldCheck } from 'lucide-react';

interface InversionExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InversionExplainerModal: React.FC<InversionExplainerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">
                Understanding Winter Thermal Inversions
              </h3>
              <p className="text-xs text-slate-400">
                Why urban smog turns into an invisible atmospheric prison in winter
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Comparison: Normal vs Inversion */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Normal Atmosphere */}
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wide">Normal Days</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 font-semibold">
                  Pollution Disperses
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center text-sky-300 font-semibold">
                  ❄️ Cold Air (High Altitude)
                </div>
                <div className="flex justify-center my-0.5">
                  <ArrowUp className="w-4 h-4 text-slate-500" />
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center text-amber-300 font-semibold">
                  ☀️ Warm Ground Air (Convection)
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                Warm air near the sun-heated ground naturally rises, carrying smoke, dust, and car exhaust up into the upper atmosphere where winds disperse it safely.
              </p>
            </div>
          </div>

          {/* Thermal Inversion */}
          <div className="p-4 rounded-2xl border border-purple-500/30 bg-purple-950/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wide">Winter Inversion</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold">
                  Toxic Ground Lid
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="p-2 rounded bg-purple-900/40 border border-purple-500/40 text-center text-amber-300 font-semibold">
                  🔥 Warm Air Layer ("Lid")
                </div>
                <div className="flex justify-center my-0.5">
                  <ArrowDown className="w-4 h-4 text-purple-400" />
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800 text-center text-rose-300 font-semibold">
                  🌫️ Trapped Cold Pool (Exhaust & PM2.5)
                </div>
              </div>
              <p className="text-[11px] text-purple-200/90 mt-3 leading-relaxed">
                On clear, calm winter nights, the ground rapidly radiates away heat. A layer of cold, heavy air gets trapped underneath warm air. The warm layer acts like an airtight lid.
              </p>
            </div>
          </div>
        </div>

        {/* Why the Midday Safe Window happens */}
        <div className="mt-5 p-4 rounded-2xl bg-teal-950/30 border border-teal-500/30 flex items-start space-x-3.5">
          <Sun className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold text-teal-200">
              The "Midday Safe Window" (Why 12:30 PM – 3:30 PM is Cleaner)
            </p>
            <p className="text-slate-300 mt-1 leading-relaxed">
              Between 12:30 and 15:30, maximum solar radiation heats the surface of the earth. This breaks the inversion layer from the bottom up, allowing vertical mixing and temporarily slashing ground-level PM2.5 by 30% to 50%.
            </p>
          </div>
        </div>

        {/* Action Tips */}
        <div className="mt-5 space-y-2">
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wide">
            Golden Rules During Severe Winter Inversion
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
              ❌ <strong className="text-rose-400">Never Morning Run</strong>: Heavy deep breathing during 6 AM – 9 AM delivers 4x toxic PM2.5 deep into the bloodstream.
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
              ✅ <strong className="text-teal-400">Recirculate Car AC</strong>: Cold morning commutes in traffic jams draw pure diesel particulate unless recirculation is pressed.
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs transition-colors"
          >
            Got It, Protect My Family
          </button>
        </div>
      </div>
    </div>
  );
};
