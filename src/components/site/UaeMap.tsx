import { useMemo, useState } from "react";
import { UAE_PATHS, UAE_CITIES } from "@/lib/uae-geo";
import { ArrowRight, Building2, Sparkles, Wallet, Gauge } from "lucide-react";

type Complexity = "Simple" | "Moderate" | "Advanced";
type Tier = "major" | "secondary";

type Jurisdiction = {
  id: string;
  name: string;
  emirate: string;
  anchor: keyof typeof UAE_CITIES;
  offset?: [number, number];
  labelSide?: "left" | "right";
  overview: string;
  bestFor: string[];
  advantages: string[];
  budget: string;
  complexity: Complexity;
  tone: "gold" | "blue" | "violet" | "cyan";
  tier: Tier;
};

const J: Jurisdiction[] = [
  // Dubai — spread offsets radially to declutter the dense north-east coast
  { id: "dubai-mainland", name: "Dubai Mainland", emirate: "Dubai", anchor: "Dubai", offset: [0, 0], labelSide: "right", tone: "gold", tier: "major",
    overview: "Trade across the UAE without restrictions. Ideal for client-facing businesses needing local market access and government contracts.",
    bestFor: ["Consulting", "Retail", "Contracting", "Local Services"],
    advantages: ["Local Market Access", "Government Tenders", "Strong Reputation", "Visa Flexibility"],
    budget: "AED 18,000 – 45,000", complexity: "Moderate" },
  { id: "ifza", name: "IFZA", emirate: "Dubai", anchor: "Dubai", offset: [-58, 58], labelSide: "left", tone: "violet", tier: "major",
    overview: "Cost-effective Dubai free zone with 100% foreign ownership and a wide activity list — a favorite for entrepreneurs and SMEs.",
    bestFor: ["E-Commerce", "Consulting", "IT Services", "Freelancers"],
    advantages: ["100% Ownership", "Competitive Pricing", "Quick Setup", "No Currency Restrictions"],
    budget: "AED 12,000 – 25,000", complexity: "Simple" },
  { id: "meydan", name: "Meydan Free Zone", emirate: "Dubai", anchor: "Dubai", offset: [54, 46], labelSide: "right", tone: "blue", tier: "secondary",
    overview: "Premium digital free zone with a prestigious Dubai address and fully online incorporation — ideal for modern online businesses.",
    bestFor: ["Digital Agencies", "SaaS", "Trading", "Holding"],
    advantages: ["Prestigious Address", "Digital Setup", "Banking Friendly", "Flexi-Desk"],
    budget: "AED 14,000 – 30,000", complexity: "Simple" },
  { id: "dmcc", name: "DMCC", emirate: "Dubai", anchor: "Dubai", offset: [-48, -22], labelSide: "left", tone: "gold", tier: "major",
    overview: "World-class free zone in JLT — globally recognized, banking-friendly, and the standard for commodities and international trade.",
    bestFor: ["Trading", "Crypto", "Commodities", "International Ops"],
    advantages: ["Global Reputation", "Banking Friendly", "Premium Address", "Strong Audit"],
    budget: "AED 30,000 – 60,000", complexity: "Moderate" },
  { id: "dubai-south", name: "Dubai South", emirate: "Dubai", anchor: "Dubai South", offset: [0, 0], labelSide: "right", tone: "blue", tier: "secondary",
    overview: "Logistics-focused free zone around Al Maktoum Airport and Expo City — ideal for aviation, logistics and e-commerce operations.",
    bestFor: ["Logistics", "Aviation", "E-Commerce", "Light Industry"],
    advantages: ["Airport Access", "Warehousing", "Strategic Location", "Cost Efficient"],
    budget: "AED 15,000 – 40,000", complexity: "Moderate" },
  { id: "dafza", name: "DAFZA", emirate: "Dubai", anchor: "Dubai", offset: [70, -12], labelSide: "right", tone: "cyan", tier: "secondary",
    overview: "Premium free zone next to Dubai International Airport — built for global trade, regional HQs and high-end logistics.",
    bestFor: ["Global Trade", "Regional HQ", "Pharma", "Aviation"],
    advantages: ["Airport Adjacent", "Premium Tenants", "Banking Friendly", "Strong Compliance"],
    budget: "AED 35,000 – 80,000", complexity: "Advanced" },
  { id: "dic", name: "Dubai Internet City", emirate: "Dubai", anchor: "Dubai", offset: [-80, 18], labelSide: "left", tone: "violet", tier: "secondary",
    overview: "Tech-focused free zone hosting global ICT companies. Ideal for software, cloud, and tech innovators.",
    bestFor: ["SaaS", "AI", "Cloud", "Tech Startups"],
    advantages: ["Tech Ecosystem", "Talent Access", "Premium Brand", "Investor Network"],
    budget: "AED 25,000 – 55,000", complexity: "Moderate" },
  { id: "dmc", name: "Dubai Media City", emirate: "Dubai", anchor: "Dubai", offset: [-88, 38], labelSide: "left", tone: "gold", tier: "secondary",
    overview: "Home to leading media, marketing and content businesses — built for creative agencies and broadcasters.",
    bestFor: ["Agencies", "Media", "Content", "PR"],
    advantages: ["Creative Cluster", "Strong Brand", "Networking", "Premium Address"],
    budget: "AED 22,000 – 50,000", complexity: "Moderate" },
  { id: "dso", name: "Dubai Silicon Oasis", emirate: "Dubai", anchor: "Dubai", offset: [40, 78], labelSide: "right", tone: "cyan", tier: "secondary",
    overview: "Integrated tech park combining business, residential and tech infrastructure — strong choice for hardware and R&D.",
    bestFor: ["Hardware", "R&D", "IT Services", "Light Manufacturing"],
    advantages: ["Tech Park", "R&D Friendly", "Integrated Community", "Cost Efficient"],
    budget: "AED 16,000 – 35,000", complexity: "Moderate" },
  { id: "jafza", name: "JAFZA", emirate: "Dubai", anchor: "Jebel Ali", offset: [0, 0], labelSide: "left", tone: "gold", tier: "secondary",
    overview: "The UAE's flagship industrial and logistics free zone at Jebel Ali Port — built for heavy trade, manufacturing and global supply chains.",
    bestFor: ["Manufacturing", "Logistics", "Trading", "Industrial"],
    advantages: ["Port Access", "Industrial Plots", "Global Reach", "Strong Reputation"],
    budget: "AED 30,000 – 100,000+", complexity: "Advanced" },
  // Abu Dhabi
  { id: "ad-mainland", name: "Abu Dhabi Mainland", emirate: "Abu Dhabi", anchor: "Abu Dhabi", offset: [0, 0], labelSide: "left", tone: "gold", tier: "secondary",
    overview: "Operate freely in the capital with access to government contracts and large-scale projects in the UAE's largest economy.",
    bestFor: ["Contracting", "Energy", "Consulting", "Local Services"],
    advantages: ["Government Tenders", "Large Market", "Strong Reputation", "Strategic Location"],
    budget: "AED 20,000 – 50,000", complexity: "Moderate" },
  { id: "adgm", name: "ADGM", emirate: "Abu Dhabi", anchor: "Abu Dhabi", offset: [-50, 30], labelSide: "left", tone: "violet", tier: "major",
    overview: "International financial centre on Al Maryah Island with English common law — premier choice for fintech, asset management and family offices.",
    bestFor: ["Fintech", "Funds", "Family Office", "Holding"],
    advantages: ["English Common Law", "Top Tier Reputation", "Banking Friendly", "Regulatory Clarity"],
    budget: "AED 40,000 – 120,000+", complexity: "Advanced" },
  { id: "masdar", name: "Masdar City Free Zone", emirate: "Abu Dhabi", anchor: "Masdar", offset: [0, 0], labelSide: "right", tone: "blue", tier: "secondary",
    overview: "Sustainability and innovation hub focused on clean tech, renewable energy and smart mobility.",
    bestFor: ["Clean Tech", "Renewables", "Smart Mobility", "R&D"],
    advantages: ["Green Brand", "Innovation Cluster", "Strong Incentives", "Future Industries"],
    budget: "AED 18,000 – 45,000", complexity: "Moderate" },
  { id: "kizad", name: "KIZAD", emirate: "Abu Dhabi", anchor: "KIZAD", offset: [0, 0], labelSide: "right", tone: "cyan", tier: "secondary",
    overview: "Massive industrial zone connected to Khalifa Port — designed for heavy manufacturing, logistics and chemicals.",
    bestFor: ["Manufacturing", "Logistics", "Chemicals", "Industrial"],
    advantages: ["Port Access", "Industrial Land", "Scale Friendly", "Tax Benefits"],
    budget: "AED 25,000 – 100,000+", complexity: "Advanced" },
  { id: "twofour54", name: "twofour54", emirate: "Abu Dhabi", anchor: "Abu Dhabi", offset: [55, -20], labelSide: "right", tone: "gold", tier: "secondary",
    overview: "Abu Dhabi's media free zone — incentives for production, gaming, content and creative businesses.",
    bestFor: ["Media", "Gaming", "Production", "Creative"],
    advantages: ["Production Incentives", "Creative Cluster", "Talent Access", "Premium Brand"],
    budget: "AED 15,000 – 40,000", complexity: "Simple" },
  // Sharjah
  { id: "sharjah-mainland", name: "Sharjah Mainland", emirate: "Sharjah", anchor: "Sharjah", offset: [-44, -34], labelSide: "left", tone: "gold", tier: "secondary",
    overview: "Cost-effective mainland alternative to Dubai with strong industrial and commercial sectors.",
    bestFor: ["Trading", "Industrial", "Services", "Retail"],
    advantages: ["Cost Efficient", "Strong Industry", "Close to Dubai", "Stable Market"],
    budget: "AED 12,000 – 30,000", complexity: "Moderate" },
  { id: "shams", name: "SHAMS", emirate: "Sharjah", anchor: "Sharjah", offset: [-70, 22], labelSide: "left", tone: "violet", tier: "major",
    overview: "Creative media free zone with low setup costs and a wide activity list — popular with freelancers and creatives.",
    bestFor: ["Freelancers", "Media", "Consulting", "E-Commerce"],
    advantages: ["Low Cost", "Wide Activities", "Quick Setup", "Freelancer Friendly"],
    budget: "AED 5,750 – 15,000", complexity: "Simple" },
  { id: "smc", name: "Sharjah Media City", emirate: "Sharjah", anchor: "Sharjah", offset: [44, 70], labelSide: "right", tone: "cyan", tier: "secondary",
    overview: "Affordable media-focused free zone with flexible packages and remote-friendly setup.",
    bestFor: ["Media", "Marketing", "Consulting", "Digital"],
    advantages: ["Affordable", "Remote Setup", "Flexible Packages", "Quick Licensing"],
    budget: "AED 6,000 – 18,000", complexity: "Simple" },
  { id: "hamriyah", name: "Hamriyah Free Zone", emirate: "Sharjah", anchor: "Hamriyah", offset: [-60, -30], labelSide: "left", tone: "blue", tier: "secondary",
    overview: "Industrial free zone with deep-water port access — ideal for manufacturing, oil & gas and heavy industry.",
    bestFor: ["Manufacturing", "Oil & Gas", "Heavy Industry", "Logistics"],
    advantages: ["Port Access", "Industrial Plots", "Tax Benefits", "Established Infrastructure"],
    budget: "AED 15,000 – 50,000", complexity: "Moderate" },
  { id: "saif", name: "SAIF Zone", emirate: "Sharjah", anchor: "SAIF", offset: [62, -8], labelSide: "right", tone: "gold", tier: "secondary",
    overview: "Airport-based free zone with strong logistics and trading infrastructure.",
    bestFor: ["Trading", "Logistics", "Light Industry", "Distribution"],
    advantages: ["Airport Access", "24/7 Operations", "Cost Efficient", "Trade Friendly"],
    budget: "AED 14,000 – 35,000", complexity: "Moderate" },
  // Ajman
  { id: "ajman-fz", name: "Ajman Free Zone", emirate: "Ajman", anchor: "Ajman", offset: [60, -28], labelSide: "right", tone: "blue", tier: "secondary",
    overview: "One of the most affordable free zones in the UAE — ideal for startups and small businesses needing quick setup.",
    bestFor: ["Startups", "Trading", "Services", "E-Commerce"],
    advantages: ["Affordable", "Quick Setup", "Visa Friendly", "Flexible Packages"],
    budget: "AED 8,500 – 20,000", complexity: "Simple" },
  { id: "ajman-mainland", name: "Ajman Mainland", emirate: "Ajman", anchor: "Ajman", offset: [80, 20], labelSide: "right", tone: "gold", tier: "secondary",
    overview: "Affordable mainland option with growing commercial activity and proximity to Sharjah and Dubai.",
    bestFor: ["Retail", "Services", "Contracting", "Trading"],
    advantages: ["Cost Efficient", "Growing Market", "Quick Licensing", "Local Access"],
    budget: "AED 10,000 – 25,000", complexity: "Simple" },
  // RAK
  { id: "rakez", name: "RAKEZ", emirate: "Ras Al Khaimah", anchor: "Ras Al Khaimah", offset: [0, 0], labelSide: "right", tone: "cyan", tier: "major",
    overview: "Large multi-sector economic zone with industrial, commercial and educational ecosystems at competitive cost.",
    bestFor: ["Industrial", "Trading", "Education", "Manufacturing"],
    advantages: ["Cost Efficient", "Multi-Sector", "Industrial Land", "Strong Infrastructure"],
    budget: "AED 11,500 – 30,000", complexity: "Simple" },
  { id: "rak-mainland", name: "Ras Al Khaimah Mainland", emirate: "Ras Al Khaimah", anchor: "Ras Al Khaimah", offset: [-44, 34], labelSide: "left", tone: "gold", tier: "secondary",
    overview: "Growing mainland with strong tourism, industry and trade — favorable government policies and lower overheads.",
    bestFor: ["Tourism", "Industry", "Trading", "Services"],
    advantages: ["Low Cost", "Growth Market", "Tourism Sector", "Stable Economy"],
    budget: "AED 12,000 – 28,000", complexity: "Moderate" },
  // Fujairah
  { id: "fcc", name: "Fujairah Creative City", emirate: "Fujairah", anchor: "Fujairah", offset: [0, 0], labelSide: "right", tone: "violet", tier: "secondary",
    overview: "Media-focused free zone on the east coast — fast setup, low cost, ideal for consultants and creatives.",
    bestFor: ["Consulting", "Media", "Education", "Freelancers"],
    advantages: ["Low Cost", "Fast Setup", "Wide Activities", "Remote Friendly"],
    budget: "AED 7,500 – 18,000", complexity: "Simple" },
  { id: "fujairah-fz", name: "Fujairah Free Zone", emirate: "Fujairah", anchor: "Fujairah", offset: [-46, 30], labelSide: "left", tone: "blue", tier: "secondary",
    overview: "Strategic east-coast free zone with port access — strong for trading and shipping outside the Strait of Hormuz.",
    bestFor: ["Shipping", "Trading", "Logistics", "Industrial"],
    advantages: ["Port Access", "Strategic Location", "Cost Efficient", "Trade Friendly"],
    budget: "AED 13,000 – 35,000", complexity: "Moderate" },
  // UAQ
  { id: "uaq", name: "UAQ Free Trade Zone", emirate: "Umm Al Quwain", anchor: "Umm Al Quwain", offset: [0, 0], labelSide: "right", tone: "cyan", tier: "secondary",
    overview: "Compact and affordable free zone with quick licensing — popular for SMEs and consultants.",
    bestFor: ["SMEs", "Consulting", "Trading", "Services"],
    advantages: ["Affordable", "Quick Setup", "Flexible Packages", "Low Overheads"],
    budget: "AED 9,000 – 22,000", complexity: "Simple" },
];

const TONE_HEX: Record<NonNullable<Jurisdiction["tone"]>, string> = {
  gold: "#E6B663",
  blue: "#5BA8FF",
  violet: "#A78BFA",
  cyan: "#67E8F9",
};

const COMPLEXITY_DOTS: Record<Complexity, number> = { Simple: 1, Moderate: 2, Advanced: 3 };
const EMIRATES = ["All", "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"] as const;

// Aspect-correction transform. The raw projected paths are slightly stretched
// horizontally; this compensates so the silhouette reads as a proper UAE map
// rather than a flattened blob. Applied uniformly to country + markers so
// coordinates stay aligned.
const MAP_TRANSFORM = "translate(40 -30) scale(0.92 1.12)";

function anchorPos(j: Jurisdiction): [number, number] {
  return UAE_CITIES[j.anchor] as unknown as [number, number];
}
function markerPos(j: Jurisdiction): [number, number] {
  const [cx, cy] = anchorPos(j);
  const [ox, oy] = j.offset ?? [0, 0];
  return [cx + ox, cy + oy];
}

export function UaeMap() {
  const [activeId, setActiveId] = useState<string>("dmcc");
  const [filter, setFilter] = useState<(typeof EMIRATES)[number]>("All");

  const visible = useMemo(() => filter === "All" ? J : J.filter(j => j.emirate === filter), [filter]);
  const active = J.find(j => j.id === activeId) ?? J[0];
  const [ax, ay] = markerPos(active);
  const [aax, aay] = anchorPos(active);

  return (
    <section id="jurisdictions" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.22_0.04_260/0.35),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-[0.12]" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-medium tracking-[0.2em] text-gold uppercase mb-3">Explore UAE</div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight">
              Choose the Right Jurisdiction
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Hover any marker to explore mainland and free-zone options across all seven emirates — tailored to your business goals, banking needs and budget.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {EMIRATES.map(e => (
              <button
                key={e}
                onClick={() => setFilter(e)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  filter === e
                    ? "bg-gold/15 border-gold/40 text-gold"
                    : "border-white/10 text-muted-foreground hover:border-white/25 hover:text-foreground"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.45fr_1fr] gap-8 items-stretch">
          {/* MAP */}
          <div className="relative rounded-3xl border border-white/10 bg-[oklch(0.12_0.02_260/0.6)] backdrop-blur-xl overflow-hidden min-h-[560px]">
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute -top-1/3 -left-1/4 w-[55%] aspect-square rounded-full bg-[radial-gradient(circle,oklch(0.55_0.18_265/0.12),transparent_70%)] blur-3xl" />
            <div className="absolute -bottom-1/3 -right-1/4 w-[50%] aspect-square rounded-full bg-[radial-gradient(circle,oklch(0.7_0.12_85/0.08),transparent_70%)] blur-3xl" />

            <svg viewBox="0 0 1000 760" className="w-full h-full block relative">
              <defs>
                <linearGradient id="uae-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.30 0.045 260)" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="oklch(0.16 0.025 260)" stopOpacity="0.45" />
                </linearGradient>
                <linearGradient id="uae-stroke" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#9BC4FF" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#E6B663" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.75" />
                </linearGradient>
                <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1.6" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="ambient-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="14" />
                </filter>
                <radialGradient id="active-halo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={TONE_HEX[active.tone]} stopOpacity="0.22" />
                  <stop offset="100%" stopColor={TONE_HEX[active.tone]} stopOpacity="0" />
                </radialGradient>
              </defs>

              <g transform={MAP_TRANSFORM}>
                {/* country shadow */}
                {UAE_PATHS.map((d, i) => (
                  <path key={`s-${i}`} d={d} fill="oklch(0.06 0.02 260)" transform="translate(0,8)" opacity="0.55" />
                ))}

                {/* ambient halo behind active region */}
                <circle cx={ax} cy={ay} r="160" fill="url(#active-halo)" filter="url(#ambient-glow)" className="transition-all duration-700" />

                {/* country fill + refined border */}
                {UAE_PATHS.map((d, i) => (
                  <path key={`f-${i}`} d={d} fill="url(#uae-fill)" stroke="url(#uae-stroke)" strokeWidth="1.1" strokeLinejoin="round" />
                ))}
                {/* inner gold hairline for premium edge */}
                {UAE_PATHS.map((d, i) => (
                  <path key={`i-${i}`} d={d} fill="none" stroke="#E6B663" strokeOpacity="0.14" strokeWidth="0.4" />
                ))}

                {/* very soft emirate dividers — subtle, decorative */}
                <g stroke="oklch(0.85 0.04 260)" strokeOpacity="0.08" strokeWidth="0.6" fill="none" strokeDasharray="2 5">
                  <path d="M 700 230 Q 640 320 600 410" />
                  <path d="M 780 200 Q 760 260 740 330" />
                  <path d="M 820 160 Q 810 200 800 240" />
                  <path d="M 860 130 Q 870 180 880 240" />
                  <path d="M 900 200 Q 920 260 930 330" />
                </g>

                {/* leader lines: anchor → label position, only for visible */}
                {visible.map(j => {
                  const [mx, my] = markerPos(j);
                  const [cx, cy] = anchorPos(j);
                  if (mx === cx && my === cy) return null;
                  const isActive = j.id === active.id;
                  return (
                    <line key={`ld-${j.id}`} x1={cx} y1={cy} x2={mx} y2={my}
                      stroke={TONE_HEX[j.tone]}
                      strokeOpacity={isActive ? 0.55 : 0.18}
                      strokeWidth={isActive ? 0.9 : 0.6} />
                  );
                })}

                {/* anchor city dots (small, neutral) */}
                {Object.entries(UAE_CITIES).map(([k, [cx, cy]]) => (
                  <circle key={`a-${k}`} cx={cx} cy={cy} r={1.6} fill="#E6B663" opacity="0.55" />
                ))}

                {/* connection line: active anchor → active marker (cleaner cue) */}
                {(ax !== aax || ay !== aay) && (
                  <line x1={aax} y1={aay} x2={ax} y2={ay}
                    stroke={TONE_HEX[active.tone]} strokeOpacity="0.7" strokeWidth="1" />
                )}

                {/* markers */}
                {visible.map(j => {
                  const [x, y] = markerPos(j);
                  const isActive = j.id === active.id;
                  const isMajor = j.tier === "major";
                  const c = TONE_HEX[j.tone];
                  const baseR = isMajor ? 5.2 : 3.6;
                  const activeR = isMajor ? 7 : 5.5;
                  const r = isActive ? activeR : baseR;
                  const dim = !isActive ? 0.85 : 1;
                  const labelOnRight = (j.labelSide ?? "right") === "right";
                  const labelW = j.name.length * 6.6 + 16;
                  const labelX = labelOnRight ? x + 10 : x - 10 - labelW;
                  return (
                    <g key={j.id}
                       onMouseEnter={() => setActiveId(j.id)}
                       onClick={() => setActiveId(j.id)}
                       className="cursor-pointer"
                       style={{ opacity: dim }}>
                      {isActive && (
                        <circle cx={x} cy={y} r={r + 6} fill={c} opacity="0.12">
                          <animate attributeName="r" values={`${r + 4};${r + 14};${r + 4}`} dur="2.6s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.2;0;0.2" dur="2.6s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <circle cx={x} cy={y} r={r} fill={c} fillOpacity={isActive ? 0.95 : 0.7} filter={isActive ? "url(#dot-glow)" : undefined} />
                      <circle cx={x} cy={y} r={isMajor ? 1.8 : 1.3} fill="#fff" />
                      {/* permanent thin label for major markers, all on hover/active */}
                      {(isMajor || isActive) && (
                        <g>
                          <rect x={labelX} y={y - 11} rx="4" ry="4"
                                width={labelW} height="20"
                                fill="oklch(0.09 0.02 260 / 0.82)"
                                stroke={c} strokeOpacity={isActive ? 0.55 : 0.25} strokeWidth="0.6" />
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

            {/* corner badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live · UAE Federation
            </div>
            <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {visible.length} jurisdictions
            </div>
          </div>

          {/* INFO PANEL */}
          <div key={active.id} className="animate-fade-in rounded-3xl border border-white/10 bg-[oklch(0.13_0.02_260/0.7)] backdrop-blur-xl p-7 flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: TONE_HEX[active.tone] }} />
                  {active.emirate}
                </div>
                <h3 className="mt-1 text-2xl font-display font-semibold">{active.name}</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10"
                   style={{ background: `radial-gradient(circle, ${TONE_HEX[active.tone]}33, transparent 70%)` }}>
                <Building2 className="w-5 h-5" style={{ color: TONE_HEX[active.tone] }} />
              </div>
            </div>

            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{active.overview}</p>

            <div className="mt-6">
              <div className="text-[11px] uppercase tracking-[0.18em] text-gold mb-3 flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> Best For
              </div>
              <div className="flex flex-wrap gap-2">
                {active.bestFor.map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-foreground/90">{t}</span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-[11px] uppercase tracking-[0.18em] text-gold mb-3">Key Advantages</div>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-3 text-sm">
                {active.advantages.map(a => (
                  <li key={a} className="flex items-center gap-2 text-foreground/90">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: TONE_HEX[active.tone] }} />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <Wallet className="w-3 h-3" /> Budget
                </div>
                <div className="mt-1 text-sm font-semibold">{active.budget}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <Gauge className="w-3 h-3" /> Complexity
                </div>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="text-sm font-semibold">{active.complexity}</span>
                  <span className="ml-1 flex gap-0.5">
                    {[1, 2, 3].map(i => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full"
                            style={{ background: i <= COMPLEXITY_DOTS[active.complexity] ? TONE_HEX[active.tone] : "rgba(255,255,255,0.12)" }} />
                    ))}
                  </span>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/971502429035?text=${encodeURIComponent(`Hi Soft Bridge, I'd like to explore ${active.name} (${active.emirate}) for my business setup.`)}`}
              target="_blank" rel="noreferrer"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium text-[oklch(0.15_0.02_260)] transition-all hover:brightness-110"
              style={{ background: `linear-gradient(135deg, ${TONE_HEX[active.tone]}, oklch(0.92 0.06 86))` }}
            >
              Explore {active.name}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Legend / quick switch */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-[oklch(0.12_0.02_260/0.55)] backdrop-blur-xl p-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {visible.map(j => {
              const isActive = j.id === active.id;
              return (
                <button key={j.id}
                        onMouseEnter={() => setActiveId(j.id)}
                        onClick={() => setActiveId(j.id)}
                        className={`group flex items-center gap-2 px-3 py-2 rounded-xl border text-xs whitespace-nowrap transition-all ${
                          isActive ? "border-white/25 bg-white/[0.06]" : "border-white/10 hover:border-white/20"
                        }`}>
                  <span className="w-2 h-2 rounded-full" style={{ background: TONE_HEX[j.tone], boxShadow: isActive ? `0 0 12px ${TONE_HEX[j.tone]}` : "none" }} />
                  <span className="font-medium text-foreground/90">{j.name}</span>
                  <span className="text-muted-foreground">· {j.emirate}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
