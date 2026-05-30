import jsPDF from "jspdf";
import type { Answers, Recommendation } from "./advisor";
import { bankingLabel, complianceLabel, labels, visaLabel } from "./advisor";
import { SITE } from "./site";

// ── Soft Bridge website palette (1:1 with src/styles.css light theme) ──
// Primary violet ≈ oklch(0.58 0.22 285) → #7C3AED
// Accent violet  ≈ oklch(0.74 0.18 290) → #A78BFA
// Foreground/ink ≈ oklch(0.20 0.03 268) → #1B1B33
// Muted          ≈ oklch(0.45 0.02 275) → #6B6880
// Background     ≈ #FFFFFF / soft #FAF8FF
// Border         ≈ #E7E2F2
const PRIMARY: [number, number, number] = [124, 58, 237];
const ACCENT: [number, number, number] = [167, 139, 250];
const INK: [number, number, number] = [27, 27, 51];
const MUTED: [number, number, number] = [107, 104, 128];
const SOFT_BG: [number, number, number] = [250, 247, 255];
const SURFACE: [number, number, number] = [255, 255, 255];
const LINE: [number, number, number] = [231, 226, 242];
const WHITE: [number, number, number] = [255, 255, 255];

function header(doc: jsPDF) {
  // Soft white surface with a thin violet hairline + gradient bar accent
  doc.setFillColor(...SURFACE);
  doc.rect(0, 0, 595, 78, "F");

  // Gradient-style accent strip (approximated with 2 stops)
  doc.setFillColor(...PRIMARY);
  doc.rect(0, 0, 297, 3, "F");
  doc.setFillColor(...ACCENT);
  doc.rect(297, 0, 298, 3, "F");

  // Violet logo mark
  doc.setFillColor(...PRIMARY);
  doc.roundedRect(40, 26, 32, 32, 8, 8, "F");
  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("SB", 56, 47, { align: "center" });

  doc.setTextColor(...INK);
  doc.setFontSize(12);
  doc.text("Soft Bridge FZE LLC", 84, 42);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...PRIMARY);
  doc.text("BRIDGE TO YOUR SUCCESS", 84, 55);

  doc.setTextColor(...MUTED);
  doc.setFontSize(8);
  doc.text("AI Structure Advisor — Personalized Setup Report", 555, 47, { align: "right" });

  // Bottom hairline
  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.5);
  doc.line(0, 78, 595, 78);
}

function footer(doc: jsPDF, page: number, total: number) {
  doc.setDrawColor(...LINE);
  doc.line(40, 795, 555, 795);
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(`Soft Bridge FZE LLC  ·  Registration No: 262524808888`, 40, 808);
  doc.text(`${SITE.address}  ·  ${SITE.email}  ·  ${SITE.website ?? "softbridge.ae"}`, 40, 820);
  doc.text(`Page ${page} / ${total}`, 555, 820, { align: "right" });
}

function sectionTitle(doc: jsPDF, y: number, text: string) {
  doc.setTextColor(...PRIMARY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(text.toUpperCase(), 40, y);
  doc.setDrawColor(...PRIMARY);
  doc.setLineWidth(1.2);
  doc.line(40, y + 4, 70, y + 4);
}

function key(doc: jsPDF, x: number, y: number, k: string, v: string) {
  doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(...MUTED);
  doc.text(k.toUpperCase(), x, y);
  doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.setTextColor(...INK);
  doc.text(v, x, y + 14);
}

function answerSummary(a: Answers): string[] {
  return [
    `Business type: ${a.business ? labels.business[a.business] : "—"}`,
    `Client base: ${a.clients ? labels.clients[a.clients] : "—"}`,
    `Residency: ${a.residency ? labels.yesno[a.residency] : "—"}`,
    `Banking: ${a.bank ? labels.banknm[a.bank] : "—"}`,
    `Revenue band: ${a.revenue ? labels.revenue[a.revenue] : "—"}`,
    `Office: ${a.office ? labels.office[a.office] : "—"}`,
    `Priorities: ${a.priorities.length ? a.priorities.map((p) => labels.priority[p]).join(", ") : "—"}`,
    `Long-term support importance: ${a.support}/5`,
  ];
}

export function buildAdvisorPdf(answers: Answers, recs: Recommendation[]): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const top = recs[0];
  const alts = recs.slice(1, 3);

  // Page background — soft white for premium feel
  doc.setFillColor(...SOFT_BG);
  doc.rect(0, 0, 595, 842, "F");

  header(doc);

  // Title block
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold"); doc.setFontSize(24);
  doc.text("Your UAE Structure Report", 40, 122);
  doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...MUTED);
  const date = new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
  doc.text(`Generated ${date}  ·  Confidential — prepared for the addressee.`, 40, 140);

  // Recommendation card — white surface with violet ring
  doc.setFillColor(...SURFACE);
  doc.roundedRect(40, 158, 515, 150, 12, 12, "F");
  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.8);
  doc.roundedRect(40, 158, 515, 150, 12, 12, "S");
  // Violet left accent
  doc.setFillColor(...PRIMARY);
  doc.roundedRect(40, 158, 4, 150, 2, 2, "F");

  doc.setTextColor(...PRIMARY); doc.setFont("helvetica", "bold"); doc.setFontSize(9);
  doc.text("PRIMARY RECOMMENDATION", 60, 183);

  doc.setTextColor(...INK); doc.setFontSize(22);
  doc.text(top.jurisdiction.name, 60, 210);
  doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...MUTED);
  const wrappedTag = doc.splitTextToSize(top.jurisdiction.tagline, 380);
  doc.text(wrappedTag, 60, 228);

  // Confidence pill — violet gradient feel
  doc.setFillColor(...PRIMARY);
  doc.roundedRect(450, 175, 90, 26, 13, 13, "F");
  doc.setTextColor(...WHITE); doc.setFont("helvetica", "bold"); doc.setFontSize(11);
  doc.text(`${top.confidence}% match`, 495, 192, { align: "center" });

  // Axis row
  key(doc, 60,  278, "Setup cost", `AED ${top.axes.cost[0].toLocaleString()} – ${top.axes.cost[1].toLocaleString()}`);
  key(doc, 210, 278, "Banking", bankingLabel(top.axes.banking));
  key(doc, 310, 278, "Compliance", complianceLabel(top.axes.compliance));
  key(doc, 420, 278, "Visa fit", visaLabel(top.axes.visa));

  // Why this fits
  let y = 340;
  sectionTitle(doc, y, "Why This Structure Fits");
  y += 22;
  doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...INK);
  top.reasons.slice(0, 6).forEach((r) => {
    doc.setFillColor(...PRIMARY);
    doc.circle(46, y - 3, 2, "F");
    const lines = doc.splitTextToSize(r, 480);
    doc.text(lines, 56, y);
    y += 10 + (lines.length - 1) * 12;
    y += 6;
  });

  // Inputs summary
  y += 6;
  sectionTitle(doc, y, "Your Inputs");
  y += 18;
  doc.setFillColor(...SURFACE);
  doc.roundedRect(40, y, 515, 110, 8, 8, "F");
  doc.setDrawColor(...LINE);
  doc.roundedRect(40, y, 515, 110, 8, 8, "S");
  doc.setFontSize(9); doc.setTextColor(...INK);
  const cols = answerSummary(answers);
  cols.forEach((line, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    doc.text(line, 56 + col * 250, y + 22 + row * 18);
  });
  y += 130;

  // Alternatives
  sectionTitle(doc, y, "Alternative Options");
  y += 18;
  alts.forEach((alt) => {
    doc.setFillColor(...SURFACE);
    doc.roundedRect(40, y, 515, 68, 8, 8, "F");
    doc.setDrawColor(...LINE);
    doc.roundedRect(40, y, 515, 68, 8, 8, "S");
    doc.setFont("helvetica", "bold"); doc.setFontSize(12); doc.setTextColor(...INK);
    doc.text(alt.jurisdiction.name, 56, y + 22);
    doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(...PRIMARY);
    doc.text(`${alt.confidence}% match`, 540, y + 22, { align: "right" });
    doc.setTextColor(...MUTED);
    const t = doc.splitTextToSize(alt.jurisdiction.tagline, 480);
    doc.text(t, 56, y + 38);
    doc.setTextColor(...INK); doc.setFontSize(9);
    doc.text(`AED ${alt.axes.cost[0].toLocaleString()} – ${alt.axes.cost[1].toLocaleString()}  ·  Banking: ${bankingLabel(alt.axes.banking)}  ·  Visa: ${visaLabel(alt.axes.visa)}`,
      56, y + 58);
    y += 80;
  });

  footer(doc, 1, 2);

  // ── Page 2 — Roadmap ──────────────────────────────────────
  doc.addPage();
  doc.setFillColor(...SOFT_BG);
  doc.rect(0, 0, 595, 842, "F");
  header(doc);

  doc.setTextColor(...INK); doc.setFont("helvetica", "bold"); doc.setFontSize(22);
  doc.text("Setup Roadmap", 40, 122);
  doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...MUTED);
  doc.text("A high-level path from discovery to operations. Final scope is confirmed after consultation.", 40, 140);

  const steps = [
    { t: "Discovery", d: "30-min consultation to confirm activities, ownership, and operational needs." },
    { t: "Structure Planning", d: "Jurisdiction, license, activity list, ownership, and visa structure finalized." },
    { t: "Licensing & Residency", d: "License issuance, investor visa, Emirates ID, and medical coordinated end-to-end." },
    { t: "Banking Preparation", d: "Profile, KYC, source of funds, and bank introductions matched to your activity." },
    { t: "Business Launch", d: "Website, CRM, and advertising prepared for go-to-market." },
    { t: "Long-Term Support", d: "Renewals, compliance updates, and growth advisory as part of an ongoing partnership." },
  ];
  let sy = 168;
  steps.forEach((s, i) => {
    // step badge
    doc.setFillColor(...PRIMARY);
    doc.roundedRect(40, sy, 30, 30, 8, 8, "F");
    doc.setTextColor(...WHITE); doc.setFont("helvetica", "bold"); doc.setFontSize(11);
    doc.text(String(i + 1).padStart(2, "0"), 55, sy + 20, { align: "center" });

    doc.setTextColor(...INK); doc.setFontSize(12);
    doc.text(s.t, 82, sy + 14);
    doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...MUTED);
    const wrapped = doc.splitTextToSize(s.d, 460);
    doc.text(wrapped, 82, sy + 30);
    sy += 56 + (wrapped.length - 1) * 10;
  });

  // Estimated cost block
  sy += 4;
  sectionTitle(doc, sy, "Estimated Setup Cost");
  sy += 22;
  doc.setFillColor(...SURFACE);
  doc.roundedRect(40, sy, 515, 60, 8, 8, "F");
  doc.setDrawColor(...LINE);
  doc.roundedRect(40, sy, 515, 60, 8, 8, "S");
  doc.setFont("helvetica", "bold"); doc.setFontSize(17); doc.setTextColor(...PRIMARY);
  doc.text(`AED ${top.axes.cost[0].toLocaleString()} – ${top.axes.cost[1].toLocaleString()}`, 56, sy + 28);
  doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(...MUTED);
  doc.text("Indicative range for license, basic visa, and core setup costs. Excludes optional add-ons.", 56, sy + 46);
  sy += 80;

  // Banking considerations
  sectionTitle(doc, sy, "Banking Considerations");
  sy += 22;
  doc.setFontSize(10); doc.setTextColor(...INK);
  const b = [
    "Profile readiness and clean source of funds documentation are decisive.",
    "Banking friendliness for this jurisdiction: " + bankingLabel(top.axes.banking) + ".",
    "We coordinate the application and prepare your business profile for the best bank match.",
  ];
  b.forEach((l) => {
    const ww = doc.splitTextToSize(l, 480);
    doc.setFillColor(...PRIMARY);
    doc.circle(46, sy - 3, 2, "F");
    doc.setTextColor(...INK);
    doc.text(ww, 56, sy);
    sy += 14 + (ww.length - 1) * 12;
  });

  // Next steps
  sy += 8;
  sectionTitle(doc, sy, "Next Steps");
  sy += 22;
  doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...INK);
  doc.text("1. Book a 30-minute discovery call with the Soft Bridge team.", 40, sy); sy += 16;
  doc.text("2. We refine your structure and produce a final scoped proposal.", 40, sy); sy += 16;
  doc.text("3. License, residency, and banking are coordinated end-to-end.", 40, sy); sy += 16;
  doc.text("4. Long-term support continues after launch.", 40, sy); sy += 28;

  // CTA block — violet gradient feel
  doc.setFillColor(...PRIMARY);
  doc.roundedRect(40, sy, 515, 68, 12, 12, "F");
  // Lighter accent overlay (approximated)
  doc.setFillColor(...ACCENT);
  doc.roundedRect(380, sy, 175, 68, 12, 12, "F");
  doc.setTextColor(...WHITE); doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text("Ready to move from plan to execution?", 56, sy + 28);
  doc.setFont("helvetica", "normal"); doc.setFontSize(10);
  doc.text(`WhatsApp ${SITE.phone}  ·  ${SITE.email}`, 56, sy + 48);

  footer(doc, 2, 2);
  return doc;
}
