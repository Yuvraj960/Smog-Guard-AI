import React from 'react';
import { Wind, MapPin, Sparkles, Users, Key, AlertTriangle } from 'lucide-react';
import { CurrentAirQuality } from '../../types/aqi';
import { FamilyProfile } from '../../types/family';

interface NavbarProps {
  aqiData: CurrentAirQuality;
  profile: FamilyProfile;
  apiKey: string;
  onOpenLocationModal: () => void;
  onOpenFamilyModal: () => void;
  onOpenKeyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  aqiData,
  profile,
  apiKey,
  onOpenLocationModal,
  onOpenFamilyModal,
  onOpenKeyModal
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 via-cyan-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20 ring-1 ring-white/20">
            <Wind className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-teal-200 via-cyan-200 to-white bg-clip-text text-transparent">
                SmogGuard AI
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30">
                Winter Defense
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-400">
              Community Air Protection & Routine Optimizer
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Location Button */}
          <button
            onClick={onOpenLocationModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs sm:text-sm font-medium transition-colors"
            title="Change Location"
          >
            <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span className="max-w-[110px] sm:max-w-[150px] truncate">{aqiData.city}</span>
            <span className="hidden md:inline text-slate-500 text-xs">({aqiData.country})</span>
          </button>

          {/* Family Profile Button */}
          <button
            onClick={onOpenFamilyModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs sm:text-sm font-medium transition-colors"
            title="Family & Lifestyle Profile"
          >
            <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="hidden sm:inline">{profile.familyName}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-cyan-950 text-cyan-300 text-[10px] font-bold border border-cyan-800">
              {profile.members.length}
            </span>
          </button>

          {/* Gemini AI Key Status */}
          <button
            onClick={onOpenKeyModal}
            className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition-colors ${
              apiKey
                ? 'bg-purple-950/40 border-purple-500/30 text-purple-300 hover:bg-purple-900/50'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
            title="AI Configuration (Gemini 2.5 Flash Lite Free Tier)"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="hidden lg:inline">
              {apiKey ? 'Gemini 2.5 Flash Lite' : 'Smart Free AI'}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
              {apiKey ? 'API Active' : 'Free Tier'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
