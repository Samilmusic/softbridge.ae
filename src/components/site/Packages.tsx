import { Check } from "lucide-react";
import { WA_LINK } from "@/lib/site";

const TIERS = [
  {
    name: "Foundation",
    bestFor: "Freelancers, consultants, remote businesses, solo founders.",
    features: [
      "UAE company setup",
      "Basic documentation support",
      "Establishment card",
      "Residency support guidance",
      "Basic compliance guidance",
    ],
    price: "Starting From AED 12,900",
    cta: "Explore Foundation",
  },
  {
    name: "Growth",
    bestFor: "Agencies, e-commerce companies, startups, digital businesses.",
    highlight: true,
    features: [
      "Business setup & structuring",
      "Residency support",
      "Banking preparation guidance",
      "Tax registration support",
      "Website & digital consultation",
      "Operational assistance",
    ],
    price: "Estimated AED 16,000 – 24,000",
    badge: "Most Popular",
    cta: "Explore Growth",
  },
  {
    name: "Expansion",
    bestFor: "International companies, scaling businesses, multi-market operations.",
    features: [
      "Advanced business structuring",
      "Multi-service coordination",
      "Compliance support",
      "Banking readiness planning",
      "Operational consulting",
      "Long-term infrastructure support",
    ],
    price: "Custom Structured Pricing",
    cta: "Schedule Strategy Call",
  },
];

export function Packages() {
  return (
    <section id="packages" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> Structured Business Setup Packages
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
            Transparent Paths,{" "}
            <span className="gradient-text">Designed for Growth</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl">
            Transparent business setup paths designed around different operational needs, growth stages, and business goals.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {TIERS.map((t, i) => (
            <div
              key={t.name}
              className={`relative glass-card grad-border rounded-3xl p-7 md:p-8 hover-lift reveal ${
                t.highlight ? "ring-1 ring-gold/40" : ""
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] gold-gradient text-[oklch(0.15_0.02_260)] px-3 py-1 rounded-full font-semibold">
                  Most Popular
                </div>
              )}
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-semibold">{t.name}</h3>
                <div className="text-[11px] uppercase tracking-[0.18em] text-gold">0{i + 1}</div>
              </div>

              <div className="mt-5">
                <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-1.5">Best For</div>
                <p className="text-sm text-foreground/80 leading-relaxed">{t.bestFor}</p>
              </div>

              <div className="mt-6">
                <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Investment</div>
                <div className="mt-1.5 text-2xl font-semibold gold-text-gradient">{t.price}</div>
              </div>

              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <span className="mt-0.5 w-4 h-4 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[oklch(0.15_0.02_260)]" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 w-full inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                  t.highlight
                    ? "gold-gradient text-[oklch(0.15_0.02_260)] hover:opacity-95"
                    : "glass-strong text-foreground hover:border-gold/40"
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
