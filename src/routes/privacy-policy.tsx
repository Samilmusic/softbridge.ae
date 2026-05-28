import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SITE, WA_LINK } from "@/lib/site";
import { Shield, Mail, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Soft Bridge FZE LLC" },
      { name: "description", content: "Soft Bridge FZE LLC Privacy Policy. Learn how we collect, use, store, and protect your personal and business information." },
    ],
  }),
  component: PrivacyPolicyPage,
});

const SECTIONS = [
  {
    id: "company-info",
    title: "1. Company Information",
    content: (
      <div className="space-y-3">
        <p><strong>Soft Bridge FZE LLC</strong><br />United Arab Emirates</p>
        <p>Email: <a href={`mailto:${SITE.email}`} className="text-gold hover:underline">{SITE.email}</a></p>
        <p>Website: <a href="/" className="text-gold hover:underline">https://softbridgefze.com</a></p>
        <p className="text-muted-foreground italic text-sm">Soft Bridge FZE LLC is an independent private consultancy and is not affiliated with, endorsed by, or representing any UAE government authority or immigration department.</p>
      </div>
    ),
  },
  {
    id: "information-collect",
    title: "2. Information We Collect",
    content: (
      <div className="space-y-4">
        <p>We may collect the following types of information:</p>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Personal Information</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone / WhatsApp number</li>
            <li>Nationality</li>
            <li>Passport details (when required)</li>
            <li>Visa information</li>
            <li>Emirates ID details</li>
            <li>Business activity information</li>
            <li>Company setup preferences</li>
          </ul>
          <h4 className="text-sm font-semibold text-foreground pt-1">Business Information</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
            <li>Proposed business activities</li>
            <li>Jurisdiction preferences</li>
            <li>Company documents</li>
            <li>Banking-related information</li>
            <li>Tax registration details</li>
          </ul>
          <h4 className="text-sm font-semibold text-foreground pt-1">Technical Information</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Website usage data</li>
            <li>Session activity</li>
            <li>Cookies and analytics information</li>
          </ul>
          <h4 className="text-sm font-semibold text-foreground pt-1">Uploaded Documents</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
            <li>Passport copies</li>
            <li>Visa copies</li>
            <li>Emirates ID</li>
            <li>Proof of address</li>
            <li>Corporate documents</li>
            <li>Other supporting documentation</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: (
      <div className="space-y-3">
        <p>We use collected information to:</p>
        <ul className="list-disc list-inside space-y-1.5 text-muted-foreground text-sm">
          <li>Provide consultation services</li>
          <li>Process quotations and inquiries</li>
          <li>Assist with UAE company setup procedures</li>
          <li>Coordinate residency and licensing processes</li>
          <li>Provide banking preparation assistance</li>
          <li>Support tax registration processes</li>
          <li>Manage client dashboards and case tracking</li>
          <li>Improve customer support</li>
          <li>Send transactional emails and notifications</li>
          <li>Provide ongoing operational support</li>
          <li>Improve website functionality and user experience</li>
          <li>Comply with legal and regulatory obligations</li>
        </ul>
      </div>
    ),
  },
  {
    id: "client-portal",
    title: "4. Client Dashboard & Portal",
    content: (
      <div className="space-y-3">
        <p>Clients using the Soft Bridge portal may access:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>Case progress tracking</li>
          <li>Document upload systems</li>
          <li>Quotation history</li>
          <li>Support communication</li>
          <li>Timeline updates</li>
          <li>Business setup stages</li>
        </ul>
        <p className="text-sm text-muted-foreground italic">Clients are responsible for maintaining the confidentiality of their login credentials and access links.</p>
      </div>
    ),
  },
  {
    id: "email-communications",
    title: "5. Email Communications",
    content: (
      <div className="space-y-3">
        <p>We may send:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>Consultation confirmations</li>
          <li>Quotation emails</li>
          <li>Status updates</li>
          <li>Onboarding emails</li>
          <li>Document requests</li>
          <li>Invoice notifications</li>
          <li>Support communications</li>
        </ul>
        <p className="text-sm text-muted-foreground">Transactional emails may be processed through trusted third-party infrastructure providers including Resend and related communication services.</p>
      </div>
    ),
  },
  {
    id: "data-sharing",
    title: "6. Data Sharing",
    content: (
      <div className="space-y-3">
        <p>We do not sell personal information.</p>
        <p>We may share information only when necessary with:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>UAE government authorities</li>
          <li>Licensing authorities</li>
          <li>Free zones</li>
          <li>Banks or banking-related partners</li>
          <li>Payment providers</li>
          <li>Compliance providers</li>
          <li>IT infrastructure providers</li>
          <li>Legal or regulatory advisors</li>
        </ul>
        <p className="text-sm text-muted-foreground italic">Only information necessary for the requested service will be shared.</p>
      </div>
    ),
  },
  {
    id: "data-security",
    title: "7. Data Security",
    content: (
      <div className="space-y-3">
        <p>We implement reasonable technical and organizational measures to protect your information including:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>Encrypted communication</li>
          <li>Secure authentication</li>
          <li>Protected client access</li>
          <li>Restricted administrative access</li>
          <li>Secure cloud infrastructure</li>
          <li>Role-based permissions</li>
        </ul>
        <p className="text-sm text-muted-foreground italic">However, no system can guarantee absolute security.</p>
      </div>
    ),
  },
  {
    id: "document-storage",
    title: "8. Document Storage",
    content: (
      <div className="space-y-3">
        <p>Uploaded documents may be securely stored for operational, compliance, legal, and support purposes.</p>
        <p className="text-sm text-muted-foreground italic">Clients should avoid uploading unnecessary sensitive information not related to their requested services.</p>
      </div>
    ),
  },
  {
    id: "cookies-analytics",
    title: "9. Cookies & Analytics",
    content: (
      <div className="space-y-3">
        <p>Our website may use cookies and analytics technologies to:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>Improve performance</li>
          <li>Analyze visitor behavior</li>
          <li>Optimize user experience</li>
          <li>Enhance website functionality</li>
        </ul>
        <p className="text-sm text-muted-foreground">Users may disable cookies through their browser settings.</p>
      </div>
    ),
  },
  {
    id: "third-party",
    title: "10. Third-Party Services",
    content: (
      <div className="space-y-3">
        <p>Our website and systems may integrate with third-party providers including:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>Payment processors</li>
          <li>Analytics providers</li>
          <li>Cloud infrastructure providers</li>
          <li>Email delivery services</li>
          <li>Authentication services</li>
          <li>AI-related systems</li>
        </ul>
        <p className="text-sm text-muted-foreground italic">Soft Bridge is not responsible for third-party platform policies or practices.</p>
      </div>
    ),
  },
  {
    id: "international-users",
    title: "11. International Users",
    content: (
      <p className="text-muted-foreground text-sm">Users accessing our services from outside the UAE understand that information may be processed and stored in the UAE or other jurisdictions depending on operational infrastructure.</p>
    ),
  },
  {
    id: "no-government-affiliation",
    title: "12. No Government Affiliation",
    content: (
      <div className="space-y-3">
        <p>Soft Bridge FZE LLC is an independent private consultancy.</p>
        <p>All licenses, visas, permits, approvals, registrations, and official documents are issued solely by the relevant UAE government authorities and remain subject to their review, regulations, and approval processes.</p>
        <p className="text-sm text-muted-foreground italic">We do not guarantee approval outcomes.</p>
      </div>
    ),
  },
  {
    id: "limitation-liability",
    title: "13. Limitation of Liability",
    content: (
      <div className="space-y-3">
        <p>Soft Bridge shall not be liable for:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>Government rejections</li>
          <li>Delays by authorities</li>
          <li>Banking approval outcomes</li>
          <li>Third-party service interruptions</li>
          <li>Regulatory changes</li>
          <li>Client-provided inaccurate information</li>
          <li>Indirect or consequential damages</li>
        </ul>
      </div>
    ),
  },
  {
    id: "data-retention",
    title: "14. Data Retention",
    content: (
      <p className="text-muted-foreground text-sm">We may retain information and documentation for operational, legal, compliance, accounting, and support purposes as reasonably required.</p>
    ),
  },
  {
    id: "user-responsibilities",
    title: "15. User Responsibilities",
    content: (
      <div className="space-y-3">
        <p>Clients agree to:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>Provide accurate information</li>
          <li>Maintain confidentiality of access credentials</li>
          <li>Comply with UAE laws and regulations</li>
          <li>Avoid misuse of the platform or services</li>
        </ul>
      </div>
    ),
  },
  {
    id: "changes",
    title: "16. Changes to This Policy",
    content: (
      <div className="space-y-3">
        <p>We may update this Privacy Policy periodically without prior notice.</p>
        <p className="text-sm text-muted-foreground">Updated versions will be published on this page with a revised effective date.</p>
      </div>
    ),
  },
  {
    id: "contact",
    title: "17. Contact Information",
    content: (
      <div className="space-y-3">
        <p>For privacy-related inquiries, contact:</p>
        <p><strong>Soft Bridge FZE LLC</strong><br />Email: <a href={`mailto:${SITE.email}`} className="text-gold hover:underline">{SITE.email}</a><br />Website: <a href="/" className="text-gold hover:underline">https://softbridgefze.com</a></p>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-gold hover:underline mt-2"
        >
          <Mail className="w-4 h-4" />
          Reach us on WhatsApp
        </a>
      </div>
    ),
  },
];

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero banner */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.22_0.03_260)_0%,_transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0.18_0.025_82/0.08)_0%,_transparent_50%)]" />
          <div className="relative mx-auto max-w-4xl px-6 py-20 md:py-28">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-gold transition mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-gold" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-gold">Legal</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-display tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              How Soft Bridge FZE LLC collects, uses, stores, and protects your information.
            </p>
            <p className="mt-3 text-xs text-muted-foreground/60">
              Last Updated: 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="relative mx-auto max-w-4xl px-6 py-16 md:py-24">
          {/* Table of contents */}
          <div className="mb-16 p-6 md:p-8 rounded-2xl bg-card/50 border border-white/8 backdrop-blur-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-foreground mb-5">
              Contents
            </h2>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {SECTIONS.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-sm text-muted-foreground hover:text-gold transition truncate"
                >
                  {i + 1}. {s.title.replace(/^\d+\.\s*/, "")}
                </a>
              ))}
            </nav>
          </div>

          {/* Sections */}
          <div className="space-y-16">
            {SECTIONS.map((s) => (
              <article
                key={s.id}
                id={s.id}
                className="scroll-mt-28"
              >
                <div className="flex items-start gap-4 mb-5">
                  <span className="mt-1.5 w-8 h-8 rounded-lg bg-gold/10 border border-gold/15 flex items-center justify-center text-[11px] font-semibold text-gold flex-shrink-0">
                    {s.title.split(".")[0]}
                  </span>
                  <h2 className="text-xl md:text-2xl font-semibold font-display tracking-tight pt-0.5">
                    {s.title.replace(/^\d+\.\s*/, "")}
                  </h2>
                </div>
                <div className="pl-12 text-sm md:text-base leading-relaxed text-foreground/90">
                  {s.content}
                </div>
                <div className="mt-8 ml-12 h-px bg-gradient-to-r from-white/10 via-transparent to-transparent" />
              </article>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <p className="text-sm text-muted-foreground">
              Questions about your privacy? We&apos;re here to help.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-xl bg-gold/10 border border-gold/20 text-gold text-sm font-medium hover:bg-gold/15 transition"
            >
              Contact Us on WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
