export type PricingTier = { load: number; low: number; high: number };

export const PRICING_TIERS: PricingTier[] = [
  { load: 0, low: 119, high: 179 },
  { load: 12, low: 199, high: 269 },
  { load: 25, low: 279, high: 359 },
  { load: 50, low: 399, high: 499 },
  { load: 75, low: 549, high: 649 },
  { load: 100, low: 699, high: 899 },
];

export const PRICING = {
  singleItemFrom: 119,
  fullLoadFrom: 699,
  singleItemDisplay: "$119",
  fullLoadDisplay: "$699",
  priceRangeSchema: "$119–$699",
} as const;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Interpolate base low/high estimate from truck-fill percentage (0–100). */
export function interpolateLoadPricing(loadSize: number): { low: number; high: number } {
  const tiers = PRICING_TIERS;
  const t = clamp(loadSize, 0, 100);

  let lower = tiers[0];
  let upper = tiers[tiers.length - 1];

  for (let i = 0; i < tiers.length - 1; i++) {
    if (t >= tiers[i].load && t <= tiers[i + 1].load) {
      lower = tiers[i];
      upper = tiers[i + 1];
      break;
    }
  }

  const span = upper.load - lower.load || 1;
  const ratio = (t - lower.load) / span;

  return {
    low: lower.low + ratio * (upper.low - lower.low),
    high: lower.high + ratio * (upper.high - lower.high),
  };
}
