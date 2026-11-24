import React, { useState } from 'react';
import { X, Search, MapPin, Navigation, Compass, AlertCircle, Loader2 } from 'lucide-react';
import { CityPreset } from '../../types/aqi';
import { CITY_PRESETS, searchCities } from '../../services/openMeteoApi';

interface LocationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (city: CityPreset) => void;
  onUseCurrentLocation: () => void;
  isLoadingLocation?: boolean;
}

export const LocationSearchModal: React.FC<LocationSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCity,
  onUseCurrentLocation,
  isLoadingLocation = false
}) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CityPreset[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    setHasSearched(true);
    try {
      const results = await searchCities(query);
      setSearchResults(results);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-teal-400" />
            <h3 className="text-lg font-bold text-slate-100">Select Winter Smog Location</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <form onSubmit={handleSearch} className="mt-4">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any city worldwide (e.g. Lahore, Milan, Krakow)..."
              className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs transition-colors flex items-center space-x-1"
            >
              {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Search</span>}
            </button>
          </div>
        </form>

        {/* GPS Location Button */}
        <div className="mt-3">
          <button
            onClick={onUseCurrentLocation}
            disabled={isLoadingLocation}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200 text-xs font-semibold transition-all"
          >
            {isLoadingLocation ? (
              <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
            ) : (
              <Navigation className="w-4 h-4 text-teal-400" />
            )}
            <span>Use My Exact GPS Location (Browser Geolocation)</span>
          </button>
        </div>

        {/* Dynamic Search Results */}
        {hasSearched && (
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
              Search Results
            </p>
            {searchResults.length === 0 ? (
              <p className="text-xs text-slate-500 p-3 bg-slate-950 rounded-xl text-center">
                No matching cities found. Try checking your spelling or selecting from presets below.
              </p>
            ) : (
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {searchResults.map((city) => (
                  <button
                    key={`${city.name}-${city.latitude}`}
                    onClick={() => {
                      onSelectCity(city);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-colors"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-200">{city.name}</p>
                      <p className="text-xs text-slate-400">{city.description}</p>
                    </div>
                    <MapPin className="w-4 h-4 text-teal-400" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Preset High-Smog Global Metros */}
        <div className="mt-5">
          <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider flex items-center space-x-1.5">
            <span>Severe Winter Smog Hotspots</span>
          </p>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {CITY_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  onSelectCity(preset);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800/80 text-left transition-all group"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-slate-200 group-hover:text-teal-300 transition-colors">
                      {preset.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      {preset.country}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {preset.description}
                  </p>
                </div>
                <span className="text-xs font-bold text-teal-400 group-hover:translate-x-0.5 transition-transform">
                  Select →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
