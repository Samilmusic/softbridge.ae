import { createFileRoute } from "@tanstack/react-router";
import {
  Globe,
  Cpu,
  Megaphone,
  Sparkles,
  LayoutDashboard,
  Palette,
  Zap,
  Rocket,
  Code2,
  Bot,
} from "lucide-react";
import { ServicePageLayout, type ServicePageConfig } from "@/components/site/ServicePageLayout";

const config: ServicePageConfig = {
  eyebrow: "Web & Advertising",
  title: (
    <>
      Digital Infrastructure For{" "}
      <span className="gradient-text">Modern Businesses</span>
    </>
  ),
  subtitle:
    "Websites, SaaS systems, AI integrations, automation, client portals, branding, and advertising — Soft Bridge combines business setup with the technology that makes it scale.",
  accentGradient: "from-purple-500/25 via-cyan-400/15 to-transparent",
  accentColor: "oklch(0.65 0.25 295)",
  secondaryAccentColor: "oklch(0.75 0.18 210)",
  overview: {
    heading: (
      <>
        We don't just license you — we <span className="gradient-text">build your stack</span>
      </>
    ),
    body: [
      "Most consultancies stop at the license. We start there. Once your business is live, you need a website that converts, systems that scale, and advertising that brings qualified pipeline — not just impressions.",
      "From conversion-focused websites and custom SaaS systems to AI agents, automation, branding, and full-funnel digital advertising — we build your operating layer alongside your legal structure.",
    ],
  },
  services: [
    { icon: Globe, title: "Website Development", text: "Conversion-focused websites built on modern, fast frameworks." },
    { icon: Code2, title: "Custom SaaS Systems", text: "Internal tools, dashboards, and customer-facing software built to spec." },
    { icon: Bot, title: "AI Integrations", text: "AI agents, chatbots, and intelligent automation embedded in your workflow." },
    { icon: Zap, title: "Workflow Automation", text: "CRM, lead routing, document processing, and operations automated." },
    { icon: LayoutDashboard, title: "Client Portals", text: "Branded portals so your customers feel the same premium experience." },
    { icon: Palette, title: "Branding & Identity", text: "Logo systems, visual identity, brand guidelines, and marketing collateral." },
    { icon: Megaphone, title: "Digital Advertising", text: "Google, Meta, and LinkedIn campaigns engineered for qualified pipeline." },
    { icon: Cpu, title: "Digital Infrastructure", text: "Hosting, domains, email, security, and the foundations that don't break." },
    { icon: Sparkles, title: "Conversion Optimization", text: "Analytics, A/B testing, and funnel optimization for measurable lift." },
  ],
  process: [
    { title: "Discovery & Strategy", text: "We map your audience, offer, funnel, and the technology that supports them." },
    { title: "Design & Architecture", text: "Brand, UX, system architecture, and integrations designed as one." },
    { title: "Build & Integrate", text: "Engineering, content, and AI integrations developed and connected." },
    { title: "Launch & Campaigns", text: "Website goes live, campaigns activate, tracking is fully instrumented." },
    { title: "Optimize", text: "A/B testing, funnel tuning, and performance optimization." },
    { title: "Scale & Evolve", text: "Ongoing iteration, new features, and infrastructure that grows with you." },
  ],
  benefits: [
    { icon: Rocket, title: "One Accountable Team", text: "Setup + tech under one roof — no finger-pointing between vendors." },
    { icon: Zap, title: "Speed of Execution", text: "Modern stacks and AI-augmented delivery mean weeks, not quarters." },
    { icon: Bot, title: "AI-Native Workflows", text: "Automation and AI built in from day one, not retrofitted." },
    { icon: Cpu, title: "Premium Performance", text: "Fast, secure, SEO-ready infrastructure that ranks and converts." },
    { icon: Megaphone, title: "Measurable Pipeline", text: "Campaigns instrumented for ROAS, CPA, and pipeline — not vanity metrics." },
    { icon: Sparkles, title: "Cinematic Brand", text: "Visual identity that matches the premium of your offering." },
  ],
  whyUs: [
    "Business setup + technology delivered by one accountable team",
    "Modern stacks: React, TanStack, Vite, Supabase, AI gateways",
    "AI and automation built in from the first sprint",
    "Brand, web, and advertising aligned for conversion",
    "Lifetime portal and infrastructure support",
    "Transparent roadmaps, sprint reviews, and measurable KPIs",
  ],
  portalNote:
    "Every project sprint, design iteration, ad campaign, and analytics report is visible in your portal. Approve designs, monitor performance, and request changes — all digitally.",
  faqs: [
    { q: "Do I need to use you for setup to access web/AI services?", a: "No. Many clients come to us purely for web, AI, or advertising. Our digital infrastructure team operates as a standalone offering." },
    { q: "What tech stack do you build on?", a: "Modern React (TanStack Start, Vite, Tailwind), serverless edge functions, Supabase/Postgres, and AI gateways. Fast, SEO-friendly, and scalable." },
    { q: "Can you integrate AI into my existing business?", a: "Yes — we build AI agents, automation, and copilots that integrate with your CRM, email, documents, and customer support flows." },
    { q: "How do you measure advertising performance?", a: "Every campaign is instrumented with full-funnel tracking: ROAS, CPA, qualified pipeline, and downstream conversion — not just clicks." },
    { q: "Do you support ongoing changes?", a: "Yes — ongoing retainers cover content updates, new features, ad optimization, and infrastructure maintenance. We treat it as a long-term partnership." },
  ],
};

export const Route = createFileRoute("/services/web-advertising")({
  head: () => ({
    meta: [
      { title: "Web, AI & Advertising — Digital Infrastructure | Soft Bridge" },
      { name: "description", content: "Websites, SaaS systems, AI integrations, automation, branding, and digital advertising — Soft Bridge combines UAE business setup with modern technology infrastructure." },
      { property: "og:title", content: "Web, AI & Advertising — Soft Bridge" },
      { property: "og:description", content: "Modern digital infrastructure: web, AI, automation, and full-funnel advertising for UAE businesses." },
      { property: "og:url", content: "https://softbridge.ae/services/web-advertising" },
    ],
    links: [{ rel: "canonical", href: "https://softbridge.ae/services/web-advertising" }],
  }),
  component: () => <ServicePageLayout config={config} />,
});
