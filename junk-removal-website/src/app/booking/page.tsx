import type { Metadata } from "next";

import { BookingForm } from "@/components/BookingForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book Pickup | Same-Day NOVA",
  description:
    "Book junk removal in Northern Virginia. Fairfax, Loudoun County, and nearby. Call for same-day availability.",
};

export default function BookingPage() {
  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="text-sm font-bold text-amber-800">Book pickup</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Schedule your haul</h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Need it today? Call{" "}
            <a className="font-bold text-slate-900" href={`tel:${SITE.phoneTel}`}>
              {SITE.phoneDisplay}
            </a>{" "}
            for same-day junk removal in NOVA.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <ol className="mb-8 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-800 sm:grid-cols-3">
          <li>1. Pick date &amp; service</li>
          <li>2. Add your info</li>
          <li>3. We confirm by phone</li>
        </ol>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <BookingForm />
        </div>
      </section>
    </div>
  );
}
