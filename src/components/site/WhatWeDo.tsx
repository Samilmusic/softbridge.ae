import {
  Briefcase,
  IdCard,
  Landmark,
  ShieldCheck,
  Globe,
  Megaphone,
  Headphones,
  TrendingUp,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

const ITEMS = [
  { icon: Briefcase, title: "Business Formation", text: "Activity, jurisdiction, and license structure planned around your real business model.", href: "/services/business-formation" },
  { icon: IdCard, title: "Residency & Relocation", text: "Investor visa, Emirates ID, medical, and family residency handled end-to-end.", href: "/services/residency-relocation" },
  { icon: Landmark, title: "Banking Preparation", text: "Profile readiness, KYC, source of funds and bank introductions aligned to your activity.", href: "/services/banking-preparation" },
  { icon: ShieldCheck, title: "AML & Compliance", text: "AML/CFT readiness, ESR, UBO, and ongoing regulatory documentation kept in order.", href: "/services/aml-compliance" },
  { icon: Globe, title: "Website Development", text: "Conversion-focused websites and landing pages built on modern, fast frameworks.", href: "/services/web-advertising" },
  { icon: Megaphone, title: "Digital Advertising", text: "Google and Meta campaigns engineered for measurable, qualified pipeline.", href: "/services/web-advertising" },
  { icon: Headphones, title: "Operational Support", text: "Renewals, document changes, government coordination and day-to-day operations.", href: "/services/operational-support" },
  { icon: TrendingUp, title: "Business Growth Systems", text: "CRM, automations, and reporting that turn operations into a growth engine.", href: "/services/operational-support" },
];

export function WhatWeDo() {
  return (
    <section id="services" className="relative py-24 md:py-32 border-t border-white/5">
      <div aria-hidden className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]">
        <div className="absolute inset-0 dot-pattern opacity-30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> What We Really Do
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
            More Than <span className="gradient-text">Company Setup</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl">
            Eight integrated capabilities working as one business infrastructure layer — from
            licensing and banking to digital growth and long-term operations.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ITEMS.map((s, i) => (
            <Link
              key={s.title}
              to={s.href}
              className="group glass-card grad-border rounded-2xl p-6 hover-lift reveal relative overflow-hidden cursor-pointer block hover:shadow-[0_0_30px_-8px_rgba(140,120,255,0.35)] transition-shadow duration-500"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none"
                style={{ background: "radial-gradient(400px circle at 50% 0%, oklch(0.84 0.10 82 / 0.10), transparent 60%)" }}
              />
              <div className="relative w-11 h-11 rounded-xl glass flex items-center justify-center mb-5 group-hover:border-gold/40 transition">
                <s.icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="relative text-[15px] font-semibold">{s.title}</h3>
              <p className="relative mt-2 text-[13px] text-muted-foreground leading-relaxed">{s.text}</p>
              <div className="relative mt-4 flex items-center gap-1 text-[12px] font-medium text-gold opacity-70 group-hover:opacity-100 transition-opacity">
                Learn more <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
