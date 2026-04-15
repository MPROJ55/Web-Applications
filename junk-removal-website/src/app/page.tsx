import Link from "next/link";

import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { PricingCard } from "@/components/PricingCard";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { SERVICES } from "@/content/services";
import { FALLBACK_TESTIMONIALS } from "@/content/testimonials";
import { SITE } from "@/lib/site";

export default function Home() {
  const testimonials = FALLBACK_TESTIMONIALS;
  const featuredServices = SERVICES.slice(0, 4);

  return (
    <div>
      <Hero
        title="Same-Day Junk Removal in Northern Virginia"
        subtitle={`Call ${SITE.phoneDisplay} — we haul furniture, appliances, and cleanouts in Fairfax, Loudoun County, and across NOVA. You point; we load.`}
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Local crew. Fast pickup.</h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            {SITE.name} is built for homeowners, renters, and property managers who need junk gone today—not next week.
            Fully insured. Locally owned. 5-star service.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {featuredServices.map((s) => (
            <ServiceCard
              key={s.slug}
              title={s.title}
              summary={s.summary}
              bullets={s.bullets}
              href={`/services#${s.slug}`}
            />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/services" className="text-sm font-bold text-amber-800 hover:text-amber-700">
            All services →
          </Link>
          <a href={`tel:${SITE.phoneTel}`} className="text-sm font-bold text-slate-900 hover:underline">
            Call {SITE.phoneDisplay}
          </a>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Straightforward pricing</h2>
              <p className="mt-2 max-w-2xl text-slate-600">
                Upfront ranges for typical Fairfax &amp; Loudoun County jobs. Final price depends on volume and access—we
                tell you before we load.
              </p>
            </div>
            <Link
              href="/pricing"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm hover:bg-slate-50"
            >
              Full price list
            </Link>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <PricingCard
              title="Single-item pickup"
              price="$70–$80"
              description="One sofa, mattress, appliance—we lift it and haul it."
              bullets={["Fairfax & Loudoun", "Stairs may add labor"]}
            />
            <PricingCard
              title="Full load"
              price="$500–$1,000"
              description="Garages, estates, big cleanouts—priced by truck space."
              bullets={["Photos = faster quotes", "We confirm before we haul"]}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">How it works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Call or send photos",
              body: "Tell us what’s in Northern Virginia (Fairfax, Loudoun, etc.) and we’ll quote fast.",
            },
            {
              step: "02",
              title: "Get your price",
              body: "Upfront pricing—no surprise fees after we’re on site.",
            },
            {
              step: "03",
              title: "We load everything",
              body: "We do all the lifting. You get your space back.",
            },
          ].map((x) => (
            <div key={x.step} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-extrabold tracking-widest text-amber-700">{x.step}</div>
              <div className="mt-2 text-lg font-bold text-slate-900">{x.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{x.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-100/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">5-star service</h2>
              <p className="mt-2 text-slate-600">Fully insured · Locally owned · Real NOVA customers</p>
            </div>
            <a href={`tel:${SITE.phoneTel}`} className="text-sm font-bold text-amber-900 hover:underline">
              Call {SITE.phoneDisplay}
            </a>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard
                key={t.id}
                name={t.customer_name}
                location={t.location}
                review={t.review}
                rating={t.rating}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Junk removal near you</h2>
            <p className="mt-3 text-slate-600">
              Serving <strong>Northern Virginia</strong>, <strong>Fairfax</strong>, <strong>Loudoun County</strong>, and
              nearby. Same-day service when trucks are open—call to confirm.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              <li>• In-home, driveway, or curbside pickup</li>
              <li>• Landlords &amp; small businesses welcome</li>
              <li>• We handle the heavy lifting—you don’t</li>
            </ul>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
            >
              Call {SITE.phoneDisplay}
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="aspect-[16/10] w-full bg-gradient-to-br from-slate-200 to-slate-100">
              <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Map: Northern Virginia</span>
                Embed your Google Map (Fairfax / Loudoun service area).
              </div>
            </div>
            <div className="border-t border-slate-200 p-4 text-xs text-slate-500">
              Fairfax · Loudoun County · Northern Virginia junk removal
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Need it gone today?"
        subtitle="Same-day junk removal in Northern Virginia when we have a truck nearby. Call now—or get a free quote online."
      />
    </div>
  );
}
