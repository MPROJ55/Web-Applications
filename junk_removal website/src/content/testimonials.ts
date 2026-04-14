import type { TestimonialDto } from "@/lib/api";

export const FALLBACK_TESTIMONIALS: TestimonialDto[] = [
  {
    id: 1,
    customer_name: "Maria L.",
    review:
      "Called from Fairfax—they quoted upfront and cleared my garage the same afternoon. Professional, insured crew.",
    rating: 5,
    location: "Fairfax, VA",
    is_featured: true,
  },
  {
    id: 2,
    customer_name: "James P.",
    review:
      "Heavy sectional down a narrow staircase in Loudoun. No dings, no drama. Exactly what I needed.",
    rating: 5,
    location: "Loudoun County",
    is_featured: true,
  },
  {
    id: 3,
    customer_name: "Alicia R.",
    review:
      "Rental turnover in NOVA—RM Haul & Clean had the unit cleared fast. I’ll use them again.",
    rating: 5,
    location: "Property manager",
    is_featured: true,
  },
];
