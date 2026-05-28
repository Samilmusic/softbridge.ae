import { SITE, WA_LINK } from "@/lib/site";
import { Mail, MapPin, Phone } from "lucide-react";

const SERVICES = [
  "Business Setup & Structuring",
  "Residency & Relocation",
  "Banking, Tax & AML",
  "Web & Digital Advertising",
];

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-2 max-w-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center">
              <span className="text-[15px] font-bold text-[oklch(0.18_0.025_260)]">SB</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Soft Bridge FZE LLC</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-gold">Bridge To Your Success</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
            A UAE-based business services firm helping international founders and companies build
            compliant, scalable, and sustainable operations across the region.
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-full gold-gradient px-5 py-2.5 text-sm font-semibold text-[oklch(0.18_0.025_260)] hover:opacity-90 transition"
          >
            Book Consultation
          </a>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-gold mb-4">Services</div>
          <ul className="space-y-2.5 text-sm">
            {SERVICES.map((s) => (
              <li key={s}><a href="#services" className="text-muted-foreground hover:text-foreground transition">{s}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-gold mb-4">Contact</div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5"><MapPin className="w-4 h-4 mt-0.5 text-gold/80 flex-shrink-0" />{SITE.address}</li>
            <li className="flex items-start gap-2.5"><Phone className="w-4 h-4 mt-0.5 text-gold/80 flex-shrink-0" /><a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">{SITE.phone}</a></li>
            <li className="flex items-start gap-2.5"><Mail className="w-4 h-4 mt-0.5 text-gold/80 flex-shrink-0" /><a href={`mailto:${SITE.email}`} className="hover:text-foreground">{SITE.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© 2025 Soft Bridge FZE LLC. All Rights Reserved.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-foreground transition">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition">Terms &amp; Conditions</a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
