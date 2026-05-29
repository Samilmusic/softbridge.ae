import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { ARTICLES } from "@/lib/blog";

const BASE_URL = "https://softbridge.ae";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const STATIC_ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/advisor", changefreq: "monthly", priority: "0.8" },
  { path: "/quote", changefreq: "monthly", priority: "0.9" },
  { path: "/start", changefreq: "weekly", priority: "0.9" },
  { path: "/remote-company-setup", changefreq: "monthly", priority: "0.8" },
  { path: "/resources", changefreq: "monthly", priority: "0.6" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/insights", changefreq: "weekly", priority: "0.8" },
  // Services
  { path: "/services/business-formation", changefreq: "monthly", priority: "0.8" },
  { path: "/services/banking-preparation", changefreq: "monthly", priority: "0.8" },
  { path: "/services/residency-relocation", changefreq: "monthly", priority: "0.8" },
  { path: "/services/operational-support", changefreq: "monthly", priority: "0.8" },
  { path: "/services/aml-compliance", changefreq: "monthly", priority: "0.8" },
  { path: "/services/web-advertising", changefreq: "monthly", priority: "0.8" },
  { path: "/services/uae-company-formation-locations", changefreq: "monthly", priority: "0.8" },
  // Jurisdictions
  { path: "/dubai-company-formation", changefreq: "monthly", priority: "0.9" },
  { path: "/abu-dhabi-company-formation", changefreq: "monthly", priority: "0.9" },
  { path: "/sharjah-company-formation", changefreq: "monthly", priority: "0.9" },
  { path: "/ajman-company-formation", changefreq: "monthly", priority: "0.9" },
  { path: "/rak-company-formation", changefreq: "monthly", priority: "0.9" },
  { path: "/fujairah-company-formation", changefreq: "monthly", priority: "0.9" },
  { path: "/uaq-company-formation", changefreq: "monthly", priority: "0.9" },
  // Legal
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const articleEntries: SitemapEntry[] = ARTICLES.map((a) => ({
          path: `/insights/${a.slug}`,
          lastmod: a.publishedAt,
          changefreq: "monthly",
          priority: "0.7",
        }));

        const entries = [...STATIC_ENTRIES, ...articleEntries];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
