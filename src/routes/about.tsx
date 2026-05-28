import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  Eye,
  Crown,
  MapPin,
  CheckCircle2,
  Mail,
  Globe,
  Award,
  Building2,
  CircleDot,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Particles } from "@/components/site/Particles";
import { FloatingActions } from "@/components/site/FloatingActions";
import { useReveal } from "@/hooks/use-reveal";
import { SITE, WA_LINK } from "@/lib/site";
import aliImg from "@/assets/team/ali.png";
import samilImg from "@/assets/team/samil.png";
import chaiImg from "@/assets/team/chai.png";
import mahiImg from "@/assets/team/mahi.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Soft Bridge — Building Business Infrastructure for the Future" },
      { name: "description", content: "Soft Bridge FZE LLC is a UAE-based business setup and digital infrastructure company combining consultancy, AI, automation, and software into one premium ecosystem." },
      { property: "og:title", content: "About Soft Bridge FZE LLC" },
      { property: "og:description", content: "UAE business setup, AI systems, digital infrastructure, and long-term operational support." },
    ],
  }),
  component: AboutPage,
});

const CAPABILITIES = [
  "UAE Company Formation",
  "Free Zone Setup",
  "Mainland Setup",
  "Residency Coordination",
  "Banking Preparation",
  "Tax Registration",
  "AI Systems & Software",
  "Digital Infrastructure",
  "Branding & Advertising",
];

const PORTAL_STAGES = [
  "Initial Approval",
  "Trade Name Reservation",
  "Ejari",
  "License Issuance",
  "Establishment Card",
  "UAE Residency",
  "Medical Test",
  "Emirates ID",
  "Tax Registration",
  "Banking Assistance",
  "Lifetime Support",
];

const PORTAL_FEATURES = [
  "Track every setup stage in real time",
  "Upload documents securely",
  "Monitor approvals & status",
  "View quotations and invoices",
  "Receive automated updates",
  "Communicate with consultants",
  "Manage your setup digitally",
];

const TEAM = [
  { initials: "CH", photo: chaiImg, name: "CHAI", role: "CEO", text: "Leads company operations, business development, and strategic growth.", accent: "from-amber-400/80 to-amber-200/80" },
  { initials: "SA", photo: samilImg, name: "SAMIL", role: "Manager", text: "Manages client experience, operational systems, platform development, and project coordination.", accent: "from-indigo-400/80 to-violet-300/80" },
  { initials: "AL", photo: aliImg, name: "ALI", role: "Sales", text: "Helps clients identify the right business setup solutions and operational structures.", accent: "from-cyan-400/80 to-sky-300/80" },
  { initials: "MA", photo: mahiImg, name: "MAHI", role: "Documents Processing", text: "Manages documentation workflows, application coordination, and processing operations.", accent: "from-emerald-400/80 to-teal-300/80" },
];

const DIFFERENTIATORS = [
  { icon: Eye, title: "Transparency", text: "Real-time visibility through a private client dashboard." },
  { icon: Cpu, title: "Technology-Driven", text: "AI, automation, and modern systems built into every workflow." },
  { icon: ShieldCheck, title: "Long-Term Support", text: "Partnerships, not one-time transactions." },
  { icon: Crown, title: "Premium Experience", text: "High-end service from onboarding to ongoing operations." },
  { icon: MapPin, title: "UAE Expertise", text: "Deep operational knowledge of free zones and compliance." },
  { icon: Layers, title: "Integrated Platform", text: "Consultancy, software, and AI unified into one ecosystem." },
];

const TRUST_METRICS = [
  { value: "15+", label: "Years Combined Experience" },
  { value: "10+", label: "Countries Served" },
  { value: "250+", label: "Businesses Supported" },
  { value: "100%", label: "Compliance Focused" },
];

function AboutPage() {
  useReveal();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        {/* HERO */}
        <section className="relative min-h-[92svh] pt-32 md:pt-40 pb-20 overflow-hidden flex items-center">
          <div aria-hidden className="absolute inset-0 grid-pattern opacity-[0.18] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
          <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-gradient-to-br from-amber-500/10 via-indigo-500/5 to-transparent blur-3xl" />
          <motion.div
            aria-hidden
            className="absolute top-32 -left-40 w-[460px] h-[460px] rounded-full bg-amber-400/10 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute top-60 -right-40 w-[520px] h-[520px] rounded-full bg-indigo-500/10 blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <Particles count={30} />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" /> About Soft Bridge
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mx-auto mt-6 max-w-5xl text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.75rem] font-semibold leading-[1.02]"
            >
              Building Business Infrastructure{" "}
              <span className="gradient-text">for the Future</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              UAE business setup, AI-powered systems, digital infrastructure, and long-term operational support — engineered into one premium ecosystem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                to="/quote"
                className="group inline-flex items-center gap-2 rounded-full gold-gradient px-6 py-3.5 text-sm font-semibold text-[oklch(0.15_0.02_260)] hover:opacity-95 transition shadow-[0_20px_60px_-15px_oklch(0.84_0.10_82/0.5)]"
              >
                Start Your Setup
                <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
              </Link>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3.5 text-sm font-semibold text-foreground hover:border-gold/40 transition"
              >
                <MessageCircle className="w-4 h-4 text-gold" /> Talk on WhatsApp
              </a>
            </motion.div>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section className="relative py-24 md:py-32 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 reveal">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
                <span className="w-8 h-px bg-gold" /> Who We Are
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
                A UAE-Based Business <span className="gradient-text">Infrastructure Company</span>
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Soft Bridge FZE LLC helps entrepreneurs, startups, agencies, and international
                  businesses establish and scale operations in the United Arab Emirates.
                </p>
                <p>
                  With <span className="text-foreground font-medium">15+ years of combined industry experience</span>,
                  we combine deep operational knowledge with modern technology to deliver a more
                  transparent, organized, and premium business setup experience.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 reveal">
              <div className="glass-card grad-border rounded-3xl p-7 md:p-9 relative overflow-hidden">
                <div aria-hidden className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl" />
                <div className="text-[11px] uppercase tracking-[0.22em] text-gold mb-5">What we do</div>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {CAPABILITIES.map((c) => (
                    <div key={c} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-gold flex-shrink-0" />
                      <span className="text-foreground/90">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CLIENT PORTAL */}
        <section className="relative py-24 md:py-32 border-t border-white/5 overflow-hidden">
          <div aria-hidden className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]">
            <div className="absolute inset-0 dot-pattern opacity-20" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-3xl reveal">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
                <Sparkles className="w-3.5 h-3.5" /> Client Portal
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
                A Modern Dashboard for Your <span className="gradient-text">Entire Setup Journey</span>
              </h2>
              <p className="mt-5 text-muted-foreground max-w-2xl leading-relaxed">
                From Initial Approval to Banking Assistance — every stage of your setup is tracked
                inside a secure, premium client portal.
              </p>
            </div>

            <div className="mt-14 grid lg:grid-cols-12 gap-8 items-start">
              {/* Animated dashboard preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-7 glass-card grad-border rounded-3xl p-6 md:p-8 relative overflow-hidden"
              >
                <div aria-hidden className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl" />
                <div aria-hidden className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl" />

                <div className="relative flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400/70" />
                    <div className="w-2 h-2 rounded-full bg-amber-400/70" />
                    <div className="w-2 h-2 rounded-full bg-emerald-400/70" />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Soft Bridge Portal</div>
                </div>

                <div className="relative grid grid-cols-3 gap-3 mb-6">
                  {[
                    { v: "73%", l: "Setup Progress" },
                    { v: "9/11", l: "Stages Complete" },
                    { v: "12", l: "Documents" },
                  ].map((s) => (
                    <div key={s.l} className="glass rounded-xl p-3.5">
                      <div className="text-xl font-semibold text-foreground">{s.v}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* Glowing progress bar */}
                <div className="relative h-1.5 rounded-full bg-white/5 overflow-hidden mb-7">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "73%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 gold-gradient shadow-[0_0_24px_oklch(0.84_0.10_82/0.6)]"
                  />
                </div>

                {/* Timeline */}
                <div className="relative space-y-3">
                  {PORTAL_STAGES.map((stage, i) => {
                    const done = i < 8;
                    const active = i === 8;
                    return (
                      <motion.div
                        key={stage}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                        className="flex items-center gap-3"
                      >
                        <div className="relative">
                          {done ? (
                            <div className="w-5 h-5 rounded-full gold-gradient flex items-center justify-center">
                              <CheckCircle2 className="w-3 h-3 text-[oklch(0.15_0.02_260)]" />
                            </div>
                          ) : active ? (
                            <div className="relative w-5 h-5 rounded-full border-2 border-gold flex items-center justify-center">
                              <CircleDot className="w-2.5 h-2.5 text-gold" />
                              <span className="absolute inset-0 rounded-full border-2 border-gold/60 animate-ping" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-white/15" />
                          )}
                        </div>
                        <div className={`text-sm ${done ? "text-foreground/90" : active ? "text-gold" : "text-muted-foreground"}`}>{stage}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Features */}
              <div className="lg:col-span-5 grid gap-3 reveal">
                {PORTAL_FEATURES.map((f) => (
                  <div key={f} className="glass-card rounded-2xl p-4 flex items-start gap-3 hover-lift">
                    <span className="mt-0.5 w-7 h-7 rounded-lg glass flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                    </span>
                    <span className="text-sm text-foreground/90">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="relative py-24 md:py-32 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl reveal">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
                <span className="w-8 h-px bg-gold" /> Our Team
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
                The People Behind <span className="gradient-text">Soft Bridge</span>
              </h2>
            </div>

            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TEAM.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative glass-card grad-border rounded-3xl p-6 hover-lift overflow-hidden"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none"
                    style={{ background: "radial-gradient(420px circle at 50% 0%, oklch(0.84 0.10 82 / 0.12), transparent 60%)" }}
                  />
                  <div className="relative">
                    <div className="mx-auto w-28 h-28 rounded-full overflow-hidden ring-1 ring-white/15 shadow-[0_20px_60px_-20px_oklch(0_0_0/0.6)] group-hover:scale-105 transition bg-gradient-to-br from-white/10 to-white/0">
                      <img src={m.photo} alt={m.name} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div className="mt-5 text-center">
                      <div className="text-[15px] font-semibold">{m.name}</div>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-gold mt-1">{m.role}</div>
                      <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed">{m.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DIFFERENTIATORS */}
        <section className="relative py-24 md:py-32 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl reveal">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
                <span className="w-8 h-px bg-gold" /> What Makes Us Different
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
                A Modern Approach to <span className="gradient-text">UAE Business Setup</span>
              </h2>
            </div>

            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DIFFERENTIATORS.map((d, i) => (
                <div
                  key={d.title}
                  className="group glass-card grad-border rounded-2xl p-6 hover-lift reveal"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <div className="w-11 h-11 rounded-xl glass flex items-center justify-center mb-5 group-hover:border-gold/40 transition">
                    <d.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h4 className="text-[15px] font-semibold">{d.title}</h4>
                  <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{d.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VISION */}
        <section className="relative py-24 md:py-32 border-t border-white/5 overflow-hidden">
          <motion.div
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-br from-amber-500/10 via-indigo-500/5 to-transparent blur-3xl"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative mx-auto max-w-4xl px-6 text-center reveal">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Our Vision
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
              The Future of Business Setup{" "}
              <span className="gradient-text">Is Digital</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed text-base md:text-lg">
              Soft Bridge combines consultancy, software, automation, AI, and operational
              infrastructure into one ecosystem — transparent, technology-driven, and built for
              the next generation of UAE businesses.
            </p>
          </div>
        </section>

        {/* TRUST */}
        <section className="relative py-24 md:py-32 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 reveal">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
                  <Award className="w-3.5 h-3.5" /> Trust & Recognition
                </div>
                <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
                  A <span className="gradient-text">Registered & Recognized</span> UAE Entity
                </h2>
                <p className="mt-5 text-muted-foreground leading-relaxed">
                  Operating under official UAE jurisdiction with full regulatory alignment.
                </p>

                <div className="mt-7 glass-card grad-border rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-gold" />
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Entity</div>
                      <div className="text-sm font-medium">{SITE.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Registration No.</div>
                      <div className="text-sm font-medium tabular-nums">{SITE.registrationNumber}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-gold" />
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Recognition</div>
                      <div className="text-sm font-medium">IFZA — International Free Zone Authority</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl glass reveal">
                {TRUST_METRICS.map((m) => (
                  <div key={m.label} className="bg-background/30 p-7">
                    <div className="text-3xl md:text-4xl font-semibold gradient-text">{m.value}</div>
                    <div className="mt-2 text-xs md:text-[13px] text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT / LOCATION */}
        <section className="relative py-24 md:py-32 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-5 reveal flex flex-col">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
                <MapPin className="w-3.5 h-3.5" /> Location & Contact
              </div>
              <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
                Based in the <span className="gradient-text">United Arab Emirates</span>
              </h2>

              <div className="mt-7 space-y-3">
                <div className="glass-card rounded-2xl p-5 flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-gold" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Address</div>
                    <div className="text-sm font-medium">{SITE.address}</div>
                  </div>
                </div>
                <a href={`mailto:${SITE.email}`} className="glass-card rounded-2xl p-5 flex items-start gap-3 hover-lift">
                  <Mail className="w-4 h-4 mt-0.5 text-gold" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Email</div>
                    <div className="text-sm font-medium">{SITE.email}</div>
                  </div>
                </a>
                <a href={SITE.website} target="_blank" rel="noopener noreferrer" className="glass-card rounded-2xl p-5 flex items-start gap-3 hover-lift">
                  <Globe className="w-4 h-4 mt-0.5 text-gold" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Website</div>
                    <div className="text-sm font-medium">{SITE.website.replace("https://", "")}</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 reveal">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full rounded-3xl overflow-hidden glass-card grad-border">
                {/* Premium dark stylized map */}
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,oklch(0.25_0.06_260/0.6),transparent_60%),radial-gradient(ellipse_at_70%_70%,oklch(0.25_0.08_82/0.4),transparent_60%)]" />
                <div aria-hidden className="absolute inset-0 grid-pattern opacity-30" />
                <div aria-hidden className="absolute inset-0 dot-pattern opacity-30" />

                {/* Glow pin */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="relative">
                    <span className="absolute inset-0 -m-6 rounded-full bg-gold/30 blur-2xl" />
                    <span className="relative w-4 h-4 rounded-full gold-gradient shadow-[0_0_24px_oklch(0.84_0.10_82/0.8)] block" />
                  </div>
                </motion.div>

                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between glass-strong rounded-xl px-4 py-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-gold">United Arab Emirates</div>
                    <div className="text-sm font-medium">Ajman — Soft Bridge HQ</div>
                  </div>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full gold-gradient px-4 py-2 text-xs font-semibold text-[oklch(0.15_0.02_260)]">
                    <MessageCircle className="w-3.5 h-3.5" /> Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
