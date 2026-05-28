import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { WhatWeDo } from "@/components/site/WhatWeDo";
import { RemoteSetupTeaser } from "@/components/site/RemoteSetupTeaser";
import { Process } from "@/components/site/Process";
import { LongTermSupport } from "@/components/site/LongTermSupport";
import { DigitalInfrastructure } from "@/components/site/DigitalInfrastructure";
import { Packages } from "@/components/site/Packages";
import { Recognition } from "@/components/site/Recognition";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { AiAdvisorTeaser } from "@/components/site/AiAdvisorTeaser";
import { UaeIntelligenceMap } from "@/components/site/UaeIntelligenceMap";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Soft Bridge FZE LLC — Business Infrastructure in the UAE" },
      { name: "description", content: "Soft Bridge builds business infrastructure in the UAE — company formation, banking, compliance, and digital growth, with long-term operational support." },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <WhatWeDo />
        <AiAdvisorTeaser />

        <RemoteSetupTeaser />
        <Process />
        <LongTermSupport />
        <DigitalInfrastructure />
        <Recognition />
        <Packages />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
