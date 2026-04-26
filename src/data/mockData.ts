// Shared mock data for the disaster relief platform.
import { LucideIcon } from "lucide-react";
import { Flame, Waves, Wind, Mountain, Snowflake, Zap } from "lucide-react";

export type DisasterType = "wildfire" | "flood" | "hurricane" | "earthquake" | "blizzard" | "tornado";
export type Severity = 1 | 2 | 3 | 4 | 5;
export type Status = "monitoring" | "active" | "responding" | "contained" | "resolved";

export interface Disaster {
  id: string;
  name: string;
  type: DisasterType;
  location: string;
  country: string;
  coords: { x: number; y: number }; // % positions on the world map
  severity: Severity;
  status: Status;
  affectedPopulation: number;
  startedAt: string;
  damageEstimate: number; // millions USD
  responseTeams: number;
  description: string;
}

export const disasterIcons: Record<DisasterType, LucideIcon> = {
  wildfire: Flame,
  flood: Waves,
  hurricane: Wind,
  earthquake: Mountain,
  blizzard: Snowflake,
  tornado: Zap,
};

export const disasters: Disaster[] = [
  {
    id: "DSR-2024-0142",
    name: "Hurricane Lyra",
    type: "hurricane",
    location: "Gulf Coast",
    country: "USA",
    coords: { x: 24, y: 48 },
    severity: 5,
    status: "active",
    affectedPopulation: 2_400_000,
    startedAt: "2024-09-12T04:30:00Z",
    damageEstimate: 4200,
    responseTeams: 87,
    description: "Category 5 hurricane making landfall with sustained winds of 165 mph.",
  },
  {
    id: "DSR-2024-0138",
    name: "Pacific Wildfire Complex",
    type: "wildfire",
    location: "Northern California",
    country: "USA",
    coords: { x: 14, y: 42 },
    severity: 4,
    status: "responding",
    affectedPopulation: 340_000,
    startedAt: "2024-09-08T14:00:00Z",
    damageEstimate: 890,
    responseTeams: 54,
    description: "Wildfire complex spanning 145,000 acres with 32% containment.",
  },
  {
    id: "DSR-2024-0135",
    name: "Bangladesh Monsoon Floods",
    type: "flood",
    location: "Sylhet Division",
    country: "Bangladesh",
    coords: { x: 71, y: 50 },
    severity: 5,
    status: "active",
    affectedPopulation: 5_800_000,
    startedAt: "2024-09-05T00:00:00Z",
    damageEstimate: 1700,
    responseTeams: 112,
    description: "Severe monsoon flooding has displaced millions across the region.",
  },
  {
    id: "DSR-2024-0131",
    name: "Anatolia Earthquake",
    type: "earthquake",
    location: "Eastern Anatolia",
    country: "Türkiye",
    coords: { x: 56, y: 42 },
    severity: 4,
    status: "responding",
    affectedPopulation: 780_000,
    startedAt: "2024-09-03T22:15:00Z",
    damageEstimate: 2100,
    responseTeams: 68,
    description: "Magnitude 6.8 earthquake with multiple aftershocks reported.",
  },
  {
    id: "DSR-2024-0128",
    name: "Outback Bushfire",
    type: "wildfire",
    location: "New South Wales",
    country: "Australia",
    coords: { x: 84, y: 75 },
    severity: 3,
    status: "contained",
    affectedPopulation: 92_000,
    startedAt: "2024-08-28T09:00:00Z",
    damageEstimate: 310,
    responseTeams: 29,
    description: "Bushfire 78% contained, monitoring for re-ignition.",
  },
  {
    id: "DSR-2024-0125",
    name: "Andes Tornado",
    type: "tornado",
    location: "Buenos Aires Province",
    country: "Argentina",
    coords: { x: 30, y: 78 },
    severity: 3,
    status: "monitoring",
    affectedPopulation: 45_000,
    startedAt: "2024-09-11T18:45:00Z",
    damageEstimate: 120,
    responseTeams: 14,
    description: "EF3 tornado tracked through agricultural region.",
  },
  {
    id: "DSR-2024-0119",
    name: "Hokkaido Blizzard",
    type: "blizzard",
    location: "Hokkaido",
    country: "Japan",
    coords: { x: 87, y: 36 },
    severity: 2,
    status: "monitoring",
    affectedPopulation: 180_000,
    startedAt: "2024-09-10T02:00:00Z",
    damageEstimate: 65,
    responseTeams: 8,
    description: "Heavy snowfall with whiteout conditions across northern prefectures.",
  },
];

export interface AlertItem {
  id: string;
  level: "info" | "warning" | "critical";
  title: string;
  source: string;
  timestamp: string;
  message: string;
}

export const alerts: AlertItem[] = [
  {
    id: "A-9981",
    level: "critical",
    title: "Storm surge exceeds 18ft in Gulf Coast region",
    source: "NOAA Sentinel-3",
    timestamp: "2 min ago",
    message: "Coastal evacuation zones expanded. Mandatory orders in effect for Zones A & B.",
  },
  {
    id: "A-9980",
    level: "critical",
    title: "Levee breach reported in Sylhet Division",
    source: "Field Team 14",
    timestamp: "8 min ago",
    message: "Secondary flooding imminent. Diverting medical supplies via airlift.",
  },
  {
    id: "A-9979",
    level: "warning",
    title: "Wind shift detected in Pacific Wildfire Complex",
    source: "MODIS Terra",
    timestamp: "23 min ago",
    message: "Fire likely to threaten previously safe corridor within 6 hours.",
  },
  {
    id: "A-9978",
    level: "warning",
    title: "Aftershock sequence intensifying — Anatolia",
    source: "USGS Seismic Net",
    timestamp: "41 min ago",
    message: "M5.2 aftershock recorded; structural reassessment recommended.",
  },
  {
    id: "A-9977",
    level: "info",
    title: "Resupply convoy reached coordinator station",
    source: "Logistics Command",
    timestamp: "1h ago",
    message: "Convoy LZ-7 delivered 14 tons of medical & shelter supplies.",
  },
  {
    id: "A-9976",
    level: "info",
    title: "New satellite pass scheduled",
    source: "ESA Sentinel-2",
    timestamp: "2h ago",
    message: "High-resolution imagery refresh in 47 minutes for affected zones.",
  },
];

export interface AidRequest {
  id: string;
  type: "Medical" | "Shelter" | "Food & Water" | "Search & Rescue" | "Transport";
  urgency: "Low" | "Medium" | "High" | "Critical";
  location: string;
  requested: string;
  quantity: string;
  status: "Pending" | "Matched" | "In Transit" | "Delivered";
  beneficiaries: number;
}

export const aidRequests: AidRequest[] = [
  { id: "AR-7211", type: "Medical", urgency: "Critical", location: "Sylhet District 4", requested: "12 min ago", quantity: "200 trauma kits", status: "Matched", beneficiaries: 1200 },
  { id: "AR-7210", type: "Search & Rescue", urgency: "Critical", location: "Anatolia Sector 9", requested: "28 min ago", quantity: "3 K9 units + drones", status: "In Transit", beneficiaries: 45 },
  { id: "AR-7209", type: "Shelter", urgency: "High", location: "Gulf Coast Shelter B", requested: "1h ago", quantity: "500 cots, 800 blankets", status: "Pending", beneficiaries: 800 },
  { id: "AR-7208", type: "Food & Water", urgency: "High", location: "Sylhet Refugee Camp 2", requested: "2h ago", quantity: "10,000L water + MREs", status: "In Transit", beneficiaries: 3400 },
  { id: "AR-7207", type: "Transport", urgency: "Medium", location: "California Evac Route 12", requested: "3h ago", quantity: "8 buses for elderly", status: "Matched", beneficiaries: 320 },
  { id: "AR-7206", type: "Medical", urgency: "Medium", location: "Buenos Aires Triage", requested: "4h ago", quantity: "Insulin + antibiotics", status: "Delivered", beneficiaries: 180 },
  { id: "AR-7205", type: "Shelter", urgency: "Low", location: "Hokkaido Community Hall", requested: "6h ago", quantity: "Heating units x 40", status: "Delivered", beneficiaries: 220 },
];

export interface Volunteer {
  id: string;
  name: string;
  role: string;
  skills: string[];
  location: string;
  availability: "On Mission" | "Available" | "Standby" | "Off-duty";
  hours: number;
  initials: string;
}

export const volunteers: Volunteer[] = [
  { id: "V-1041", name: "Sarah Okafor", role: "Emergency Physician", skills: ["Trauma", "Triage", "Pediatric"], location: "Gulf Coast", availability: "On Mission", hours: 142, initials: "SO" },
  { id: "V-1042", name: "Marcus Reid", role: "Search & Rescue Lead", skills: ["K9 Handler", "Climb", "Swift Water"], location: "Anatolia", availability: "On Mission", hours: 98, initials: "MR" },
  { id: "V-1043", name: "Aiko Tanaka", role: "Logistics Coordinator", skills: ["Supply Chain", "Comms"], location: "Tokyo HQ", availability: "Available", hours: 211, initials: "AT" },
  { id: "V-1044", name: "Lucas Almeida", role: "Drone Pilot", skills: ["Mapping", "Thermal", "FAA Pt 107"], location: "São Paulo", availability: "Standby", hours: 67, initials: "LA" },
  { id: "V-1045", name: "Priya Menon", role: "Field Nurse", skills: ["ER", "Wound Care"], location: "Sylhet", availability: "On Mission", hours: 124, initials: "PM" },
  { id: "V-1046", name: "Erik Lindqvist", role: "GIS Analyst", skills: ["Satellite", "QGIS", "Python"], location: "Stockholm", availability: "Available", hours: 88, initials: "EL" },
  { id: "V-1047", name: "Fatima Zahra", role: "Translator", skills: ["AR", "FR", "EN", "TR"], location: "Anatolia", availability: "On Mission", hours: 53, initials: "FZ" },
  { id: "V-1048", name: "Daniel Cho", role: "Civil Engineer", skills: ["Structural", "Bridges"], location: "Seoul", availability: "Standby", hours: 109, initials: "DC" },
];

export const severityColor: Record<Severity, string> = {
  1: "hsl(var(--severity-1))",
  2: "hsl(var(--severity-2))",
  3: "hsl(var(--severity-3))",
  4: "hsl(var(--severity-4))",
  5: "hsl(var(--severity-5))",
};

export const severityLabel: Record<Severity, string> = {
  1: "Minimal",
  2: "Minor",
  3: "Moderate",
  4: "Severe",
  5: "Catastrophic",
};

export const statusColor: Record<Status, string> = {
  monitoring: "text-info border-info/40 bg-info/10",
  active: "text-critical border-critical/40 bg-critical/10",
  responding: "text-warning border-warning/40 bg-warning/10",
  contained: "text-secondary border-secondary/40 bg-secondary/10",
  resolved: "text-success border-success/40 bg-success/10",
};

// Aggregate metrics
export const globalMetrics = {
  activeIncidents: disasters.filter((d) => d.status !== "resolved" && d.status !== "contained").length,
  affectedPopulation: disasters.reduce((s, d) => s + d.affectedPopulation, 0),
  responseTeams: disasters.reduce((s, d) => s + d.responseTeams, 0),
  damageEstimate: disasters.reduce((s, d) => s + d.damageEstimate, 0),
  satellitePasses: 248,
  aidDelivered: 1842,
  volunteersDeployed: volunteers.filter((v) => v.availability === "On Mission").length,
};

export function formatPopulation(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}
