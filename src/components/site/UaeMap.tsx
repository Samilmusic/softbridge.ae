import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UAE_PATHS, UAE_CITIES } from "@/lib/uae-geo";
import {
  ArrowRight, Building2, Sparkles, MapPin, ChevronDown, X,
  Activity, Scale, Map as MapIcon, Star, ChevronRight, ArrowLeft, Layers,
} from "lucide-react";
import dubaiImg from "@/assets/emirates/dubai.jpg";
import abuDhabiImg from "@/assets/emirates/abu-dhabi.jpg";
import sharjahImg from "@/assets/emirates/sharjah.jpg";
import ajmanImg from "@/assets/emirates/ajman.jpg";
import rakImg from "@/assets/emirates/ras-al-khaimah.jpg";
import fujairahImg from "@/assets/emirates/fujairah.jpg";
import uaqImg from "@/assets/emirates/umm-al-quwain.jpg";
import dubaiDetailMap from "@/assets/emirates/dubai-detailed-map.png";
import abuDhabiDetailMap from "@/assets/emirates/abu-dhabi-detailed-map.png";
import federationMap from "@/assets/emirates/uae-federation-map.png";

/* ───────────────────── Types & Data ───────────────────── */

type EmirateKey =
  | "Dubai" | "Abu Dhabi" | "Sharjah" | "Ajman"
  | "Ras Al Khaimah" | "Fujairah" | "Umm Al Quwain";

type Tone = "violet" | "gold" | "blue" | "cyan";
type Mode = "federation" | "emirate" | "jurisdiction";

type Jurisdiction = {
  id: string;
  name: string;
  emirate: EmirateKey;
  anchor: keyof typeof UAE_CITIES;
  offset?: [number, number];
  labelSide?: "left" | "right";
  tier: "major" | "secondary";
  popular?: boolean;
  tagline: string;
  bestFor: string[];
  benefits: string[];
  activities: string;
  cost: string;
  setupDays: string;
};

const TONE_BY_EMIRATE: Record<EmirateKey, Tone> = {
  "Dubai": "violet",
  "Abu Dhabi": "gold",
  "Sharjah": "blue",
  "Ajman": "cyan",
  "Ras Al Khaimah": "cyan",
  "Fujairah": "cyan",
  "Umm Al Quwain": "cyan",
};

const TONE_HEX: Record<Tone, string> = {
  violet: "#A78BFA",
  gold: "#E6B663",
  blue: "#5BA8FF",
  cyan: "#67E8F9",
};

/* Per-jurisdiction brand accents & monogram (premium typographic marks).
   `accent` overrides the emirate tone; `mono` is the short brand letters. */
const BRAND: Record<string, { mono: string; accent: string; accent2: string; full: string }> = {
  "ifza":            { mono: "IFZA",  accent: "#E6B663", accent2: "#A78BFA", full: "IFZA" },
  "dmcc":            { mono: "DMCC",  accent: "#5BA8FF", accent2: "#C9D3DE", full: "DMCC" },
  "meydan":          { mono: "MFZ",   accent: "#C49A4B", accent2: "#1E2A4A", full: "Meydan FZ" },
  "dafza":           { mono: "DAFZA", accent: "#4FB6FF", accent2: "#0E2A55", full: "DAFZA" },
  "dubai-south":     { mono: "DS",    accent: "#9CB3FF", accent2: "#5BA8FF", full: "Dubai South" },
  "dubai-mainland":  { mono: "DED",   accent: "#A78BFA", accent2: "#5BA8FF", full: "Dubai Economy" },
  "dic":             { mono: "DIC",   accent: "#67E8F9", accent2: "#A78BFA", full: "Dubai Internet City" },
  "dmc":             { mono: "DMC",   accent: "#F472B6", accent2: "#A78BFA", full: "Dubai Media City" },
  "dso":             { mono: "DSO",   accent: "#67E8F9", accent2: "#5BA8FF", full: "Dubai Silicon Oasis" },
  "jafza":           { mono: "JAFZA", accent: "#5BA8FF", accent2: "#0E2A55", full: "JAFZA" },
  "ad-mainland":     { mono: "ADDED", accent: "#E6B663", accent2: "#1E2A4A", full: "Abu Dhabi Economy" },
  "adgm":            { mono: "ADGM",  accent: "#E6B663", accent2: "#FFFFFF", full: "ADGM" },
  "masdar":          { mono: "MC",    accent: "#86EFAC", accent2: "#67E8F9", full: "Masdar City" },
  "kizad":           { mono: "KZ",    accent: "#E6B663", accent2: "#5BA8FF", full: "KEZAD" },
  "twofour54":       { mono: "247",   accent: "#F472B6", accent2: "#A78BFA", full: "twofour54" },
  "sharjah-mainland":{ mono: "SHJ",   accent: "#5BA8FF", accent2: "#E6B663", full: "Sharjah Economy" },
  "shams":           { mono: "SHAMS", accent: "#67E8F9", accent2: "#A78BFA", full: "SHAMS" },
  "smc":             { mono: "SMC",   accent: "#F472B6", accent2: "#67E8F9", full: "Sharjah Media City" },
  "hamriyah":        { mono: "HFZA",  accent: "#5BA8FF", accent2: "#E6B663", full: "Hamriyah FZ" },
  "saif":            { mono: "SAIF",  accent: "#E6B663", accent2: "#5BA8FF", full: "SAIF Zone" },
  "ajman-fz":        { mono: "AFZ",   accent: "#67E8F9", accent2: "#5BA8FF", full: "Ajman Free Zone" },
  "ajman-mainland":  { mono: "AJM",   accent: "#67E8F9", accent2: "#A78BFA", full: "Ajman DED" },
  "rakez":           { mono: "RAKEZ", accent: "#2DD4BF", accent2: "#67E8F9", full: "RAKEZ" },
  "rak-mainland":    { mono: "RAK",   accent: "#2DD4BF", accent2: "#A78BFA", full: "RAK DED" },
  "fcc":             { mono: "FCC",   accent: "#67E8F9", accent2: "#F472B6", full: "Fujairah Creative City" },
  "fujairah-fz":     { mono: "FFZ",   accent: "#5BA8FF", accent2: "#67E8F9", full: "Fujairah FZ" },
  "uaq":             { mono: "UAQ",   accent: "#67E8F9", accent2: "#A78BFA", full: "UAQ FTZ" },
};

function brandFor(id: string, fallbackAccent: string) {
  return BRAND[id] ?? {
    mono: id.slice(0, 3).toUpperCase(),
    accent: fallbackAccent,
    accent2: fallbackAccent,
    full: "",
  };
}

const EMIRATE_ANCHOR: Record<EmirateKey, keyof typeof UAE_CITIES> = {
  "Dubai": "Dubai",
  "Abu Dhabi": "Abu Dhabi",
  "Sharjah": "Sharjah",
  "Ajman": "Ajman",
  "Ras Al Khaimah": "Ras Al Khaimah",
  "Fujairah": "Fujairah",
  "Umm Al Quwain": "Umm Al Quwain",
};

const J: Jurisdiction[] = [
  { id: "dubai-mainland", name: "Dubai Mainland", emirate: "Dubai", anchor: "Dubai", offset: [0, 0], labelSide: "right", tier: "major", popular: true,
    tagline: "The commercial hub of the UAE. Ideal for businesses operating freely across the UAE market with no restrictions.",
    bestFor: ["Trading", "Consulting", "E-Commerce", "Services", "Real Estate", "Startups"],
    benefits: ["100% Foreign Ownership", "No Currency Restrictions", "Access to UAE Government Contracts", "Unlimited Visa Quota", "Operate Across UAE Market"],
    activities: "2,000+ Activities", cost: "AED 15,000 – 25,000", setupDays: "3 – 7 Days" },
  { id: "dmcc", name: "DMCC", emirate: "Dubai", anchor: "Dubai", offset: [-58, -22], labelSide: "left", tier: "major",
    tagline: "World-class free zone in JLT — globally recognized, banking-friendly, the standard for commodities and international trade.",
    bestFor: ["Trading", "Crypto", "Commodities", "International Ops"],
    benefits: ["Global Reputation", "Banking Friendly", "Premium Address", "Strong Audit Framework"],
    activities: "1,800+ Activities", cost: "AED 30,000 – 60,000", setupDays: "5 – 10 Days" },
  { id: "ifza", name: "IFZA", emirate: "Dubai", anchor: "Dubai", offset: [-72, 50], labelSide: "left", tier: "major",
    tagline: "Cost-effective Dubai free zone with 100% foreign ownership and a wide activity list.",
    bestFor: ["E-Commerce", "Consulting", "IT Services", "Freelancers"],
    benefits: ["100% Ownership", "Competitive Pricing", "Quick Setup", "No Currency Restrictions"],
    activities: "1,500+ Activities", cost: "AED 12,000 – 25,000", setupDays: "2 – 5 Days" },
  { id: "meydan", name: "Meydan Free Zone", emirate: "Dubai", anchor: "Dubai", offset: [62, 56], labelSide: "right", tier: "secondary",
    tagline: "Premium digital free zone with a prestigious Dubai address and fully online incorporation.",
    bestFor: ["Digital Agencies", "SaaS", "Trading", "Holding"],
    benefits: ["Prestigious Address", "Digital Setup", "Banking Friendly", "Flexi-Desk"],
    activities: "1,200+ Activities", cost: "AED 14,000 – 30,000", setupDays: "3 – 6 Days" },
  { id: "dubai-south", name: "Dubai South", emirate: "Dubai", anchor: "Dubai South", offset: [0, 0], labelSide: "right", tier: "secondary",
    tagline: "Logistics-focused free zone around Al Maktoum Airport and Expo City.",
    bestFor: ["Logistics", "Aviation", "E-Commerce", "Light Industry"],
    benefits: ["Airport Access", "Warehousing", "Strategic Location", "Cost Efficient"],
    activities: "1,000+ Activities", cost: "AED 15,000 – 40,000", setupDays: "5 – 10 Days" },
  { id: "dafza", name: "DAFZA", emirate: "Dubai", anchor: "Dubai", offset: [78, -14], labelSide: "right", tier: "secondary",
    tagline: "Premium free zone next to Dubai International Airport — built for global trade and regional HQs.",
    bestFor: ["Global Trade", "Regional HQ", "Pharma", "Aviation"],
    benefits: ["Airport Adjacent", "Premium Tenants", "Banking Friendly", "Strong Compliance"],
    activities: "900+ Activities", cost: "AED 35,000 – 80,000", setupDays: "7 – 14 Days" },
  { id: "dic", name: "Dubai Internet City", emirate: "Dubai", anchor: "Dubai", offset: [-92, 18], labelSide: "left", tier: "secondary",
    tagline: "Tech-focused free zone hosting global ICT companies. Ideal for software, cloud, and innovators.",
    bestFor: ["SaaS", "AI", "Cloud", "Tech Startups"],
    benefits: ["Tech Ecosystem", "Talent Access", "Premium Brand", "Investor Network"],
    activities: "800+ Activities", cost: "AED 25,000 – 55,000", setupDays: "5 – 10 Days" },
  { id: "dmc", name: "Dubai Media City", emirate: "Dubai", anchor: "Dubai", offset: [-100, 38], labelSide: "left", tier: "secondary",
    tagline: "Home to leading media, marketing and content businesses.",
    bestFor: ["Agencies", "Media", "Content", "PR"],
    benefits: ["Creative Cluster", "Strong Brand", "Networking", "Premium Address"],
    activities: "700+ Activities", cost: "AED 22,000 – 50,000", setupDays: "5 – 10 Days" },
  { id: "dso", name: "Dubai Silicon Oasis", emirate: "Dubai", anchor: "Dubai", offset: [48, 82], labelSide: "right", tier: "secondary",
    tagline: "Integrated tech park combining business, residential and tech infrastructure.",
    bestFor: ["Hardware", "R&D", "IT Services", "Light Manufacturing"],
    benefits: ["Tech Park", "R&D Friendly", "Integrated Community", "Cost Efficient"],
    activities: "1,100+ Activities", cost: "AED 16,000 – 35,000", setupDays: "5 – 9 Days" },
  { id: "jafza", name: "JAFZA", emirate: "Dubai", anchor: "Jebel Ali", offset: [0, 0], labelSide: "left", tier: "secondary",
    tagline: "The UAE's flagship industrial and logistics free zone at Jebel Ali Port.",
    bestFor: ["Manufacturing", "Logistics", "Trading", "Industrial"],
    benefits: ["Port Access", "Industrial Plots", "Global Reach", "Strong Reputation"],
    activities: "2,000+ Activities", cost: "AED 30,000 – 100,000+", setupDays: "7 – 14 Days" },
  { id: "ad-mainland", name: "Abu Dhabi Mainland", emirate: "Abu Dhabi", anchor: "Abu Dhabi", offset: [0, 0], labelSide: "left", tier: "major",
    tagline: "Operate freely in the capital with access to government contracts and large-scale projects.",
    bestFor: ["Contracting", "Energy", "Consulting", "Local Services"],
    benefits: ["Government Tenders", "Large Market", "Strong Reputation", "Strategic Location"],
    activities: "1,800+ Activities", cost: "AED 20,000 – 50,000", setupDays: "5 – 10 Days" },
  { id: "adgm", name: "ADGM", emirate: "Abu Dhabi", anchor: "Abu Dhabi", offset: [-60, 36], labelSide: "left", tier: "major",
    tagline: "International financial centre on Al Maryah Island with English common law.",
    bestFor: ["Fintech", "Funds", "Family Office", "Holding"],
    benefits: ["English Common Law", "Top-Tier Reputation", "Banking Friendly", "Regulatory Clarity"],
    activities: "600+ Activities", cost: "AED 40,000 – 120,000+", setupDays: "10 – 20 Days" },
  { id: "masdar", name: "Masdar City", emirate: "Abu Dhabi", anchor: "Masdar", offset: [0, 0], labelSide: "right", tier: "secondary",
    tagline: "Sustainability and innovation hub focused on clean tech, renewables and smart mobility.",
    bestFor: ["Clean Tech", "Renewables", "Smart Mobility", "R&D"],
    benefits: ["Green Brand", "Innovation Cluster", "Strong Incentives", "Future Industries"],
    activities: "500+ Activities", cost: "AED 18,000 – 45,000", setupDays: "5 – 12 Days" },
  { id: "kizad", name: "KIZAD", emirate: "Abu Dhabi", anchor: "KIZAD", offset: [0, 0], labelSide: "right", tier: "secondary",
    tagline: "Massive industrial zone connected to Khalifa Port — heavy manufacturing and logistics.",
    bestFor: ["Manufacturing", "Logistics", "Chemicals", "Industrial"],
    benefits: ["Port Access", "Industrial Land", "Scale Friendly", "Tax Benefits"],
    activities: "800+ Activities", cost: "AED 25,000 – 100,000+", setupDays: "10 – 20 Days" },
  { id: "twofour54", name: "twofour54", emirate: "Abu Dhabi", anchor: "Abu Dhabi", offset: [65, -20], labelSide: "right", tier: "secondary",
    tagline: "Abu Dhabi's media free zone — incentives for production, gaming and content.",
    bestFor: ["Media", "Gaming", "Production", "Creative"],
    benefits: ["Production Incentives", "Creative Cluster", "Talent Access", "Premium Brand"],
    activities: "400+ Activities", cost: "AED 15,000 – 40,000", setupDays: "5 – 10 Days" },
  { id: "sharjah-mainland", name: "Sharjah Mainland", emirate: "Sharjah", anchor: "Sharjah", offset: [-44, -34], labelSide: "left", tier: "major",
    tagline: "Cost-effective mainland alternative to Dubai with strong industrial and commercial sectors.",
    bestFor: ["Trading", "Industrial", "Services", "Retail"],
    benefits: ["Cost Efficient", "Strong Industry", "Close to Dubai", "Stable Market"],
    activities: "1,400+ Activities", cost: "AED 12,000 – 30,000", setupDays: "5 – 10 Days" },
  { id: "shams", name: "SHAMS", emirate: "Sharjah", anchor: "Sharjah", offset: [-80, 24], labelSide: "left", tier: "secondary",
    tagline: "Creative media free zone with low setup costs and a wide activity list.",
    bestFor: ["Freelancers", "Media", "Consulting", "E-Commerce"],
    benefits: ["Low Cost", "Wide Activities", "Quick Setup", "Freelancer Friendly"],
    activities: "1,000+ Activities", cost: "AED 5,750 – 15,000", setupDays: "2 – 4 Days" },
  { id: "smc", name: "Sharjah Media City", emirate: "Sharjah", anchor: "Sharjah", offset: [48, 72], labelSide: "right", tier: "secondary",
    tagline: "Affordable media-focused free zone with flexible packages and remote-friendly setup.",
    bestFor: ["Media", "Marketing", "Consulting", "Digital"],
    benefits: ["Affordable", "Remote Setup", "Flexible Packages", "Quick Licensing"],
    activities: "900+ Activities", cost: "AED 6,000 – 18,000", setupDays: "2 – 5 Days" },
  { id: "hamriyah", name: "Hamriyah Free Zone", emirate: "Sharjah", anchor: "Hamriyah", offset: [-60, -30], labelSide: "left", tier: "secondary",
    tagline: "Industrial free zone with deep-water port access — manufacturing, oil & gas, heavy industry.",
    bestFor: ["Manufacturing", "Oil & Gas", "Heavy Industry", "Logistics"],
    benefits: ["Port Access", "Industrial Plots", "Tax Benefits", "Established Infrastructure"],
    activities: "700+ Activities", cost: "AED 15,000 – 50,000", setupDays: "7 – 14 Days" },
  { id: "saif", name: "SAIF Zone", emirate: "Sharjah", anchor: "SAIF", offset: [62, -8], labelSide: "right", tier: "secondary",
    tagline: "Airport-based free zone with strong logistics and trading infrastructure.",
    bestFor: ["Trading", "Logistics", "Light Industry", "Distribution"],
    benefits: ["Airport Access", "24/7 Operations", "Cost Efficient", "Trade Friendly"],
    activities: "800+ Activities", cost: "AED 14,000 – 35,000", setupDays: "5 – 10 Days" },
  { id: "ajman-fz", name: "Ajman Free Zone", emirate: "Ajman", anchor: "Ajman", offset: [60, -28], labelSide: "right", tier: "secondary",
    tagline: "One of the most affordable free zones in the UAE — ideal for startups.",
    bestFor: ["Startups", "Trading", "Services", "E-Commerce"],
    benefits: ["Affordable", "Quick Setup", "Visa Friendly", "Flexible Packages"],
    activities: "1,500+ Activities", cost: "AED 8,500 – 20,000", setupDays: "2 – 5 Days" },
  { id: "ajman-mainland", name: "Ajman Mainland", emirate: "Ajman", anchor: "Ajman", offset: [82, 22], labelSide: "right", tier: "secondary",
    tagline: "Affordable mainland option with growing commercial activity.",
    bestFor: ["Retail", "Services", "Contracting", "Trading"],
    benefits: ["Cost Efficient", "Growing Market", "Quick Licensing", "Local Access"],
    activities: "900+ Activities", cost: "AED 10,000 – 25,000", setupDays: "3 – 7 Days" },
  { id: "rakez", name: "RAKEZ", emirate: "Ras Al Khaimah", anchor: "Ras Al Khaimah", offset: [0, 0], labelSide: "right", tier: "major",
    tagline: "Large multi-sector economic zone with industrial, commercial and educational ecosystems.",
    bestFor: ["Industrial", "Trading", "Education", "Manufacturing"],
    benefits: ["Cost Efficient", "Multi-Sector", "Industrial Land", "Strong Infrastructure"],
    activities: "1,500+ Activities", cost: "AED 11,500 – 30,000", setupDays: "3 – 7 Days" },
  { id: "rak-mainland", name: "RAK Mainland", emirate: "Ras Al Khaimah", anchor: "Ras Al Khaimah", offset: [-50, 38], labelSide: "left", tier: "secondary",
    tagline: "Growing mainland with strong tourism, industry and trade.",
    bestFor: ["Tourism", "Industry", "Trading", "Services"],
    benefits: ["Low Cost", "Growth Market", "Tourism Sector", "Stable Economy"],
    activities: "800+ Activities", cost: "AED 12,000 – 28,000", setupDays: "5 – 10 Days" },
  { id: "fcc", name: "Fujairah Creative City", emirate: "Fujairah", anchor: "Fujairah", offset: [0, 0], labelSide: "right", tier: "secondary",
    tagline: "Media-focused free zone on the east coast — fast setup, low cost.",
    bestFor: ["Consulting", "Media", "Education", "Freelancers"],
    benefits: ["Low Cost", "Fast Setup", "Wide Activities", "Remote Friendly"],
    activities: "600+ Activities", cost: "AED 7,500 – 18,000", setupDays: "2 – 5 Days" },
  { id: "fujairah-fz", name: "Fujairah Free Zone", emirate: "Fujairah", anchor: "Fujairah", offset: [-52, 32], labelSide: "left", tier: "secondary",
    tagline: "Strategic east-coast free zone with port access outside the Strait of Hormuz.",
    bestFor: ["Shipping", "Trading", "Logistics", "Industrial"],
    benefits: ["Port Access", "Strategic Location", "Cost Efficient", "Trade Friendly"],
    activities: "700+ Activities", cost: "AED 13,000 – 35,000", setupDays: "5 – 10 Days" },
  { id: "uaq", name: "UAQ Free Trade Zone", emirate: "Umm Al Quwain", anchor: "Umm Al Quwain", offset: [0, 0], labelSide: "right", tier: "secondary",
    tagline: "Compact and affordable free zone with quick licensing — popular for SMEs.",
    bestFor: ["SMEs", "Consulting", "Trading", "Services"],
    benefits: ["Affordable", "Quick Setup", "Flexible Packages", "Low Overheads"],
    activities: "500+ Activities", cost: "AED 9,000 – 22,000", setupDays: "3 – 7 Days" },
];

const EMIRATE_ORDER: EmirateKey[] = [
  "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain",
];

const MAP_TRANSFORM = "translate(40 -30) scale(0.92 1.12)";
const MAP_SX = 0.92;
const MAP_SY = 1.12;
const MAP_TX = 40;
const MAP_TY = -30;
const VW = 1000;
const VH = 760;

function anchorPos(j: Jurisdiction): [number, number] {
  return UAE_CITIES[j.anchor] as unknown as [number, number];
}
function markerPos(j: Jurisdiction): [number, number] {
  const [cx, cy] = anchorPos(j);
  const [ox, oy] = j.offset ?? [0, 0];
  return [cx + ox, cy + oy];
}
function emCenter(em: EmirateKey): [number, number] {
  return UAE_CITIES[EMIRATE_ANCHOR[em]] as unknown as [number, number];
}

type EmirateMeta = {
  image: string;
  description: string;
  strengths: string[];
  stats: { label: string; value: string }[];
};

const EMIRATE_META: Record<EmirateKey, EmirateMeta> = {
  "Dubai": {
    image: dubaiImg,
    description: "Global business hub with advanced infrastructure, international connectivity and world-class free zones.",
    strengths: ["Global Brand", "World-Class Banking", "Tech & Trade Hub"],
    stats: [
      { label: "Jurisdictions", value: "10" }, { label: "GDP Rank", value: "#1" }, { label: "Free Zones", value: "30+" },
    ],
  },
  "Abu Dhabi": {
    image: abuDhabiImg,
    description: "The federal capital — home to sovereign wealth, energy, finance and government-scale projects.",
    strengths: ["Capital City", "Government Tenders", "ADGM Financial Centre"],
    stats: [
      { label: "Jurisdictions", value: "5" }, { label: "AUM", value: "$1.5T+" }, { label: "GDP Share", value: "55%" },
    ],
  },
  "Sharjah": {
    image: sharjahImg,
    description: "Cost-effective industrial and cultural emirate — strong manufacturing, education and creative sectors.",
    strengths: ["Cost Efficient", "Industrial Strength", "Cultural Capital"],
    stats: [
      { label: "Jurisdictions", value: "5" }, { label: "Ports", value: "3" }, { label: "Universities", value: "16+" },
    ],
  },
  "Ajman": {
    image: ajmanImg,
    description: "Compact, affordable and fast-moving — ideal for startups and SMEs seeking quick licensing.",
    strengths: ["Lowest Setup Cost", "Quick Licensing", "SME Friendly"],
    stats: [
      { label: "Jurisdictions", value: "2" }, { label: "Setup", value: "2–5 days" }, { label: "From", value: "AED 8.5k" },
    ],
  },
  "Ras Al Khaimah": {
    image: rakImg,
    description: "Industry and tourism powerhouse — mountains, manufacturing and the multi-sector RAKEZ ecosystem.",
    strengths: ["Industrial Land", "Tourism Growth", "Multi-Sector RAKEZ"],
    stats: [
      { label: "Jurisdictions", value: "2" }, { label: "From", value: "AED 11.5k" }, { label: "Visitors", value: "1.1M+" },
    ],
  },
  "Fujairah": {
    image: fujairahImg,
    description: "Strategic east-coast emirate — the only UAE port outside the Strait of Hormuz, ideal for shipping.",
    strengths: ["Indian Ocean Port", "Bunkering Hub", "Trade Resilience"],
    stats: [
      { label: "Jurisdictions", value: "2" }, { label: "Port Rank", value: "#3 bunker" }, { label: "Coastline", value: "90 km" },
    ],
  },
  "Umm Al Quwain": {
    image: uaqImg,
    description: "Quiet coastal emirate with simple licensing — popular with SMEs and lifestyle businesses.",
    strengths: ["Affordable", "Quiet Coast", "Simple Licensing"],
    stats: [
      { label: "Jurisdictions", value: "1" }, { label: "From", value: "AED 9k" }, { label: "Setup", value: "3–7 days" },
    ],
  },
};


/* ───────────────────── Component ───────────────────── */

export function UaeMap() {
  const [mode, setMode] = useState<Mode>("federation");
  const [focusEmirate, setFocusEmirate] = useState<EmirateKey | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [openEmirate, setOpenEmirate] = useState<EmirateKey | null>("Dubai");

  const active = activeId ? J.find(j => j.id === activeId) ?? null : null;
  const activeHex = active ? TONE_HEX[TONE_BY_EMIRATE[active.emirate]] : TONE_HEX.violet;

  const grouped = useMemo(() => {
    const out: Record<EmirateKey, Jurisdiction[]> = {
      "Dubai": [], "Abu Dhabi": [], "Sharjah": [], "Ajman": [],
      "Ras Al Khaimah": [], "Fujairah": [], "Umm Al Quwain": [],
    };
    J.forEach(j => out[j.emirate].push(j));
    return out;
  }, []);

  // Dedicated detail-map overlays for select emirates instead of zooming the SVG.
  const isDubaiFocus = focusEmirate === "Dubai";
  const isAbuDhabiFocus = focusEmirate === "Abu Dhabi";
  const isDetailOverlay = isDubaiFocus || isAbuDhabiFocus;

  // Smart camera — accounts for MAP_TRANSFORM and reserves space for the floating preview panel.
  const camera = useMemo(() => {
    if (mode === "federation" || !focusEmirate || isDetailOverlay) {
      return { scale: 1, tx: 0, ty: 0 };
    }
    const list = grouped[focusEmirate];
    const pts = list.map(markerPos);
    const [hx, hy] = emCenter(focusEmirate);
    pts.push([hx, hy]);
    const xs = pts.map(p => p[0]);
    const ys = pts.map(p => p[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);

    const pxMinX = MAP_TX + MAP_SX * minX;
    const pxMaxX = MAP_TX + MAP_SX * maxX;
    const pxMinY = MAP_TY + MAP_SY * minY;
    const pxMaxY = MAP_TY + MAP_SY * maxY;
    const pxCx = (pxMinX + pxMaxX) / 2;
    const pxCy = (pxMinY + pxMaxY) / 2;
    const pxW = pxMaxX - pxMinX;
    const pxH = pxMaxY - pxMinY;

    const reservePanel = 80;
    const padX = 160;
    const padY = 170;
    const availW = Math.max(280, VW - reservePanel - padX * 2);
    const availH = Math.max(280, VH - padY * 2);

    const s = Math.min(availW / Math.max(pxW, 1), availH / Math.max(pxH, 1), 2.0);

    const centerX = padX + availW / 2;
    const centerY = VH / 2;
    const tx = centerX - s * pxCx;
    const ty = centerY - s * pxCy;
    return { scale: s, tx, ty };
  }, [mode, focusEmirate, grouped, isDetailOverlay]);


  const openEmirateView = (em: EmirateKey) => {
    setFocusEmirate(em);
    setMode("emirate");
    setOpenEmirate(em);
    setActiveId(null);
  };
  const openJurisdiction = (j: Jurisdiction) => {
    setFocusEmirate(j.emirate);
    setOpenEmirate(j.emirate);
    setActiveId(j.id);
    setMode("jurisdiction");
  };
  const stepBack = () => {
    if (mode === "jurisdiction") { setMode("emirate"); setActiveId(null); }
    else if (mode === "emirate") { setMode("federation"); setFocusEmirate(null); }
  };
  const resetAll = () => { setMode("federation"); setFocusEmirate(null); setActiveId(null); };

  return (
    <section id="jurisdictions" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.22_0.06_280/0.45),transparent_55%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.30_0.10_280/0.25),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-[0.10]" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.28em] text-violet-300/90 uppercase mb-4">
              <MapIcon className="w-3.5 h-3.5" />
              UAE Business Intelligence System
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight leading-[1.05]">
              The UAE, Rendered as a <span className="gold-text-gradient">Living System</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
              Click an emirate to zoom in. Click a jurisdiction to open its ecosystem. A cinematic, spatial way to explore 27+ jurisdictions across all 7 emirates.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Live Data · UAE Business Ecosystem
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { v: "27+", l: "Jurisdictions", tone: "violet" as Tone },
            { v: "7", l: "Emirates", tone: "gold" as Tone },
            { v: "150+", l: "Business Activities", tone: "blue" as Tone },
            { v: "98%", l: "Foreign Ownership", tone: "cyan" as Tone },
          ].map(s => (
            <StatCard key={s.l} value={s.v} label={s.l} tone={s.tone} />
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[290px_1fr_340px] gap-5">

          {/* LEFT — emirate accordion */}
          <aside className="rounded-3xl border border-white/10 bg-[oklch(0.13_0.025_280/0.6)] backdrop-blur-xl p-4 max-h-[760px] overflow-y-auto custom-scroll">
            <div className="text-[11px] font-medium tracking-[0.22em] text-muted-foreground uppercase px-2 py-2">
              Browse by Emirate
            </div>
            <div className="space-y-1.5 mt-1">
              {EMIRATE_ORDER.map(em => {
                const tone = TONE_BY_EMIRATE[em];
                const c = TONE_HEX[tone];
                const list = grouped[em];
                const open = openEmirate === em;
                const isFocus = focusEmirate === em;
                return (
                  <div key={em}>
                    <button
                      onClick={() => { openEmirateView(em); }}
                      className={`w-full flex items-center justify-between gap-2 px-3 py-3 rounded-2xl border transition-all ${
                        open || isFocus
                          ? "bg-white/[0.04] border-white/15"
                          : "bg-white/[0.015] border-white/[0.06] hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-7 h-7 rounded-xl flex items-center justify-center border border-white/10"
                          style={{
                            background: `radial-gradient(circle, ${c}33, transparent 70%)`,
                            boxShadow: isFocus ? `0 0 18px ${c}77` : open ? `0 0 12px ${c}44` : "none",
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />
                        </span>
                        <span className="text-sm font-medium">{em}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground">{list.length}</span>
                        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    {open && (
                      <div className="mt-1.5 ml-3 pl-3 border-l border-white/10 space-y-0.5 animate-fade-in">
                        {list.map(j => {
                          const isA = j.id === activeId;
                          return (
                            <button
                              key={j.id}
                              onClick={() => openJurisdiction(j)}
                              className={`w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-all ${
                                isA
                                  ? "bg-white/[0.06] text-foreground"
                                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.02]"
                              }`}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ background: c, boxShadow: isA ? `0 0 8px ${c}` : "none" }}
                              />
                              <span className="truncate">{j.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

          {/* CENTER — cinematic map */}
          <div className="relative rounded-3xl border border-white/10 bg-[oklch(0.10_0.025_280/0.78)] backdrop-blur-xl overflow-hidden min-h-[640px]">
            {/* atmosphere */}
            <div className="absolute inset-0 grid-pattern opacity-[0.12]" />
            <motion.div
              className="absolute -top-1/3 -left-1/4 w-[60%] aspect-square rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, oklch(0.55 0.22 290 / 0.20), transparent 70%)" }}
              animate={{ x: [0, 30, -10, 0], y: [0, -20, 10, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-1/3 -right-1/4 w-[55%] aspect-square rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, oklch(0.70 0.14 220 / 0.16), transparent 70%)" }}
              animate={{ x: [0, -25, 15, 0], y: [0, 18, -12, 0] }}
              transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* scanning beam */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
              <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-violet-400/60 to-transparent animate-scan" />
            </div>

            <Particles />

            {/* FEDERATION HERO — cinematic uploaded UAE map */}
            <AnimatePresence>
              {mode === "federation" && (
                <motion.div
                  key="federation-hero"
                  className="absolute inset-0 z-10"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* image */}
                  <motion.img
                    src={federationMap}
                    alt="UAE federation intelligence map"
                    className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
                    draggable={false}
                    animate={{ scale: [1, 1.015, 1] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* ambient breathing glow */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none mix-blend-screen"
                    style={{ background: "radial-gradient(60% 50% at 70% 40%, oklch(0.65 0.22 290 / 0.18), transparent 70%)" }}
                    animate={{ opacity: [0.5, 0.85, 0.5] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 pointer-events-none mix-blend-screen"
                    style={{ background: "radial-gradient(50% 45% at 35% 70%, oklch(0.78 0.16 75 / 0.14), transparent 70%)" }}
                    animate={{ opacity: [0.45, 0.75, 0.45] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                  />
                  {/* interactive hotspots aligned to uploaded image */}
                  {([
                    { key: "Ras Al Khaimah", x: 76,  y: 19.5, tone: "violet" as Tone },
                    { key: "Umm Al Quwain",  x: 70,  y: 27,   tone: "cyan"   as Tone },
                    { key: "Ajman",          x: 67,  y: 32,   tone: "blue"   as Tone },
                    { key: "Fujairah",       x: 82,  y: 35,   tone: "gold"   as Tone },
                    { key: "Sharjah",        x: 73,  y: 43,   tone: "blue"   as Tone },
                    { key: "Dubai",          x: 63.5,y: 49.5, tone: "violet" as Tone },
                    { key: "Abu Dhabi",      x: 44,  y: 62,   tone: "gold"   as Tone },
                  ] as { key: EmirateKey; x: number; y: number; tone: Tone }[]).map((h, i) => {
                    const c = TONE_HEX[h.tone];
                    return (
                      <button
                        key={h.key}
                        onClick={() => { setFocusEmirate(h.key); setMode("emirate"); setActiveId(null); }}
                        className="group absolute -translate-x-1/2 -translate-y-1/2 outline-none"
                        style={{ left: `${h.x}%`, top: `${h.y}%` }}
                        aria-label={`Open ${h.key}`}
                      >
                        <span className="relative flex items-center justify-center w-3 h-3">
                          <motion.span
                            className="absolute inset-0 rounded-full"
                            style={{ background: c, boxShadow: `0 0 22px ${c}, 0 0 6px ${c}` }}
                            animate={{ scale: [1, 1.8, 1], opacity: [0.85, 0.15, 0.85] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
                          />
                          <span className="relative w-2 h-2 rounded-full bg-white" style={{ boxShadow: `0 0 10px ${c}` }} />
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>


            {/* breadcrumb / top hud */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-[10.5px] tracking-[0.22em] uppercase">
                <button
                  onClick={resetAll}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border transition-all ${
                    mode === "federation"
                      ? "border-violet-400/40 bg-violet-400/10 text-violet-200"
                      : "border-white/10 bg-white/[0.03] text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Layers className="w-3 h-3" /> Federation
                </button>
                {focusEmirate && (
                  <>
                    <ChevronRight className="w-3 h-3 text-muted-foreground/60" />
                    <button
                      onClick={() => { setMode("emirate"); setActiveId(null); }}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-foreground/90 hover:bg-white/[0.07] transition-all normal-case tracking-normal"
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: TONE_HEX[TONE_BY_EMIRATE[focusEmirate]], boxShadow: `0 0 8px ${TONE_HEX[TONE_BY_EMIRATE[focusEmirate]]}` }} />
                      {focusEmirate}
                    </button>
                  </>
                )}
                {active && (
                  <>
                    <ChevronRight className="w-3 h-3 text-muted-foreground/60" />
                    <span className="px-2.5 py-1.5 rounded-full border border-white/15 bg-white/[0.06] text-foreground normal-case tracking-normal">
                      {active.name}
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                {mode !== "federation" && (
                  <button
                    onClick={stepBack}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] text-foreground/90 hover:bg-white/[0.08] transition-all"
                  >
                    <ArrowLeft className="w-3 h-3" /> Back
                  </button>
                )}
                <div className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-muted-foreground px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
                  v2.6 · {J.length} Nodes
                </div>
              </div>
            </div>

            <motion.svg
              viewBox={`0 0 ${VW} ${VH}`}
              className="w-full h-full block relative"
              animate={{ opacity: isDetailOverlay ? 0.18 : 1, filter: isDetailOverlay ? "blur(2px)" : "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <defs>
                <linearGradient id="uae-fill-v3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.30 0.06 280)" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="oklch(0.14 0.03 280)" stopOpacity="0.55" />
                </linearGradient>
                <linearGradient id="uae-stroke-v3" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#67E8F9" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#E6B663" stopOpacity="0.7" />
                </linearGradient>
                <filter id="node-glow-v3" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="2.2" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="halo-v3" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="20" />
                </filter>
                <radialGradient id="focus-halo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={activeHex} stopOpacity="0.32" />
                  <stop offset="100%" stopColor={activeHex} stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* CAMERA */}
              <motion.g
                animate={{ x: camera.tx, y: camera.ty, scale: camera.scale }}
                transition={{ type: "spring", stiffness: 80, damping: 22, mass: 0.9 }}
                style={{ transformOrigin: "0 0" }}
              >
                <g transform={MAP_TRANSFORM}>
                  {/* country shadow */}
                  {UAE_PATHS.map((d, i) => (
                    <path key={`s-${i}`} d={d} fill="oklch(0.05 0.02 280)" transform="translate(0,10)" opacity="0.55" />
                  ))}

                  {/* ambient halos */}
                  {focusEmirate && (() => {
                    const [hx, hy] = emCenter(focusEmirate);
                    const c = TONE_HEX[TONE_BY_EMIRATE[focusEmirate]];
                    return (
                      <motion.circle
                        cx={hx} cy={hy} r={220}
                        fill={c} opacity={0}
                        filter="url(#halo-v3)"
                        animate={{ opacity: 0.18 }}
                        transition={{ duration: 0.8 }}
                      />
                    );
                  })()}
                  {active && (
                    <motion.circle
                      cx={markerPos(active)[0]} cy={markerPos(active)[1]} r={120}
                      fill="url(#focus-halo)" filter="url(#halo-v3)"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    />
                  )}

                  {/* country fill */}
                  {UAE_PATHS.map((d, i) => (
                    <path key={`f-${i}`} d={d}
                      fill="url(#uae-fill-v3)"
                      stroke="url(#uae-stroke-v3)"
                      strokeWidth={mode === "federation" ? 1.2 : 0.9}
                      strokeLinejoin="round"
                      style={{ transition: "stroke-width 0.6s" }} />
                  ))}
                  {/* inner hairline */}
                  {UAE_PATHS.map((d, i) => (
                    <path key={`i-${i}`} d={d} fill="none" stroke="#A78BFA" strokeOpacity="0.12" strokeWidth="0.4" />
                  ))}

                  {/* connection lines — emirate mode draws arcs from emirate centre to each jurisdiction */}
                  {focusEmirate && (() => {
                    const [hx, hy] = emCenter(focusEmirate);
                    const c = TONE_HEX[TONE_BY_EMIRATE[focusEmirate]];
                    return (
                      <g>
                        {grouped[focusEmirate].map((j, idx) => {
                          const [mx, my] = markerPos(j);
                          const midX = (hx + mx) / 2;
                          const midY = (hy + my) / 2 - 18 - (idx % 3) * 6;
                          const path = `M ${hx} ${hy} Q ${midX} ${midY} ${mx} ${my}`;
                          const isA = j.id === activeId;
                          return (
                            <g key={`arc-${j.id}`}>
                              <motion.path
                                d={path}
                                fill="none"
                                stroke={c}
                                strokeOpacity={isA ? 0.85 : 0.4}
                                strokeWidth={isA ? 1.1 : 0.7}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.9, delay: 0.15 + idx * 0.04, ease: "easeOut" }}
                              />
                              <circle r={1.6} fill={c}>
                                <animateMotion dur={`${3.2 + (idx % 4) * 0.4}s`} repeatCount="indefinite" path={path} />
                                <animate attributeName="opacity" values="0;1;0" dur={`${3.2 + (idx % 4) * 0.4}s`} repeatCount="indefinite" />
                              </circle>
                            </g>
                          );
                        })}
                        {/* emirate centre node */}
                        <circle cx={hx} cy={hy} r={4} fill={c} filter="url(#node-glow-v3)" />
                        <circle cx={hx} cy={hy} r={1.6} fill="#fff" />
                      </g>
                    );
                  })()}

                  {/* anchor city dots (only in federation) */}
                  {mode === "federation" && Object.entries(UAE_CITIES).map(([k, [cx, cy]]) => (
                    <circle key={`a-${k}`} cx={cx} cy={cy} r={1.4} fill="#fff" opacity="0.3" />
                  ))}

                  {/* markers */}
                  {J.map((j) => {
                    const [x, y] = markerPos(j);
                    const isActive = j.id === activeId;
                    const isHover = j.id === hoverId;
                    const inFocus = !focusEmirate || j.emirate === focusEmirate;
                    const tone = TONE_BY_EMIRATE[j.emirate];
                    const c = TONE_HEX[tone];
                    const isMajor = j.tier === "major";
                    const baseR = isMajor ? 5.2 : 3.6;
                    const r = isActive ? baseR + 2.4 : (isHover ? baseR + 1.4 : baseR);
                    const dim = inFocus ? (isActive ? 1 : 0.95) : 0.18;
                    const showLabel = inFocus && (isMajor || isActive || isHover || mode === "emirate");
                    const labelOnRight = (j.labelSide ?? "right") === "right";
                    // counter-scale labels so they stay legible while camera zooms
                    const labelScale = 1 / Math.max(camera.scale, 1);
                    const labelW = j.name.length * 6.6 + 16;
                    const labelOffsetX = labelOnRight ? 11 : -11 - labelW * labelScale;

                    return (
                      <motion.g
                        key={j.id}
                        onMouseEnter={() => setHoverId(j.id)}
                        onMouseLeave={() => setHoverId(prev => prev === j.id ? null : prev)}
                        onClick={() => openJurisdiction(j)}
                        className="cursor-pointer"
                        animate={{ opacity: dim }}
                        transition={{ duration: 0.5 }}
                      >
                        {(isMajor || isActive || (isHover && inFocus)) && (
                          <>
                            <circle cx={x} cy={y} r={r + 5} fill="none" stroke={c} strokeOpacity="0.45" strokeWidth="0.6">
                              <animate attributeName="r" values={`${r + 4};${r + 18};${r + 4}`} dur="3s" repeatCount="indefinite" />
                              <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
                            </circle>
                            <circle cx={x} cy={y} r={r + 10} fill={c} opacity="0.08" filter="url(#node-glow-v3)">
                              <animate attributeName="opacity" values="0.12;0.02;0.12" dur="3.4s" repeatCount="indefinite" />
                            </circle>
                          </>
                        )}
                        <motion.circle
                          cx={x} cy={y}
                          fill={c}
                          fillOpacity={isActive ? 0.97 : 0.82}
                          filter="url(#node-glow-v3)"
                          animate={{ r }}
                          transition={{ type: "spring", stiffness: 240, damping: 18 }}
                        />
                        <circle cx={x} cy={y} r={isMajor ? 1.8 : 1.3} fill="#fff" />

                        {showLabel && (
                          <g transform={`translate(${x + labelOffsetX} ${y - 11 * labelScale}) scale(${labelScale})`}>
                            <rect x={0} y={0} rx="5" ry="5"
                                  width={labelW} height="20"
                                  fill="oklch(0.08 0.025 280 / 0.9)"
                                  stroke={c} strokeOpacity={isActive ? 0.7 : 0.32} strokeWidth="0.8" />
                            <text x={labelW / 2} y={14} textAnchor="middle"
                                  fill={isActive ? "#fff" : "rgba(255,255,255,0.88)"}
                                  fontSize="11" fontWeight="600"
                                  letterSpacing="0.02em"
                                  fontFamily="Inter, sans-serif">
                              {j.name}
                            </text>
                          </g>
                        )}

                        {/* hover quick-tooltip */}
                        {isHover && !isActive && inFocus && (
                          <g transform={`translate(${x + 14} ${y + 10}) scale(${labelScale})`}>
                            <rect x={0} y={0} rx="6" ry="6" width="150" height="36"
                                  fill="oklch(0.07 0.025 280 / 0.95)"
                                  stroke={c} strokeOpacity="0.5" strokeWidth="0.8" />
                            <text x={10} y={15} fill="#fff" fontSize="10.5" fontWeight="600" fontFamily="Inter, sans-serif">
                              {j.name}
                            </text>
                            <text x={10} y={28} fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="Inter, sans-serif">
                              {j.activities} · {j.setupDays}
                            </text>
                          </g>
                        )}
                      </motion.g>
                    );
                  })}
                </g>
              </motion.g>
            </motion.svg>

            {/* Dedicated detailed-map focus overlays */}
            <AnimatePresence>
              {isDubaiFocus && (
                <DubaiFocusOverlay
                  activeId={activeId}
                  hoverId={hoverId}
                  onHover={setHoverId}
                  onSelect={openJurisdiction}
                />
              )}
              {isAbuDhabiFocus && (
                <AbuDhabiFocusOverlay
                  activeId={activeId}
                  hoverId={hoverId}
                  onHover={setHoverId}
                  onSelect={openJurisdiction}
                />
              )}
            </AnimatePresence>

            {/* Emirate preview image now lives only in the right-side panel — map area stays clean */}





            {/* Mini-map */}
            <div className="absolute bottom-4 right-4 z-10 w-[140px] h-[110px] rounded-xl border border-white/10 bg-[oklch(0.08_0.025_280/0.9)] backdrop-blur-md overflow-hidden">
              <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full h-full">
                <g transform={MAP_TRANSFORM}>
                  {UAE_PATHS.map((d, i) => (
                    <path key={`mm-${i}`} d={d} fill="oklch(0.20 0.04 280 / 0.7)" stroke="#A78BFA" strokeOpacity="0.4" strokeWidth="2" />
                  ))}
                </g>
                {/* viewport rect */}
                {mode !== "federation" && focusEmirate && (() => {
                  const { scale, tx, ty } = camera;
                  // visible source rect in svg-coords
                  const w = VW / scale;
                  const h = VH / scale;
                  const x = -tx / scale;
                  const y = -ty / scale;
                  return (
                    <motion.rect
                      animate={{ x, y, width: w, height: h }}
                      transition={{ type: "spring", stiffness: 80, damping: 22 }}
                      fill="none"
                      stroke={TONE_HEX[TONE_BY_EMIRATE[focusEmirate]]}
                      strokeWidth="6"
                      strokeOpacity="0.85"
                    />
                  );
                })()}
              </svg>
              <div className="absolute top-1 left-2 text-[9px] tracking-[0.18em] uppercase text-muted-foreground">Mini-Map</div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-5 px-5 py-2.5 rounded-full border border-white/10 bg-[oklch(0.10_0.025_280/0.85)] backdrop-blur-xl text-[11px]">
              {([
                ["Dubai", "violet"],
                ["Abu Dhabi", "gold"],
                ["Sharjah", "blue"],
                ["Northern", "cyan"],
              ] as const).map(([label, tone]) => (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: TONE_HEX[tone], boxShadow: `0 0 8px ${TONE_HEX[tone]}` }}
                  />
                  <span className="text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — info panel */}
          <aside className="relative rounded-3xl border border-white/10 bg-[oklch(0.12_0.025_280/0.78)] backdrop-blur-xl overflow-hidden max-h-[760px] flex flex-col">
            <AnimatePresence mode="wait">
              {!active && !focusEmirate && (
                <motion.div
                  key="federation"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="p-6 flex flex-col h-full"
                >
                  <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">Federation Overview</div>
                  <h3 className="text-2xl font-display font-semibold leading-tight">United Arab Emirates</h3>
                  <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed">
                    Seven emirates. 27+ jurisdictions. Click any emirate on the map — or in the list — to zoom in and explore its ecosystem.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {EMIRATE_ORDER.map(em => {
                      const c = TONE_HEX[TONE_BY_EMIRATE[em]];
                      return (
                        <button
                          key={em}
                          onClick={() => openEmirateView(em)}
                          className="text-left rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] px-3 py-2.5 transition-all group"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />
                            <span className="text-[12px] font-medium">{em}</span>
                          </div>
                          <div className="text-[10px] text-muted-foreground">{grouped[em].length} jurisdictions</div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-auto pt-6 text-[11px] text-muted-foreground">
                    Tip — hover any node on the map for a quick preview.
                  </div>
                </motion.div>
              )}

              {focusEmirate && !active && (
                <motion.div
                  key={`em-${focusEmirate}`}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="p-5 flex flex-col h-full"
                >
                  <EmiratePreviewCard em={focusEmirate} count={grouped[focusEmirate].length} />
                  <div className="overflow-y-auto custom-scroll pr-1 mt-4 space-y-2">
                    <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2">
                      Jurisdictions in {focusEmirate}
                    </div>
                    {grouped[focusEmirate].map((j, idx) => {
                      const c = TONE_HEX[TONE_BY_EMIRATE[j.emirate]];
                      return (
                        <motion.button
                          key={j.id}
                          onClick={() => openJurisdiction(j)}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * idx }}
                          className="w-full text-left rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] px-3 py-3 transition-all flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />
                            <div className="min-w-0">
                              <div className="text-[13px] font-medium truncate">{j.name}</div>
                              <div className="text-[10.5px] text-muted-foreground truncate">{j.activities} · {j.setupDays}</div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {active && (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="p-5 flex flex-col h-full"
                >
                  <button
                    onClick={() => { setActiveId(null); setMode("emirate"); }}
                    className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/[0.08]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  {(() => {
                    const b = brandFor(active.id, activeHex);
                    const a1 = b.accent;
                    const a2 = b.accent2;
                    return (
                      <div
                        className="relative h-36 rounded-2xl overflow-hidden border border-white/10 shrink-0"
                        style={{
                          background:
                            `radial-gradient(120% 80% at 80% 0%, ${a1}26, transparent 55%),` +
                            `radial-gradient(120% 80% at 0% 100%, ${a2}1f, transparent 55%),` +
                            `linear-gradient(180deg, oklch(0.16 0.03 280), oklch(0.09 0.02 280))`,
                        }}
                      >
                        <div className="absolute inset-0 grid-pattern opacity-25" />
                        {/* shimmer sweep */}
                        <motion.div
                          key={`shim-${active.id}`}
                          initial={{ x: "-120%" }}
                          animate={{ x: "220%" }}
                          transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3.5 }}
                          className="absolute inset-y-0 w-1/3 pointer-events-none"
                          style={{
                            background: `linear-gradient(115deg, transparent 0%, ${a1}22 45%, #ffffff22 50%, ${a1}22 55%, transparent 100%)`,
                            mixBlendMode: "screen",
                            filter: "blur(2px)",
                          }}
                        />

                        {/* Logo / monogram chip */}
                        <div className="absolute top-3 left-3">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={`logo-${active.id}`}
                              initial={{ opacity: 0, scale: 0.92, y: 4 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.96 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                              className="relative h-[68px] min-w-[68px] px-3 rounded-xl flex items-center justify-center border backdrop-blur-md overflow-hidden"
                              style={{
                                background: `linear-gradient(140deg, ${a1}1f, ${a2}14 60%, rgba(255,255,255,0.04))`,
                                borderColor: `${a1}55`,
                                boxShadow: `0 8px 30px -10px ${a1}66, inset 0 1px 0 rgba(255,255,255,0.08)`,
                              }}
                            >
                              <div
                                className="absolute -inset-6 opacity-60"
                                style={{ background: `radial-gradient(circle at 30% 20%, ${a1}55, transparent 60%)` }}
                              />
                              <span
                                className="relative font-display font-semibold tracking-[0.14em] text-[18px] leading-none"
                                style={{
                                  color: "#fff",
                                  textShadow: `0 0 14px ${a1}aa, 0 1px 0 rgba(0,0,0,0.4)`,
                                  backgroundImage: `linear-gradient(135deg, #ffffff, ${a1})`,
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                }}
                              >
                                {b.mono}
                              </span>
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        <Building2 className="absolute top-4 right-4 w-6 h-6 opacity-40" style={{ color: a1 }} />

                        <div className="absolute bottom-3 left-4 right-4">
                          <h3 className="text-xl font-display font-semibold leading-tight">{active.name}</h3>
                          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-muted-foreground">
                            <MapPin className="w-3 h-3" style={{ color: a1 }} />
                            {active.emirate}, UAE
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="overflow-y-auto custom-scroll pr-1 mt-4 space-y-5">
                    {active.popular && (
                      <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase font-semibold px-2.5 py-1 rounded-full"
                           style={{ background: `${activeHex}1f`, color: activeHex, border: `1px solid ${activeHex}55` }}>
                        <Star className="w-3 h-3 fill-current" /> Most Popular
                      </div>
                    )}

                    <p className="text-[13px] text-muted-foreground leading-relaxed">{active.tagline}</p>

                    <div>
                      <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2.5">Best For</div>
                      <div className="flex flex-wrap gap-1.5">
                        {active.bestFor.map(t => (
                          <span key={t}
                                className="text-[11px] px-2.5 py-1 rounded-lg border bg-white/[0.03] text-foreground/85"
                                style={{ borderColor: `${activeHex}40` }}>
                            <span className="inline-block w-1 h-1 rounded-full mr-1.5 align-middle" style={{ background: activeHex }} />
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2.5">Key Benefits</div>
                      <ul className="space-y-1.5">
                        {active.benefits.map(b => (
                          <li key={b} className="flex items-center gap-2 text-[13px] text-foreground/90">
                            <CheckIcon color={activeHex} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between text-[12px] py-3 border-t border-b border-white/[0.06]">
                      <span className="text-muted-foreground tracking-[0.12em] uppercase text-[10px]">Business Activities</span>
                      <span className="font-semibold" style={{ color: activeHex }}>{active.activities}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-1">Cost</div>
                        <div className="text-base font-display font-semibold">{active.cost}</div>
                      </div>
                      <div>
                        <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-1">Setup</div>
                        <div className="text-base font-display font-semibold">{active.setupDays}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 shrink-0">
                    <a
                      href={`https://wa.me/971502429035?text=${encodeURIComponent(`Hi Soft Bridge, I'd like to explore ${active.name} for my UAE business setup.`)}`}
                      target="_blank" rel="noreferrer"
                      className="group w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-white transition-all hover:brightness-110 shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${activeHex}, oklch(0.55 0.18 290))`,
                        boxShadow: `0 12px 30px -10px ${activeHex}80`,
                      }}
                    >
                      Explore {active.name}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                    <button
                      onClick={stepBack}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium border border-white/10 bg-white/[0.02] text-foreground/90 hover:bg-white/[0.05] transition-all"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to {active.emirate}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </aside>
        </div>

        {/* Bottom feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          <FeatureCard tone="violet" Icon={MapIcon} title="Cinematic Zoom"
            text="Click any emirate — the camera smoothly flies in, revealing the full jurisdiction network." />
          <FeatureCard tone="blue" Icon={Activity} title="Live Connections"
            text="Animated paths light up the ecosystem connecting each jurisdiction to its emirate hub." />
          <FeatureCard tone="cyan" Icon={Scale} title="Smart Comparison"
            text="Compare cost, setup time and business focus across 27+ jurisdictions side-by-side." />
          <FeatureCard tone="gold" Icon={Sparkles} title="AI Guidance"
            text="Get matched to the right jurisdiction based on your business, banking and visa needs." />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Sub-components ───────────────────── */

function EmiratePreviewCard({ em, count }: { em: EmirateKey; count: number }) {
  const c = TONE_HEX[TONE_BY_EMIRATE[em]];
  const meta = EMIRATE_META[em];
  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      style={{
        background: "linear-gradient(180deg, oklch(0.10 0.025 280 / 0.85), oklch(0.08 0.025 280 / 0.92))",
        backdropFilter: "blur(22px) saturate(160%)",
        boxShadow: `0 30px 80px -30px ${c}55, 0 0 0 1px ${c}22 inset`,
      }}
    >
      {/* image with parallax + glow */}
      <div className="relative h-36 overflow-hidden">
        <motion.img
          src={meta.image}
          alt={`${em} cinematic skyline`}
          loading="lazy"
          width={1280}
          height={768}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.02, opacity: 0.9 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 0%, oklch(0.08 0.025 280 / 0.55) 60%, oklch(0.08 0.025 280) 100%)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(60% 80% at 80% 20%, ${c}38, transparent 70%)` }} />
        {/* scan line */}
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${c}aa, transparent)` }} />
        {/* corner tag */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-full text-[9px] tracking-[0.2em] uppercase font-medium"
             style={{ background: "oklch(0.08 0.025 280 / 0.7)", color: c, border: `1px solid ${c}55` }}>
          <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
          Emirate Focus
        </div>
        <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
          <h3 className="text-lg font-display font-semibold leading-tight drop-shadow-lg">{em}</h3>
          <div className="text-right">
            <div className="text-xl font-display font-semibold leading-none" style={{ color: c }}>{count}</div>
            <div className="text-[8.5px] tracking-[0.18em] uppercase text-white/60">Zones</div>
          </div>
        </div>
      </div>
      {/* body */}
      <div className="p-3.5 space-y-3">
        <p className="text-[11.5px] leading-relaxed text-muted-foreground">{meta.description}</p>
        <div className="flex flex-wrap gap-1">
          {meta.strengths.map(s => (
            <span key={s} className="text-[9.5px] px-2 py-0.5 rounded-md border bg-white/[0.03] text-foreground/85"
                  style={{ borderColor: `${c}40` }}>
              {s}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 pt-1">
          {meta.stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
              className="rounded-lg border border-white/10 bg-white/[0.025] p-1.5 text-center"
            >
              <div className="text-[12px] font-display font-semibold" style={{ color: c }}>{s.value}</div>
              <div className="text-[8.5px] tracking-[0.14em] uppercase text-muted-foreground mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmirateHero({ em, count }: { em: EmirateKey; count: number }) {

  const c = TONE_HEX[TONE_BY_EMIRATE[em]];
  return (
    <div
      className="relative h-28 rounded-2xl overflow-hidden border border-white/10 shrink-0"
      style={{
        background:
          `linear-gradient(135deg, ${c}26, transparent 60%),` +
          `linear-gradient(180deg, oklch(0.18 0.04 280), oklch(0.10 0.02 280))`,
      }}
    >
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute -inset-10 opacity-50"
           style={{ background: `radial-gradient(circle at 70% 30%, ${c}55, transparent 60%)` }} />
      <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
        <div>
          <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">Emirate Focus</div>
          <h3 className="text-xl font-display font-semibold leading-tight mt-0.5">{em}</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-display font-semibold" style={{ color: c }}>{count}</div>
          <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">Jurisdictions</div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label, tone }: { value: string; label: string; tone: Tone }) {
  const c = TONE_HEX[tone];
  return (
    <div
      className="group relative rounded-2xl border border-white/10 bg-[oklch(0.13_0.025_280/0.65)] backdrop-blur-xl p-5 overflow-hidden hover-lift"
      style={{ transition: "all .4s cubic-bezier(.22,1,.36,1)" }}
    >
      <div
        className="absolute -top-1/2 -right-1/3 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
        style={{ background: `radial-gradient(circle, ${c}55, transparent 70%)` }}
      />
      <div className="relative">
        <div className="text-3xl md:text-4xl font-display font-semibold" style={{ color: "#fff" }}>
          {value}
        </div>
        <div className="mt-1 text-[12px] tracking-[0.14em] uppercase text-muted-foreground">{label}</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${c}80, transparent)` }} />
    </div>
  );
}

function FeatureCard({
  tone, Icon, title, text,
}: { tone: Tone; Icon: typeof MapIcon; title: string; text: string }) {
  const c = TONE_HEX[tone];
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-[oklch(0.13_0.025_280/0.55)] backdrop-blur-xl p-5 overflow-hidden hover-lift">
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-500 blur-2xl"
        style={{ background: `radial-gradient(circle, ${c}55, transparent 70%)` }}
      />
      <div className="relative flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 shrink-0"
          style={{ background: `radial-gradient(circle, ${c}33, transparent 70%)` }}
        >
          <Icon className="w-5 h-5" style={{ color: c }} />
        </div>
        <div>
          <div className="font-display font-semibold text-base">{title}</div>
          <div className="text-[13px] text-muted-foreground mt-1 leading-relaxed">{text}</div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <span
      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
      style={{ background: `${color}22`, border: `1px solid ${color}55` }}
    >
      <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none">
        <path d="M2 6.5L4.7 9L10 3.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Particles() {
  const dots = Array.from({ length: 26 }, (_, i) => {
    const x = (i * 73) % 100;
    const y = (i * 131) % 100;
    const d = 6 + ((i * 17) % 8);
    const delay = (i * 0.4) % 6;
    return { x, y, d, delay };
  });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: 2,
            height: 2,
            background: i % 3 === 0 ? "#A78BFA" : i % 3 === 1 ? "#67E8F9" : "#E6B663",
            boxShadow: "0 0 8px currentColor",
            color: i % 3 === 0 ? "#A78BFA" : i % 3 === 1 ? "#67E8F9" : "#E6B663",
            opacity: 0.6,
            animation: `float-soft ${p.d}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ───────────────────── Dubai Focus Overlay ───────────────────── */

// Hand-tuned coordinates on the Dubai detail map (1536×1024). Percentages of
// the overlay area so they remain responsive at any container size.
const DUBAI_NODES: { id: string; name: string; x: number; y: number; side: "left" | "right"; tier: "major" | "secondary" }[] = [
  { id: "jafza",         name: "JAFZA",                 x: 18,  y: 78, side: "left",  tier: "secondary" },
  { id: "dubai-south",   name: "Dubai South",           x: 42,  y: 82, side: "right", tier: "secondary" },
  { id: "dmc",           name: "Dubai Media City",      x: 28,  y: 58, side: "left",  tier: "secondary" },
  { id: "dic",           name: "Dubai Internet City",   x: 38,  y: 51, side: "left",  tier: "secondary" },
  { id: "dmcc",          name: "DMCC",                  x: 41,  y: 41, side: "left",  tier: "major" },
  { id: "ifza",          name: "IFZA",                  x: 56,  y: 47, side: "right", tier: "major" },
  { id: "meydan",        name: "Meydan Free Zone",      x: 66,  y: 56, side: "right", tier: "secondary" },
  { id: "dso",           name: "Dubai Silicon Oasis",   x: 73,  y: 70, side: "right", tier: "secondary" },
  { id: "dubai-mainland",name: "Dubai Mainland",        x: 70,  y: 28, side: "right", tier: "major" },
  { id: "dafza",         name: "DAFZA",                 x: 82,  y: 36, side: "right", tier: "secondary" },
];

const DUBAI_HEX = "#A78BFA";

function DubaiFocusOverlay({
  activeId,
  hoverId,
  onHover,
  onSelect,
}: {
  activeId: string | null;
  hoverId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (j: Jurisdiction) => void;
}) {
  // Centre roughly on DMCC/JLT — feels like the heart of Dubai
  const hub = { x: 50, y: 50 };

  return (
    <motion.div
      key="dubai-overlay"
      className="absolute inset-0 z-[5] pointer-events-none"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background detailed map */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={dubaiDetailMap}
          alt="Detailed Dubai map"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          draggable={false}
        />
        {/* Tonal wash to keep it premium */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, oklch(0.10 0.04 285 / 0.55) 0%, oklch(0.08 0.04 285 / 0.20) 35%, oklch(0.06 0.03 285 / 0.55) 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(60% 70% at 55% 50%, transparent 0%, oklch(0.05 0.03 285 / 0.55) 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: `radial-gradient(40% 50% at 50% 50%, ${DUBAI_HEX}26, transparent 70%)`
        }} />
        {/* subtle grid */}
        <div className="absolute inset-0 grid-pattern opacity-[0.07]" />
        {/* scan line */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-violet-300/70 to-transparent animate-scan" />
        </div>
      </div>

      {/* SVG layer for arcs + nodes */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <filter id="dxb-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="0.6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Animated connection arcs from each node to the hub */}
        {DUBAI_NODES.map((n, idx) => {
          const midX = (n.x + hub.x) / 2;
          const midY = (n.y + hub.y) / 2 - 6 - (idx % 3) * 1.5;
          const path = `M ${n.x} ${n.y} Q ${midX} ${midY} ${hub.x} ${hub.y}`;
          const isA = n.id === activeId;
          return (
            <g key={`dxb-arc-${n.id}`}>
              <motion.path
                d={path}
                fill="none"
                stroke={DUBAI_HEX}
                strokeOpacity={isA ? 0.9 : 0.32}
                strokeWidth={isA ? 0.25 : 0.15}
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.2 + idx * 0.05, ease: "easeOut" }}
              />
              <circle r={0.35} fill="#fff">
                <animateMotion dur={`${3.2 + (idx % 4) * 0.4}s`} repeatCount="indefinite" path={path} />
                <animate attributeName="opacity" values="0;1;0" dur={`${3.2 + (idx % 4) * 0.4}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}

        {/* Central hub */}
        <circle cx={hub.x} cy={hub.y} r={0.9} fill={DUBAI_HEX} filter="url(#dxb-glow)">
          <animate attributeName="r" values="0.8;1.4;0.8" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx={hub.x} cy={hub.y} r={0.35} fill="#fff" />
      </svg>

      {/* Node markers as DOM elements so labels are pixel-perfect */}
      <div className="absolute inset-0 pointer-events-none">
        {DUBAI_NODES.map((n, idx) => {
          const isA = n.id === activeId;
          const isH = n.id === hoverId;
          const sz = n.tier === "major" ? 14 : 11;
          const fullJ = J.find(j => j.id === n.id);
          const side = resolveSide(n);
          return (
            <motion.button
              key={n.id}
              onMouseEnter={() => onHover(n.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => fullJ && onSelect(fullJ)}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + idx * 0.05, type: "spring", stiffness: 220, damping: 18 }}
              className="absolute pointer-events-auto cursor-pointer group"
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* pulsing halo */}
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: sz + 22,
                  height: sz + 22,
                  background: `radial-gradient(circle, ${DUBAI_HEX}44, transparent 70%)`,
                  filter: "blur(6px)",
                }}
              />
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                style={{
                  width: sz + 10,
                  height: sz + 10,
                  borderColor: `${DUBAI_HEX}88`,
                  animation: `pulse-ring 2.6s ease-out ${(idx % 5) * 0.2}s infinite`,
                }}
              />
              {/* core dot */}
              <span
                className="relative block rounded-full"
                style={{
                  width: sz,
                  height: sz,
                  background: `radial-gradient(circle at 30% 30%, #fff, ${DUBAI_HEX} 70%)`,
                  boxShadow: `0 0 ${isA ? 24 : 14}px ${DUBAI_HEX}, 0 0 4px #fff`,
                  outline: isA ? `2px solid ${DUBAI_HEX}` : "none",
                  outlineOffset: 3,
                  transition: "box-shadow .3s",
                }}
              />
              {/* label */}
              <span
                className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide transition-all ${
                  isA || isH ? "opacity-100" : "opacity-95"
                }`}
                style={{
                  [side === "right" ? "left" : "right"]: sz / 2 + 10,
                  background: "oklch(0.08 0.03 285 / 0.88)",
                  color: "#fff",
                  border: `1px solid ${DUBAI_HEX}55`,
                  boxShadow: `0 4px 18px -6px ${DUBAI_HEX}66`,
                  backdropFilter: "blur(8px)",
                }}
              >
                {n.name}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Subtle vignette/border to feel like a "Dubai layer" */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 rounded-3xl" />
    </motion.div>
  );
}

/* ───────────────────── Abu Dhabi Focus Overlay ───────────────────── */

// Hand-tuned coordinates on the Abu Dhabi detail map. Percentages of the
// overlay area so they stay responsive at any container size.
const AD_NODES: { id: string; name: string; subtitle?: string; x: number; y: number; side: "left" | "right"; tier: "major" | "secondary" }[] = [
  { id: "adgm",         name: "ADGM",                 subtitle: "International Financial Centre", x: 65,  y: 17, side: "left",  tier: "major" },
  { id: "kizad",        name: "KIZAD",                subtitle: "Khalifa Industrial Zone",        x: 86,  y: 35, side: "left",  tier: "major" },
  { id: "twofour54",    name: "twofour54",            subtitle: "Media & Creative Hub",           x: 33,  y: 41, side: "right", tier: "secondary" },
  { id: "ad-mainland",  name: "Abu Dhabi Mainland",   subtitle: "Commercial License",             x: 54,  y: 51, side: "right", tier: "major" },
  { id: "masdar",       name: "Masdar City",          subtitle: "Sustainable Tech Hub",           x: 17,  y: 72, side: "right", tier: "secondary" },
];

const AD_HEX = "#E6B663";

// Top-right safe zone (matches floating preview panel: top-16 right-4 w-[300px]).
// Coordinates in percent of the overlay box.
const PANEL_SAFE = { xMin: 70, xMax: 100, yMin: 0, yMax: 26 };

function inSafeZone(x: number, y: number) {
  return x >= PANEL_SAFE.xMin && x <= PANEL_SAFE.xMax && y >= PANEL_SAFE.yMin && y <= PANEL_SAFE.yMax;
}

function resolveSide(n: { x: number; y: number; side: "left" | "right" }): "left" | "right" {
  // Map area is now clean (no floating overlay panel) — keep designed sides.
  return n.side;
}

function AbuDhabiFocusOverlay({
  activeId,
  hoverId,
  onHover,
  onSelect,
}: {
  activeId: string | null;
  hoverId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (j: Jurisdiction) => void;
}) {
  const hub = { x: 50, y: 50 };

  return (
    <motion.div
      key="ad-overlay"
      className="absolute inset-0 z-[5] pointer-events-none"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background detailed map */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={abuDhabiDetailMap}
          alt="Detailed Abu Dhabi map"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          draggable={false}
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, oklch(0.10 0.04 80 / 0.45) 0%, oklch(0.08 0.03 80 / 0.15) 35%, oklch(0.06 0.03 80 / 0.55) 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(60% 70% at 55% 50%, transparent 0%, oklch(0.05 0.03 80 / 0.55) 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: `radial-gradient(40% 50% at 50% 50%, ${AD_HEX}22, transparent 70%)`
        }} />
        <div className="absolute inset-0 grid-pattern opacity-[0.06]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
          <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-200/70 to-transparent animate-scan" />
        </div>
      </div>

      {/* Arcs */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <filter id="ad-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="0.6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {AD_NODES.map((n, idx) => {
          const midX = (n.x + hub.x) / 2;
          const midY = (n.y + hub.y) / 2 - 6 - (idx % 3) * 1.5;
          const path = `M ${n.x} ${n.y} Q ${midX} ${midY} ${hub.x} ${hub.y}`;
          const isA = n.id === activeId;
          return (
            <g key={`ad-arc-${n.id}`}>
              <motion.path
                d={path}
                fill="none"
                stroke={AD_HEX}
                strokeOpacity={isA ? 0.9 : 0.3}
                strokeWidth={isA ? 0.25 : 0.15}
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.2 + idx * 0.05, ease: "easeOut" }}
              />
              <circle r={0.35} fill="#fff">
                <animateMotion dur={`${3.2 + (idx % 4) * 0.4}s`} repeatCount="indefinite" path={path} />
                <animate attributeName="opacity" values="0;1;0" dur={`${3.2 + (idx % 4) * 0.4}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}

        <circle cx={hub.x} cy={hub.y} r={0.9} fill={AD_HEX} filter="url(#ad-glow)">
          <animate attributeName="r" values="0.8;1.4;0.8" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx={hub.x} cy={hub.y} r={0.35} fill="#fff" />
      </svg>

      {/* Nodes + collision-aware labels */}
      <div className="absolute inset-0 pointer-events-none">
        {AD_NODES.map((n, idx) => {
          const isA = n.id === activeId;
          const isH = n.id === hoverId;
          const sz = n.tier === "major" ? 14 : 11;
          const fullJ = J.find(j => j.id === n.id);
          const side = resolveSide(n);
          return (
            <motion.button
              key={n.id}
              onMouseEnter={() => onHover(n.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => fullJ && onSelect(fullJ)}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + idx * 0.05, type: "spring", stiffness: 220, damping: 18 }}
              className="absolute pointer-events-auto cursor-pointer group"
              style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: sz + 22, height: sz + 22, background: `radial-gradient(circle, ${AD_HEX}44, transparent 70%)`, filter: "blur(6px)" }}
              />
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                style={{ width: sz + 10, height: sz + 10, borderColor: `${AD_HEX}88`, animation: `pulse-ring 2.6s ease-out ${(idx % 5) * 0.2}s infinite` }}
              />
              <span
                className="relative block rounded-full"
                style={{
                  width: sz, height: sz,
                  background: `radial-gradient(circle at 30% 30%, #fff, ${AD_HEX} 70%)`,
                  boxShadow: `0 0 ${isA ? 24 : 14}px ${AD_HEX}, 0 0 4px #fff`,
                  outline: isA ? `2px solid ${AD_HEX}` : "none",
                  outlineOffset: 3,
                  transition: "box-shadow .3s",
                }}
              />
              <motion.span
                layout
                className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1.5 rounded-md text-[11px] font-medium tracking-wide transition-all ${isA || isH ? "opacity-100 scale-[1.02]" : "opacity-95"}`}
                style={{
                  [side === "right" ? "left" : "right"]: sz / 2 + 10,
                  background: "oklch(0.08 0.03 85 / 0.9)",
                  color: "#fff",
                  border: `1px solid ${AD_HEX}55`,
                  boxShadow: `0 4px 18px -6px ${AD_HEX}66`,
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="block font-semibold leading-tight">{n.name}</span>
                {n.subtitle && (
                  <span className="block text-[9.5px] text-white/65 mt-0.5">{n.subtitle}</span>
                )}
              </motion.span>
            </motion.button>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 rounded-3xl" />
    </motion.div>
  );
}
