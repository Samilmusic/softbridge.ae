// Pure pricing engine. No I/O — safe in client + server.
export interface QuoteInput {
  jurisdiction?: string;       // e.g. "Dubai Mainland", "IFZA", "RAKEZ"
  numberOfVisas?: number;
  needsResidency?: "yes" | "no" | "later";
  needsBanking?: boolean;
  needsTax?: boolean;
  needsDigital?: boolean;
  officeRequirement?: "flexi_desk" | "ejari" | "physical_office" | "not_sure";
}

export interface QuoteResult {
  recommendedStructure: string;
  selectedJurisdiction: string;
  includedServices: string[];
  optionalAddons: string[];
  governmentFees: { min: number; max: number };
  serviceFees: { min: number; max: number };
  totalCost: { min: number; max: number };
  timelineDays: { min: number; max: number };
}

const JURISDICTION_BASE: Record<string, { gov: [number, number]; svc: [number, number]; days: [number, number]; structure: string }> = {
  "Dubai Mainland":   { gov: [15000, 25000], svc: [6500, 9500], days: [7, 14],  structure: "DED Mainland LLC" },
  "IFZA":             { gov: [12500, 18500], svc: [4500, 7500], days: [3, 7],   structure: "IFZA Free Zone Company" },
  "RAKEZ":            { gov: [11500, 17500], svc: [4500, 7000], days: [4, 8],   structure: "RAKEZ Free Zone Establishment" },
  "Ajman Free Zone":  { gov: [10500, 16000], svc: [4500, 6800], days: [4, 8],   structure: "AFZ Free Zone Company" },
  "Meydan":           { gov: [14500, 21500], svc: [5500, 8500], days: [3, 7],   structure: "Meydan Free Zone Company" },
  "SHAMS":            { gov: [9500,  15000], svc: [4000, 6500], days: [4, 8],   structure: "SHAMS Free Zone Company" },
  "ADGM":             { gov: [22000, 35000], svc: [9500, 14500], days: [10, 18], structure: "ADGM Tech Startup License" },
  "DMCC":             { gov: [25000, 38000], svc: [9500, 14000], days: [7, 14],  structure: "DMCC Free Zone Company" },
};

function pick(j?: string) {
  if (j && JURISDICTION_BASE[j]) return { j, ...JURISDICTION_BASE[j] };
  return { j: "IFZA", ...JURISDICTION_BASE["IFZA"] };
}

export function computeQuote(input: QuoteInput): QuoteResult {
  const base = pick(input.jurisdiction);
  const visas = Math.max(0, Math.min(20, input.numberOfVisas ?? 0));

  const included: string[] = [
    `${base.j} license setup`,
    "Trade name reservation",
    "Initial approval handling",
    "Document drafting (MOA / KYC pack)",
    "Authority liaison & submissions",
    "Dedicated Soft Bridge consultant",
  ];
  const addons: string[] = [];

  let govMin = base.gov[0];
  let govMax = base.gov[1];
  let svcMin = base.svc[0];
  let svcMax = base.svc[1];

  // Visas
  if (visas > 0) {
    govMin += visas * 4200;
    govMax += visas * 6500;
    svcMin += visas * 900;
    svcMax += visas * 1500;
    included.push(`${visas} investor/employment visa quota`);
  }

  // Residency
  if (input.needsResidency === "yes") {
    govMin += 3500; govMax += 5800;
    svcMin += 1500; svcMax += 2500;
    included.push("Residency processing (entry permit, medical, EID)");
  } else if (input.needsResidency === "later") {
    addons.push("Residency processing — when needed");
  }

  // Office
  switch (input.officeRequirement) {
    case "flexi_desk":
      govMin += 2500; govMax += 4500;
      included.push("Flexi-desk address package");
      break;
    case "ejari":
      govMin += 8500; govMax += 15000;
      svcMin += 1500; svcMax += 2500;
      included.push("Ejari-eligible workspace coordination");
      break;
    case "physical_office":
      govMin += 25000; govMax += 60000;
      svcMin += 3000; svcMax += 5000;
      included.push("Physical office lease coordination");
      break;
    default:
      addons.push("Office solution — to be selected");
  }

  // Banking
  if (input.needsBanking) {
    svcMin += 2500; svcMax += 4500;
    included.push("Bank account opening assistance (multi-bank intros)");
  } else {
    addons.push("Corporate bank account assistance");
  }

  // Tax
  if (input.needsTax) {
    svcMin += 1500; svcMax += 2800;
    included.push("VAT / Corporate Tax registration with FTA");
  } else {
    addons.push("VAT & Corporate Tax registration");
  }

  // Digital
  if (input.needsDigital) {
    svcMin += 4500; svcMax += 9000;
    included.push("Website, branded email & digital infrastructure");
  } else {
    addons.push("Website & digital infrastructure (optional)");
  }

  return {
    recommendedStructure: base.structure,
    selectedJurisdiction: base.j,
    includedServices: included,
    optionalAddons: addons,
    governmentFees: { min: govMin, max: govMax },
    serviceFees: { min: svcMin, max: svcMax },
    totalCost: { min: govMin + svcMin, max: govMax + svcMax },
    timelineDays: { min: base.days[0], max: base.days[1] },
  };
}

export const JURISDICTION_OPTIONS = Object.keys(JURISDICTION_BASE);

export function formatAed(n: number) {
  return `AED ${n.toLocaleString()}`;
}
