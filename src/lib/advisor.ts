// AI UAE Structure Advisor — rule-based scoring engine.
// Inputs are user answers; outputs ranked jurisdiction recommendations
// with confidence, fit reasons, and per-axis ratings.

export type BusinessType =
  | "ecommerce" | "agency" | "it" | "consulting" | "trading" | "tourism"
  | "education" | "crypto" | "creator" | "freelancer" | "other";

export type ClientRegion = "uae" | "europe" | "uk" | "us" | "world";
export type YesNoMaybe = "yes" | "no" | "maybe";
export type RevenueBand = "u100k" | "100to500" | "500to1m" | "1mplus";
export type OfficeType = "office" | "flexi" | "remote";
export type Priority =
  | "cost" | "banking" | "speed" | "credibility" | "visa" | "tax" | "scale";

export interface Answers {
  business: BusinessType | null;
  clients: ClientRegion | null;
  residency: YesNoMaybe | null;
  bank: YesNoMaybe | null;
  revenue: RevenueBand | null;
  office: OfficeType | null;
  priorities: Priority[]; // up to 2
  support: number; // 1..5
}

export type JurisdictionId = "ifza" | "meydan" | "rakez" | "ajman" | "dubai_mainland";

export interface Jurisdiction {
  id: JurisdictionId;
  name: string;
  region: string;
  costRange: [number, number]; // AED
  banking: 1 | 2 | 3; // low / med / high friendliness
  compliance: 1 | 2 | 3; // simple / moderate / advanced
  growth: number; // 1..5
  visa: "ideal" | "optional" | "not";
  remote: boolean;
  tagline: string;
}

export const JURISDICTIONS: Record<JurisdictionId, Jurisdiction> = {
  ifza: {
    id: "ifza", name: "IFZA Free Zone", region: "Dubai",
    costRange: [12500, 17500], banking: 2, compliance: 1,
    growth: 4, visa: "optional", remote: true,
    tagline: "Cost-efficient, fast, wide activity list — ideal for digital and service businesses.",
  },
  meydan: {
    id: "meydan", name: "Meydan Free Zone", region: "Dubai",
    costRange: [14500, 20000], banking: 3, compliance: 1,
    growth: 4, visa: "optional", remote: true,
    tagline: "Premium Dubai address with strong banking acceptance for e-commerce and digital services.",
  },
  rakez: {
    id: "rakez", name: "RAKEZ", region: "Ras Al Khaimah",
    costRange: [9500, 14000], banking: 2, compliance: 1,
    growth: 3, visa: "optional", remote: true,
    tagline: "Most cost-efficient free zone with industrial-friendly options and flexible packages.",
  },
  ajman: {
    id: "ajman", name: "Ajman Free Zone", region: "Ajman",
    costRange: [8500, 13000], banking: 2, compliance: 1,
    growth: 3, visa: "optional", remote: true,
    tagline: "Affordable and fast incorporation suited to SMEs and budget-aware service businesses.",
  },
  dubai_mainland: {
    id: "dubai_mainland", name: "Dubai Mainland", region: "Dubai",
    costRange: [18000, 28000], banking: 3, compliance: 2,
    growth: 5, visa: "ideal", remote: false,
    tagline: "Full UAE-wide operations, premium banking, eligible for government contracts.",
  },
};

export interface Recommendation {
  jurisdiction: Jurisdiction;
  score: number;        // 0..100 raw
  confidence: number;   // 0..100 (normalized within result set)
  reasons: string[];
  axes: {
    banking: 1 | 2 | 3;       // low/med/high
    compliance: 1 | 2 | 3;    // simple/moderate/advanced
    cost: [number, number];
    visa: "ideal" | "optional" | "not";
    growth: number; // 1..5
  };
}

const w = (cond: boolean, weight: number) => (cond ? weight : 0);

export function recommend(a: Answers): Recommendation[] {
  const results: Recommendation[] = Object.values(JURISDICTIONS).map((j) => {
    let s = 50; // base score
    const reasons: string[] = [];

    // Client region
    if (a.clients === "uae") {
      s += w(j.id === "dubai_mainland", 22);
      s += w(j.id === "meydan", 6);
      if (j.id === "dubai_mainland") reasons.push("Full UAE-wide trading rights for local clients");
    } else {
      // International clients lean to free zones
      s += w(j.id !== "dubai_mainland", 10);
      if (["meydan","ifza"].includes(j.id)) reasons.push("Strong fit for international clients and remote operations");
    }
    if (a.clients === "us" || a.clients === "uk" || a.clients === "europe" || a.clients === "world") {
      s += w(j.id === "meydan", 8);
      s += w(j.id === "ifza", 6);
    }

    // Business type
    const bt = a.business;
    if (bt === "ecommerce") { s += w(j.id === "meydan", 12); s += w(j.id === "ifza", 6); reasons.push(j.id === "meydan" ? "E-commerce-friendly with strong banking acceptance" : ""); }
    if (bt === "agency" || bt === "consulting" || bt === "it") { s += w(j.id === "ifza", 12); s += w(j.id === "meydan", 6); }
    if (bt === "trading") { s += w(j.id === "dubai_mainland", 12); s += w(j.id === "rakez", 6); }
    if (bt === "tourism") { s += w(j.id === "dubai_mainland", 14); }
    if (bt === "education") { s += w(j.id === "dubai_mainland", 8); s += w(j.id === "ifza", 4); }
    if (bt === "crypto") { s += w(j.id === "meydan", 8); s += w(j.id === "ifza", 6); }
    if (bt === "creator" || bt === "freelancer") { s += w(j.id === "ifza", 14); s += w(j.id === "ajman", 8); s += w(j.id === "rakez", 6); }

    // Residency
    if (a.residency === "yes") {
      s += w(j.visa === "ideal", 10);
      s += w(j.visa === "optional", 6);
      if (j.visa === "ideal") reasons.push("Excellent investor visa pathway for residency");
      else if (j.visa === "optional") reasons.push("Flexible visa packages available when needed");
    }
    if (a.residency === "no") s += w(j.id === "ifza" || j.id === "rakez" || j.id === "ajman", 4);

    // Banking
    if (a.bank === "yes") {
      s += w(j.banking === 3, 12);
      s += w(j.banking === 2, 6);
      if (j.banking === 3) reasons.push("Higher banking acceptance for new business accounts");
    }

    // Revenue
    if (a.revenue === "1mplus") {
      s += w(j.id === "dubai_mainland" || j.id === "meydan", 8);
    } else if (a.revenue === "u100k") {
      s += w(j.id === "rakez" || j.id === "ajman" || j.id === "ifza", 8);
      if (j.id === "rakez" || j.id === "ajman") reasons.push("Cost profile matches early-stage revenue");
    } else if (a.revenue === "100to500") {
      s += w(j.id === "ifza" || j.id === "meydan", 6);
    }

    // Office
    if (a.office === "office") s += w(j.id === "dubai_mainland", 10);
    if (a.office === "flexi") s += w(j.id === "ifza" || j.id === "meydan", 8);
    if (a.office === "remote") {
      s += w(j.remote, 8);
      if (j.remote) reasons.push("Remote-friendly licensing — no mandatory office");
    }

    // Priorities
    const prios = a.priorities;
    if (prios.includes("cost")) {
      s += w(j.id === "rakez" || j.id === "ajman", 10);
      s += w(j.id === "ifza", 4);
    }
    if (prios.includes("banking")) s += w(j.banking >= 2, 8);
    if (prios.includes("speed")) s += w(j.id === "ifza" || j.id === "meydan" || j.id === "ajman", 8);
    if (prios.includes("credibility")) s += w(j.id === "dubai_mainland" || j.id === "meydan", 10);
    if (prios.includes("visa")) s += w(j.visa === "ideal" || j.visa === "optional", 8);
    if (prios.includes("tax")) s += w(j.id !== "dubai_mainland", 4);
    if (prios.includes("scale")) s += w(j.growth >= 4, 8);

    // Support importance (3+ favors mainland and meydan)
    if (a.support >= 4) s += w(j.id === "dubai_mainland" || j.id === "meydan", 4);

    // Cleanup reasons (dedupe + cap to 5 strongest)
    const uniqueReasons = Array.from(new Set(reasons.filter(Boolean))).slice(0, 5);

    return {
      jurisdiction: j,
      score: s,
      confidence: 0, // normalized below
      reasons: uniqueReasons,
      axes: {
        banking: j.banking,
        compliance: j.compliance,
        cost: j.costRange,
        visa: j.visa,
        growth: j.growth,
      },
    };
  });

  results.sort((x, y) => y.score - x.score);

  // Normalize confidence: top = scaled 80–96, others fall off
  const top = results[0].score;
  const min = results[results.length - 1].score;
  const span = Math.max(1, top - min);
  results.forEach((r, i) => {
    const rel = (r.score - min) / span; // 0..1
    r.confidence = Math.round(72 + rel * 22 - i * 2);
    r.confidence = Math.min(96, Math.max(58, r.confidence));
  });

  // Ensure top has at least 3 reasons
  if (results[0].reasons.length < 3) {
    results[0].reasons.push("Balanced cost-to-capability profile for your stage");
    results[0].reasons.push("Established free zone with clear renewal pathway");
  }

  return results;
}

export const labels = {
  business: {
    ecommerce: "E-Commerce", agency: "Marketing Agency", it: "IT / Software",
    consulting: "Consulting", trading: "Trading", tourism: "Tourism",
    education: "Education", crypto: "Crypto / Web3", creator: "Content Creator",
    freelancer: "Freelancer", other: "Other",
  } satisfies Record<BusinessType, string>,
  clients: { uae: "UAE", europe: "Europe", uk: "United Kingdom", us: "United States", world: "Worldwide" } satisfies Record<ClientRegion, string>,
  yesno: { yes: "Yes", no: "No", maybe: "Maybe Later" } satisfies Record<YesNoMaybe, string>,
  banknm: { yes: "Yes", no: "No", maybe: "Not Sure Yet" } satisfies Record<YesNoMaybe, string>,
  revenue: { u100k: "Under AED 100K", "100to500": "AED 100K – 500K", "500to1m": "AED 500K – 1M", "1mplus": "AED 1M+" } satisfies Record<RevenueBand, string>,
  office: { office: "Physical Office", flexi: "Flexi Desk", remote: "Remote Only" } satisfies Record<OfficeType, string>,
  priority: {
    cost: "Lowest Setup Cost", banking: "Banking Friendliness", speed: "Fast Setup",
    credibility: "International Credibility", visa: "Visa Flexibility",
    tax: "Tax Optimization", scale: "Scalability",
  } satisfies Record<Priority, string>,
};

export function bankingLabel(v: 1|2|3) { return v === 3 ? "High" : v === 2 ? "Medium" : "Low"; }
export function complianceLabel(v: 1|2|3) { return v === 3 ? "Advanced" : v === 2 ? "Moderate" : "Simple"; }
export function visaLabel(v: "ideal" | "optional" | "not") { return v === "ideal" ? "Ideal" : v === "optional" ? "Optional" : "Not Required"; }
