import jsPDF from "jspdf";
import type { Answers, Recommendation } from "./advisor";
import { bankingLabel, complianceLabel, labels, visaLabel } from "./advisor";
import { SITE } from "./site";

const GOLD: [number, number, number] = [212, 168, 76];
const INK: [number, number, number] = [22, 24, 38];
const MUTED: [number, number, number] = [120, 124, 140];
const LINE: [number, number, number] = [225, 225, 232];

function header(doc: jsPDF) {
  doc.setFillColor(...INK);
  doc.rect(0, 0, 595, 70, "F");

  // Gold mark
  doc.setFillColor(...GOLD);
  doc.roundedRect(40, 22, 28, 28, 4, 4, "F");
  doc.setTextColor(22, 24, 38);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("SB", 54, 41, { align: "center" });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text("Soft Bridge FZE LLC", 80, 36);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(212, 168, 76);
  doc.text("BRIDGE TO YOUR SUCCESS", 80, 50);

  doc.setTextColor(200, 200, 210);
  doc.setFontSize(8);
  doc.text("AI Structure Advisor — Personalized Setup Report", 555, 41, { align: "right" });
}

function footer(doc: jsPDF, page: number, total: number) {
  doc.setDrawColor(...LINE);
  doc.line(40, 795, 555, 795);
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(`Soft Bridge FZE LLC  ·  Registration No: 262524808888`, 40, 808);
  doc.text(`${SITE.address}  ·  ${SITE.email}  ·  ${SITE.website ?? "softbridgefze.com"}`, 40, 820);
  doc.text(`Page ${page} / ${total}`, 555, 820, { align: "right" });
}

function sectionTitle(doc: jsPDF, y: number, text: string) {
  doc.setTextColor(...GOLD);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(text.toUpperCase(), 40, y);
  doc.setDrawColor(...GOLD);
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

  header(doc);

  // Title block
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold"); doc.setFontSize(22);
  doc.text("Your UAE Structure Report", 40, 115);
  doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...MUTED);
  const date = new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
  doc.text(`Generated ${date}  ·  Confidential — prepared for the addressee.`, 40, 132);

  // Recommendation card
  doc.setFillColor(248, 246, 240);
  doc.roundedRect(40, 150, 515, 140, 8, 8, "F");
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1.2);
  doc.line(40, 150, 40, 290);

  doc.setTextColor(...GOLD); doc.setFont("helvetica", "bold"); doc.setFontSize(9);
  doc.text("PRIMARY RECOMMENDATION", 60, 175);

  doc.setTextColor(...INK); doc.setFontSize(20);
  doc.text(top.jurisdiction.name, 60, 200);
  doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...MUTED);
  const wrappedTag = doc.splitTextToSize(top.jurisdiction.tagline, 380);
  doc.text(wrappedTag, 60, 218);

  // Confidence pill
  doc.setFillColor(...GOLD);
  doc.roundedRect(450, 165, 90, 24, 12, 12, "F");
  doc.setTextColor(...INK); doc.setFont("helvetica", "bold"); doc.setFontSize(11);
  doc.text(`${top.confidence}% match`, 495, 181, { align: "center" });

  // Axis row
  key(doc, 60,  260, "Setup cost", `AED ${top.axes.cost[0].toLocaleString()} – ${top.axes.cost[1].toLocaleString()}`);
  key(doc, 210, 260, "Banking", bankingLabel(top.axes.banking));
  key(doc, 310, 260, "Compliance", complianceLabel(top.axes.compliance));
  key(doc, 420, 260, "Visa fit", visaLabel(top.axes.visa));

  // Why this fits
  let y = 320;
  sectionTitle(doc, y, "Why This Structure Fits");
  y += 22;
  doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...INK);
  top.reasons.slice(0, 6).forEach((r) => {
    doc.setFillColor(...GOLD);
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
  doc.setDrawColor(...LINE);
  doc.roundedRect(40, y, 515, 110, 6, 6);
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
    doc.setDrawColor(...LINE);
    doc.roundedRect(40, y, 515, 64, 6, 6);
    doc.setFont("helvetica", "bold"); doc.setFontSize(12); doc.setTextColor(...INK);
    doc.text(alt.jurisdiction.name, 56, y + 22);
    doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(...MUTED);
    doc.text(`${alt.confidence}% match`, 540, y + 22, { align: "right" });
    const t = doc.splitTextToSize(alt.jurisdiction.tagline, 480);
    doc.text(t, 56, y + 38);
    doc.setTextColor(...INK); doc.setFontSize(9);
    doc.text(`AED ${alt.axes.cost[0].toLocaleString()} – ${alt.axes.cost[1].toLocaleString()}  ·  Banking: ${bankingLabel(alt.axes.banking)}  ·  Visa: ${visaLabel(alt.axes.visa)}`,
      56, y + 56);
    y += 76;
  });

  footer(doc, 1, 2);

  // Page 2 — Roadmap
  doc.addPage();
  header(doc);

  doc.setTextColor(...INK); doc.setFont("helvetica", "bold"); doc.setFontSize(20);
  doc.text("Setup Roadmap", 40, 115);
  doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...MUTED);
  doc.text("A high-level path from discovery to operations. Final scope is confirmed after consultation.", 40, 132);

  const steps = [
    { t: "Discovery", d: "30-min consultation to confirm activities, ownership, and operational needs." },
    { t: "Structure Planning", d: "Jurisdiction, license, activity list, ownership, and visa structure finalized." },
    { t: "Licensing & Residency", d: "License issuance, investor visa, Emirates ID, and medical coordinated end-to-end." },
    { t: "Banking Preparation", d: "Profile, KYC, source of funds, and bank introductions matched to your activity." },
    { t: "Business Launch", d: "Website, CRM, and advertising prepared for go-to-market." },
    { t: "Long-Term Support", d: "Renewals, compliance updates, and growth advisory as part of an ongoing partnership." },
  ];
  let sy = 160;
  steps.forEach((s, i) => {
    // step badge
    doc.setFillColor(...GOLD);
    doc.roundedRect(40, sy, 28, 28, 6, 6, "F");
    doc.setTextColor(...INK); doc.setFont("helvetica", "bold"); doc.setFontSize(11);
    doc.text(String(i + 1).padStart(2, "0"), 54, sy + 19, { align: "center" });

    doc.setTextColor(...INK); doc.setFontSize(12);
    doc.text(s.t, 80, sy + 14);
    doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...MUTED);
    const wrapped = doc.splitTextToSize(s.d, 460);
    doc.text(wrapped, 80, sy + 30);
    sy += 56 + (wrapped.length - 1) * 10;
  });

  // Estimated cost block
  sy += 4;
  sectionTitle(doc, sy, "Estimated Setup Cost");
  sy += 22;
  doc.setDrawColor(...LINE); doc.roundedRect(40, sy, 515, 56, 6, 6);
  doc.setFont("helvetica", "bold"); doc.setFontSize(16); doc.setTextColor(...INK);
  doc.text(`AED ${top.axes.cost[0].toLocaleString()} – ${top.axes.cost[1].toLocaleString()}`, 56, sy + 26);
  doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(...MUTED);
  doc.text("Indicative range for license, basic visa, and core setup costs. Excludes optional add-ons.", 56, sy + 44);
  sy += 76;

  // Banking considerations
  sectionTitle(doc, sy, "Banking Considerations");
  sy += 22;
  doc.setFontSize(10); doc.setTextColor(...INK);
  const b = [
    "Profile readiness and clean source of funds documentation are decisive.",
    "Banking friendliness for this jurisdiction: " + bankingLabel(top.axes.banking) + ".",
    "We coordinate the application and prepare your business profile for the best bank match.",
  ];
  b.forEach((l) => { const ww = doc.splitTextToSize(l, 480); doc.setFillColor(...GOLD); doc.circle(46, sy - 3, 2, "F"); doc.text(ww, 56, sy); sy += 14 + (ww.length-1)*12; });

  // Next steps
  sy += 8;
  sectionTitle(doc, sy, "Next Steps");
  sy += 22;
  doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...INK);
  doc.text("1. Book a 30-minute discovery call with the Soft Bridge team.", 40, sy); sy += 16;
  doc.text("2. We refine your structure and produce a final scoped proposal.", 40, sy); sy += 16;
  doc.text("3. License, residency, and banking are coordinated end-to-end.", 40, sy); sy += 16;
  doc.text("4. Long-term support continues after launch.", 40, sy); sy += 28;

  // CTA block
  doc.setFillColor(...INK);
  doc.roundedRect(40, sy, 515, 64, 8, 8, "F");
  doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text("Ready to move from plan to execution?", 56, sy + 26);
  doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(212, 168, 76);
  doc.text(`WhatsApp ${SITE.phone}  ·  ${SITE.email}`, 56, sy + 46);

  footer(doc, 2, 2);
  return doc;
}
