import {
  Check,
  Target,
  Eye,
  ShieldCheck,
  Sparkles,
  Cpu,
  Layers,
  Gauge,
  MapPin,
  Crown,
  Briefcase,
  UserCog,
  PhoneCall,
  FileText,
} from "lucide-react";

const CAPABILITIES = [
  "UAE company formation (free zone & mainland)",
  "Residency coordination & Emirates ID",
  "Banking preparation assistance",
  "Tax registration & compliance support",
  "AI systems, software & automation",
  "Branding, advertising & digital infrastructure",
];

const PILLARS = [
  {
    icon: Target,
    title: "Mission",
    text: "Simplify the UAE business setup journey through technology, automation, transparency, and long-term support — replacing fragmented processes with a modern, digital client experience.",
  },
  {
    icon: Eye,
    title: "Vision",
    text: "To become a modern UAE business infrastructure platform combining consultancy, automation, and software into one seamless, AI-enhanced ecosystem.",
  },
  {
    icon: ShieldCheck,
    title: "Commitment",
    text: "Transparency, regulatory alignment, and long-term relationships — not one-time transactions. Premium experience from onboarding through ongoing support.",
  },
];

const DIFFERENTIATORS = [
  { icon: Eye, title: "Transparency", text: "Clients track setup progress in real time through their private dashboard." },
  { icon: Cpu, title: "Technology-Driven", text: "AI, automation, and modern software systems built into every workflow." },
  { icon: ShieldCheck, title: "Long-Term Support", text: "We focus on long-term partnerships, not one-time transactions." },
  { icon: Crown, title: "Premium Experience", text: "Modern, organized, high-end service from onboarding to operations." },
  { icon: MapPin, title: "UAE Expertise", text: "Deep operational knowledge of free zones, compliance, and local workflows." },
  { icon: Layers, title: "Integrated Platform", text: "Consultancy, automation, and software unified into one ecosystem." },
];

const PORTAL_FEATURES = [
  "Track full company setup process",
  "Monitor every completed stage",
  "Upload documents securely",
  "Receive real-time updates",
  "Access quotations and invoices",
  "Communicate with consultants",
  "Monitor visa and residency progress",
  "Automated notifications",
  "All setup data in one place",
];

const TEAM = [
  { initials: "CH", name: "CHAI", role: "CEO", text: "Leads company operations, business development, and strategic growth.", icon: Crown },
  { initials: "SA", name: "SAMIL", role: "Manager", text: "Manages client experience, operational systems, and platform development.", icon: UserCog },
  { initials: "AL", name: "ALI", role: "Sales", text: "Helps clients identify the right setup solutions and structures.", icon: PhoneCall },
  { initials: "MA", name: "MAHI", role: "Documents Processing", text: "Manages documentation workflows and application coordination.", icon: FileText },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 border-t border-white/5">
      <div aria-hidden className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]">
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Intro */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
              <span className="w-8 h-px bg-gold" /> About Soft Bridge
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
              Building Business Infrastructure{" "}
              <span className="gradient-text">for the Future</span>
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Soft Bridge FZE LLC is a UAE-based business setup and digital infrastructure
                company helping entrepreneurs, startups, agencies, and international businesses
                establish and scale their operations in the United Arab Emirates.
              </p>
              <p>
                With more than <span className="text-foreground font-medium">15 years of combined industry experience</span>,
                we combine deep operational knowledge with modern technology to create a more
                transparent, organized, and premium business setup experience.
              </p>
            </div>

            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {CAPABILITIES.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full gold-gradient flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[oklch(0.15_0.02_260)]" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-foreground/90">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 reveal">
            {PILLARS.map((p) => (
              <div key={p.title} className="glass-card grad-border rounded-2xl p-7 hover-lift group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center flex-shrink-0 group-hover:border-gold/40 transition">
                    <p.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Client Portal */}
        <div className="mt-24 md:mt-32 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 reveal">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Smart Client Portal
            </div>
            <h3 className="text-2xl md:text-4xl font-semibold leading-[1.1]">
              Not Just a Consultancy.{" "}
              <span className="gradient-text">A Business Infrastructure Platform.</span>
            </h3>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              From Initial Approval to Emirates ID and Banking Assistance, every stage of your
              setup is tracked directly inside your secure client portal — complete visibility
              and peace of mind throughout the entire process.
            </p>
          </div>
          <div className="lg:col-span-7 reveal">
            <div className="glass-card grad-border rounded-2xl p-6 md:p-8">
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {PORTAL_FEATURES.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-sm">
                    <Gauge className="w-4 h-4 mt-0.5 text-gold flex-shrink-0" />
                    <span className="text-foreground/90">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* What Makes Soft Bridge Different */}
        <div className="mt-24 md:mt-32">
          <div className="max-w-3xl reveal">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
              <span className="w-8 h-px bg-gold" /> What Makes Us Different
            </div>
            <h3 className="text-2xl md:text-4xl font-semibold leading-[1.1]">
              A Modern Approach to{" "}
              <span className="gradient-text">UAE Business Setup</span>
            </h3>
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

        {/* Team */}
        <div className="mt-24 md:mt-32">
          <div className="max-w-3xl reveal">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
              <Briefcase className="w-3.5 h-3.5" /> Our Team
            </div>
            <h3 className="text-2xl md:text-4xl font-semibold leading-[1.1]">
              The People Behind{" "}
              <span className="gradient-text">Soft Bridge</span>
            </h3>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAM.map((m, i) => (
              <div
                key={m.name}
                className="group relative glass-card grad-border rounded-2xl p-6 hover-lift reveal overflow-hidden"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none"
                  style={{ background: "radial-gradient(400px circle at 50% 0%, oklch(0.84 0.10 82 / 0.10), transparent 60%)" }}
                />
                <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center text-[oklch(0.15_0.02_260)] font-bold text-base">
                    {m.initials}
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold">{m.name}</div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-gold mt-0.5">{m.role}</div>
                  </div>
                </div>
                <p className="relative mt-4 text-[13px] text-muted-foreground leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
