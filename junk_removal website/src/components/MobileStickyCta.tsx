"use client";

import Link from "next/link";

import { SITE } from "@/lib/site";

export function MobileStickyCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/98 p-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur sm:hidden">
      <div className="mx-auto flex max-w-6xl gap-2">
        <a
          href={`tel:${SITE.phoneTel}`}
          className="flex flex-1 flex-col items-center justify-center rounded-xl bg-slate-900 px-2 py-2.5 text-center font-bold text-white"
        >
          <span className="text-[10px] font-semibold uppercase leading-tight text-amber-300">Same-day</span>
          <span className="text-xs leading-tight">Call Now for Same-Day Pickup</span>
        </a>
        <Link
          href="/contact"
          className="flex flex-1 items-center justify-center rounded-xl bg-amber-500 px-2 py-2.5 text-center text-sm font-bold leading-tight text-slate-950"
        >
          Get Free Quote
        </Link>
      </div>
    </div>
  );
}
