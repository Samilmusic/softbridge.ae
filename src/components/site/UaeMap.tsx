import { useMemo, useState } from "react";
import { UAE_PATHS, UAE_CITIES } from "@/lib/uae-geo";
import {
  ArrowRight, Building2, Sparkles, MapPin, ChevronDown, X,
  Activity, Scale, Map as MapIcon, Star,
} from "lucide-react";

/* ───────────────────── Types & Data ───────────────────── */

type EmirateKey =
  | "Dubai" | "Abu Dhabi" | "Sharjah" | "Ajman"
  | "Ras Al Khaimah" | "Fujairah" | "Umm Al Quwain";

type Tone = "violet" | "gold" | "blue" | "cyan";

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

const J: Jurisdiction[] = [
  // DUBAI (violet)
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
  // ABU DHABI (gold)
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
  // SHARJAH (blue)
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
  // AJMAN (cyan)
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
  // RAS AL KHAIMAH (cyan)
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
  // FUJAIRAH (cyan)
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
  // UAQ (cyan)
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

function anchorPos(j: Jurisdiction): [number, number] {
  return UAE_CITIES[j.anchor] as unknown as [number, number];
}
function markerPos(j: Jurisdiction): [number, number] {
  const [cx, cy] = anchorPos(j);
  const [ox, oy] = j.offset ?? [0, 0];
  return [cx + ox, cy + oy];
}

/* ───────────────────── Component ───────────────────── */

export function UaeMap() {
  const [activeId, setActiveId] = useState<string>("dubai-mainland");
  const [openEmirate, setOpenEmirate] = useState<EmirateKey | null>("Dubai");
  const [panelOpen, setPanelOpen] = useState(true);

  const active = J.find(j => j.id === activeId) ?? J[0];
  const activeTone = TONE_BY_EMIRATE[active.emirate];
  const activeHex = TONE_HEX[activeTone];
  const [ax, ay] = markerPos(active);
  const [aax, aay] = anchorPos(active);

  // group by emirate
  const grouped = useMemo(() => {
    const out: Record<EmirateKey, Jurisdiction[]> = {
      "Dubai": [], "Abu Dhabi": [], "Sharjah": [], "Ajman": [],
      "Ras Al Khaimah": [], "Fujairah": [], "Umm Al Quwain": [],
    };
    J.forEach(j => out[j.emirate].push(j));
    return out;
  }, []);

  return (
    <section id="jurisdictions" className="relative py-24 md:py-32 overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.22_0.06_280/0.45),transparent_55%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.30_0.10_280/0.25),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-[0.10]" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.28em] text-violet-300/90 uppercase mb-4">
              <MapIcon className="w-3.5 h-3.5" />
              UAE Jurisdiction Explorer
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight leading-[1.05]">
              Explore All UAE Business <span className="gold-text-gradient">Jurisdictions</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
              Discover and compare 27+ jurisdictions across all 7 emirates. Explore setup advantages, free zones, operational flexibility and strategic opportunities.
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
                const hasActive = list.some(j => j.id === activeId);
                return (
                  <div key={em}>
                    <button
                      onClick={() => setOpenEmirate(open ? null : em)}
                      className={`w-full flex items-center justify-between gap-2 px-3 py-3 rounded-2xl border transition-all ${
                        open || hasActive
                          ? "bg-white/[0.04] border-white/15"
                          : "bg-white/[0.015] border-white/[0.06] hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-7 h-7 rounded-xl flex items-center justify-center border border-white/10"
                          style={{
                            background: `radial-gradient(circle, ${c}33, transparent 70%)`,
                            boxShadow: open ? `0 0 18px ${c}55` : "none",
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />
                        </span>
                        <span className="text-sm font-medium">{em}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground">{list.length} Jurisdictions</span>
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
                              onClick={() => setActiveId(j.id)}
                              className={`w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-all ${
                                isA
                                  ? "bg-white/[0.05] text-foreground"
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

          {/* CENTER — map */}
          <div className="relative rounded-3xl border border-white/10 bg-[oklch(0.11_0.025_280/0.7)] backdrop-blur-xl overflow-hidden min-h-[620px]">
            {/* atmosphere */}
            <div className="absolute inset-0 grid-pattern opacity-[0.14]" />
            <div className="absolute -top-1/3 -left-1/4 w-[60%] aspect-square rounded-full bg-[radial-gradient(circle,oklch(0.55_0.22_290/0.18),transparent_70%)] blur-3xl animate-float-slow" />
            <div className="absolute -bottom-1/3 -right-1/4 w-[55%] aspect-square rounded-full bg-[radial-gradient(circle,oklch(0.70_0.14_220/0.12),transparent_70%)] blur-3xl animate-float-slow" style={{ animationDelay: "3s" }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* scanning beam */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
              <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-violet-400/60 to-transparent animate-scan" />
            </div>

            {/* floating particles */}
            <Particles />

            {/* corner badges */}
            <div className="absolute top-5 left-5 flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-muted-foreground z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Federation Map · Realtime
            </div>
            <div className="absolute top-5 right-5 flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-muted-foreground z-10">
              v2.4 · {J.length} Nodes
            </div>

            <svg viewBox="0 0 1000 760" className="w-full h-full block relative">
              <defs>
                <linearGradient id="uae-fill-v2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.30 0.06 280)" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="oklch(0.14 0.03 280)" stopOpacity="0.55" />
                </linearGradient>
                <linearGradient id="uae-stroke-v2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#67E8F9" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#E6B663" stopOpacity="0.7" />
                </linearGradient>
                <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="2.2" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="halo" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="18" />
                </filter>
                <radialGradient id="active-halo-v2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={activeHex} stopOpacity="0.28" />
                  <stop offset="100%" stopColor={activeHex} stopOpacity="0" />
                </radialGradient>
              </defs>

              <g transform={MAP_TRANSFORM}>
                {/* shadow */}
                {UAE_PATHS.map((d, i) => (
                  <path key={`s-${i}`} d={d} fill="oklch(0.05 0.02 280)" transform="translate(0,10)" opacity="0.55" />
                ))}

                {/* ambient halo */}
                <circle cx={ax} cy={ay} r="180" fill="url(#active-halo-v2)" filter="url(#halo)" className="transition-all duration-700" />

                {/* country */}
                {UAE_PATHS.map((d, i) => (
                  <path key={`f-${i}`} d={d}
                    fill="url(#uae-fill-v2)"
                    stroke="url(#uae-stroke-v2)"
                    strokeWidth="1.2" strokeLinejoin="round" />
                ))}
                {/* inner hairline */}
                {UAE_PATHS.map((d, i) => (
                  <path key={`i-${i}`} d={d} fill="none" stroke="#A78BFA" strokeOpacity="0.12" strokeWidth="0.4" />
                ))}

                {/* connection arc from active anchor to marker */}
                {(ax !== aax || ay !== aay) && (
                  <g>
                    <line x1={aax} y1={aay} x2={ax} y2={ay}
                      stroke={activeHex} strokeOpacity="0.55" strokeWidth="0.9"
                      strokeDasharray="3 4">
                      <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1.6s" repeatCount="indefinite" />
                    </line>
                  </g>
                )}

                {/* anchor city dots */}
                {Object.entries(UAE_CITIES).map(([k, [cx, cy]]) => (
                  <circle key={`a-${k}`} cx={cx} cy={cy} r={1.4} fill="#fff" opacity="0.35" />
                ))}

                {/* markers */}
                {J.map(j => {
                  const [x, y] = markerPos(j);
                  const isActive = j.id === activeId;
                  const tone = TONE_BY_EMIRATE[j.emirate];
                  const c = TONE_HEX[tone];
                  const isMajor = j.tier === "major";
                  const baseR = isMajor ? 5.4 : 3.6;
                  const r = isActive ? baseR + 2.2 : baseR;
                  const dim = isActive ? 1 : 0.85;
                  const labelOnRight = (j.labelSide ?? "right") === "right";
                  const labelW = j.name.length * 6.6 + 16;
                  const labelX = labelOnRight ? x + 11 : x - 11 - labelW;

                  return (
                    <g key={j.id}
                       onMouseEnter={() => setActiveId(j.id)}
                       onClick={() => setActiveId(j.id)}
                       className="cursor-pointer"
                       style={{ opacity: dim }}>
                      {/* outer pulsing ring (always for major, intensified for active) */}
                      {(isMajor || isActive) && (
                        <>
                          <circle cx={x} cy={y} r={r + 5} fill="none" stroke={c} strokeOpacity="0.35" strokeWidth="0.6">
                            <animate attributeName="r" values={`${r + 4};${r + 16};${r + 4}`} dur="3s" repeatCount="indefinite" />
                            <animate attributeName="stroke-opacity" values="0.45;0;0.45" dur="3s" repeatCount="indefinite" />
                          </circle>
                          <circle cx={x} cy={y} r={r + 10} fill={c} opacity="0.06" filter="url(#node-glow)">
                            <animate attributeName="opacity" values="0.10;0.02;0.10" dur="3.4s" repeatCount="indefinite" />
                          </circle>
                        </>
                      )}
                      {/* core */}
                      <circle cx={x} cy={y} r={r} fill={c} fillOpacity={isActive ? 0.95 : 0.78} filter="url(#node-glow)" />
                      <circle cx={x} cy={y} r={isMajor ? 1.8 : 1.3} fill="#fff" />

                      {(isMajor || isActive) && (
                        <g>
                          <rect x={labelX} y={y - 11} rx="5" ry="5"
                                width={labelW} height="20"
                                fill="oklch(0.08 0.025 280 / 0.88)"
                                stroke={c} strokeOpacity={isActive ? 0.65 : 0.28} strokeWidth="0.7" />
                          <text x={labelX + labelW / 2} y={y + 3} textAnchor="middle"
                                fill={isActive ? "#fff" : "rgba(255,255,255,0.85)"}
                                fontSize="10.5" fontWeight="600"
                                letterSpacing="0.02em"
                                fontFamily="Inter, sans-serif">
                            {j.name}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-5 px-5 py-2.5 rounded-full border border-white/10 bg-[oklch(0.10_0.025_280/0.85)] backdrop-blur-xl text-[11px]">
              {([
                ["Dubai", "violet"],
                ["Abu Dhabi", "gold"],
                ["Sharjah", "blue"],
                ["Northern Emirates", "cyan"],
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
          {panelOpen && (
            <aside
              key={active.id}
              className="relative rounded-3xl border border-white/10 bg-[oklch(0.12_0.025_280/0.75)] backdrop-blur-xl p-5 overflow-hidden animate-fade-in max-h-[760px] flex flex-col"
            >
              {/* close */}
              <button
                onClick={() => setPanelOpen(false)}
                className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/[0.08]"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* banner */}
              <div
                className="relative h-28 rounded-2xl overflow-hidden border border-white/10 shrink-0"
                style={{
                  background:
                    `linear-gradient(135deg, ${activeHex}26, transparent 60%),` +
                    `linear-gradient(180deg, oklch(0.18 0.04 280), oklch(0.10 0.02 280))`,
                }}
              >
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div
                  className="absolute -inset-10 opacity-50"
                  style={{ background: `radial-gradient(circle at 70% 30%, ${activeHex}55, transparent 60%)` }}
                />
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-display font-semibold leading-tight">{active.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-muted-foreground">
                      <MapPin className="w-3 h-3" style={{ color: activeHex }} />
                      {active.emirate}, UAE
                    </div>
                  </div>
                  <Building2 className="w-7 h-7 opacity-50" style={{ color: activeHex }} />
                </div>
              </div>

              <div className="overflow-y-auto custom-scroll pr-1 mt-4 space-y-5">
                {active.popular && (
                  <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase font-semibold px-2.5 py-1 rounded-full"
                       style={{ background: `${activeHex}1f`, color: activeHex, border: `1px solid ${activeHex}55` }}>
                    <Star className="w-3 h-3 fill-current" /> Most Popular
                  </div>
                )}

                <p className="text-[13px] text-muted-foreground leading-relaxed">{active.tagline}</p>

                {/* Best for tags */}
                <div>
                  <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2.5">Best For</div>
                  <div className="flex flex-wrap gap-1.5">
                    {active.bestFor.map(t => (
                      <span
                        key={t}
                        className="text-[11px] px-2.5 py-1 rounded-lg border bg-white/[0.03] text-foreground/85"
                        style={{ borderColor: `${activeHex}40` }}
                      >
                        <span className="inline-block w-1 h-1 rounded-full mr-1.5 align-middle" style={{ background: activeHex }} />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key benefits */}
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

                {/* Activities */}
                <div className="flex items-center justify-between text-[12px] py-3 border-t border-b border-white/[0.06]">
                  <span className="text-muted-foreground tracking-[0.12em] uppercase text-[10px]">Business Activities</span>
                  <span className="font-semibold" style={{ color: activeHex }}>{active.activities}</span>
                </div>

                {/* Cost & Setup */}
                <div className="space-y-3">
                  <div>
                    <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-1">Estimated Cost</div>
                    <div className="text-lg font-display font-semibold">{active.cost}</div>
                    <div className="text-[11px] text-muted-foreground">Setup Cost Range</div>
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-1">Setup Time</div>
                    <div className="text-lg font-display font-semibold">{active.setupDays}</div>
                    <div className="text-[11px] text-muted-foreground">Estimated</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
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
                <button className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium border border-white/10 bg-white/[0.02] text-foreground/90 hover:bg-white/[0.05] transition-all">
                  Compare Jurisdictions
                </button>
              </div>
            </aside>
          )}
        </div>

        {/* Bottom feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          <FeatureCard tone="violet" Icon={MapIcon} title="Interactive Map"
            text="Click any jurisdiction to view detailed information and benefits." />
          <FeatureCard tone="blue" Icon={Activity} title="Real-Time Data"
            text="Live updates on regulations, costs, and business opportunities." />
          <FeatureCard tone="cyan" Icon={Scale} title="Smart Comparison"
            text="Compare jurisdictions side-by-side to find your perfect match." />
          <FeatureCard tone="gold" Icon={Sparkles} title="AI Recommendations"
            text="Get AI-powered recommendations based on your business needs." />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Sub-components ───────────────────── */

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
  // deterministic seeded positions
  const dots = Array.from({ length: 22 }, (_, i) => {
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
