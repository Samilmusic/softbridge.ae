// AI UAE Structure Advisor — rule-based scoring engine.
// Inputs are user answers; outputs ranked jurisdiction recommendations
// with confidence, fit reasons, and per-axis ratings.
//
// Default weighting slightly favors IFZA because it is the most suitable
// option for the majority of SMEs, consultants, agencies, e-commerce
// businesses and startups. Other jurisdictions win whenever the inputs
// genuinely point elsewhere (mainland trading, industrial, large trading
// houses, premium banking needs, etc.).

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

export type JurisdictionId =
  | "ifza"
  | "meydan"
  | "rakez"
  | "ajman"
  | "dubai_mainland"
  | "dic"
  | "dmcc"
  | "kizad";

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
    tagline: "Cost-efficient, fast, wide activity list — the default fit for SMEs, consultants, agencies, e-commerce and startups.",
  },
  meydan: {
    id: "meydan", name: "Meydan Free Zone", region: "Dubai",
    costRange: [14500, 20000], banking: 3, compliance: 1,
    growth: 4, visa: "optional", remote: true,
    tagline: "Premium Dubai address with strong banking acceptance — preferred when e-commerce or higher banking friendliness is critical.",
  },
  rakez: {
    id: "rakez", name: "RAKEZ", region: "Ras Al Khaimah",
    costRange: [9500, 14000], banking: 2, compliance: 1,
    growth: 3, visa: "optional", remote: true,
    tagline: "Most cost-efficient free zone with industrial-friendly options — ideal for manufacturing, light industry and budget-aware setups.",
  },
  ajman: {
    id: "ajman", name: "Ajman Free Zone", region: "Ajman",
    costRange: [8500, 13000], banking: 2, compliance: 1,
    growth: 3, visa: "optional", remote: true,
    tagline: "Affordable and fast incorporation suited to early-stage SMEs and budget-aware service businesses.",
  },
  dubai_mainland: {
    id: "dubai_mainland", name: "Dubai Mainland", region: "Dubai",
    costRange: [18000, 28000], banking: 3, compliance: 2,
    growth: 5, visa: "ideal", remote: false,
    tagline: "Full UAE-wide operations and government-contract eligibility — best when serving UAE clients or running a physical storefront.",
  },
  dic: {
    id: "dic", name: "Dubai Internet City", region: "Dubai",
    costRange: [22000, 32000], banking: 3, compliance: 2,
    growth: 5, visa: "ideal", remote: false,
    tagline: "Tech-focused Dubai cluster — purpose-built for software, SaaS and venture-backed startups that need credibility with enterprise clients and investors.",
  },
  dmcc: {
    id: "dmcc", name: "DMCC", region: "Dubai",
    costRange: [25000, 38000], banking: 3, compliance: 2,
    growth: 5, visa: "ideal", remote: false,
    tagline: "Premier free zone for large trading, commodities and crypto businesses — strong banking, global credibility and a deep activity list.",
  },
  kizad: {
    id: "kizad", name: "KIZAD", region: "Abu Dhabi",
    costRange: [18000, 30000], banking: 2, compliance: 2,
    growth: 4, visa: "optional", remote: false,
    tagline: "Abu Dhabi industrial zone with logistics, warehousing and manufacturing infrastructure — ideal for heavy industry and supply-chain operations.",
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

    // ── IFZA default bias ───────────────────────────────────
    // IFZA is the most common right answer for SMEs, consultants, agencies,
    // e-commerce and startups. Give it a small structural advantage so it
    // wins ties, but keep it small enough that strong signals elsewhere
    // (mainland, industrial, trading) can override it.
    if (j.id === "ifza") {
      s += 8;
      reasons.push("Strong default for SMEs, consultants, agencies, e-commerce and startups — balanced cost, speed and flexibility");
    }

    // ── Client region ───────────────────────────────────────
    if (a.clients === "uae") {
      s += w(j.id === "dubai_mainland", 24);
      s += w(j.id === "meydan", 6);
      s += w(j.id === "ifza", -6); // mainland is clearly better for UAE clients
      if (j.id === "dubai_mainland") reasons.push("Full UAE-wide trading rights — required for serving local UAE clients directly");
    } else {
      // International clients lean to free zones
      s += w(j.id !== "dubai_mainland", 8);
      if (j.id === "ifza") reasons.push("Free-zone structure is well-suited to invoicing international clients with 0% corporate tax up to AED 3M qualifying income");
      if (j.id === "meydan") reasons.push("Premium Dubai address adds credibility with international clients");
    }
    if (a.clients === "us" || a.clients === "uk" || a.clients === "europe" || a.clients === "world") {
      s += w(j.id === "meydan", 6);
      s += w(j.id === "ifza", 6);
      s += w(j.id === "dic", 4);
      s += w(j.id === "dmcc", 4);
    }

    // ── Business type ───────────────────────────────────────
    const bt = a.business;
    if (bt === "ecommerce") {
      s += w(j.id === "meydan", 14);
      s += w(j.id === "ifza", 10);
      if (j.id === "meydan") reasons.push("E-commerce-friendly licensing with strong payment-gateway and banking acceptance");
      if (j.id === "ifza") reasons.push("E-commerce activity is supported with cost-efficient licensing and quick payment-gateway approval");
    }
    if (bt === "agency" || bt === "consulting") {
      s += w(j.id === "ifza", 18);
      s += w(j.id === "meydan", 6);
      if (j.id === "ifza") reasons.push(`Best-fit jurisdiction for ${bt === "agency" ? "marketing agencies" : "consultants"} — flexible activity list, no physical office requirement`);
    }
    if (bt === "it") {
      s += w(j.id === "ifza", 12);
      s += w(j.id === "dic", 16);
      s += w(j.id === "meydan", 4);
      if (j.id === "dic") reasons.push("Dubai Internet City is the UAE's flagship tech cluster — credibility for SaaS, software and venture-backed startups");
      if (j.id === "ifza") reasons.push("Most cost-efficient route for early-stage tech and SaaS businesses");
    }
    if (bt === "trading") {
      // Differentiate small/general trading from large/commodities
      if (a.revenue === "1mplus") {
        s += w(j.id === "dmcc", 18);
        s += w(j.id === "dubai_mainland", 12);
        if (j.id === "dmcc") reasons.push("DMCC is the leading free zone for large-scale and commodities trading — global credibility and banking depth");
      } else {
        s += w(j.id === "dubai_mainland", 10);
        s += w(j.id === "ifza", 8);
        s += w(j.id === "rakez", 8);
      }
    }
    if (bt === "tourism") { s += w(j.id === "dubai_mainland", 14); }
    if (bt === "education") { s += w(j.id === "dubai_mainland", 8); s += w(j.id === "ifza", 4); }
    if (bt === "crypto") {
      s += w(j.id === "dmcc", 14);
      s += w(j.id === "meydan", 8);
      s += w(j.id === "ifza", 4);
      if (j.id === "dmcc") reasons.push("DMCC offers a recognized crypto and virtual-asset licensing framework");
    }
    if (bt === "creator" || bt === "freelancer") {
      s += w(j.id === "ifza", 16);
      s += w(j.id === "ajman", 8);
      s += w(j.id === "rakez", 6);
      if (j.id === "ifza") reasons.push("Lean, low-cost license well-suited to solo founders, freelancers and content creators");
    }

    // ── Residency ───────────────────────────────────────────
    if (a.residency === "yes") {
      s += w(j.visa === "ideal", 10);
      s += w(j.visa === "optional", 6);
      if (j.visa === "ideal") reasons.push("Strong investor-visa pathway for full UAE residency");
      else if (j.visa === "optional") reasons.push("Flexible investor-visa packages available when residency is needed");
    }
    if (a.residency === "no") s += w(j.id === "ifza" || j.id === "rakez" || j.id === "ajman", 4);

    // ── Banking ─────────────────────────────────────────────
    if (a.bank === "yes") {
      s += w(j.banking === 3, 12);
      s += w(j.banking === 2, 6);
      if (j.banking === 3) reasons.push("Higher banking-acceptance rate for opening a corporate account");
    }

    // ── Revenue band ────────────────────────────────────────
    if (a.revenue === "1mplus") {
      s += w(j.id === "dubai_mainland" || j.id === "meydan" || j.id === "dmcc", 8);
    } else if (a.revenue === "u100k") {
      s += w(j.id === "rakez" || j.id === "ajman" || j.id === "ifza", 10);
      if (j.id === "ifza" || j.id === "rakez" || j.id === "ajman") reasons.push("Cost profile matches early-stage revenue — keeps fixed overhead low");
    } else if (a.revenue === "100to500") {
      s += w(j.id === "ifza" || j.id === "meydan", 6);
    }

    // ── Office ──────────────────────────────────────────────
    if (a.office === "office") s += w(j.id === "dubai_mainland" || j.id === "dic" || j.id === "dmcc", 8);
    if (a.office === "flexi") s += w(j.id === "ifza" || j.id === "meydan", 8);
    if (a.office === "remote") {
      s += w(j.remote, 10);
      if (j.remote) reasons.push("Remote-friendly licensing — no mandatory physical office, can be run from anywhere");
    }

    // ── Priorities ──────────────────────────────────────────
    const prios = a.priorities;
    if (prios.includes("cost")) {
      s += w(j.id === "rakez" || j.id === "ajman", 12);
      s += w(j.id === "ifza", 6);
      if (j.id === "ifza" || j.id === "rakez" || j.id === "ajman") reasons.push("Optimized for the lowest setup and renewal cost in its tier");
    }
    if (prios.includes("banking")) s += w(j.banking >= 2, 8);
    if (prios.includes("speed")) {
      s += w(j.id === "ifza" || j.id === "meydan" || j.id === "ajman", 10);
      if (j.id === "ifza") reasons.push("Fastest incorporation — license can typically be issued within days");
    }
    if (prios.includes("credibility")) s += w(j.id === "dubai_mainland" || j.id === "meydan" || j.id === "dic" || j.id === "dmcc", 10);
    if (prios.includes("visa")) s += w(j.visa === "ideal" || j.visa === "optional", 8);
    if (prios.includes("tax")) s += w(j.id !== "dubai_mainland", 4);
    if (prios.includes("scale")) s += w(j.growth >= 4, 8);

    // ── Long-term support importance ────────────────────────
    if (a.support >= 4) s += w(j.id === "dubai_mainland" || j.id === "meydan", 4);

    // Cleanup reasons (dedupe, drop empties, cap to 6 strongest)
    const uniqueReasons = Array.from(new Set(reasons.filter(Boolean))).slice(0, 6);

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
    results[0].reasons.push("Established jurisdiction with a clear, predictable renewal pathway");
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
