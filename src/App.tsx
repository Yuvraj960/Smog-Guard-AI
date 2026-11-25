import React, { useState, useEffect } from 'react';
import { CurrentAirQuality, CityPreset } from './types/aqi';
import { FamilyProfile } from './types/family';
import { fetchAirQuality, CITY_PRESETS } from './services/openMeteoApi';
import { 
  getStoredFamilyProfile, 
  saveStoredFamilyProfile, 
  getStoredGeminiKey 
} from './services/storage';

// Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AQIOverviewCard } from './components/aqi/AQIOverviewCard';
import { DiurnalForecastChart } from './components/aqi/DiurnalForecastChart';
import { PollutantPills } from './components/aqi/PollutantPills';
import { LocationSearchModal } from './components/aqi/LocationSearchModal';
import { InversionExplainerModal } from './components/aqi/InversionExplainerModal';
import { RoutineOptimizer } from './components/routine/RoutineOptimizer';
import { FamilyProfileModal } from './components/routine/FamilyProfileModal';
import { IAQLab } from './components/iaq/IAQLab';
import { ImpactSimulator } from './components/impact/ImpactSimulator';
import { SmogAIAssistant } from './components/ai/SmogAIAssistant';
import { ApiKeyConfigModal } from './components/ai/ApiKeyConfigModal';

// Icons
import { 
  Wind, 
  CalendarCheck, 
  Box, 
  HeartPulse, 
  Sparkles, 
  Loader2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export const App: React.FC = () => {
  // App state
  const [currentCity, setCurrentCity] = useState<CityPreset>(CITY_PRESETS[0]); // Default New Delhi
  const [aqiData, setAqiData] = useState<CurrentAirQuality | null>(null);
  const [isLoadingAQI, setIsLoadingAQI] = useState<boolean>(true);
  const [profile, setProfile] = useState<FamilyProfile>(() => getStoredFamilyProfile());
  const [apiKey, setApiKey] = useState<string>(() => getStoredGeminiKey());
  const [activeTab, setActiveTab] = useState<'overview' | 'routine' | 'iaq' | 'impact' | 'ai'>('overview');
  const [aiInitialQuery, setAiInitialQuery] = useState<string | undefined>(undefined);

  // Modals state
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isInversionModalOpen, setIsInversionModalOpen] = useState(false);
  const [isLoadingGPS, setIsLoadingGPS] = useState(false);

  // Load air quality data
  const loadAQIData = async (city: CityPreset) => {
    setIsLoadingAQI(true);
    try {
      const data = await fetchAirQuality(
        city.latitude,
        city.longitude,
        city.name,
        city.country
      );
      setAqiData(data);
    } catch (err) {
      console.error('Failed to load air quality', err);
    } finally {
      setIsLoadingAQI(false);
    }
  };

  useEffect(() => {
    loadAQIData(currentCity);
  }, [currentCity]);

  // Handle GPS location
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLoadingGPS(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const customCity: CityPreset = {
          name: 'My GPS Location',
          country: 'Local',
          latitude,
          longitude,
          description: `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`
        };
        setCurrentCity(customCity);
        setIsLoadingGPS(false);
        setIsLocationModalOpen(false);
      },
      (err) => {
        console.warn('Geolocation failed', err);
        alert('Could not access your location. Using Delhi default.');
        setIsLoadingGPS(false);
      },
      { timeout: 10000 }
    );
  };

  // Handle family profile update
  const handleSaveProfile = (updated: FamilyProfile) => {
    setProfile(updated);
    saveStoredFamilyProfile(updated);
  };

  // Switch to AI tab with prefilled question
  const handleAskAIWithPrompt = (prompt: string) => {
    setAiInitialQuery(prompt);
    setActiveTab('ai');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-white">
      {/* Top Navbar */}
      {aqiData && (
        <Navbar
          aqiData={aqiData}
          profile={profile}
          apiKey={apiKey}
          onOpenLocationModal={() => setIsLocationModalOpen(true)}
          onOpenFamilyModal={() => setIsFamilyModalOpen(true)}
          onOpenKeyModal={() => setIsKeyModalOpen(true)}
        />
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Navigation Tabs Header */}
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar pb-1 border-b border-slate-800">
          <div className="flex items-center space-x-1 sm:space-x-2">
            {[
              { id: 'overview', label: 'Smog Radar & AQI', icon: Wind },
              { id: 'routine', label: 'Family Routine Optimizer', icon: CalendarCheck },
              { id: 'iaq', label: 'DIY Indoor Air Lab', icon: Box },
              { id: 'impact', label: 'Direct Impact & Community', icon: HeartPulse },
              { id: 'ai', label: 'GenAI Smog Co-pilot', icon: Sparkles, badge: 'Flash Lite' },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                    isActive
                      ? 'bg-slate-900 text-teal-300 border border-teal-500/30 shadow-lg shadow-teal-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="hidden md:inline px-1.5 py-0.2 rounded-full text-[9px] font-extrabold uppercase bg-purple-950 text-purple-300 border border-purple-800">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => aqiData && loadAQIData(currentCity)}
            disabled={isLoadingAQI}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors shrink-0"
            title="Refresh Air Quality"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingAQI ? 'animate-spin text-teal-400' : ''}`} />
          </button>
        </div>

        {/* Loading Indicator */}
        {isLoadingAQI && !aqiData && (
          <div className="py-24 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <p className="font-bold text-slate-200">Retrieving Open-Meteo Air Quality Telemetry...</p>
              <p className="text-xs text-slate-400 mt-1">Analyzing PM2.5, diurnal curves, and thermal inversion ceilings</p>
            </div>
          </div>
        )}

        {/* Tab 1: Smog Radar & AQI */}
        {activeTab === 'overview' && aqiData && (
          <div className="space-y-6 animate-fade-in">
            <AQIOverviewCard
              aqiData={aqiData}
              profile={profile}
              onOpenInversionExplainer={() => setIsInversionModalOpen(true)}
              onJumpToSafeWindow={() => {
                const el = document.getElementById('diurnal-chart');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <div id="diurnal-chart">
              <DiurnalForecastChart hourlyData={aqiData.hourlyForecast} />
            </div>

            <PollutantPills pollutants={aqiData.pollutants} />
          </div>
        )}

        {/* Tab 2: Family Routine Optimizer */}
        {activeTab === 'routine' && aqiData && (
          <div className="animate-fade-in">
            <RoutineOptimizer
              aqiData={aqiData}
              profile={profile}
              onOpenFamilyModal={() => setIsFamilyModalOpen(true)}
              onAskAI={handleAskAIWithPrompt}
            />
          </div>
        )}

        {/* Tab 3: DIY Indoor Air Quality (IAQ) Lab */}
        {activeTab === 'iaq' && (
          <div className="animate-fade-in">
            <IAQLab />
          </div>
        )}

        {/* Tab 4: Direct Impact & Community Action */}
        {activeTab === 'impact' && aqiData && (
          <div className="animate-fade-in">
            <ImpactSimulator
              aqiData={aqiData}
              profile={profile}
            />
          </div>
        )}

        {/* Tab 5: GenAI Smog Assistant */}
        {activeTab === 'ai' && aqiData && (
          <div className="animate-fade-in">
            <SmogAIAssistant
              aqiData={aqiData}
              profile={profile}
              apiKey={apiKey}
              initialQuery={aiInitialQuery}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <LocationSearchModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectCity={(city) => setCurrentCity(city)}
        onUseCurrentLocation={handleUseCurrentLocation}
        isLoadingLocation={isLoadingGPS}
      />

      <FamilyProfileModal
        isOpen={isFamilyModalOpen}
        profile={profile}
        onClose={() => setIsFamilyModalOpen(false)}
        onSave={handleSaveProfile}
      />

      <ApiKeyConfigModal
        isOpen={isKeyModalOpen}
        currentKey={apiKey}
        onClose={() => setIsKeyModalOpen(false)}
        onSave={(newKey) => setApiKey(newKey)}
      />

      <InversionExplainerModal
        isOpen={isInversionModalOpen}
        onClose={() => setIsInversionModalOpen(false)}
      />
    </div>
  );
};
