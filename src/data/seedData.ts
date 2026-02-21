export interface Farmer {
  id: string;
  agriId: string;
  firstName: string;
  lastName: string;
  gender: "M" | "F";
  yearOfBirth: number;
  phone: string;
  village: string;
  region: string;
  country: string;
  cooperative: string;
  crops: string[];
  landSizeHa: number;
  seasons: SeasonRecord[];
  enrolledAt: string;
  enrolledBy: string;
  status: "active" | "pending" | "suspended";
  photoUrl?: string;
  biometricEnrolled: boolean;
}

export interface SeasonRecord {
  year: number;
  season: string;
  crops: string[];
  yieldKg: number;
  inputsReceived: string[];
}

export interface ConsentRequest {
  id: string;
  farmerId: string;
  requesterId: string;
  requesterName: string;
  requesterType: "bank" | "insurance" | "government" | "ngo";
  scopes: string[];
  status: "pending" | "approved" | "denied" | "revoked";
  createdAt: string;
  respondedAt?: string;
  purpose: string;
}

export interface AuditEntry {
  id: string;
  farmerId: string;
  action: string;
  actor: string;
  actorType: string;
  timestamp: string;
  details: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  type: "bank" | "insurance" | "government" | "ngo";
  programs: string[];
}

export interface Cooperative {
  id: string;
  name: string;
  region: string;
  memberCount: number;
}

const regions = ["Kaolack", "Thiès", "Saint-Louis", "Ziguinchor", "Tambacounda"];
const villages = [
  "Nioro du Rip", "Kaffrine", "Fatick", "Gossas", "Bambey",
  "Tivaouane", "Mékhé", "Dagana", "Podor", "Richard-Toll",
  "Bignona", "Oussouye", "Sédhiou", "Kolda", "Kédougou",
];
const firstNamesM = ["Mamadou", "Ousmane", "Ibrahima", "Abdoulaye", "Moussa", "Cheikh", "Modou", "Aliou", "Amadou", "Samba"];
const firstNamesF = ["Fatou", "Aminata", "Aïssatou", "Mariama", "Ndèye", "Khady", "Awa", "Dior", "Coumba", "Rama"];
const lastNames = ["Diallo", "Ba", "Ndiaye", "Fall", "Sow", "Diop", "Sy", "Kane", "Mbaye", "Sarr", "Gueye", "Thiam", "Diouf", "Cissé", "Touré"];
const crops = ["Groundnut", "Millet", "Rice", "Maize", "Onion"];
const inputs = ["Fertilizer (NPK)", "Certified Seeds", "Pesticide", "Irrigation Kit", "Training"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function generateFarmer(i: number): Farmer {
  const gender = i % 3 === 0 ? "F" : "M";
  const firstName = gender === "F" ? firstNamesF[i % firstNamesF.length] : firstNamesM[i % firstNamesM.length];
  const lastName = lastNames[i % lastNames.length];
  const region = regions[i % regions.length];
  const village = villages[i % villages.length];
  const farmerCrops = pickN(crops, 1 + Math.floor(Math.random() * 3));
  const landSize = +(0.5 + Math.random() * 9.5).toFixed(1);

  const seasons: SeasonRecord[] = [
    {
      year: 2024,
      season: "Hivernage",
      crops: farmerCrops,
      yieldKg: Math.floor(200 + Math.random() * 3000),
      inputsReceived: pickN(inputs, 1 + Math.floor(Math.random() * 3)),
    },
    {
      year: 2023,
      season: "Hivernage",
      crops: farmerCrops.slice(0, 2),
      yieldKg: Math.floor(150 + Math.random() * 2500),
      inputsReceived: pickN(inputs, 1 + Math.floor(Math.random() * 2)),
    },
  ];

  return {
    id: `farmer-${String(i + 1).padStart(3, "0")}`,
    agriId: `AGR-SN-${String(10000 + i * 137).slice(-5)}`,
    firstName,
    lastName,
    gender,
    yearOfBirth: 1960 + Math.floor(Math.random() * 40),
    phone: `+221 7${Math.floor(Math.random() * 9)}${String(Math.floor(Math.random() * 10000000)).padStart(7, "0")}`,
    village,
    region,
    country: "Senegal",
    cooperative: cooperatives[i % cooperatives.length].name,
    crops: farmerCrops,
    landSizeHa: landSize,
    seasons,
    enrolledAt: `2024-${String(1 + (i % 12)).padStart(2, "0")}-${String(1 + (i % 28)).padStart(2, "0")}`,
    enrolledBy: i % 2 === 0 ? "Agent Diallo" : "Agent Ndiaye",
    status: i === 5 ? "pending" : i === 12 ? "suspended" : "active",
    biometricEnrolled: i % 4 === 0,
  };
}

export const cooperatives: Cooperative[] = [
  { id: "coop-1", name: "Coopérative Arachidière de Kaolack", region: "Kaolack", memberCount: 342 },
  { id: "coop-2", name: "GIE Téranga Thiès", region: "Thiès", memberCount: 218 },
  { id: "coop-3", name: "Union des Riziculteurs du Fleuve", region: "Saint-Louis", memberCount: 507 },
];

export const serviceProviders: ServiceProvider[] = [
  { id: "sp-1", name: "Banque Agricole du Sénégal", type: "bank", programs: ["Microcredit Agricole", "Prêt Équipement"] },
  { id: "sp-2", name: "CNAAS Assurance", type: "insurance", programs: ["Assurance Récolte", "Assurance Bétail"] },
  { id: "sp-3", name: "Programme National de Subventions", type: "government", programs: ["Subvention Engrais 2024", "Semences Certifiées"] },
  { id: "sp-4", name: "ONG AgriDev", type: "ngo", programs: ["Formation Agricole", "Kits Irrigation"] },
  { id: "sp-5", name: "USAID Feed the Future", type: "ngo", programs: ["Resilience Programme", "Market Access"] },
];

export const farmers: Farmer[] = Array.from({ length: 30 }, (_, i) => generateFarmer(i));

export const consentRequests: ConsentRequest[] = [
  {
    id: "cr-1",
    farmerId: "farmer-001",
    requesterId: "sp-1",
    requesterName: "Banque Agricole du Sénégal",
    requesterType: "bank",
    scopes: ["identity_basics", "farm_profile", "season_history"],
    status: "pending",
    createdAt: "2024-11-15T10:30:00Z",
    purpose: "Microcredit eligibility assessment for 2025 planting season",
  },
  {
    id: "cr-2",
    farmerId: "farmer-001",
    requesterId: "sp-2",
    requesterName: "CNAAS Assurance",
    requesterType: "insurance",
    scopes: ["identity_basics", "farm_profile"],
    status: "approved",
    createdAt: "2024-10-01T08:00:00Z",
    respondedAt: "2024-10-02T14:20:00Z",
    purpose: "Crop insurance enrollment for Hivernage 2024",
  },
  {
    id: "cr-3",
    farmerId: "farmer-001",
    requesterId: "sp-3",
    requesterName: "Programme National de Subventions",
    requesterType: "government",
    scopes: ["identity_basics", "farm_profile", "season_history", "inputs_received"],
    status: "approved",
    createdAt: "2024-09-15T09:00:00Z",
    respondedAt: "2024-09-16T11:00:00Z",
    purpose: "Fertilizer subsidy eligibility verification",
  },
  {
    id: "cr-4",
    farmerId: "farmer-001",
    requesterId: "sp-4",
    requesterName: "ONG AgriDev",
    requesterType: "ngo",
    scopes: ["identity_basics"],
    status: "denied",
    createdAt: "2024-08-20T07:30:00Z",
    respondedAt: "2024-08-21T16:00:00Z",
    purpose: "Training program beneficiary tracking",
  },
];

export const auditLog: AuditEntry[] = [
  { id: "a-1", farmerId: "farmer-001", action: "Consent Approved", actor: "Farmer (self)", actorType: "farmer", timestamp: "2024-10-02T14:20:00Z", details: "Approved data access for CNAAS Assurance — scopes: identity, farm profile" },
  { id: "a-2", farmerId: "farmer-001", action: "Data Accessed", actor: "CNAAS Assurance", actorType: "insurance", timestamp: "2024-10-03T09:15:00Z", details: "Retrieved identity basics and farm profile for policy issuance" },
  { id: "a-3", farmerId: "farmer-001", action: "Consent Approved", actor: "Farmer (self)", actorType: "farmer", timestamp: "2024-09-16T11:00:00Z", details: "Approved data access for Programme National de Subventions — all scopes" },
  { id: "a-4", farmerId: "farmer-001", action: "Data Accessed", actor: "Programme National de Subventions", actorType: "government", timestamp: "2024-09-17T08:00:00Z", details: "Verified identity and season history for fertilizer subsidy" },
  { id: "a-5", farmerId: "farmer-001", action: "Consent Denied", actor: "Farmer (self)", actorType: "farmer", timestamp: "2024-08-21T16:00:00Z", details: "Denied data access request from ONG AgriDev" },
  { id: "a-6", farmerId: "farmer-001", action: "Agri-ID Created", actor: "Agent Diallo", actorType: "agent", timestamp: "2024-01-01T10:00:00Z", details: "Initial enrollment and Agri-ID issuance" },
];

export const scopeDescriptions: Record<string, string> = {
  identity_basics: "Full name, gender, year of birth, region",
  farm_profile: "Crops grown, land size, cooperative membership",
  season_history: "Past season yields and performance",
  inputs_received: "Subsidies, seeds, and inputs received",
};

export const fraudAlerts = [
  { id: "fa-1", type: "Duplicate Phone", description: "Phone +221 77XXXXXXX used by 2 different farmer IDs", severity: "high", date: "2024-11-10" },
  { id: "fa-2", type: "Duplicate Beneficiary", description: "Farmer AGR-SN-10548 flagged for receiving subsidy under 2 cooperatives", severity: "medium", date: "2024-11-08" },
];

export const demoAccounts = [
  { role: "agent" as const, name: "Agent Diallo", email: "agent@agri-id.demo" },
  { role: "farmer" as const, name: "Mamadou Diallo", email: "farmer@agri-id.demo" },
  { role: "provider" as const, name: "Banque Agricole", email: "bank@agri-id.demo" },
];
