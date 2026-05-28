import { Quote } from "lucide-react";

const ITEMS = [
  {
    name: "Mariam A.",
    role: "Founder, Logistics Startup",
    text: "Soft Bridge structured our setup in a way that actually fit our business model. The clarity around licensing and banking saved us months of guesswork.",
  },
  {
    name: "Daniel K.",
    role: "Director, Tech Consultancy",
    text: "Professional, calm, and consistent. They didn't push us into anything — they explained the path and supported us all the way through residency and compliance.",
  },
  {
    name: "Yusuf R.",
    role: "Managing Partner, Trading Co.",
    text: "What stood out was the continuity. After setup they kept guiding us on compliance and helped launch our digital presence with measurable results.",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> Client Voices
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.08]">
            Trusted by Founders Who Value{" "}
            <span className="gradient-text">Clarity & Continuity</span>
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {ITEMS.map((t, i) => (
            <figure
              key={t.name}
              className="glass rounded-2xl p-7 hover:border-gold/30 transition reveal flex flex-col"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Quote className="w-7 h-7 text-gold/70" />
              <blockquote className="mt-5 text-[15px] leading-relaxed text-foreground/90 flex-1">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-white/10">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
