import { Link } from "@tanstack/react-router";
import { Check, ArrowRight, Sparkles, Globe } from "lucide-react";

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

export function PricingOffer({ id = "pricing-offer", onStartSetup }: PricingOfferProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-white via-violet-50/40 to-white"
    >
      {/* soft ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(124,58,237,0.10), transparent 70%)",
        }}
      />

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white ring-1 ring-violet-200 text-xs font-medium text-violet-700 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent UAE Pricing
          </div>

          <h2
            id={`${id}-title`}
            className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.05]"
          >
            Start your UAE company from{" "}
            <span className="block md:inline bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent text-5xl md:text-6xl lg:text-7xl font-bold">
              AED 4,999
            </span>
          </h2>

          <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed">
            Flexible UAE business setup solutions for founders, freelancers,
            startups, and international entrepreneurs.
          </p>
        </div>

        {/* Cards */}
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

        {/* Free Website Banner */}
        <div className="mt-14 max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 ring-1 ring-violet-200/70 bg-gradient-to-r from-violet-50 via-white to-fuchsia-50 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(124,58,237,0.35)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(40% 80% at 100% 50%, rgba(217,70,239,0.18), transparent 70%), radial-gradient(40% 80% at 0% 50%, rgba(124,58,237,0.18), transparent 70%)",
              }}
            />
            <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-8">
              {/* Mockup */}
              <div className="shrink-0">
                <div className="w-44 h-28 md:w-56 md:h-36 rounded-xl bg-white ring-1 ring-slate-200 shadow-lg overflow-hidden">
                  <div className="h-4 bg-slate-100 flex items-center gap-1 px-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="p-3 space-y-1.5">
                    <div className="h-2 w-2/3 rounded bg-gradient-to-r from-violet-400 to-fuchsia-400" />
                    <div className="h-1.5 w-full rounded bg-slate-200" />
                    <div className="h-1.5 w-5/6 rounded bg-slate-200" />
                    <div className="mt-2 flex gap-1.5">
                      <div className="h-6 w-12 rounded bg-violet-500/80" />
                      <div className="h-6 w-10 rounded bg-slate-200" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-violet-700 text-xs font-medium">
                  <Globe className="w-3.5 h-3.5" />
                  Included with every setup
                </div>
                <h3 className="mt-2 text-xl md:text-2xl font-semibold text-slate-900">
                  Every Soft Bridge client receives a free professional business website.
                </h3>
                <p className="mt-2 text-sm md:text-base text-slate-600">
                  Mobile responsive • modern design • business-ready • optimized for growth
                </p>
              </div>

              <Link
                to="/#contact"
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-6 py-3 text-sm font-semibold hover:bg-slate-800 transition-all shadow-[0_10px_30px_-10px_rgba(15,23,42,0.5)] w-full md:w-auto justify-center"
              >
                Claim Your Free Website
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
