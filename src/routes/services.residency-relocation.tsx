import { createFileRoute } from "@tanstack/react-router";
import {
  IdCard,
  Plane,
  Stethoscope,
  Users,
  Home,
  ShieldCheck,
  Compass,
  Sparkles,
  Globe,
  Zap,
} from "lucide-react";
import { ServicePageLayout, type ServicePageConfig } from "@/components/site/ServicePageLayout";

const config: ServicePageConfig = {
  eyebrow: "Residency & Relocation",
  title: (
    <>
      Make the UAE <span className="gradient-text">Your Home</span>
    </>
  ),
  subtitle:
    "Investor visas, Emirates ID, medical coordination, and family residency — coordinated end-to-end so you can focus on your business, not paperwork.",
  accentGradient: "from-emerald-500/20 via-amber-400/10 to-transparent",
  accentColor: "oklch(0.7 0.18 165)",
  secondaryAccentColor: "oklch(0.84 0.10 82)",
  overview: {
    heading: (
      <>
        A residency process built for <span className="gradient-text">founders &amp; families</span>
      </>
    ),
    body: [
      "UAE residency is more than a visa — it's the foundation for banking, schooling, healthcare, and long-term planning. We design every step around your timeline, your family, and your operational needs.",
      "From investor visa applications and medical coordination to Emirates ID, family sponsorship, and relocation guidance — everything is handled by a dedicated coordinator and visible in your portal.",
    ],
  },
  services: [
    { icon: IdCard, title: "Investor / Partner Visa", text: "2-year and 10-year Golden Visa pathways structured around eligibility." },
    { icon: Plane, title: "Entry Permit", text: "E-visa coordination for status change inside the UAE." },
    { icon: Stethoscope, title: "Medical Test", text: "Booking, coordination, and same-day premium options where available." },
    { icon: IdCard, title: "Emirates ID", text: "Biometrics, processing, and delivery — fully tracked." },
    { icon: Users, title: "Family Residency", text: "Spouse, children, parents, and domestic staff sponsorship." },
    { icon: Home, title: "Relocation Guidance", text: "Housing, schooling, banking introductions, and lifestyle setup." },
    { icon: Compass, title: "Golden Visa Eligibility", text: "Structured review and application strategy for long-term residency." },
    { icon: ShieldCheck, title: "Renewal Management", text: "Proactive renewal reminders and end-to-end handling." },
    { icon: Globe, title: "Multi-Country Coordination", text: "Documentation, attestations, and apostilles across jurisdictions." },
  ],
  process: [
    { title: "Eligibility Review", text: "We confirm your visa pathway, quota, and family scope." },
    { title: "Entry Permit", text: "Application filed and tracked through immigration." },
    { title: "Status Change & Medical", text: "Medical test and biometrics scheduled at premium centers." },
    { title: "Emirates ID Issuance", text: "ID processed, delivered, and stored in your portal." },
    { title: "Family Sponsorship", text: "Spouse and children processed in parallel where possible." },
    { title: "Renewal & Ongoing", text: "Automated reminders and full lifecycle management." },
  ],
  benefits: [
    { icon: Zap, title: "Fast-Tracked Where Possible", text: "Premium and express channels used when timing matters." },
    { icon: Users, title: "Family-First", text: "Spouse and children planned alongside the founder from day one." },
    { icon: ShieldCheck, title: "Zero Missed Steps", text: "Coordinated checklist, nothing falls between the cracks." },
    { icon: Sparkles, title: "Premium Concierge", text: "Dedicated coordinator from application to ID delivery." },
    { icon: Globe, title: "Global Documentation", text: "Attestation and legalization across multiple countries." },
    { icon: Home, title: "Lifestyle Setup", text: "Housing, schools, and banking introductions when you arrive." },
  ],
  whyUs: [
    "Dedicated relocation coordinator from day one",
    "Premium medical and biometric centers used by default",
    "Family sponsorship structured alongside founder visa",
    "Proactive renewal management — never expire by surprise",
    "End-to-end attestation and documentation support",
    "Lifestyle and relocation guidance beyond the paperwork",
  ],
  portalNote:
    "Every residency stage — entry permit, medical, biometrics, Emirates ID — is tracked digitally. Upload passport scans, monitor status, and receive document delivery confirmations in real time.",
  faqs: [
    { q: "How long does UAE residency take?", a: "Most investor visas complete within 2–4 weeks from entry permit to Emirates ID, depending on jurisdiction and biometric scheduling." },
    { q: "Can I sponsor my family?", a: "Yes — once your residency is active, you can sponsor your spouse, children, and (in many cases) parents and domestic staff." },
    { q: "Do I qualify for the Golden Visa?", a: "Eligibility varies by investment, profession, and category. We review your case and apply where it makes strategic sense." },
    { q: "What's the cost of medical and Emirates ID?", a: "Government fees are transparent and quoted upfront. We use premium centers for faster turnaround at a fixed service fee." },
    { q: "Do I need to live in the UAE full-time?", a: "Residents must enter the UAE at least once every 180 days to keep their visa active. We help you plan accordingly." },
  ],
};

export const Route = createFileRoute("/services/residency-relocation")({
  head: () => ({
    meta: [
      { title: "UAE Residency & Relocation — Investor Visa, Emirates ID, Family | Soft Bridge" },
      { name: "description", content: "End-to-end UAE residency: investor visa, medical, Emirates ID, family sponsorship, Golden Visa, and full relocation guidance with digital tracking." },
      { property: "og:title", content: "UAE Residency & Relocation — Soft Bridge" },
      { property: "og:description", content: "Premium residency coordination for founders and families relocating to the UAE." },
      { property: "og:url", content: "https://softbridge.ae/services/residency-relocation" },
    ],
    links: [{ rel: "canonical", href: "https://softbridge.ae/services/residency-relocation" }],
  }),
  component: () => <ServicePageLayout config={config} />,
});
