import React from 'react';
import { 
  ShieldAlert, 
  Clock, 
  HelpCircle, 
  Info, 
  Wind, 
  AlertTriangle,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { CurrentAirQuality } from '../../types/aqi';
import { FamilyProfile } from '../../types/family';

interface AQIOverviewCardProps {
  aqiData: CurrentAirQuality;
  profile: FamilyProfile;
  onOpenInversionExplainer: () => void;
  onJumpToSafeWindow: () => void;
}

export const AQIOverviewCard: React.FC<AQIOverviewCardProps> = ({
  aqiData,
  profile,
  onOpenInversionExplainer,
  onJumpToSafeWindow
}) => {
  const { us_aqi, category, safeWindows, inversionRisk, inversionDescription, pollutants } = aqiData;

  const vulnerableCount = profile.members.filter(
    m => m.vulnerability !== 'healthy_adult'
  ).length;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950 p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
      {/* Subtle background glow based on AQI */}
      <div 
        className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: category.color }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: AQI Value & Status */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full animate-ping bg-teal-400 inline-block mr-1" />
            <span>Live Air Quality Index (US EPA Standard)</span>
          </div>

          <div className="flex items-baseline space-x-4 my-2">
            <span 
              className="text-6xl sm:text-7xl font-black tracking-tight"
              style={{ color: category.color }}
            >
              {us_aqi}
            </span>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold text-slate-100">
                {category.level}
              </span>
              <span className="text-xs text-slate-400">
                PM2.5: <strong className="text-slate-200">{pollutants.pm2_5} µg/m³</strong> (EPA Safe Limit: 12 µg/m³)
              </span>
            </div>
          </div>

          {/* Category Summary Description */}
          <p className="text-sm text-slate-300 leading-relaxed mt-2">
            {category.summary}
          </p>

          {/* Inversion Status Alert Pill */}
          <div 
            onClick={onOpenInversionExplainer}
            role="button"
            className="mt-4 flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Wind className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-200">
                    Winter Inversion Ceiling:
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.2 rounded-full ${
                    inversionRisk === 'Extreme' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                    inversionRisk === 'Severe' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                    inversionRisk === 'Moderate' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                    'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {inversionRisk} Trap
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate max-w-[260px] sm:max-w-xs">
                  {inversionDescription}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

        {/* Right Column: Key Smog Defense Guidelines & Safe Window */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Safe Window Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-950/30 to-slate-900 border border-teal-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold">
                  <Clock className="w-4 h-4" />
                  <span>Diurnal Safe Window</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-semibold">
                  Solar Peak
                </span>
              </div>
              <p className="text-2xl font-black text-slate-100">
                {safeWindows.length > 0 ? `${safeWindows[0].start} – ${safeWindows[0].end}` : '13:00 – 16:00'}
              </p>
              <p className="text-xs text-slate-300 mt-1 leading-snug">
                {safeWindows.length > 0 ? safeWindows[0].advisory : 'Midday solar warming raises boundary ceiling. Best window for outdoor errands.'}
              </p>
            </div>
            <button
              onClick={onJumpToSafeWindow}
              className="mt-3 text-left text-[11px] font-semibold text-teal-400 hover:text-teal-300 flex items-center space-x-1"
            >
              <span>View 24h Hourly Forecast</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mask & Exposure Threshold */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Outdoor Safe Limit</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                  Max Exposure
                </span>
              </div>
              <p className="text-2xl font-black text-slate-100">
                {category.outdoorSafeTimeMin === 0 
                  ? 'Avoid Outdoors' 
                  : `${category.outdoorSafeTimeMin} Minutes Max`}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Mask Spec: <strong className="text-slate-200">{category.maskType}</strong>
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Sanctuary Urgency:</span>
              <span className="font-bold text-amber-300">{category.indoorSanctuaryUrgency}</span>
            </div>
          </div>

          {/* Vulnerable Family Notice Card */}
          <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-950/40 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Info className="w-4 h-4 shrink-0" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">
                  Household Vulnerability Context ({profile.familyName})
                </p>
                <p className="text-xs text-slate-400">
                  {vulnerableCount > 0
                    ? `${vulnerableCount} family members in sensitive groups (children, seniors, asthma). Prioritize clean room protocol.`
                    : 'All members adults. Keep exercise indoors during peak morning and evening inversion hours.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
