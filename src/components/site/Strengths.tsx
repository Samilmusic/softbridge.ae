import { ScaleIcon, Hammer, UserCog, Handshake, Award, Layers3, Users } from "lucide-react";

const STRENGTHS = [
  { icon: ScaleIcon, title: "Regulatory Clarity", text: "Clear guidance aligned with UAE regulations and compliance standards." },
  { icon: Hammer, title: "Practical Execution", text: "Hands-on support focused on real operational needs — not theory." },
  { icon: UserCog, title: "Tailored Business Support", text: "Each solution is adapted to the client's business model, industry, and growth stage." },
  { icon: Handshake, title: "Long-Term Partnership", text: "We support businesses beyond setup, providing continuity and structured growth assistance." },
];

const WHY = [
  { icon: Users, title: "Long-Term Client Partnership", text: "We invest time to understand your business and grow with you across every operational stage." },
  { icon: Award, title: "Partner, Not a One-Off Provider", text: "We stay engaged after setup — providing structure, advice, and continuity that lasts." },
  { icon: Layers3, title: "Tailored Support, Not Templates", text: "Each engagement is structured around your industry, model, and long-term objectives." },
];

export function Strengths() {
  return (
    <section className="relative py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> Strengths
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.08]">
            Our Strengths Driving{" "}
            <span className="gradient-text">Your Success</span>
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STRENGTHS.map((s, i) => (
            <div
              key={s.title}
              className="glass rounded-2xl p-6 hover:-translate-y-1 hover:border-gold/30 transition reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="w-11 h-11 rounded-xl glass flex items-center justify-center mb-5">
                <s.icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Why choose us */}
        <div className="mt-24 md:mt-32">
          <div className="max-w-3xl reveal">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold mb-5">
              <span className="w-8 h-px bg-gold" /> Why Choose Us
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.08]">
              Expertise Built on Structure,{" "}
              <span className="gradient-text">Clarity & Trust</span>
            </h2>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {WHY.map((w, i) => (
              <div
                key={w.title}
                className="relative glass rounded-2xl p-7 hover:border-gold/30 transition group reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-amber-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition" />
                <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-5">
                  <w.icon className="w-5 h-5 text-[oklch(0.18_0.025_260)]" />
                </div>
                <h3 className="text-lg font-semibold relative">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed relative">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
