import { AQICategory, AQICategoryLevel } from '../types/aqi';

export function getAQICategory(aqi: number): AQICategory {
  if (aqi <= 50) {
    return {
      level: 'Good',
      range: '0 - 50',
      color: '#10B981',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      label: 'Good Air Quality',
      summary: 'Air quality is considered satisfactory, and air pollution poses little or no risk.',
      outdoorSafeTimeMin: 720, // All day
      maskRecommended: false,
      maskType: 'None needed',
      indoorSanctuaryUrgency: 'Optional'
    };
  } else if (aqi <= 100) {
    return {
      level: 'Moderate',
      range: '51 - 100',
      color: '#F59E0B',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-400',
      label: 'Moderate',
      summary: 'Acceptable air quality. Exceptionally sensitive people should consider limiting prolonged outdoor exertion.',
      outdoorSafeTimeMin: 240,
      maskRecommended: false,
      maskType: 'Optional for severe asthmatics',
      indoorSanctuaryUrgency: 'Optional'
    };
  } else if (aqi <= 150) {
    return {
      level: 'Sensitive',
      range: '101 - 150',
      color: '#F97316',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      textColor: 'text-orange-400',
      label: 'Unhealthy for Sensitive Groups',
      summary: 'Children, elders, pregnant mothers, and individuals with respiratory issues may experience symptoms.',
      outdoorSafeTimeMin: 90,
      maskRecommended: true,
      maskType: 'KF94 or N95 for sensitive groups',
      indoorSanctuaryUrgency: 'Recommended'
    };
  } else if (aqi <= 200) {
    return {
      level: 'Unhealthy',
      range: '151 - 200',
      color: '#EF4444',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      textColor: 'text-red-400',
      label: 'Unhealthy for Everyone',
      summary: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.',
      outdoorSafeTimeMin: 45,
      maskRecommended: true,
      maskType: 'N95 / FFP2 mandatory outdoors',
      indoorSanctuaryUrgency: 'Essential'
    };
  } else if (aqi <= 300) {
    return {
      level: 'Very Unhealthy',
      range: '201 - 300',
      color: '#8B5CF6',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
      label: 'Very Unhealthy (Emergency)',
      summary: 'Health alert: The risk of health effects is increased for everyone. Winter thermal inversions create heavy stagnant smog blankets.',
      outdoorSafeTimeMin: 15,
      maskRecommended: true,
      maskType: 'Well-fitted N95 / FFP3 with headbands',
      indoorSanctuaryUrgency: 'Critical'
    };
  } else {
    return {
      level: 'Hazardous',
      range: '301+',
      color: '#881337',
      bgColor: 'bg-rose-950/40',
      borderColor: 'border-rose-600/50',
      textColor: 'text-rose-400',
      label: 'Hazardous / Severe Emergency',
      summary: 'Severe public health emergency. The entire population is more likely to be affected. Immediate clean room sealing required.',
      outdoorSafeTimeMin: 0,
      maskRecommended: true,
      maskType: 'N95 / P100 respirator; avoid going outdoors',
      indoorSanctuaryUrgency: 'Critical'
    };
  }
}

// Convert PM2.5 in ug/m3 to US AQI using standard EPA piecewise linear formula
export function calculateUSAQIFromPM25(pm25: number): number {
  if (pm25 < 0) return 0;
  const c = Math.round(pm25 * 10) / 10;
  
  if (c <= 12.0) {
    return Math.round(((50 - 0) / (12.0 - 0.0)) * (c - 0.0) + 0);
  } else if (c <= 35.4) {
    return Math.round(((100 - 51) / (35.4 - 12.1)) * (c - 12.1) + 51);
  } else if (c <= 55.4) {
    return Math.round(((150 - 101) / (55.4 - 35.5)) * (c - 35.5) + 101);
  } else if (c <= 150.4) {
    return Math.round(((200 - 151) / (150.4 - 55.5)) * (c - 55.5) + 151);
  } else if (c <= 250.4) {
    return Math.round(((300 - 201) / (250.4 - 150.5)) * (c - 150.5) + 201);
  } else if (c <= 350.4) {
    return Math.round(((400 - 301) / (350.4 - 250.5)) * (c - 250.5) + 301);
  } else {
    return Math.min(500, Math.round(((500 - 401) / (500.4 - 350.5)) * (c - 350.5) + 401));
  }
}
