import type { Metadata } from "next";
import Link from "next/link";

import { CTASection } from "@/components/CTASection";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us | Local Junk Removal NOVA",
  description:
    "RM Haul & Clean: fully insured, locally owned junk removal for Fairfax, Loudoun County, and Northern Virginia.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="text-sm font-bold text-amber-800">About</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Local crew. Real results.</h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            {SITE.name} is a <strong>locally owned</strong>, <strong>fully insured</strong> junk removal team serving{" "}
            <strong>Fairfax</strong>, <strong>Loudoun County</strong>, and <strong>Northern Virginia</strong>. We focus on
            same-day pickups, upfront pricing, and <strong>5-star service</strong>.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Why we started</h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              People needed junk gone fast—without sketchy pricing or damaged door frames. We built {SITE.name} around
              simple promises: show up, quote clearly, do all the lifting, leave the space usable.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Call <a className="font-bold text-slate-900" href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a> and you’ll
              talk to someone who can book you today.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-bold text-slate-900">{SITE.trustSignals.join(" · ")}</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>• Same-day service when trucks are nearby</li>
              <li>• Upfront pricing before we load</li>
              <li>• We carry everything—stairs, basements, tight hallways</li>
              <li>• Built for homeowners, renters, and property managers</li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">Why NOVA customers pick us</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Same-day",
                body: "Need it gone today? Call early—we’ll tell you honestly if we can make it.",
              },
              {
                title: "Upfront pricing",
                body: "No bait-and-switch. You know the plan before we touch the first item.",
              },
              {
                title: "We lift it all",
                body: "You don’t rent a truck or beg friends. We handle the heavy work.",
              },
            ].map((x) => (
              <div key={x.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="font-bold text-slate-900">{x.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{x.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Link href="/contact" className="text-sm font-bold text-amber-800 hover:text-amber-700">
            Get Free Quote →
          </Link>
        </div>
      </section>

      <CTASection
        title="Book your pickup"
        subtitle="Fairfax, Loudoun County, and all of Northern Virginia. Call for same-day—or get a free quote online."
      />
    </div>
  );
}
