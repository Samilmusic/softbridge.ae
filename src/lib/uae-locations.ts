export type Jurisdiction = {
  name: string;
  type: "Mainland" | "Free Zone";
  bestFor: string;
};

export type EmirateGroup = {
  emirate: string;
  tagline: string;
  jurisdictions: Jurisdiction[];
};

export const UAE_LOCATIONS: EmirateGroup[] = [
  {
    emirate: "Dubai",
    tagline: "Global hub for trade, tech, and finance",
    jurisdictions: [
      { name: "Dubai Mainland", type: "Mainland", bestFor: "UAE market access" },
      { name: "IFZA", type: "Free Zone", bestFor: "Cost-efficient setup" },
      { name: "Meydan Free Zone", type: "Free Zone", bestFor: "Premium address" },
      { name: "DMCC", type: "Free Zone", bestFor: "Trading & commodities" },
      { name: "Dubai South", type: "Free Zone", bestFor: "Logistics & aviation" },
      { name: "DAFZA", type: "Free Zone", bestFor: "Airport-adjacent trade" },
      { name: "JAFZA", type: "Free Zone", bestFor: "Industrial & shipping" },
      { name: "Dubai Silicon Oasis", type: "Free Zone", bestFor: "Tech & R&D" },
      { name: "Dubai Internet City", type: "Free Zone", bestFor: "IT & software" },
      { name: "Dubai Media City", type: "Free Zone", bestFor: "Media & creative" },
    ],
  },
  {
    emirate: "Abu Dhabi",
    tagline: "Capital-grade infrastructure and finance",
    jurisdictions: [
      { name: "Abu Dhabi Mainland", type: "Mainland", bestFor: "Government contracts" },
      { name: "ADGM", type: "Free Zone", bestFor: "Finance & fintech" },
      { name: "KEZAD", type: "Free Zone", bestFor: "Industrial & manufacturing" },
      { name: "Masdar City", type: "Free Zone", bestFor: "Cleantech & sustainability" },
      { name: "twofour54", type: "Free Zone", bestFor: "Media & content" },
    ],
  },
  {
    emirate: "Sharjah",
    tagline: "Balanced cost and proximity to Dubai",
    jurisdictions: [
      { name: "Sharjah Mainland", type: "Mainland", bestFor: "Local trade" },
      { name: "SHAMS", type: "Free Zone", bestFor: "Media & freelancers" },
      { name: "SAIF Zone", type: "Free Zone", bestFor: "Airport logistics" },
      { name: "Hamriyah Free Zone", type: "Free Zone", bestFor: "Industrial & port access" },
    ],
  },
  {
    emirate: "Ajman",
    tagline: "Affordable entry into the UAE market",
    jurisdictions: [
      { name: "Ajman Mainland", type: "Mainland", bestFor: "Local services" },
      { name: "Ajman Free Zone", type: "Free Zone", bestFor: "Budget-friendly setup" },
    ],
  },
  {
    emirate: "Ras Al Khaimah",
    tagline: "Industrial scale with competitive pricing",
    jurisdictions: [
      { name: "RAK Mainland", type: "Mainland", bestFor: "Local operations" },
      { name: "RAKEZ", type: "Free Zone", bestFor: "Manufacturing & SMEs" },
    ],
  },
  {
    emirate: "Fujairah",
    tagline: "East coast access and creative licensing",
    jurisdictions: [
      { name: "Fujairah Mainland", type: "Mainland", bestFor: "Local trade" },
      { name: "Fujairah Free Zone", type: "Free Zone", bestFor: "Shipping & trading" },
      { name: "Creative City", type: "Free Zone", bestFor: "Media & consultancy" },
    ],
  },
  {
    emirate: "Umm Al Quwain",
    tagline: "Quiet, cost-effective jurisdictions",
    jurisdictions: [
      { name: "UAQ Mainland", type: "Mainland", bestFor: "Local business" },
      { name: "UAQ Free Trade Zone", type: "Free Zone", bestFor: "Low-cost trading" },
    ],
  },
];
