import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { PricingOffer } from "@/components/site/PricingOffer";
import { WhatWeDo } from "@/components/site/WhatWeDo";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { useReveal } from "@/hooks/use-reveal";

// Below-the-fold sections are code-split to shrink the initial bundle
// and speed up LCP / TTI on the homepage.
const AiAdvisorTeaser = lazy(() => import("@/components/site/AiAdvisorTeaser").then(m => ({ default: m.AiAdvisorTeaser })));
const AiCommandCenter = lazy(() => import("@/components/site/AiCommandCenter").then(m => ({ default: m.AiCommandCenter })));
const RemoteSetupTeaser = lazy(() => import("@/components/site/RemoteSetupTeaser").then(m => ({ default: m.RemoteSetupTeaser })));
const WhereWeSetUp = lazy(() => import("@/components/site/WhereWeSetUp").then(m => ({ default: m.WhereWeSetUp })));
const Process = lazy(() => import("@/components/site/Process").then(m => ({ default: m.Process })));
const LongTermSupport = lazy(() => import("@/components/site/LongTermSupport").then(m => ({ default: m.LongTermSupport })));
const DigitalInfrastructure = lazy(() => import("@/components/site/DigitalInfrastructure").then(m => ({ default: m.DigitalInfrastructure })));
const Recognition = lazy(() => import("@/components/site/Recognition").then(m => ({ default: m.Recognition })));
const Packages = lazy(() => import("@/components/site/Packages").then(m => ({ default: m.Packages })));
const Testimonials = lazy(() => import("@/components/site/Testimonials").then(m => ({ default: m.Testimonials })));
const LatestInsights = lazy(() => import("@/components/site/LatestInsights").then(m => ({ default: m.LatestInsights })));
const FAQ = lazy(() => import("@/components/site/FAQ").then(m => ({ default: m.FAQ })));
const Contact = lazy(() => import("@/components/site/Contact").then(m => ({ default: m.Contact })));
const OnboardingDialog = lazy(() => import("@/components/site/OnboardingDialog").then(m => ({ default: m.OnboardingDialog })));

import { FAQS } from "@/components/site/FAQ";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Soft Bridge FZE LLC — Business Infrastructure in the UAE" },
      { name: "description", content: "Soft Bridge builds business infrastructure in the UAE — company formation, banking, compliance, and digital growth, with long-term operational support." },
      { property: "og:url", content: "https://softbridge.ae" },
    ],
    links: [{ rel: "canonical", href: "https://softbridge.ae" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Soft Bridge FZE LLC",
          url: "https://softbridge.ae",
          logo: "https://softbridge.ae/assets/logo-sb-DRVC3-NY.webp",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+971502429035",
            contactType: "customer service",
          },
          address: {
            "@type": "PostalAddress",
            streetAddress: "26, Amber Gem Tower",
            addressLocality: "Ajman",
            addressCountry: "AE",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

const SectionFallback = () => <div className="min-h-[200px]" aria-hidden />;

function Index() {
  useReveal();
  const [onboarding, setOnboarding] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <Packages />
        </Suspense>
        <PricingOffer id="offer" onStartSetup={() => setOnboarding(true)} />
        <WhatWeDo />
        <Suspense fallback={<SectionFallback />}>
          <AiAdvisorTeaser />
          <AiCommandCenter onStartSetup={() => setOnboarding(true)} />
          <RemoteSetupTeaser />
          <WhereWeSetUp />
          <Process />
          <LongTermSupport />
          <DigitalInfrastructure />
          <Recognition />
          <Testimonials />
          <LatestInsights />
          <FAQ />
          <Contact />
        </Suspense>
      </main>

      <Footer />
      <FloatingActions />
      {onboarding && (
        <Suspense fallback={null}>
          <OnboardingDialog open={onboarding} onOpenChange={setOnboarding} />
        </Suspense>
      )}
    </div>
  );
}
