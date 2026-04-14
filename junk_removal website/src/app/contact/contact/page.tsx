import type { Metadata } from "next";

import { QuoteForm } from "@/components/QuoteForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Quote | Junk Removal NOVA",
  description:
    "Free junk removal quote for Fairfax, Loudoun County, and Northern Virginia. Same-day pickup when available.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="text-sm font-bold text-amber-800">Free quote</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Get Free Quote</h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Photos + address = fastest quote. Want it gone today? Call{" "}
            <a className="font-bold text-slate-900" href={`tel:${SITE.phoneTel}`}>
              {SITE.phoneDisplay}
            </a>
            .
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-700">{SITE.trustSignals.join(" · ")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <QuoteForm />
        </div>
        <p className="mt-6 text-xs text-slate-500">
          We only use your info to respond to this request. Serving Northern Virginia, Fairfax, and Loudoun County.
        </p>
      </section>
    </div>
  );
}
