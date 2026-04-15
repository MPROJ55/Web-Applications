import type { Metadata } from "next";
import Link from "next/link";

import { CTASection } from "@/components/CTASection";
import { PricingCard } from "@/components/PricingCard";
import { PricingEstimator } from "@/components/PricingEstimator";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Junk Removal Pricing | Northern Virginia",
  description:
    "Upfront junk removal pricing in Fairfax and Loudoun County: single items $70–$80, full loads $500–$1,000. Call for same-day pickup.",
};

export default function PricingPage() {
  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="text-sm font-bold text-amber-800">Pricing</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Upfront prices. No surprises.</h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Final cost depends on volume, stairs, and how far we carry items. Text photos or call{" "}
            <a className="font-bold text-slate-900" href={`tel:${SITE.phoneTel}`}>
              {SITE.phoneDisplay}
            </a>{" "}
            for a fast Fairfax / Loudoun quote.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <PricingCard
            title="Single item pickup"
            price="$70–$80"
            description="One mattress, couch, or appliance—we load it and haul it away."
            bullets={["Fairfax & Loudoun County", "Price locked before we load"]}
          />
          <PricingCard
            title="Full load"
            price="$500–$1,000"
            description="Big cleanouts and full trucks in Northern Virginia."
            bullets={["Priced by space + labor", "You approve before we start"]}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
          <p className="font-bold">Heads up</p>
          <p className="mt-1 leading-relaxed">
            No hazardous waste. We’ll confirm disposal and access before we haul.
          </p>
        </div>

        <div className="mt-10">
          <PricingEstimator />
        </div>

        <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-lg font-bold text-slate-900">Exact quote in minutes</div>
            <div className="mt-1 text-sm text-slate-600">Send photos + your NOVA address.</div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-900"
          >
            Get Free Quote
          </Link>
        </div>
      </section>

      <CTASection
        title="Questions? Call now."
        subtitle="Same-day junk removal in Northern Virginia when available. Fully insured, locally owned."
      />
    </div>
  );
}
