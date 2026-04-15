export type ServiceItem = {
  slug: string;
  title: string;
  summary: string;
  bullets?: string[];
};

export const SERVICES: ServiceItem[] = [
  {
    slug: "single-item",
    title: "Single-item pickup",
    summary:
      "One couch, mattress, or appliance—same-day in NOVA when we’re open. Fairfax & Loudoun County.",
    bullets: ["$70–$80 most single items", "We do the lifting"],
  },
  {
    slug: "furniture",
    title: "Furniture removal",
    summary: "Couches, tables, dressers, and office furniture—loaded carefully to protect your walls and floors.",
  },
  {
    slug: "appliances",
    title: "Appliance removal",
    summary: "Washers, dryers, refrigerators, and more. We handle the heavy lifting so you do not have to.",
  },
  {
    slug: "garage",
    title: "Garage cleanouts",
    summary: "Reclaim your garage with sorted loading—donation-friendly items separated when possible.",
  },
  {
    slug: "yard-waste",
    title: "Yard waste removal",
    summary: "Branches, bags, and storm debris. Great for seasonal cleanups and curb pile pickup.",
  },
  {
    slug: "full-property",
    title: "Full property cleanouts",
    summary: "Estates, downsizing, and rental turnovers with clear communication from walkthrough to haul-away.",
    bullets: ["Full loads often $500–$1,000 depending on volume"],
  },
  {
    slug: "demo-debris",
    title: "Light demolition debris",
    summary: "Small remodel leftovers and bagged debris (non-hazardous). Tell us what you have—we will confirm before we arrive.",
  },
  {
    slug: "rental",
    title: "Apartment & rental cleanouts",
    summary: "Fast turnaround for landlords and property managers between tenants.",
  },
];
