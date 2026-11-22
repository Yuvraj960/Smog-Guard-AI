import { CurrentAirQuality } from '../types/aqi';
import { FamilyProfile } from '../types/family';
import { generateSmartLocalAIResponse } from './localHeuristics';

const PRIMARY_MODEL = 'gemini-2.5-flash-lite';
const FALLBACK_MODELS = ['gemini-2.0-flash-lite', 'gemini-1.5-flash'];

export async function askSmogAI({
  prompt,
  aqiData,
  profile,
  apiKey
}: {
  prompt: string;
  aqiData: CurrentAirQuality;
  profile: FamilyProfile;
  apiKey?: string;
}): Promise<string> {
  // If no API key is provided, use high-fidelity smart heuristic engine instantly
  if (!apiKey || apiKey.trim().length === 0) {
    // Artificial small delay for natural interaction feel
    await new Promise(r => setTimeout(r, 600));
    return generateSmartLocalAIResponse(prompt, aqiData, profile);
  }

  const systemInstruction = `You are SmogGuard AI, an expert environmental health scientist, building physicist, and community air defense advisor.
You specialize in severe winter urban smog, thermal inversions, aerosol filtration (e.g. Corsi-Rosenthal boxes, HEPA), low-emission daily routines, and vulnerable family protection (children, asthmatics, elderly).
Current live environment context:
- Location: ${aqiData.city}, ${aqiData.country}
- Current US AQI: ${aqiData.us_aqi} (${aqiData.category.level})
- PM2.5: ${aqiData.pollutants.pm2_5} µg/m³ | PM10: ${aqiData.pollutants.pm10} µg/m³
- Inversion Severity: ${aqiData.inversionRisk}
- User Family: ${profile.familyName}
- Household Members: ${profile.members.map(m => `${m.name} (${m.role}, vulnerability: ${m.vulnerability})`).join(', ')}
- Commute: ${profile.commuteMode} | Heating: ${profile.heatingType}

Guidelines:
- Provide practical, empathetic, and evidence-based solutions.
- Highlight quantifiable impacts (e.g., exposure hours avoided, PM2.5 reduction, CADR rates, cost savings of DIY methods).
- Emphasize budget-friendly DIY hacks (like Corsi-Rosenthal box fans, door draft stoppers, N95 masks) over expensive luxury gear.
- Format with clean Markdown, bullet points, and bold text for readability.`;

  const requestBody = {
    contents: [
      {
        role: 'user',
        parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}` }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1000
    }
  };

  const modelsToTry = [PRIMARY_MODEL, ...FALLBACK_MODELS];

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Gemini API call to ${model} failed (${response.status}):`, errorText);
        continue; // try next fallback model
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return text;
      }
    } catch (err) {
      console.warn(`Error connecting to Gemini model ${model}:`, err);
    }
  }

  // If live API calls failed or rate-limited, fall back to offline intelligence
  console.info('Falling back to local heuristic response');
  return generateSmartLocalAIResponse(prompt, aqiData, profile);
}
