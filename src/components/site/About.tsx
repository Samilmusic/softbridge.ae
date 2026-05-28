import { Check, Target, Eye, ShieldCheck } from "lucide-react";

const BULLETS = [
  "Business setup & licensing coordination",
  "Residency, banking & compliance preparation",
  "Web development, advertising & digital presence",
  "Ongoing business support after setup",
];

const PILLARS = [
  { icon: Target, title: "Mission", text: "To support businesses with clear structure, compliant foundations, and practical guidance for operating in the UAE market." },
  { icon: Eye, title: "Vision", text: "To become a trusted long-term partner for international founders and companies expanding into the UAE and the region." },
  { icon: ShieldCheck, title: "Commitment", text: "Transparency, regulatory alignment, and long-term client support — building reliable foundations for sustainable growth." },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> About Soft Bridge
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
            A Strategic Bridge for Businesses{" "}
            <span className="gradient-text">Entering the UAE</span>
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Soft Bridge is a UAE-based business services firm supporting founders and companies
              with company setup, compliance guidance, and digital solutions.
            </p>
            <p>
              We work with international clients looking for a structured, compliant, and
              sustainable way to operate and grow in the UAE.
            </p>
          </div>

          <ul className="mt-8 space-y-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-[oklch(0.15_0.02_260)]" strokeWidth={3} />
                </span>
                <span className="text-sm text-foreground/90">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 reveal">
          {PILLARS.map((p) => (
            <div key={p.title} className="glass-card grad-border rounded-2xl p-7 hover-lift group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center flex-shrink-0 group-hover:border-gold/40 transition">
                  <p.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
