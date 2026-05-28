import { useMemo, useState } from "react";
import {
  Building2,
  Landmark,
  Factory,
  Sparkles,
  Cpu,
  Globe2,
  Banknote,
  Gauge,
  ShieldCheck,
  Wallet,
  Compass,
  Zap,
  Briefcase,
  Plane,
  Anchor,
  Sun,
} from "lucide-react";

type EmirateId =
  | "dubai"
  | "abudhabi"
  | "sharjah"
  | "ajman"
  | "rak"
  | "fujairah"
  | "uaq";

type Emirate = {
  id: EmirateId;
  name: string;
  tagline: string;
  vibe: string;
  icon: React.ComponentType<{ className?: string }>;
  badges: string[];
  insights: {
    jurisdiction: string;
    setupSpeed: string;
    estCost: string;
    banking: string;
    aiScore: number;
    industries: string[];
    ownership: string;
    remote: string;
  };
  /** abstract "scene" descriptor — nodes orbit the center forming a soft constellation */
  nodes: { x: number; y: number; r: number; label: string }[];
  accent: string; // css color expression
};

const EMIRATES: Emirate[] = [
  {
    id: "dubai",
    name: "Dubai",
    tagline: "Global · AI-driven · Startup capital",
    vibe: "A smart city pulse — Marina, Downtown, DIFC, and free zones connected by light.",
    icon: Building2,
    badges: ["Best for AI startups", "Best for E-commerce", "Fast banking"],
    insights: {
      jurisdiction: "IFZA · Meydan · DMCC · DIFC",
      setupSpeed: "3–7 business days",
      estCost: "from AED 12,500",
      banking: "Tier-1 · high approval",
      aiScore: 96,
      industries: ["AI / Tech", "E-commerce", "Consulting", "Trading"],
      ownership: "100% foreign ownership",
      remote: "Fully remote setup",
    },
    nodes: [
      { x: 18, y: 32, r: 6, label: "DIFC" },
      { x: 72, y: 24, r: 7, label: "Downtown" },
      { x: 84, y: 60, r: 5, label: "Marina" },
      { x: 30, y: 70, r: 6, label: "DMCC" },
      { x: 55, y: 50, r: 9, label: "AI Core" },
      { x: 12, y: 78, r: 4, label: "Meydan" },
    ],
    accent: "color-mix(in oklab, var(--primary) 70%, white)",
  },
  {
    id: "abudhabi",
    name: "Abu Dhabi",
    tagline: "Sovereign · Financial · Elite",
    vibe: "Institutional scale — ADGM, sovereign capital, and government-grade infrastructure.",
    icon: Landmark,
    badges: ["Best for Finance", "Sovereign-grade", "Family Office friendly"],
    insights: {
      jurisdiction: "ADGM · Masdar · KIZAD",
      setupSpeed: "7–14 business days",
      estCost: "from AED 18,500",
      banking: "Institutional · premium",
      aiScore: 92,
      industries: ["Finance", "Energy", "GovTech", "Aerospace"],
      ownership: "100% foreign ownership",
      remote: "Partially remote",
    },
    nodes: [
      { x: 22, y: 28, r: 7, label: "ADGM" },
      { x: 68, y: 22, r: 6, label: "Masdar" },
      { x: 78, y: 58, r: 5, label: "KIZAD" },
      { x: 38, y: 66, r: 6, label: "Corniche" },
      { x: 52, y: 48, r: 9, label: "Sovereign Core" },
      { x: 14, y: 72, r: 4, label: "Reem" },
    ],
    accent: "color-mix(in oklab, #c9a84c 65%, white)",
  },
  {
    id: "sharjah",
    name: "Sharjah",
    tagline: "Industrial · Logistics · Trade",
    vibe: "Manufacturing corridor — SAIF Zone, Hamriyah, and the trade arteries of the Gulf.",
    icon: Factory,
    badges: ["Best for Trading", "Lowest operational cost", "Manufacturing"],
    insights: {
      jurisdiction: "SHAMS · SAIF · Hamriyah",
      setupSpeed: "5–10 business days",
      estCost: "from AED 8,500",
      banking: "Standard · reliable",
      aiScore: 84,
      industries: ["Trading", "Manufacturing", "Media", "Logistics"],
      ownership: "100% foreign ownership",
      remote: "Fully remote setup",
    },
    nodes: [
      { x: 24, y: 30, r: 6, label: "SAIF" },
      { x: 70, y: 26, r: 6, label: "Hamriyah" },
      { x: 80, y: 62, r: 5, label: "SHAMS" },
      { x: 32, y: 68, r: 5, label: "Port" },
      { x: 54, y: 50, r: 8, label: "Trade Core" },
      { x: 16, y: 76, r: 4, label: "Industrial" },
    ],
    accent: "color-mix(in oklab, var(--primary) 55%, #f6d199)",
  },
  {
    id: "ajman",
    name: "Ajman",
    tagline: "Agile · Affordable · SME-friendly",
    vibe: "A nimble launchpad for small teams and service businesses.",
    icon: Briefcase,
    badges: ["Lowest cost", "Recommended for solo founders"],
    insights: {
      jurisdiction: "Ajman Free Zone · AMC",
      setupSpeed: "3–5 business days",
      estCost: "from AED 6,500",
      banking: "Standard",
      aiScore: 78,
      industries: ["Services", "Consulting", "Light trading"],
      ownership: "100% foreign ownership",
      remote: "Fully remote setup",
    },
    nodes: [
      { x: 28, y: 34, r: 5, label: "AFZ" },
      { x: 66, y: 28, r: 5, label: "AMC" },
      { x: 74, y: 60, r: 4, label: "Port" },
      { x: 52, y: 52, r: 8, label: "SME Core" },
      { x: 20, y: 72, r: 4, label: "Marina" },
    ],
    accent: "color-mix(in oklab, var(--primary) 60%, #c0e3ff)",
  },
  {
    id: "rak",
    name: "Ras Al Khaimah",
    tagline: "Industrial · Holding · Strategic",
    vibe: "RAKEZ and RAK ICC — a balanced base for industry and international holdings.",
    icon: Compass,
    badges: ["Best for Holdings", "Industrial-friendly"],
    insights: {
      jurisdiction: "RAKEZ · RAK ICC · RAK DAO",
      setupSpeed: "4–8 business days",
      estCost: "from AED 7,500",
      banking: "Good · multi-tier",
      aiScore: 82,
      industries: ["Holding", "Industrial", "Crypto / DAO", "Tourism"],
      ownership: "100% foreign ownership",
      remote: "Fully remote setup",
    },
    nodes: [
      { x: 22, y: 30, r: 5, label: "RAKEZ" },
      { x: 70, y: 24, r: 6, label: "RAK ICC" },
      { x: 80, y: 60, r: 4, label: "DAO" },
      { x: 34, y: 70, r: 5, label: "Industrial" },
      { x: 54, y: 50, r: 8, label: "Holding Core" },
    ],
    accent: "color-mix(in oklab, var(--primary) 50%, #d4f0d0)",
  },
  {
    id: "fujairah",
    name: "Fujairah",
    tagline: "Maritime · Energy · Strategic port",
    vibe: "East coast gateway — bunkering, shipping, and energy logistics.",
    icon: Anchor,
    badges: ["Best for Maritime", "Energy logistics"],
    insights: {
      jurisdiction: "Fujairah Free Zone · Creative City",
      setupSpeed: "5–9 business days",
      estCost: "from AED 9,000",
      banking: "Standard",
      aiScore: 76,
      industries: ["Maritime", "Energy", "Media"],
      ownership: "100% foreign ownership",
      remote: "Partially remote",
    },
    nodes: [
      { x: 26, y: 32, r: 5, label: "Port" },
      { x: 68, y: 26, r: 6, label: "FFZ" },
      { x: 76, y: 60, r: 5, label: "Bunker" },
      { x: 52, y: 50, r: 8, label: "Maritime Core" },
      { x: 18, y: 72, r: 4, label: "Creative" },
    ],
    accent: "color-mix(in oklab, var(--primary) 45%, #cfe1ff)",
  },
  {
    id: "uaq",
    name: "Umm Al Quwain",
    tagline: "Quiet · Cost-efficient · Niche",
    vibe: "A discreet base for cost-sensitive operations.",
    icon: Sun,
    badges: ["Lowest cost", "Niche industries"],
    insights: {
      jurisdiction: "UAQ Free Trade Zone",
      setupSpeed: "4–7 business days",
      estCost: "from AED 5,900",
      banking: "Basic",
      aiScore: 72,
      industries: ["Services", "Trading", "Workshops"],
      ownership: "100% foreign ownership",
      remote: "Fully remote setup",
    },
    nodes: [
      { x: 28, y: 34, r: 5, label: "UAQ FTZ" },
      { x: 66, y: 28, r: 5, label: "Lagoon" },
      { x: 52, y: 52, r: 8, label: "Quiet Core" },
      { x: 22, y: 70, r: 4, label: "Workshops" },
    ],
    accent: "color-mix(in oklab, var(--primary) 40%, #ffe1f0)",
  },
];

const AI_TAGS = [
  { icon: Cpu, label: "Best for AI startups" },
  { icon: Globe2, label: "Best for E-commerce" },
  { icon: Banknote, label: "Fast banking approval" },
  { icon: Plane, label: "Recommended for remote founders" },
  { icon: Wallet, label: "Lowest operational cost" },
  { icon: Zap, label: "Best for trading" },
];

export function UaeIntelligence() {
  const [activeId, setActiveId] = useState<EmirateId>("dubai");
  const active = useMemo(
    () => EMIRATES.find((e) => e.id === activeId)!,
    [activeId]
  );

  return (
    <section
      id="intelligence"
      className="relative overflow-hidden py-24 md:py-32"
      aria-labelledby="intelligence-title"
    >
      {/* LAYER 1 — Ambient AI atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 20% 20%, color-mix(in oklab, var(--primary) 14%, transparent) 0%, transparent 60%), radial-gradient(55% 45% at 85% 30%, color-mix(in oklab, var(--accent) 16%, transparent) 0%, transparent 65%), radial-gradient(70% 60% at 50% 110%, color-mix(in oklab, var(--primary) 10%, transparent) 0%, transparent 70%)",
          }}
        />
        {/* drifting particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              width: `${4 + (i % 4) * 2}px`,
              height: `${4 + (i % 4) * 2}px`,
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--primary) 50%, white) 0%, transparent 70%)",
              opacity: 0.55,
              animation: `uae-float ${10 + (i % 6) * 2}s ease-in-out ${i * 0.3}s infinite`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
        {/* hairline gradient lines */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--primary) 28%, transparent), transparent)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--accent) 24%, transparent), transparent)",
          }}
        />
      </div>

      <div className="container px-4 md:px-6">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-wide text-muted-foreground bg-background/60 backdrop-blur"
            style={{ borderColor: "var(--surface-border)" }}>
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            UAE Business Intelligence
          </div>
          <h2
            id="intelligence-title"
            className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mt-5 text-foreground"
          >
            An AI-powered operating system
            <br className="hidden md:block" />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--primary), var(--accent))",
              }}
            >
              for the United Arab Emirates.
            </span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg">
            Explore every emirate as its own ecosystem — jurisdictions, banking,
            cost, and AI-matched industries. Built for founders who think in
            systems.
          </p>
        </div>

        {/* 3-column experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT PANEL */}
          <aside className="lg:col-span-3">
            <GlassPanel>
              <div className="px-5 pt-5 pb-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Emirates
                </div>
              </div>
              <ul className="px-2 pb-3">
                {EMIRATES.map((e) => {
                  const Icon = e.icon;
                  const isActive = e.id === activeId;
                  return (
                    <li key={e.id}>
                      <button
                        onClick={() => setActiveId(e.id)}
                        className="group w-full text-left flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-300"
                        style={{
                          background: isActive
                            ? "color-mix(in oklab, var(--primary) 10%, transparent)"
                            : "transparent",
                          boxShadow: isActive
                            ? "inset 0 0 0 1px color-mix(in oklab, var(--primary) 28%, transparent)"
                            : "inset 0 0 0 1px transparent",
                        }}
                      >
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-lg transition-all"
                          style={{
                            background: isActive
                              ? "color-mix(in oklab, var(--primary) 18%, white)"
                              : "color-mix(in oklab, var(--primary) 6%, white)",
                            color: "var(--primary)",
                          }}
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-medium text-foreground truncate">
                            {e.name}
                          </span>
                          <span className="block text-[11px] text-muted-foreground truncate">
                            {e.tagline}
                          </span>
                        </span>
                        <span
                          className="h-1.5 w-1.5 rounded-full transition-opacity"
                          style={{
                            background: "var(--primary)",
                            opacity: isActive ? 1 : 0,
                            boxShadow: isActive
                              ? "0 0 12px var(--primary)"
                              : "none",
                          }}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="px-5 pt-3 pb-5 border-t" style={{ borderColor: "var(--surface-border)" }}>
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
                  AI recommendations
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {AI_TAGS.slice(0, 4).map((t) => {
                    const Icon = t.icon;
                    return (
                      <span
                        key={t.label}
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] text-foreground/80 bg-background/70 border"
                        style={{ borderColor: "var(--surface-border)" }}
                      >
                        <Icon className="h-3 w-3 text-primary" />
                        {t.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            </GlassPanel>
          </aside>

          {/* CENTER — cinematic ecosystem */}
          <div className="lg:col-span-6">
            <GlassPanel className="relative aspect-[4/3] lg:aspect-auto lg:h-[560px] overflow-hidden">
              <Scene emirate={active} />
              {/* Overlay header */}
              <div className="absolute top-5 left-5 right-5 flex items-start justify-between gap-4 pointer-events-none">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Live ecosystem
                  </div>
                  <div className="font-display text-2xl md:text-3xl text-foreground mt-1">
                    {active.name}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 max-w-md">
                    {active.vibe}
                  </div>
                </div>
                <div
                  className="rounded-xl px-3 py-2 text-xs bg-background/70 backdrop-blur border pointer-events-auto"
                  style={{ borderColor: "var(--surface-border)" }}
                >
                  <div className="text-muted-foreground">AI match</div>
                  <div className="text-foreground font-semibold text-base leading-tight">
                    {active.insights.aiScore}
                    <span className="text-muted-foreground text-xs"> /100</span>
                  </div>
                </div>
              </div>

              {/* Floating smart badges */}
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                {active.badges.map((b, i) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-foreground/90 bg-background/75 backdrop-blur border"
                    style={{
                      borderColor: "color-mix(in oklab, var(--primary) 22%, transparent)",
                      animation: `uae-rise 0.6s ease-out ${i * 0.08}s both`,
                    }}
                  >
                    <Sparkles className="h-3 w-3 text-primary" />
                    {b}
                  </span>
                ))}
              </div>
            </GlassPanel>
          </div>

          {/* RIGHT PANEL — insights */}
          <aside className="lg:col-span-3">
            <GlassPanel>
              <div className="px-5 pt-5 pb-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Intelligence
                </div>
                <div className="font-display text-xl text-foreground mt-1">
                  {active.name} insights
                </div>
              </div>
              <div className="px-5 pb-5 space-y-3">
                <InsightRow icon={ShieldCheck} label="Best jurisdictions" value={active.insights.jurisdiction} />
                <InsightRow icon={Gauge} label="Setup speed" value={active.insights.setupSpeed} />
                <InsightRow icon={Wallet} label="Estimated cost" value={active.insights.estCost} />
                <InsightRow icon={Banknote} label="Banking" value={active.insights.banking} />
                <InsightRow icon={Globe2} label="Foreign ownership" value={active.insights.ownership} />
                <InsightRow icon={Plane} label="Remote setup" value={active.insights.remote} />

                <div
                  className="rounded-xl p-3 border"
                  style={{
                    borderColor: "var(--surface-border)",
                    background:
                      "linear-gradient(180deg, color-mix(in oklab, var(--primary) 6%, transparent), transparent)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      AI recommendation
                    </span>
                    <span className="text-xs font-semibold text-primary">
                      {active.insights.aiScore}/100
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden bg-foreground/5">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${active.insights.aiScore}%`,
                        background:
                          "linear-gradient(90deg, var(--primary), var(--accent))",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                    Best industries
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {active.insights.industries.map((ind) => (
                      <span
                        key={ind}
                        className="text-[11px] rounded-full px-2.5 py-1 border bg-background/70"
                        style={{ borderColor: "var(--surface-border)" }}
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassPanel>
          </aside>
        </div>
      </div>

      {/* keyframes */}
      <style>{`
        @keyframes uae-float {
          0%, 100% { transform: translate3d(0,0,0); opacity: .45; }
          50% { transform: translate3d(8px,-14px,0); opacity: .8; }
        }
        @keyframes uae-rise {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes uae-pulse {
          0%, 100% { transform: scale(1); opacity: .85; }
          50% { transform: scale(1.12); opacity: 1; }
        }
        @keyframes uae-trail {
          0% { stroke-dashoffset: 240; opacity: 0; }
          20% { opacity: .6; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
      `}</style>
    </section>
  );
}

function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-3xl border backdrop-blur-xl ${className}`}
      style={{
        background:
          "linear-gradient(180deg, var(--surface-tint-strong), var(--surface-tint-soft))",
        borderColor: "var(--surface-border)",
        boxShadow:
          "0 1px 0 0 var(--surface-highlight) inset, 0 30px 60px -30px var(--surface-shadow)",
      }}
    >
      {children}
    </div>
  );
}

function InsightRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg"
        style={{
          background: "color-mix(in oklab, var(--primary) 8%, white)",
          color: "var(--primary)",
        }}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </div>
        <div className="text-sm text-foreground font-medium truncate">
          {value}
        </div>
      </div>
    </div>
  );
}

function Scene({ emirate }: { emirate: Emirate }) {
  // Re-key by emirate id to retrigger CSS transitions
  return (
    <div key={emirate.id} className="absolute inset-0">
      {/* atmospheric wash specific to emirate */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(60% 55% at 50% 50%, ${emirate.accent} 0%, transparent 65%)`,
          opacity: 0.45,
        }}
      />
      {/* concentric rings */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <radialGradient id="ring-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.0" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.25" />
          </radialGradient>
          <linearGradient id="trail" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[34, 26, 18, 10].map((r, i) => (
          <circle
            key={r}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="url(#ring-grad)"
            strokeWidth={0.15}
            style={{
              animation: `uae-pulse ${6 + i}s ease-in-out ${i * 0.4}s infinite`,
              transformOrigin: "50% 50%",
            }}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* connection paths from core to each node */}
        {emirate.nodes
          .filter((n) => n.label.toLowerCase().includes("core") === false)
          .map((n, i) => (
            <line
              key={`l-${i}`}
              x1="50"
              y1="50"
              x2={n.x}
              y2={n.y}
              stroke="url(#trail)"
              strokeWidth={0.2}
              strokeDasharray="2 4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{
                animation: `uae-trail ${4 + (i % 3)}s linear ${i * 0.4}s infinite`,
              }}
            />
          ))}
      </svg>

      {/* nodes */}
      {emirate.nodes.map((n, i) => {
        const isCore = n.label.toLowerCase().includes("core");
        return (
          <div
            key={`${emirate.id}-${i}`}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              animation: `uae-rise 0.6s ease-out ${0.1 + i * 0.06}s both`,
            }}
          >
            <div className="relative flex items-center gap-2">
              <span
                className="block rounded-full"
                style={{
                  width: `${n.r * 2}px`,
                  height: `${n.r * 2}px`,
                  background: isCore
                    ? "radial-gradient(circle, white 0%, color-mix(in oklab, var(--primary) 70%, white) 60%, transparent 75%)"
                    : "radial-gradient(circle, white 0%, color-mix(in oklab, var(--primary) 55%, white) 65%, transparent 80%)",
                  boxShadow: isCore
                    ? "0 0 24px color-mix(in oklab, var(--primary) 55%, transparent)"
                    : "0 0 14px color-mix(in oklab, var(--primary) 35%, transparent)",
                  animation: `uae-pulse ${isCore ? 3 : 4 + (i % 3)}s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
              <span
                className="whitespace-nowrap text-[10px] tracking-wide px-2 py-0.5 rounded-md bg-background/80 backdrop-blur border text-foreground/80"
                style={{ borderColor: "var(--surface-border)" }}
              >
                {n.label}
              </span>
            </div>
          </div>
        );
      })}

      {/* corner glass tag */}
      <div
        className="absolute right-5 bottom-20 hidden md:flex items-center gap-2 rounded-xl px-3 py-2 bg-background/70 backdrop-blur border"
        style={{ borderColor: "var(--surface-border)" }}
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{
            background: "var(--primary)",
            boxShadow: "0 0 10px var(--primary)",
          }}
        />
        <span className="text-[11px] text-muted-foreground">AI activity · live</span>
      </div>
    </div>
  );
}

export default UaeIntelligence;
