# 🌫️ SmogGuard AI — Winter Smog & Community Air Defense

> **A GenAI-powered assistant and collective defense platform helping families and communities navigate severe winter smog, indoor air quality hacks, and low-emission daily routines — built 100% on free-tier services.**

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](https://opensource.org/licenses/MIT)
[![Open-Meteo](https://img.shields.io/badge/Data-Open--Meteo%20API-blue.svg)](https://open-meteo.com)
[![Gemini](https://img.shields.io/badge/AI-Google%20Gemini%202.5%20Flash%20Lite-purple.svg)](https://aistudio.google.com)
[![Deployment](https://img.shields.io/badge/Hosting-Vercel%20%2F%20Netlify%20Free-emerald.svg)](https://vercel.com)

---

## 🎯 The Problem

During winter, cities across the world (from New Delhi and Beijing to Salt Lake City, London, and Krakow) experience severe **thermal inversions**. Cold, dense air is trapped underneath a warm atmospheric "lid", locking vehicle exhaust, biomass smoke, and industrial particulate matter close to the ground.

Families are left vulnerable without actionable guidance:
- When is it safe to open windows vs. when does ventilation admit hazardous PM2.5?
- Commercial HEPA purifiers cost $300–$600, out of reach for many families.
- School drop-off zones become toxic idling corridors during morning inversion peaks.
- People lack clear visibility into how much particulate matter their daily choices prevent from entering their children's lungs.

---

## 💡 SmogGuard AI Solutions

### 1. 📡 Smog Radar & Diurnal Inversion Tracker
- **Live Air Quality Telemetry**: Powered by **Open-Meteo Air Quality API** (100% free, no API key required).
- **24-Hour Diurnal Curve**: Visualizes nocturnal smog spikes (6 AM–9 AM & 8 PM–2 AM) and highlights the **Midday Safe Window (12:30 PM–3:30 PM)** when solar heating breaks the boundary layer.
- **Granular Pollutant Breakdown**: Compares live PM2.5, PM10, NO₂, O₃, SO₂, and CO against WHO 24-hour health limits.

### 2. 📅 Personalized Family Routine Optimizer
- Tailors schedules to your household profile (infants, asthmatics/seniors, commute type, home construction).
- **Time-Shifting Recommendations**: Moves outdoor tasks into clean midday windows and sets vehicle HVAC to 100% recirculation.
- **Direct Benefit Metrics**: Calculates local PM2.5 emissions prevented (grams) and personal toxic exposure hours avoided.

### 3. 🛠️ DIY Indoor Air Quality (IAQ) Lab
- **Interactive Corsi-Rosenthal Box Sizer**: Sizing calculator based on UC Davis / EPA research. Enter your room dimensions to compute CADR, Air Changes per Hour (ACH), and 80% clearance time for a ~$40 DIY box fan purifier (saving $400+ over commercial units).
- **Emergency Clean Room Sanctuary Checklist**: Interactive guide to seal and protect a bedroom during AQI > 250 emergencies.
- **Aerosol Science vs Myths**: Busted myths on houseplants, dry-sweeping resuspension, and ultrasonic humidifiers.

### 4. 📊 Direct Impact & Community Action Hub
- **Quantified Personal Ledger**: Inhaled PM2.5 avoided (µg) and Berkeley Earth cigarette equivalence avoided.
- **"What-If" Community Slider**: Scale from 20 to 2,000 households to model averted pediatric asthma hospital visits and tons of CO₂ saved.
- **Community Action Pledges**: Anti-idling school zone pledges and clean heat initiatives with interactive celebration confetti.

### 5. 🤖 GenAI Smog Co-pilot
- Configured specifically for **Google Gemini 2.5 Flash Lite** (via Google AI Studio Free Tier).
- **Dual Engine Architecture**: Runs flawlessly with zero configuration via the built-in offline Smart Heuristic Engine, with optional BYOK (Bring Your Own Key) for live Gemini chat.

---

## 🆓 100% Free-Tier Architecture

Every single service utilized in SmogGuard AI is permanently free:

| Service | Role | Free Tier Limits |
| :--- | :--- | :--- |
| **Open-Meteo Air Quality API** | Real-time global PM2.5, PM10, AQI | **Unlimited non-commercial use, NO API key required** |
| **Open-Meteo Geocoding API** | Global city search | **Unlimited free use, NO API key required** |
| **Google Gemini API** | GenAI Smog Advisor (`gemini-2.5-flash-lite`) | **Google AI Studio Free Tier (15 RPM, 1,500 RPD, $0 cost)** |
| **Offline Heuristic Engine** | Fallback instant AI advising | **Runs 100% on-device in browser ($0)** |
| **LocalStorage / IndexedDB** | Profile, pledges, and DIY specs | **Stored privately on client ($0)** |
| **Vercel / Netlify / GitHub Pages** | Production hosting | **Generous free tiers (100GB bandwidth, $0)** |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ (tested on v26)
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/smog-guard-ai.git
cd smog-guard-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🌐 Deploy for Free (100% Free Tiers)

### Option A: Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and log in with GitHub (Free Tier).
3. Click **"Add New Project"** and import your repository.
4. Framework Preset will auto-detect as **Vite**.
5. *(Optional)* Add Environment Variable:
   - `VITE_GEMINI_API_KEY` = Your Google AI Studio key (or leave empty; users can enter their own or use the free built-in engine).
6. Click **Deploy**. Your site will be live on `https://your-project.vercel.app` in under 60 seconds!

*Note: `vercel.json` is already included with SPA rewrites.*

### Option B: Deploy to Netlify
1. Push your repository to GitHub.
2. Go to [Netlify](https://netlify.com) and log in (Free Tier).
3. Click **"Add new site"** \> **"Import an existing project"**.
4. Build command: `npm run build`, Publish directory: `dist`.
5. Click **Deploy site**.

*Note: `netlify.toml` is already included with redirect rules.*

### Option C: Deploy to GitHub Pages
1. In `vite.config.ts`, set `base: '/smog-guard-ai/'` (your repository name).
2. Run `npm run build`.
3. Push the `dist` folder to your `gh-pages` branch.

---

## 🧪 Scientific References

1. **Corsi-Rosenthal Box Performance**: Dr. Richard Corsi (UC Davis College of Engineering) & Jim Rosenthal (AirSafe / Tex-Air Filters). Demonstrated 550–650 CFM CADR at 1/10th the cost of commercial purifiers.
2. **Berkeley Earth Air Pollution Equivalence**: Research by Dr. Richard A. Muller & Elizabeth Muller equating ~22 µg/m³ 24h PM2.5 exposure to the health impact of 1 cigarette.
3. **WHO Air Quality Guidelines (2021)**: Recommended limits for 24-hour fine particulate matter (PM2.5: 15 µg/m³, PM10: 45 µg/m³).
4. **Atmospheric Thermal Inversions**: UC Riverside CE-CERT studies on in-cabin vehicle air filtration and diurnal boundary layer dynamics.

---

## 📄 License

MIT License. Free to use, adapt, and deploy for community health and non-commercial educational purposes.
