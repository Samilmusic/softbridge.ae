import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { SITE, WA_LINK } from "@/lib/site";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top contact bar */}
      <div className="hidden md:block border-b border-white/5 text-xs">
        <div className="mx-auto max-w-7xl px-6 h-9 flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-5">
            <a href={`mailto:${SITE.email}`} className="hover:text-gold transition">{SITE.email}</a>
            <span className="opacity-50">•</span>
            <span>{SITE.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{SITE.hours}</span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all ${
          scrolled ? "glass-strong" : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 h-16 md:h-18 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-lg gold-gradient flex items-center justify-center shadow-lg shadow-amber-500/10">
              <span className="text-[15px] font-bold text-[oklch(0.18_0.025_260)]">SB</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-foreground">Soft Bridge</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">FZE LLC</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-muted-foreground hover:text-foreground transition relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold hover:after:w-full after:transition-all"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:+${SITE.phoneRaw}`}
              className="text-xs text-muted-foreground hover:text-gold transition flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" /> {SITE.phone}
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full gold-gradient px-5 py-2.5 text-sm font-semibold text-[oklch(0.18_0.025_260)] hover:opacity-90 transition shadow-lg shadow-amber-500/10"
            >
              Book Consultation
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden glass-strong border-t border-white/10">
            <nav className="px-6 py-5 flex flex-col gap-3">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="text-sm py-2 text-muted-foreground hover:text-foreground"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center rounded-full gold-gradient px-5 py-3 text-sm font-semibold text-[oklch(0.18_0.025_260)]"
              >
                Book Consultation
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
