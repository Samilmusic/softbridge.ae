import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Sparkles, Star } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore the UAE — 7 Emirates & 40+ Free Zones | Soft Bridge" },
      { name: "description", content: "Scroll-driven guide to every UAE emirate, free zone, and mainland jurisdiction. Find where to set up your company with Soft Bridge." },
      { property: "og:title", content: "Explore the UAE — Soft Bridge" },
      { property: "og:description", content: "7 emirates. 40+ free zones. One strategic partner." },
    ],
  }),
  component: ExplorePage,
});

type Emirate = {
  id: string;
  name: string;
  tagline: string;
  accent: string;
  freeZones: string[];
  mainland: string;
  bestFor: string;
};

const EMIRATES: Emirate[] = [
  {
    id: "dubai",
    name: "Dubai",
    tagline: "Global hub for trade, technology, and finance",
    accent: "#c9a84c",
    freeZones: ["IFZA", "Meydan Free Zone", "DMCC", "Dubai South", "DSO (Dubai Silicon Oasis)", "DIFC", "DAFZA", "JAFZA", "Dubai Internet City", "Dubai Media City"],
    mainland: "Dubai Mainland (DED)",
    bestFor: "Trading, tech, consulting, finance, media",
  },
  {
    id: "abu-dhabi",
    name: "Abu Dhabi",
    tagline: "Capital-grade infrastructure and sovereign finance",
    accent: "#6366f1",
    freeZones: ["ADGM (Abu Dhabi Global Market)", "twofour54", "KEZAD", "Masdar City", "Abu Dhabi Airport Free Zone"],
    mainland: "Abu Dhabi Mainland (ADDED)",
    bestFor: "Finance, energy, media, innovation",
  },
  {
    id: "sharjah",
    name: "Sharjah",
    tagline: "Balanced cost with proximity to Dubai",
    accent: "#10b981",
    freeZones: ["SHAMS (Sharjah Media City)", "SAIF Zone", "Hamriyah Free Zone", "SRTIP"],
    mainland: "Sharjah Mainland",
    bestFor: "Media, manufacturing, trading, e-commerce",
  },
  {
    id: "ajman",
    name: "Ajman",
    tagline: "Affordable entry into the UAE market",
    accent: "#f59e0b",
    freeZones: ["Ajman Free Zone"],
    mainland: "Ajman Mainland",
    bestFor: "SMEs, trading, light manufacturing",
  },
  {
    id: "ras-al-khaimah",
    name: "Ras Al Khaimah",
    tagline: "Industrial scale with competitive pricing",
    accent: "#ef4444",
    freeZones: ["RAKEZ (Ras Al Khaimah Economic Zone)"],
    mainland: "RAK Mainland",
    bestFor: "Manufacturing, industrial, trading",
  },
  {
    id: "fujairah",
    name: "Fujairah",
    tagline: "East coast access and creative licensing",
    accent: "#8b5cf6",
    freeZones: ["Fujairah Free Zone", "Creative City Fujairah"],
    mainland: "Fujairah Mainland",
    bestFor: "Creative industries, media, oil & gas",
  },
  {
    id: "umm-al-quwain",
    name: "Umm Al Quwain",
    tagline: "Quiet, cost-effective jurisdictions",
    accent: "#06b6d4",
    freeZones: ["UAQ Free Trade Zone"],
    mainland: "UAQ Mainland",
    bestFor: "Budget setups, trading, light industry",
  },
];

const COMPARISON = [
  { emirate: "Dubai (IFZA)", price: "AED 13,900", speed: "3–7 days", bestFor: "All business types", banking: 5 },
  { emirate: "Dubai (Meydan)", price: "AED 15,900", speed: "5–10 days", bestFor: "Consulting, e-commerce", banking: 5 },
  { emirate: "Abu Dhabi (ADGM)", price: "Custom", speed: "2–4 weeks", bestFor: "Finance, fintech", banking: 5 },
  { emirate: "Sharjah (SHAMS)", price: "AED 8,500", speed: "3–5 days", bestFor: "Media, creative", banking: 4 },
  { emirate: "Ajman Free Zone", price: "AED 6,900", speed: "2–4 days", bestFor: "Budget setups", banking: 3 },
  { emirate: "RAKEZ", price: "AED 7,500", speed: "3–5 days", bestFor: "Industrial", banking: 3 },
];

function ExplorePage() {
  const [activeId, setActiveId] = useState<string>(EMIRATES[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("explore-in");
            const id = (e.target as HTMLElement).dataset.emirate;
            if (id) setActiveId(id);
          }
        });
      },
      { threshold: 0.35, rootMargin: "-20% 0px -40% 0px" }
    );
    document.querySelectorAll<HTMLElement>(".explore-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen text-[#f0f4ff] relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0f1e 0%, #060810 100%)" }}>
      <style>{`
        @keyframes explore-float {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh) translateX(20px); opacity: 0; }
        }
        @keyframes explore-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .explore-reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.9s ease, transform 0.9s ease; }
        .explore-reveal.explore-in { opacity: 1; transform: translateY(0); }
        .explore-gradient-text {
          background: linear-gradient(135deg, #c9a84c 0%, #f0d78c 35%, #3b82f6 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .explore-glass {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
        }
        .explore-chip {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 14px;
          color: #f0f4ff;
          transition: all 0.3s ease;
        }
        .explore-particle {
          position: absolute; bottom: -10vh; width: 2px; height: 2px;
          border-radius: 50%; background: rgba(201,168,76,0.5);
          animation: explore-float linear infinite;
        }
        .explore-watermark {
          font-size: clamp(48px, 14vw, 200px);
          font-weight: 800;
          opacity: 0.06;
          position: absolute;
          letter-spacing: -0.04em;
          line-height: 0.9;
          pointer-events: none;
          white-space: nowrap;
        }
      `}</style>

      <Header />

      {/* Particle layer */}
      <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="explore-particle"
            style={{
              left: `${(i * 3.33) % 100}%`,
              animationDuration: `${15 + (i % 7) * 3}s`,
              animationDelay: `${-(i % 10) * 2}s`,
              background: i % 3 === 0 ? "rgba(59,130,246,0.5)" : "rgba(201,168,76,0.4)",
            }}
          />
        ))}
      </div>

      {/* Side dot nav */}
      <nav aria-label="Emirate navigation" className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        {EMIRATES.map((e) => (
          <button
            key={e.id}
            onClick={() => scrollTo(e.id)}
            aria-label={`Go to ${e.name}`}
            className="group flex items-center gap-3"
          >
            <span className="text-[11px] uppercase tracking-widest text-white/40 opacity-0 group-hover:opacity-100 transition">{e.name}</span>
            <span
              className="w-3 h-3 rounded-full transition-all duration-300 border"
              style={{
                background: activeId === e.id ? e.accent : "transparent",
                borderColor: activeId === e.id ? e.accent : "rgba(255,255,255,0.3)",
                boxShadow: activeId === e.id ? `0 0 12px ${e.accent}` : "none",
                transform: activeId === e.id ? "scale(1.3)" : "scale(1)",
              }}
            />
          </button>
        ))}
      </nav>

      <main className="relative z-10">
        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center relative px-6 text-center">
          <svg
            aria-hidden
            viewBox="0 0 1000 700"
            className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M 944 100 L 957 116 L 958 221 L 947 238 L 926 256 L 907 273 L 888 263 L 849 285 L 845 305 L 850 343 L 841 370 L 873 375 L 885 398 L 845 412 L 800 418 L 785 427 L 793 469 L 763 533 L 733 600 L 731 664 L 700 678 L 595 665 L 472 650 L 350 635 L 243 622 L 197 585 L 113 484 L 60 422 L 39 391 L 38 366 L 70 365 L 81 401 L 103 419 L 169 417 L 245 386 L 376 397 L 532 383 L 599 327 L 647 261 L 754 179 L 891 49 L 909 20 L 920 44 L 916 82 L 922 101 L 944 100 Z"
              fill="none"
              stroke="#c9a84c"
              strokeWidth="2"
            />
          </svg>
          <div className="relative explore-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-[11px] uppercase tracking-[0.25em] text-white/60 mb-8">
              <Sparkles className="w-3 h-3" /> Interactive Journey
            </div>
            <h1 className="text-[clamp(52px,10vw,140px)] font-bold leading-[0.95] tracking-tight explore-gradient-text">
              Explore the UAE
            </h1>
            <p className="mt-6 text-lg md:text-2xl text-white/70 max-w-2xl mx-auto">
              7 emirates. 40+ free zones. One strategic partner.
            </p>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40" style={{ animation: "explore-bounce 2s ease-in-out infinite" }}>
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </section>

        {/* EMIRATE SECTIONS */}
        {EMIRATES.map((e) => (
          <section
            key={e.id}
            ref={(el) => { sectionRefs.current[e.id] = el; }}
            data-emirate={e.id}
            className="explore-reveal min-h-screen flex items-center relative px-6 md:px-12 py-24 overflow-hidden"
            style={{
              background: `radial-gradient(circle at 80% 50%, ${e.accent}14, transparent 60%)`,
            }}
          >
            <div className="explore-watermark top-1/2 left-4 -translate-y-1/2 hidden md:block" style={{ color: e.accent }}>
              {e.name}
            </div>

            <div className="relative mx-auto max-w-7xl w-full grid lg:grid-cols-5 gap-10 items-center">
              {/* Left 60% */}
              <div className="lg:col-span-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-widest mb-6" style={{ background: `${e.accent}22`, color: e.accent, border: `1px solid ${e.accent}44` }}>
                  Emirate
                </div>
                <h2 className="text-[clamp(40px,7vw,96px)] font-bold leading-[0.95] tracking-tight" style={{ color: e.accent }}>
                  {e.name}
                </h2>
                <p className="mt-4 text-xl md:text-2xl text-white/80 max-w-xl">{e.tagline}</p>
                <div className="mt-8 space-y-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-2">Mainland</div>
                    <div className="text-white/90 text-base">{e.mainland}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-2">Best For</div>
                    <div className="text-white/90 text-base italic">{e.bestFor}</div>
                  </div>
                </div>
              </div>

              {/* Right 40% */}
              <div className="lg:col-span-2">
                <div className="explore-glass p-8" style={{ boxShadow: `0 30px 80px -30px ${e.accent}40` }}>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/50 mb-4">
                    Free Zones · {e.freeZones.length}
                  </div>
                  <div className="flex lg:grid lg:grid-cols-1 gap-2.5 overflow-x-auto lg:overflow-visible -mx-2 px-2 lg:mx-0 lg:px-0 pb-2 lg:pb-0">
                    {e.freeZones.map((fz) => (
                      <div
                        key={fz}
                        className="explore-chip shrink-0 hover:shadow-[0_0_20px_var(--glow)]"
                        style={{ ["--glow" as any]: `${e.accent}55` }}
                        onMouseEnter={(ev) => { ev.currentTarget.style.borderColor = e.accent; }}
                        onMouseLeave={(ev) => { ev.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                      >
                        {fz}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* COMPARISON */}
        <section className="explore-reveal relative px-6 md:px-12 py-32">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-widest mb-6 border border-white/10 text-white/60">
                Side by side
              </div>
              <h2 className="text-4xl md:text-6xl font-bold explore-gradient-text">Quick Comparison</h2>
              <p className="mt-4 text-white/60 max-w-2xl mx-auto">A snapshot of the most popular jurisdictions for international founders.</p>
            </div>

            <div className="explore-glass overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.18), rgba(201,168,76,0.08))" }}>
                      <th className="text-left px-5 py-4 text-[#c9a84c] font-semibold uppercase tracking-wider text-[11px]">Emirate</th>
                      <th className="text-left px-5 py-4 text-[#c9a84c] font-semibold uppercase tracking-wider text-[11px]">Starting From</th>
                      <th className="text-left px-5 py-4 text-[#c9a84c] font-semibold uppercase tracking-wider text-[11px]">Setup Speed</th>
                      <th className="text-left px-5 py-4 text-[#c9a84c] font-semibold uppercase tracking-wider text-[11px]">Best For</th>
                      <th className="text-left px-5 py-4 text-[#c9a84c] font-semibold uppercase tracking-wider text-[11px]">Banking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row) => (
                      <tr key={row.emirate} className="border-t border-white/5 transition-colors hover:bg-white/[0.03]">
                        <td className="px-5 py-4 text-white/90 font-medium whitespace-nowrap">{row.emirate}</td>
                        <td className="px-5 py-4 text-white/80 whitespace-nowrap">{row.price}</td>
                        <td className="px-5 py-4 text-white/70 whitespace-nowrap">{row.speed}</td>
                        <td className="px-5 py-4 text-white/70">{row.bestFor}</td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5" style={{ color: i < row.banking ? "#c9a84c" : "rgba(255,255,255,0.15)", fill: i < row.banking ? "#c9a84c" : "transparent" }} />
                            ))}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="explore-reveal relative px-6 py-32 overflow-hidden">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 65%)" }} />
          </div>
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Not sure which emirate <span className="explore-gradient-text">fits your business?</span>
            </h2>
            <p className="mt-6 text-lg text-white/70">
              Our AI advisor analyzes your model and recommends the right structure in minutes.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/advisor"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-[#0a0f1e]"
                style={{ background: "linear-gradient(135deg, #c9a84c, #f0d78c)", boxShadow: "0 20px 50px -15px rgba(201,168,76,0.6)" }}
              >
                Try AI Advisor <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white border border-white/15 hover:border-white/40 hover:bg-white/5 transition"
              >
                Get a Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
