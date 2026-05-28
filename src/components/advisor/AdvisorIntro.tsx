import { ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { Skyline } from "@/components/site/Skyline";
import { Particles } from "@/components/site/Particles";
import { WA_LINK } from "@/lib/site";

const TRUST = ["UAE Focused", "Banking Aware", "Compliance Oriented", "International Business Support"];

export function AdvisorIntro({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-28 pb-16">
      <div aria-hidden className="absolute inset-0 grid-pattern opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-gradient-to-br from-amber-500/12 via-indigo-500/8 to-transparent blur-3xl" />
      <div aria-hidden className="absolute top-40 -left-40 w-[460px] h-[460px] rounded-full bg-amber-400/10 blur-3xl animate-float-slow" />
      <div aria-hidden className="absolute top-60 -right-40 w-[460px] h-[460px] rounded-full bg-indigo-500/10 blur-3xl animate-float-slow" style={{ animationDelay: "3s" }} />
      <Particles count={28} />
      
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse-soft" />
          AI Structure Advisor · Beta
        </div>

        <h1 className="mt-7 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.02]">
          Find the Right UAE Business Structure{" "}
          <span className="gradient-text">in Minutes.</span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Our AI analyzes your business model and recommends the most suitable UAE company setup
          path based on your goals, operational needs, banking expectations, and growth plans.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-2 rounded-full gold-gradient px-7 py-4 text-sm font-semibold text-[oklch(0.15_0.02_260)] hover:opacity-95 transition shadow-[0_30px_80px_-15px_oklch(0.84_0.10_82/0.55)]"
          >
            Start AI Analysis
            <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
          </button>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full glass-strong px-7 py-4 text-sm font-semibold text-foreground hover:border-gold/40 transition"
          >
            <MessageCircle className="w-4 h-4 text-gold" />
            Talk to an Advisor
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
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
    </section>
  );
}
