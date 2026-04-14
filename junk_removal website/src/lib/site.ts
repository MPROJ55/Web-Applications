export const SITE = {
  name: "RM Haul & Clean",
  tagline: "Same-day junk removal in Northern Virginia.",
  phoneDisplay: "(703) 831-7224",
  phoneTel: "+17038317224",
  email: "info@rmhaulclean.com",
  hours: "Mon–Sat 7am–7pm · Sun by appointment",
  /** One line for nav / SEO snippets */
  serviceAreaLine: "Northern Virginia · Fairfax · Loudoun County & nearby",
  /** Footer / schema */
  region: "Northern Virginia",
  cities: ["Fairfax", "Loudoun County", "Arlington", "Alexandria", "Prince William County"] as const,
  trustSignals: ["Fully insured", "Locally owned", "5-star service"] as const,
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
  },
} as const;

export const SEO_KEYWORDS = [
  "junk removal Northern Virginia",
  "junk removal Fairfax",
  "junk removal Loudoun County",
  "same day junk removal NOVA",
  "furniture removal Fairfax",
  "haul away Loudoun County",
] as const;
