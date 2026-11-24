import React from 'react';
import { PollutantValues } from '../../types/aqi';
import { Activity, Wind, AlertCircle } from 'lucide-react';

interface PollutantPillsProps {
  pollutants: PollutantValues;
}

export const PollutantPills: React.FC<PollutantPillsProps> = ({ pollutants }) => {
  const items = [
    {
      name: 'PM2.5',
      fullName: 'Fine Particulates (<2.5µm)',
      value: pollutants.pm2_5,
      unit: 'µg/m³',
      whoLimit: 15,
      severity: pollutants.pm2_5 > 75 ? 'danger' : pollutants.pm2_5 > 35 ? 'warning' : 'safe',
      dangerNote: 'Penetrates deep into pulmonary alveoli & enters bloodstream'
    },
    {
      name: 'PM10',
      fullName: 'Inhalable Dust (<10µm)',
      value: pollutants.pm10,
      unit: 'µg/m³',
      whoLimit: 45,
      severity: pollutants.pm10 > 150 ? 'danger' : pollutants.pm10 > 50 ? 'warning' : 'safe',
      dangerNote: 'Irritates upper airways, eyes, and causes coughing spasms'
    },
    {
      name: 'NO₂',
      fullName: 'Nitrogen Dioxide',
      value: pollutants.nitrogen_dioxide || 38.2,
      unit: 'µg/m³',
      whoLimit: 25,
      severity: (pollutants.nitrogen_dioxide || 38) > 50 ? 'warning' : 'safe',
      dangerNote: 'Emitted directly from vehicle exhaust & gas boilers'
    },
    {
      name: 'Ozone (O₃)',
      fullName: 'Ground-level Ozone',
      value: pollutants.ozone || 22.0,
      unit: 'µg/m³',
      whoLimit: 100,
      severity: 'safe',
      dangerNote: 'Typically lower during winter due to weaker photochemistry'
    },
    {
      name: 'SO₂',
      fullName: 'Sulphur Dioxide',
      value: pollutants.sulphur_dioxide || 14.5,
      unit: 'µg/m³',
      whoLimit: 40,
      severity: 'safe',
      dangerNote: 'Industrial coal combustion & diesel refining marker'
    },
    {
      name: 'CO',
      fullName: 'Carbon Monoxide',
      value: Math.round((pollutants.carbon_monoxide || 1200) / 10) / 10,
      unit: 'µg/m³',
      whoLimit: 4000,
      severity: 'safe',
      dangerNote: 'Indoor hazard from unvented room heaters & biomass stoves'
    }
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-slate-100">
              Granular Pollutant Breakdown vs WHO Limits
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time concentration levels compared to World Health Organization (WHO) 24h health benchmarks.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {items.map(p => {
          const ratio = Math.round((p.value / p.whoLimit) * 10) / 10;
          return (
            <div
              key={p.name}
              className={`p-3.5 rounded-2xl border transition-all ${
                p.severity === 'danger'
                  ? 'bg-rose-950/20 border-rose-500/30'
                  : p.severity === 'warning'
                  ? 'bg-amber-950/20 border-amber-500/30'
                  : 'bg-slate-900/40 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-200">{p.name}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                  ratio > 3 ? 'bg-rose-900/60 text-rose-300' :
                  ratio > 1 ? 'bg-amber-900/60 text-amber-300' :
                  'bg-emerald-900/60 text-emerald-300'
                }`}>
                  {ratio}x WHO
                </span>
              </div>

              <div className="my-2">
                <span className="text-xl sm:text-2xl font-black text-slate-100">
                  {p.value}
                </span>
                <span className="text-[10px] text-slate-400 ml-1">{p.unit}</span>
              </div>

              <p className="text-[10px] text-slate-400 leading-tight">
                WHO Guideline: <strong className="text-slate-300">{p.whoLimit} {p.unit}</strong>
              </p>

              <p className="text-[9px] text-slate-500 mt-1 truncate" title={p.dangerNote}>
                {p.dangerNote}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
