import { createFileRoute } from "@tanstack/react-router";
import { EmiratePageLayout } from "@/components/site/EmiratePageLayout";
import { EMIRATES } from "@/lib/emirates";

const data = EMIRATES.find((e) => e.slug === "dubai")!;

export const Route = createFileRoute("/dubai-company-formation")({
  head: () => ({
    meta: [
      { title: data.seo.title },
      { name: "description", content: data.seo.description },
      { property: "og:title", content: data.seo.title },
      { property: "og:description", content: data.seo.description },
      { property: "og:image", content: data.hero.image },
      { property: "og:type", content: "article" },
    ],
  }),
  component: () => <EmiratePageLayout data={data} />,
});
