import {
  Globe,
  Users,
  LayoutDashboard,
  Sparkles,
  Workflow,
  ArrowRight,
  Layers,
} from "lucide-react";

const HIGHLIGHTS = [
  { icon: Globe, title: "Professional Business Websites" },
  { icon: Users, title: "Client Portals" },
  { icon: Layers, title: "CRM Systems" },
  { icon: LayoutDashboard, title: "Custom Dashboards" },
  { icon: Sparkles, title: "AI Business Tools" },
  { icon: Workflow, title: "Automation & Digital Workflows" },
];

export function DigitalPlatformPromo() {
  return (
    <section id="digital-platform" className="dark relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[oklch(0.13_0.03_268)] via-[oklch(0.155_0.035_268)] to-[oklch(0.13_0.03_268)]">
      {/* deep purple glows */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-gradient-to-r from-primary/25 via-accent/15 to-transparent blur-3xl opacity-80"
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-gradient-to-l from-primary/20 to-transparent blur-3xl opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"
      >
        <div className="absolute inset-0 dot-pattern opacity-25" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="glass-strong rounded-3xl md:rounded-[2rem] p-8 md:p-14 ring-glow overflow-hidden">
          {/* scan line accent */}
          <div
            aria-hidden
            className="absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent animate-scan"
          />

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* text content */}
            <div className="lg:col-span-7 reveal">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-primary mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                New Platform
              </div>

              <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
                Beyond Company{" "}
                <span className="gradient-text">Formation.</span>
              </h2>

              <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                We don’t just help you register your company. We help you build the systems behind it.
              </p>

              <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
                Soft Bridge now offers professional websites, client portals, CRM systems, dashboards,
                automation tools, and AI-powered business solutions through our dedicated digital platform.
              </p>

              <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                Whether you’re starting a new company or upgrading an existing business, our team can help
                you build the technology you need to operate faster, look more professional, and manage
                everything online.
              </p>

              <a
                href="https://softbridgefze.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 group inline-flex items-center gap-2 rounded-full gold-gradient px-6 py-3.5 text-sm font-semibold hover:opacity-95 transition shadow-[0_20px_60px_-15px_var(--glow-primary)]"
              >
                Explore Digital Solutions
                <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* feature cards */}
            <div className="lg:col-span-5 reveal" style={{ transitionDelay: "120ms" }}>
              <div className="grid sm:grid-cols-2 gap-3">
                {HIGHLIGHTS.map((h, i) => (
                  <div
                    key={h.title}
                    className="group glass-card rounded-2xl p-5 hover-lift"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center mb-4 group-hover:border-primary/40 transition">
                      <h.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-[14px] font-semibold leading-snug">{h.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
