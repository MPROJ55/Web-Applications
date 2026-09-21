"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { interpolateLoadPricing, PRICING } from "@/lib/pricing";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function PricingEstimator() {
  const [loadSize, setLoadSize] = useState(35); // 0-100 “truck fill”
  const [stairs, setStairs] = useState(20); // 0 heavy stairs
  const [distance, setDistance] = useState(15); // 0 far carry

  const estimate = useMemo(() => {
    const { low: baseLow, high: baseHigh } = interpolateLoadPricing(loadSize);

    const labor = 1 + (stairs / 100) * 0.22 + (distance / 100) * 0.18;
    let low = baseLow * labor;
    let high = baseHigh * labor;

    const maxHigh = PRICING.fullLoadFrom * 1.35 * labor;
    low = clamp(low, PRICING.singleItemFrom, maxHigh);
    high = clamp(high, low, maxHigh);

    return {
      low: Math.round(low),
      high: Math.round(high),
    };
  }, [loadSize, stairs, distance]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Ballpark estimator</h2>
          <p className="mt-1 text-sm text-slate-600">
            This is not a final quote—pricing depends on volume, weight, access, and material type.
          </p>
        </div>
        <div className="rounded-xl bg-amber-500/15 px-4 py-3 text-right">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-700">Estimated range</div>
          <div className="text-2xl font-extrabold text-slate-900">
            ${estimate.low}–${estimate.high}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <label className="block">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
            <span>How much are we hauling?</span>
            <span className="text-slate-600">{loadSize < 20 ? "Small" : loadSize < 65 ? "Medium" : "Large / full load"}</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={loadSize}
            onChange={(e) => setLoadSize(Number(e.target.value))}
            className="mt-2 w-full accent-amber-500"
          />
        </label>

        <label className="block">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
            <span>Stairs / tight access</span>
            <span className="text-slate-600">{stairs < 25 ? "Easy" : stairs < 70 ? "Moderate" : "Heavy"}</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={stairs}
            onChange={(e) => setStairs(Number(e.target.value))}
            className="mt-2 w-full accent-amber-500"
          />
        </label>

        <label className="block">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
            <span>Distance to the truck</span>
            <span className="text-slate-600">{distance < 25 ? "Close" : distance < 70 ? "Average" : "Long carry"}</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="mt-2 w-full accent-amber-500"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          Exact Fairfax / Loudoun pricing: text photos + your address. We reply fast.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-900"
        >
          Get Free Quote
        </Link>
      </div>
    </div>
  );
}
