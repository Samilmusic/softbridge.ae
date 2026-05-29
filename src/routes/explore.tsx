import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
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

// Deterministic pseudo-random so SSR + client match (no hydration mismatch)
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 9301 + salt * 49297) * 233280;
  return x - Math.floor(x);
}

function ExplorePage() {
  const [activeId, setActiveId] = useState<string>(EMIRATES[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const stars = useMemo(
    () =>
      Array.from({ length: 80 }).map((_, i) => ({
        top: seeded(i, 1) * 100,
        left: seeded(i, 2) * 100,
        delay: seeded(i, 3) * 8,
        duration: 3 + seeded(i, 4) * 5,
      })),
    []
  );

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
      { threshold: 0.3, rootMargin: "-15% 0px -40% 0px" }
    );
    document.querySelectorAll<HTMLElement>(".explore-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden" style={{ background: "linear-gradient(180deg, #060810 0%, #0a0f1e 50%, #060810 100%)" }}>
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes explore-twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.7; }
        }
        @keyframes explore-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .explore-star {
          position: absolute; width: 2px; height: 2px; border-radius: 50%;
          background: #ffffff; opacity: 0.4;
          animation: explore-twinkle ease-in-out infinite;
        }
        .explore-reveal { opacity: 0; transform: translateY(60px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
        .explore-reveal.explore-in { opacity: 1; transform: translateY(0); }
        .explore-grad {
          background: linear-gradient(135deg, #c9a84c, #3b82f6);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
        }
        .explore-divider {
          height: 1px; width: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        }
      `}</style>

      <Header />

      {/* Starfield */}
      <div aria-hidden className="fixed inset-0 pointer-events-none z-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="explore-star"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Sticky dot nav */}
      <nav aria-label="Emirate navigation" className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-4">
        {EMIRATES.map((e) => (
          <button
            key={e.id}
            onClick={() => scrollTo(e.id)}
            aria-label={`Go to ${e.name}`}
            className="group relative flex items-center justify-end"
          >
            <span className="absolute right-6 whitespace-nowrap text-[11px] uppercase tracking-widest text-white/70 bg-white/5 border border-white/10 rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none">
              {e.name}
            </span>
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: 8, height: 8,
                background: activeId === e.id ? "#c9a84c" : "rgba(255,255,255,0.25)",
                transform: activeId === e.id ? "scale(1.5)" : "scale(1)",
                boxShadow: activeId === e.id ? "0 0 12px rgba(201,168,76,0.7)" : "none",
              }}
            />
          </button>
        ))}
      </nav>

      <main className="relative z-10">
        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center relative px-6 text-center">
          <div className="flex flex-wrap gap-2 justify-center max-w-3xl mb-10">
            {EMIRATES.map((e) => (
              <span
                key={e.id}
                className="text-[13px] text-white"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 999,
                  padding: "6px 16px",
                }}
              >
                {e.name}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-[11px] uppercase tracking-[0.25em] text-white/60 mb-6">
            <Sparkles className="w-3 h-3" /> Interactive Journey
          </div>

          <h1 className="explore-grad font-black leading-[0.95] tracking-tight" style={{ fontSize: "clamp(56px, 10vw, 140px)" }}>
            Explore the UAE
          </h1>
          <p className="mt-6 text-white/60" style={{ fontSize: 18 }}>
            7 emirates. 40+ free zones. One strategic partner.
          </p>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60" style={{ animation: "explore-bounce 2s ease-in-out infinite" }}>
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </section>

        {/* EMIRATE SECTIONS */}
        {EMIRATES.map((e, idx) => (
          <div key={e.id}>
            {idx > 0 && (
              <div className="max-w-[1200px] mx-auto px-6 md:px-6">
                <div className="explore-divider" />
              </div>
            )}
            <section
              ref={(el) => { sectionRefs.current[e.id] = el; }}
              data-emirate={e.id}
              className="explore-reveal min-h-screen flex items-center relative"
              style={{ padding: "60px 16px" }}
            >
              <div className="mx-auto w-full grid lg:grid-cols-100 gap-10 items-center" style={{ maxWidth: 1200, gridTemplateColumns: undefined }}>
                <div className="grid lg:grid-cols-[55fr_45fr] gap-10 items-center w-full">
                  {/* LEFT */}
                  <div>
                    <div className="uppercase mb-5" style={{ color: e.accent, fontSize: 12, letterSpacing: "3px" }}>
                      Emirate
                    </div>
                    <h2 className="text-white font-extrabold leading-[0.95] tracking-tight" style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 800 }}>
                      {e.name}
                    </h2>
                    <div className="mt-5" style={{ width: 60, height: 2, background: e.accent }} />
                    <p className="mt-6 text-white/60" style={{ fontSize: 16 }}>
                      {e.tagline}
                    </p>

                    <div className="mt-8 space-y-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-white/40">Mainland</span>
                        <span
                          className="text-white/90 text-sm"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: `1px solid ${e.accent}55`,
                            borderRadius: 999,
                            padding: "4px 12px",
                          }}
                        >
                          {e.mainland}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-white/40">Best For</span>
                        <span className="italic text-white/80 text-sm">{e.bestFor}</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div>
                    <div
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        borderRadius: 24,
                        padding: 28,
                        boxShadow: `0 30px 80px -30px ${e.accent}40`,
                      }}
                    >
                      <div className="text-[10px] uppercase tracking-[0.22em] text-white/50 mb-5" style={{ color: e.accent }}>
                        Free Zones · {e.freeZones.length}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {e.freeZones.map((fz) => (
                          <span
                            key={fz}
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.08)",
                              borderRadius: 10,
                              padding: "8px 14px",
                              fontSize: 13,
                              color: "#f0f4ff",
                            }}
                          >
                            {fz}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ))}

        {/* COMPARISON */}
        <section className="explore-reveal relative" style={{ padding: "100px 24px" }}>
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-widest mb-6 border border-white/10 text-white/60">
                Side by side
              </div>
              <h2 className="text-4xl md:text-6xl font-bold explore-grad">Quick Comparison</h2>
              <p className="mt-4 text-white/60 max-w-2xl mx-auto">A snapshot of the most popular jurisdictions for international founders.</p>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <div style={{ overflowX: "auto" }}>
                <table className="w-full text-sm" style={{ borderCollapse: "collapse", minWidth: 640 }}>
                  <thead>
                    <tr style={{ background: "rgba(201,168,76,0.15)" }}>
                      {["Emirate", "Starting From", "Setup Speed", "Best For", "Banking"].map((h) => (
                        <th key={h} className="text-left px-5 py-4 font-semibold uppercase tracking-wider text-[11px]" style={{ color: "#c9a84c" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row, i) => (
                      <tr
                        key={row.emirate}
                        className="transition-colors"
                        style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}
                        onMouseEnter={(ev) => (ev.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                        onMouseLeave={(ev) => (ev.currentTarget.style.background = i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent")}
                      >
                        <td className="px-5 py-4 text-white/90 font-medium whitespace-nowrap">{row.emirate}</td>
                        <td className="px-5 py-4 text-white/80 whitespace-nowrap">{row.price}</td>
                        <td className="px-5 py-4 text-white/70 whitespace-nowrap">{row.speed}</td>
                        <td className="px-5 py-4 text-white/70">{row.bestFor}</td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span aria-label={`${row.banking} out of 5`}>
                            {Array.from({ length: 5 }).map((_, j) => (
                              <span key={j} style={{ color: j < row.banking ? "#c9a84c" : "rgba(255,255,255,0.15)", marginRight: 2 }}>
                                ★
                              </span>
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
        <section className="explore-reveal relative overflow-hidden" style={{ padding: "100px 24px" }}>
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.12) 0%, transparent 70%)" }}
          />
          <div className="relative max-w-[900px] mx-auto text-center">
            <h2 className="font-bold leading-tight explore-grad" style={{ fontSize: "clamp(36px, 6vw, 72px)" }}>
              Not sure which emirate fits your business?
            </h2>
            <p className="mt-6 text-lg text-white/70">
              Our AI advisor analyzes your model and recommends the right structure in minutes.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
              <Link
                to="/advisor"
                className="inline-flex items-center justify-center gap-2 font-semibold"
                style={{
                  background: "#c9a84c",
                  color: "#0a0f1e",
                  borderRadius: 12,
                  padding: "14px 32px",
                  boxShadow: "0 20px 50px -15px rgba(201,168,76,0.6)",
                }}
              >
                Try AI Advisor <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-2 font-semibold text-white"
                style={{
                  background: "transparent",
                  border: "1px solid #c9a84c",
                  borderRadius: 12,
                  padding: "14px 32px",
                }}
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
