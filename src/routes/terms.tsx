import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SITE, WA_LINK } from "@/lib/site";
import { FileText, Mail, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Soft Bridge FZE LLC" },
      { name: "description", content: "Soft Bridge FZE LLC Terms & Conditions. Read the terms governing our website, consultation services, quotation systems, and client portal." },
    ],
  }),
  component: TermsPage,
});

const SECTIONS = [
  {
    id: "company-info",
    title: "1. Company Information",
    content: (
      <div className="space-y-3">
        <p><strong>Soft Bridge FZE LLC</strong><br />United Arab Emirates</p>
        <p className="text-muted-foreground text-sm">Registration No: <span className="tabular-nums text-foreground/80">{SITE.registrationNumber}</span></p>
        <p>Website: <a href="/" className="text-gold hover:underline">{SITE.website}</a></p>
        <p>Email: <a href={`mailto:${SITE.email}`} className="text-gold hover:underline">{SITE.email}</a></p>
        <p className="text-muted-foreground italic text-sm">Soft Bridge FZE LLC is an independent private consultancy and is not affiliated with, endorsed by, or representing any UAE government authority or immigration department.</p>
      </div>
    ),
  },
  {
    id: "nature-of-services",
    title: "2. Nature of Services",
    content: (
      <div className="space-y-3">
        <p>Soft Bridge provides private business support and consultancy services including but not limited to:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>UAE company setup assistance</li>
          <li>Jurisdiction advisory</li>
          <li>Residency process coordination</li>
          <li>Banking preparation assistance</li>
          <li>Tax registration support</li>
          <li>Operational consulting</li>
          <li>Website and digital infrastructure services</li>
          <li>Quotation and consultation services</li>
          <li>Client dashboard access</li>
          <li>Long-term support services</li>
        </ul>
        <p className="text-sm text-muted-foreground italic">Soft Bridge does not issue government licenses, visas, permits, approvals, or official documents directly. All official approvals and documents are issued solely by the relevant UAE government authorities and remain subject to their regulations, requirements, review processes, and approvals.</p>
      </div>
    ),
  },
  {
    id: "no-guarantee",
    title: "3. No Guarantee of Approval",
    content: (
      <div className="space-y-3">
        <p>Soft Bridge does not guarantee:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>Visa approvals</li>
          <li>License approvals</li>
          <li>Banking approvals</li>
          <li>Residency approvals</li>
          <li>Tax registration outcomes</li>
          <li>Government processing times</li>
          <li>Third-party approvals</li>
        </ul>
        <p className="text-sm text-muted-foreground">Approval decisions remain solely under the authority of the relevant government entities, financial institutions, and third-party providers.</p>
      </div>
    ),
  },
  {
    id: "client-responsibilities",
    title: "4. Client Responsibilities",
    content: (
      <div className="space-y-3">
        <p>Clients agree to:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>Provide accurate and truthful information</li>
          <li>Submit valid documents</li>
          <li>Comply with UAE laws and regulations</li>
          <li>Respond to requests in a timely manner</li>
          <li>Avoid misuse of the website or client portal</li>
          <li>Maintain confidentiality of login credentials</li>
        </ul>
        <p className="text-sm text-muted-foreground italic">Soft Bridge shall not be responsible for delays or rejections caused by inaccurate, incomplete, misleading, or fraudulent information provided by clients.</p>
      </div>
    ),
  },
  {
    id: "quotations",
    title: "5. Quotations & Pricing",
    content: (
      <div className="space-y-3">
        <p>All quotations, pricing estimates, and cost ranges provided through the website, quotation builder, consultations, or emails are indicative estimates only unless otherwise confirmed in writing.</p>
        <p>Final pricing may vary depending on:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>Business activity</li>
          <li>Jurisdiction selection</li>
          <li>Nationality</li>
          <li>Visa requirements</li>
          <li>Office requirements</li>
          <li>Government fees</li>
          <li>Third-party charges</li>
          <li>Regulatory requirements</li>
          <li>Banking requirements</li>
          <li>Additional requested services</li>
        </ul>
        <p className="text-sm text-muted-foreground">Government fees and third-party charges may change without prior notice.</p>
      </div>
    ),
  },
  {
    id: "payments",
    title: "6. Payments",
    content: (
      <div className="space-y-3">
        <p>Clients agree to pay all agreed fees, government charges, and applicable third-party costs associated with requested services.</p>
        <p>Unless otherwise agreed:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>Payments made for completed services are non-refundable</li>
          <li>Government fees already submitted are non-refundable</li>
          <li>Third-party fees are non-refundable</li>
          <li>Work already performed may not be refundable</li>
        </ul>
        <p className="text-sm text-muted-foreground">Refund requests may be reviewed at Soft Bridge&apos;s discretion depending on the specific case and service stage.</p>
      </div>
    ),
  },
  {
    id: "banking-disclaimer",
    title: "7. Banking Assistance Disclaimer",
    content: (
      <div className="space-y-3">
        <p>Soft Bridge may assist clients in preparing for banking applications and compliance requirements.</p>
        <p>However:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>Bank account approval is never guaranteed</li>
          <li>Banking decisions remain solely with the financial institution</li>
          <li>Banks may request additional documentation</li>
          <li>Banks may reject applications without explanation</li>
        </ul>
        <p className="text-sm text-muted-foreground italic">Soft Bridge is not liable for banking approval outcomes.</p>
      </div>
    ),
  },
  {
    id: "government-delays",
    title: "8. Government Processing & Delays",
    content: (
      <div className="space-y-3">
        <p>Government authorities, free zones, immigration departments, tax authorities, and third-party providers may experience delays outside Soft Bridge&apos;s control.</p>
        <p>Estimated timelines are indicative only and may vary.</p>
        <p>Soft Bridge shall not be liable for delays caused by:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>Authorities</li>
          <li>Regulatory reviews</li>
          <li>Compliance checks</li>
          <li>Banking reviews</li>
          <li>Client delays</li>
          <li>Force majeure events</li>
        </ul>
      </div>
    ),
  },
  {
    id: "client-portal",
    title: "9. Client Portal & Dashboard",
    content: (
      <div className="space-y-3">
        <p>Clients may receive access to a secure client portal to:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>Track progress</li>
          <li>Upload documents</li>
          <li>View quotations</li>
          <li>Receive updates</li>
          <li>Access support</li>
        </ul>
        <p className="text-sm text-muted-foreground">Clients are responsible for maintaining the confidentiality of login credentials and access links.</p>
        <p className="text-sm text-muted-foreground italic">Soft Bridge reserves the right to suspend access in cases of misuse, security concerns, or policy violations.</p>
      </div>
    ),
  },
  {
    id: "intellectual-property",
    title: "10. Intellectual Property",
    content: (
      <div className="space-y-3">
        <p>All website content, branding, designs, dashboards, systems, visual elements, software structures, and materials remain the intellectual property of Soft Bridge unless otherwise stated.</p>
        <p className="text-sm text-muted-foreground">Clients may not reproduce, distribute, modify, or commercially use website content without written permission.</p>
      </div>
    ),
  },
  {
    id: "website-restrictions",
    title: "11. Website Usage Restrictions",
    content: (
      <div className="space-y-3">
        <p>Users agree not to:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>Misuse the website</li>
          <li>Attempt unauthorized access</li>
          <li>Interfere with systems</li>
          <li>Upload malicious content</li>
          <li>Abuse communication systems</li>
          <li>Violate applicable laws</li>
        </ul>
        <p className="text-sm text-muted-foreground italic">Soft Bridge reserves the right to restrict access when necessary.</p>
      </div>
    ),
  },
  {
    id: "third-party-services",
    title: "12. Third-Party Services",
    content: (
      <div className="space-y-3">
        <p>Soft Bridge may integrate with third-party providers including:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>Payment providers</li>
          <li>Cloud infrastructure</li>
          <li>Communication services</li>
          <li>AI systems</li>
          <li>Analytics tools</li>
          <li>Email providers</li>
          <li>Authentication systems</li>
        </ul>
        <p className="text-sm text-muted-foreground italic">Soft Bridge is not responsible for third-party platform availability, interruptions, or policies.</p>
      </div>
    ),
  },
  {
    id: "limitation-liability",
    title: "13. Limitation of Liability",
    content: (
      <div className="space-y-3">
        <p>To the maximum extent permitted by law, Soft Bridge shall not be liable for:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>Indirect damages</li>
          <li>Consequential losses</li>
          <li>Business interruption</li>
          <li>Lost profits</li>
          <li>Delayed approvals</li>
          <li>Rejected applications</li>
          <li>Banking outcomes</li>
          <li>Third-party failures</li>
          <li>Technical interruptions</li>
          <li>Regulatory changes</li>
        </ul>
        <p className="text-sm text-muted-foreground">Soft Bridge&apos;s total liability shall not exceed the amount paid directly to Soft Bridge for the relevant service.</p>
      </div>
    ),
  },
  {
    id: "privacy",
    title: "14. Privacy",
    content: (
      <div className="space-y-3">
        <p>Use of the website and services is also governed by the <a href="/privacy-policy" className="text-gold hover:underline">Privacy Policy</a>.</p>
        <p className="text-sm text-muted-foreground">By using the website, users agree to the collection and processing of information as described in the Privacy Policy.</p>
      </div>
    ),
  },
  {
    id: "lifetime-support",
    title: "15. Lifetime Support",
    content: (
      <div className="space-y-3">
        <p>Where &ldquo;lifetime support&rdquo; is referenced, it refers to reasonable ongoing general support related to services provided by Soft Bridge.</p>
        <p className="text-sm text-muted-foreground">Lifetime support does not include unlimited operational work, legal representation, government fees, third-party costs, or unlimited consulting hours unless explicitly agreed in writing.</p>
      </div>
    ),
  },
  {
    id: "modifications",
    title: "16. Modifications",
    content: (
      <div className="space-y-3">
        <p>Soft Bridge reserves the right to modify:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          <li>Services</li>
          <li>Pricing</li>
          <li>Website functionality</li>
          <li>Policies</li>
          <li>These Terms & Conditions</li>
        </ul>
        <p className="text-sm text-muted-foreground">Changes may be made without prior notice.</p>
      </div>
    ),
  },
  {
    id: "governing-law",
    title: "17. Governing Law",
    content: (
      <div className="space-y-3">
        <p>These Terms & Conditions shall be governed by and interpreted in accordance with the laws of the United Arab Emirates.</p>
        <p className="text-sm text-muted-foreground">Any disputes shall be subject to the jurisdiction of the UAE courts unless otherwise agreed.</p>
      </div>
    ),
  },
  {
    id: "contact",
    title: "18. Contact Information",
    content: (
      <div className="space-y-3">
        <p><strong>Soft Bridge FZE LLC</strong><br />Registration No: <span className="tabular-nums">{SITE.registrationNumber}</span></p>
        <p>Website: <a href="/" className="text-gold hover:underline">{SITE.website}</a></p>
        <p>Email: <a href={`mailto:${SITE.email}`} className="text-gold hover:underline">{SITE.email}</a></p>
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

function TermsPage() {
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
                <FileText className="w-5 h-5 text-gold" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-gold">Legal</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-display tracking-tight">
              Terms & Conditions
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              The terms governing our website, consultation services, quotation systems, client portal, and related business support services.
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
              Questions about our terms? We&apos;re here to help.
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
