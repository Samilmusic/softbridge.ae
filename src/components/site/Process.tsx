const STEPS = [
  { n: "01", title: "Discovery", text: "We map your business model, goals, target market, and the exact operational needs that will shape every next decision." },
  { n: "02", title: "Structure Planning", text: "We define jurisdiction, licensing, ownership, residency, and compliance posture as one coherent structure." },
  { n: "03", title: "Licensing & Residency", text: "We coordinate the license issuance, investor visa, Emirates ID, medical, and required documentation." },
  { n: "04", title: "Banking Preparation", text: "We prepare KYC, source of funds, and business profile for the right banking relationships." },
  { n: "05", title: "Business Launch", text: "We build the website, set up systems, and prepare go-to-market with branding and advertising." },
  { n: "06", title: "Long-Term Support", text: "Renewals, compliance updates, operational guidance, and growth advisory — continuous, not transactional." },
];

export function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="max-w-3xl reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> Process
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
            A Clear Path From{" "}
            <span className="gradient-text">Setup to Operation</span>
          </h2>
        </div>

        <div className="mt-16 relative">
          {/* center glowing line */}
          <div aria-hidden className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2">
            <div className="w-px h-full bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
            <div className="absolute inset-0 w-px bg-gradient-to-b from-transparent via-gold/80 to-transparent blur-[2px] animate-pulse-soft" />
          </div>

          <ol className="space-y-10">
            {STEPS.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <li key={s.n} className="relative md:grid md:grid-cols-2 md:gap-12 reveal">
                  {/* node */}
                  <div aria-hidden className="absolute left-4 md:left-1/2 top-3 -translate-x-1/2 z-10">
                    <div className="w-3.5 h-3.5 rounded-full gold-gradient ring-4 ring-background shadow-[0_0_18px_oklch(0.84_0.10_82/0.7)]" />
                  </div>

                  <div className={`pl-12 md:pl-0 ${left ? "md:pr-10 md:text-right" : "md:col-start-2 md:pl-10"}`}>
                    <div className="inline-block">
                      <div className="text-xs font-mono tracking-[0.2em] text-gold">{s.n}</div>
                      <div className={`glass-card grad-border rounded-2xl p-6 mt-3 hover-lift`}>
                        <h3 className="text-lg font-semibold">{s.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
