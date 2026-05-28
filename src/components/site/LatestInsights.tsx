import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Clock, TrendingUp } from "lucide-react";
import { ARTICLES, formatDate } from "@/lib/blog";

export function LatestInsights() {
  const featured = ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
  const latest = ARTICLES.filter((a) => a.slug !== featured.slug).slice(0, 3);

  return (
    <section
      id="insights"
      className="relative py-24 md:py-32 border-t border-white/5 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-40 left-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.66 0.22 285 / 0.4) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 reveal">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
              <span className="w-8 h-px bg-gold" /> Latest Insights
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
              The Soft Bridge{" "}
              <span className="gradient-text">Intelligence Journal</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Editorial-grade insights on UAE company formation, banking,
              residency, and AI — written by operators, not bloggers.
            </p>
          </div>
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass border border-white/10 hover:border-gold/40 transition text-sm self-start md:self-auto"
          >
            Browse all insights <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-6">
          {/* Featured */}
          <Link
            to="/insights/$slug"
            params={{ slug: featured.slug }}
            className="group relative overflow-hidden rounded-3xl glass-card grad-border hover-lift block"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={featured.cover}
                alt={featured.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full glass-strong px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gold">
                <Sparkles className="w-3 h-3" /> Featured
              </div>
            </div>
            <div className="p-7">
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                  {featured.category}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {featured.readingMinutes} min read
                </span>
                <span>{formatDate(featured.publishedAt)}</span>
              </div>
              <h3 className="mt-3 text-2xl md:text-3xl font-semibold leading-tight group-hover:text-gold transition">
                {featured.title}
              </h3>
              <p className="mt-3 text-muted-foreground text-[15px] leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm text-gold">
                Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </div>
          </Link>

          {/* Latest list */}
          <div className="space-y-4">
            {latest.map((a) => (
              <Link
                key={a.slug}
                to="/insights/$slug"
                params={{ slug: a.slug }}
                className="group glass-card grad-border rounded-2xl p-4 hover-lift flex gap-4 items-center"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={a.cover}
                    alt={a.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[10.5px] text-muted-foreground">
                    <span className="text-gold uppercase tracking-wider">
                      {a.category}
                    </span>
                    {a.trending && (
                      <span className="inline-flex items-center gap-1 text-amber-500">
                        <TrendingUp className="w-3 h-3" /> Trending
                      </span>
                    )}
                  </div>
                  <h4 className="mt-1 text-[15px] font-semibold leading-snug line-clamp-2 group-hover:text-gold transition">
                    {a.title}
                  </h4>
                  <div className="mt-2 text-[11px] text-muted-foreground inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {a.readingMinutes} min
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
