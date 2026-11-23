import React, { useState } from 'react';
import { Users, Leaf, HeartPulse, Building2, TrendingDown } from 'lucide-react';

export const WhatIfCommunitySlider: React.FC = () => {
  const [households, setHouseholds] = useState<number>(250);

  // Calculations:
  // Each household shifting to no-idling + carpool + clean heating saves approx:
  // - 0.25 kg of direct PM2.5 emissions per week
  // - 24 kg of CO2 emissions per week
  // - ~0.008 avoided pediatric asthma / elderly respiratory hospital outpatient visits per week
  const weeklyPM25Kg = Math.round((households * 0.25) * 10) / 10;
  const weeklyCO2Tons = Math.round((households * 0.024) * 10) / 10;
  const avoidedHospitalVisits = Math.max(1, Math.round(households * 0.008));
  const cleanAirEquivalentTrees = Math.round(households * 1.8);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-100">
              Community Scale "What-If" Smog Multiplier
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate the collective emissions and pediatric health impact if your neighborhood unites for clean air.
          </p>
        </div>
      </div>

      {/* Household Slider Control */}
      <div className="mt-6 p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center space-x-2">
            <Users className="w-4 h-4 text-teal-400" />
            <span>Participating Community Households:</span>
          </label>
          <span className="text-xl sm:text-2xl font-black text-teal-300">
            {households.toLocaleString()} Homes
          </span>
        </div>

        <input
          type="range"
          min={20}
          max={2000}
          step={20}
          value={households}
          onChange={(e) => setHouseholds(Number(e.target.value))}
          className="w-full h-2.5 rounded-lg bg-slate-800 appearance-none cursor-pointer accent-teal-500"
        />

        <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 font-mono">
          <span>20 (One Block)</span>
          <span>500 (Neighborhood)</span>
          <span>2,000 (District Ward)</span>
        </div>
      </div>

      {/* Impact Multiplier Grid */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* PM2.5 Prevented */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
          <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 w-fit mb-2">
            <Leaf className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Toxic PM2.5 Slashed</p>
            <p className="text-2xl sm:text-3xl font-black text-teal-300 mt-1">
              {weeklyPM25Kg} kg
            </p>
            <p className="text-[10px] text-slate-500">Per winter week</p>
          </div>
        </div>

        {/* CO2 Emissions */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 w-fit mb-2">
            <TrendingDown className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">CO₂ Footprint Reduced</p>
            <p className="text-2xl sm:text-3xl font-black text-cyan-300 mt-1">
              {weeklyCO2Tons} Tons
            </p>
            <p className="text-[10px] text-slate-500">Per winter week</p>
          </div>
        </div>

        {/* Avoided Hospital Visits */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 w-fit mb-2">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Emergency Visits Averted</p>
            <p className="text-2xl sm:text-3xl font-black text-rose-300 mt-1">
              ~{avoidedHospitalVisits} Patients
            </p>
            <p className="text-[10px] text-slate-500">Pediatric asthma & seniors</p>
          </div>
        </div>

        {/* Clean Air Tree Equivalent */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit mb-2">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Air Filter Equivalent</p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-300 mt-1">
              {cleanAirEquivalentTrees} Urban Trees
            </p>
            <p className="text-[10px] text-slate-500">Particulate capture equivalent</p>
          </div>
        </div>
      </div>
    </div>
  );
};
