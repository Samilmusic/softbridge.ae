import * as React from "react";
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Button, Hr, Link,
} from "@react-email/components";

const BRAND = "Soft Bridge FZE LLC";
const REG_NO = "262524808888";
const ADDRESS = "Amber Gem Tower, Ajman, UAE";
const SUPPORT_EMAIL = "noreply@softbridge.ae";
const WEBSITE = "https://softbridge.ae";
const WA = "https://wa.me/971502429035";

const main: React.CSSProperties = { backgroundColor: "#0b0f1a", fontFamily: "Inter, Arial, sans-serif", color: "#e9ecf3" };
const container: React.CSSProperties = { maxWidth: 600, margin: "0 auto", padding: "32px 24px" };
const card: React.CSSProperties = { background: "linear-gradient(180deg,#141a2b,#0f1422)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "28px 26px", marginTop: 20 };
const logo: React.CSSProperties = { fontFamily: "Sora, Inter, Arial, sans-serif", fontSize: 13, letterSpacing: "0.22em", color: "#d6b46a", textTransform: "uppercase" };
const h1: React.CSSProperties = { fontFamily: "Sora, Inter, Arial, sans-serif", fontSize: 26, fontWeight: 700, color: "#ffffff", margin: "10px 0 6px" };
const h2: React.CSSProperties = { fontFamily: "Sora, Inter, Arial, sans-serif", fontSize: 16, fontWeight: 600, color: "#f0e3c2", margin: "18px 0 8px" };
const sub: React.CSSProperties = { fontSize: 14, color: "#9aa3b6", margin: 0 };
const p: React.CSSProperties = { fontSize: 14, lineHeight: "22px", color: "#cdd3e0", margin: "12px 0" };
const btn: React.CSSProperties = { background: "linear-gradient(180deg,#e6c47a,#caa14a)", color: "#15181f", padding: "12px 20px", borderRadius: 999, fontSize: 13, fontWeight: 700, textDecoration: "none", display: "inline-block" };
const btnGhost: React.CSSProperties = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "#e9ecf3", padding: "10px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600, textDecoration: "none", display: "inline-block" };
const meta: React.CSSProperties = { fontSize: 12, color: "#7c8499", marginTop: 24, textAlign: "center" };
const stat: React.CSSProperties = { display: "block", background: "rgba(214,180,106,0.07)", border: "1px solid rgba(214,180,106,0.22)", borderRadius: 12, padding: "12px 14px", margin: "8px 0", fontSize: 13, color: "#f0e3c2" };
const lineItem: React.CSSProperties = { fontSize: 13, lineHeight: "22px", color: "#cdd3e0", margin: "2px 0" };
const totalBox: React.CSSProperties = { background: "linear-gradient(135deg,rgba(214,180,106,0.22),rgba(214,180,106,0.05))", border: "1px solid rgba(214,180,106,0.45)", borderRadius: 14, padding: "16px 18px", margin: "14px 0" };

function Shell({ preview, children }: { preview: string; children: React.ReactNode }) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>{BRAND}</Text>
          <Section style={card}>{children}</Section>
          <Text style={meta}>
            <strong style={{ color: "#cdd3e0" }}>{BRAND}</strong><br />
            Registration No: {REG_NO}<br />
            {ADDRESS} · <Link href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "#d6b46a" }}>{SUPPORT_EMAIL}</Link> · <Link href={WEBSITE} style={{ color: "#d6b46a" }}>softbridge.ae</Link><br />
            <Link href={WA} style={{ color: "#d6b46a" }}>WhatsApp +971 50 242 9035</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// 1. Booking confirmation
export interface BookingProps { name: string; date?: string; method?: string; portalUrl: string; }
export const BookingConfirmation = ({ name, date, method, portalUrl }: BookingProps) => (
  <Shell preview="Your Soft Bridge consultation is confirmed">
    <Heading style={h1}>Consultation booked, {name}.</Heading>
    <Text style={sub}>Thank you for choosing Soft Bridge. A consultant will be in touch shortly.</Text>
    {date && <span style={stat}>🗓 <strong>When:</strong> {date}</span>}
    {method && <span style={stat}>💬 <strong>Method:</strong> {method}</span>}
    <span style={stat}>👤 <strong>Your dedicated consultant</strong> will reach out within one business day.</span>
    <Section style={{ marginTop: 18 }}>
      <Button href={portalUrl} style={btn}>Open client portal</Button>
      &nbsp;&nbsp;
      <Button href={WA} style={btnGhost}>WhatsApp us</Button>
    </Section>
  </Shell>
);

// 2. Welcome + magic link
export interface WelcomeProps { name: string; magicLink: string; }
export const WelcomeMagicLink = ({ name, magicLink }: WelcomeProps) => (
  <Shell preview="Your Soft Bridge client portal is ready">
    <Heading style={h1}>Welcome, {name}.</Heading>
    <Text style={sub}>Your private client portal has been created. Use the secure link below to sign in — no password required.</Text>
    <Section style={{ marginTop: 16 }}>
      <Button href={magicLink} style={btn}>Open my portal</Button>
    </Section>
    <Hr style={{ borderColor: "rgba(255,255,255,0.08)", margin: "20px 0" }} />
    <Text style={p}>From here you can track your setup stage, upload documents, message your consultant and view invoices.</Text>
    <Text style={{ ...p, color: "#7c8499", fontSize: 12 }}>This link expires in 1 hour. If you didn't request it, you can ignore this email.</Text>
  </Shell>
);

// 3. Document request
export interface DocRequestProps { name: string; docTitle: string; description?: string; portalUrl: string; }
export const DocumentRequest = ({ name, docTitle, description, portalUrl }: DocRequestProps) => (
  <Shell preview={`Document required: ${docTitle}`}>
    <Heading style={h1}>Action needed: {docTitle}</Heading>
    <Text style={sub}>Hi {name}, to progress your setup we need the following from you:</Text>
    <span style={stat}>📄 <strong>{docTitle}</strong>{description ? ` — ${description}` : ""}</span>
    <Text style={p}>Please upload it from your portal. Files are encrypted and only visible to your assigned consultant.</Text>
    <Section style={{ marginTop: 16 }}>
      <Button href={portalUrl} style={btn}>Upload document</Button>
    </Section>
  </Shell>
);

// 4. Status update (stage change)
export interface StatusUpdateProps {
  name: string;
  stageLabel: string;
  completed?: string;
  nextStep?: string;
  note?: string;
  portalUrl: string;
}
export const StatusUpdate = ({ name, stageLabel, completed, nextStep, note, portalUrl }: StatusUpdateProps) => (
  <Shell preview={`Update: ${stageLabel}`}>
    <Heading style={h1}>Status update for {name}</Heading>
    <Text style={sub}>Your UAE business setup just moved forward.</Text>
    <span style={stat}>✅ <strong>Current stage:</strong> {stageLabel}</span>
    {completed && <span style={stat}>🎯 <strong>Completed:</strong> {completed}</span>}
    {nextStep && <span style={stat}>➡️ <strong>What's next:</strong> {nextStep}</span>}
    {note && <Text style={p}>{note}</Text>}
    <Section style={{ marginTop: 16 }}>
      <Button href={portalUrl} style={btn}>View full timeline</Button>
      &nbsp;&nbsp;
      <Button href={WA} style={btnGhost}>WhatsApp us</Button>
    </Section>
  </Shell>
);

// 5. Invoice
export interface InvoiceProps { name: string; invoiceNumber: string; amountAed: number; dueDate?: string; portalUrl: string; }
export const Invoice = ({ name, invoiceNumber, amountAed, dueDate, portalUrl }: InvoiceProps) => (
  <Shell preview={`Invoice ${invoiceNumber} from Soft Bridge`}>
    <Heading style={h1}>Invoice {invoiceNumber}</Heading>
    <Text style={sub}>Hi {name}, your invoice is ready.</Text>
    <span style={stat}>💎 <strong>Amount:</strong> AED {amountAed.toLocaleString()}</span>
    {dueDate && <span style={stat}>⏱ <strong>Due:</strong> {dueDate}</span>}
    <Section style={{ marginTop: 16 }}>
      <Button href={portalUrl} style={btn}>View &amp; pay</Button>
    </Section>
  </Shell>
);

// 6. Quote — premium quotation email
export interface QuoteProps {
  name: string;
  quoteNumber: string;
  recommendedStructure: string;
  jurisdiction: string;
  numberOfVisas: number;
  includedServices: string[];
  optionalAddons: string[];
  governmentFees: { min: number; max: number };
  serviceFees: { min: number; max: number };
  totalCost: { min: number; max: number };
  timelineDays: { min: number; max: number };
  dashboardUrl: string;
  bookingUrl: string;
}
export const QuoteEmail = (q: QuoteProps) => (
  <Shell preview={`Your Soft Bridge UAE business setup quotation — ${q.quoteNumber}`}>
    <Text style={{ ...sub, marginBottom: 4 }}>Quotation {q.quoteNumber}</Text>
    <Heading style={h1}>Your UAE business setup quote, {q.name}.</Heading>
    <Text style={p}>Based on what you shared, here is a preliminary structure tailored to your goals. Final numbers are confirmed after a 15-minute call.</Text>

    <Heading style={h2}>Recommended structure</Heading>
    <span style={stat}>🏛 <strong>{q.recommendedStructure}</strong> · {q.jurisdiction}</span>
    {q.numberOfVisas > 0 && <span style={stat}>🛂 <strong>Visas:</strong> {q.numberOfVisas}</span>}
    <span style={stat}>⏱ <strong>Estimated timeline:</strong> {q.timelineDays.min}–{q.timelineDays.max} working days</span>

    <Heading style={h2}>Included services</Heading>
    {q.includedServices.map((s) => <Text key={s} style={lineItem}>• {s}</Text>)}

    {q.optionalAddons.length > 0 && (<>
      <Heading style={h2}>Optional add-ons</Heading>
      {q.optionalAddons.map((s) => <Text key={s} style={lineItem}>• {s}</Text>)}
    </>)}

    <Heading style={h2}>Investment estimate</Heading>
    <Text style={lineItem}>Government &amp; authority fees: <strong>AED {q.governmentFees.min.toLocaleString()} – {q.governmentFees.max.toLocaleString()}</strong></Text>
    <Text style={lineItem}>Soft Bridge service fees: <strong>AED {q.serviceFees.min.toLocaleString()} – {q.serviceFees.max.toLocaleString()}</strong></Text>
    <Section style={totalBox}>
      <Text style={{ ...sub, color: "#f0e3c2", marginBottom: 4 }}>Total estimated cost</Text>
      <Text style={{ fontFamily: "Sora, Inter, Arial, sans-serif", fontSize: 22, color: "#ffffff", margin: 0, fontWeight: 700 }}>
        AED {q.totalCost.min.toLocaleString()} – {q.totalCost.max.toLocaleString()}
      </Text>
    </Section>

    <Section style={{ marginTop: 16 }}>
      <Button href={q.bookingUrl} style={btn}>Book free consultation</Button>
      &nbsp;&nbsp;
      <Button href={q.dashboardUrl} style={btnGhost}>Open client portal</Button>
    </Section>

    <Text style={{ ...p, color: "#7c8499", fontSize: 12, marginTop: 20 }}>
      Disclaimer: Final quotation may vary depending on business activity, selected jurisdiction, visa requirements, office requirements, nationality, government authority approval, and third-party fees.
    </Text>
  </Shell>
);

// 7. Internal quote notification (sent to Soft Bridge team)
export interface InternalQuoteProps {
  name: string; email: string; whatsapp?: string;
  jurisdiction: string; numberOfVisas: number;
  totalCost: { min: number; max: number };
  quoteNumber: string;
}
export const InternalQuoteNotice = (q: InternalQuoteProps) => (
  <Shell preview={`New quote ${q.quoteNumber} from ${q.name}`}>
    <Heading style={h1}>New quote: {q.quoteNumber}</Heading>
    <span style={stat}><strong>{q.name}</strong> · {q.email}{q.whatsapp ? ` · ${q.whatsapp}` : ""}</span>
    <span style={stat}>🏛 <strong>{q.jurisdiction}</strong> · {q.numberOfVisas} visas</span>
    <span style={stat}>💎 AED {q.totalCost.min.toLocaleString()} – {q.totalCost.max.toLocaleString()}</span>
    <Text style={p}>Reach out within 1 business day to confirm scope and convert.</Text>
  </Shell>
);

// 8. OTP verification
export interface OtpProps { name: string; code: string; expiresMinutes: number; }
const otpBox: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
  fontSize: 34,
  letterSpacing: "0.5em",
  fontWeight: 700,
  color: "#ffffff",
  textAlign: "center",
  background: "linear-gradient(135deg, rgba(214,180,106,0.18), rgba(214,180,106,0.04))",
  border: "1px solid rgba(214,180,106,0.45)",
  borderRadius: 14,
  padding: "22px 14px",
  margin: "18px 0",
};
export const OtpEmail = ({ name, code, expiresMinutes }: OtpProps) => (
  <Shell preview="Your Soft Bridge verification code">
    <Heading style={h1}>Verify your email, {name}.</Heading>
    <Text style={sub}>Use this verification code to continue setting up your Soft Bridge client portal.</Text>
    <Text style={otpBox}>{code}</Text>
    <Text style={{ ...p, color: "#9aa3b6", fontSize: 12, textAlign: "center" }}>
      This code expires in {expiresMinutes} minutes and can be used only once.
    </Text>
    <Hr style={{ borderColor: "rgba(255,255,255,0.08)", margin: "18px 0" }} />
    <Text style={{ ...p, color: "#7c8499", fontSize: 12 }}>
      For your security, never share this code with anyone — not even a Soft Bridge representative.
      If you didn't request this, you can safely ignore this email.
    </Text>
  </Shell>
);

// 9. Setup request received (post-onboarding)
export interface SetupReceivedProps {
  name: string;
  jurisdiction?: string;
  activity?: string;
  visas?: number;
  goals?: string[];
  portalUrl: string;
  bookingUrl: string;
}
export const SetupReceivedEmail = ({ name, jurisdiction, activity, visas, goals, portalUrl, bookingUrl }: SetupReceivedProps) => (
  <Shell preview="We received your UAE business setup request">
    <Heading style={h1}>Thank you, {name}.</Heading>
    <Text style={sub}>Your UAE business setup request has been received. A dedicated consultant will review your profile and reach out within one business day.</Text>
    {activity && <span style={stat}>🏢 <strong>Activity:</strong> {activity}</span>}
    {jurisdiction && <span style={stat}>🏛 <strong>Preferred jurisdiction:</strong> {jurisdiction}</span>}
    {typeof visas === "number" && visas > 0 && <span style={stat}>🛂 <strong>Visas:</strong> {visas}</span>}
    {goals && goals.length > 0 && <span style={stat}>🎯 <strong>What matters most:</strong> {goals.join(" · ")}</span>}
    <Section style={{ marginTop: 18 }}>
      <Button href={portalUrl} style={btn}>Open my portal</Button>
      &nbsp;&nbsp;
      <Button href={bookingUrl} style={btnGhost}>Book consultation</Button>
    </Section>
  </Shell>
);

// 10. Internal — new setup submitted
export interface InternalSetupProps {
  name: string; email: string; whatsapp?: string; nationality?: string;
  activity?: string; jurisdiction?: string; visas?: number;
  residency?: string; bank?: string; tax?: string; office?: string;
  website?: boolean; goals?: string[];
}
export const InternalSetupNotice = (s: InternalSetupProps) => (
  <Shell preview={`New setup request from ${s.name}`}>
    <Heading style={h1}>New setup request</Heading>
    <span style={stat}><strong>{s.name}</strong> · {s.email}{s.whatsapp ? ` · ${s.whatsapp}` : ""}{s.nationality ? ` · ${s.nationality}` : ""}</span>
    {s.activity && <span style={stat}>🏢 {s.activity}</span>}
    {s.jurisdiction && <span style={stat}>🏛 {s.jurisdiction}{typeof s.visas === "number" ? ` · ${s.visas} visas` : ""}</span>}
    {(s.residency || s.bank || s.tax) && (
      <span style={stat}>
        {s.residency ? `Residency: ${s.residency}` : ""}{s.bank ? ` · Bank: ${s.bank}` : ""}{s.tax ? ` · Tax: ${s.tax}` : ""}
      </span>
    )}
    {(s.office || typeof s.website === "boolean") && (
      <span style={stat}>
        {s.office ? `Office: ${s.office}` : ""}{typeof s.website === "boolean" ? ` · Website: ${s.website ? "yes" : "no"}` : ""}
      </span>
    )}
    {s.goals && s.goals.length > 0 && <span style={stat}>🎯 {s.goals.join(" · ")}</span>}
    <Text style={p}>Reach out within 1 business day to confirm scope.</Text>
  </Shell>
);

