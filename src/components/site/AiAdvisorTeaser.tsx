import * as React from "react";
import { AdvisorOrb } from "@/components/advisor/AdvisorOrb";
import { Link } from "@tanstack/react-router";
import { Sparkles, Brain, Bell, ShieldCheck, MessageSquare, Zap } from "lucide-react";

const CAPABILITIES = [
  { icon: Brain, title: "Remembers everything", text: "Jurisdiction, activity, visa needs, banking goals — context-aware every conversation." },
  { icon: Bell, title: "Proactive reminders", text: "Renewals, missing documents, tax deadlines, visa expiries — never miss what matters." },
  { icon: Zap, title: "Smart recommendations", text: "Suggests faster setups, banking-friendly structures, lower-cost alternatives." },
  { icon: ShieldCheck, title: "Private & secure", text: "Reads only your authenticated case. End-to-end role-based access." },
];

export function AiAdvisorTeaser() {
  return (
    <section id="ai-advisor" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Ambient gradient */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/20 blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-accent/15 blur-[140px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/30 text-[10px] uppercase tracking-[0.28em] text-primary/90">
            <Sparkles className="w-3 h-3" /> Founder Digital Twin™
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground mt-5 leading-[1.05]">
            Meet your <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">AI Business Advisor</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mt-5 leading-relaxed">
            A personalized AI-powered setup companion that guides your UAE business journey from formation to long-term growth — built into every Soft Bridge client portal.
          </p>
        </div>

        {/* Cinematic preview */}
        <div className="mt-16 relative">
          <div className="glass-strong rounded-[2rem] border border-white/10 p-6 sm:p-10 max-w-4xl mx-auto overflow-hidden relative">
            <div aria-hidden className="absolute -top-32 -left-20 w-72 h-72 rounded-full bg-primary/30 blur-[120px]" />
            <div aria-hidden className="absolute -bottom-24 -right-16 w-64 h-64 rounded-full bg-accent/25 blur-[120px]" />

            <div className="relative flex flex-col sm:flex-row items-start gap-6">
              <AdvisorOrb size={96} />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-[0.22em] text-primary/90 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Advisor online
                </div>
                <div className="font-display text-2xl text-foreground mt-2">Welcome back, Samil.</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Your <span className="text-foreground">IFZA application</span> is currently in <span className="text-foreground">Initial Approval review</span>. Estimated processing time is <span className="text-foreground">2–4 business days</span>. Want me to prepare your banking shortlist now?
                </p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {["What's my next step?", "Which bank is best for my activity?", "Can I add visas later?"].map((q) => (
                    <span key={q} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground">{q}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* faux composer */}
            <div className="relative mt-8 glass rounded-2xl p-3 flex items-center gap-3 border border-white/10">
              <MessageSquare className="w-4 h-4 text-muted-foreground/70 ml-2" />
              <span className="text-sm text-muted-foreground/70 flex-1">Ask your advisor anything…</span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-primary/90 px-2 py-1 rounded-md bg-primary/15 border border-primary/30">Streaming</span>
            </div>
          </div>
        </div>

        {/* Capability grid */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CAPABILITIES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="glass rounded-2xl p-5 border border-white/8 hover:border-primary/40 transition group">
              <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="text-sm font-medium text-foreground">{title}</div>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:shadow-[0_0_40px_oklch(0.66_0.22_285_/_0.5)] transition-all"
          >
            <Sparkles className="w-4 h-4" /> Activate your AI advisor
          </Link>
          <p className="text-[11px] text-muted-foreground mt-3">Included free with every Soft Bridge setup — no extra cost.</p>
        </div>
      </div>
    </section>
  );
}
