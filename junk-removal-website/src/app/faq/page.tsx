import type { Metadata } from "next";
import Link from "next/link";

import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FAQS } from "@/content/faqs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ | Junk Removal Northern Virginia",
  description:
    "Junk removal FAQ for Fairfax, Loudoun County, and NOVA: same-day service, pricing, what we take, and more.",
};

export default function FaqPage() {
  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="text-sm font-bold text-amber-800">FAQ</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Quick answers</h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Still stuck? Call{" "}
            <a className="font-bold text-slate-900" href={`tel:${SITE.phoneTel}`}>
              {SITE.phoneDisplay}
            </a>{" "}
            or{" "}
            <Link className="font-bold text-slate-900 underline" href="/contact">
              get a free quote
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <FAQAccordion items={FAQS} />
      </section>

      <CTASection
        title="Need same-day junk removal?"
        subtitle="Northern Virginia · Fairfax · Loudoun County. Call now—or send photos for a free quote."
      />
    </div>
  );
}
