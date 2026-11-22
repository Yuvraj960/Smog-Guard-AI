import { CurrentAirQuality } from '../types/aqi';
import { FamilyProfile, RoutineItem } from '../types/family';

export function generateSmartFamilyRoutine(
  aqiData: CurrentAirQuality,
  profile: FamilyProfile
): RoutineItem[] {
  const currentAQI = aqiData.us_aqi;
  const hasChild = profile.members.some(m => m.vulnerability === 'child' || m.vulnerability === 'infant');
  const hasElderlyOrVulnerable = profile.members.some(
    m => m.vulnerability === 'elderly' || m.vulnerability === 'respiratory' || m.vulnerability === 'pregnant'
  );
  const isSevere = currentAQI > 200;

  const routines: RoutineItem[] = [
    {
      id: 'r1',
      timeSlot: '06:30 - 08:30 AM',
      category: 'school',
      activity: 'Morning Commute & School Drop-off',
      recommendedAction: isSevere
        ? 'Shift drop-off to joint neighborhood carpool or request remote school attendance. Keep car ventilation on 100% recirculate.'
        : 'Form a 3-family walking bus or shared transit. Avoid keeping vehicle engines idling outside gates.',
      conventionalAlternative: 'Solo gasoline car drop-off with 15 mins of cold-engine idling outside school gates in dense PM2.5.',
      emissionSavedGramsPM25: isSevere ? 0.35 : 0.2,
      personalExposureAvoidedHours: 1.2,
      inhalationDeltaUg: Math.round(currentAQI * 0.45 * 1.2),
      vulnerabilityNotice: hasChild
        ? 'Children breathe 50% more air per kg than adults; exposure at drop-off zones is 3x higher due to cold exhaust idling.'
        : undefined,
      badge: 'Zero-Idle Zone'
    },
    {
      id: 'r2',
      timeSlot: '09:00 - 11:30 AM',
      category: 'indoor',
      activity: 'Home & Work Indoor Air Quality Protocol',
      recommendedAction: isSevere
        ? 'Run DIY Corsi-Rosenthal / HEPA unit on Medium/High in the designated Clean Room. Seal bedroom under-door gaps with a rolled damp towel.'
        : 'Run air purifier on low/eco mode. Keep outer windows closed during morning thermal inversion trap.',
      conventionalAlternative: 'Opening windows for "fresh morning breeze" which admits 180+ ug/m3 fine particulate matter indoors.',
      emissionSavedGramsPM25: 0,
      personalExposureAvoidedHours: 2.5,
      inhalationDeltaUg: Math.round(currentAQI * 0.65 * 2.5),
      vulnerabilityNotice: hasElderlyOrVulnerable
        ? 'Critical: vulnerable family members should remain inside the filtered Clean Room while ambient morning smog peaks.'
        : undefined,
      badge: 'Sanctuary Sealed'
    },
    {
      id: 'r3',
      timeSlot: '12:30 - 03:00 PM',
      category: 'ventilation',
      activity: 'Safe Window & Essential Errands',
      recommendedAction: aqiData.safeWindows.length > 0
        ? `Thermal inversion breaks! Solar radiation lifts the ceiling. Best time for essential outdoor errands (with N95) or rapid 10-minute flush ventilation.`
        : 'If PM2.5 dips below 120, open opposing windows for 10 minutes only with purifiers primed, then reseal immediately.',
      conventionalAlternative: 'Ventilating at random times or keeping windows permanently sealed leading to high CO2 buildup (>1500 ppm).',
      emissionSavedGramsPM25: 0.1,
      personalExposureAvoidedHours: 1.0,
      inhalationDeltaUg: Math.round(currentAQI * 0.25 * 1.0),
      vulnerabilityNotice: 'Always put on an N95 mask before stepping outside, even during the midday trough.',
      badge: 'Midday Safe Window'
    },
    {
      id: 'r4',
      timeSlot: '05:30 - 07:30 PM',
      category: 'commute',
      activity: 'Evening Return Commute & Grocery Run',
      recommendedAction: profile.commuteMode === 'personal_car_gasoline'
        ? 'Batch errands in a single trip while the engine is already warm, or combine with a colleague/neighbor carpool.'
        : 'Wear a well-fitted KF94 or N95 mask on transit platforms and underground stations where brake-dust PM10 is high.',
      conventionalAlternative: 'Multiple short stop-and-go trips during peak 6 PM rush hour congestion in severe stagnant air.',
      emissionSavedGramsPM25: 0.25,
      personalExposureAvoidedHours: 1.5,
      inhalationDeltaUg: Math.round(currentAQI * 0.5 * 1.5),
      vulnerabilityNotice: undefined,
      badge: 'Low-Emission Transit'
    },
    {
      id: 'r5',
      timeSlot: '08:00 - 10:30 PM',
      category: 'heating',
      activity: 'Dinner Cooking & Clean Night Heating',
      recommendedAction: profile.heatingType === 'biomass_wood'
        ? 'Urgent: Avoid burning wood, scrap pellets, or fireplace logs indoors. Use electric ceramic heating or zoned warm-layering (heavy thermal blankets).'
        : 'Always turn on the kitchen exhaust hood on high before firing up the stove; avoid dry frying or stir-fry smoke that triggers indoor PM2.5 spikes.',
      conventionalAlternative: 'Burning firewood or incense, which creates indoor PM2.5 spikes exceeding 600 ug/m3 in unventilated living rooms.',
      emissionSavedGramsPM25: profile.heatingType === 'biomass_wood' ? 45.0 : 2.0,
      personalExposureAvoidedHours: 3.0,
      inhalationDeltaUg: Math.round(currentAQI * 0.8 * 3.0),
      vulnerabilityNotice: hasElderlyOrVulnerable
        ? 'Biomass smoke contains PAHs and volatile organics that trigger acute cardiac events and asthmatic bronchospasms.'
        : undefined,
      badge: 'Clean Heat Protocol'
    }
  ];

  return routines;
}

export function generateSmartLocalAIResponse(
  prompt: string,
  aqiData: CurrentAirQuality,
  profile: FamilyProfile
): string {
  const p = prompt.toLowerCase();
  const currentAQI = aqiData.us_aqi;
  const pm25 = aqiData.pollutants.pm2_5;

  if (p.includes('corsi') || p.includes('diy') || p.includes('purifier') || p.includes('box fan')) {
    return `### 🛠️ Corsi-Rosenthal DIY Air Purifier Blueprint

A Corsi-Rosenthal (C-R) box delivers **~550–650 CFM Clean Air Delivery Rate (CADR)**—rivaling $500 commercial HEPA units—for about **$35 to $50**.

#### Materials Required:
1. **1 × 20" Box Fan** (Lasko 20" or equivalent with shrouded corners).
2. **4 × MERV 13 Filters** (20" × 20" × 1" or preferably 2" deep for longer lifespan and lower static pressure).
3. **Duct Tape / Painter's Tape** & cardboard for the base shroud.

#### Assembly Steps:
1. **Cube Formation**: Form a 4-sided square column with the 4 MERV 13 filters. **Crucial**: Ensure airflow arrows on every filter point **INWARD** toward the center.
2. **Bottom Seal**: Tape a 20"×20" piece of cardboard to the bottom to close the cube base.
3. **Fan Mounting**: Place the box fan on top, blowing **UPWARD** (pulling air through the filters and discharging cleaned air ceiling-ward).
4. **Cardboard Shroud**: Cut a circular cardboard ring covering the 4 corner dead-zones of the fan face (improves fan efficiency by 15-20% by preventing air backflow).
5. **Airtight Taping**: Seal all edge seams tightly with duct tape.

*Cost: ~$42 | Wattage: ~65W (~$2.20/month) | Filter Life: 5–6 months of winter smog.*`;
  }

  if (p.includes('inversion') || p.includes('weather') || p.includes('window') || p.includes('ventilate')) {
    return `### 🌫️ Winter Thermal Inversions Explained & Safe Window Protocol

During calm winter nights, the ground rapidly loses radiative heat, cooling the air immediately adjacent to the surface. A layer of warmer air forms above it, acting as an **invisible atmospheric lid**.

#### Why Smog Traps:
- Smoke, vehicular exhaust, and dust cannot rise through the warmer lid.
- Wind speeds drop to near 0–2 km/h, causing particulate matter (PM2.5) to concentrate into hazardous smog blankets.

#### Your Action Plan for Today in ${aqiData.city}:
- **Peak Danger Hours (06:00 – 10:00 & 20:00 – 02:00)**: Never open windows. Keep indoor air scrubbers running.
- **Midday Safe Window (12:30 – 15:30)**: Ground solar heating breaks the inversion layer, creating convection. If AQI drops, this is the safest window for:
  1. A rapid 10-minute opposing-window flush (if indoor CO2 is climbing above 1200 ppm).
  2. Urgent outdoor errands and child transit (always wearing a fitted N95 mask).`;
  }

  if (p.includes('asthma') || p.includes('child') || p.includes('elderly') || p.includes('health') || p.includes('symptom')) {
    return `### 🏥 Health Defense for Vulnerable Family Members (AQI: ${currentAQI})

For households with children and seniors (like ${profile.members.map(m => m.name).join(', ')}):

1. **Clean Room Sanctuary**: Designate the bedroom with the fewest exterior windows as the safe haven. Run the purifier on medium 24/7.
2. **Prevent Resuspension**: **Never dry sweep or dust with a dry cloth!** Dry sweeping kicks settled PM2.5 and PM10 particles back into the breathing zone. Always use a damp microfiber mop.
3. **Hydration & Saline Rinse**: Particulate matter inflames mucous membranes. Warm steam inhalation and isotonic saline nasal rinses significantly relieve nighttime coughing.
4. **Peak Mask Fit**: Cloth and surgical masks block less than 15-30% of PM2.5. Use NIOSH-certified **N95, FFP2, or KF94** masks with headbands for any outdoor transit.`;
  }

  if (p.includes('routine') || p.includes('plan') || p.includes('morning') || p.includes('today')) {
    return `### 📋 Tailored Smog Day Action Plan for ${profile.familyName}

**Current AQI in ${aqiData.city}**: **${currentAQI} (${aqiData.category.level})** | PM2.5: **${pm25} µg/m³**

1. **School & Commute Shift (07:00 – 08:30)**:
   - Car cabin AC must be set to **100% Recirculation** mode (cabin HEPA filters remove ~80% of outdoor PM2.5 if windows stay up).
   - Group drop-offs into neighborhood carpools to eliminate idling outside school gates.
2. **Indoor Air Defense (All Day)**:
   - Keep indoor purifiers active. Under-door draft stoppers reduce outdoor infiltration by up to 45%.
   - Avoid cooking that creates heavy smoke (pan-frying, searing) without range hood exhaust.
3. **Midday Errands (13:00 – 15:00)**:
   - Best window of the day. Conduct essential outdoor activities now.
4. **Nighttime Heating**:
   - Strictly avoid open fireplace or wood/biomass heating. Maintain 19–21°C using clean electric heating or thermal zoning.`;
  }

  return `### 🛡️ SmogGuard AI Guidance for ${aqiData.city} (AQI: ${currentAQI})

Based on current PM2.5 levels of **${pm25} µg/m³** and your family profile (${profile.members.length} members):

- **Immediate Priority**: ${currentAQI > 200 ? 'Maintain airtight sanctuary room; avoid all prolonged outdoor exertion.' : 'Limit heavy outdoor exertion during morning peak hours.'}
- **Indoor Action**: Run your DIY or HEPA purifier continuously. A Corsi-Rosenthal box clears 80% of particulate matter in under 25 minutes.
- **Commute Recommendation**: Shift solo vehicle trips to shared transit/carpools, and enforce a zero-idling rule.
- **Ventilation**: Only open windows during the solar-warmed midday window (12:30 – 15:30) when the thermal inversion ceiling rises.

*Tip: You can ask specific questions about DIY purifiers, kids' school safety, indoor plant facts vs myths, or clean heating alternatives!*`;
}
