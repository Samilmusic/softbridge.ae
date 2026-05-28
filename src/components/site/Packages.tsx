import { Check } from "lucide-react";
import { WA_LINK } from "@/lib/site";

const TIERS = [
  {
    name: "Foundation",
    tag: "For solo founders & freelancers",
    features: [
      "Business formation & licensing",
      "Residency setup (1 person)",
      "Banking preparation",
      "AML readiness essentials",
      "Starter website",
    ],
  },
  {
    name: "Growth",
    tag: "For online businesses & agencies",
    highlight: true,
    features: [
      "Everything in Foundation",
      "Multi-user residency",
      "CRM & automation setup",
      "Conversion-focused website",
      "Google + Meta advertising launch",
      "Quarterly compliance review",
    ],
  },
  {
    name: "Expansion",
    tag: "For international operations",
    features: [
      "Everything in Growth",
      "Multi-jurisdiction strategy",
      "Advanced AML/CFT & UBO support",
      "Dedicated account partner",
      "Always-on ad management",
      "Operational consulting retainer",
    ],
  },
];

export function Packages() {
  return (
    <section id="packages" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> Engagement Models
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
            Structured Engagements,{" "}
            <span className="gradient-text">Tailored to You</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl">
            Three premium tiers designed to match your stage. Every engagement is scoped after a
            consultation — no rigid packages, no hidden line items.
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
              <div className="mt-1 text-sm text-muted-foreground">{t.tag}</div>

              <div className="mt-6">
                <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Investment</div>
                <div className="mt-1 text-2xl font-semibold gold-text-gradient">By Consultation</div>
                <div className="mt-1 text-xs text-muted-foreground">Scoped after a 30-min discovery call.</div>
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
                Schedule Consultation
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
