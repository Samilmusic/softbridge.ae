import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Sparkles,
  ArrowRight,
  Building2,
  Globe,
  Info,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { UAE_LOCATIONS } from "@/lib/uae-locations";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/services/uae-company-formation-locations")({
  head: () => ({
    meta: [
      {
        title:
          "UAE Company Formation Locations — Mainland & Free Zones | Soft Bridge",
      },
      {
        name: "description",
        content:
          "Soft Bridge assists with UAE company formation across selected mainland jurisdictions and leading free zones — Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Fujairah, and UAQ.",
      },
      {
        property: "og:title",
        content:
          "UAE Company Formation Locations — Mainland & Free Zones | Soft Bridge",
      },
      {
        property: "og:description",
        content:
          "Explore every UAE jurisdiction we set up companies in — mainland and leading free zones across all seven emirates.",
      },
    ],
    links: [{ rel: "canonical", href: "https://softbridge.ae/services/uae-company-formation-locations" }],
  }),
  component: LocationsPage,
});

function LocationsPage() {
  useReveal();
  const [query, setQuery] = useState("");
  const [activeEmirate, setActiveEmirate] = useState<string>("All");

  const emirates = useMemo(
    () => ["All", ...UAE_LOCATIONS.map((g) => g.emirate)],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return UAE_LOCATIONS.map((group) => {
      if (activeEmirate !== "All" && group.emirate !== activeEmirate)
        return { ...group, jurisdictions: [] };
      if (!q) return group;
      return {
        ...group,
        jurisdictions: group.jurisdictions.filter(
          (j) =>
            j.name.toLowerCase().includes(q) ||
            j.bestFor.toLowerCase().includes(q) ||
            j.type.toLowerCase().includes(q),
        ),
      };
    }).filter((g) => g.jurisdictions.length > 0);
  }, [query, activeEmirate]);

  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.985_0.005_290)] text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(900px 500px at 50% -10%, oklch(0.85 0.12 295 / 0.25), transparent 60%), radial-gradient(700px 400px at 90% 20%, oklch(0.9 0.08 82 / 0.18), transparent 60%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-violet-200/60 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-violet-700 mb-6 shadow-sm">
              <Globe className="w-3 h-3" /> UAE Jurisdictions
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
              Where We Set Up{" "}
              <span className="bg-gradient-to-r from-violet-600 via-violet-500 to-amber-500 bg-clip-text text-transparent">
                Your UAE Company
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed">
              Soft Bridge assists with UAE company formation across selected
              mainland jurisdictions and leading UAE free zones — engineered
              around your activity, banking, and residency needs.
            </p>
          </div>
        </section>

        {/* Controls */}
        <section className="relative pb-8">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl border border-violet-200/60 bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_-20px_oklch(0.55_0.2_295/0.25)] p-5 md:p-6">
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-500" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search jurisdictions, free zones, or use cases…"
                    className="pl-9 h-11 bg-white border-violet-200/70 focus-visible:ring-violet-400"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {emirates.map((e) => (
                    <button
                      key={e}
                      onClick={() => setActiveEmirate(e)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition border ${
                        activeEmirate === e
                          ? "bg-gradient-to-r from-violet-600 to-violet-500 text-white border-transparent shadow-sm"
                          : "bg-white text-foreground/70 border-violet-200/70 hover:border-violet-400 hover:text-violet-700"
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="relative pb-20">
          <div className="mx-auto max-w-6xl px-6 space-y-10">
            {filtered.length === 0 && (
              <div className="text-center text-muted-foreground py-16">
                No jurisdictions match your search.
              </div>
            )}
            {filtered.map((group) => (
              <div key={group.emirate} className="reveal">
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-violet-600 font-medium">
                      Emirate
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold mt-1">
                      {group.emirate}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {group.tagline}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-violet-100 text-violet-700 hover:bg-violet-100"
                  >
                    {group.jurisdictions.length} options
                  </Badge>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.jurisdictions.map((j) => (
                    <div
                      key={j.name}
                      className="group relative rounded-2xl border border-violet-200/60 bg-white/80 backdrop-blur-xl p-5 shadow-[0_8px_30px_-18px_oklch(0.55_0.2_295/0.35)] hover:shadow-[0_20px_50px_-20px_oklch(0.55_0.2_295/0.45)] hover:-translate-y-0.5 hover:border-violet-400/70 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-amber-50 border border-violet-200/60 flex items-center justify-center">
                          {j.type === "Mainland" ? (
                            <Building2 className="w-5 h-5 text-violet-600" />
                          ) : (
                            <MapPin className="w-5 h-5 text-violet-600" />
                          )}
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-violet-600 font-semibold">
                          {j.type}
                        </span>
                      </div>
                      <h3 className="mt-4 text-base font-semibold">{j.name}</h3>
                      <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/70">
                        <Sparkles className="w-3 h-3" />
                        Best for: {j.bestFor}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative pb-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="relative overflow-hidden rounded-3xl border border-violet-200/70 bg-gradient-to-br from-white via-violet-50/60 to-amber-50/40 p-10 md:p-14 text-center shadow-[0_30px_80px_-40px_oklch(0.55_0.2_295/0.45)]">
              <div
                aria-hidden
                className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-40"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.75 0.18 295 / 0.4), transparent 70%)",
                }}
              />
              <div className="relative">
                <Sparkles className="w-8 h-8 text-violet-600 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-semibold">
                  Not sure where to set up?
                </h2>
                <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                  Use our AI Advisor to match your business activity, banking
                  needs, and residency goals to the right UAE jurisdiction.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/advisor"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-violet-500 text-white font-medium shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition"
                  >
                    <Sparkles className="w-4 h-4" />
                    Ask the AI Advisor
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/quote"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-violet-200 text-foreground hover:border-violet-400 transition"
                  >
                    Get a quote
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-start gap-3 text-xs text-muted-foreground max-w-3xl mx-auto px-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-violet-500" />
              <p>
                Availability, pricing, and requirements may vary depending on
                business activity, visa needs, nationality, and authority
                approvals.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
