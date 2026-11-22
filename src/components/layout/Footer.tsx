import React from 'react';
import { ShieldCheck, Heart, ExternalLink, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-900 bg-slate-950/60 py-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-slate-200">
                SmogGuard AI — Community Smog Resilience Project
              </p>
              <p className="text-[11px] text-slate-500">
                Built with 100% free-tier services • Open-Meteo Air Quality & Google Gemini AI
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
            <a
              href="https://open-meteo.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal-300 transition-colors inline-flex items-center space-x-1"
            >
              <span>Open-Meteo Telemetry</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://aistudio.google.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal-300 transition-colors inline-flex items-center space-x-1"
            >
              <span>Google AI Studio Free Tier</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://en.wikipedia.org/wiki/Corsi%E2%80%93Rosenthal_Box"
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal-300 transition-colors inline-flex items-center space-x-1"
            >
              <span>UC Davis C-R Box Research</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center space-x-1.5 text-slate-500 text-[11px]">
            <span>Designed for community health</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>& free deployment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
