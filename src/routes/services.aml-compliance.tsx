import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  FileCheck,
  ScanLine,
  Building2,
  ScrollText,
  Landmark,
  AlertTriangle,
  BookOpen,
  Sparkles,
  Zap,
} from "lucide-react";
import { ServicePageLayout, type ServicePageConfig } from "@/components/site/ServicePageLayout";

const config: ServicePageConfig = {
  eyebrow: "AML & Compliance",
  title: (
    <>
      Compliance Built Into <span className="gradient-text">Your Operations</span>
    </>
  ),
  subtitle:
    "AML registration, KYC frameworks, corporate tax, ESR, UBO, and ongoing regulatory readiness — engineered as part of your business, not a one-off filing.",
  accentGradient: "from-amber-700/20 via-orange-500/10 to-transparent",
  accentColor: "oklch(0.55 0.18 50)",
  secondaryAccentColor: "oklch(0.84 0.10 82)",
  overview: {
    heading: (
      <>
        Compliance is now an <span className="gradient-text">operating system</span>
      </>
    ),
    body: [
      "The UAE regulatory landscape has matured rapidly: AML/CFT, goAML, ESR, UBO, corporate tax, and VAT all carry real obligations and real penalties. The cost of getting it wrong is far higher than the cost of getting it right.",
      "We build your compliance posture from the structure outward — AML registration, KYC workflows, corporate tax registration, recordkeeping, and ongoing monitoring — so you're audit-ready, not panic-ready.",
    ],
  },
  services: [
    { icon: ShieldCheck, title: "AML Registration", text: "goAML registration and DNFBP/financial classification guidance." },
    { icon: ScanLine, title: "KYC Frameworks", text: "Customer KYC, EDD, and ongoing monitoring procedures tailored to activity." },
    { icon: FileCheck, title: "UBO Filing", text: "Ultimate Beneficial Owner declaration and ongoing updates." },
    { icon: ScrollText, title: "ESR Compliance", text: "Economic Substance Regulation notifications and reports where applicable." },
    { icon: Landmark, title: "Corporate Tax Registration", text: "9% UAE corporate tax registration and ongoing readiness." },
    { icon: Building2, title: "VAT Registration", text: "VAT assessment, registration, and quarterly filing support." },
    { icon: BookOpen, title: "Compliance Policies", text: "AML manual, KYC procedures, and internal controls documentation." },
    { icon: AlertTriangle, title: "PEP & Sanctions Screening", text: "Workflow and tooling guidance for ongoing screening." },
    { icon: Sparkles, title: "Operational Structuring", text: "Compliance embedded into invoicing, contracts, and customer onboarding." },
  ],
  process: [
    { title: "Compliance Audit", text: "We review your activity, customers, and current posture against UAE requirements." },
    { title: "Registration Strategy", text: "AML, UBO, ESR, corporate tax, and VAT mapped to your obligations." },
    { title: "Documentation Build", text: "AML manual, KYC procedures, and policy framework drafted." },
    { title: "Filings & Submissions", text: "goAML, UBO, tax, and ESR filings handled on your behalf." },
    { title: "Training & Handover", text: "Founders and staff briefed on day-to-day obligations." },
    { title: "Ongoing Monitoring", text: "Renewal reminders, regulatory updates, and audit support continuous." },
  ],
  benefits: [
    { icon: ShieldCheck, title: "Audit-Ready", text: "Documentation, filings, and policies always in order." },
    { icon: Zap, title: "Penalty Avoidance", text: "Missed AML or UBO filings carry serious financial penalties." },
    { icon: Landmark, title: "Tax-Optimized", text: "Corporate tax and VAT structured efficiently within the law." },
    { icon: BookOpen, title: "Founder-Friendly", text: "Plain-language guidance, not legalese — you understand what you sign." },
    { icon: AlertTriangle, title: "Risk Reduction", text: "PEP and sanctions screening protect you from reputational damage." },
    { icon: Sparkles, title: "Embedded Compliance", text: "Built into your operations, not bolted on at year-end." },
  ],
  whyUs: [
    "Up-to-date on every recent UAE regulatory change",
    "AML, UBO, ESR, corporate tax, and VAT under one roof",
    "Plain-language explanations — no jargon shields",
    "Documentation built to withstand audit",
    "Renewals and deadlines tracked in your portal",
    "Long-term compliance partnership, not one-off filings",
  ],
  portalNote:
    "Every filing, renewal, and deadline tracked digitally. Upload supporting documents, monitor submission status, and receive proactive reminders before anything is due.",
  faqs: [
    { q: "Do I need AML registration?", a: "If your business is classified as a DNFBP (real estate brokers, gold/precious metals dealers, corporate service providers, etc.) or a financial institution, AML registration is mandatory. We assess your classification first." },
    { q: "What is UBO and do I need to file?", a: "UBO (Ultimate Beneficial Owner) declarations are required for almost all UAE entities. Failing to file or update carries fines. We handle filing and ongoing updates." },
    { q: "Does my business pay UAE corporate tax?", a: "9% corporate tax applies to most UAE businesses with profits above AED 375,000, with specific Free Zone exemptions for qualifying income. We assess your case and register accordingly." },
    { q: "How often do AML obligations need to be reviewed?", a: "AML policies, KYC files, and risk assessments should be reviewed at least annually, and after any material change in customers, activity, or regulation." },
    { q: "What's the penalty for non-compliance?", a: "Penalties range from AED 5,000 to AED 1,000,000+ depending on the obligation. Some carry license suspension. The cost of compliance is always lower than the cost of non-compliance." },
  ],
};

export const Route = createFileRoute("/services/aml-compliance")({
  head: () => ({
    meta: [
      { title: "UAE AML & Compliance — Tax, UBO, ESR, KYC | Soft Bridge" },
      { name: "description", content: "UAE AML registration, corporate tax, UBO, ESR, KYC frameworks, and ongoing compliance — engineered into your operations with full digital tracking." },
      { property: "og:title", content: "UAE AML & Compliance — Soft Bridge" },
      { property: "og:description", content: "Complete UAE regulatory readiness: AML, corporate tax, UBO, ESR, and KYC built into your business." },
      { property: "og:url", content: "https://bridge-to-success-web.lovable.app/services/aml-compliance" },
    ],
    links: [{ rel: "canonical", href: "https://bridge-to-success-web.lovable.app/services/aml-compliance" }],
  }),
  component: () => <ServicePageLayout config={config} />,
});
