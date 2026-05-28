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
    text: "Professional, calm, and consistent. They explained the path and supported us through residency, compliance, and launching our digital presence.",
  },
  {
    name: "Yusuf R.",
    role: "Managing Partner, Trading Co.",
    text: "What stood out was the continuity. After setup they kept guiding us on compliance and growth — they feel like an extension of our team.",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> Client Voices
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
            Trusted by Founders Who Value{" "}
            <span className="gradient-text">Clarity & Continuity</span>
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {ITEMS.map((t, i) => (
            <figure
              key={t.name}
              className="glass-card grad-border rounded-2xl p-7 hover-lift reveal flex flex-col relative overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div aria-hidden className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-amber-400/10 blur-2xl" />
              <Quote className="w-7 h-7 text-gold/70 relative" />
              <blockquote className="mt-5 text-[15px] leading-relaxed text-foreground/90 flex-1 relative">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-white/10 relative">
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
