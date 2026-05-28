import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Clock,
  CalendarClock,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Share2,
  Linkedin,
  Twitter,
  Copy,
  Check,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { BookingDialog } from "@/components/site/BookingDialog";
import { useReveal } from "@/hooks/use-reveal";
import {
  getArticle,
  getRelatedArticles,
  formatDate,
  ARTICLES,
} from "@/lib/blog";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Insight — Soft Bridge" }] };
    return {
      meta: [
        { title: a.seo.title },
        { name: "description", content: a.seo.description },
        { property: "og:title", content: a.seo.title },
        { property: "og:description", content: a.seo.description },
        { property: "og:image", content: a.cover },
        { property: "og:type", content: "article" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.excerpt,
            image: a.cover,
            datePublished: a.publishedAt,
            author: { "@type": "Organization", name: a.author.name },
            publisher: {
              "@type": "Organization",
              name: "Soft Bridge",
            },
          }),
        },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-[oklch(0.985_0.005_290)]">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Insight not found</h1>
        <Link
          to="/insights"
          className="mt-4 inline-flex items-center gap-2 text-violet-600"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all insights
        </Link>
      </div>
    </div>
  ),
});

function ArticlePage() {
  useReveal();
  const { article } = Route.useLoaderData();
  const related = getRelatedArticles(article.slug, 3);
  const [activeId, setActiveId] = useState<string>(article.sections[0]?.id);
  const [copied, setCopied] = useState(false);
  const [booking, setBooking] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
    const ids = article.sections.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [article.slug, article.sections]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.985_0.005_290)] text-foreground">
      <Header />
      <BookingDialog open={booking} onOpenChange={setBooking} />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative pt-28 md:pt-36 pb-10 md:pb-14 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(900px 500px at 50% -10%, oklch(0.85 0.12 295 / 0.28), transparent 60%)",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-6">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-[12px] text-violet-700 hover:text-violet-900 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Insights
            </Link>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-[11.5px] text-muted-foreground">
              <span className="px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200/70 uppercase tracking-wider font-medium">
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {article.readingMinutes} min read
              </span>
              <span className="inline-flex items-center gap-1">
                <CalendarClock className="w-3.5 h-3.5" />{" "}
                {formatDate(article.publishedAt)}
              </span>
            </div>
            <h1 className="mt-5 text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
              {article.title}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {article.excerpt}
            </p>
            <div className="mt-7 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-amber-400 flex items-center justify-center text-white font-semibold text-sm">
                {article.author.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div>
                <div className="text-sm font-medium">{article.author.name}</div>
                <div className="text-[11.5px] text-muted-foreground">
                  {article.author.role}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COVER */}
        <section className="relative pb-10">
          <div className="mx-auto max-w-5xl px-6">
            <div className="rounded-3xl overflow-hidden border border-violet-200/60 shadow-[0_30px_80px_-40px_oklch(0.55_0.2_295/0.45)]">
              <img
                src={article.cover}
                alt={article.title}
                className="w-full h-auto aspect-[16/9] object-cover"
              />
            </div>
          </div>
        </section>

        {/* BODY + TOC + SHARE */}
        <section className="relative pb-16">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-[200px_1fr_60px] gap-8">
            {/* TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <div className="text-[10.5px] uppercase tracking-[0.22em] text-violet-600 font-semibold mb-3">
                  On this page
                </div>
                <ul className="space-y-2 border-l border-violet-200/70">
                  {article.sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`block pl-3 -ml-px border-l text-[13px] leading-snug transition ${
                          activeId === s.id
                            ? "border-violet-600 text-violet-700 font-medium"
                            : "border-transparent text-muted-foreground hover:text-violet-700"
                        }`}
                      >
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* BODY */}
            <article className="min-w-0 prose-article">
              {article.sections.map((s) => (
                <section
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-28 mb-10 reveal"
                >
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-2 mb-4">
                    {s.heading}
                  </h2>
                  {s.blocks.map((b, i) => {
                    if (b.type === "p")
                      return (
                        <p
                          key={i}
                          className="text-[16px] leading-[1.75] text-foreground/85 mb-4"
                        >
                          {b.text}
                        </p>
                      );
                    if (b.type === "ul")
                      return (
                        <ul
                          key={i}
                          className="my-4 space-y-2 text-[15.5px] text-foreground/85"
                        >
                          {b.items.map((item, j) => (
                            <li
                              key={j}
                              className="pl-5 relative leading-relaxed"
                            >
                              <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-violet-600 to-amber-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                    return (
                      <blockquote
                        key={i}
                        className="my-6 border-l-2 border-violet-400 pl-4 italic text-foreground/80"
                      >
                        {b.text}
                      </blockquote>
                    );
                  })}
                </section>
              ))}

              {/* Tags */}
              <div className="mt-10 flex flex-wrap gap-2">
                {article.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-violet-200/70 text-violet-700"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Ask AI */}
              <div className="mt-10 rounded-2xl border border-violet-200/70 bg-gradient-to-br from-white via-violet-50/60 to-amber-50/40 p-6 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-violet-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      Ask AI about this article
                    </div>
                    <div className="text-[12.5px] text-muted-foreground">
                      Get tailored answers about your specific situation.
                    </div>
                  </div>
                </div>
                <Link
                  to="/advisor"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-medium shadow-md"
                >
                  Open AI Advisor <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>

            {/* Share */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 flex flex-col items-center gap-3">
                <div className="text-[10px] uppercase tracking-[0.22em] text-violet-600 font-semibold mb-1">
                  <Share2 className="w-3.5 h-3.5 mx-auto" />
                </div>
                {[
                  {
                    icon: Linkedin,
                    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                    label: "LinkedIn",
                  },
                  {
                    icon: Twitter,
                    href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`,
                    label: "X",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Share on ${s.label}`}
                    className="w-10 h-10 rounded-full bg-white border border-violet-200/70 flex items-center justify-center text-violet-700 hover:border-violet-500 hover:-translate-y-0.5 transition"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
                <button
                  onClick={copyLink}
                  aria-label="Copy link"
                  className="w-10 h-10 rounded-full bg-white border border-violet-200/70 flex items-center justify-center text-violet-700 hover:border-violet-500 hover:-translate-y-0.5 transition"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </aside>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="relative pb-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="relative overflow-hidden rounded-3xl border border-violet-200/70 bg-gradient-to-br from-white via-violet-50/60 to-amber-50/40 p-10 md:p-14 text-center shadow-[0_30px_80px_-40px_oklch(0.55_0.2_295/0.45)]">
              <Sparkles className="w-8 h-8 text-violet-600 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-semibold">
                Need help setting up your UAE business?
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Talk to our AI Advisor, book a consultation, or get a custom
                quote tailored to your activity and goals.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  to="/advisor"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-violet-500 text-white font-medium shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition"
                >
                  <Sparkles className="w-4 h-4" />
                  Talk to AI Advisor
                </Link>
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-violet-200 text-foreground hover:border-violet-400 transition"
                >
                  Get a Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setBooking(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-violet-200 text-foreground hover:border-violet-400 transition"
                >
                  <MessageCircle className="w-4 h-4 text-violet-600" />
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* RELATED / NEXT READS */}
        <section className="relative pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Suggested next reads
              </h2>
              <Link
                to="/insights"
                className="text-sm text-violet-700 inline-flex items-center gap-1"
              >
                All insights <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((a) => (
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
                    <div className="text-[10.5px] uppercase tracking-wider text-violet-700">
                      {a.category}
                    </div>
                    <h3 className="mt-2 text-base font-semibold leading-snug line-clamp-2 group-hover:text-violet-700 transition">
                      {a.title}
                    </h3>
                    <div className="mt-3 text-[11px] text-muted-foreground inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {a.readingMinutes} min
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
