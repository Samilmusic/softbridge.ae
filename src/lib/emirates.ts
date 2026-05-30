export type EmirateFreeZone = {
  name: string;
  description: string;
  bestFor: string[];
  setupCost: string;
  timeline: string;
  banking: string;
  visa: string;
};

export type EmirateRecommendation = {
  label: string;
  pick: string;
  reason: string;
};

export type EmirateSlug =
  | "dubai"
  | "abu-dhabi"
  | "sharjah"
  | "ajman"
  | "rak"
  | "fujairah"
  | "uaq";

export type EmiratePage = {
  slug: EmirateSlug;
  emirateKey: string; // matches UAE_LOCATIONS[].emirate
  path: string;
  title: string;
  hero: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    image: string; // Unsplash URL
    accent: string; // oklch
  };
  highlights: {
    setupSpeed: string;
    remoteSetup: string;
    banking: string;
    visa: string;
    industries: string;
  };
  freeZones: EmirateFreeZone[];
  mainland: {
    overview: string;
    benefits: string[];
    office: string;
    visa: string;
    activities: string;
    government: string;
  };
  recommendations: EmirateRecommendation[];
  seo: { title: string; description: string };
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`;

export const EMIRATES: EmiratePage[] = [
  {
    slug: "dubai",
    emirateKey: "Dubai",
    path: "/dubai-company-formation",
    title: "Dubai Company Formation",
    hero: {
      eyebrow: "Dubai • UAE",
      headline: "Dubai Company Formation",
      subtitle:
        "The Middle East's commercial capital — global banking access, world-class infrastructure, and 30+ free zones engineered for every industry.",
      image: img("photo-1512453979798-5ea266f8880c"),
      accent: "oklch(0.66 0.22 285)",
    },
    highlights: {
      setupSpeed: "License in 3–7 working days",
      remoteSetup: "100% remote setup available",
      banking: "Strong — Tier 1 UAE & international banks",
      visa: "2–10 year visas; investor & employment",
      industries:
        "Trading, tech, fintech, e-commerce, consultancy, media, logistics",
    },
    freeZones: [
      {
        name: "IFZA",
        description:
          "Flagship cost-efficient free zone with flexible packages and fast issuance.",
        bestFor: ["Consultancy", "SMEs", "Holding"],
        setupCost: "From AED 12,900",
        timeline: "3–5 working days",
        banking: "Good — most Tier 1 banks",
        visa: "Up to 9 visas",
      },
      {
        name: "DMCC",
        description:
          "Award-winning free zone in JLT — premium address for trading and commodities.",
        bestFor: ["Trading", "Commodities", "Crypto"],
        setupCost: "From AED 34,340",
        timeline: "7–10 working days",
        banking: "Excellent — Tier 1 banks",
        visa: "Unlimited (subject to office size)",
      },
      {
        name: "Meydan Free Zone",
        description:
          "Premium Dubai address with virtual office and rapid license issuance.",
        bestFor: ["E-commerce", "Consultancy", "Startups"],
        setupCost: "From AED 12,500",
        timeline: "3–5 working days",
        banking: "Good — most Tier 1 banks",
        visa: "Up to 6 visas",
      },
      {
        name: "Dubai South",
        description:
          "Logistics, aviation, and e-commerce hub next to Al Maktoum Airport.",
        bestFor: ["Logistics", "Aviation", "E-commerce"],
        setupCost: "From AED 11,500",
        timeline: "5–7 working days",
        banking: "Good",
        visa: "Up to 6 visas",
      },
      {
        name: "DAFZA",
        description:
          "Airport-adjacent premium free zone for international trade and HQs.",
        bestFor: ["Trading", "Aviation", "Regional HQ"],
        setupCost: "From AED 25,000",
        timeline: "7–10 working days",
        banking: "Excellent",
        visa: "Unlimited (office-based)",
      },
      {
        name: "Dubai Silicon Oasis (DSO)",
        description:
          "Tech-focused free zone with R&D infrastructure and dedicated zoning.",
        bestFor: ["Tech", "R&D", "SaaS"],
        setupCost: "From AED 14,000",
        timeline: "5–10 working days",
        banking: "Good",
        visa: "Office-based",
      },
      {
        name: "JAFZA",
        description:
          "Largest industrial free zone with port access — ideal for shipping and manufacturing.",
        bestFor: ["Industrial", "Shipping", "Manufacturing"],
        setupCost: "From AED 22,000",
        timeline: "10–15 working days",
        banking: "Excellent",
        visa: "Unlimited (office-based)",
      },
    ],
    mainland: {
      overview:
        "Dubai Mainland (DED) gives you direct access to the UAE local market, government contracts, and unrestricted office locations across the emirate.",
      benefits: [
        "Trade anywhere in the UAE without distributor",
        "Bid on UAE government contracts",
        "100% foreign ownership for most activities",
        "Premium address and prestige",
      ],
      office:
        "Physical Ejari office required — flexi-desk options available for select activities.",
      visa: "Visa quota scales with office size; investor and employment visas issued.",
      activities:
        "2,000+ permitted activities — commercial, professional, industrial, and tourism.",
      government:
        "Coordinated approvals across DED, MoHRE, GDRFA, and free-zone-equivalent authorities.",
    },
    recommendations: [
      {
        label: "Best for E-Commerce",
        pick: "Meydan Free Zone",
        reason: "Fast issuance, virtual office, premium Dubai address.",
      },
      {
        label: "Best for Trading",
        pick: "DMCC",
        reason: "Tier 1 banking, global reputation, trading-friendly structure.",
      },
      {
        label: "Best for Startups",
        pick: "IFZA",
        reason: "Cost-efficient with flexible visa packages.",
      },
      {
        label: "Best for Holding",
        pick: "DIFC / DMCC",
        reason: "Recognised structures for international holding companies.",
      },
    ],
    seo: {
      title: "Dubai Company Formation — Free Zones & Mainland",
      description:
        "Premium Dubai company formation across IFZA, DMCC, Meydan, JAFZA, DAFZA and Mainland. Fast setup, banking access, and full visa support.",
    },
  },
  {
    slug: "abu-dhabi",
    emirateKey: "Abu Dhabi",
    path: "/abu-dhabi-company-formation",
    title: "Abu Dhabi Company Formation",
    hero: {
      eyebrow: "Abu Dhabi • UAE Capital",
      headline: "Abu Dhabi Company Formation",
      subtitle:
        "The UAE capital — sovereign-grade infrastructure, world-leading finance via ADGM, and direct access to government and energy sectors.",
      image: img("photo-1582672060674-bc2bd808a8ce"),
      accent: "oklch(0.62 0.18 250)",
    },
    highlights: {
      setupSpeed: "License in 5–10 working days",
      remoteSetup: "Available for most free zones",
      banking: "Excellent — including ADGM banking ecosystem",
      visa: "Investor, employment, and Golden Visa pathways",
      industries: "Finance, energy, industrial, cleantech, media, government",
    },
    freeZones: [
      {
        name: "ADGM",
        description:
          "Abu Dhabi Global Market — common-law financial free zone for finance, fintech, and family offices.",
        bestFor: ["Finance", "Fintech", "Family Office"],
        setupCost: "From USD 8,000",
        timeline: "10–20 working days",
        banking: "Excellent — direct ADGM banking access",
        visa: "Unlimited (office-based)",
      },
      {
        name: "KEZAD",
        description:
          "Khalifa Economic Zones — large-scale industrial, logistics and manufacturing zone.",
        bestFor: ["Industrial", "Manufacturing", "Logistics"],
        setupCost: "From AED 15,000",
        timeline: "10–15 working days",
        banking: "Good",
        visa: "Office/warehouse-based",
      },
      {
        name: "Masdar City",
        description:
          "Sustainability-focused free zone for cleantech, renewables, and R&D.",
        bestFor: ["Cleantech", "Renewables", "R&D"],
        setupCost: "From AED 17,500",
        timeline: "7–10 working days",
        banking: "Good",
        visa: "Up to 6 visas",
      },
      {
        name: "twofour54",
        description:
          "Media and content free zone in Abu Dhabi with production infrastructure.",
        bestFor: ["Media", "Content", "Production"],
        setupCost: "From AED 12,500",
        timeline: "7–10 working days",
        banking: "Good",
        visa: "Up to 4 visas",
      },
    ],
    mainland: {
      overview:
        "Abu Dhabi Mainland (ADDED) is the gateway to government contracts, energy sector work, and sovereign-backed projects.",
      benefits: [
        "Eligible for government tenders",
        "Access to energy and infrastructure projects",
        "100% foreign ownership for most activities",
        "Strong banking relationships",
      ],
      office: "Physical Ejari/Tawtheeq office required.",
      visa: "Quota scales with office size and activity.",
      activities: "Commercial, professional, industrial, and tourism.",
      government: "Coordinated with ADDED, ICA, MoHRE, and sector regulators.",
    },
    recommendations: [
      {
        label: "Best for Finance & Fintech",
        pick: "ADGM",
        reason: "Common-law jurisdiction with full financial services framework.",
      },
      {
        label: "Best for Industrial",
        pick: "KEZAD",
        reason: "Large-scale industrial and logistics infrastructure.",
      },
      {
        label: "Best for Cleantech",
        pick: "Masdar City",
        reason: "Sustainability-focused with R&D ecosystem.",
      },
      {
        label: "Best for Media",
        pick: "twofour54",
        reason: "Purpose-built media and content production hub.",
      },
    ],
    seo: {
      title:
        "Abu Dhabi Company Formation — ADGM, KEZAD, Masdar & Mainland | Soft Bridge",
      description:
        "Set up your company in Abu Dhabi via ADGM, KEZAD, Masdar City, twofour54 or Mainland. Premium setup with banking and visa support.",
    },
  },
  {
    slug: "sharjah",
    emirateKey: "Sharjah",
    path: "/sharjah-company-formation",
    title: "Sharjah Company Formation",
    hero: {
      eyebrow: "Sharjah • UAE",
      headline: "Sharjah Company Formation",
      subtitle:
        "Balanced cost and proximity to Dubai — a strategic choice for media, industrial, and trading businesses.",
      image: img("photo-1518684079-3c830dcef090"),
      accent: "oklch(0.7 0.16 145)",
    },
    highlights: {
      setupSpeed: "License in 3–7 working days",
      remoteSetup: "Available for SHAMS and most free zones",
      banking: "Good — Tier 1 UAE banks",
      visa: "Investor and employment visas",
      industries: "Media, freelancing, industrial, shipping, education",
    },
    freeZones: [
      {
        name: "SHAMS",
        description:
          "Sharjah Media City — cost-efficient free zone popular with freelancers and creatives.",
        bestFor: ["Media", "Freelancers", "Consultancy"],
        setupCost: "From AED 5,750",
        timeline: "2–5 working days",
        banking: "Good",
        visa: "Up to 6 visas",
      },
      {
        name: "SAIF Zone",
        description:
          "Sharjah Airport International Free Zone — airport-adjacent logistics and trading hub.",
        bestFor: ["Logistics", "Aviation", "Trading"],
        setupCost: "From AED 15,000",
        timeline: "7–10 working days",
        banking: "Good",
        visa: "Office-based",
      },
      {
        name: "Hamriyah Free Zone",
        description:
          "Industrial free zone with deep-water port access for manufacturing and trade.",
        bestFor: ["Industrial", "Manufacturing", "Port access"],
        setupCost: "From AED 9,000",
        timeline: "7–10 working days",
        banking: "Good",
        visa: "Office/warehouse-based",
      },
    ],
    mainland: {
      overview:
        "Sharjah Mainland gives access to the local Sharjah economy with competitive office and licensing costs.",
      benefits: [
        "Lower operating costs vs Dubai",
        "100% foreign ownership on most activities",
        "Proximity to Dubai and Northern Emirates",
        "Strong industrial and education sectors",
      ],
      office: "Physical Ejari office required.",
      visa: "Quota tied to office size.",
      activities: "Commercial, professional, industrial.",
      government: "Coordinated with SEDD, MoHRE, and ICA.",
    },
    recommendations: [
      {
        label: "Best for Freelancers",
        pick: "SHAMS",
        reason: "Lowest-cost UAE freelance permit with full visa eligibility.",
      },
      {
        label: "Best for Industrial",
        pick: "Hamriyah Free Zone",
        reason: "Deep-water port + industrial-grade plots.",
      },
      {
        label: "Best for Aviation/Logistics",
        pick: "SAIF Zone",
        reason: "Airport-adjacent with logistics infrastructure.",
      },
    ],
    seo: {
      title:
        "Sharjah Company Formation — SHAMS, SAIF, Hamriyah & Mainland | Soft Bridge",
      description:
        "Premium Sharjah company setup across SHAMS, SAIF Zone, Hamriyah Free Zone and Mainland — cost-efficient with full banking and visa support.",
    },
  },
  {
    slug: "ajman",
    emirateKey: "Ajman",
    path: "/ajman-company-formation",
    title: "Ajman Company Formation",
    hero: {
      eyebrow: "Ajman • UAE",
      headline: "Ajman Company Formation",
      subtitle:
        "The most cost-effective entry point into the UAE market — perfect for lean startups and service businesses.",
      image: img("photo-1546412414-e1885259563a"),
      accent: "oklch(0.7 0.16 35)",
    },
    highlights: {
      setupSpeed: "License in 2–5 working days",
      remoteSetup: "Fully remote setup available",
      banking: "Good — Tier 2 + select Tier 1 banks",
      visa: "Investor and employment visas",
      industries: "Services, trading, consultancy, small manufacturing",
    },
    freeZones: [
      {
        name: "Ajman Free Zone (AFZ)",
        description:
          "Budget-friendly free zone with rapid issuance and flexible packages.",
        bestFor: ["Startups", "SMEs", "Services"],
        setupCost: "From AED 8,500",
        timeline: "2–4 working days",
        banking: "Good",
        visa: "Up to 6 visas",
      },
    ],
    mainland: {
      overview:
        "Ajman Mainland is ideal for local service businesses and cost-conscious operations targeting the UAE market.",
      benefits: [
        "Lowest operating costs in the UAE",
        "100% foreign ownership on most activities",
        "Fast government processing",
        "Easy access to Dubai and Sharjah",
      ],
      office: "Physical Ejari office required (small-scale options available).",
      visa: "Quota scales with office size.",
      activities: "Services, trading, and light industrial.",
      government: "Coordinated with Ajman DED, MoHRE, and ICA.",
    },
    recommendations: [
      {
        label: "Best for Lean Startups",
        pick: "Ajman Free Zone",
        reason: "Lowest-cost full free zone setup in the UAE.",
      },
      {
        label: "Best for Local Services",
        pick: "Ajman Mainland",
        reason: "Direct UAE market access at minimal cost.",
      },
    ],
    seo: {
      title:
        "Ajman Company Formation — Ajman Free Zone & Mainland | Soft Bridge",
      description:
        "Most cost-effective UAE company setup. Premium support across Ajman Free Zone and Ajman Mainland with banking and visa assistance.",
    },
  },
  {
    slug: "rak",
    emirateKey: "Ras Al Khaimah",
    path: "/rak-company-formation",
    title: "Ras Al Khaimah Company Formation",
    hero: {
      eyebrow: "Ras Al Khaimah • UAE",
      headline: "Ras Al Khaimah Company Formation",
      subtitle:
        "Industrial scale and competitive pricing — RAKEZ is one of the largest economic zones in the region.",
      image: img("photo-1583244532610-2a234e36b3f4"),
      accent: "oklch(0.62 0.18 25)",
    },
    highlights: {
      setupSpeed: "License in 5–10 working days",
      remoteSetup: "Fully remote setup available",
      banking: "Good — Tier 1 UAE banks",
      visa: "Investor, employment, and partner visas",
      industries: "Manufacturing, SMEs, trading, services, education",
    },
    freeZones: [
      {
        name: "RAKEZ",
        description:
          "Ras Al Khaimah Economic Zone — full-spectrum zone supporting SMEs, manufacturing, and services.",
        bestFor: ["Manufacturing", "SMEs", "Services"],
        setupCost: "From AED 11,500",
        timeline: "5–10 working days",
        banking: "Good",
        visa: "Up to 6+ visas",
      },
    ],
    mainland: {
      overview:
        "RAK Mainland supports local operations and industrial activity with competitive setup and operating costs.",
      benefits: [
        "Industrial-grade infrastructure",
        "Lower costs vs Dubai/Abu Dhabi",
        "100% foreign ownership on most activities",
        "Strong manufacturing ecosystem",
      ],
      office: "Physical office or industrial plot required.",
      visa: "Quota scales with facility size.",
      activities: "Commercial, industrial, professional.",
      government: "Coordinated with RAK DED, MoHRE, and ICA.",
    },
    recommendations: [
      {
        label: "Best for Manufacturing",
        pick: "RAKEZ Industrial",
        reason: "Cost-efficient industrial plots with utilities and labour access.",
      },
      {
        label: "Best for SMEs",
        pick: "RAKEZ Business Zone",
        reason: "Affordable license packages with full visa eligibility.",
      },
    ],
    seo: {
      title:
        "Ras Al Khaimah (RAK) Company Formation — RAKEZ & Mainland | Soft Bridge",
      description:
        "Premium RAK company setup via RAKEZ Free Zone and Mainland. Industrial-grade infrastructure at competitive prices.",
    },
  },
  {
    slug: "fujairah",
    emirateKey: "Fujairah",
    path: "/fujairah-company-formation",
    title: "Fujairah Company Formation",
    hero: {
      eyebrow: "Fujairah • UAE",
      headline: "Fujairah Company Formation",
      subtitle:
        "East coast access with creative licensing options — strategic for shipping, bunkering, and media businesses.",
      image: img("photo-1577086664693-894d8405334a"),
      accent: "oklch(0.65 0.16 200)",
    },
    highlights: {
      setupSpeed: "License in 3–7 working days",
      remoteSetup: "Available",
      banking: "Good",
      visa: "Investor and employment visas",
      industries: "Shipping, bunkering, media, consultancy",
    },
    freeZones: [
      {
        name: "Fujairah Free Zone",
        description:
          "Strategic east-coast free zone with port and bunkering access.",
        bestFor: ["Shipping", "Trading", "Bunkering"],
        setupCost: "From AED 14,500",
        timeline: "5–10 working days",
        banking: "Good",
        visa: "Office-based",
      },
      {
        name: "Creative City",
        description:
          "Media and consultancy free zone with low-cost packages.",
        bestFor: ["Media", "Consultancy", "Freelancers"],
        setupCost: "From AED 8,500",
        timeline: "3–7 working days",
        banking: "Good",
        visa: "Up to 6 visas",
      },
    ],
    mainland: {
      overview:
        "Fujairah Mainland is well-suited for local trading and services with east-coast access.",
      benefits: [
        "East-coast strategic position",
        "100% foreign ownership on most activities",
        "Competitive operating costs",
        "Proximity to Indian Ocean shipping",
      ],
      office: "Physical Ejari office required.",
      visa: "Quota tied to office size.",
      activities: "Commercial, professional, services.",
      government: "Coordinated with Fujairah DED, MoHRE, and ICA.",
    },
    recommendations: [
      {
        label: "Best for Shipping",
        pick: "Fujairah Free Zone",
        reason: "Direct port and bunkering access on the east coast.",
      },
      {
        label: "Best for Media",
        pick: "Creative City",
        reason: "Affordable creative and media licensing.",
      },
    ],
    seo: {
      title:
        "Fujairah Company Formation — Fujairah Free Zone, Creative City & Mainland | Soft Bridge",
      description:
        "Premium Fujairah company setup across Fujairah Free Zone, Creative City and Mainland. East-coast access for shipping and media.",
    },
  },
  {
    slug: "uaq",
    emirateKey: "Umm Al Quwain",
    path: "/uaq-company-formation",
    title: "Umm Al Quwain Company Formation",
    hero: {
      eyebrow: "Umm Al Quwain • UAE",
      headline: "Umm Al Quwain Company Formation",
      subtitle:
        "Quiet, cost-effective jurisdictions for low-overhead trading and services businesses.",
      image: img("photo-1546412414-8035e1776c9a"),
      accent: "oklch(0.7 0.14 280)",
    },
    highlights: {
      setupSpeed: "License in 3–7 working days",
      remoteSetup: "Available",
      banking: "Good — Tier 2 + select Tier 1 banks",
      visa: "Investor and employment visas",
      industries: "Trading, consultancy, services, small industrial",
    },
    freeZones: [
      {
        name: "UAQ Free Trade Zone",
        description:
          "Low-cost free zone with flexible licensing for trading and services.",
        bestFor: ["Trading", "Services", "Holding"],
        setupCost: "From AED 9,500",
        timeline: "3–7 working days",
        banking: "Good",
        visa: "Up to 6 visas",
      },
    ],
    mainland: {
      overview:
        "UAQ Mainland supports local business activity at one of the lowest operating costs in the UAE.",
      benefits: [
        "Very low operating costs",
        "100% foreign ownership on most activities",
        "Quiet, business-friendly environment",
        "Easy access to Northern Emirates",
      ],
      office: "Physical office required.",
      visa: "Quota tied to office size.",
      activities: "Commercial, professional, light industrial.",
      government: "Coordinated with UAQ DED, MoHRE, and ICA.",
    },
    recommendations: [
      {
        label: "Best for Low-Cost Trading",
        pick: "UAQ Free Trade Zone",
        reason: "Affordable license with trading flexibility.",
      },
      {
        label: "Best for Local Services",
        pick: "UAQ Mainland",
        reason: "Lowest-cost mainland UAE option for service businesses.",
      },
    ],
    seo: {
      title:
        "Umm Al Quwain (UAQ) Company Formation — UAQ FTZ & Mainland | Soft Bridge",
      description:
        "Affordable UAQ company setup via UAQ Free Trade Zone and Mainland. Quiet, low-cost jurisdiction with full support.",
    },
  },
];

export const EMIRATE_BY_KEY: Record<string, EmiratePage> = Object.fromEntries(
  EMIRATES.map((e) => [e.emirateKey, e]),
);
