import { Link } from "@tanstack/react-router";
import { ArrowRight, Globe, CheckCircle2, Sparkles } from "lucide-react";

const HIGHLIGHTS = [
  "IFZA from AED 13,900",
  "Meydan from AED 15,900",
  "Corporate banking assistance",
  "Free professional website",
];

export function RemoteSetupTeaser() {
  return (
    <section
      id="remote-setup"
      className="relative py-24 md:py-32 border-t border-white/5 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-[120px] opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.66 0.22 285 / 0.5) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="glass-card grad-border rounded-3xl p-8 md:p-12 reveal">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-gold mb-5">
                <Globe className="w-3 h-3" /> Remote UAE Setup
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
                Start your UAE company{" "}
                <span className="gradient-text">remotely</span>
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg">
                Incorporate with IFZA or Meydan and receive corporate banking
                assistance — without flying to Dubai. Built for global founders,
                agencies, and online businesses.
              </p>
              <ul className="mt-7 grid sm:grid-cols-2 gap-2.5">
                {HIGHLIGHTS.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2 text-[13px] text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/remote-company-setup"
                  className="inline-flex items-center gap-2 rounded-full gold-gradient px-6 py-3 text-sm font-semibold hover:scale-[1.02] transition"
                >
                  Explore Remote Setup
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-medium hover:border-gold/40 transition"
                >
                  Get a Quote
                </Link>
              </div>
            </div>

            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-50"
                style={{
                  background:
                    "radial-gradient(ellipse, oklch(0.66 0.22 285 / 0.4) 0%, transparent 70%)",
                }}
              />
              <div className="relative grid grid-cols-2 gap-3">
                <PriceTile
                  zone="IFZA"
                  price="13,900"
                  badge="Most Popular"
                  highlight
                />
                <PriceTile
                  zone="Meydan"
                  price="15,900"
                  badge="Premium"
                />
                <div className="col-span-2 glass rounded-2xl p-4 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-[12px] font-medium">
                      Free professional website included
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      Mobile responsive · modern design · business-ready
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceTile({
  zone,
  price,
  badge,
  highlight,
}: {
  zone: string;
  price: string;
  badge: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl p-5 overflow-hidden ${
        highlight ? "glass-strong" : "glass-card"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.22em] text-gold font-medium">
          {zone}
        </span>
        <span className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground glass rounded-full px-2 py-0.5">
          {badge}
        </span>
      </div>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="text-[10px] text-muted-foreground">AED</span>
        <span className="text-3xl font-semibold tracking-tight tabular-nums">
          {price}
        </span>
      </div>
      <div className="mt-2 text-[11px] text-muted-foreground">
        Remote incorporation + banking assistance
      </div>
    </div>
  );
}
