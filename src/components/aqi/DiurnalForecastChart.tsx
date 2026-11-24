import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine
} from 'recharts';
import { HourlyAQIData } from '../../types/aqi';
import { Clock, Sun, Moon, AlertOctagon } from 'lucide-react';

interface DiurnalForecastChartProps {
  hourlyData: HourlyAQIData[];
}

export const DiurnalForecastChart: React.FC<DiurnalForecastChartProps> = ({ hourlyData }) => {
  const chartData = hourlyData.map(item => ({
    hourLabel: `${String(item.hour).padStart(2, '0')}:00`,
    hour: item.hour,
    aqi: item.us_aqi,
    pm2_5: item.pm2_5,
    isSafeWindow: item.isSafeWindow,
    isInversionPeak: item.isInversionPeak
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-xl border border-slate-700 bg-slate-900/95 p-3.5 shadow-xl text-xs backdrop-blur-md">
          <div className="flex items-center justify-between space-x-3 mb-1.5 border-b border-slate-800 pb-1.5">
            <span className="font-bold text-slate-200">{data.hourLabel}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              data.isSafeWindow ? 'bg-teal-500/20 text-teal-300' :
              data.isInversionPeak ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-300'
            }`}>
              {data.isSafeWindow ? 'Safe Window' : data.isInversionPeak ? 'Inversion Peak' : 'Transitional'}
            </span>
          </div>
          <p className="text-slate-300">
            US AQI: <strong className="text-amber-300 text-sm">{data.aqi}</strong>
          </p>
          <p className="text-slate-400">
            PM2.5: <strong className="text-slate-200">{data.pm2_5} µg/m³</strong>
          </p>
          <p className="mt-1 text-[11px] text-slate-400 max-w-[200px]">
            {data.isSafeWindow
              ? '✅ Lowest daily pollution. Safe for short errand runs.'
              : data.isInversionPeak
              ? '⚠️ Cold air trapped at surface. Avoid morning walks/exercise.'
              : 'Keep windows sealed; purifiers on auto.'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-teal-400" />
            <h3 className="text-lg font-bold text-slate-100">
              24-Hour Smog Diurnal Curve & Inversion Radar
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visualizing when boundary layer mixing lowers PM2.5 concentrations vs nocturnal inversion traps.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded bg-teal-500/30 border border-teal-500" />
            <span className="text-teal-300 font-medium">Safe Window (12–16)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded bg-rose-500/20 border border-rose-500/50" />
            <span className="text-rose-300 font-medium">Inversion Peak (06–09 & 21–02)</span>
          </div>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="aqiAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.6} />
                <stop offset="50%" stopColor="#F59E0B" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="hourLabel"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              interval={2}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              domain={[0, 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* EPA 100 Moderate Threshold line */}
            <ReferenceLine y={100} stroke="#F59E0B" strokeDasharray="3 3" opacity={0.5} />
            {/* EPA 200 Unhealthy Threshold line */}
            <ReferenceLine y={200} stroke="#EF4444" strokeDasharray="3 3" opacity={0.5} />

            <Area
              type="monotone"
              dataKey="aqi"
              stroke="#2DD4BF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#aqiAreaGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Actionable Time Guidance Footer */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-900 text-xs">
        <div className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <Moon className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-200">Night & Dawn (20:00–08:00)</p>
            <p className="text-slate-400 text-[11px]">Cold radiation trapping. Run purifiers on sleep mode, zero outdoor running.</p>
          </div>
        </div>

        <div className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-teal-950/30 border border-teal-500/20">
          <Sun className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-teal-200">Midday Solar Dip (12:30–15:30)</p>
            <p className="text-slate-300 text-[11px]">Convective mixing breaks the smog cap. Safest slot for grocery runs & filtered flush.</p>
          </div>
        </div>

        <div className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-200">Evening Commute (17:00–20:00)</p>
            <p className="text-slate-400 text-[11px]">Rapid smog re-accumulation as sun sets. Keep car ventilation on recirculation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
