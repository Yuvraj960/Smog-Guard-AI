import React, { useState } from 'react';
import { CurrentAirQuality } from '../../types/aqi';
import { FamilyProfile } from '../../types/family';
import { calculatePersonalImpact } from '../../utils/impactFormulas';
import { WhatIfCommunitySlider } from './WhatIfCommunitySlider';
import { CommunityPledge } from './CommunityPledge';
import { 
  HeartPulse, 
  Leaf, 
  Cigarette, 
  TrendingDown, 
  ShieldCheck, 
  Sliders,
  CheckCircle2
} from 'lucide-react';

interface ImpactSimulatorProps {
  aqiData: CurrentAirQuality;
  profile: FamilyProfile;
}

export const ImpactSimulator: React.FC<ImpactSimulatorProps> = ({ aqiData, profile }) => {
  const [avoidedOutdoorHours, setAvoidedOutdoorHours] = useState<number>(3.5);
  const [transitShiftDays, setTransitShiftDays] = useState<number>(4);
  const [cleanHeatingActive, setCleanHeatingActive] = useState<boolean>(true);

  const impact = calculatePersonalImpact({
    outdoorAQI: aqiData.us_aqi,
    indoorAQIWithPurification: 25, // Clean room standard with Corsi-Rosenthal / HEPA
    outdoorHoursAvoided: avoidedOutdoorHours,
    transitShiftDaysPerWeek: transitShiftDays,
    cleanHeatingAdopted: cleanHeatingActive
  });

  return (
    <div className="space-y-8">
      {/* Personal Direct Impact Calculator */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <HeartPulse className="w-5 h-5 text-rose-400" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-100">
                Personal Health & Direct Emission Ledger
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Exact aerosol inhalation savings and carbon reduction based on your daily choices in {aqiData.city}.
            </p>
          </div>
        </div>

        {/* Interactive Sliders & Toggles */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Outdoor Peak Hours Time-Shifted:
            </label>
            <div className="flex items-center justify-between text-sm font-bold text-teal-300 mb-2">
              <span>{avoidedOutdoorHours} hrs/day</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={8}
              step={0.5}
              value={avoidedOutdoorHours}
              onChange={(e) => setAvoidedOutdoorHours(Number(e.target.value))}
              className="w-full h-2 rounded bg-slate-800 appearance-none cursor-pointer accent-teal-500"
            />
            <p className="text-[10px] text-slate-500 mt-1">Time spent in filtered room vs outside</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Shared Commute / Transit Days:
            </label>
            <div className="flex items-center justify-between text-sm font-bold text-cyan-300 mb-2">
              <span>{transitShiftDays} days/week</span>
            </div>
            <input
              type="range"
              min={0}
              max={7}
              step={1}
              value={transitShiftDays}
              onChange={(e) => setTransitShiftDays(Number(e.target.value))}
              className="w-full h-2 rounded bg-slate-800 appearance-none cursor-pointer accent-cyan-500"
            />
            <p className="text-[10px] text-slate-500 mt-1">Carpool / Metro instead of solo ICE vehicle</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Zero Biomass / Wood Burning:
              </label>
              <p className="text-[11px] text-slate-400">Avoid fireplace or open burning</p>
            </div>
            <button
              onClick={() => setCleanHeatingActive(!cleanHeatingActive)}
              className={`mt-2 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                cleanHeatingActive
                  ? 'bg-emerald-600 text-slate-950'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{cleanHeatingActive ? 'Clean Heating Active' : 'Traditional Heating'}</span>
            </button>
          </div>
        </div>

        {/* Quantified Personal Results Grid */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-500/30">
            <span className="text-[10px] font-bold text-teal-400 uppercase">Particulate Kept Out of Lungs</span>
            <p className="text-2xl sm:text-3xl font-black text-teal-200 mt-1">
              {impact.personalPM25InhaledAvoidedUg.toLocaleString()} µg
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Micrograms PM2.5 avoided</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
            <span className="text-[10px] font-bold text-amber-400 uppercase">Berkeley Earth Equivalence</span>
            <p className="text-2xl sm:text-3xl font-black text-amber-200 mt-1">
              {impact.cigaretteEquivalentsAvoided}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Passive cigarettes avoided today</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
            <span className="text-[10px] font-bold text-emerald-400 uppercase">Local PM2.5 Prevented</span>
            <p className="text-2xl sm:text-3xl font-black text-emerald-200 mt-1">
              {impact.pm25EmissionsPreventedGrams} g
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Emissions kept out of neighborhood air</p>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
            <span className="text-[10px] font-bold text-cyan-400 uppercase">Daily Carbon Avoided</span>
            <p className="text-2xl sm:text-3xl font-black text-cyan-200 mt-1">
              {impact.co2EmissionsSavedKg} kg
            </p>
            <p className="text-[10px] text-slate-400 mt-1">CO₂e emissions saved</p>
          </div>
        </div>
      </div>

      {/* Community Scale Slider */}
      <WhatIfCommunitySlider />

      {/* Community Pledges */}
      <CommunityPledge />
    </div>
  );
};
