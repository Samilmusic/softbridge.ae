import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Particles } from "@/components/site/Particles";
import { FloatingActions } from "@/components/site/FloatingActions";
import { BookingDialog } from "@/components/site/BookingDialog";
import { useReveal } from "@/hooks/use-reveal";
import { WA_LINK } from "@/lib/site";

export type ServicePageConfig = {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  /** Tailwind gradient stops, e.g. "from-violet-500/30 via-amber-400/20 to-transparent" */
  accentGradient: string;
  /** Hex/oklch color used for glows, dot accents, and orbs */
  accentColor: string;
  secondaryAccentColor: string;
  overview: {
    heading: ReactNode;
    body: string[];
  };
  services: { icon: LucideIcon; title: string; text: string }[];
  process: { title: string; text: string }[];
  benefits: { icon: LucideIcon; title: string; text: string }[];
  whyUs: string[];
  portalNote: string;
  faqs: { q: string; a: string }[];
  /** Optional disclaimer rendered under hero (e.g., banking approval) */
  disclaimer?: string;
};

export function ServicePageLayout({ config }: { config: ServicePageConfig }) {
  useReveal();
  const [booking, setBooking] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <Header />
      <FloatingActions />
      <BookingDialog open={booking} onOpenChange={setBooking} />

      {/* HERO */}
      <section className="relative pt-32 md:pt-44 pb-24 md:pb-32 overflow-hidden">
        <Particles />
        {/* Cinematic accent orbs */}
        <div
          aria-hidden
          className="absolute -top-40 -left-32 w-[640px] h-[640px] rounded-full blur-[120px] opacity-40 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${config.accentColor} 0%, transparent 70%)` }}
        />
        <div
          aria-hidden
          className="absolute top-20 -right-32 w-[520px] h-[520px] rounded-full blur-[120px] opacity-30 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${config.secondaryAccentColor} 0%, transparent 70%)` }}
        />
        <div
          aria-hidden
          className={`absolute inset-0 bg-gradient-to-br ${config.accentGradient} opacity-30 pointer-events-none`}
        />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-gold mb-7"
          >
            <Sparkles className="w-3 h-3" />
            {config.eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight max-w-4xl mx-auto"
          >
            {config.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {config.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={() => setBooking(true)}
              className="inline-flex items-center gap-2 rounded-full gold-gradient px-7 py-3.5 text-sm font-semibold text-[oklch(0.15_0.02_260)] hover:scale-[1.02] transition shadow-[0_20px_60px_-20px_oklch(0.84_0.10_82/0.5)]"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass-strong px-7 py-3.5 text-sm font-medium hover:border-gold/40 transition"
            >
              <MessageCircle className="w-4 h-4 text-gold" />
              Chat on WhatsApp
            </a>
          </motion.div>

          {config.disclaimer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 mx-auto max-w-2xl glass rounded-2xl px-5 py-3 text-[12px] text-muted-foreground"
            >
              <span className="text-gold font-medium">Note:</span> {config.disclaimer}
            </motion.div>
          )}
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="relative py-20 md:py-28 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 reveal">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
              <span className="w-8 h-px bg-gold" /> Overview
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
              {config.overview.heading}
            </h2>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {config.overview.body.map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed text-[15px]">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES INCLUDED */}
      <section className="relative py-20 md:py-28 border-t border-white/5">
        <div
          aria-hidden
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"
        >
          <div className="absolute inset-0 dot-pattern opacity-20" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl reveal">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
              <span className="w-8 h-px bg-gold" /> What's Included
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
              End-to-end <span className="gradient-text">capabilities</span>
            </h2>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.services.map((s, i) => (
              <div
                key={s.title}
                className="group glass-card grad-border rounded-2xl p-6 hover-lift reveal relative overflow-hidden"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none"
                  style={{
                    background: `radial-gradient(400px circle at 50% 0%, ${config.accentColor}20, transparent 60%)`,
                  }}
                />
                <div className="relative w-11 h-11 rounded-xl glass flex items-center justify-center mb-5 group-hover:border-gold/40 transition">
                  <s.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="relative text-[15px] font-semibold">{s.title}</h3>
                <p className="relative mt-2 text-[13px] text-muted-foreground leading-relaxed">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative py-20 md:py-28 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-3xl reveal">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
              <span className="w-8 h-px bg-gold" /> Process
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
              A clear path from <span className="gradient-text">brief to delivery</span>
            </h2>
          </div>

          <div className="mt-16 relative">
            <div
              aria-hidden
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
            >
              <div className="w-px h-full bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
              <div className="absolute inset-0 w-px bg-gradient-to-b from-transparent via-gold/80 to-transparent blur-[2px] animate-pulse-soft" />
            </div>

            <ol className="space-y-10">
              {config.process.map((s, i) => {
                const left = i % 2 === 0;
                const n = String(i + 1).padStart(2, "0");
                return (
                  <li key={n} className="relative md:grid md:grid-cols-2 md:gap-12 reveal">
                    <div
                      aria-hidden
                      className="absolute left-4 md:left-1/2 top-3 -translate-x-1/2 z-10"
                    >
                      <div className="w-3.5 h-3.5 rounded-full gold-gradient ring-4 ring-background shadow-[0_0_18px_oklch(0.84_0.10_82/0.7)]" />
                    </div>

                    <div
                      className={`pl-12 md:pl-0 ${
                        left ? "md:pr-10 md:text-right" : "md:col-start-2 md:pl-10"
                      }`}
                    >
                      <div className="inline-block">
                        <div className="text-xs font-mono tracking-[0.2em] text-gold">{n}</div>
                        <div className="glass-card grad-border rounded-2xl p-6 mt-3 hover-lift">
                          <h3 className="text-lg font-semibold">{s.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            {s.text}
                          </p>
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

      {/* BENEFITS */}
      <section className="relative py-20 md:py-28 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl reveal">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
              <span className="w-8 h-px bg-gold" /> Benefits
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
              Engineered for <span className="gradient-text">outcomes</span>
            </h2>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.benefits.map((b, i) => (
              <div
                key={b.title}
                className="glass-card rounded-2xl p-6 hover-lift reveal"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center mb-4">
                  <b.icon className="w-4.5 h-4.5 text-gold" />
                </div>
                <h3 className="text-[15px] font-semibold">{b.title}</h3>
                <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SOFT BRIDGE */}
      <section className="relative py-20 md:py-28 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 reveal">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
                <span className="w-8 h-px bg-gold" /> Why Soft Bridge
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
                A partner, <span className="gradient-text">not a vendor</span>
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                With 15+ years of combined UAE experience, we combine consultancy with technology to
                deliver a premium, transparent, and long-term partnership.
              </p>
            </div>
            <ul className="space-y-3">
              {config.whyUs.map((w) => (
                <li
                  key={w}
                  className="glass-card rounded-xl px-5 py-4 flex items-start gap-3 hover-lift"
                >
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CLIENT PORTAL */}
      <section className="relative py-20 md:py-28 border-t border-white/5 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${config.accentColor} 0%, transparent 70%)`,
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="glass-card grad-border rounded-3xl p-8 md:p-12 reveal">
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-4">
                  <LayoutDashboard className="w-3 h-3" /> Client Portal
                </div>
                <h3 className="text-2xl md:text-4xl font-semibold leading-[1.1]">
                  Track every stage <span className="gradient-text">digitally</span>
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl">
                  {config.portalNote}
                </p>
                <ul className="mt-6 grid sm:grid-cols-2 gap-2.5">
                  {[
                    "Track real-time progress",
                    "Upload & manage documents",
                    "Receive updates instantly",
                    "Monitor every stage",
                    "Manage requests digitally",
                    "Lifetime portal access",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[13px] text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-medium hover:border-gold/40 transition whitespace-nowrap"
              >
                Access Portal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 md:py-28 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center reveal">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
              <span className="w-8 h-px bg-gold" /> FAQ
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
              Questions, <span className="gradient-text">answered clearly</span>
            </h2>
          </div>
          <div className="mt-12 reveal">
            <Accordion type="single" collapsible className="space-y-3">
              {config.faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="glass-card rounded-2xl px-5 border-0"
                >
                  <AccordionTrigger className="text-left text-base font-medium hover:no-underline hover:text-gold py-5">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-sm">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 border-t border-white/5 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${config.accentColor} 0%, transparent 70%)`,
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center reveal">
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
            Ready to <span className="gradient-text">move forward?</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
            Book a free consultation. We'll map your structure, timeline, and a clear path to
            execution — no obligations.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setBooking(true)}
              className="inline-flex items-center gap-2 rounded-full gold-gradient px-7 py-3.5 text-sm font-semibold text-[oklch(0.15_0.02_260)] hover:scale-[1.02] transition"
            >
              Book Free Consultation <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-full glass-strong px-7 py-3.5 text-sm font-medium hover:border-gold/40 transition"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
