import { useEffect, useState } from "react";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { BookingDialog } from "@/components/site/BookingDialog";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { useAuth } from "@/lib/auth-context";

const NAV = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Remote Setup", href: "/remote-company-setup" },
  { label: "Process", href: "/#process" },
  { label: "AI Advisor", href: "/advisor" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState(false);
  const { isAuthenticated } = useAuth();

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
            <Link
              to="/quote"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] text-gold hover:text-foreground transition"
            >
              Get a Quote
            </Link>
            <Link
              to={isAuthenticated ? "/portal" : "/login"}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] text-muted-foreground hover:text-foreground transition"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />{isAuthenticated ? "Portal" : "Sign in"}
            </Link>
            <button
              onClick={() => setBooking(true)}
              className="hidden md:inline-flex items-center justify-center rounded-full glass-strong px-4 py-2 text-[13px] font-medium text-foreground hover:border-gold/40 transition"
            >
              Book Consultation
            </button>

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
              <Link to={isAuthenticated ? "/portal" : "/login"} onClick={() => setOpen(false)} className="text-sm py-2.5 px-3 rounded-lg text-muted-foreground hover:text-foreground">{isAuthenticated ? "Client Portal" : "Sign in"}</Link>
              <button
                onClick={() => { setOpen(false); setBooking(true); }}
                className="mt-2 inline-flex items-center justify-center rounded-full gold-gradient px-5 py-3 text-sm font-semibold text-[oklch(0.15_0.02_260)]"
              >
                Book Consultation
              </button>
            </nav>
          </div>
        )}
      </header>
      <BookingDialog open={booking} onOpenChange={setBooking} />
    </div>
  );
}
