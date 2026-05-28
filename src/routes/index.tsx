import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
import { AiCommandCenter } from "@/components/site/AiCommandCenter";
import { WhereWeSetUp } from "@/components/site/WhereWeSetUp";
import { LatestInsights } from "@/components/site/LatestInsights";
import { PricingOffer } from "@/components/site/PricingOffer";
import { OnboardingDialog } from "@/components/site/OnboardingDialog";

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
  const [onboarding, setOnboarding] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <PricingOffer id="offer" onStartSetup={() => setOnboarding(true)} />
        <WhatWeDo />
        <AiAdvisorTeaser />
        <AiCommandCenter onStartSetup={() => setOnboarding(true)} />

        <RemoteSetupTeaser />
        <WhereWeSetUp />
        <Process />
        <LongTermSupport />
        <DigitalInfrastructure />
        <Recognition />
        <Packages />
        <Testimonials />
        <LatestInsights />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <OnboardingDialog open={onboarding} onOpenChange={setOnboarding} />
    </div>
  );
}
