import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Globe,
  Shield,
  Building2,
  CreditCard,
  IdCard,
  FileCheck2,
  LayoutDashboard,
  Headphones,
  Rocket,
  Clock,
  Wifi,
  Lock,
  Wand2,
  Smartphone,
  MonitorSmartphone,
  Zap,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Particles } from "@/components/site/Particles";
import { OnboardingDialog } from "@/components/site/OnboardingDialog";
import { BookingDialog } from "@/components/site/BookingDialog";
import { useReveal } from "@/hooks/use-reveal";

const CANONICAL = "https://bridge-to-success-web.lovable.app/remote-company-setup";
const TITLE = "Remote UAE Company Setup + Corporate Bank Account — Soft Bridge";
const DESC =
  "Incorporate your UAE company remotely with IFZA or Meydan and receive corporate banking assistance — no physical UAE visit required. Built for global founders.";

export const Route = createFileRoute("/remote-company-setup")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "UAE company setup remotely, open UAE company online, Dubai company without visiting UAE, UAE corporate bank account, IFZA remote company setup, Meydan remote setup, UAE free zone company formation",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "product" },
      { property: "og:url", content: CANONICAL },
      { property: "twitter:title", content: TITLE },
      { property: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Remote UAE Company Setup + Corporate Bank Account",
          provider: { "@type": "Organization", name: "Soft Bridge FZE LLC" },
          areaServed: "United Arab Emirates",
          description: DESC,
          offers: [
            {
              "@type": "Offer",
              name: "IFZA Remote Setup",
              price: "13900",
              priceCurrency: "AED",
            },
            {
              "@type": "Offer",
              name: "Meydan Remote Setup",
              price: "15900",
              priceCurrency: "AED",
            },
          ],
        }),
      },
    ],
  }),
  component: RemoteCompanySetup,
});

const IFZA_INCLUDES = [
  "UAE company formation",
  "Remote incorporation support",
  "Corporate banking assistance",
  "Trade license",
  "Establishment card",
  "Business consultation",
  "Onboarding support",
  "Secure client portal access",
];

const MEYDAN_INCLUDES = [
  "UAE company formation",
  "Remote incorporation support",
  "Corporate banking assistance",
  "Trade license",
  "Establishment card",
  "Premium onboarding support",
  "Secure client portal access",
];

const PORTAL_STAGES = [
  { label: "Initial Approval", icon: FileCheck2 },
  { label: "Trade Name Reservation", icon: Sparkles },
  { label: "License Issuance", icon: Building2 },
  { label: "Establishment Card", icon: IdCard },
  { label: "Banking Assistance", icon: CreditCard },
  { label: "Ongoing Support", icon: Headphones },
];

const GLOBAL_PILLARS = [
  {
    icon: Globe,
    title: "Launch from anywhere",
    text: "Founders from 40+ countries incorporate without boarding a flight to Dubai.",
  },
  {
    icon: Wifi,
    title: "100% digital onboarding",
    text: "KYC, signatures, and document collection handled inside your secure portal.",
  },
  {
    icon: Wand2,
    title: "AI-assisted workflows",
    text: "Our advisor recommends the right structure, jurisdiction, and bank pairing for your model.",
  },
  {
    icon: Lock,
    title: "Bank-grade security",
    text: "Encrypted document vault, OTP-verified access, and audited compliance trails.",
  },
];

function RemoteCompanySetup() {
  useReveal();
  const [onboarding, setOnboarding] = useState(false);
  const [booking, setBooking] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <Header />
      <FloatingActions />
      <OnboardingDialog open={onboarding} onOpenChange={setOnboarding} />
      <BookingDialog open={booking} onOpenChange={setBooking} />

      {/* HERO */}
      <section className="relative pt-32 md:pt-44 pb-24 md:pb-32 overflow-hidden">
        <Particles count={14} />
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full blur-[120px] opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.66 0.22 285 / 0.45) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute top-40 -right-32 w-[520px] h-[520px] rounded-full blur-[110px] opacity-25 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.82 0.14 290 / 0.55) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-strong rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-gold mb-7"
          >
            <Globe className="w-3 h-3" />
            Remote UAE Setup · IFZA & Meydan
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight max-w-4xl mx-auto"
          >
            Start Your UAE Company{" "}
            <span className="gradient-text">Remotely</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Incorporate your UAE company and receive corporate banking assistance —
            without being physically present in Dubai.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-[13px] text-muted-foreground/80 max-w-xl mx-auto"
          >
            Available through selected UAE free zones including{" "}
            <span className="text-gold font-medium">IFZA</span> and{" "}
            <span className="text-gold font-medium">Meydan</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={() => setOnboarding(true)}
              className="inline-flex items-center gap-2 rounded-full gold-gradient px-7 py-3.5 text-sm font-semibold hover:scale-[1.02] transition"
            >
              Start Your Remote Setup
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setBooking(true)}
              className="inline-flex items-center gap-2 rounded-full glass-strong px-7 py-3.5 text-sm font-medium hover:border-gold/40 transition"
            >
              Book Consultation
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto"
          >
            {[
              { i: Globe, t: "40+ countries served" },
              { i: Clock, t: "From 5–10 working days" },
              { i: Shield, t: "Compliance-first" },
              { i: Lock, t: "Encrypted portal" },
            ].map((b) => (
              <div
                key={b.t}
                className="glass rounded-2xl px-3 py-3 flex items-center gap-2 text-[11px] text-muted-foreground justify-center"
              >
                <b.i className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>{b.t}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section className="relative py-20 md:py-28 border-t border-white/5 overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="text-center reveal max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
              <span className="w-8 h-px bg-gold" /> Pricing
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
              Transparent, all-inclusive{" "}
              <span className="gradient-text">remote setup packages</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Pick your free zone. We handle incorporation, license, establishment
              card, and corporate banking introduction end-to-end.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <PricingCard
              jurisdiction="IFZA"
              title="IFZA Remote Setup"
              price="13,900"
              badge="Most Popular"
              accent="violet"
              includes={IFZA_INCLUDES}
              highlighted
              onStart={() => setOnboarding(true)}
            />
            <PricingCard
              jurisdiction="Meydan"
              title="Meydan Remote Setup"
              price="15,900"
              badge="Premium Option"
              accent="silver"
              includes={MEYDAN_INCLUDES}
              onStart={() => setOnboarding(true)}
            />
          </div>


          <p className="mt-8 text-center text-[12px] text-muted-foreground/80 max-w-2xl mx-auto">
            Prices in AED. Government fees, visa quotas, and add-on services are
            quoted transparently after a short eligibility check.
          </p>
        </div>
      </section>

      {/* FREE WEBSITE BONUS */}
      <section className="relative py-20 md:py-28 border-t border-white/5 overflow-x-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, oklch(0.66 0.22 285 / 0.5) 0%, transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 md:px-6">

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-gold mb-5">
                <Sparkles className="w-3 h-3" /> Bonus Included
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
                Free Professional{" "}
                <span className="gradient-text">Website Included</span>
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg">
                Every client who registers their company through Soft Bridge
                receives a professionally designed business website at no
                additional cost.
              </p>
              <ul className="mt-7 grid sm:grid-cols-2 gap-3">
                {[
                  { i: Smartphone, t: "Mobile responsive" },
                  { i: Zap, t: "Fast & lightweight" },
                  { i: MonitorSmartphone, t: "Modern design" },
                  { i: Rocket, t: "Business-ready" },
                ].map((b) => (
                  <li
                    key={b.t}
                    className="flex items-center gap-2.5 text-[13px] text-muted-foreground"
                  >
                    <span className="w-7 h-7 rounded-lg glass flex items-center justify-center">
                      <b.i className="w-3.5 h-3.5 text-gold" />
                    </span>
                    {b.t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal relative">
              <WebsiteMockup />
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL EXPERIENCE */}
      <section className="relative py-20 md:py-28 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl reveal">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
              <span className="w-8 h-px bg-gold" /> Global Founders
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
              Launch your UAE business{" "}
              <span className="gradient-text">from anywhere</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-2xl">
              Modern infrastructure for international founders. No physical UAE
              visit required for selected setups — everything is orchestrated
              digitally inside your secure portal.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GLOBAL_PILLARS.map((p, i) => (
              <div
                key={p.title}
                className="glass-card grad-border rounded-2xl p-6 hover-lift reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center mb-4">
                  <p.icon className="w-4 h-4 text-gold" />
                </div>
                <h3 className="text-[15px] font-semibold">{p.title}</h3>
                <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT PORTAL STAGES */}
      <section className="relative py-20 md:py-28 border-t border-white/5 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.66 0.22 285 / 0.4) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="glass-card grad-border rounded-3xl p-8 md:p-12 reveal">
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-4">
                  <LayoutDashboard className="w-3 h-3" /> Client Portal
                </div>
                <h3 className="text-2xl md:text-4xl font-semibold leading-[1.1]">
                  Track every stage of your{" "}
                  <span className="gradient-text">setup digitally</span>
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl">
                  Upload documents securely, receive updates instantly, and
                  monitor every milestone — from initial approval to your
                  corporate bank introduction.
                </p>
              </div>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-medium hover:border-gold/40 transition whitespace-nowrap self-start"
              >
                Access Portal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PORTAL_STAGES.map((s, i) => (
                <li
                  key={s.label}
                  className="glass rounded-2xl p-4 flex items-center gap-3"
                >
                  <span className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center text-[11px] font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="text-[13px] font-medium">{s.label}</div>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                      <s.icon className="w-3 h-3 text-gold/70" />
                      {i === PORTAL_STAGES.length - 1
                        ? "Lifetime"
                        : "Tracked live"}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="relative py-12 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 reveal">
          <div className="glass rounded-2xl p-6 flex items-start gap-4">
            <span className="w-9 h-9 rounded-xl glass flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-gold" />
            </span>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              <span className="text-foreground font-medium">Important: </span>
              Soft Bridge provides corporate banking assistance and onboarding
              preparation. Bank account approval remains subject to bank review
              and compliance requirements.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 border-t border-white/5 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.66 0.22 285 / 0.45) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center reveal">
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
            Ready to launch{" "}
            <span className="gradient-text">from anywhere?</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
            Verify your email, create a secure portal, and we'll guide your
            remote UAE setup from day one.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setOnboarding(true)}
              className="inline-flex items-center gap-2 rounded-full gold-gradient px-7 py-3.5 text-sm font-semibold hover:scale-[1.02] transition"
            >
              Start Your Remote Setup
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setBooking(true)}
              className="inline-flex items-center gap-2 rounded-full glass-strong px-7 py-3.5 text-sm font-medium hover:border-gold/40 transition"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ----------------------------- Pricing Card ----------------------------- */

function PricingCard({
  jurisdiction,
  title,
  price,
  badge,
  accent,
  includes,
  highlighted,
  onStart,
}: {
  jurisdiction: string;
  title: string;
  price: string;
  badge: string;
  accent: "violet" | "silver";
  includes: string[];
  highlighted?: boolean;
  onStart: () => void;
}) {
  const accentColor =
    accent === "violet"
      ? "oklch(0.66 0.22 285)"
      : "oklch(0.82 0.04 270)";

  return (
    <div
      className={`relative reveal rounded-3xl p-6 sm:p-8 md:p-9 w-full max-w-full box-border ${
        highlighted ? "glass-strong grad-border" : "glass-card"
      } hover-lift overflow-hidden`}
    >
      <div
        aria-hidden
        className="absolute -top-32 -right-24 w-[360px] h-[360px] rounded-full blur-[90px] opacity-40 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
        }}
      />
      <div className="relative min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span
            className="text-[10px] uppercase tracking-[0.22em] font-medium"
            style={{ color: accentColor }}
          >
            {jurisdiction}
          </span>
          <span
            className="text-[10px] uppercase tracking-[0.18em] glass rounded-full px-2.5 py-1 font-medium"
            style={{ color: accentColor }}
          >
            {badge}
          </span>
        </div>

        <h3 className="mt-5 text-2xl md:text-3xl font-semibold break-words">{title}</h3>

        <div className="mt-6 flex items-baseline gap-2 flex-wrap">
          <span className="text-[12px] text-muted-foreground">AED</span>
          <span
            className="font-semibold tracking-tight tabular-nums leading-none"
            style={{ fontSize: "clamp(32px, 10vw, 56px)" }}
          >
            {price}
          </span>
        </div>
        <p className="mt-2 text-[12px] text-muted-foreground">
          All-inclusive package · Government fees additional
        </p>

        <ul className="mt-8 space-y-3">
          {includes.map((it) => (
            <li key={it} className="flex items-start gap-2.5 text-[13.5px]">
              <CheckCircle2
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: accentColor }}
              />
              <span className="text-foreground/90 min-w-0 break-words">{it}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={onStart}
          className={`mt-9 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 min-h-[48px] text-sm font-semibold transition ${
            highlighted
              ? "gold-gradient hover:scale-[1.01]"
              : "glass-strong hover:border-gold/40"
          }`}
        >
          Start with {jurisdiction}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}


/* ---------------------------- Website Mockup ---------------------------- */

function WebsiteMockup() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] blur-2xl opacity-50"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.66 0.22 285 / 0.4) 0%, transparent 70%)",
        }}
      />
      <div className="relative glass-strong rounded-2xl overflow-hidden shadow-2xl">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          <div className="ml-3 flex-1 glass rounded-md px-3 py-1 text-[10px] text-muted-foreground">
            your-company.ae
          </div>
        </div>
        {/* Page */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md gold-gradient" />
              <div className="h-2.5 w-20 rounded-full bg-white/15" />
            </div>
            <div className="flex gap-2">
              <div className="h-2 w-10 rounded-full bg-white/10" />
              <div className="h-2 w-10 rounded-full bg-white/10" />
              <div className="h-2 w-12 rounded-full bg-white/15" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-3/4 rounded-md bg-white/20" />
            <div className="h-4 w-1/2 rounded-md gold-gradient opacity-90" />
          </div>
          <div className="h-2 w-full rounded-full bg-white/8" />
          <div className="h-2 w-5/6 rounded-full bg-white/8" />
          <div className="flex gap-2 pt-2">
            <div className="h-8 w-28 rounded-full gold-gradient" />
            <div className="h-8 w-24 rounded-full glass" />
          </div>
          <div className="grid grid-cols-3 gap-3 pt-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass rounded-xl h-20 p-3 space-y-2">
                <div className="w-6 h-6 rounded-md glass flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/15" />
                <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating mini card */}
      <div className="hidden md:block absolute -bottom-6 -left-6 glass-strong rounded-2xl p-4 w-48 shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Live
          </span>
        </div>
        <div className="mt-2 text-[12px] font-medium">Site shipped</div>
        <div className="text-[10px] text-muted-foreground">
          Delivered in 7 days
        </div>
      </div>
    </div>
  );
}
