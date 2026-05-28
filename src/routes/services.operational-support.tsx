import { createFileRoute } from "@tanstack/react-router";
import {
  Headphones,
  RefreshCw,
  FileText,
  Bell,
  LayoutDashboard,
  TrendingUp,
  ShieldCheck,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";
import { ServicePageLayout, type ServicePageConfig } from "@/components/site/ServicePageLayout";

const config: ServicePageConfig = {
  eyebrow: "Operational Support",
  title: (
    <>
      Lifetime Support For Your{" "}
      <span className="gradient-text">UAE Business</span>
    </>
  ),
  subtitle:
    "Renewals, document changes, compliance reminders, and operational guidance — Soft Bridge stays with you long after setup. A genuine long-term partnership, not a transaction.",
  accentGradient: "from-rose-500/20 via-amber-400/10 to-transparent",
  accentColor: "oklch(0.7 0.15 25)",
  secondaryAccentColor: "oklch(0.84 0.10 82)",
  overview: {
    heading: (
      <>
        The work doesn't end at the <span className="gradient-text">license</span>
      </>
    ),
    body: [
      "Most consultancies disappear once the trade license is issued. We don't. Renewals, visa changes, banking updates, compliance filings, document amendments — your business needs ongoing care, and we make it effortless.",
      "Our lifetime support philosophy means your dedicated team is one message away. Whether it's a new hire's visa, a license renewal, a banking update, or a tax filing — it's handled, tracked, and visible in your portal.",
    ],
  },
  services: [
    { icon: RefreshCw, title: "License Renewals", text: "Trade license renewals tracked and processed before expiry." },
    { icon: FileText, title: "Document Coordination", text: "MOA amendments, activity changes, shareholder updates handled end-to-end." },
    { icon: Bell, title: "Compliance Reminders", text: "Proactive reminders for tax, UBO, ESR, visa, and license deadlines." },
    { icon: LayoutDashboard, title: "Portal Support", text: "Dedicated digital portal with full case history and document storage." },
    { icon: Users, title: "Visa Management", text: "New hires, family additions, renewals, and cancellations." },
    { icon: TrendingUp, title: "Growth Infrastructure", text: "Scaling guidance: branch licenses, additional activities, new jurisdictions." },
    { icon: ShieldCheck, title: "Regulatory Updates", text: "We monitor UAE regulatory changes so you don't have to." },
    { icon: Headphones, title: "Dedicated Account Manager", text: "A real person, not a ticket queue — same team for years." },
    { icon: Sparkles, title: "Premium Concierge", text: "Banking introductions, government liaison, attestations — handled." },
  ],
  process: [
    { title: "Onboarding", text: "Post-setup handover into our long-term support team with full file transfer." },
    { title: "Compliance Calendar", text: "All deadlines, renewals, and filings mapped into your portal." },
    { title: "Proactive Monitoring", text: "Reminders sent well in advance — no surprises, no late fees." },
    { title: "On-Demand Requests", text: "Need something? One message, fast response, fixed pricing." },
    { title: "Annual Reviews", text: "Yearly health check on structure, banking, compliance, and growth." },
    { title: "Long-Term Partnership", text: "Years of continuity with the same team that knows your business." },
  ],
  benefits: [
    { icon: Heart, title: "Lifetime Support Philosophy", text: "We're with you for the long term, not just the launch." },
    { icon: Bell, title: "Zero Missed Deadlines", text: "Proactive reminders mean no fines, no surprises." },
    { icon: Sparkles, title: "Premium Concierge", text: "Government, banking, and attestation liaison done for you." },
    { icon: Users, title: "Same Team, Years On", text: "Continuity matters — your dedicated team knows your history." },
    { icon: TrendingUp, title: "Built For Scaling", text: "Branch licenses, new activities, and new jurisdictions handled." },
    { icon: ShieldCheck, title: "Regulatory Watch", text: "We monitor regulatory changes and brief you on what matters." },
  ],
  whyUs: [
    "Lifetime support philosophy — we stay long after setup",
    "Dedicated account manager who knows your business",
    "Proactive deadline tracking — no missed renewals",
    "Digital portal with full case and document history",
    "Fixed-fee on-demand requests, no hourly billing surprises",
    "15+ years of UAE operational experience across industries",
  ],
  portalNote:
    "Every renewal, document, visa, and request is tracked in your portal. Submit new requests, monitor progress, and access your full case history any time.",
  faqs: [
    { q: "What does 'lifetime support' actually mean?", a: "It means we don't disappear after the license is issued. As long as your business is active with us, we manage renewals, compliance, visas, and on-demand requests as part of an ongoing partnership." },
    { q: "Is operational support included or extra?", a: "Base support (deadline reminders, portal access, account manager) is included with active clients. Specific transactions (renewals, visa amendments, attestations) are quoted with fixed transparent pricing." },
    { q: "How fast do you respond to requests?", a: "Standard requests are acknowledged within 1 business day. Urgent matters (visa, banking, regulatory) are prioritized same-day where possible." },
    { q: "Can you take over from another consultancy?", a: "Yes — we regularly take over from other providers. We handle the file transfer, audit your current standing, and bring you into our portal." },
    { q: "What if I expand into another emirate or jurisdiction?", a: "We handle branch licenses, additional jurisdictions, and structural changes as a natural extension of our long-term support." },
  ],
};

export const Route = createFileRoute("/services/operational-support")({
  head: () => ({
    meta: [
      { title: "UAE Operational Support — Renewals, Compliance & Growth | Soft Bridge" },
      { name: "description", content: "Lifetime UAE business support: license renewals, document coordination, visa management, compliance reminders, and growth infrastructure — all in one digital portal." },
      { property: "og:title", content: "UAE Operational Support — Soft Bridge" },
      { property: "og:description", content: "Long-term operational support for UAE businesses: renewals, compliance, visas, and growth — built around a lifetime partnership." },
      { property: "og:url", content: "https://bridge-to-success-web.lovable.app/services/operational-support" },
    ],
    links: [{ rel: "canonical", href: "https://bridge-to-success-web.lovable.app/services/operational-support" }],
  }),
  component: () => <ServicePageLayout config={config} />,
});
