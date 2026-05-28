export const STAGE_KEYS = [
  "consultation","initial_approval","trade_name","ejari","license",
  "establishment_card","residency","visa_application","medical",
  "eid_fingerprint","eid_issuance","tax_registration","banking","lifetime_support",
] as const;

export type StageKey = typeof STAGE_KEYS[number];

export type StageStatus =
  | "not_started" | "in_progress" | "waiting_client"
  | "under_review" | "completed" | "issue";

export interface StageMeta {
  key: StageKey;
  label: string;
  short: string;
  description: string;
}

export const STAGE_META: Record<StageKey, StageMeta> = {
  consultation:       { key: "consultation",       label: "Consultation",            short: "Discovery call & scope",       description: "Initial advisory call to define your activity, jurisdiction and visa needs." },
  initial_approval:   { key: "initial_approval",   label: "Initial Approval",        short: "Authority pre-approval",       description: "Submit application for initial approval from the relevant UAE authority." },
  trade_name:         { key: "trade_name",         label: "Trade Name Reservation",  short: "Brand name registered",        description: "Reserve and register your unique trade name." },
  ejari:              { key: "ejari",              label: "Ejari / Lease",           short: "Office address secured",       description: "Lease agreement and Ejari registration completed." },
  license:            { key: "license",            label: "License Issuance",        short: "Trade license issued",         description: "Final trade license issued by the licensing authority." },
  establishment_card: { key: "establishment_card", label: "Establishment Card",      short: "Immigration card",             description: "Immigration establishment card issued — required for visas." },
  residency:          { key: "residency",          label: "UAE Residency",           short: "Residency setup",              description: "Residency file opened for shareholders and dependents." },
  visa_application:   { key: "visa_application",   label: "Visa Application",        short: "Entry permits issued",         description: "Entry permits and visa applications submitted." },
  medical:            { key: "medical",            label: "Medical Test",            short: "Health check booked",          description: "Mandatory medical fitness test for visa stamping." },
  eid_fingerprint:    { key: "eid_fingerprint",    label: "Emirates ID Biometrics",  short: "Fingerprints captured",        description: "Biometrics capture appointment for Emirates ID." },
  eid_issuance:       { key: "eid_issuance",       label: "Emirates ID Issued",      short: "EID delivered",                description: "Emirates ID card issued and delivered." },
  tax_registration:   { key: "tax_registration",   label: "Tax Registration",        short: "TRN & corporate tax",          description: "VAT/Corporate Tax registration with the FTA." },
  banking:            { key: "banking",            label: "Banking Assistance",      short: "Corporate account",            description: "Bank introductions and corporate account opening support." },
  lifetime_support:   { key: "lifetime_support",   label: "Lifetime Support",        short: "Always-on advisory",           description: "You're live. Soft Bridge remains your ongoing infrastructure partner." },
};

export const STAGE_LIST: StageMeta[] = STAGE_KEYS.map(k => STAGE_META[k]);

export function statusColor(s: StageStatus) {
  switch (s) {
    case "completed":      return "text-emerald-400 border-emerald-400/30 bg-emerald-400/10";
    case "in_progress":    return "text-sky-400 border-sky-400/30 bg-sky-400/10";
    case "waiting_client": return "text-amber-300 border-amber-300/30 bg-amber-300/10";
    case "under_review":   return "text-violet-300 border-violet-300/30 bg-violet-300/10";
    case "issue":          return "text-red-400 border-red-400/30 bg-red-400/10";
    default:               return "text-muted-foreground border-white/10 bg-white/[0.03]";
  }
}

export function statusLabel(s: StageStatus) {
  return ({
    not_started: "Not started",
    in_progress: "In progress",
    waiting_client: "Waiting on you",
    under_review: "Under authority review",
    completed: "Completed",
    issue: "Issue — action needed",
  } as const)[s];
}

export const REQUIRED_DOCS = [
  "Passport Copy",
  "Visa Copy",
  "Emirates ID",
  "Passport Photo",
  "Proof of Address",
  "Business Activity Details",
  "Bank Statement",
];
