import { Link } from "@tanstack/react-router";
import {
  Check,
  ArrowRight,
  Sparkles,
  Globe,
  ShieldCheck,
  Users,
  FileCheck,
  Monitor,
  Landmark,
  Headphones,
  MessageCircle,
  Calendar,
} from "lucide-react";

interface PricingOfferProps {
  id?: string;
  onStartSetup?: () => void;
}

const TIERS = [
  {
    title: "Starter UAE Setup",
    price: "From AED 4,999",
    features: [
      "UAE business license",
      "Basic setup consultation",
      "Activity guidance",
      "Digital onboarding",
      "Upgrade anytime",
    ],
    cta: "Explore Starter Setup",
    href: "/packages",
    popular: false,
  },
  {
    title: "Remote UAE Setup",
    price: "From AED 13,900",
    features: [
      "Remote company incorporation",
      "Banking preparation assistance",
      "Establishment card",
      "Client portal access",
      "Free professional website included",
    ],
    cta: "Start Remote Setup",
    href: "/remote-company-setup",
    popular: true,
  },
  {
    title: "Premium UAE Structure",
    price: "Custom Setup",
    features: [
      "Residency & relocation support",
      "Banking preparation strategy",
      "Compliance support",
      "Operational infrastructure",
      "AI business advisor",
    ],
    cta: "Talk to an Advisor",
    href: "/#contact",
    popular: false,
  },
] as const;

const VALUE_HIGHLIGHTS = [
  {
    icon: Monitor,
    title: "Free Professional Website Included",
    description:
      "Every Soft Bridge client receives a modern, mobile-responsive business website built for credibility and growth.",
  },
  {
    icon: Landmark,
    title: "Free UAE Tax Registration",
    description:
      "We assist with UAE corporate tax registration and onboarding guidance at no extra service charge.",
  },
  {
    icon: Headphones,
    title: "Real Human Support",
    description:
      "Our team stays with clients after setup — renewals, banking preparation, compliance coordination, and operational guidance.",
  },
] as const;

const TRUST_CHECKS = [
  "UAE-based support team",
  "International founders welcome",
  "Banking preparation assistance",
  "Free website included",
  "Free tax registration support",
] as const;

export function PricingOffer({ id = "pricing-offer", onStartSetup }: PricingOfferProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-white via-violet-50/30 to-white"
    >
      {/* Ambient glow top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, rgba(124,58,237,0.08), transparent 70%)",
        }}
      />

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white ring-1 ring-violet-200 text-xs font-medium text-violet-700 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Complete UAE Business Launch
          </div>

          <h2
            id={`${id}-title`}
            className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.05]"
          >
            Start your UAE business from{" "}
            <span className="block md:inline bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent text-5xl md:text-6xl lg:text-7xl font-bold">
              AED 4,999
            </span>
          </h2>

          <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Formation, compliance, banking preparation, and digital infrastructure — handled through one strategic UAE partner.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {TIERS.map((t) => (
            <div
              key={t.title}
              className={[
                "group relative flex flex-col rounded-3xl bg-white p-8 transition-all duration-300",
                "hover:-translate-y-1",
                t.popular
                  ? "ring-2 ring-violet-500 shadow-[0_30px_80px_-30px_rgba(124,58,237,0.45)] md:scale-[1.03]"
                  : "ring-1 ring-slate-200 shadow-[0_10px_40px_-20px_rgba(15,23,42,0.15)] hover:ring-violet-300 hover:shadow-[0_25px_60px_-25px_rgba(124,58,237,0.35)]",
              ].join(" ")}
            >
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-[11px] font-semibold tracking-wide shadow-md">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-lg font-semibold text-slate-900">{t.title}</h3>
              <div className="mt-4">
                <div
                  className={[
                    "text-3xl md:text-4xl font-bold tracking-tight",
                    t.popular
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent"
                      : "text-slate-900",
                  ].join(" ")}
                >
                  {t.price}
                </div>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 text-violet-700 ring-1 ring-violet-200">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {t.cta === "Explore Starter Setup" && onStartSetup ? (
                <button
                  type="button"
                  onClick={onStartSetup}
                  className={[
                    "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all cursor-pointer",
                    t.popular
                      ? "bg-slate-900 text-white hover:bg-slate-800 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.5)]"
                      : "bg-white text-slate-900 ring-1 ring-slate-200 hover:ring-violet-400 hover:bg-violet-50",
                  ].join(" ")}
                >
                  {t.cta}
                  <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
                </button>
              ) : (
                <Link
                  to={t.href}
                  className={[
                    "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all",
                    t.popular
                      ? "bg-slate-900 text-white hover:bg-slate-800 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.5)]"
                      : "bg-white text-slate-900 ring-1 ring-slate-200 hover:ring-violet-400 hover:bg-violet-50",
                  ].join(" ")}
                >
                  {t.cta}
                  <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Value Highlights Row */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUE_HIGHLIGHTS.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="relative group rounded-2xl bg-white/80 backdrop-blur-sm ring-1 ring-slate-200/80 p-6 md:p-8 transition-all duration-300 hover:ring-violet-300 hover:shadow-[0_20px_60px_-20px_rgba(124,58,237,0.25)] hover:-translate-y-0.5"
                >
                  {/* subtle gradient orb */}
                  <div
                    aria-hidden
                    className="absolute -top-2 -right-2 w-20 h-20 rounded-full bg-gradient-to-br from-violet-200/40 to-fuchsia-200/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(124,58,237,0.5)] mb-5">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Row */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {TRUST_CHECKS.map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 text-sm text-slate-600"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
                  <Check className="w-3 h-3" />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-14 max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 ring-1 ring-violet-200/70 bg-gradient-to-r from-violet-50/80 via-white to-fuchsia-50/80 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(124,58,237,0.30)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  "radial-gradient(40% 80% at 100% 50%, rgba(217,70,239,0.12), transparent 70%), radial-gradient(40% 80% at 0% 50%, rgba(124,58,237,0.12), transparent 70%)",
              }}
            />
            <div className="relative flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white ring-1 ring-violet-200 text-[11px] font-medium text-violet-700 mb-5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Not a formation seller — a strategic UAE partner
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 leading-tight">
                Launch your UAE business with a complete infrastructure partner
              </h3>
              <p className="mt-3 text-sm md:text-base text-slate-600 max-w-xl">
                License, banking, compliance, website, tax registration, and long-term support — all handled by one team.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                {onStartSetup ? (
                  <button
                    type="button"
                    onClick={onStartSetup}
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-slate-900 text-white px-7 py-3.5 text-sm font-semibold hover:bg-slate-800 transition-all shadow-[0_10px_30px_-10px_rgba(15,23,42,0.5)]"
                  >
                    Start Your Setup
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    to="/packages"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-slate-900 text-white px-7 py-3.5 text-sm font-semibold hover:bg-slate-800 transition-all shadow-[0_10px_30px_-10px_rgba(15,23,42,0.5)]"
                  >
                    Start Your Setup
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                <Link
                  to="/#contact"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-white text-slate-900 px-7 py-3.5 text-sm font-semibold ring-1 ring-slate-200 hover:ring-violet-300 hover:bg-violet-50 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  Book Consultation
                </Link>
                <a
                  href="https://wa.me/message/YOUR_WHATSAPP_NUMBER"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-emerald-50 text-emerald-700 px-7 py-3.5 text-sm font-semibold ring-1 ring-emerald-200 hover:bg-emerald-100 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Talk on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
