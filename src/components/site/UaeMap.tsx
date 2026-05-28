import { useState } from "react";

type Jurisdiction = {
  id: string;
  name: string;
  x: number; // % position on map (0–100)
  y: number;
  best: string;
  advantages: string[];
  ideal: string;
};

const J: Jurisdiction[] = [
  {
    id: "dubai",
    name: "Dubai Mainland",
    x: 64, y: 46,
    best: "Trading, services, consulting, retail",
    advantages: ["Operate UAE-wide", "Government contracts eligible", "Strong banking acceptance"],
    ideal: "Companies needing local UAE operations and physical presence.",
  },
  {
    id: "ifza",
    name: "IFZA (Dubai)",
    x: 60, y: 50,
    best: "Consulting, services, online businesses",
    advantages: ["Cost-efficient", "Quick licensing", "Wide activity list"],
    ideal: "Freelancers, founders, and digital businesses scaling globally.",
  },
  {
    id: "meydan",
    name: "Meydan Free Zone",
    x: 66, y: 50,
    best: "Trading, e-commerce, digital services",
    advantages: ["Premium address", "Fast issuance", "Strong digital infrastructure"],
    ideal: "Online businesses and trading companies wanting a Dubai brand.",
  },
  {
    id: "rakez",
    name: "RAKEZ (Ras Al Khaimah)",
    x: 78, y: 24,
    best: "Industrial, trading, services",
    advantages: ["Most cost-efficient", "Industrial land options", "Investor-friendly"],
    ideal: "Manufacturing, light industry, and budget-aware service businesses.",
  },
  {
    id: "ajman",
    name: "Ajman Free Zone",
    x: 70, y: 33,
    best: "Trading, services, light industry",
    advantages: ["Affordable", "Flexible packages", "Fast incorporation"],
    ideal: "SMEs and startups optimizing for speed and price.",
  },
];

export function UaeMap() {
  const [active, setActive] = useState<string>("dubai");
  const cur = J.find((j) => j.id === active)!;

  return (
    <section id="solutions" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> UAE Structure Map
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
            Choose the Right{" "}
            <span className="gradient-text">Jurisdiction</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl">
            Hover or tap a jurisdiction to see best-fit business types, advantages, and the ideal
            client profile. We help you pick the structure that fits today and the next 5 years.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-5 gap-6 items-center">
          {/* MAP */}
          <div className="lg:col-span-3 relative glass-strong rounded-3xl p-6 md:p-10 overflow-hidden reveal">
            <div aria-hidden className="absolute inset-0 grid-pattern opacity-20" />
            <div aria-hidden className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl" />

            <div className="relative aspect-[4/3] w-full">
              <svg viewBox="0 0 800 600" className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="uaeStroke" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.84 0.10 82)" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="oklch(0.55 0.16 250)" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="uaeFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="oklch(1 0 0)" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                {/* Stylized UAE outline (abstract — not geographically exact) */}
                <path
                  d="M120,360 C140,300 200,260 280,250 C340,243 380,210 430,180 C480,150 540,140 600,150 C660,160 700,200 720,240 C740,280 700,330 660,360 C620,390 580,400 540,410 C500,420 460,440 420,460 C360,490 300,500 240,490 C200,484 160,460 140,420 C128,400 116,380 120,360 Z"
                  fill="url(#uaeFill)"
                  stroke="url(#uaeStroke)"
                  strokeWidth="1.5"
                />
                {/* secondary contour */}
                <path
                  d="M150,370 C200,330 260,310 320,310 C380,310 430,280 480,260 C540,238 600,236 640,260"
                  fill="none"
                  stroke="oklch(1 0 0 / 0.10)"
                  strokeDasharray="3 5"
                />
              </svg>

              {/* Pins */}
              {J.map((j) => {
                const isActive = j.id === active;
                return (
                  <button
                    key={j.id}
                    onMouseEnter={() => setActive(j.id)}
                    onFocus={() => setActive(j.id)}
                    onClick={() => setActive(j.id)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${j.x}%`, top: `${j.y}%` }}
                    aria-label={j.name}
                  >
                    <span className={`relative block w-3.5 h-3.5 rounded-full ${isActive ? "gold-gradient" : "bg-white/40"}`}>
                      <span className={`absolute inset-0 rounded-full ${isActive ? "bg-gold" : "bg-white/40"} opacity-60 animate-ping`} />
                    </span>
                    <span
                      className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] px-2 py-1 rounded-md glass-strong transition ${
                        isActive ? "text-foreground border-gold/40" : "text-muted-foreground"
                      }`}
                    >
                      {j.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* INFO PANEL */}
          <div className="lg:col-span-2 reveal">
            <div className="glass-card rounded-2xl p-7 grad-border relative">
              <div className="text-[11px] uppercase tracking-[0.2em] text-gold">Jurisdiction</div>
              <h3 className="mt-1 text-2xl font-semibold">{cur.name}</h3>
              <div className="mt-5">
                <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Best for</div>
                <div className="mt-1 text-sm">{cur.best}</div>
              </div>
              <div className="mt-5">
                <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Advantages</div>
                <ul className="mt-2 space-y-1.5">
                  {cur.advantages.map((a) => (
                    <li key={a} className="text-sm text-foreground/90 flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5">
                <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Ideal Client</div>
                <div className="mt-1 text-sm text-muted-foreground leading-relaxed">{cur.ideal}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
