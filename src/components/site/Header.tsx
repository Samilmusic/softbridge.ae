import { useEffect, useState } from "react";
import { Menu, X, LayoutDashboard, Calendar, FileText, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useBooking } from "@/lib/booking-context";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { Logo } from "@/components/site/Logo";
import { useAuth } from "@/lib/auth-context";

const NAV = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Remote Setup", href: "/remote-company-setup" },
  { label: "AI Advisor", href: "/advisor" },
  { label: "Insights", href: "/insights" },
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="fixed top-0 inset-x-0 z-50 px-3 md:px-5 pt-3 md:pt-5">
      <header
        className={`mx-auto max-w-[1360px] rounded-full transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-[0_20px_60px_-30px_oklch(0_0_0/0.6)]"
            : "bg-white/[0.025] border border-white/5 backdrop-blur-md"
        }`}
      >
        <div className="px-5 lg:px-6 h-14 lg:h-16 flex items-center justify-between gap-4">
          {/* Logo — fixed footprint */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0 lg:w-[170px]">
            <Logo size={36} glow />
            <div className="leading-tight hidden sm:block min-w-0">
              <div className="text-[13px] font-semibold tracking-tight text-foreground whitespace-nowrap">Soft Bridge</div>
              <div className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground whitespace-nowrap">FZE LLC</div>
            </div>
          </Link>

          {/* Center nav — single row, no wrap */}
          <nav className="hidden lg:flex items-center justify-center gap-1 flex-1 min-w-0">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-[13px] px-2.5 xl:px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition whitespace-nowrap"
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Right actions — Desktop */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link
              to="/quote"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] text-gold hover:text-foreground transition whitespace-nowrap"
            >
              Get a Quote
            </Link>
            <Link
              to={isAuthenticated ? "/portal" : "/login"}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] text-muted-foreground hover:text-foreground transition whitespace-nowrap"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />{isAuthenticated ? "Portal" : "Sign in"}
            </Link>
            <ThemeToggle />
            <button
              onClick={() => setBooking(true)}
              className="inline-flex items-center justify-center rounded-full glass-strong px-4 py-2 text-[13px] font-medium text-foreground hover:border-gold/40 transition whitespace-nowrap"
            >
              Book Consultation
            </button>
          </div>

          {/* Right actions — Mobile */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <ThemeToggle />
            <button
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/70 backdrop-blur ring-1 ring-violet-200 text-slate-900 hover:bg-white transition"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>


      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <aside
          className={`absolute right-0 top-0 bottom-0 w-[88%] max-w-[400px] bg-white/95 backdrop-blur-2xl shadow-[0_30px_100px_-20px_rgba(91,33,182,0.4)] ring-1 ring-violet-100 transition-transform duration-300 flex flex-col ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Ambient glow */}
          <div aria-hidden className="pointer-events-none absolute -top-32 -right-20 w-80 h-80 rounded-full bg-violet-300/30 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-fuchsia-300/25 blur-3xl" />

          {/* Header */}
          <div className="relative flex items-center justify-between px-5 py-4 border-b border-violet-100/70">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
              <Logo size={38} />
              <div className="leading-tight">
                <div className="text-sm font-semibold text-slate-900">Soft Bridge</div>
                <div className="text-[9px] uppercase tracking-[0.22em] text-violet-600">FZE LLC</div>
              </div>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-full bg-violet-50 hover:bg-violet-100 ring-1 ring-violet-200 flex items-center justify-center text-slate-700 transition"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav */}
          <nav className="relative flex-1 overflow-y-auto px-4 py-5">
            <div className="text-[10px] uppercase tracking-[0.22em] text-violet-600 font-semibold px-2 mb-2">
              Navigate
            </div>
            <ul className="space-y-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between px-4 py-3.5 rounded-2xl text-[15px] font-medium text-slate-800 hover:bg-violet-50 active:bg-violet-100 transition min-h-[48px]"
                  >
                    <span>{n.label}</span>
                    <ArrowRight className="w-4 h-4 text-violet-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="text-[10px] uppercase tracking-[0.22em] text-violet-600 font-semibold px-2 mt-6 mb-2">
              Account
            </div>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/quote"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[15px] font-medium text-slate-800 hover:bg-violet-50 transition min-h-[48px]"
                >
                  <FileText className="w-4 h-4 text-violet-600" />
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link
                  to={isAuthenticated ? "/portal" : "/login"}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[15px] font-medium text-slate-800 hover:bg-violet-50 transition min-h-[48px]"
                >
                  <LayoutDashboard className="w-4 h-4 text-violet-600" />
                  {isAuthenticated ? "Client Portal" : "Sign In"}
                </Link>
              </li>
            </ul>
          </nav>

          {/* CTA footer */}
          <div className="relative p-4 border-t border-violet-100/70 bg-white/50">
            <button
              onClick={() => { setOpen(false); setBooking(true); }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-[15px] font-semibold py-4 shadow-[0_15px_40px_-12px_rgba(124,58,237,0.6)] active:scale-[0.99] transition min-h-[52px]"
            >
              <Calendar className="w-4 h-4" />
              Book Consultation
            </button>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
              <Sparkles className="w-3 h-3 text-violet-500" />
              AI-powered UAE business setup
            </div>
          </div>
        </aside>
      </div>

      <BookingDialog open={booking} onOpenChange={setBooking} />
    </div>
  );
}
