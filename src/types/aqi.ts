export interface PollutantValues {
  pm2_5: number;        // ug/m3
  pm10: number;         // ug/m3
  carbon_monoxide?: number; // ug/m3
  nitrogen_dioxide?: number; // ug/m3
  sulphur_dioxide?: number;  // ug/m3
  ozone?: number;            // ug/m3
  dust?: number;
}

export interface HourlyAQIData {
  time: string;
  hour: number;
  us_aqi: number;
  european_aqi: number;
  pm2_5: number;
  pm10: number;
  isSafeWindow: boolean;
  isInversionPeak: boolean;
}

export interface CurrentAirQuality {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  us_aqi: number;
  european_aqi: number;
  dominantPollutant: 'pm2_5' | 'pm10' | 'no2' | 'o3' | 'co' | 'so2';
  category: AQICategory;
  pollutants: PollutantValues;
  hourlyForecast: HourlyAQIData[];
  safeWindows: { start: string; end: string; avgAQI: number; advisory: string }[];
  inversionRisk: 'Low' | 'Moderate' | 'Severe' | 'Extreme';
  inversionDescription: string;
}

export type AQICategoryLevel = 'Good' | 'Moderate' | 'Sensitive' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';

export interface AQICategory {
  level: AQICategoryLevel;
  range: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  label: string;
  summary: string;
  outdoorSafeTimeMin: number; // in minutes
  maskRecommended: boolean;
  maskType: string;
  indoorSanctuaryUrgency: 'Optional' | 'Recommended' | 'Essential' | 'Critical';
}

export interface CityPreset {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  description: string;
}
