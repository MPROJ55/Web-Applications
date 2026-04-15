import type { Metadata } from "next";

import { CTASection } from "@/components/CTASection";
import { ServiceCard } from "@/components/ServiceCard";
import { SERVICES } from "@/content/services";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Junk Removal Services | Fairfax & Loudoun County",
  description:
    "Same-day junk removal in Northern Virginia: single items, furniture, appliances, cleanouts, yard waste, and more. Call RM Haul & Clean.",
};

export default function ServicesPage() {
  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="text-sm font-bold text-amber-800">Services · Northern Virginia</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">What we haul in Fairfax &amp; Loudoun</h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Not sure what fits? Call <a className="font-bold text-slate-900" href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>{" "}
            or get a free quote—photos speed things up.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-4">
          {SERVICES.map((s) => (
            <div key={s.slug} id={s.slug} className="scroll-mt-28">
              <ServiceCard title={s.title} summary={s.summary} bullets={s.bullets} />
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Ready to clear it out?"
        subtitle="Same-day junk removal in NOVA when we have a truck open. Upfront pricing. We lift everything."
      />
    </div>
  );
}
