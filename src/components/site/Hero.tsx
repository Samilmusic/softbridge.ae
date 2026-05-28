import { ArrowRight, Sparkles } from "lucide-react";
import { WA_LINK } from "@/lib/site";
import { Counter } from "./Counter";

const STATS = [
  { value: 5, suffix: "+", label: "Years of Regional Experience" },
  { value: 10, suffix: "+", label: "Countries Served" },
  { value: 100, suffix: "+", label: "Successful Projects" },
  { value: 250, suffix: "+", label: "Businesses Supported" },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* background art */}
      <div aria-hidden className="absolute inset-0 grid-pattern opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div aria-hidden className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-amber-500/10 blur-3xl animate-float-slow" />
      <div aria-hidden className="absolute top-40 -left-32 w-[420px] h-[420px] rounded-full bg-indigo-500/10 blur-3xl animate-float-slow" style={{ animationDelay: "3s" }} />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 md:pt-28 pb-20 md:pb-28">
        <div className="max-w-3xl reveal">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            UAE Business Consulting
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05]">
            Build Your Business in the UAE{" "}
            <span className="gradient-text">The Right Way.</span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            We help founders and companies establish compliant, scalable businesses in the UAE
            with clarity, structure, and long-term vision.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full gold-gradient px-6 py-3.5 text-sm font-semibold text-[oklch(0.18_0.025_260)] hover:opacity-90 transition shadow-xl shadow-amber-500/20"
            >
              Get Started
              <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold text-foreground hover:border-white/20 transition"
            >
              Book a Consultation
            </a>
          </div>
        </div>

        {/* stats */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl glass reveal">
          {STATS.map((s) => (
            <div key={s.label} className="bg-background/40 p-6 md:p-8">
              <div className="text-3xl md:text-4xl font-semibold text-foreground">
                <Counter to={s.value} />
                <span className="text-gold">{s.suffix}</span>
              </div>
              <div className="mt-2 text-xs md:text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
