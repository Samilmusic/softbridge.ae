export const SITE = {
  name: "Soft Bridge FZE LLC",
  tagline: "Bridge to Your Success",
  phone: "+971 50 242 9035",
  phoneRaw: "971502429035",
  email: "info@softbridge.ae",
  website: "https://softbridge.ae",
  address: "26, Amber Gem Tower, Ajman, UAE",
  hours: "Mon–Fri: 9:00am–7:00pm",
  registrationNumber: "262524808888",
};

export const WA_MESSAGE = encodeURIComponent(
  "Hello Soft Bridge, I'd like to book a consultation about setting up my business in the UAE."
);
export const WA_LINK = `https://wa.me/${SITE.phoneRaw}?text=${WA_MESSAGE}`;
