# 🛰️ AEGIS — Satellite-Driven Disaster Relief Platform

**Live Preview:** https://preview--terra-aid-vision.lovable.app/

AEGIS is a mission-control style disaster response platform that fuses satellite imagery assessment, real-time alerts, and coordinated relief operations into a single command center. Built for emergency responders, NGOs, and government agencies to make faster, smarter decisions when every minute counts.

---

## 🌍 Overview

When disaster strikes — earthquakes, floods, wildfires, hurricanes — response teams need a unified view of *what happened*, *where*, *how bad*, and *who can help*. AEGIS brings all of that into one beautifully designed dashboard inspired by real-world satellite operations centers.

---

## ✨ Key Features

### 🛰️ Satellite Damage Assessment
- **Before / After comparison slider** powered by AI-style scan simulation
- **Spectral band analysis** (RGB, infrared, thermal) for detecting structural damage
- **Severity overlays** highlighting impact zones with color-coded intensity
- Multi-resolution source selection (Sentinel-2, Landsat, commercial)

### 🗺️ Interactive Global Disaster Map
- Animated radar sweeps and pulse markers across world regions
- Live filtering by disaster type: earthquake, flood, wildfire, storm, drought
- Severity-based visual encoding (Critical → Low)
- Click any incident for a full situational briefing

### 🚨 Real-Time Alerts Center
- Prioritized notification feed (Critical / High / Moderate)
- Source verification badges (USGS, NOAA, ESA, ground reports)
- Acknowledge & dispatch workflows

### 🤝 Aid Request & Resource Matching
- Catalog of active aid needs by region and category (medical, food, shelter, rescue)
- Donor pledges automatically matched to nearest disaster zones
- Fulfillment tracking with progress bars

### 👥 Volunteer Coordination
- Personnel roster with skills, availability, and deployment status
- Skill-based assignment to active incidents
- Live deployment count and capacity metrics

### 📊 Analytics & Impact Reports
- Disaster trend charts and response-time KPIs
- Aid distribution statistics across regions
- Population-impact estimates per incident

### 🎛️ Mission-Control Dashboard
- Global metrics at a glance: active incidents, people affected, aid deployed
- Live UTC mission clock
- Priority incident feed with one-click drilldown

---

## 💡 Benefits

| For Whom | What They Gain |
|----------|----------------|
| **Emergency Responders** | A single situational-awareness screen that replaces juggling 5+ tools |
| **NGOs & Relief Orgs** | Faster matching of donations and volunteers to verified needs |
| **Government Agencies** | Transparent reporting, audit trails, and impact analytics |
| **Donors & Public** | Trustworthy view of where help is needed most, in real time |
| **Researchers** | Historical disaster data and visual trend analysis |

**Why it matters:** Faster damage assessment = faster aid = lives saved. AEGIS compresses the gap between "something happened" and "boots on the ground."

---

## 🎨 Design Philosophy

A **dark-mode mission-control aesthetic** with:
- HSL-based semantic design tokens (no hard-coded colors)
- Custom animations: `radar-sweep`, `scan-line`, severity pulses
- Severity-driven color system (Critical / High / Moderate / Low)
- Responsive across desktop, tablet, and mobile

---

## 🛠️ Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** with custom semantic tokens
- **shadcn/ui** component primitives
- **React Router** for multi-page navigation
- **Recharts** for analytics visualizations
- **Lucide Icons** for crisp iconography

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

Then open `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```
src/
├── components/      # AppLayout, Sidebar, SatelliteComparison, WorldMap, StatCard
├── pages/           # Dashboard, Assessment, Map, Alerts, Aid, Volunteers, Analytics
├── data/            # Mock disasters, alerts, aid requests, volunteers
├── assets/          # Hero & satellite imagery
└── index.css        # Design tokens & global styles
```

---

## 🔮 Roadmap Ideas

- 🌐 Real satellite API integration (NASA EOSDIS, Sentinel Hub)
- 🤖 ML-based damage classification on uploaded imagery
- 📱 Mobile field-reporter PWA for on-the-ground volunteers
- 🔔 SMS / push alert integrations
- 🌍 Multi-language support for international response teams

---

## 📜 License

MIT — free to use, fork, and adapt for humanitarian purposes.

---

> *"In disaster response, information is the first form of aid."* — AEGIS
