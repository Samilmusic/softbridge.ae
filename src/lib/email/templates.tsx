import * as React from "react";
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Button, Hr, Link,
} from "@react-email/components";

const BRAND = "Soft Bridge FZE LLC";
const WA = "https://wa.me/971502429035";

const main: React.CSSProperties = { backgroundColor: "#0b0f1a", fontFamily: "Inter, Arial, sans-serif", color: "#e9ecf3" };
const container: React.CSSProperties = { maxWidth: 600, margin: "0 auto", padding: "32px 24px" };
const card: React.CSSProperties = { background: "linear-gradient(180deg,#141a2b,#0f1422)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "28px 26px", marginTop: 20 };
const logo: React.CSSProperties = { fontFamily: "Sora, Inter, Arial, sans-serif", fontSize: 13, letterSpacing: "0.22em", color: "#d6b46a", textTransform: "uppercase" };
const h1: React.CSSProperties = { fontFamily: "Sora, Inter, Arial, sans-serif", fontSize: 26, fontWeight: 700, color: "#ffffff", margin: "10px 0 6px" };
const sub: React.CSSProperties = { fontSize: 14, color: "#9aa3b6", margin: 0 };
const p: React.CSSProperties = { fontSize: 14, lineHeight: "22px", color: "#cdd3e0", margin: "12px 0" };
const btn: React.CSSProperties = { background: "linear-gradient(180deg,#e6c47a,#caa14a)", color: "#15181f", padding: "12px 20px", borderRadius: 999, fontSize: 13, fontWeight: 700, textDecoration: "none", display: "inline-block" };
const btnGhost: React.CSSProperties = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "#e9ecf3", padding: "10px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600, textDecoration: "none", display: "inline-block" };
const meta: React.CSSProperties = { fontSize: 12, color: "#7c8499", marginTop: 24, textAlign: "center" };
const stat: React.CSSProperties = { display: "block", background: "rgba(214,180,106,0.07)", border: "1px solid rgba(214,180,106,0.22)", borderRadius: 12, padding: "12px 14px", margin: "8px 0", fontSize: 13, color: "#f0e3c2" };

function Shell({ preview, children }: { preview: string; children: React.ReactNode }) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={logo}>{BRAND}</Text>
          <Section style={card}>{children}</Section>
          <Text style={meta}>{BRAND} · Amber Gem Tower, Ajman, UAE · <Link href={WA} style={{ color: "#d6b46a" }}>WhatsApp +971 50 242 9035</Link></Text>
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
    <Text style={sub}>Thank you for choosing Soft Bridge. A consultant will be in touch shortly to confirm the details.</Text>
    {date && <span style={stat}>🗓 <strong>When:</strong> {date}</span>}
    {method && <span style={stat}>💬 <strong>Method:</strong> {method}</span>}
    <span style={stat}>👤 <strong>Your dedicated consultant</strong> will reach out within one business day.</span>
    <Text style={p}>Next steps:</Text>
    <Text style={p}>• Reply on WhatsApp to confirm your timezone and preferred slot.<br/>• Prepare a short brief: target activity, residency need, and timeline.<br/>• Access your client portal to track every stage in real time.</Text>
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
    <Text style={p}>From here you can:</Text>
    <Text style={p}>• Track your setup stage in real time<br/>• Upload required documents securely<br/>• Communicate with your consultant<br/>• View invoices and payment history</Text>
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

// 4. Status update
export interface StatusUpdateProps { name: string; stageLabel: string; note?: string; portalUrl: string; }
export const StatusUpdate = ({ name, stageLabel, note, portalUrl }: StatusUpdateProps) => (
  <Shell preview={`Update: ${stageLabel}`}>
    <Heading style={h1}>Status update for {name}</Heading>
    <Text style={sub}>Your setup just advanced.</Text>
    <span style={stat}>✅ <strong>{stageLabel}</strong></span>
    {note && <Text style={p}>{note}</Text>}
    <Section style={{ marginTop: 16 }}>
      <Button href={portalUrl} style={btn}>View full timeline</Button>
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
    <Text style={{ ...p, color: "#7c8499", fontSize: 12 }}>This is a notification. Payment options will appear inside your portal once the payment center is activated.</Text>
  </Shell>
);
