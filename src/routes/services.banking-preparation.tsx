import { createFileRoute } from "@tanstack/react-router";
import {
  Landmark,
  FileText,
  ShieldCheck,
  Briefcase,
  TrendingUp,
  ScanLine,
  Building2,
  Sparkles,
  Zap,
  Globe,
} from "lucide-react";
import { ServicePageLayout, type ServicePageConfig } from "@/components/site/ServicePageLayout";

const config: ServicePageConfig = {
  eyebrow: "Banking Preparation",
  title: (
    <>
      Bank-Ready From <span className="gradient-text">Day One</span>
    </>
  ),
  subtitle:
    "UAE banking has become highly compliance-driven. We prepare your business profile, KYC, and source of funds so your application is presented at its strongest — to the banks best matched to your activity.",
  accentGradient: "from-blue-500/20 via-slate-300/10 to-transparent",
  accentColor: "oklch(0.6 0.18 245)",
  secondaryAccentColor: "oklch(0.9 0.02 230)",
  disclaimer:
    "Bank account approval is never guaranteed and remains entirely subject to each bank's independent review and compliance criteria. Soft Bridge prepares and presents your application — final approval rests solely with the bank.",
  overview: {
    heading: (
      <>
        Banking is <span className="gradient-text">a presentation</span>, not a transaction
      </>
    ),
    body: [
      "UAE banks evaluate applications on activity, structure, founder background, source of funds, and operational substance. Weak presentation is the single largest reason for rejections — even for legitimate businesses.",
      "We build your application like an investor deck: a clean business profile, defensible source of funds narrative, KYC-ready documentation, and aligned activity codes. Then we introduce you to the banks most likely to accept your business model.",
    ],
  },
  services: [
    { icon: FileText, title: "Business Profile Preparation", text: "A clear, compliant business narrative tailored to bank expectations." },
    { icon: ScanLine, title: "KYC Documentation", text: "Passport, residency, shareholder, and corporate KYC fully prepared." },
    { icon: TrendingUp, title: "Source of Funds", text: "Defensible documentation of capital origin and historical activity." },
    { icon: ShieldCheck, title: "Compliance Preparation", text: "AML/CFT alignment, UBO clarity, and PEP screening readiness." },
    { icon: Briefcase, title: "Activity Alignment", text: "License activities mapped to bank-acceptable risk categories." },
    { icon: Landmark, title: "Bank Introductions", text: "Direct introductions to banks most likely to accept your profile." },
    { icon: Building2, title: "Onboarding Guidance", text: "Interview preparation, supporting evidence, and follow-up." },
    { icon: Globe, title: "Multi-Currency Setup", text: "Guidance on AED, USD, EUR, GBP account structures." },
    { icon: Sparkles, title: "Operational Structuring", text: "Invoicing, customer flow, and contract evidence prepared in advance." },
  ],
  process: [
    { title: "Profile Assessment", text: "We review your activity, structure, and founder background." },
    { title: "Documentation Build", text: "Business profile, source of funds, contracts, and supporting evidence prepared." },
    { title: "Bank Matching", text: "We map your profile to the banks most likely to accept it." },
    { title: "Application Submission", text: "Coordinated introduction and submission to selected banks." },
    { title: "Interview Preparation", text: "We prepare you for the compliance interview and likely questions." },
    { title: "Account Activation", text: "If approved, we assist with onboarding, signatures, and access setup." },
  ],
  benefits: [
    { icon: Zap, title: "Higher Acceptance Rates", text: "Prepared applications outperform raw submissions significantly." },
    { icon: ShieldCheck, title: "Compliance-First", text: "Built around what banks actually require, not what brochures promise." },
    { icon: Landmark, title: "Multi-Bank Strategy", text: "We don't tie you to one bank — we go where you fit." },
    { icon: Briefcase, title: "Transparent Process", text: "You see every step, every document, every status update." },
    { icon: Globe, title: "Local & International", text: "From UAE retail banks to digital and international institutions." },
    { icon: Sparkles, title: "Premium Coordination", text: "Dedicated banking specialist, not a generic case worker." },
  ],
  whyUs: [
    "Deep working knowledge of UAE bank compliance frameworks",
    "Direct relationships across local and international banks",
    "Transparent preparation — we never promise guaranteed approval",
    "Activity, structure, and KYC aligned before submission",
    "Interview preparation included as standard",
    "Long-term banking support — not just account opening",
  ],
  portalNote:
    "Track your banking preparation digitally: document checklist, profile drafts, bank introductions, and compliance status — all in one secure portal.",
  faqs: [
    { q: "Can you guarantee a bank account?", a: "No — and any consultant who promises guaranteed approval is misleading you. Banks make independent decisions. What we guarantee is the strongest possible presentation of your application." },
    { q: "How long does account opening take?", a: "Typically 2–6 weeks depending on the bank, structure complexity, and founder nationality. Some digital banks are faster." },
    { q: "Which banks do you work with?", a: "We work across major UAE retail banks, digital banks, and international institutions. We match you based on your specific profile rather than promoting any single bank." },
    { q: "What documents do banks require?", a: "Trade license, MOA, shareholder KYC, residency, source of funds, business profile, contracts, and supporting evidence. We prepare a complete pack." },
    { q: "What if my first application is rejected?", a: "We analyze the reason, refine the presentation, and reapply to alternative banks. Rejection isn't the end — it's data." },
  ],
};

export const Route = createFileRoute("/services/banking-preparation")({
  head: () => ({
    meta: [
      { title: "UAE Banking Preparation — Business Account Setup | Soft Bridge" },
      { name: "description", content: "Premium UAE banking preparation: KYC, source of funds, business profile, and direct bank introductions. Higher acceptance through compliance-first preparation." },
      { property: "og:title", content: "UAE Banking Preparation — Soft Bridge" },
      { property: "og:description", content: "Bank-ready preparation for UAE business accounts. Note: approval is always subject to bank review." },
      { property: "og:url", content: "https://bridge-to-success-web.lovable.app/services/banking-preparation" },
    ],
    links: [{ rel: "canonical", href: "https://bridge-to-success-web.lovable.app/services/banking-preparation" }],
  }),
  component: () => <ServicePageLayout config={config} />,
});
