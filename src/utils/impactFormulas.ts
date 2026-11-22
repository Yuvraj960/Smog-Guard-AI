import { CorsiRosenthalConfig, CorsiRosenthalOutput } from '../types/iaq';

/**
 * Corsi-Rosenthal Box Purifier Sizing Calculator
 * Based on research by Dr. Richard Corsi & Jim Rosenthal (UC Davis, EPA verified)
 */
export function calculateCorsiRosenthalSpecs(config: CorsiRosenthalConfig): CorsiRosenthalOutput {
  const roomVolumeCuFt = config.roomWidthFeet * config.roomLengthFeet * config.ceilingHeightFeet;
  const roomVolumeM3 = Math.round(roomVolumeCuFt * 0.0283168 * 10) / 10;

  // Clean Air Delivery Rate (CADR) calculation:
  // A standard 20" Lasko-type box fan delivers ~1800-2200 CFM free air.
  // Pulling through 4-5 MERV 13 filters introduces ~0.15-0.2 in w.g. pressure drop.
  // Standard measured clean air delivery is ~550 to 650 CFM for a 4-5 filter box on medium/high speed.
  const speedMultiplier = config.fanSpeed === 'high' ? 1.0 : config.fanSpeed === 'medium' ? 0.78 : 0.55;
  const filterCountMultiplier = config.filterCount === 5 ? 1.15 : 1.0; // 5 filters = less static resistance
  const thicknessMultiplier = config.filterThicknessInches === 2 ? 1.12 : 1.0; // 2" pleats have larger surface area

  const effectiveCADR = Math.round(520 * speedMultiplier * filterCountMultiplier * thicknessMultiplier);

  // Air Changes Per Hour (ACH) = (CADR * 60) / Room Volume (cu ft)
  const estimatedACHAchieved = roomVolumeCuFt > 0 ? Math.round(((effectiveCADR * 60) / roomVolumeCuFt) * 10) / 10 : 0;
  
  // Recommended ACH for severe smog is 4 to 6 ACH to overcome building envelope infiltration
  const achRequired = 5.0;

  // Smog Clearance Time (time to achieve 80% reduction in indoor PM2.5 assuming closed envelope)
  // t = -ln(1 - 0.8) / (ACH / 60) = 1.61 / (ACH / 60)
  const smogClearanceTimeMinutes = estimatedACHAchieved > 0 
    ? Math.max(10, Math.round((1.61 / (estimatedACHAchieved / 60))))
    : 60;

  // Cost estimates in USD
  const fanCost = 22;
  const filterCost = config.filterThicknessInches === 2 ? 11 * config.filterCount : 8 * config.filterCount;
  const tapeAndCardboard = 6;
  const totalBuildCostUSD = fanCost + filterCost + tapeAndCardboard;

  // Equivalent commercial HEPA purifier providing ~500-600 CFM CADR (e.g. IQAir HealthPro or Coway Airmega 400)
  const commercialPurifierCostEquiv = 450;
  const savingsUSD = commercialPurifierCostEquiv - totalBuildCostUSD;

  // Power Consumption: Standard box fan draws 50-85 Watts
  const estimatedWattage = config.fanSpeed === 'high' ? 80 : config.fanSpeed === 'medium' ? 62 : 45;
  // Running 16 hours/day for 30 days at $0.12 / kWh
  const monthlyKwh = (estimatedWattage * 16 * 30) / 1000;
  const monthlyElectricityCostUSD = Math.round(monthlyKwh * 0.12 * 100) / 100;

  // Filter lifespan in winter smog conditions (typically 5-6 months with continuous use)
  const filterLifespanMonths = config.filterThicknessInches === 2 ? 6 : 4;

  return {
    roomVolumeCuFt,
    roomVolumeM3,
    achRequired,
    effectiveCADR,
    estimatedACHAchieved,
    smogClearanceTimeMinutes,
    totalBuildCostUSD,
    commercialPurifierCostEquiv,
    savingsUSD,
    estimatedWattage,
    monthlyElectricityCostUSD,
    filterLifespanMonths
  };
}

/**
 * Calculates direct health exposure and emissions reduction metrics
 */
export function calculatePersonalImpact({
  outdoorAQI,
  indoorAQIWithPurification,
  outdoorHoursAvoided,
  transitShiftDaysPerWeek = 5,
  cleanHeatingAdopted = true,
}: {
  outdoorAQI: number;
  indoorAQIWithPurification: number;
  outdoorHoursAvoided: number;
  transitShiftDaysPerWeek?: number;
  cleanHeatingAdopted?: boolean;
}) {
  // Approximate PM2.5 from AQI (rough linear approximation for exposure modeling)
  const outdoorPM25 = outdoorAQI * 0.7; // ~ ug/m3
  const indoorPM25 = indoorAQIWithPurification * 0.7; // ~ ug/m3
  const deltaPM25 = Math.max(0, outdoorPM25 - indoorPM25);

  // Average human adult inhales approx 0.5 - 0.7 m3 of air per hour at rest/light activity
  const airInhaledM3PerHour = 0.6;
  const totalMicrogramsPM25Avoided = Math.round(outdoorHoursAvoided * airInhaledM3PerHour * deltaPM25);

  // Berkeley Earth rule of thumb: ~22 ug/m3 average 24h exposure = 1 cigarette
  // (22 ug/m3 * 14.4 m3 inhaled/day = ~316 ug PM2.5 per cigarette)
  const cigaretteEquivalentsAvoided = Math.round((totalMicrogramsPM25Avoided / 316) * 10) / 10;

  // Emissions prevented from commuting shift (e.g. carpooling or metro vs solo ICE gasoline car 20km roundtrip)
  // Solo car emits ~180g CO2/km * 20km = 3.6 kg CO2/day, and ~0.15g PM2.5 exhaust + brake/tire wear
  const dailyCO2SavedTransit = 3.6 * (transitShiftDaysPerWeek / 7);
  const dailyPM25SavedTransitGrams = 0.15 * (transitShiftDaysPerWeek / 7);

  // Clean heating adoption: Avoiding wood burning / old biomass stove
  // Wood stove emits ~15 to 30 grams of PM2.5 per hour!
  const dailyPM25HeatingGrams = cleanHeatingAdopted ? 45.0 : 0.0;
  const dailyCO2HeatingKg = cleanHeatingAdopted ? 8.5 : 0.0;

  return {
    personalExposureAvoidedHours: outdoorHoursAvoided,
    personalPM25InhaledAvoidedUg: totalMicrogramsPM25Avoided,
    co2EmissionsSavedKg: Math.round((dailyCO2SavedTransit + dailyCO2HeatingKg) * 10) / 10,
    pm25EmissionsPreventedGrams: Math.round((dailyPM25SavedTransitGrams + dailyPM25HeatingGrams) * 10) / 10,
    cigaretteEquivalentsAvoided: Math.max(0.1, cigaretteEquivalentsAvoided)
  };
}
