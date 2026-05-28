const STEPS = [
  { n: "01", title: "Discover Business Needs", text: "We begin by understanding the client's business model, objectives, and operational requirements." },
  { n: "02", title: "Structure & Plan", text: "We define the most suitable business structure, licensing path, residency needs, and compliance preparation." },
  { n: "03", title: "Execute & Coordinate", text: "We coordinate documentation, applications, authority steps, and third-party processes where needed." },
  { n: "04", title: "Support & Continuity", text: "We continue supporting the business after setup with administrative, compliance, and operational guidance." },
];

export function Process() {
  return (
    <section id="process" className="relative py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> Our Process
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.08]">
            A Clear Structured Path{" "}
            <span className="gradient-text">From Setup to Operation</span>
          </h2>
        </div>

        <div className="mt-14 relative">
          <div aria-hidden className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="relative glass rounded-2xl p-7 hover:border-gold/30 transition reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="hidden lg:block absolute -top-2 left-7 w-3 h-3 rounded-full gold-gradient ring-4 ring-background" />
                <div className="text-xs font-mono text-gold tracking-widest">{s.n}</div>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
