import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { AdvisorIntro } from "@/components/advisor/AdvisorIntro";
import { AdvisorWizard } from "@/components/advisor/AdvisorWizard";
import { AdvisorProcessing } from "@/components/advisor/AdvisorProcessing";
import { AdvisorResults } from "@/components/advisor/AdvisorResults";
import { recommend, type Answers, type Recommendation } from "@/lib/advisor";

export const Route = createFileRoute("/advisor")({
  head: () => ({
    meta: [
      { title: "AI UAE Structure Advisor — Soft Bridge FZE LLC" },
      { name: "description", content: "Get an AI-driven recommendation for the right UAE business structure — jurisdiction, banking, compliance, and growth fit, with a personalized setup report." },
      { property: "og:title", content: "AI UAE Structure Advisor — Soft Bridge" },
      { property: "og:description", content: "AI-driven UAE business structure recommendation with personalized setup roadmap and PDF report." },
    ],
  }),
  component: AdvisorPage,
});

type Phase = "intro" | "wizard" | "processing" | "results";

const INITIAL: Answers = {
  business: null, clients: null, residency: null, bank: null,
  revenue: null, office: null, priorities: [], support: 3,
};

function AdvisorPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [answers, setAnswers] = useState<Answers>(INITIAL);
  const [recs, setRecs] = useState<Recommendation[] | null>(null);

  const handleComplete = () => {
    setRecs(recommend(answers));
    setPhase("processing");
  };

  const reset = () => {
    setAnswers(INITIAL);
    setRecs(null);
    setPhase("intro");
  };

  const content = useMemo(() => {
    switch (phase) {
      case "intro":
        return <AdvisorIntro onStart={() => setPhase("wizard")} />;
      case "wizard":
        return (
          <AdvisorWizard
            answers={answers}
            setAnswers={setAnswers}
            onComplete={handleComplete}
            onExit={() => setPhase("intro")}
          />
        );
      case "processing":
        return <AdvisorProcessing onDone={() => setPhase("results")} />;
      case "results":
        return recs ? <AdvisorResults answers={answers} recs={recs} onRestart={reset} /> : null;
    }
  }, [phase, answers, recs]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Subtle back-to-home link for in-advisor pages */}
      {phase !== "intro" && phase !== "processing" && (
        <Link
          to="/"
          className="fixed top-20 left-5 z-40 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition glass-strong rounded-full px-3 py-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
      )}

      <main key={phase} className="animate-fade-in">
        {content}
      </main>

      {(phase === "intro" || phase === "results") && <Footer />}
      <FloatingActions />
    </div>
  );
}
