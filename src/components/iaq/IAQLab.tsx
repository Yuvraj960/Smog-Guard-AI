import React, { useState } from 'react';
import { CorsiRosenthalBuilder } from './CorsiRosenthalBuilder';
import { CleanRoomChecklist } from './CleanRoomChecklist';
import { IAQMythsFacts } from './IAQMythsFacts';
import { Box, ShieldCheck, HelpCircle } from 'lucide-react';

export const IAQLab: React.FC = () => {
  const [subTab, setSubTab] = useState<'corsi' | 'checklist' | 'myths'>('corsi');

  return (
    <div className="space-y-6">
      {/* Subtab Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSubTab('corsi')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              subTab === 'corsi'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>DIY Corsi-Rosenthal Purifier Builder</span>
          </button>

          <button
            onClick={() => setSubTab('checklist')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              subTab === 'checklist'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Emergency Sanctuary Checklist</span>
          </button>

          <button
            onClick={() => setSubTab('myths')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              subTab === 'myths'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Aerosol Science vs Myths</span>
          </button>
        </div>
      </div>

      {/* Render active subtab */}
      {subTab === 'corsi' && <CorsiRosenthalBuilder />}
      {subTab === 'checklist' && <CleanRoomChecklist />}
      {subTab === 'myths' && <IAQMythsFacts />}
    </div>
  );
};
