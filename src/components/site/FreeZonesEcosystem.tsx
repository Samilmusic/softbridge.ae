import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Zap, Globe2, IdCard, ArrowRight, Sparkles, MapPin, Clock } from "lucide-react";

type Zone = {
  id: string;
  name: string;
  emirate: string;
  description: string;
  bestFor: string[];
  setupSpeed: string; // e.g. "3–5 days"
  remote: boolean;
  visa: boolean;
  pricingFrom?: string;
  activities?: string[];
  timeline?: string;
};

const EMIRATES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ras Al Khaimah",
  "Fujairah",
  "Ajman",
  "Umm Al Quwain",
  "Mainland",
] as const;

const ZONES: Zone[] = [
  // DUBAI
  { id: "ifza", name: "IFZA", emirate: "Dubai", description: "Flexible Dubai free zone with broad activity list and competitive packages.", bestFor: ["Consulting Ready", "Lowest Cost", "Remote Setup Available"], setupSpeed: "3–5 days", remote: true, visa: true, pricingFrom: "from AED 12,900", activities: ["Consulting", "Trading", "Services"], timeline: "3–5 business days for license, +5–10 days for visa." },
  { id: "meydan", name: "Meydan Free Zone", emirate: "Dubai", description: "Premium Dubai address with fast digital incorporation and banking support.", bestFor: ["Fast Banking", "Remote Setup Available", "Consulting Ready"], setupSpeed: "2–4 days", remote: true, visa: true, pricingFrom: "from AED 14,500", activities: ["Consulting", "E-Commerce", "Holding"], timeline: "License within a week; banking introductions included." },
  { id: "dmcc", name: "DMCC", emirate: "Dubai", description: "Global #1 ranked free zone — commodities, trading, crypto and prestige.", bestFor: ["Trading Focused", "Fast Banking", "Residency Friendly"], setupSpeed: "7–14 days", remote: false, visa: true, pricingFrom: "from AED 34,340", activities: ["Trading", "Crypto", "Professional Services"], timeline: "1–2 weeks including pre-approvals." },
  { id: "dubai-south", name: "Dubai South", emirate: "Dubai", description: "Logistics, aviation and e-commerce hub adjacent to Al Maktoum Airport.", bestFor: ["Best For E-Commerce", "Trading Focused"], setupSpeed: "5–10 days", remote: true, visa: true, pricingFrom: "from AED 11,500", activities: ["Logistics", "Aviation", "E-Commerce"] },
  { id: "dafza", name: "DAFZA", emirate: "Dubai", description: "Tier-1 free zone at Dubai International Airport — trade and logistics.", bestFor: ["Trading Focused", "Fast Banking"], setupSpeed: "7–14 days", remote: false, visa: true, pricingFrom: "from AED 25,000", activities: ["Aviation", "Trading", "Logistics"] },
  { id: "dic", name: "Dubai Internet City", emirate: "Dubai", description: "Tech ecosystem home to Google, Microsoft, Meta — built for digital firms.", bestFor: ["AI Startup Friendly", "Media & Content"], setupSpeed: "10–20 days", remote: false, visa: true, pricingFrom: "from AED 30,000", activities: ["SaaS", "AI", "IT Services"] },
  { id: "dso", name: "Dubai Silicon Oasis", emirate: "Dubai", description: "Integrated tech park with R&D infrastructure and accelerator access.", bestFor: ["AI Startup Friendly", "Lowest Cost"], setupSpeed: "5–10 days", remote: true, visa: true, pricingFrom: "from AED 14,000", activities: ["Tech", "R&D", "Hardware"] },
  { id: "jafza", name: "JAFZA", emirate: "Dubai", description: "Flagship industrial free zone at Jebel Ali Port — heavy trade & manufacturing.", bestFor: ["Trading Focused"], setupSpeed: "10–20 days", remote: false, visa: true, pricingFrom: "from AED 30,000", activities: ["Manufacturing", "Trading", "Logistics"] },

  // ABU DHABI
  { id: "adgm", name: "ADGM", emirate: "Abu Dhabi", description: "Common-law financial centre — funds, fintech, family offices.", bestFor: ["Fast Banking", "AI Startup Friendly", "Residency Friendly"], setupSpeed: "10–20 days", remote: false, visa: true, pricingFrom: "from USD 8,300", activities: ["Finance", "Fintech", "Holding"] },
  { id: "kezad", name: "KEZAD", emirate: "Abu Dhabi", description: "Industrial powerhouse — manufacturing, logistics and warehousing.", bestFor: ["Trading Focused"], setupSpeed: "10–20 days", remote: false, visa: true, activities: ["Industrial", "Logistics"] },
  { id: "masdar", name: "Masdar City", emirate: "Abu Dhabi", description: "Sustainability and clean-tech focused free zone.", bestFor: ["AI Startup Friendly", "Consulting Ready"], setupSpeed: "7–14 days", remote: true, visa: true, activities: ["Clean Tech", "Consulting", "R&D"] },
  { id: "twofour54", name: "twofour54", emirate: "Abu Dhabi", description: "Media free zone for production, gaming and content creators.", bestFor: ["Media & Content"], setupSpeed: "5–10 days", remote: true, visa: true, activities: ["Media", "Gaming", "Content"] },

  // SHARJAH
  { id: "shams", name: "SHAMS", emirate: "Sharjah", description: "Creative media free zone with affordable freelancer packages.", bestFor: ["Media & Content", "Lowest Cost", "Remote Setup Available"], setupSpeed: "3–7 days", remote: true, visa: true, pricingFrom: "from AED 5,750", activities: ["Media", "Freelance", "Consulting"] },
  { id: "saif", name: "SAIF Zone", emirate: "Sharjah", description: "Airport-adjacent free zone for trading and light industry.", bestFor: ["Trading Focused"], setupSpeed: "7–14 days", remote: false, visa: true, activities: ["Trading", "Industrial"] },
  { id: "hamriyah", name: "Hamriyah Free Zone", emirate: "Sharjah", description: "Industrial and maritime hub on Sharjah's east coast.", bestFor: ["Trading Focused", "Lowest Cost"], setupSpeed: "7–14 days", remote: false, visa: true, activities: ["Maritime", "Industrial"] },

  // RAK
  { id: "rakez", name: "RAKEZ", emirate: "Ras Al Khaimah", description: "Cost-efficient gateway — strong for SMEs, trading and manufacturing.", bestFor: ["Lowest Cost", "Remote Setup Available", "Trading Focused"], setupSpeed: "3–7 days", remote: true, visa: true, pricingFrom: "from AED 11,500", activities: ["Trading", "SME", "Industrial"] },

  // FUJAIRAH
  { id: "fcc", name: "Fujairah Creative City", emirate: "Fujairah", description: "Affordable creative & media free zone with quick setup.", bestFor: ["Media & Content", "Lowest Cost", "Remote Setup Available"], setupSpeed: "3–5 days", remote: true, visa: true, activities: ["Media", "Consulting"] },
  { id: "ffz", name: "Fujairah Free Zone", emirate: "Fujairah", description: "Port-adjacent free zone strategic for trade with the Gulf of Oman.", bestFor: ["Trading Focused"], setupSpeed: "7–14 days", remote: false, visa: true, activities: ["Trading", "Maritime"] },

  // AJMAN
  { id: "afz", name: "Ajman Free Zone", emirate: "Ajman", description: "Entry-level free zone — fast incorporation, budget-friendly.", bestFor: ["Lowest Cost", "Remote Setup Available", "Consulting Ready"], setupSpeed: "3–5 days", remote: true, visa: true, pricingFrom: "from AED 8,500", activities: ["Trading", "Services"] },

  // UAQ
  { id: "uaqftz", name: "UAQ Free Trade Zone", emirate: "Umm Al Quwain", description: "Compact free zone with simple processes and low overheads.", bestFor: ["Lowest Cost", "Remote Setup Available"], setupSpeed: "3–7 days", remote: true, visa: true, activities: ["Trading", "Services"] },

  // MAINLAND
  { id: "dubai-mainland", name: "Dubai Mainland", emirate: "Mainland", description: "Trade across the UAE & government contracts — 100% foreign ownership.", bestFor: ["Best For E-Commerce", "Trading Focused", "Residency Friendly"], setupSpeed: "7–14 days", remote: false, visa: true, activities: ["Trading", "Retail", "Government Work"] },
  { id: "ad-mainland", name: "Abu Dhabi Mainland", emirate: "Mainland", description: "Onshore presence for energy, government and large enterprise contracts.", bestFor: ["Fast Banking", "Trading Focused"], setupSpeed: "7–14 days", remote: false, visa: true, activities: ["Energy", "Enterprise"] },
  { id: "sh-mainland", name: "Sharjah Mainland", emirate: "Mainland", description: "Onshore licensing for industrial and commercial activities.", bestFor: ["Lowest Cost", "Trading Focused"], setupSpeed: "7–14 days", remote: false, visa: true, activities: ["Industrial", "Commercial"] },
];

const ALL_TAGS = [
  "All",
  "Best For E-Commerce",
  "Fast Banking",
  "Remote Setup Available",
  "AI Startup Friendly",
  "Lowest Cost",
  "Trading Focused",
  "Residency Friendly",
  "Media & Content",
  "Consulting Ready",
] as const;

export function FreeZonesEcosystem() {
  const [emirate, setEmirate] = useState<(typeof EMIRATES)[number] | "All">("All");
  const [tag, setTag] = useState<(typeof ALL_TAGS)[number]>("All");
  const [active, setActive] = useState<Zone | null>(null);

  const filtered = useMemo(
    () =>
      ZONES.filter(
        (z) =>
          (emirate === "All" || z.emirate === emirate) &&
          (tag === "All" || z.bestFor.includes(tag))
      ),
    [emirate, tag]
  );

  return (
    <section
      id="ecosystems"
      aria-labelledby="ecosystems-title"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient luxury background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] rounded-full blur-3xl opacity-70"
          style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%)" }}
        />
        <div
          className="absolute -left-40 top-1/3 w-[55vw] h-[55vh] rounded-full blur-3xl opacity-60"
          style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 28%, transparent), transparent 70%)" }}
        />
        <div
          className="absolute -right-40 bottom-0 w-[55vw] h-[55vh] rounded-full blur-3xl opacity-55"
          style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)" }}
        />
        {/* Hairline frame */}
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--primary) 35%, transparent), transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--primary) 25%, transparent), transparent)" }} />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 backdrop-blur px-3 py-1 text-xs text-muted-foreground mb-5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            UAE Business Ecosystem
          </div>
          <h2 id="ecosystems-title" className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight">
            UAE Free Zones & <span className="text-primary">Business Ecosystems</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            From Dubai to Ras Al Khaimah — Soft Bridge guides you to the right jurisdiction,
            then handles licensing, banking and residency end-to-end.
          </p>
        </div>

        {/* Filters */}
        <div className="reveal mb-10 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {(["All", ...EMIRATES] as const).map((e) => (
              <button
                key={e}
                onClick={() => setEmirate(e)}
                className={`text-xs md:text-sm px-3.5 py-1.5 rounded-full border transition-all backdrop-blur ${
                  emirate === e
                    ? "border-primary/60 bg-primary/10 text-foreground shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_10%,transparent)]"
                    : "border-border/60 bg-background/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {ALL_TAGS.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`text-[11px] md:text-xs px-3 py-1 rounded-full border transition-all ${
                  tag === t
                    ? "border-accent/60 bg-accent/15 text-foreground"
                    : "border-border/50 bg-background/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {filtered.map((z) => (
            <ZoneCard key={z.id} zone={z} onOpen={() => setActive(z)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No zones match these filters yet — try clearing one.
          </p>
        )}

        {/* Bottom statement + CTA */}
        <div className="reveal mt-20 md:mt-24 text-center max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl font-display tracking-tight">
            From <span className="text-primary">Dubai</span> to{" "}
            <span className="text-primary">Abu Dhabi</span>,{" "}
            <span className="text-primary">Sharjah</span> to{" "}
            <span className="text-primary">Ras Al Khaimah</span> — Soft Bridge supports company
            formation and business infrastructure across the UAE.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <a href="#contact">
                Start Your UAE Setup <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/advisor">Talk to AI Advisor</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Detail modal */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl">
          {active && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {active.emirate}
                </div>
                <DialogTitle className="font-display text-2xl md:text-3xl">{active.name}</DialogTitle>
                <DialogDescription className="text-base">{active.description}</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <Stat icon={<Clock className="h-4 w-4" />} label="Setup speed" value={active.setupSpeed} />
                <Stat icon={<Globe2 className="h-4 w-4" />} label="Remote setup" value={active.remote ? "Available" : "On-site"} />
                <Stat icon={<IdCard className="h-4 w-4" />} label="Residency visa" value={active.visa ? "Supported" : "Limited"} />
                <Stat icon={<Zap className="h-4 w-4" />} label="Pricing" value={active.pricingFrom ?? "On request"} />
              </div>

              {active.activities && (
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Best activities</p>
                  <div className="flex flex-wrap gap-1.5">
                    {active.activities.map((a) => (
                      <Badge key={a} variant="secondary" className="font-normal">{a}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Best for</p>
                <div className="flex flex-wrap gap-1.5">
                  {active.bestFor.map((t) => (
                    <Badge key={t} className="bg-primary/10 text-foreground border border-primary/25 hover:bg-primary/15 font-normal">{t}</Badge>
                  ))}
                </div>
              </div>

              {active.timeline && (
                <p className="text-sm text-muted-foreground mt-4">
                  <span className="text-foreground font-medium">Timeline: </span>
                  {active.timeline}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a href="#contact">Book consultation <ArrowRight className="h-4 w-4" /></a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/quote">Get quote</a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function ZoneCard({ zone, onOpen }: { zone: Zone; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="reveal group relative text-left rounded-2xl p-5 md:p-6 transition-all duration-300
        border border-border/60 bg-[color-mix(in_oklab,var(--card)_85%,transparent)]
        backdrop-blur-xl shadow-[0_1px_0_0_var(--surface-highlight)_inset,0_10px_30px_-20px_var(--surface-shadow)]
        hover:-translate-y-1 hover:border-primary/40
        hover:shadow-[0_1px_0_0_var(--surface-highlight)_inset,0_25px_60px_-25px_color-mix(in_oklab,var(--primary)_45%,transparent)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 60%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl flex items-center justify-center border border-primary/25 bg-primary/10">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{zone.emirate}</div>
            <div className="font-display text-lg leading-tight">{zone.name}</div>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5" />
      </div>

      <p className="relative mt-4 text-sm text-muted-foreground line-clamp-3 min-h-[3.75rem]">
        {zone.description}
      </p>

      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {zone.bestFor.slice(0, 3).map((t) => (
          <span
            key={t}
            className="text-[10px] md:text-[11px] px-2 py-0.5 rounded-full border border-accent/40 bg-accent/10 text-foreground/80"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="relative mt-5 pt-4 border-t border-border/60 grid grid-cols-3 gap-2 text-[11px]">
        <MiniStat icon={<Clock className="h-3 w-3" />} label={zone.setupSpeed} />
        <MiniStat icon={<Globe2 className="h-3 w-3" />} label={zone.remote ? "Remote" : "On-site"} active={zone.remote} />
        <MiniStat icon={<IdCard className="h-3 w-3" />} label={zone.visa ? "Visa" : "No visa"} active={zone.visa} />
      </div>
    </button>
  );
}

function MiniStat({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 ${active ? "text-foreground" : "text-muted-foreground"}`}>
      <span className={active ? "text-primary" : ""}>{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/50 backdrop-blur p-3">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}
