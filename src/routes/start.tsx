import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  MessageCircle,
  ShieldCheck,
  Building2,
  Wallet,
  FileText,
  Globe,
  IdCard,
  HeartHandshake,
  Sparkles,
  Star,
  Phone,
  Mail,
  ChevronDown,
  Laptop,
  Smartphone,
  Clock,
  Users,
  Zap,
  Lock,
} from "lucide-react";
import { SITE, WA_LINK } from "@/lib/site";
import skyline from "@/assets/dubai-skyline.webp";
import logo from "@/assets/logo-sb.webp";
import freeWebsiteShowcase from "@/assets/free-website-showcase.png";

export const Route = createFileRoute("/start")({
  head: () => ({
    meta: [
      { title: "Start Your UAE Company From AED 4,999 — Soft Bridge" },
      {
        name: "description",
        content:
          "Launch your UAE business with expert guidance, free tax registration support, a free professional website, and long-term business support. Remote or in-person setup.",
      },
      { property: "og:title", content: "Start Your UAE Company From AED 4,999" },
      {
        property: "og:description",
        content:
          "Premium UAE business setup with free website, free tax registration support, and banking preparation. Get a free consultation today.",
      },
    ],
  }),
  component: LandingPage,
});

/* ============================================================ */
/*  Reusable atoms — scoped to this landing page (light theme)  */
/* ============================================================ */

const VIOLET = "#7C3AED";
const VIOLET_SOFT = "#EDE9FE";
const INK = "#0B0B14";

function PrimaryCTA({
  children,
  href,
  to,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  to?: string;
  className?: string;
}) {
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold text-white shadow-[0_18px_40px_-12px_rgba(124,58,237,0.55)] transition hover:shadow-[0_22px_48px_-12px_rgba(124,58,237,0.7)] hover:-translate-y-0.5 ${className}`;
  const style = {
    background: `linear-gradient(135deg, ${VIOLET} 0%, #5B21B6 100%)`,
  };
  if (to)
    return (
      <Link to={to} className={cls} style={style}>
        {children} <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
      </Link>
    );
  return (
    <a href={href} className={cls} style={style} target={href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      {children} <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
    </a>
  );
}

function SecondaryCTA({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-[15px] font-semibold text-slate-900 border border-slate-200 shadow-[0_4px_14px_-4px_rgba(15,23,42,0.08)] hover:border-violet-300 hover:text-violet-700 transition"
    >
      <MessageCircle className="w-4 h-4 text-emerald-500" /> {children}
    </a>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-700">
      <span className="w-1.5 h-1.5 rounded-full bg-violet-600" /> {children}
    </div>
  );
}

/* ============================================================ */
/*  Page                                                        */
/* ============================================================ */

function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased" style={{ color: INK }}>
      <LandingHeader />
      <main>
        <Hero />
        <WhatsIncluded />
        <Pricing />
        <WhySoftBridge />
        <Process />
        <FreeWebsite />
        <Trust />
        <FAQ />
        <FinalCTA />
      </main>
      <LandingFooter />
      <StickyMobileCTA />
    </div>
  );
}

/* ============================================================ */
/*  Minimal header (landing-specific — no main nav)             */
/* ============================================================ */

function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Soft Bridge" className="h-8 w-auto" width={32} height={32} />
          <span className="font-semibold tracking-tight text-[15px]">Soft Bridge</span>
        </Link>
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-violet-700 transition"
          >
            <Phone className="w-4 h-4" /> {SITE.phone}
          </a>
          <PrimaryCTA to="/quote" className="!px-5 !py-2.5 !text-sm">
            Get Free Consultation
          </PrimaryCTA>
        </div>
      </div>
    </header>
  );
}

/* ============================================================ */
/*  HERO                                                        */
/* ============================================================ */

function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.10) 0%, transparent 60%), linear-gradient(180deg, #ffffff 0%, #FAFAFE 100%)",
      }}
    >
      {/* soft grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at top, black 30%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-16 md:pt-24 pb-16 md:pb-24 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Copy */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-violet-700 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> Limited offer — Setup from AED 4,999
          </div>

          <h1 className="mt-6 text-[2.4rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] leading-[1.02] font-semibold tracking-tight">
            Start Your UAE Company{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)" }}
            >
              From AED 4,999
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-[17px] md:text-lg leading-relaxed text-slate-600">
            Launch your UAE business with expert guidance, free tax registration support, a free
            professional website, and long-term business support.
          </p>

          <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3 max-w-xl">
            {[
              "Free Professional Website",
              "Free Tax Registration Support",
              "Banking Preparation Assistance",
              "Remote or In-Person Setup",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[14px] text-slate-700">
                <span
                  className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: VIOLET_SOFT }}
                >
                  <Check className="w-3 h-3" style={{ color: VIOLET }} strokeWidth={3} />
                </span>
                <span className="font-medium">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <PrimaryCTA to="/quote">Get Free Consultation</PrimaryCTA>
            <SecondaryCTA href={WA_LINK}>Talk on WhatsApp</SecondaryCTA>
          </div>

          <div className="mt-7 flex items-center gap-5 text-[12px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-white"
                    style={{
                      background: `linear-gradient(135deg, hsl(${260 + i * 12} 70% 65%), hsl(${280 + i * 10} 65% 55%))`,
                    }}
                  />
                ))}
              </div>
              <span className="ml-1">250+ businesses launched</span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1">Rated by founders worldwide</span>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      {/* glow */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[40px] blur-2xl opacity-60"
        style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.25), transparent 70%)" }}
      />

      {/* Skyline backdrop card */}
      <div className="relative rounded-[28px] overflow-hidden border border-slate-200 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)] bg-white">
        <div className="relative aspect-[4/3] sm:aspect-[5/4]">
          <img
            src={skyline}
            alt="Dubai skyline — Soft Bridge UAE business setup"
            className="absolute inset-0 w-full h-full object-cover"
            width={800}
            height={640}
            loading="eager"
            decoding="async"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.85) 100%), linear-gradient(135deg, rgba(124,58,237,0.25), transparent 60%)",
            }}
          />

          {/* Floating dashboard card */}
          <div className="absolute left-5 right-5 bottom-5 sm:left-7 sm:right-7 sm:bottom-7 rounded-2xl bg-white/95 backdrop-blur border border-slate-200 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg grid place-items-center" style={{ background: VIOLET_SOFT }}>
                  <Building2 className="w-3.5 h-3.5" style={{ color: VIOLET }} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Client Portal</div>
                  <div className="text-[13px] font-semibold">Setup in progress</div>
                </div>
              </div>
              <div className="text-[11px] font-semibold px-2 py-1 rounded-full" style={{ background: VIOLET_SOFT, color: VIOLET }}>
                73%
              </div>
            </div>
            <div className="relative h-1.5 rounded-full bg-slate-100 overflow-hidden mb-3">
              <div className="absolute inset-y-0 left-0 w-[73%] rounded-full" style={{ background: VIOLET }} />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { l: "License", v: "✓" },
                { l: "Visa", v: "•••" },
                { l: "Banking", v: "—" },
              ].map((s) => (
                <div key={s.l} className="rounded-lg bg-slate-50 py-2">
                  <div className="text-[14px] font-semibold text-slate-800">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating trust chip */}
      <div className="absolute -top-3 -right-3 sm:top-4 sm:-right-4 rounded-2xl bg-white border border-slate-200 shadow-lg px-3.5 py-2.5 flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl grid place-items-center" style={{ background: VIOLET_SOFT }}>
          <ShieldCheck className="w-4 h-4" style={{ color: VIOLET }} />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-slate-500">IFZA Registered</div>
          <div className="text-[12px] font-semibold">UAE Entity</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  WHAT'S INCLUDED                                             */
/* ============================================================ */

const INCLUDED = [
  { icon: Building2, title: "Company Formation", text: "Free zone or mainland — structured the right way from day one." },
  { icon: FileText, title: "Business License", text: "Full license issuance and trade name reservation handled end-to-end." },
  { icon: Wallet, title: "Banking Preparation", text: "Documentation and introductions to UAE-friendly banks." },
  { icon: FileText, title: "Free Tax Registration Support", text: "Corporate tax and VAT registration support — included." },
  { icon: Globe, title: "Free Professional Website", text: "A mobile-responsive business website, designed and delivered." },
  { icon: IdCard, title: "Residency & Emirates ID", text: "Visa coordination, medical, and Emirates ID — all managed." },
  { icon: HeartHandshake, title: "Long-Term Support", text: "Renewals, compliance, and operational help year after year." },
];

function WhatsIncluded() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow>What&apos;s Included</SectionEyebrow>
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Everything You Need To Launch In The UAE
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            One transparent package — formation, banking prep, tax support, website, and long-term support.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INCLUDED.map((it) => (
            <div
              key={it.title}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-[0_18px_40px_-20px_rgba(124,58,237,0.35)] transition"
            >
              <div
                className="w-11 h-11 rounded-xl grid place-items-center mb-5 transition group-hover:scale-105"
                style={{ background: VIOLET_SOFT }}
              >
                <it.icon className="w-5 h-5" style={{ color: VIOLET }} />
              </div>
              <h3 className="text-[16px] font-semibold">{it.title}</h3>
              <p className="mt-2 text-[14px] text-slate-600 leading-relaxed">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  PRICING                                                     */
/* ============================================================ */

const PACKAGES = [
  {
    name: "Starter Setup",
    price: "From AED 4,999",
    desc: "The fastest path to your UAE company — ideal for solo founders and small teams.",
    features: ["UAE company formation", "Trade license", "Free tax registration support", "Free professional website", "Email support"],
    featured: false,
  },
  {
    name: "Remote Business Setup",
    price: "From AED 13,900",
    desc: "Set up your UAE company without flying in. Visa, banking prep, and Emirates ID coordinated.",
    features: ["Everything in Starter", "Remote signing & document handling", "Residency visa & Emirates ID", "Banking preparation assistance", "Priority advisor support"],
    featured: true,
  },
  {
    name: "Custom Business Structure",
    price: "Custom Quote",
    desc: "For groups, holdings, multi-shareholder setups, or regulated activities.",
    features: ["Tailored corporate structure", "Multi-shareholder & holding setups", "Regulated activity guidance", "Dedicated relationship manager", "Long-term operational support"],
    featured: false,
  },
];

function Pricing() {
  return (
    <section
      id="pricing"
      className="py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #FAFAFE 0%, #ffffff 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow>Pricing</SectionEyebrow>
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Simple Packages. No Confusion.
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Transparent pricing. No hidden fees. Pick what fits — upgrade anytime.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {PACKAGES.map((p) => {
            const featured = p.featured;
            return (
              <div
                key={p.name}
                className={`relative rounded-3xl p-7 md:p-8 flex flex-col ${
                  featured
                    ? "border-2 shadow-[0_30px_60px_-20px_rgba(124,58,237,0.35)]"
                    : "border border-slate-200 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.08)]"
                } bg-white`}
                style={featured ? { borderColor: VIOLET } : undefined}
              >
                {featured && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-white"
                    style={{ background: VIOLET }}
                  >
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </div>
                )}
                <div className="text-[13px] font-semibold uppercase tracking-[0.15em] text-slate-500">{p.name}</div>
                <div className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{p.price}</div>
                <p className="mt-3 text-[14px] text-slate-600 leading-relaxed">{p.desc}</p>

                <ul className="mt-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] text-slate-700">
                      <span
                        className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: VIOLET_SOFT }}
                      >
                        <Check className="w-3 h-3" style={{ color: VIOLET }} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-2">
                  {featured ? (
                    <PrimaryCTA to="/quote" className="w-full">
                      Get Free Consultation
                    </PrimaryCTA>
                  ) : (
                    <Link
                      to="/quote"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white px-6 py-3.5 text-[14px] font-semibold hover:bg-slate-800 transition"
                    >
                      Get Free Consultation
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  WHY SOFT BRIDGE                                             */
/* ============================================================ */

function WhySoftBridge() {
  const items = [
    { title: "Renewals", text: "Stay compliant — we handle annual license renewals." },
    { title: "Compliance", text: "Tax filings, ESR, UBO — we keep your entity in good standing." },
    { title: "Banking Preparation", text: "Ongoing support with banks, payments, and merchant setup." },
    { title: "Operational Support", text: "Day-to-day help so you can focus on running your business." },
    { title: "Website Development", text: "Modern websites, landing pages, and CMS — by our in-house team." },
    { title: "Digital Growth", text: "Branding, ads, and digital infrastructure to grow online." },
  ];
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <SectionEyebrow>Why Soft Bridge</SectionEyebrow>
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            More Than A Company Formation Provider
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            We don&apos;t disappear after your license is issued. Soft Bridge is built to be your long-term
            partner — from formation through compliance, banking, and digital growth.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryCTA to="/quote">Get Free Consultation</PrimaryCTA>
            <SecondaryCTA href={WA_LINK}>Talk on WhatsApp</SecondaryCTA>
          </div>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {items.map((it) => (
            <div key={it.title} className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-violet-300 transition">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full" style={{ background: VIOLET }} />
                <h4 className="text-[15px] font-semibold">{it.title}</h4>
              </div>
              <p className="mt-2 text-[13.5px] text-slate-600 leading-relaxed">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  PROCESS                                                     */
/* ============================================================ */

const STEPS = [
  { n: "01", title: "Free Consultation", text: "Tell us your goals. We recommend the right structure and jurisdiction." },
  { n: "02", title: "Choose Jurisdiction", text: "Free zone or mainland — chosen for cost, scope, and growth." },
  { n: "03", title: "Documentation & Approval", text: "We prepare and submit everything. You sign — we handle the rest." },
  { n: "04", title: "Business Ready", text: "License, residency, banking prep, and your free website — delivered." },
];

function Process() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #FAFAFE 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow>Our Process</SectionEyebrow>
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Launch In 4 Simple Steps
          </h2>
        </div>

        <div className="relative mt-14">
          {/* connecting line */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-7 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #DDD6FE, #DDD6FE, transparent)" }}
          />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-[0_18px_40px_-20px_rgba(124,58,237,0.35)] transition"
              >
                <div
                  className="w-14 h-14 rounded-2xl grid place-items-center mb-5 text-white font-semibold text-[15px] shadow-[0_10px_24px_-10px_rgba(124,58,237,0.55)]"
                  style={{ background: `linear-gradient(135deg, ${VIOLET}, #5B21B6)` }}
                >
                  {s.n}
                </div>
                <h3 className="text-[16px] font-semibold">{s.title}</h3>
                <p className="mt-2 text-[14px] text-slate-600 leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  FREE WEBSITE OFFER                                          */
/* ============================================================ */

function FreeWebsite() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Link
          to="/quote"
          className="block relative overflow-hidden rounded-[32px] shadow-2xl ring-1 ring-violet-900/10 group"
        >
          <img
            src={freeWebsiteShowcase}
            alt="Every client receives a free professional website — modern, mobile-responsive design by Soft Bridge"
            className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.01]"
            loading="lazy"
            decoding="async"
          />
        </Link>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  TRUST                                                       */
/* ============================================================ */

const TRUST = [
  { icon: Globe, title: "Remote setup available", text: "Launch from anywhere — no UAE visit required." },
  { icon: Users, title: "International clients welcome", text: "Founders from 10+ countries trust Soft Bridge." },
  { icon: HeartHandshake, title: "Dedicated support team", text: "Real humans, not chatbots — assigned to your case." },
  { icon: Zap, title: "Fast response times", text: "Replies within hours, not days." },
  { icon: Lock, title: "Transparent pricing", text: "What you see is what you pay. No surprises." },
];

function Trust() {
  return (
    <section className="py-20 md:py-28" style={{ background: "linear-gradient(180deg, #FAFAFE 0%, #ffffff 100%)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow>Built For Founders</SectionEyebrow>
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Built For International Founders
          </h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TRUST.map((t) => (
            <div key={t.title} className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-violet-300 transition">
              <div className="w-10 h-10 rounded-xl grid place-items-center mb-4" style={{ background: VIOLET_SOFT }}>
                <t.icon className="w-4 h-4" style={{ color: VIOLET }} />
              </div>
              <h4 className="text-[14px] font-semibold">{t.title}</h4>
              <p className="mt-1.5 text-[13px] text-slate-600 leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  FAQ                                                         */
/* ============================================================ */

const FAQS = [
  {
    q: "Can I open a UAE company remotely?",
    a: "Yes. Most of our clients open their UAE company without flying in. We coordinate signing, documentation, residency, and Emirates ID remotely.",
  },
  {
    q: "How long does setup take?",
    a: "License issuance typically takes 5–10 working days. Residency and Emirates ID add 1–2 weeks depending on jurisdiction and visa type.",
  },
  {
    q: "Do I need to visit the UAE?",
    a: "Not for company formation. A short visit may be required for biometrics and banking — but it can usually be completed in 2–3 days.",
  },
  {
    q: "Can you help with banking?",
    a: "Yes. We prepare your documentation, structure your business profile, and make introductions to UAE-friendly banks to maximize approval chances.",
  },
  {
    q: "What is included in the free website?",
    a: "A modern, mobile-responsive business website with custom design, lead capture form, and SEO foundations — built and delivered by our team.",
  },
  {
    q: "What is included in tax registration support?",
    a: "We support your corporate tax and VAT registration with the UAE Federal Tax Authority and guide you on compliance basics post-registration.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="text-[16px] font-semibold text-slate-900 group-hover:text-violet-700 transition">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-slate-400 transition ${isOpen ? "rotate-180 text-violet-700" : ""}`}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-10 text-[14.5px] text-slate-600 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  FINAL CTA                                                   */
/* ============================================================ */

function FinalCTA() {
  return (
    <section
      id="consult"
      className="py-20 md:py-28"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(124,58,237,0.10) 0%, transparent 60%), linear-gradient(180deg, #ffffff 0%, #FAFAFE 100%)",
      }}
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <SectionEyebrow>Get Started</SectionEyebrow>
        <h2 className="mt-5 text-3xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
          Ready To Launch Your{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)" }}
          >
            UAE Business?
          </span>
        </h2>
        <p className="mt-6 text-slate-600 text-[16px] md:text-lg leading-relaxed max-w-xl mx-auto">
          Speak with a Soft Bridge advisor today — free consultation, no obligation.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <PrimaryCTA to="/quote">Get Free Consultation</PrimaryCTA>
          <SecondaryCTA href={WA_LINK}>WhatsApp Us</SecondaryCTA>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[13px] text-slate-500">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" style={{ color: VIOLET }} /> Reply within 1 business day
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" style={{ color: VIOLET }} /> 100% confidential
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: VIOLET }} /> Free consultation
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  FOOTER (minimal — landing pages convert better with less)   */
/* ============================================================ */

function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-5 text-[13px] text-slate-500">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Soft Bridge" className="h-7 w-auto" width={28} height={28} />
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-5">
          <a href={`mailto:${SITE.email}`} className="hover:text-violet-700 transition inline-flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> {SITE.email}
          </a>
          <a href={`tel:${SITE.phoneRaw}`} className="hover:text-violet-700 transition inline-flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" /> {SITE.phone}
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================ */
/*  Sticky mobile CTA                                           */
/* ============================================================ */

function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden border-t border-slate-200 bg-white/95 backdrop-blur p-3 flex gap-2 shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.15)]">
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-3 text-[13px] font-semibold text-slate-800"
      >
        <MessageCircle className="w-4 h-4 text-emerald-500" /> WhatsApp
      </a>
      <Link
        to="/quote"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-[13px] font-semibold text-white"
        style={{ background: `linear-gradient(135deg, ${VIOLET} 0%, #5B21B6 100%)` }}
      >
        Free Consultation <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
