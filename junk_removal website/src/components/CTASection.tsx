import Link from "next/link";

import { SITE } from "@/lib/site";

type CTASectionProps = {
  title: string;
  subtitle: string;
  callLabel?: string;
  quoteHref?: string;
  quoteLabel?: string;
};

export function CTASection({
  title,
  subtitle,
  callLabel = "Call Now for Same-Day Pickup",
  quoteHref = "/contact",
  quoteLabel = "Get Free Quote",
}: CTASectionProps) {
  return (
    <section className="bg-gradient-to-r from-amber-500 to-orange-500">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-2xl text-slate-900/85">{subtitle}</p>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="mt-3 inline-block text-lg font-extrabold text-slate-950 underline decoration-2 underline-offset-4 hover:text-slate-900"
          >
            {SITE.phoneDisplay}
          </a>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <a
            href={`tel:${SITE.phoneTel}`}
            className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3.5 text-center text-sm font-bold text-white hover:bg-slate-900"
          >
            {callLabel}
          </a>
          <Link
            href={quoteHref}
            className="inline-flex items-center justify-center rounded-xl border-2 border-slate-950/25 bg-white px-5 py-3.5 text-center text-sm font-bold text-slate-950 hover:bg-white/90"
          >
            {quoteLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
