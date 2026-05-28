import { useState } from "react";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { WA_LINK } from "@/lib/site";
import { Counter } from "./Counter";
import { Skyline } from "./Skyline";
import { Particles } from "./Particles";
import { HeroMockup } from "./HeroMockup";
import { OnboardingDialog } from "./OnboardingDialog";

const TRUST = ["UAE-Based", "Long-Term Support", "Compliance Focused", "International Clients"];


const STATS = [
  { value: 5, suffix: "+", label: "Years of Regional Experience" },
  { value: 10, suffix: "+", label: "Countries Served" },
  { value: 100, suffix: "+", label: "Successful Projects" },
  { value: 250, suffix: "+", label: "Businesses Supported" },
];

export function Hero() {
  const [onboarding, setOnboarding] = useState(false);
  return (
    <section id="home" className="relative min-h-[100svh] pt-28 md:pt-36 pb-16 overflow-hidden">

      {/* layered backgrounds */}
      <div aria-hidden className="absolute inset-0 grid-pattern opacity-[0.18] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full bg-gradient-to-br from-amber-500/10 via-indigo-500/5 to-transparent blur-3xl" />
      <div aria-hidden className="absolute top-32 -left-40 w-[420px] h-[420px] rounded-full bg-amber-400/10 blur-3xl animate-float-slow" />
      <div aria-hidden className="absolute top-60 -right-40 w-[460px] h-[460px] rounded-full bg-indigo-500/10 blur-3xl animate-float-slow" style={{ animationDelay: "3s" }} />
      <Particles count={26} />
      <Skyline className="absolute inset-x-0 bottom-0 h-[40%] opacity-[0.55]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 reveal">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            UAE Business Infrastructure
          </div>

          <h1 className="mt-6 text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-semibold leading-[1.02]">
            Build Your Business in the UAE{" "}
            <span className="gradient-text">Without Chaos.</span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Company formation, banking preparation, compliance, digital infrastructure, and
            long-term business support — built into one strategic bridge.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setOnboarding(true)}
              className="group relative inline-flex items-center gap-2 rounded-full gold-gradient px-6 py-3.5 text-sm font-semibold text-[oklch(0.15_0.02_260)] hover:opacity-95 transition shadow-[0_20px_60px_-15px_oklch(0.84_0.10_82/0.5)]"
            >
              Start Your Setup
              <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
            </button>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3.5 text-sm font-semibold text-foreground hover:border-gold/40 transition"
            >
              <MessageCircle className="w-4 h-4 text-gold" />
              Talk on WhatsApp
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            {TRUST.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-[11px] text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold" /> {t}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 reveal" style={{ transitionDelay: "120ms" }}>
          <HeroMockup />
        </div>
      </div>

      {/* stats strip */}
      <div className="relative mx-auto max-w-7xl px-6 mt-20 md:mt-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl glass reveal">
          {STATS.map((s) => (
            <div key={s.label} className="bg-background/30 p-6 md:p-7">
              <div className="text-3xl md:text-4xl font-semibold">
                <Counter to={s.value} />
                <span className="text-gold">{s.suffix}</span>
              </div>
              <div className="mt-2 text-xs md:text-[13px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
