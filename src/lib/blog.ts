export type BlogCategory =
  | "UAE Company Formation"
  | "Banking & Compliance"
  | "Residency & Visas"
  | "Free Zones"
  | "AI & Business"
  | "Tax & AML"
  | "Startup Guides"
  | "Remote Setup"
  | "Banking Preparation"
  | "Digital Growth";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "UAE Company Formation",
  "Free Zones",
  "Banking & Compliance",
  "Residency & Visas",
  "Remote Setup",
  "Banking Preparation",
  "Tax & AML",
  "Startup Guides",
  "AI & Business",
  "Digital Growth",
];

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type ArticleSection = {
  id: string;
  heading: string;
  blocks: ArticleBlock[];
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  author: { name: string; role: string };
  publishedAt: string; // ISO
  readingMinutes: number;
  cover: string; // Unsplash
  featured?: boolean;
  trending?: boolean;
  seo: { title: string; description: string };
  sections: ArticleSection[];
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`;

export const ARTICLES: Article[] = [
  {
    slug: "best-free-zones-in-dubai-for-startups",
    title: "Best Free Zones in Dubai for Startups in 2026",
    excerpt:
      "A founder-grade comparison of IFZA, Meydan, DMCC, Dubai South and DSO — with pricing, banking outlook, and visa eligibility.",
    category: "Free Zones",
    tags: ["Dubai", "IFZA", "DMCC", "Meydan", "Startups"],
    author: { name: "Soft Bridge Editorial", role: "UAE Formation Desk" },
    publishedAt: "2026-04-12",
    readingMinutes: 8,
    cover: img("photo-1512453979798-5ea266f8880c"),
    featured: true,
    trending: true,
    seo: {
      title: "Best Dubai Free Zones for Startups (2026) — IFZA, DMCC, Meydan",
      description:
        "Compare Dubai's best free zones for startups in 2026 — IFZA, Meydan, DMCC, Dubai South, DSO — pricing, banking, and visa eligibility.",
    },
    sections: [
      {
        id: "overview",
        heading: "Why Dubai for startups",
        blocks: [
          {
            type: "p",
            text: "Dubai remains the Middle East's commercial capital — global banking access, world-class infrastructure, and 30+ free zones engineered for every industry. For founders, the question is rarely 'should I incorporate in Dubai?' but 'which zone fits how I actually operate?'.",
          },
          {
            type: "p",
            text: "The wrong jurisdiction costs more to unwind than to plan correctly. Activity scope, banking eligibility, visa quota, and office requirements drive the real comparison — not just the license sticker price.",
          },
        ],
      },
      {
        id: "ifza",
        heading: "IFZA — cost-efficient and fast",
        blocks: [
          {
            type: "p",
            text: "IFZA is the most popular cost-efficient Dubai free zone. Flexible packages, rapid issuance, and competitive visa quotas make it a strong default for consultancy, SaaS, and lean startups.",
          },
          {
            type: "ul",
            items: [
              "Setup from AED 12,900",
              "License in 3–5 working days",
              "Up to 9 visas; Tier 1 banking eligible",
            ],
          },
        ],
      },
      {
        id: "meydan",
        heading: "Meydan Free Zone — premium address",
        blocks: [
          {
            type: "p",
            text: "Meydan combines a prestigious Dubai address with virtual office options. Ideal for founders who want a credible signal to clients and banks without committing to physical office costs in year one.",
          },
        ],
      },
      {
        id: "dmcc",
        heading: "DMCC — trading and commodities",
        blocks: [
          {
            type: "p",
            text: "DMCC is the gold standard for trading, commodities, crypto, and regional headquarters. Higher cost, but unmatched banking reputation and global recognition.",
          },
        ],
      },
      {
        id: "verdict",
        heading: "Verdict",
        blocks: [
          {
            type: "p",
            text: "Default to IFZA for consultancy and SaaS, Meydan for brand-conscious founders, DMCC for trading and crypto, Dubai South for logistics, and DSO for deep-tech R&D. Talk to our AI Advisor for a personalised match.",
          },
        ],
      },
    ],
  },
  {
    slug: "ifza-vs-meydan",
    title: "IFZA vs Meydan: Which Dubai Free Zone Should You Pick?",
    excerpt:
      "Both are cost-efficient, both issue fast — but their packaging, banking outlook, and address prestige differ in ways founders should weigh.",
    category: "Free Zones",
    tags: ["IFZA", "Meydan", "Dubai", "Comparison"],
    author: { name: "Soft Bridge Editorial", role: "UAE Formation Desk" },
    publishedAt: "2026-04-08",
    readingMinutes: 6,
    cover: img("photo-1518684079-3c830dcef090"),
    trending: true,
    seo: {
      title: "IFZA vs Meydan — Which Dubai Free Zone Is Better?",
      description:
        "Head-to-head comparison of IFZA and Meydan free zones: pricing, banking, visa quotas, and which fits your business best.",
    },
    sections: [
      {
        id: "head-to-head",
        heading: "Head-to-head",
        blocks: [
          {
            type: "p",
            text: "IFZA and Meydan are the two most-requested cost-efficient Dubai free zones in 2026. Both issue licenses in under a week, both support virtual offices, and both are accepted by Tier 1 UAE banks.",
          },
          {
            type: "ul",
            items: [
              "IFZA — broadest activity list, more visa flexibility",
              "Meydan — premium Dubai brand address, slightly higher prestige",
              "Both — fully remote setup, modern client portals",
            ],
          },
        ],
      },
      {
        id: "pick",
        heading: "Which should you pick",
        blocks: [
          {
            type: "p",
            text: "Pick IFZA if you need more visas, niche activities, or absolute lowest cost. Pick Meydan if your clients judge by the address on your invoices and you want a stronger brand signal.",
          },
        ],
      },
    ],
  },
  {
    slug: "uae-remote-company-setup",
    title: "Can You Open a UAE Company Remotely? (2026 Guide)",
    excerpt:
      "Yes — but the experience varies wildly by free zone, banking partner, and how your nationality is treated by compliance teams.",
    category: "Remote Setup",
    tags: ["Remote", "Free Zones", "Banking"],
    author: { name: "Soft Bridge Editorial", role: "UAE Formation Desk" },
    publishedAt: "2026-04-02",
    readingMinutes: 7,
    cover: img("photo-1582672060674-bc2bd808a8ce"),
    seo: {
      title: "Open a UAE Company Remotely — 2026 Step-by-Step Guide",
      description:
        "How to incorporate in the UAE 100% remotely — eligible free zones, banking realities, KYC, and Emirates ID timelines.",
    },
    sections: [
      {
        id: "eligibility",
        heading: "Who can set up remotely",
        blocks: [
          {
            type: "p",
            text: "Most free zones now accept 100% remote incorporation: IFZA, Meydan, RAKEZ, SHAMS, Ajman Free Zone, and others. Mainland setups typically still require a brief in-person step for biometrics.",
          },
        ],
      },
      {
        id: "process",
        heading: "The remote process",
        blocks: [
          {
            type: "ul",
            items: [
              "Activity and jurisdiction selection",
              "Notarised passport copy + KYC pack",
              "License issuance (3–10 days)",
              "Establishment card + e-Channels",
              "Residency: in-person trip for medical, biometrics, Emirates ID",
            ],
          },
        ],
      },
      {
        id: "banking",
        heading: "Banking — the real bottleneck",
        blocks: [
          {
            type: "p",
            text: "Incorporation is fast. Banking is where most remote setups stall. Tier 1 UAE banks require interviews, sometimes in person. Plan a banking trip 2–6 weeks after license issuance for the strongest outcome.",
          },
        ],
      },
    ],
  },
  {
    slug: "uae-corporate-bank-account",
    title: "How to Get a UAE Corporate Bank Account (Without the Drama)",
    excerpt:
      "A practical playbook for Tier 1 UAE bank accounts in 2026 — what compliance actually looks at, and how to package your application for approval.",
    category: "Banking Preparation",
    tags: ["Banking", "Compliance", "KYC"],
    author: { name: "Soft Bridge Editorial", role: "Banking Desk" },
    publishedAt: "2026-03-25",
    readingMinutes: 9,
    cover: img("photo-1554224155-6726b3ff858f"),
    featured: true,
    seo: {
      title: "UAE Corporate Bank Account — 2026 Approval Playbook",
      description:
        "Step-by-step guide to opening a UAE corporate bank account with Tier 1 banks. KYC, documents, and approval timelines.",
    },
    sections: [
      {
        id: "what-banks-look-at",
        heading: "What UAE banks really look at",
        blocks: [
          {
            type: "p",
            text: "UAE banking compliance has tightened sharply post-2023. Banks now weigh business substance, source of funds clarity, expected transaction profile, and the founder's professional background — not just license type.",
          },
          {
            type: "ul",
            items: [
              "Clear, narrow business activity",
              "Documented client base or contracts",
              "Source-of-funds trail (3–6 months bank statements)",
              "Founder CV and digital footprint",
            ],
          },
        ],
      },
      {
        id: "tier-1",
        heading: "Tier 1 vs Tier 2 banks",
        blocks: [
          {
            type: "p",
            text: "Tier 1 banks (Emirates NBD, Mashreq, ENBD Business, ADCB) offer better digital tooling and international wires but have stricter KYC. Tier 2 (RAKBank, WIO, CBI) are faster to open but may have higher fees and lower wire limits.",
          },
        ],
      },
      {
        id: "timeline",
        heading: "Realistic timeline",
        blocks: [
          {
            type: "p",
            text: "Expect 3–6 weeks for Tier 1, 1–3 weeks for Tier 2 — assuming a clean application. We package your application end-to-end so compliance has nothing to ask twice.",
          },
        ],
      },
    ],
  },
  {
    slug: "mainland-vs-free-zone",
    title: "UAE Mainland vs Free Zone: Explained Without the Jargon",
    excerpt:
      "The right answer depends on who you sell to, where you operate, and whether you need to bid on government contracts.",
    category: "UAE Company Formation",
    tags: ["Mainland", "Free Zone", "Comparison"],
    author: { name: "Soft Bridge Editorial", role: "UAE Formation Desk" },
    publishedAt: "2026-03-18",
    readingMinutes: 6,
    cover: img("photo-1546412414-e1885259563a"),
    seo: {
      title: "UAE Mainland vs Free Zone — Which Is Right For You?",
      description:
        "Clear comparison of UAE Mainland vs Free Zone setup. Activity scope, ownership, banking, and visa differences.",
    },
    sections: [
      {
        id: "mainland",
        heading: "When mainland makes sense",
        blocks: [
          {
            type: "p",
            text: "Choose mainland (DED) if you sell to UAE customers directly, need a physical retail presence, want to bid on government contracts, or operate in regulated sectors like construction.",
          },
        ],
      },
      {
        id: "free-zone",
        heading: "When free zone wins",
        blocks: [
          {
            type: "p",
            text: "Free zones win for international trading, consultancy, tech, holding companies, and any business that bills internationally. Lower setup, easier visas, and 100% foreign ownership.",
          },
        ],
      },
    ],
  },
  {
    slug: "best-uae-setup-for-ecommerce",
    title: "Best UAE Setup for E-Commerce Businesses",
    excerpt:
      "From dropshipping to high-volume D2C — the right license, jurisdiction, and banking combo matters more than the cheapest sticker.",
    category: "Startup Guides",
    tags: ["E-commerce", "Dubai South", "Meydan", "IFZA"],
    author: { name: "Soft Bridge Editorial", role: "Founder Studio" },
    publishedAt: "2026-03-10",
    readingMinutes: 7,
    cover: img("photo-1556742400-b5b7c5121f8d"),
    seo: {
      title: "Best UAE Setup for E-Commerce (2026) — License & Jurisdiction Guide",
      description:
        "The best UAE jurisdictions and licenses for e-commerce businesses — Meydan, IFZA, Dubai South, and payment gateway access.",
    },
    sections: [
      {
        id: "license",
        heading: "Pick the right license",
        blocks: [
          {
            type: "p",
            text: "E-commerce licenses cover online sales of physical goods. For digital goods, marketing services, or platforms — you'll often need a hybrid activity setup. Get this wrong and your payment gateway will reject you.",
          },
        ],
      },
      {
        id: "payments",
        heading: "Payment gateways",
        blocks: [
          {
            type: "p",
            text: "Stripe, Telr, Network International, and Checkout.com all operate in the UAE. Approval depends on your license activity, projected volume, and target markets. Plan gateway sign-up alongside banking — not after.",
          },
        ],
      },
    ],
  },
  {
    slug: "uae-business-setup-costs-2026",
    title: "UAE Business Setup Costs in 2026: A Transparent Breakdown",
    excerpt:
      "License, visa, banking, office, compliance — the real all-in cost of launching a UAE company, with realistic ranges by jurisdiction.",
    category: "UAE Company Formation",
    tags: ["Costs", "Pricing", "2026"],
    author: { name: "Soft Bridge Editorial", role: "UAE Formation Desk" },
    publishedAt: "2026-03-03",
    readingMinutes: 8,
    cover: img("photo-1554224155-8d04cb21cd6c"),
    featured: true,
    seo: {
      title: "UAE Business Setup Costs in 2026 — Transparent Breakdown",
      description:
        "Real UAE company setup costs in 2026 — license, visa, banking, office, and compliance ranges by jurisdiction.",
    },
    sections: [
      {
        id: "license",
        heading: "License cost ranges",
        blocks: [
          {
            type: "ul",
            items: [
              "Ajman FZ — from AED 8,500",
              "SHAMS — from AED 5,750",
              "IFZA — from AED 12,900",
              "Meydan — from AED 12,500",
              "DMCC — from AED 34,340",
            ],
          },
        ],
      },
      {
        id: "visa",
        heading: "Visa costs",
        blocks: [
          {
            type: "p",
            text: "Budget AED 4,000–7,000 per visa including medical, Emirates ID, and stamping. Add change-of-status if applying from inside the UAE.",
          },
        ],
      },
      {
        id: "hidden",
        heading: "What people forget to budget",
        blocks: [
          {
            type: "ul",
            items: [
              "PRO and government typing fees",
              "Establishment card and e-Channels",
              "Corporate tax registration",
              "Bank account opening assistance",
              "VAT registration if revenue > AED 375k",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "uae-visa-process-explained",
    title: "The UAE Visa Process, Explained End-to-End",
    excerpt:
      "From entry permit to Emirates ID — what really happens, in what order, and how long each step actually takes in 2026.",
    category: "Residency & Visas",
    tags: ["Visa", "Emirates ID", "Residency"],
    author: { name: "Soft Bridge Editorial", role: "Residency Desk" },
    publishedAt: "2026-02-24",
    readingMinutes: 7,
    cover: img("photo-1583244532610-2a234e36b3f4"),
    seo: {
      title: "UAE Visa Process Explained — 2026 Step-by-Step Guide",
      description:
        "Full UAE residency visa process: entry permit, medical, Emirates ID, and stamping — with realistic timelines.",
    },
    sections: [
      {
        id: "steps",
        heading: "The six steps",
        blocks: [
          {
            type: "ul",
            items: [
              "Entry permit (3–5 days)",
              "Status change or border run",
              "Medical fitness test (same day)",
              "Emirates ID biometrics (next day)",
              "Visa stamping (3–7 days)",
              "Emirates ID delivery (5–10 days)",
            ],
          },
        ],
      },
      {
        id: "tip",
        heading: "One tip that saves a week",
        blocks: [
          {
            type: "p",
            text: "Book medical and biometrics on the same day in the same emirate. We coordinate the appointment chain so you're done in 7–10 days instead of 3 weeks.",
          },
        ],
      },
    ],
  },
  {
    slug: "banking-compliance-uae",
    title: "Banking Compliance for UAE Companies: What Actually Matters",
    excerpt:
      "AML, source of funds, beneficial ownership, and ongoing monitoring — the compliance reality every UAE company should plan for.",
    category: "Tax & AML",
    tags: ["AML", "Compliance", "UBO", "Banking"],
    author: { name: "Soft Bridge Editorial", role: "Compliance Desk" },
    publishedAt: "2026-02-17",
    readingMinutes: 8,
    cover: img("photo-1450101499163-c8848c66ca85"),
    seo: {
      title: "Banking Compliance for UAE Companies — AML & UBO Guide",
      description:
        "What UAE banking compliance really requires in 2026 — AML, UBO filings, source of funds, and ongoing transaction monitoring.",
    },
    sections: [
      {
        id: "aml",
        heading: "AML basics",
        blocks: [
          {
            type: "p",
            text: "Every UAE company must maintain UBO records, conduct customer due diligence on counterparties, and report suspicious transactions through goAML. Banks expect you to know this — or to have a compliance partner who does.",
          },
        ],
      },
      {
        id: "ubo",
        heading: "UBO and ESR",
        blocks: [
          {
            type: "p",
            text: "Ultimate Beneficial Owner registers are mandatory. Economic Substance Regulations apply to certain regulated activities. Missing filings trigger fines from AED 50,000 upwards and can freeze your bank account.",
          },
        ],
      },
    ],
  },
  {
    slug: "best-free-zones-for-ai-tech-startups",
    title: "Best UAE Free Zones for AI & Tech Startups",
    excerpt:
      "DSO, ADGM, DIFC Innovation Hub, twofour54 — where AI, fintech, and SaaS founders should actually incorporate in 2026.",
    category: "AI & Business",
    tags: ["AI", "Tech", "DSO", "ADGM", "DIFC"],
    author: { name: "Soft Bridge Editorial", role: "Founder Studio" },
    publishedAt: "2026-02-10",
    readingMinutes: 7,
    cover: img("photo-1518770660439-4636190af475"),
    trending: true,
    seo: {
      title: "Best UAE Free Zones for AI & Tech Startups (2026)",
      description:
        "Where AI, fintech, and SaaS founders should incorporate in the UAE — DSO, ADGM, DIFC Innovation Hub, twofour54.",
    },
    sections: [
      {
        id: "dso",
        heading: "DSO — pure tech focus",
        blocks: [
          {
            type: "p",
            text: "Dubai Silicon Oasis is purpose-built for tech R&D, IoT, and product companies. Affordable, with dedicated tech zoning and labs.",
          },
        ],
      },
      {
        id: "adgm",
        heading: "ADGM — fintech and AI regulation",
        blocks: [
          {
            type: "p",
            text: "ADGM (Abu Dhabi Global Market) operates on common law and has the most progressive AI and fintech sandboxes in the region. Best for regulated AI products and fintech.",
          },
        ],
      },
      {
        id: "verdict",
        heading: "Quick verdict",
        blocks: [
          {
            type: "p",
            text: "SaaS without regulation → IFZA or DSO. Fintech or regulated AI → ADGM or DIFC. Content and media AI → twofour54. Match your regulatory footprint to the jurisdiction, not the marketing brochure.",
          },
        ],
      },
    ],
  },
];

export const FEATURED_ARTICLES = ARTICLES.filter((a) => a.featured);
export const TRENDING_ARTICLES = ARTICLES.filter((a) => a.trending);

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, count = 3): Article[] {
  const current = getArticle(slug);
  if (!current) return [];
  return ARTICLES.filter((a) => a.slug !== slug)
    .sort((a, b) => {
      const aScore =
        (a.category === current.category ? 2 : 0) +
        a.tags.filter((t) => current.tags.includes(t)).length;
      const bScore =
        (b.category === current.category ? 2 : 0) +
        b.tags.filter((t) => current.tags.includes(t)).length;
      return bScore - aScore;
    })
    .slice(0, count);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
