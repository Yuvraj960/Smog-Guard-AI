import React, { useState } from 'react';
import { X, Sparkles, Key, ExternalLink, ShieldCheck, Check } from 'lucide-react';
import { saveStoredGeminiKey } from '../../services/storage';

interface ApiKeyConfigModalProps {
  isOpen: boolean;
  currentKey: string;
  onClose: () => void;
  onSave: (newKey: string) => void;
}

export const ApiKeyConfigModal: React.FC<ApiKeyConfigModalProps> = ({
  isOpen,
  currentKey,
  onClose,
  onSave
}) => {
  const [keyInput, setKeyInput] = useState(currentKey);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredGeminiKey(keyInput.trim());
    onSave(keyInput.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">AI Intelligence Settings</h3>
              <p className="text-xs text-slate-400">Target Model: Google Gemini 2.5 Flash Lite</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Tier Info */}
        <div className="mt-4 p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-xs space-y-2">
          <div className="flex items-center space-x-1.5 font-bold text-purple-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Free Tier Deployment Ready</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Google AI Studio offers a generous free tier for <strong>gemini-2.5-flash-lite</strong> (up to 15 Requests/Min, 1,500 Requests/Day with zero billing).
          </p>
          <p className="text-slate-400">
            If you leave this blank, SmogGuard AI automatically uses its high-fidelity <strong>Built-in Smart Heuristic Engine</strong>, which works completely offline at zero cost!
          </p>
        </div>

        <form onSubmit={handleSave} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Google Gemini API Key (Optional)</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-teal-400 hover:text-teal-300 inline-flex items-center space-x-1"
              >
                <span>Get Free Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </label>
            <div className="relative">
              <Key className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="AIzaSy... (or leave blank for Free Smart Engine)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Keys are stored securely in your browser's private local storage and never transmitted to any third-party server.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-500 hover:to-teal-400 text-white font-bold text-xs transition-colors flex items-center space-x-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save & Apply</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
