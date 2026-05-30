import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useBooking } from "@/lib/booking-context";


const VIOLET = "#7C3AED";
const VIOLET_SOFT = "#EDE9FE";

const PACKAGES = [
  {
    name: "Starter Setup",
    price: "From AED 4,999",
    desc: "The fastest path to your UAE company — ideal for solo founders and small teams.",
    features: [
      "UAE company formation",
      "Trade license",
      "Free tax registration support",
      "Free professional website",
      "Email support",
    ],
    featured: false,
  },
  {
    name: "All inclusive Business Structure",
    price: "From AED 18,900",
    desc: "Everything done for you — company, visa, banking, and digital presence. One package, zero surprises.",
    features: [
      "Company Formation & Trade License",
      "Establishment Card",
      "Emirates ID (EID)",
      "Residency Visa",
      "Free Tax Registration Support",
      "Free Professional Website",
      "Free Bank Account Assistance",
      "Dedicated Relationship Manager",
      "Long-Term Operational Support",
    ],
    featured: true,
  },
  {
    name: "Remote Business Setup",
    price: "From AED 13,900",
    desc: "Set up your UAE company without flying in",
    features: [
      "Everything in Starter",
      "Remote signing & document handling",
      "Free Tax Registration Support",
      "Banking preparation assistance",
      "Priority advisor support",
      "Free Professional Website",
      "Dedicated Relationship Manager",
      "Dedicated Email Support",
    ],
    featured: false,
    badge: "No Travel Required",
  },
];

export function Packages() {
  const { openBooking } = useBooking();

  return (
    <section
      id="packages"
      className="relative py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, #FAFAFE 0%, #ffffff 100%)" }}
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-violet-600 mb-5">
            <span className="w-8 h-px bg-violet-400" /> Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05] text-slate-900">
            Simple Packages.{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              No Confusion.
            </span>
          </h2>
          <p className="mt-5 text-slate-600 max-w-2xl leading-relaxed">
            Transparent pricing. No hidden fees. Pick what fits — upgrade anytime.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 items-stretch max-w-[480px] lg:max-w-none mx-auto">
          {PACKAGES.map((p, i) => {
            const featured = p.featured;
            return (
              <div
                key={p.name}
                className={`relative rounded-3xl p-7 md:p-8 flex flex-col h-full reveal bg-white ${
                  featured
                    ? "border-2 shadow-[0_30px_60px_-20px_rgba(124,58,237,0.35)]"
                    : "border border-slate-200 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.08)]"
                }`}
                style={{
                  ...(featured ? { borderColor: VIOLET } : {}),
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {featured && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-white"
                    style={{ background: VIOLET }}
                  >
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </div>
                )}
                {!featured && p.badge && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-white shadow-sm"
                    style={{ background: "linear-gradient(135deg, #FCD34D 0%, #D97706 100%)" }}
                  >
                    <Sparkles className="w-3 h-3" /> {p.badge}
                  </div>
                )}

                <div className="text-[13px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                  {p.name}
                </div>
                <div className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                  {p.price}
                </div>
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

                <div className="mt-auto pt-8">
                  {featured ? (
                    <button
                      type="button"
                      onClick={openBooking}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_15px_40px_-12px_rgba(124,58,237,0.6)] hover:shadow-[0_20px_50px_-10px_rgba(124,58,237,0.8)] transition"
                      style={{ background: `linear-gradient(135deg, ${VIOLET} 0%, #5B21B6 100%)` }}
                    >
                      Book Free Consultation
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={openBooking}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white px-6 py-3.5 text-[14px] font-semibold hover:bg-slate-800 transition"
                    >
                      Book Free Consultation
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center reveal">
          <Link
            to="/start"
            className="group inline-flex items-center gap-2 text-[14px] font-semibold text-violet-700 hover:text-violet-900 transition"
          >
            See full package details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
