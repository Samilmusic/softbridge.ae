import { useMemo, useState } from "react";
import { Search, Sparkles, X, Layers, Building2, Banknote, Clock, Plane, Zap, ChevronRight, GitCompareArrows } from "lucide-react";
import { UAE_PATHS, UAE_CITIES } from "@/lib/uae-geo";
import { cn } from "@/lib/utils";

/**
 * UAE Intelligence Map — luxury light-mode "AI business navigation"
 * experience. Pure SVG + CSS for buttery 60fps interactions, no 3D engine.
 */

type Emirate = "All" | "Dubai" | "Abu Dhabi" | "Sharjah" | "Ajman" | "RAK" | "UAQ" | "Fujairah";

type Zone = {
  id: string;
  name: string;
  emirate: Exclude<Emirate, "All">;
  x: number; // SVG coords
  y: number;
  tagline: string;
  bestFor: string[];
  badges: string[];
  setupDays: number;
  bankingScore: number; // 1-5
  visaFlex: number; // 1-5
  fromAED: number;
  remote: boolean;
  aiScore: number; // 1-100
};

const ZONES: Zone[] = [
  { id: "ifza",     name: "IFZA",                 emirate: "Dubai",     x: 730, y: 250, tagline: "Cost-efficient flagship free zone in Dubai Silicon Oasis.",  bestFor: ["Consulting", "Trading", "Tech"], badges: ["Fast Setup", "Remote Formation", "AI Startup Friendly"], setupDays: 5, bankingScore: 4, visaFlex: 5, fromAED: 12500, remote: true, aiScore: 96 },
  { id: "dmcc",     name: "DMCC",                 emirate: "Dubai",     x: 705, y: 205, tagline: "Global hub for commodities, crypto and Web3.",                bestFor: ["Crypto", "Commodities", "Trading"], badges: ["Best For Web3", "Premium"], setupDays: 10, bankingScore: 5, visaFlex: 5, fromAED: 34500, remote: false, aiScore: 92 },
  { id: "meydan",   name: "Meydan",               emirate: "Dubai",     x: 720, y: 230, tagline: "Premium Dubai address with flexible activities.",            bestFor: ["E-Commerce", "Holding", "Consulting"], badges: ["Best For E-Commerce", "Prestige Address"], setupDays: 7, bankingScore: 4, visaFlex: 4, fromAED: 14500, remote: true, aiScore: 88 },
  { id: "dso",      name: "DSO",                  emirate: "Dubai",     x: 745, y: 268, tagline: "Dubai Silicon Oasis — tech & R&D ecosystem.",                bestFor: ["Tech", "R&D", "Hardware"], badges: ["Tech Cluster"], setupDays: 12, bankingScore: 4, visaFlex: 4, fromAED: 18500, remote: false, aiScore: 84 },
  { id: "dafza",    name: "DAFZA",                emirate: "Dubai",     x: 770, y: 175, tagline: "Airport free zone — logistics & aviation.",                  bestFor: ["Logistics", "Aviation", "Pharma"], badges: ["Logistics Hub"], setupDays: 14, bankingScore: 5, visaFlex: 4, fromAED: 28000, remote: false, aiScore: 80 },
  { id: "jafza",    name: "JAFZA",                emirate: "Dubai",     x: 690, y: 240, tagline: "Jebel Ali — the UAE's largest industrial free zone.",        bestFor: ["Manufacturing", "Trading", "Logistics"], badges: ["Industrial", "Port Access"], setupDays: 21, bankingScore: 5, visaFlex: 5, fromAED: 38000, remote: false, aiScore: 82 },
  { id: "dic",      name: "Dubai Internet City",  emirate: "Dubai",     x: 715, y: 195, tagline: "Tech multinationals & SaaS HQs.",                            bestFor: ["SaaS", "AI", "Enterprise Tech"], badges: ["AI Startup Friendly", "Enterprise"], setupDays: 18, bankingScore: 5, visaFlex: 4, fromAED: 32000, remote: false, aiScore: 90 },
  { id: "dsouth",   name: "Dubai South",          emirate: "Dubai",     x: 728, y: 246, tagline: "Aerotropolis around Al Maktoum airport.",                    bestFor: ["Logistics", "Aviation", "E-Commerce"], badges: ["Aviation", "E-Commerce"], setupDays: 12, bankingScore: 4, visaFlex: 4, fromAED: 16500, remote: true, aiScore: 86 },

  { id: "adgm",     name: "ADGM",                 emirate: "Abu Dhabi", x: 576, y: 329, tagline: "International financial centre — common law.",                bestFor: ["Finance", "Fintech", "Family Office"], badges: ["Common Law", "Premium"], setupDays: 21, bankingScore: 5, visaFlex: 5, fromAED: 45000, remote: false, aiScore: 89 },
  { id: "masdar",   name: "Masdar City",          emirate: "Abu Dhabi", x: 622, y: 334, tagline: "Sustainability, clean-tech & AI cluster.",                   bestFor: ["Cleantech", "AI", "Sustainability"], badges: ["Sustainable", "AI Startup Friendly"], setupDays: 14, bankingScore: 4, visaFlex: 4, fromAED: 20000, remote: true, aiScore: 87 },
  { id: "kizad",    name: "KIZAD",                emirate: "Abu Dhabi", x: 632, y: 272, tagline: "Industrial & logistics gateway by Khalifa Port.",            bestFor: ["Manufacturing", "Logistics"], badges: ["Industrial"], setupDays: 21, bankingScore: 5, visaFlex: 4, fromAED: 30000, remote: false, aiScore: 78 },

  { id: "saif",     name: "SAIF Zone",            emirate: "Sharjah",   x: 785, y: 159, tagline: "Sharjah Airport International — fast & affordable.",          bestFor: ["Logistics", "Trading", "Light Industry"], badges: ["Affordable", "Fast Setup"], setupDays: 7, bankingScore: 4, visaFlex: 4, fromAED: 11500, remote: true, aiScore: 83 },
  { id: "hamriyah", name: "Hamriyah",             emirate: "Sharjah",   x: 791, y: 135, tagline: "Industrial powerhouse with deep-water port.",                bestFor: ["Manufacturing", "Oil & Gas"], badges: ["Industrial"], setupDays: 14, bankingScore: 4, visaFlex: 4, fromAED: 16000, remote: false, aiScore: 76 },

  { id: "rakez",    name: "RAKEZ",                emirate: "RAK",       x: 880, y: 80,  tagline: "Ras Al Khaimah — cost-leader for SMEs.",                     bestFor: ["Manufacturing", "Trading", "Services"], badges: ["Most Affordable", "Fast Setup", "Remote Formation"], setupDays: 6, bankingScore: 4, visaFlex: 4, fromAED: 9500, remote: true, aiScore: 91 },

  { id: "ajmanfz",  name: "Ajman Free Zone",      emirate: "Ajman",     x: 800, y: 120, tagline: "Budget-friendly setup with quick approvals.",                bestFor: ["Trading", "Services", "E-Commerce"], badges: ["Most Affordable", "Fast Setup", "Remote Formation"], setupDays: 5, bankingScore: 3, visaFlex: 4, fromAED: 8500, remote: true, aiScore: 85 },

  { id: "uaqfz",    name: "UAQ Free Trade Zone",  emirate: "UAQ",       x: 820, y: 105, tagline: "Quiet emirate, simple structures, low cost.",                bestFor: ["Holding", "Consulting"], badges: ["Affordable"], setupDays: 7, bankingScore: 3, visaFlex: 3, fromAED: 8900, remote: true, aiScore: 74 },

  { id: "fujfz",    name: "Fujairah Free Zone",   emirate: "Fujairah",  x: 949, y: 200, tagline: "East coast access — maritime & bunkering.",                  bestFor: ["Maritime", "Trading", "Oil & Gas"], badges: ["Maritime"], setupDays: 10, bankingScore: 4, visaFlex: 4, fromAED: 13500, remote: true, aiScore: 77 },
];

const EMIRATES: Emirate[] = ["All", "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "RAK", "UAQ", "Fujairah"];

const CATEGORY_FILTERS = [
  "E-Commerce", "Tech", "AI", "Trading", "Consulting", "Manufacturing", "Logistics", "Crypto", "Finance",
];

type Filters = {
  emirate: Emirate;
  query: string;
  category: string | null;
  budget: number; // max AED
  remoteOnly: boolean;
};

const INITIAL_FILTERS: Filters = {
  emirate: "All",
  query: "",
  category: null,
  budget: 50000,
  remoteOnly: false,
};

function scoreZone(z: Zone, f: Filters): number {
  let score = z.aiScore;
  if (f.category && z.bestFor.some((b) => b.toLowerCase().includes(f.category!.toLowerCase()))) score += 12;
  if (f.remoteOnly && z.remote) score += 8;
  if (z.fromAED <= f.budget) score += 6;
  else score -= 18;
  if (f.emirate !== "All" && z.emirate === f.emirate) score += 4;
  return score;
}

export function UaeIntelligenceMap() {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [selectedId, setSelectedId] = useState<string | null>("ifza");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [compare, setCompare] = useState<string[]>([]);
  const [mobilePanel, setMobilePanel] = useState(false);

  const visible = useMemo(() => {
    return ZONES.filter((z) => {
      if (filters.emirate !== "All" && z.emirate !== filters.emirate) return false;
      if (filters.query) {
        const q = filters.query.toLowerCase();
        if (!z.name.toLowerCase().includes(q) && !z.bestFor.some((b) => b.toLowerCase().includes(q))) return false;
      }
      return true;
    });
  }, [filters.emirate, filters.query]);

  const ranked = useMemo(() => {
    return [...visible].map((z) => ({ z, s: scoreZone(z, filters) })).sort((a, b) => b.s - a.s);
  }, [visible, filters]);

  const topId = ranked[0]?.z.id;

  const selected = ZONES.find((z) => z.id === selectedId) ?? null;
  const compareZones = compare.map((id) => ZONES.find((z) => z.id === id)!).filter(Boolean);

  function toggleCompare(id: string) {
    setCompare((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      if (cur.length >= 2) return [cur[1], id];
      return [...cur, id];
    });
  }

  function selectZone(id: string) {
    setSelectedId(id);
    setMobilePanel(true);
  }

  return (
    <section id="uae-intelligence" className="relative py-28 md:py-40 overflow-hidden">
      {/* Atmospheric background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[720px] w-[1200px] rounded-full blur-3xl opacity-70"
             style={{ background: "radial-gradient(circle, var(--halo-1), transparent 70%)" }} />
        <div className="absolute top-1/3 -left-56 h-[560px] w-[560px] rounded-full blur-3xl opacity-55"
             style={{ background: "radial-gradient(circle, var(--halo-2), transparent 70%)" }} />
        <div className="absolute bottom-0 -right-56 h-[600px] w-[600px] rounded-full blur-3xl opacity-55"
             style={{ background: "radial-gradient(circle, var(--halo-1), transparent 70%)" }} />
        {/* floating dust */}
        <div className="absolute inset-0 uae-dust" />
      </div>

      <div className="relative mx-auto px-4 md:px-8" style={{ maxWidth: "1600px" }}>
        {/* Header */}
        <div className="max-w-5xl mx-auto text-center mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase border"
               style={{ borderColor: "var(--surface-border-strong)", background: "var(--surface-tint-strong)", color: "var(--primary)" }}>
            <Sparkles className="size-3.5" /> AI Business Navigation
          </div>
          <h2 className="font-display mt-8 tracking-[-0.035em] leading-[0.92] text-6xl md:text-[88px] lg:text-[112px] font-semibold">
            The UAE,<br />
            <span style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              intelligently mapped.
            </span>
          </h2>
          <p className="text-muted-foreground mt-8 text-lg md:text-xl max-w-2xl mx-auto leading-[1.6] font-light">
            Explore every emirate and free zone through a single AI-guided lens —
            tuned to your industry, budget and setup preferences.
          </p>
        </div>

        {/* Main layout — 280 / flex / 400, equal-height columns */}
        <div className="grid lg:grid-cols-[280px_minmax(700px,1fr)_400px] gap-8 lg:gap-10 items-stretch">


          {/* LEFT — controls */}
          <aside className="glass-panel rounded-2xl p-5 space-y-5 h-fit">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  value={filters.query}
                  onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                  placeholder="Free zone, activity…"
                  className="w-full h-10 rounded-xl pl-9 pr-3 text-sm border bg-white/70 focus:outline-none focus:ring-2 focus:ring-ring transition"
                  style={{ borderColor: "var(--surface-border)" }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Emirate</label>
              <div className="flex flex-wrap gap-1.5">
                {EMIRATES.map((e) => (
                  <button
                    key={e}
                    onClick={() => setFilters({ ...filters, emirate: e })}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                      filters.emirate === e
                        ? "text-white shadow-[0_4px_16px_-4px_var(--glow-primary)]"
                        : "hover:bg-white",
                    )}
                    style={
                      filters.emirate === e
                        ? { background: "linear-gradient(135deg, var(--primary), var(--accent))", borderColor: "transparent" }
                        : { borderColor: "var(--surface-border)", background: "var(--surface-tint-soft)" }
                    }
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-2">AI smart filter</label>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORY_FILTERS.map((c) => {
                  const on = filters.category === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setFilters({ ...filters, category: on ? null : c })}
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all",
                        on ? "text-white" : "hover:bg-white",
                      )}
                      style={
                        on
                          ? { background: "var(--primary)", borderColor: "transparent" }
                          : { borderColor: "var(--surface-border)", background: "var(--surface-tint-soft)" }
                      }
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Budget</label>
                <span className="text-xs font-medium" style={{ color: "var(--primary)" }}>
                  ≤ AED {filters.budget.toLocaleString()}
                </span>
              </div>
              <input
                type="range" min={8000} max={50000} step={500}
                value={filters.budget}
                onChange={(e) => setFilters({ ...filters, budget: Number(e.target.value) })}
                className="w-full accent-[color:var(--primary)]"
              />
            </div>

            <label className="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:bg-white/70 transition"
                   style={{ borderColor: "var(--surface-border)", background: "var(--surface-tint-soft)" }}>
              <span className="text-sm font-medium flex items-center gap-2">
                <Plane className="size-4" style={{ color: "var(--primary)" }} /> Remote setup only
              </span>
              <input
                type="checkbox"
                checked={filters.remoteOnly}
                onChange={(e) => setFilters({ ...filters, remoteOnly: e.target.checked })}
                className="accent-[color:var(--primary)]"
              />
            </label>

            {topId && (
              <div className="rounded-xl p-3 border" style={{ borderColor: "var(--surface-border-strong)", background: "linear-gradient(135deg, color-mix(in oklab, var(--primary) 8%, transparent), color-mix(in oklab, var(--accent) 8%, transparent))" }}>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider" style={{ color: "var(--primary)" }}>
                  <Sparkles className="size-3.5" /> AI Recommendation
                </div>
                <div className="font-display text-lg mt-1">
                  {ZONES.find((z) => z.id === topId)?.name}
                </div>
                <button
                  onClick={() => selectZone(topId)}
                  className="mt-2 text-xs font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                  style={{ color: "var(--primary)" }}
                >
                  Open details <ChevronRight className="size-3.5" />
                </button>
              </div>
            )}
          </aside>

          {/* CENTER — map */}
          <div className="relative order-first lg:order-none lg:self-stretch">
            <div className="relative rounded-[28px] overflow-hidden border glass-panel shadow-[0_40px_100px_-40px_var(--glow-primary)] h-full"
                 style={{ borderColor: "var(--surface-border-strong)", minHeight: "min(82vh, 880px)" }}>
              {/* Layered atmospheric floor */}
              <div aria-hidden className="absolute inset-0"
                   style={{ background: "radial-gradient(ellipse at 55% 38%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%), radial-gradient(ellipse at 18% 92%, color-mix(in oklab, var(--accent) 16%, transparent), transparent 60%), radial-gradient(ellipse at 88% 12%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 55%), linear-gradient(180deg, #fff 0%, oklch(0.96 0.018 285) 100%)" }} />
              {/* Inner light reflection */}
              <div aria-hidden className="absolute inset-x-0 top-0 h-40 pointer-events-none"
                   style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.85), transparent)" }} />
              {/* Floating dust inside the map */}
              <div aria-hidden className="absolute inset-0 uae-dust opacity-70 pointer-events-none" />

              {/* Decorative grid */}
              <svg aria-hidden className="absolute inset-0 w-full h-full opacity-[0.32]">
                <defs>
                  <pattern id="uae-grid" width="44" height="44" patternUnits="userSpaceOnUse">
                    <path d="M44 0 L0 0 0 44" fill="none" stroke="var(--pattern-line)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#uae-grid)" />
              </svg>

              <svg viewBox="0 0 1000 720" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="uae-fill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%"   stopColor="#F4F0FF" />
                    <stop offset="100%" stopColor="#E6DCFF" />
                  </linearGradient>
                  <linearGradient id="uae-fill-active" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%"   stopColor="#EDE4FF" />
                    <stop offset="100%" stopColor="#D7C6FF" />
                  </linearGradient>
                  <radialGradient id="node-glow" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%"   stopColor="#8B6CFF" stopOpacity="0.55" />
                    <stop offset="55%"  stopColor="#8B6CFF" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#8B6CFF" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="conn-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%"   stopColor="#8B6CFF" stopOpacity="0" />
                    <stop offset="50%"  stopColor="#7B5CFF" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#8B6CFF" stopOpacity="0" />
                  </linearGradient>
                  <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" />
                  </filter>
                  <filter id="map-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#7B5CFF" floodOpacity="0.18" />
                  </filter>
                </defs>

                {/* Clean UAE country shape — no labels, no halo strokes */}
                <g filter="url(#map-shadow)">
                  {UAE_PATHS.map((d, i) => (
                    <path
                      key={i}
                      d={d}
                      fill={filters.emirate !== "All" ? "url(#uae-fill-active)" : "url(#uae-fill)"}
                      stroke="#8B6CFF"
                      strokeWidth={1.4}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      style={{ transition: "fill 700ms ease" }}
                    />
                  ))}
                </g>
...
                {/* Zone nodes — pure shapes, no embedded text */}
                {ZONES.map((z) => {
                  const isVisible = visible.some((v) => v.id === z.id);
                  const isSelected = selectedId === z.id;
                  const isTop = topId === z.id;
                  const isHover = hoverId === z.id;
                  const dim = !isVisible;
                  const active = isSelected || isTop;
                  return (
                    <g
                      key={z.id}
                      transform={`translate(${z.x} ${z.y})`}
                      onMouseEnter={() => setHoverId(z.id)}
                      onMouseLeave={() => setHoverId(null)}
                      onClick={() => selectZone(z.id)}
                      style={{ cursor: "pointer", opacity: dim ? 0.35 : 1, transition: "opacity 300ms ease" }}
                    >
                      {/* Outer halo */}
                      <circle r={isTop ? 44 : isSelected ? 38 : isHover ? 32 : 24}
                              fill="url(#node-glow)"
                              className={isTop ? "uae-pulse-strong" : "uae-pulse"}
                              style={{ transition: "r 250ms ease" }} />
                      {/* Ring */}
                      <circle r={active ? 13 : isHover ? 10 : 8}
                              fill="none"
                              stroke={active ? "#7B5CFF" : "rgba(123,92,255,0.25)"}
                              strokeWidth={1.2} />
                      {/* Core */}
                      <circle r={active ? 8 : isHover ? 6.5 : 5.5}
                              fill="#ffffff"
                              stroke={active ? "#7B5CFF" : "#8B6CFF"}
                              strokeWidth={active ? 2.4 : 1.6}
                              style={{ filter: "drop-shadow(0 2px 4px rgba(123,92,255,0.30))", transition: "r 200ms ease" }} />
                      {/* Inner dot */}
                      <circle r={active ? 3.2 : 2} fill={active ? "#7B5CFF" : "rgba(123,92,255,0.55)"} />
                    </g>
                  );
                })}
              </svg>

              {/* HTML tooltip overlay — positioned over map but outside the SVG layer */}
              {(() => {
                const tipId = hoverId ?? selectedId;
                const tip = tipId ? ZONES.find((z) => z.id === tipId) : null;
                if (!tip) return null;
                const leftPct = (tip.x / 1000) * 100;
                const topPct = (tip.y / 720) * 100;
                const onRight = leftPct < 60;
                return (
                  <div
                    className="absolute pointer-events-none transition-all duration-200 z-10"
                    style={{
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                      transform: `translate(${onRight ? "20px" : "calc(-100% - 20px)"}, -50%)`,
                    }}
                  >
                    <div
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap"
                      style={{
                        background: "rgba(255,255,255,0.96)",
                        border: "1px solid rgba(139,108,255,0.30)",
                        color: "#3D2A8F",
                        boxShadow: "0 10px 30px -10px rgba(123,92,255,0.30), 0 0 0 1px rgba(255,255,255,0.6) inset",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="inline-block size-1.5 rounded-full" style={{ background: "#7B5CFF" }} />
                        {tip.name}
                        <span className="text-[10px] font-medium opacity-60">· {tip.emirate}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}


              {/* Floating compare chip */}
              {compareZones.length > 0 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-full glass-panel border text-xs"
                     style={{ borderColor: "var(--surface-border-strong)" }}>
                  <GitCompareArrows className="size-3.5" style={{ color: "var(--primary)" }} />
                  <span className="font-medium">
                    {compareZones.map((z) => z.name).join(" vs ")}
                  </span>
                  {compareZones.length === 2 && (
                    <span className="text-muted-foreground">— see panel →</span>
                  )}
                  <button onClick={() => setCompare([])} className="ml-1 opacity-60 hover:opacity-100">
                    <X className="size-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — info panel (aligned with map height) */}
          <aside className={cn(
            "glass-panel rounded-[28px] shadow-[0_30px_80px_-30px_var(--glow-primary)]",
            "lg:flex lg:flex-col lg:self-stretch lg:shrink-0",
            mobilePanel ? "flex flex-col" : "hidden",
          )}
          style={{
            borderColor: "var(--surface-border-strong)",
            minWidth: "340px",
          }}>
            <div className="overflow-y-auto p-8 lg:p-10 uae-panel-scroll flex-1">
              {compareZones.length === 2 ? (
                <CompareView a={compareZones[0]} b={compareZones[1]} onClose={() => setCompare([])} />
              ) : selected ? (
                <ZoneDetail
                  z={selected}
                  onCompare={() => toggleCompare(selected.id)}
                  inCompare={compare.includes(selected.id)}
                  aiScore={scoreZone(selected, filters)}
                />
              ) : (
                <div className="text-sm text-muted-foreground py-16 text-center">
                  Tap any glowing node on the map to open its intelligence card.
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Premium horizontal card rail */}

        <div className="mt-20 md:mt-28">

          <div className="flex items-end justify-between mb-5">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Top matches</div>
              <h3 className="font-display text-2xl md:text-3xl mt-1 tracking-tight">Ranked for your profile</h3>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>scroll</span>
              <ChevronRight className="size-3.5" />
            </div>
          </div>
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 uae-rail">
            {ranked.map(({ z, s }) => (
              <button
                key={z.id}
                onClick={() => selectZone(z.id)}
                className={cn(
                  "group snap-start shrink-0 w-[300px] text-left rounded-3xl p-6 border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-25px_var(--glow-primary)]",
                  selectedId === z.id ? "ring-2 ring-[color:var(--primary)] shadow-[0_20px_60px_-25px_var(--glow-primary)]" : "shadow-[0_10px_30px_-15px_var(--surface-shadow)]",
                )}
                style={{
                  borderColor: "var(--surface-border-strong)",
                  background: "linear-gradient(160deg, var(--surface-highlight), var(--surface-tint-soft))",
                  backdropFilter: "blur(14px)",
                }}
              >

                <div className="flex items-start justify-between mb-3">
                  <div className="h-11 w-11 rounded-xl flex items-center justify-center font-display text-base font-semibold text-white shadow-[0_8px_20px_-6px_var(--glow-primary)]"
                       style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
                    {z.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground">AI</div>
                    <div className="font-display text-lg leading-none" style={{ color: "var(--primary)" }}>{Math.min(99, Math.round(s))}</div>
                  </div>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{z.emirate}</div>
                <div className="font-display text-xl mt-0.5 tracking-tight">{z.name}</div>
                <div className="text-xs text-muted-foreground mt-1 line-clamp-2 min-h-[2.5rem]">{z.tagline}</div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {z.bestFor.slice(0, 2).map((b) => (
                    <span key={b} className="text-[10px] px-2 py-0.5 rounded-full border"
                          style={{ borderColor: "var(--surface-border)", background: "white" }}>{b}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t" style={{ borderColor: "var(--surface-border)" }}>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">From</div>
                    <div className="font-display text-sm">AED {z.fromAED.toLocaleString()}</div>
                  </div>
                  <div className="text-xs font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: "var(--primary)" }}>
                    Open <ChevronRight className="size-3.5" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .glass-panel {
          background: var(--surface-tint-strong);
          backdrop-filter: blur(20px) saturate(150%);
          -webkit-backdrop-filter: blur(20px) saturate(150%);
          border: 1px solid var(--surface-border);
          box-shadow: 0 10px 40px -20px var(--surface-shadow);
        }
        @keyframes uae-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%      { opacity: 0.95; transform: scale(1.18); }
        }
        .uae-pulse       { transform-origin: center; transform-box: fill-box; animation: uae-pulse 3.6s ease-in-out infinite; }
        .uae-pulse-strong{ transform-origin: center; transform-box: fill-box; animation: uae-pulse 2.2s ease-in-out infinite; }
        @keyframes uae-dash { to { stroke-dashoffset: -120; } }
        .uae-line { animation: uae-dash 14s linear infinite; }
        .uae-rail::-webkit-scrollbar { height: 6px; }
        .uae-rail::-webkit-scrollbar-thumb { background: color-mix(in oklab, var(--primary) 30%, transparent); border-radius: 999px; }
        .uae-panel-scroll::-webkit-scrollbar { width: 6px; }
        .uae-panel-scroll::-webkit-scrollbar-thumb { background: color-mix(in oklab, var(--primary) 25%, transparent); border-radius: 999px; }
        .uae-panel-scroll { scrollbar-width: thin; scrollbar-color: color-mix(in oklab, var(--primary) 25%, transparent) transparent; }

        .uae-dust {
          background-image:
            radial-gradient(1.5px 1.5px at 12% 18%, color-mix(in oklab, var(--primary) 50%, transparent) 50%, transparent 60%),
            radial-gradient(1px 1px at 78% 26%, color-mix(in oklab, var(--accent) 60%, transparent) 50%, transparent 60%),
            radial-gradient(1.5px 1.5px at 32% 72%, color-mix(in oklab, var(--primary) 40%, transparent) 50%, transparent 60%),
            radial-gradient(1px 1px at 64% 58%, color-mix(in oklab, var(--accent) 50%, transparent) 50%, transparent 60%),
            radial-gradient(1.2px 1.2px at 88% 80%, color-mix(in oklab, var(--primary) 40%, transparent) 50%, transparent 60%),
            radial-gradient(1px 1px at 8% 88%, color-mix(in oklab, var(--accent) 50%, transparent) 50%, transparent 60%);
          opacity: 0.55;
          animation: uae-drift 28s linear infinite;
        }
        @keyframes uae-drift {
          from { background-position: 0 0, 0 0, 0 0, 0 0, 0 0, 0 0; }
          to   { background-position: 40px -60px, -50px 40px, 60px 30px, -30px -50px, 50px -30px, -40px 60px; }
        }
        @media (max-width: 1023px) {
          .uae-pulse, .uae-pulse-strong { animation-duration: 5s; }
        }
      `}</style>
    </section>
  );
}


/* ------------------------------------------------------------------ */
/*  Sub-views                                                          */
/* ------------------------------------------------------------------ */

function ScoreBar({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className="h-1.5 w-4 rounded-full"
              style={{ background: i < value ? "var(--primary)" : "color-mix(in oklab, var(--primary) 12%, transparent)" }} />
      ))}
    </div>
  );
}

function ZoneDetail({ z, onCompare, inCompare, aiScore }: { z: Zone; onCompare: () => void; inCompare: boolean; aiScore: number }) {
  return (
    <div className="space-y-8">
      {/* Header with logo */}
      <div className="flex items-start gap-5">
        <div className="h-16 w-16 rounded-2xl flex items-center justify-center font-display text-xl font-semibold text-white shadow-[0_14px_30px_-8px_var(--glow-primary)] shrink-0"
             style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
          {z.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{z.emirate}</div>
          <h3 className="font-display text-[32px] leading-[1.05] tracking-tight mt-1">{z.name}</h3>
        </div>
      </div>


      {/* AI score band */}
      <div className="flex items-center justify-between rounded-2xl px-4 py-3 border"
           style={{ borderColor: "var(--surface-border-strong)", background: "linear-gradient(135deg, color-mix(in oklab, var(--primary) 10%, transparent), color-mix(in oklab, var(--accent) 10%, transparent))" }}>
        <div className="flex items-center gap-2">
          <Sparkles className="size-4" style={{ color: "var(--primary)" }} />
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--primary)" }}>AI Recommendation</span>
        </div>
        <div className="font-display text-2xl leading-none" style={{ color: "var(--primary)" }}>
          {Math.min(99, Math.round(aiScore))}<span className="text-xs text-muted-foreground font-sans">/100</span>
        </div>
      </div>

      <p className="text-[15px] text-muted-foreground leading-relaxed">{z.tagline}</p>

      <div className="flex flex-wrap gap-1.5">
        {z.badges.map((b) => (
          <span key={b} className="text-[11px] font-medium px-2.5 py-1 rounded-full border"
                style={{ borderColor: "var(--surface-border-strong)", color: "var(--primary)", background: "color-mix(in oklab, var(--primary) 6%, transparent)" }}>
            {b}
          </span>
        ))}
      </div>

      {/* Premium 2-col metrics */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard icon={<Clock className="size-4" />}    label="Setup"        value={`${z.setupDays}`} unit="days" />
        <MetricCard icon={<Banknote className="size-4" />} label="From"         value={z.fromAED.toLocaleString()} unit="AED" />
        <MetricCard icon={<Building2 className="size-4" />} label="Banking"   bars={z.bankingScore} />
        <MetricCard icon={<Plane className="size-4" />}     label="Visa flex." bars={z.visaFlex} />
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-2">Best activities</div>
        <div className="flex flex-wrap gap-1.5">
          {z.bestFor.map((b) => (
            <span key={b} className="text-xs px-2.5 py-1 rounded-lg border bg-white/80"
                  style={{ borderColor: "var(--surface-border)" }}>{b}</span>
          ))}
        </div>
      </div>

      {z.remote && (
        <div className="flex items-center gap-2.5 text-sm rounded-xl px-3.5 py-3 border"
             style={{ borderColor: "var(--surface-border-strong)", background: "color-mix(in oklab, var(--accent) 8%, transparent)" }}>
          <Zap className="size-4 shrink-0" style={{ color: "var(--primary)" }} />
          <span className="leading-snug">Remote formation available — no travel required.</span>
        </div>
      )}

      {/* CTA row */}
      <div className="pt-1 space-y-2.5">
        <a href="#contact"
           className="block w-full text-center text-sm font-semibold px-5 py-3.5 rounded-2xl text-white shadow-[0_12px_30px_-10px_var(--glow-primary)] hover:opacity-95 transition"
           style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
          Start with {z.name}
        </a>
        <button onClick={onCompare}
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border text-sm font-medium transition",
                  inCompare ? "text-white" : "hover:bg-white",
                )}
                style={inCompare
                  ? { background: "var(--primary)", borderColor: "transparent" }
                  : { borderColor: "var(--surface-border-strong)", background: "var(--surface-tint-soft)" }}>
          <GitCompareArrows className="size-4" />
          {inCompare ? "In comparison" : "Add to compare"}
        </button>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, unit, bars }: { icon: React.ReactNode; label: string; value?: string; unit?: string; bars?: number }) {
  return (
    <div className="rounded-2xl p-4 border min-h-[96px] flex flex-col justify-between"
         style={{ borderColor: "var(--surface-border-strong)", background: "linear-gradient(160deg, var(--surface-highlight), var(--surface-tint-soft))", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        <span style={{ color: "var(--primary)" }}>{icon}</span> {label}
      </div>
      {bars !== undefined ? (
        <div className="flex gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="h-2 flex-1 rounded-full"
                  style={{ background: i < bars ? "linear-gradient(90deg, var(--primary), var(--accent))" : "color-mix(in oklab, var(--primary) 10%, transparent)" }} />
          ))}
        </div>
      ) : (
        <div className="flex items-baseline gap-1">
          <span className="font-display text-2xl leading-none tracking-tight">{value}</span>
          {unit && <span className="text-[11px] text-muted-foreground uppercase tracking-wider">{unit}</span>}
        </div>
      )}
    </div>
  );
}


function CompareView({ a, b, onClose }: { a: Zone; b: Zone; onClose: () => void }) {
  const rows: { label: string; av: string; bv: string }[] = [
    { label: "Emirate",       av: a.emirate,                       bv: b.emirate },
    { label: "From (AED)",    av: a.fromAED.toLocaleString(),      bv: b.fromAED.toLocaleString() },
    { label: "Setup speed",   av: `${a.setupDays} days`,           bv: `${b.setupDays} days` },
    { label: "Banking",       av: "★".repeat(a.bankingScore),      bv: "★".repeat(b.bankingScore) },
    { label: "Visa flex.",    av: "★".repeat(a.visaFlex),          bv: "★".repeat(b.visaFlex) },
    { label: "Remote setup",  av: a.remote ? "Yes" : "No",         bv: b.remote ? "Yes" : "No" },
    { label: "Best for",      av: a.bestFor.slice(0,2).join(", "), bv: b.bestFor.slice(0,2).join(", ") },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
            <GitCompareArrows className="size-3" /> Live comparison
          </div>
          <h3 className="font-display text-xl tracking-tight">{a.name} <span className="text-muted-foreground">vs</span> {b.name}</h3>
        </div>
        <button onClick={onClose} className="opacity-60 hover:opacity-100"><X className="size-4" /></button>
      </div>
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--surface-border)" }}>
        <div className="grid grid-cols-3 text-[11px] uppercase tracking-wider text-muted-foreground bg-white/60 px-3 py-2">
          <span>Criterion</span><span>{a.name}</span><span>{b.name}</span>
        </div>
        {rows.map((r, i) => (
          <div key={r.label}
               className="grid grid-cols-3 text-xs px-3 py-2"
               style={{ background: i % 2 ? "transparent" : "color-mix(in oklab, var(--primary) 3%, transparent)" }}>
            <span className="text-muted-foreground">{r.label}</span>
            <span className="font-medium">{r.av}</span>
            <span className="font-medium">{r.bv}</span>
          </div>
        ))}
      </div>
      <a href="#contact"
         className="block text-center text-sm font-medium px-4 py-2.5 rounded-xl text-white"
         style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
        Get expert recommendation
      </a>
    </div>
  );
}
