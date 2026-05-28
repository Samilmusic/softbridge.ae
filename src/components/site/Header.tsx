import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { WA_LINK } from "@/lib/site";

const NAV = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Solutions", href: "/#solutions" },
  { label: "AI Advisor", href: "/advisor" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-50 px-3 md:px-5 pt-3 md:pt-5">
      <header
        className={`mx-auto max-w-6xl rounded-full transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-[0_20px_60px_-30px_oklch(0_0_0/0.6)]"
            : "bg-white/[0.025] border border-white/5 backdrop-blur-md"
        }`}
      >
        <div className="px-4 md:px-5 h-14 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg gold-gradient flex items-center justify-center shadow-lg shadow-amber-500/10">
              <span className="text-[13px] font-bold text-[oklch(0.15_0.02_260)]">SB</span>
            </div>
            <div className="leading-tight hidden sm:block">
              <div className="text-[13px] font-semibold tracking-tight text-foreground">Soft Bridge</div>
              <div className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground">FZE LLC</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-[13px] px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center rounded-full glass-strong px-4 py-2 text-[13px] font-medium text-foreground hover:border-gold/40 transition"
            >
              Book Consultation
            </a>
            <button
              className="lg:hidden p-2 -mr-1 text-foreground"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-white/10 rounded-b-3xl">
            <nav className="px-5 py-5 flex flex-col gap-1">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="text-sm py-2.5 px-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center rounded-full gold-gradient px-5 py-3 text-sm font-semibold text-[oklch(0.15_0.02_260)]"
              >
                Book Consultation
              </a>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
