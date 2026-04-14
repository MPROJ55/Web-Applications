import Link from "next/link";

import { SITE } from "@/lib/site";

type HeroProps = {
  title: string;
  subtitle: string;
  bullets?: readonly string[];
};

const DEFAULT_BULLETS = ["Same-day service", "Upfront pricing", "We do all the lifting"] as const;

export function Hero({ title, subtitle, bullets = DEFAULT_BULLETS }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-amber-400 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-sky-400/40 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-300/90">
            {SITE.trustSignals.join(" · ")}
          </p>
          <p className="mt-2 text-sm font-medium text-slate-300">{SITE.serviceAreaLine}</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-200">{subtitle}</p>

          <a
            href={`tel:${SITE.phoneTel}`}
            className="mt-6 inline-flex w-full max-w-md flex-col rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur transition hover:bg-white/15 sm:w-auto"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-amber-200">Call now</span>
            <span className="text-2xl font-extrabold tracking-tight text-white">{SITE.phoneDisplay}</span>
            <span className="text-sm text-slate-300">Same-day pickup when available</span>
          </a>

          <ul className="mt-8 space-y-2 text-base font-medium text-slate-100">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-400" aria-hidden>
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3.5 text-center text-base font-bold text-slate-950 shadow-lg shadow-amber-500/25 hover:bg-amber-400"
            >
              Call Now for Same-Day Pickup
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3.5 text-center text-base font-bold text-white hover:bg-white/15"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
