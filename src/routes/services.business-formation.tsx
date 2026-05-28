import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  FileCheck,
  MapPin,
  ScrollText,
  Stamp,
  Landmark,
  IdCard,
  Briefcase,
  ShieldCheck,
  Rocket,
  Zap,
  Sparkles,
} from "lucide-react";
import { ServicePageLayout, type ServicePageConfig } from "@/components/site/ServicePageLayout";

const config: ServicePageConfig = {
  eyebrow: "Business Formation",
  title: (
    <>
      Launch Your UAE Company With{" "}
      <span className="gradient-text">Precision &amp; Speed</span>
    </>
  ),
  subtitle:
    "Mainland or Free Zone — we engineer the right jurisdiction, license, and structure for how your business actually operates. From trade name reservation to establishment card, handled end-to-end.",
  accentGradient: "from-violet-500/20 via-amber-400/10 to-transparent",
  accentColor: "oklch(0.65 0.25 295)",
  secondaryAccentColor: "oklch(0.84 0.10 82)",
  overview: {
    heading: (
      <>
        Not just a license — a <span className="gradient-text">complete operating structure</span>
      </>
    ),
    body: [
      "Choosing the wrong jurisdiction, activity, or license tier costs more to unwind than to plan correctly the first time. We start with your business model, target markets, banking needs, and residency goals — then engineer the structure around them.",
      "We coordinate every step: jurisdiction selection across UAE Mainland and 40+ Free Zones, trade name reservation, initial approvals, Ejari, license issuance, and the establishment card — all visible in your client portal in real time.",
    ],
  },
  services: [
    { icon: Building2, title: "UAE Mainland Setup", text: "DED licensing, local market access, and unrestricted activity scope." },
    { icon: MapPin, title: "Free Zone Setup", text: "IFZA, DMCC, Meydan, DAFZA, SHAMS, RAKEZ, ADGM and 30+ more — matched to your activity." },
    { icon: Briefcase, title: "Jurisdiction Selection", text: "Activity, cost, banking, visa quota, and tax — analyzed side by side." },
    { icon: ScrollText, title: "Trade Name Reservation", text: "Compliant, brandable name reservation with the relevant authority." },
    { icon: FileCheck, title: "Initial Approval", text: "Government pre-approval handled before any commitment of capital." },
    { icon: Stamp, title: "Trade License Issuance", text: "Professional, commercial, industrial, or e-commerce licenses." },
    { icon: Landmark, title: "Ejari & Office", text: "Flexi-desks, smart offices, or full physical offices — coordinated and registered." },
    { icon: IdCard, title: "Establishment Card", text: "Required for visa quotas, banking, and operational onboarding." },
    { icon: ShieldCheck, title: "Compliance Foundation", text: "MOA, shareholder structure, UBO, ESR readiness from day one." },
  ],
  process: [
    { title: "Discovery", text: "We map your business model, target markets, founders, and operational reality." },
    { title: "Structure Design", text: "Jurisdiction, license type, activity codes, and ownership structured as one coherent plan." },
    { title: "Documentation", text: "We prepare and check every form, passport copy, MOA, and supporting document." },
    { title: "Submission & Approvals", text: "Initial approval, trade name, Ejari, and authority filings handled in parallel." },
    { title: "License Issuance", text: "Trade license and establishment card delivered — your company is live." },
    { title: "Activation", text: "Banking introductions, residency, and operations kick off seamlessly." },
  ],
  benefits: [
    { icon: Zap, title: "Faster Time-To-License", text: "Most setups go from discovery to license in 1–3 weeks." },
    { icon: ShieldCheck, title: "Right-First-Time", text: "No costly restructuring six months in." },
    { icon: Rocket, title: "Banking-Ready", text: "Structures designed with banking acceptance in mind from day one." },
    { icon: Sparkles, title: "Premium Experience", text: "Cinematic client portal, transparent pricing, real-time updates." },
    { icon: Building2, title: "40+ Jurisdictions", text: "Direct relationships across Mainland and Free Zones." },
    { icon: Briefcase, title: "End-to-End", text: "Setup, residency, banking, compliance — one accountable partner." },
  ],
  whyUs: [
    "15+ years combined UAE business setup experience",
    "Direct relationships with 40+ Free Zones and Mainland authorities",
    "Transparent fixed-fee pricing with no hidden costs",
    "Cinematic client portal tracks every stage in real time",
    "Banking-aware structure design from the first conversation",
    "Long-term partnership — renewals, scaling, and compliance ongoing",
  ],
  portalNote:
    "From trade name reservation to establishment card, every stage of your formation is visible in your portal. Upload documents, monitor approvals, and receive instant status updates.",
  faqs: [
    { q: "Mainland or Free Zone — which is right for me?", a: "It depends on your activity, target market, banking needs, and visa requirements. Mainland gives unrestricted UAE-wide trading; Free Zones offer cost efficiency, 100% ownership, and specialized ecosystems. We analyze both for your exact case." },
    { q: "How long does company formation take?", a: "Most setups move from discovery to license issuance in 1–3 weeks depending on jurisdiction, activity, and documentation readiness." },
    { q: "Do I need to be physically in the UAE?", a: "Not always. Many Free Zone setups can be initiated remotely, with your presence required only for biometrics during residency. We'll confirm based on your chosen jurisdiction." },
    { q: "What documents do I need?", a: "Typically passport copies, a passport-style photo, and basic KYC. Additional documents may apply for specific activities — we provide a tailored checklist upfront." },
    { q: "Can I change activities later?", a: "Yes — activities can be added or amended through the licensing authority. We handle the amendment process when you scale or pivot." },
  ],
};

export const Route = createFileRoute("/services/business-formation")({
  head: () => ({
    meta: [
      { title: "UAE Business Formation — Mainland & Free Zone Setup | Soft Bridge" },
      { name: "description", content: "Premium UAE company formation: Mainland and Free Zone setup, jurisdiction selection, trade license, Ejari, establishment card. Cinematic client portal with real-time tracking." },
      { property: "og:title", content: "UAE Business Formation — Soft Bridge FZE LLC" },
      { property: "og:description", content: "End-to-end UAE company setup engineered for banking, residency, and long-term operations." },
      { property: "og:url", content: "https://softbridge.ae/services/business-formation" },
    ],
    links: [{ rel: "canonical", href: "https://softbridge.ae/services/business-formation" }],
  }),
  component: () => <ServicePageLayout config={config} />,
});
