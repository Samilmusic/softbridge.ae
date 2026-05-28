import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  Sparkles,
  Clock,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Input } from "@/components/ui/input";
import { useReveal } from "@/hooks/use-reveal";
import {
  ARTICLES,
  BLOG_CATEGORIES,
  TRENDING_ARTICLES,
  formatDate,
} from "@/lib/blog";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      {
        title:
          "Insights — UAE Business Intelligence Journal | Soft Bridge",
      },
      {
        name: "description",
        content:
          "Editorial-grade insights on UAE company formation, banking, residency, free zones, and AI. The Soft Bridge intelligence journal.",
      },
      {
        property: "og:title",
        content: "Insights — UAE Business Intelligence Journal | Soft Bridge",
      },
      {
        property: "og:description",
        content:
          "Premium UAE business insights — free zones, banking, residency, tax, AML, and AI for founders.",
      },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  useReveal();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      if (cat !== "All" && a.category !== cat) return false;
      if (!query) return true;
      return (
        a.title.toLowerCase().includes(query) ||
        a.excerpt.toLowerCase().includes(query) ||
        a.tags.some((t) => t.toLowerCase().includes(query))
      );
    });
  }, [q, cat]);

  const hero = ARTICLES.find((a) => a.featured) ?? ARTICLES[0];

  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.985_0.005_290)] text-foreground">
      <Header />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(900px 500px at 50% -10%, oklch(0.85 0.12 295 / 0.28), transparent 60%), radial-gradient(700px 400px at 90% 20%, oklch(0.9 0.08 82 / 0.18), transparent 60%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-violet-200/60 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-violet-700 mb-6 shadow-sm">
              <Sparkles className="w-3 h-3" /> Soft Bridge Insights
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
              The UAE business{" "}
              <span className="bg-gradient-to-r from-violet-600 via-violet-500 to-amber-500 bg-clip-text text-transparent">
                intelligence journal
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed">
              Editorial-grade insights on formation, banking, residency, free
              zones, tax, and AI — written by operators who set up UAE
              companies every day.
            </p>
          </div>
        </section>

        {/* FEATURED + TRENDING */}
        <section className="relative pb-12">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-[1.5fr_1fr] gap-6">
            <Link
              to="/insights/$slug"
              params={{ slug: hero.slug }}
              className="group relative overflow-hidden rounded-3xl border border-violet-200/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_-30px_oklch(0.55_0.2_295/0.4)] hover:-translate-y-0.5 transition"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={hero.cover}
                  alt={hero.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent" />
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-violet-200/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-violet-700">
                  <Sparkles className="w-3 h-3" /> Featured
                </div>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200/70">
                    {hero.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {hero.readingMinutes} min read
                  </span>
                  <span>{formatDate(hero.publishedAt)}</span>
                </div>
                <h2 className="mt-3 text-2xl md:text-3xl font-semibold leading-tight group-hover:text-violet-700 transition">
                  {hero.title}
                </h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {hero.excerpt}
                </p>
              </div>
            </Link>

            <div className="rounded-3xl border border-violet-200/60 bg-white/80 backdrop-blur-xl p-6 shadow-[0_20px_60px_-30px_oklch(0.55_0.2_295/0.4)]">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-violet-600 font-medium">
                <TrendingUp className="w-3 h-3" /> Trending
              </div>
              <div className="mt-4 space-y-4">
                {TRENDING_ARTICLES.slice(0, 4).map((a, i) => (
                  <Link
                    key={a.slug}
                    to="/insights/$slug"
                    params={{ slug: a.slug }}
                    className="group flex gap-3 items-start"
                  >
                    <div className="text-2xl font-semibold text-violet-300 group-hover:text-violet-600 transition w-7 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div className="text-[10.5px] uppercase tracking-wider text-violet-600">
                        {a.category}
                      </div>
                      <div className="mt-0.5 text-sm font-medium leading-snug group-hover:text-violet-700 transition">
                        {a.title}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTROLS */}
        <section className="relative pb-8">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl border border-violet-200/60 bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_-20px_oklch(0.55_0.2_295/0.25)] p-5">
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-500" />
                  <Input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search insights, topics, or tags…"
                    className="pl-9 h-11 bg-white border-violet-200/70 focus-visible:ring-violet-400"
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["All", ...BLOG_CATEGORIES].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition border ${
                      cat === c
                        ? "bg-gradient-to-r from-violet-600 to-violet-500 text-white border-transparent shadow-sm"
                        : "bg-white text-foreground/70 border-violet-200/70 hover:border-violet-400 hover:text-violet-700"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="relative pb-24">
          <div className="mx-auto max-w-6xl px-6">
            {filtered.length === 0 ? (
              <div className="text-center text-muted-foreground py-16">
                No insights match your search.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((a) => (
                  <Link
                    key={a.slug}
                    to="/insights/$slug"
                    params={{ slug: a.slug }}
                    className="group relative overflow-hidden rounded-2xl border border-violet-200/60 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_-18px_oklch(0.55_0.2_295/0.35)] hover:shadow-[0_20px_50px_-20px_oklch(0.55_0.2_295/0.5)] hover:-translate-y-0.5 hover:border-violet-400/70 transition-all duration-300"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={a.cover}
                        alt={a.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-700"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[10.5px]">
                        <span className="px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200/70 uppercase tracking-wider">
                          {a.category}
                        </span>
                        {a.trending && (
                          <span className="inline-flex items-center gap-1 text-amber-600">
                            <TrendingUp className="w-3 h-3" /> Trending
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-lg font-semibold leading-snug line-clamp-2 group-hover:text-violet-700 transition">
                        {a.title}
                      </h3>
                      <p className="mt-2 text-[13px] text-muted-foreground line-clamp-2 leading-relaxed">
                        {a.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {a.readingMinutes} min
                        </span>
                        <span className="inline-flex items-center gap-1 text-violet-600 font-medium">
                          Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
