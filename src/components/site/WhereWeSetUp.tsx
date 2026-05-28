import { Link } from "@tanstack/react-router";
import { MapPin, ArrowRight, Sparkles } from "lucide-react";
import { UAE_LOCATIONS } from "@/lib/uae-locations";
import { EMIRATE_BY_KEY } from "@/lib/emirates";

export function WhereWeSetUp() {
  return (
    <section
      id="locations"
      className="relative py-24 md:py-32 border-t border-white/5 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-32 right-0 w-[700px] h-[700px] rounded-full blur-[120px] opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.66 0.22 285 / 0.5) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> Where We Set Up Companies
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
            UAE company formation across{" "}
            <span className="gradient-text">mainland & leading free zones</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl">
            Soft Bridge assists with UAE company formation across selected
            mainland jurisdictions and leading UAE free zones — chosen to match
            your activity, banking, and residency goals.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {UAE_LOCATIONS.map((group, i) => {
            const page = EMIRATE_BY_KEY[group.emirate];
            const CardInner = (
              <>
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(400px circle at 50% 0%, oklch(0.66 0.22 285 / 0.18), transparent 60%)",
                  }}
                />
                <div className="relative w-11 h-11 rounded-xl glass flex items-center justify-center mb-5 group-hover:border-gold/40 transition">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <h3 className="relative text-[15px] font-semibold">
                  {group.emirate}
                </h3>
                <p className="relative mt-1 text-[12px] text-muted-foreground">
                  {group.tagline}
                </p>
                <ul className="relative mt-4 space-y-1.5">
                  {group.jurisdictions.slice(0, 5).map((j) => (
                    <li
                      key={j.name}
                      className="text-[12.5px] text-foreground/80 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-gold/70" />
                      {j.name}
                    </li>
                  ))}
                  {group.jurisdictions.length > 5 && (
                    <li className="text-[11.5px] text-muted-foreground pl-3">
                      +{group.jurisdictions.length - 5} more
                    </li>
                  )}
                </ul>
                {page && (
                  <div className="relative mt-5 inline-flex items-center gap-1 text-[12px] font-medium text-gold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition">
                    Explore emirate <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </>
            );
            const className =
              "group glass-card grad-border rounded-2xl p-6 hover-lift reveal relative overflow-hidden block cursor-pointer hover:shadow-[0_0_30px_-8px_rgba(140,120,255,0.45)] transition";
            return page ? (
              <Link
                key={group.emirate}
                to={page.path}
                className={className}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {CardInner}
              </Link>
            ) : (
              <div
                key={group.emirate}
                className={className}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {CardInner}
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 reveal">
          <Link
            to="/services/uae-company-formation-locations"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass border border-white/10 hover:border-gold/40 transition text-sm"
          >
            Explore all jurisdictions <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/advisor"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-violet-500/20 to-amber-400/10 border border-white/10 hover:border-gold/50 transition text-sm"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            Not sure where to set up? Ask the AI Advisor
          </Link>
        </div>
      </div>
    </section>
  );
}
