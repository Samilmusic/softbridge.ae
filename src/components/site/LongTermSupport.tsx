import { FileText, ShieldCheck, Globe, Megaphone, Settings2, TrendingUp } from "lucide-react";

const CARDS = [
  { icon: FileText, title: "Tax Support", text: "Corporate tax registration, filings guidance, and ongoing tax posture reviews." },
  { icon: ShieldCheck, title: "Compliance Guidance", text: "AML/CFT, UBO, ESR, and renewals tracked and explained — no surprises." },
  { icon: Globe, title: "Website Management", text: "Hosting, updates, performance, security and conversion optimization." },
  { icon: Megaphone, title: "Advertising", text: "Always-on campaign management across Google and Meta with monthly reviews." },
  { icon: Settings2, title: "Operational Consulting", text: "Vendors, contracts, hiring, and process design as your operations scale." },
  { icon: TrendingUp, title: "Business Scaling", text: "Roadmaps for new markets, product lines, and entity expansion across the region." },
];

export function LongTermSupport() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/5 overflow-hidden">
      {/* cinematic bg */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.10_0.02_260)] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.18]" preserveAspectRatio="none" viewBox="0 0 1200 600">
          <g fill="none" stroke="oklch(0.84 0.10 82)" strokeWidth="0.4">
            {Array.from({ length: 18 }).map((_, i) => (
              <path key={i} d={`M0,${i * 36} Q600,${i * 36 - 30} 1200,${i * 36}`} />
            ))}
          </g>
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> Long-Term Partnership
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
            We Don't Disappear After{" "}
            <span className="gradient-text">Your License Is Issued.</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl">
            Setup is the start, not the finish line. Soft Bridge stays with clients across
            renewals, compliance updates, growth decisions, and the operational details that
            keep a business healthy.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARDS.map((c, i) => (
            <div
              key={c.title}
              className="glass-card grad-border rounded-2xl p-6 hover-lift reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="w-11 h-11 rounded-xl glass flex items-center justify-center mb-5">
                <c.icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="text-base font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
