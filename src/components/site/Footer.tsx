import { SITE, WA_LINK } from "@/lib/site";
import { Mail, MapPin, Phone, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { Logo } from "@/components/site/Logo";

const COLS = [
  { title: "Navigation", links: [
    { l: "Home", h: "/#home" },
    { l: "About", h: "/about" },
    { l: "Services", h: "/#services" },
    { l: "Process", h: "/#process" },
    { l: "Solutions", h: "/#solutions" },
    { l: "Contact", h: "/#contact" },
  ]},
  { title: "Services", links: [
    { l: "Remote UAE Setup", h: "/remote-company-setup" },
    { l: "Business Formation", h: "/services/business-formation" },
    { l: "Residency & Relocation", h: "/services/residency-relocation" },
    { l: "Banking Preparation", h: "/services/banking-preparation" },
    { l: "AML & Compliance", h: "/services/aml-compliance" },
    { l: "Web & Advertising", h: "/services/web-advertising" },
    { l: "Operational Support", h: "/services/operational-support" },
  ]},
];

export function Footer() {
  return (
    <footer className="relative mt-10 border-t border-white/10">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-2 max-w-md">
          <div className="flex items-center gap-3">
            <Logo size={44} glow />
            <div className="leading-tight">
              <div className="text-sm font-semibold">Soft Bridge FZE LLC</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-gold">Bridge To Your Success</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
            UAE business infrastructure for international founders and companies — formation,
            compliance, banking, and digital growth, built for the long term.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5"><MapPin className="w-4 h-4 mt-0.5 text-gold/80 flex-shrink-0" />{SITE.address}</li>
            <li className="flex items-start gap-2.5"><Phone className="w-4 h-4 mt-0.5 text-gold/80 flex-shrink-0" /><a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">{SITE.phone}</a></li>
            <li className="flex items-start gap-2.5"><Mail className="w-4 h-4 mt-0.5 text-gold/80 flex-shrink-0" /><a href={`mailto:${SITE.email}`} className="hover:text-foreground">{SITE.email}</a></li>
          </ul>
          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] tracking-wide text-muted-foreground/80 leading-relaxed">
            <div>{SITE.name}</div>
            <div>Registration No: <span className="text-foreground/70 tabular-nums">{SITE.registrationNumber}</span></div>
          </div>
        </div>

        {COLS.map((c) => (
          <div key={c.title}>
            <div className="text-xs uppercase tracking-[0.2em] text-gold mb-4">{c.title}</div>
            <ul className="space-y-2.5 text-sm">
              {c.links.map((l) => (
                <li key={l.l}><a href={l.h} className="text-muted-foreground hover:text-foreground transition">{l.l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3 flex-wrap">
            <span>© 2025 Soft Bridge FZE LLC. All Rights Reserved.</span>
            <span className="hidden md:inline text-gold">•</span>
            <span className="hidden md:inline tabular-nums">Reg. No: {SITE.registrationNumber}</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="/privacy-policy" className="hover:text-foreground transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-foreground transition">Terms & Conditions</a>
            <div className="flex items-center gap-2 pl-3 border-l border-white/10">
              <a href={WA_LINK} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full glass flex items-center justify-center hover:border-gold/40 transition"><MessageCircle className="w-3.5 h-3.5" /></a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full glass flex items-center justify-center hover:border-gold/40 transition"><Linkedin className="w-3.5 h-3.5" /></a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full glass flex items-center justify-center hover:border-gold/40 transition"><Instagram className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
