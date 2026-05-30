import dubaiFreeZonesCover from "@/assets/blog/dubai-free-zones.jpg";
import bankingDocumentsCover from "@/assets/blog/banking-documents.jpg";
import europeanFoundersCover from "@/assets/tax-comparison-2026.png";
import uaeRemoteCompanyCover from "@/assets/uae-remote-company-2026.png";
import ifzaRecognitionCover from "@/assets/ifza-recognition.jpg";
import abuDhabiCover from "@/assets/emirates/abu-dhabi.jpg";
import dubaiCover from "@/assets/emirates/dubai.jpg";
import rakCover from "@/assets/emirates/ras-al-khaimah.jpg";
import sharjahCover from "@/assets/emirates/sharjah.jpg";

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
  | { type: "h3"; text: string }
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

const BASE_ARTICLES: Article[] = [
  {
    slug: "why-european-founders-move-business-to-uae",
    title: "Why European Founders Are Moving Their Business to the UAE (Tax Comparison 2026)",
    excerpt:
      "Corporate tax in Germany is 30%, France 25%, Netherlands 25.8%. UAE charges 9% — with key free zone exemptions. Here's why European founders are restructuring.",
    category: "UAE Company Formation",
    tags: ["Tax", "Europe", "UAE", "Company Formation", "Free Zones"],
    author: { name: "Soft Bridge Editorial", role: "UAE Formation Desk" },
    publishedAt: "2026-05-30",
    readingMinutes: 9,
    cover: europeanFoundersCover,
    featured: true,
    trending: true,
    seo: {
      title: "Why European Founders Move to the UAE — Tax Comparison 2026",
      description:
        "Corporate tax in Germany is 30%, France 25%, Netherlands 25.8%. UAE charges 9% — with key free zone exemptions. Here's why European founders are restructuring.",
    },
    sections: [
      {
        id: "tax-gap",
        heading: "The Tax Gap That's Driving Relocation",
        blocks: [
          { type: "p", text: "Corporate tax in Germany is 30%. In France, it's 25%. In the Netherlands, 25.8%. The UAE charges 9% — and qualifying free zone companies pay 0%. This isn't a loophole. It's by design. Here's what European founders need to know." },
          { type: "p", text: "Something changed in European boardrooms around 2022 and it has accelerated every year since. Founders who once accepted high tax rates as the cost of operating in stable, infrastructure-rich economies started asking a different question: what am I actually getting for this?" },
          { type: "p", text: "The answer, for many, was unsatisfying. Rising compliance costs. Increasing regulatory burden. VAT complexity. And corporate tax rates that, when combined with dividend taxes and social contributions, push effective rates past 40% in countries like Germany." },
          { type: "p", text: "The UAE offered a different model. Not a tax haven in the traditional sense — no secrecy, no offshore anonymity — but a modern, transparent, internationally-recognised jurisdiction with a 9% corporate tax rate, 0% personal income tax, and free zone structures that qualify for full tax exemption on qualifying income." },
          { type: "p", text: "The numbers are difficult to ignore." },
        ],
      },
      {
        id: "country-comparison",
        heading: "Country-by-Country Comparison",
        blocks: [
          { type: "p", text: "Here is the real combined tax picture for a profitable founder operating through a company in each country:" },
          { type: "h3", text: "🇩🇪 Germany" },
          { type: "ul", items: [
            "Corporate income tax: 15% (+ 5.5% solidarity surcharge = 15.83%)",
            "Trade tax (Gewerbesteuer): 14–17% depending on municipality",
            "Combined corporate rate: approximately 30%",
            "Capital gains tax on shares: up to 26.4%",
            "Dividend withholding tax: 25% + solidarity surcharge",
            "Personal income tax: up to 45%",
          ]},
          { type: "h3", text: "🇫🇷 France" },
          { type: "ul", items: [
            "Corporate tax: 25% standard rate (temporarily higher in 2025–2026 with exceptional contribution)",
            "Capital gains: 30% flat tax (PFU) or up to 34.5% combined",
            "Social contributions on dividends: 17.2%",
            "Personal income tax: up to 45%",
          ]},
          { type: "h3", text: "🇬🇧 United Kingdom" },
          { type: "ul", items: [
            "Corporate tax: 25% (for profits over £250,000)",
            "Capital gains tax on business assets: 18–24% (raised in 2024)",
            "Business Asset Disposal Relief: 18% on first £1 million from April 2026",
            "Personal income tax: up to 45%",
          ]},
          { type: "h3", text: "🇳🇱 Netherlands" },
          { type: "ul", items: [
            "Corporate tax: 25.8% (19% on first €200,000)",
            "Dividend withholding tax: 15%",
            "Box 2 tax on substantial shareholdings: 33%",
            "Personal income tax: up to 49.5%",
          ]},
          { type: "h3", text: "🇸🇪 Sweden" },
          { type: "ul", items: [
            "Corporate tax: 20.6%",
            "Dividend tax: 30%",
            "Personal income tax: up to 52%",
          ]},
          { type: "h3", text: "🇦🇪 UAE" },
          { type: "ul", items: [
            "Corporate tax: 9% (effective June 2023)",
            "Free zone qualifying income: 0%",
            "Personal income tax: 0%",
            "Capital gains tax: 0%",
            "Dividend tax: 0%",
            "Wealth tax: none",
          ]},
        ],
      },
      {
        id: "uae-charges",
        heading: "What the UAE Actually Charges",
        blocks: [
          { type: "p", text: "The UAE introduced a 9% corporate tax in June 2023 — and this is frequently misunderstood by both sides of the argument." },
          { type: "h3", text: "What is taxed at 9%" },
          { type: "p", text: "Businesses with taxable income exceeding AED 375,000 (approximately €93,000) operating on the UAE mainland pay 9% on net profits above this threshold." },
          { type: "h3", text: "What is taxed at 0%" },
          { type: "p", text: "Free zone companies that earn \"qualifying income\" — broadly, income from international clients and transactions outside the UAE mainland — continue to pay 0% corporate tax. This covers the majority of consulting, SaaS, agency, trading, and professional service businesses run by European founders." },
          { type: "h3", text: "What is never taxed" },
          { type: "p", text: "Personal income. Salaries, dividends received by individuals, capital gains on the sale of personal assets — none of these attract tax in the UAE. At all." },
          { type: "h3", text: "The practical result" },
          { type: "p", text: "A European founder running a consulting business through an IFZA or SHAMS free zone company, billing clients in Europe, pays 0% corporate tax on that income. They pay themselves a salary or dividend with 0% personal income tax. Compared to an effective rate of 40–55% in Germany or France, this is transformative." },
        ],
      },
      {
        id: "real-money",
        heading: "What This Means in Real Money",
        blocks: [
          { type: "p", text: "To make this concrete, consider a founder generating €300,000 in annual profit from a consulting or digital services business." },
          { type: "h3", text: "In Germany" },
          { type: "ul", items: [
            "Corporate tax (~30%): €90,000",
            "Remaining profit after tax: €210,000",
            "Dividend tax (~26.4%): ~€55,000",
            "Net in founder's pocket: approximately €155,000",
            "Effective rate on original profit: ~48%",
          ]},
          { type: "h3", text: "In the UAE (free zone)" },
          { type: "ul", items: [
            "Corporate tax (qualifying income): €0",
            "Dividend / salary tax: €0",
            "Net in founder's pocket: approximately €280,000–290,000 (after setup and compliance costs)",
            "Effective rate on original profit: approximately 3–5% (setup and accounting fees)",
          ]},
          { type: "quote", text: "The difference on €300,000 of profit: approximately €125,000 per year. Over five years: approximately €625,000." },
          { type: "p", text: "That figure — not lifestyle, not sunshine, not airport connectivity — is why the conversation has changed." },
        ],
      },
      {
        id: "legal-framework",
        heading: "The Legal Framework: Is This Actually Legal?",
        blocks: [
          { type: "p", text: "Yes. With important caveats that every founder must understand." },
          { type: "p", text: "UAE company formation is 100% legal for EU and UK nationals. There is no EU regulation that prevents a European citizen from owning and operating a UAE company. Thousands of European entrepreneurs do exactly this." },
          { type: "p", text: "However, your home country's tax rules still apply to you personally." },
          { type: "p", text: "The key principle is tax residency. If you remain a tax resident of Germany, France, or the UK, your home country may still tax your worldwide income — including dividends and salary you draw from your UAE company. The UAE structure only delivers full tax efficiency when combined with a genuine change of personal tax residency." },
          { type: "p", text: "This means:" },
          { type: "ul", items: [
            "Spending sufficient time outside your home country (rules vary: Germany requires breaking all ties, UK requires fewer than 16–46 days depending on ties)",
            "Establishing genuine UAE residency (which your UAE company investor visa provides)",
            "Ensuring your UAE company has real economic substance (management, operations, decision-making in the UAE)",
          ]},
          { type: "p", text: "Controlled Foreign Corporation (CFC) rules in Germany, France, and the Netherlands can attribute profits of a foreign company back to a resident shareholder if the company is \"passive\" and lacks substance. Free zone companies with real operations and active business income generally fall outside these rules — but professional advice from a tax lawyer in your home country is non-negotiable before restructuring." },
          { type: "p", text: "The conclusion is not \"avoid taxes illegally.\" It is: \"legally restructure your affairs, change your tax residency, and operate in a jurisdiction that taxes less.\" Millions of people do this every year. The UAE is simply one of the most practical destinations for founders." },
        ],
      },
      {
        id: "who-benefits",
        heading: "Who Benefits Most From a UAE Structure",
        blocks: [
          { type: "p", text: "Not every European founder benefits equally. The structure works best for:" },
          { type: "h3", text: "Digital and remote businesses" },
          { type: "p", text: "Consultants, agencies, SaaS founders, coaches, and developers whose clients are international and whose work requires no physical presence in a specific European country. If your business travels with your laptop, a UAE structure makes strong economic sense." },
          { type: "h3", text: "High-margin service businesses" },
          { type: "p", text: "The tax saving scales with profit. A founder earning €100,000 saves less than one earning €500,000. The fixed costs of a UAE setup (license, visa, accounting) are approximately €8,000–15,000 per year. At low profit levels, the saving may not justify the overhead." },
          { type: "h3", text: "Founders willing to relocate" },
          { type: "p", text: "The full benefit requires genuine personal tax residency change. Founders who want to remain living in Germany or France full-time while only holding a UAE company will likely remain taxable in their home country. The UAE residency visa is straightforward to obtain and Dubai is increasingly popular as a genuine lifestyle relocation for European families." },
          { type: "h3", text: "Freelancers and solo founders" },
          { type: "p", text: "SHAMS (Sharjah Media City) and UAQ Free Trade Zone offer UAE company licenses from AED 5,750 per year — approximately €1,400. For a freelancer earning €80,000–150,000, this pays back within weeks." },
        ],
      },
      {
        id: "setup",
        heading: "What You Need to Set Up",
        blocks: [
          { type: "p", text: "Setting up a UAE company as a European founder involves:" },
          { type: "h3", text: "1. Choose your free zone" },
          { type: "p", text: "IFZA and Meydan for Dubai, SHAMS or RAKEZ for cost efficiency, ADGM for financial services. Each has different pricing, visa quotas, and banking relationships." },
          { type: "h3", text: "2. Submit your application" },
          { type: "p", text: "Passport copy, application form, business activity description. Most free zones process remotely — no UAE visit required for the license itself." },
          { type: "h3", text: "3. Obtain your investor visa and Emirates ID" },
          { type: "p", text: "This establishes your UAE residency, which is the foundation of your tax position. Processing takes 2–4 weeks and requires a medical test and biometrics." },
          { type: "h3", text: "4. Open a corporate bank account" },
          { type: "p", text: "The most complex step. Banks require source of funds documentation, business plan, and client references. A good setup agent significantly increases approval rates." },
          { type: "h3", text: "5. Establish genuine substance" },
          { type: "p", text: "Keep board minutes, maintain UAE operations records, use a UAE phone number and address. Substance is the legal foundation that protects your structure under home-country CFC rules." },
          { type: "h3", text: "6. Get home-country tax advice" },
          { type: "p", text: "Before you take any distributions from your UAE company, speak to a tax advisor in your home country about exit taxes, CFC implications, and how to properly end your home-country tax residency." },
          { type: "quote", text: "Total all-in cost for year one: AED 20,000–45,000 (approximately €5,000–11,000) depending on free zone and visa requirements." },
        ],
      },
      {
        id: "faq",
        heading: "Frequently Asked Questions",
        blocks: [
          { type: "h3", text: "Can I keep my German/French/UK passport and still use a UAE company?" },
          { type: "p", text: "Yes. UAE company formation has no nationality restrictions. You keep your citizenship and passport. Only your tax residency changes." },
          { type: "h3", text: "Do I lose my EU healthcare or social security by moving?" },
          { type: "p", text: "You may lose access to public healthcare in your home country if you de-register. Many founders arrange private international health insurance. EU social security contributions can be paused or ended when you cease to be a tax resident." },
          { type: "h3", text: "What happens if I visit Germany for a few weeks per year?" },
          { type: "p", text: "Most countries have \"day count\" rules. Germany requires breaking all significant ties. The UK uses a statutory residency test with specific day thresholds. Your home-country tax advisor can model your specific situation." },
          { type: "h3", text: "Is the UAE stable long-term?" },
          { type: "p", text: "The UAE has maintained political and economic stability for over 50 years. It has signed 130+ double tax treaties, is FATF-compliant, and is on no international blacklists. The 9% corporate tax introduction in 2023 actually increased international credibility." },
          { type: "h3", text: "Does Soft Bridge handle the full process?" },
          { type: "p", text: "Yes. From free zone selection and license application to banking preparation, investor visa, and ongoing compliance — Soft Bridge manages the complete setup and stays with clients long-term. Book a free consultation to discuss your specific situation." },
        ],
      },
    ],
  },
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
    cover: dubaiFreeZonesCover,
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
    title: "Can You Open a UAE Company Remotely? (2026 Complete Guide)",
    excerpt:
      "Yes — you can open a UAE company without visiting Dubai. Here's exactly how the remote process works in 2026: free zones, documents, banking, visa, and what actually requires a trip.",
    category: "Remote Setup",
    tags: ["Remote", "Free Zones", "Banking", "Visa"],
    author: { name: "Soft Bridge Editorial", role: "UAE Formation Desk" },
    publishedAt: "2026-04-02",
    readingMinutes: 10,
    cover: uaeRemoteCompanyCover,
    seo: {
      title: "Open a UAE Company Remotely — 2026 Complete Guide",
      description:
        "Yes — you can open a UAE company without visiting Dubai. Here's exactly how the remote process works in 2026: free zones, documents, banking, visa, and what actually requires a trip.",
    },
    sections: [
      {
        id: "short-answer",
        heading: "The Short Answer",
        blocks: [
          { type: "p", text: "Yes — but the answer has important layers. The license itself is 100% remote. The residency visa requires one trip. Banking depends heavily on which bank and how you prepare. Here's the honest, complete picture." },
          { type: "p", text: "You can incorporate a UAE free zone company without setting foot in the country. The license application, document submission, trade name reservation, and license issuance are all handled digitally. For most free zones, the entire process takes 3–10 working days from your laptop." },
          { type: "p", text: "The residency visa — which gives you UAE residency and Emirates ID — requires one visit to the UAE for a medical test and biometrics. This is a non-negotiable in-person step. Most founders combine it with a short trip to Dubai to meet their bank." },
          { type: "p", text: "Banking is where most remote setups stall. The account application is submitted remotely, but Tier 1 banks often require a video call or in-person interview before approving. Planning for this upfront saves weeks of delay." },
        ],
      },
      {
        id: "which-free-zones",
        heading: "Which Free Zones Allow Full Remote Incorporation?",
        blocks: [
          { type: "p", text: "Not all free zones offer the same remote experience. Here is the current picture for 2026:" },
          { type: "h3", text: "Fully Remote (no UAE visit for license)" },
          { type: "ul", items: [
            "IFZA (International Free Zone Authority) — Dubai",
            "Meydan Free Zone — Dubai",
            "SHAMS (Sharjah Media City) — Sharjah",
            "RAKEZ (Ras Al Khaimah Economic Zone) — RAK",
            "Ajman Free Zone — Ajman",
            "UAQ Free Trade Zone — Umm Al Quwain",
            "Creative City — Fujairah",
          ]},
          { type: "h3", text: "Partially Remote (some steps require presence or notarisation)" },
          { type: "ul", items: [
            "DMCC — remote application but in-person onboarding preferred",
            "DIFC — regulated entities require in-person compliance steps",
            "ADGM — financial services require direct engagement",
          ]},
          { type: "h3", text: "Mainland (DED) — Not Recommended for Remote" },
          { type: "p", text: "UAE mainland company formation typically requires physical presence for notarisation, signing, and authority submissions. Possible through a power of attorney arrangement, but slower and more complex." },
          { type: "p", text: "For European founders, IFZA, SHAMS, and RAKEZ are the three most commonly used fully remote options, each with different pricing and banking profiles." },
        ],
      },
      {
        id: "process-step-by-step",
        heading: "The Remote Process: Step by Step",
        blocks: [
          { type: "h3", text: "Step 1 — Choose Your Free Zone and Activity (Day 1–2)" },
          { type: "p", text: "Your business activity must match an approved list in your chosen free zone. Most consulting, digital, trading, and professional service activities are available across all major zones." },
          { type: "p", text: "This decision matters beyond just price. Your chosen free zone affects:" },
          { type: "ul", items: [
            "Which banks will open accounts for you",
            "Your visa quota (how many employees you can sponsor)",
            "Whether you can trade with UAE mainland clients directly",
            "Annual renewal costs and compliance requirements",
          ]},
          { type: "h3", text: "Step 2 — Submit Your Application and Documents (Day 2–4)" },
          { type: "p", text: "Documents required for remote incorporation:" },
          { type: "ul", items: [
            "Passport copy (colour, full pages including blank pages for some zones)",
            "Passport-sized photograph (white background)",
            "Completed application form (provided by free zone or your agent)",
            "Business activity description",
            "Proposed company name (3 options recommended)",
            "Shareholder details (if multiple shareholders)",
          ]},
          { type: "p", text: "Some free zones require a notarised passport copy. Your agent handles the notarisation guidance based on your country of residence." },
          { type: "p", text: "No share capital deposit is required for most free zones. No physical office visit. No in-country witness." },
          { type: "h3", text: "Step 3 — Trade Name Approval and Initial Approval (Day 3–5)" },
          { type: "p", text: "The free zone authority reviews your trade name and activity. Common rejection reasons:" },
          { type: "ul", items: [
            "Name too similar to existing registered companies",
            "Activity description too vague or too broad",
            "Restricted activities requiring additional approvals (financial services, healthcare, legal)",
          ]},
          { type: "p", text: "Once initial approval is granted, the license fee invoice is issued." },
          { type: "h3", text: "Step 4 — License Issuance (Day 5–10)" },
          { type: "p", text: "Upon payment, your trade license and Memorandum of Association are issued digitally. You receive:" },
          { type: "ul", items: [
            "Trade license (PDF, legally valid)",
            "Certificate of incorporation",
            "Memorandum and Articles of Association",
            "Shareholder certificate",
          ]},
          { type: "p", text: "Your company is now legally incorporated and operational. You can open bank accounts, sign contracts, and issue invoices under the company name." },
          { type: "h3", text: "Step 5 — Establishment Card (Day 10–14)" },
          { type: "p", text: "The establishment card registers your company with the UAE immigration system and enables you to apply for residency visas. This step is completed by your free zone authority on your behalf. No action required from you — it typically takes 3–5 working days after license issuance." },
          { type: "h3", text: "Step 6 — Residency Visa Application (Remote until biometrics)" },
          { type: "p", text: "This is where the process shifts from fully remote to requiring one in-country visit." },
          { type: "p", text: "Remote steps (can be done from home):" },
          { type: "ul", items: [
            "Entry permit application submitted through e-Channels",
            "Entry permit issued (allows you to enter UAE for status change)",
            "Medical test appointment booked",
          ]},
          { type: "p", text: "In-person steps (requires UAE visit, typically 3–5 days):" },
          { type: "ul", items: [
            "Medical fitness test (blood test and chest X-ray at approved clinic)",
            "Biometric fingerprinting (at ICA or typing centre)",
            "Emirates ID card collection (or postal delivery — 7–14 days)",
            "Visa stamping in passport (same-day or next-day at most centres)",
          ]},
          { type: "p", text: "Most founders fly to Dubai, complete these steps across 2–3 days, and use the remaining time to visit their bank in person. Combining the visa trip with a banking visit is strongly recommended." },
          { type: "h3", text: "Step 7 — Corporate Bank Account (2–8 weeks)" },
          { type: "p", text: "The bank account is the most variable part of the remote setup. The application itself is submitted online or via your relationship manager. But approval involves:" },
          { type: "ul", items: [
            "Document review (KYC: passport, visa, license, source of funds, business plan)",
            "Compliance screening",
            "Sometimes a video call with the bank's compliance team",
            "Sometimes an in-person interview at a UAE branch",
          ]},
          { type: "p", text: "Banks with strong remote approval track records (for qualifying clients):" },
          { type: "ul", items: [
            "Mashreq Neo (fully digital, no minimum balance for eligible accounts)",
            "Emirates NBD Business (strong remote onboarding for established FZs)",
            "RAKBank Business (good for RAKEZ and smaller free zones)",
            "ADCB (strong for Abu Dhabi free zone companies)",
          ]},
          { type: "p", text: "Tier 1 banks that typically require in-person meeting:" },
          { type: "ul", items: [
            "First Abu Dhabi Bank (FAB)",
            "Dubai Islamic Bank",
            "ENBD for high-value accounts",
          ]},
          { type: "p", text: "A well-prepared application — clean source of funds documentation, clear business model, professional business plan — dramatically increases remote approval rates. This is where working with an experienced UAE setup agent pays for itself." },
        ],
      },
      {
        id: "bank-documents",
        heading: "What Documents Do Banks Actually Want?",
        blocks: [
          { type: "p", text: "This is the question most guides avoid answering. Here is what Tier 1 UAE banks ask for in 2026:" },
          { type: "h3", text: "Company documents" },
          { type: "ul", items: [
            "Trade license",
            "Certificate of incorporation",
            "MOA and AOA",
            "Establishment card",
            "Tenancy contract or virtual office agreement",
          ]},
          { type: "h3", text: "Personal documents" },
          { type: "ul", items: [
            "Passport (all pages)",
            "UAE residence visa and Emirates ID",
            "6 months personal bank statements from home country",
            "CV or professional profile",
          ]},
          { type: "h3", text: "Business documents" },
          { type: "ul", items: [
            "Business plan (1–3 pages: what the company does, who the clients are, projected revenue, how funds move)",
            "Source of funds declaration (where your initial capital comes from)",
            "Sample contracts or client letters (if available)",
            "Company website or LinkedIn",
          ]},
          { type: "p", text: "The source of funds document is the most commonly underestimated requirement. Banks want to understand how you earned the money being deposited. Employment history, previous business sale, inheritance, investment returns — each has a different documentation requirement." },
        ],
      },
      {
        id: "nationalities",
        heading: "Nationalities and Remote Setup: What You Need to Know",
        blocks: [
          { type: "p", text: "The UAE free zone application process is open to most nationalities. However, banking compliance teams apply additional scrutiny to certain passport holders." },
          { type: "h3", text: "European passports (Germany, UK, France, Netherlands, etc.)" },
          { type: "p", text: "Generally straightforward. Good banking access, lower compliance friction, strong remote approval rates at most banks." },
          { type: "h3", text: "US passport holders" },
          { type: "p", text: "More complex due to FATCA reporting requirements. Some UAE banks decline US persons entirely. Specialist guidance required." },
          { type: "h3", text: "Other nationalities" },
          { type: "p", text: "Banking access and KYC requirements vary. Your setup agent should advise on bank selection based on your specific passport." },
        ],
      },
      {
        id: "timeline",
        heading: "How Long Does the Full Remote Process Take?",
        blocks: [
          { type: "p", text: "Here is a realistic timeline from decision to fully operational:" },
          { type: "ul", items: [
            "Free zone and activity selection — Day 1–2",
            "Document preparation — Day 2–4",
            "License application submitted — Day 3–5",
            "License issued — Day 5–12",
            "Establishment card — Day 12–18",
            "Entry permit for visa — Day 14–20",
            "UAE trip: medical + biometrics — Day 20–30",
            "Emirates ID received — Day 28–40",
            "Bank application submitted — Day 25–35",
            "Bank account approved — Day 40–70",
          ]},
          { type: "quote", text: "Realistic all-in timeline: 6–10 weeks from decision to fully operational with bank account." },
          { type: "p", text: "Companies that try to rush banking — applying before the visa is confirmed, submitting incomplete KYC, selecting the wrong bank for their profile — often end up waiting 3–4 months. Preparation front-loads the timeline and shortens it significantly." },
        ],
      },
      {
        id: "costs",
        heading: "What Does Remote Setup Actually Cost?",
        blocks: [
          { type: "p", text: "All-in costs for a remote UAE free zone setup in 2026:" },
          { type: "ul", items: [
            "License and establishment card: AED 9,500–18,000 depending on free zone (SHAMS from AED 5,750, IFZA from AED 12,900, Meydan from AED 9,500)",
            "Residency visa: AED 3,500–5,500 (medical, Emirates ID, visa stamping fees)",
            "Virtual office (if required): AED 1,500–4,000 per year",
            "Setup agent fee (if using one): AED 1,500–4,000 depending on scope",
            "UAE trip costs: Flights + 2–3 nights hotel, varies by origin",
            "Bank minimum balance: AED 0 (Mashreq Neo) to AED 25,000 (some Tier 1 banks) — this is held capital, not a fee",
          ]},
          { type: "quote", text: "Total year-one cost: approximately AED 20,000–40,000 (€5,000–10,000) for a single-shareholder consulting or digital business." },
        ],
      },
      {
        id: "mistakes",
        heading: "The 3 Most Common Remote Setup Mistakes",
        blocks: [
          { type: "h3", text: "Mistake 1 — Choosing the cheapest free zone without checking banking compatibility" },
          { type: "p", text: "SHAMS and UAQ are excellent value, but some banks apply more scrutiny to these zones than to IFZA or Meydan. If Tier 1 banking is important to your business, factor this into your zone selection, not just the license price." },
          { type: "h3", text: "Mistake 2 — Applying for a bank account before the Emirates ID is ready" },
          { type: "p", text: "Most banks will not open an account until you have a valid UAE residence visa and Emirates ID. Submitting early wastes time and creates a poor first impression with compliance teams." },
          { type: "h3", text: "Mistake 3 — Submitting a weak or generic business plan to the bank" },
          { type: "p", text: "Banks see thousands of applications. A one-paragraph description of \"consulting services\" with no client information, no projected revenue, and no source of funds explanation will be deprioritised. A clear, specific, professionally written business plan significantly improves approval speed and rate." },
        ],
      },
      {
        id: "faq",
        heading: "Frequently Asked Questions",
        blocks: [
          { type: "h3", text: "Do I need to visit the UAE at all?" },
          { type: "p", text: "For the license: no. For the residency visa: yes, one visit of 2–3 days is required for medical test and biometrics. You can choose not to apply for a residency visa, but then you will not have UAE tax residency, which limits the tax benefits of your company." },
          { type: "h3", text: "Can I incorporate without an agent?" },
          { type: "p", text: "Yes. Most free zones have online portals. However, agents typically have direct relationships with free zone case managers, faster processing, and banking introductions that save significant time on the hardest part of the process — the bank account." },
          { type: "h3", text: "Which free zone is best for a European digital business?" },
          { type: "p", text: "IFZA is the most popular for European founders in 2026. SHAMS is the most affordable. RAKEZ offers the best value combining free zone and mainland flexibility. The right answer depends on your activity, banking needs, and budget." },
          { type: "h3", text: "Can I have employees in Europe and still use a UAE company?" },
          { type: "p", text: "Yes, but this creates PE (permanent establishment) risk in the European country where your employees are based. Get local tax advice before hiring European employees through a UAE entity." },
          { type: "h3", text: "What happens if my bank application is rejected?" },
          { type: "p", text: "Apply to a different bank with improved documentation. UAE bank rejection is not permanent and does not appear on any register. Working with an experienced setup agent who has existing bank relationships significantly reduces rejection risk." },
          { type: "h3", text: "Does Soft Bridge handle the full remote process?" },
          { type: "p", text: "Yes. Soft Bridge manages everything from free zone selection through banking preparation, visa application, and ongoing compliance — with a dedicated relationship manager and secure client portal to track every stage. Book a free consultation to discuss your specific situation." },
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

const ARTICLE_SLUGS: Record<string, string> = {
  "best-free-zones-in-dubai-for-startups": "best-free-zones-dubai-startups-2026",
  "ifza-vs-meydan": "ifza-vs-meydan-dubai-free-zone",
  "uae-remote-company-setup": "open-uae-company-remotely-2026",
  "uae-corporate-bank-account": "uae-corporate-bank-account-guide",
  "mainland-vs-free-zone": "uae-mainland-vs-free-zone",
  "best-uae-setup-for-ecommerce": "best-uae-setup-ecommerce",
  "banking-compliance-uae": "uae-banking-compliance-guide",
};

const ARTICLE_COVERS: Record<string, string> = {
  "best-free-zones-dubai-startups-2026": dubaiFreeZonesCover,
  "ifza-vs-meydan-dubai-free-zone": ifzaRecognitionCover,
  "open-uae-company-remotely-2026": uaeRemoteCompanyCover,
  "uae-corporate-bank-account-guide": bankingDocumentsCover,
  "uae-mainland-vs-free-zone": abuDhabiCover,
  "best-uae-setup-ecommerce": dubaiCover,
  "uae-business-setup-costs-2026": bankingDocumentsCover,
  "uae-visa-process-explained": sharjahCover,
  "uae-banking-compliance-guide": bankingDocumentsCover,
  "best-free-zones-for-ai-tech-startups": rakCover,
};

export const ARTICLES: Article[] = BASE_ARTICLES.map((article) => {
  const slug = ARTICLE_SLUGS[article.slug] ?? article.slug;
  return {
    ...article,
    slug,
    cover: ARTICLE_COVERS[slug] ?? article.cover,
    author: { name: "Soft Bridge Insights", role: article.author.role },
  };
});

const LEGACY_SLUGS = Object.fromEntries(
  Object.entries(ARTICLE_SLUGS).map(([oldSlug, newSlug]) => [newSlug, oldSlug]),
);

export const FEATURED_ARTICLES = ARTICLES.filter((a) => a.featured);
export const TRENDING_ARTICLES = ARTICLES.filter((a) => a.trending);

export function getArticle(slug: string): Article | undefined {
  return (
    ARTICLES.find((a) => a.slug === slug) ??
    ARTICLES.find((a) => LEGACY_SLUGS[a.slug] === slug)
  );
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
