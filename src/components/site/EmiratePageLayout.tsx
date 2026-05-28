import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  MapPin,
  Building2,
  CheckCircle2,
  Clock,
  Wallet,
  Landmark,
  IdCard,
  Briefcase,
  Globe,
  Info,
  CalendarClock,
  MessageCircle,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { useReveal } from "@/hooks/use-reveal";
import { BookingDialog } from "@/components/site/BookingDialog";
import { useState } from "react";
import { WA_LINK } from "@/lib/site";
import type { EmiratePage } from "@/lib/emirates";

export function EmiratePageLayout({ data }: { data: EmiratePage }) {
  useReveal();
  const [booking, setBooking] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.985_0.005_290)] text-foreground">
      <Header />
      <BookingDialog open={booking} onOpenChange={setBooking} />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage: `url(${data.hero.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background: `linear-gradient(180deg, oklch(1 0 0 / 0.55) 0%, oklch(1 0 0 / 0.85) 60%, oklch(0.985 0.005 290) 100%), radial-gradient(800px 400px at 80% 10%, ${data.hero.accent} / 0.18, transparent 70%)`,
            }}
          />
          <div className="relative mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-violet-200/60 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-violet-700 shadow-sm"
            >
              <Globe className="w-3 h-3" /> {data.hero.eyebrow}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight max-w-3xl"
            >
              {data.hero.headline.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="bg-gradient-to-r from-violet-600 via-violet-500 to-amber-500 bg-clip-text text-transparent">
                {data.hero.headline.split(" ").slice(-2).join(" ")}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed"
            >
              {data.hero.subtitle}
            </motion.p>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                { icon: Clock, label: "Setup speed", value: data.highlights.setupSpeed },
                { icon: Globe, label: "Remote setup", value: data.highlights.remoteSetup },
                { icon: Landmark, label: "Banking", value: data.highlights.banking },
                { icon: IdCard, label: "Visas", value: data.highlights.visa },
                { icon: Briefcase, label: "Ideal industries", value: data.highlights.industries },
              ].map((h, i) => (
                <div
                  key={h.label}
                  className="rounded-2xl border border-violet-200/60 bg-white/80 backdrop-blur-xl p-4 shadow-[0_8px_30px_-18px_oklch(0.55_0.2_295/0.3)] reveal"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-100 to-amber-50 border border-violet-200/60 flex items-center justify-center mb-2">
                    <h.icon className="w-4 h-4 text-violet-600" />
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-violet-600 font-semibold">
                    {h.label}
                  </div>
                  <div className="mt-1 text-[13px] text-foreground/85 leading-snug">{h.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FREE ZONES */}
        <section className="relative py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl reveal">
              <div className="text-[11px] uppercase tracking-[0.22em] text-violet-600 font-medium">
                Free Zones
              </div>
              <h2 className="mt-2 text-3xl md:text-4xl font-semibold">
                Leading {data.emirateKey} free zones
              </h2>
              <p className="mt-3 text-muted-foreground">
                Premium free zones we set up — with realistic pricing, banking
                outlook, and visa eligibility.
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.freeZones.map((fz) => (
                <div
                  key={fz.name}
                  className="group relative rounded-2xl border border-violet-200/60 bg-white/80 backdrop-blur-xl p-6 shadow-[0_8px_30px_-18px_oklch(0.55_0.2_295/0.35)] hover:shadow-[0_20px_50px_-20px_oklch(0.55_0.2_295/0.45)] hover:-translate-y-0.5 hover:border-violet-400/70 transition-all duration-300 reveal"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-amber-50 border border-violet-200/60 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-violet-600" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-violet-600 font-semibold">
                      Free Zone
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{fz.name}</h3>
                  <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                    {fz.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {fz.bestFor.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <dl className="mt-5 grid grid-cols-2 gap-3 text-[12px]">
                    <div>
                      <dt className="text-muted-foreground flex items-center gap-1">
                        <Wallet className="w-3 h-3" /> Setup
                      </dt>
                      <dd className="font-medium mt-0.5">{fz.setupCost}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Timeline
                      </dt>
                      <dd className="font-medium mt-0.5">{fz.timeline}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground flex items-center gap-1">
                        <Landmark className="w-3 h-3" /> Banking
                      </dt>
                      <dd className="font-medium mt-0.5">{fz.banking}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground flex items-center gap-1">
                        <IdCard className="w-3 h-3" /> Visas
                      </dt>
                      <dd className="font-medium mt-0.5">{fz.visa}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MAINLAND */}
        <section className="relative py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-3xl border border-violet-200/60 bg-white/80 backdrop-blur-xl p-8 md:p-12 shadow-[0_20px_60px_-30px_oklch(0.55_0.2_295/0.4)] reveal">
              <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-violet-600 font-medium">
                    Mainland Setup
                  </div>
                  <h2 className="mt-2 text-3xl md:text-4xl font-semibold">
                    {data.emirateKey} Mainland
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {data.mainland.overview}
                  </p>
                  <ul className="mt-6 grid sm:grid-cols-2 gap-2.5">
                    {data.mainland.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: Building2, label: "Office", value: data.mainland.office },
                    { icon: IdCard, label: "Visa", value: data.mainland.visa },
                    { icon: Briefcase, label: "Activities", value: data.mainland.activities },
                    { icon: Landmark, label: "Government", value: data.mainland.government },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="rounded-2xl border border-violet-200/60 bg-gradient-to-br from-white to-violet-50/40 p-4"
                    >
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-violet-600 font-semibold">
                        <row.icon className="w-3.5 h-3.5" /> {row.label}
                      </div>
                      <p className="mt-1.5 text-[13px] text-foreground/85 leading-relaxed">
                        {row.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI RECOMMENDATIONS */}
        <section className="relative py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl reveal">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-violet-600 font-medium">
                <Sparkles className="w-3 h-3" /> AI Recommendations
              </div>
              <h2 className="mt-2 text-3xl md:text-4xl font-semibold">
                Smart picks for {data.emirateKey}
              </h2>
              <p className="mt-3 text-muted-foreground">
                Data-driven matches between business goals and the best
                jurisdiction inside {data.emirateKey}.
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.recommendations.map((r, i) => (
                <motion.div
                  key={r.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative overflow-hidden rounded-2xl border border-violet-200/60 bg-gradient-to-br from-white via-violet-50/60 to-amber-50/40 p-5 shadow-[0_10px_40px_-20px_oklch(0.55_0.2_295/0.4)] hover:-translate-y-0.5 transition"
                >
                  <Sparkles className="w-5 h-5 text-violet-600" />
                  <div className="mt-3 text-[11px] uppercase tracking-wider text-violet-600 font-semibold">
                    {r.label}
                  </div>
                  <div className="mt-1 text-lg font-semibold">{r.pick}</div>
                  <p className="mt-2 text-[12.5px] text-muted-foreground leading-relaxed">
                    {r.reason}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative pb-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="relative overflow-hidden rounded-3xl border border-violet-200/70 bg-gradient-to-br from-white via-violet-50/60 to-amber-50/40 p-10 md:p-14 text-center shadow-[0_30px_80px_-40px_oklch(0.55_0.2_295/0.45)]">
              <div
                aria-hidden
                className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-40"
                style={{
                  background: `radial-gradient(circle, ${data.hero.accent} / 0.4, transparent 70%)`,
                }}
              />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-semibold">
                  Need help choosing the right setup?
                </h2>
                <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                  Talk to our AI Advisor, book a consultation, or get a custom
                  quote tailored to your activity and goals.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/advisor"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-violet-500 text-white font-medium shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition"
                  >
                    <Sparkles className="w-4 h-4" />
                    Talk to AI Advisor
                  </Link>
                  <button
                    onClick={() => setBooking(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-violet-200 text-foreground hover:border-violet-400 transition"
                  >
                    <CalendarClock className="w-4 h-4 text-violet-600" />
                    Book Consultation
                  </button>
                  <Link
                    to="/quote"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-violet-200 text-foreground hover:border-violet-400 transition"
                  >
                    Get Custom Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-violet-200 text-foreground hover:border-violet-400 transition"
                  >
                    <MessageCircle className="w-4 h-4 text-violet-600" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-start gap-3 text-xs text-muted-foreground max-w-3xl mx-auto px-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-violet-500" />
              <p>
                Pricing, timelines, and visa quotas are indicative and may vary
                based on business activity, nationality, office configuration,
                and authority approvals.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
