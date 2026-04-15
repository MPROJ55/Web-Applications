import Link from "next/link";

import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <div className="text-lg font-bold text-white">{SITE.name}</div>
          <p className="mt-2 text-sm font-medium text-amber-300/90">{SITE.trustSignals.join(" · ")}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Junk removal in {SITE.region}: Fairfax, Loudoun County, and nearby. Call for same-day pickup when crews are
            available.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Call or email</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a className="text-lg font-bold text-white hover:underline" href={`tel:${SITE.phoneTel}`}>
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </li>
            <li className="text-slate-400">{SITE.hours}</li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Quick links</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="hover:text-white" href="/services">
                Services
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/pricing">
                Pricing
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/contact">
                Get Free Quote
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/booking">
                Book pickup
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Service area</div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {SITE.serviceAreaLine}. Junk removal Fairfax, Loudoun County, and Northern Virginia communities.
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a className="hover:text-white" href={SITE.social.facebook}>
              Facebook
            </a>
            <a className="hover:text-white" href={SITE.social.instagram}>
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {SITE.name}. {SITE.region}.
          </p>
          <p>Fully insured · Locally owned · 5-star service</p>
        </div>
      </div>
    </footer>
  );
}
