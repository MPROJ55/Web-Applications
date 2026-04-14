"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { SITE } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Free quote" },
  { href: "/booking", label: "Book" },
];

function linkClass(active: boolean) {
  return [
    "rounded-lg px-2.5 py-2 text-sm font-medium transition-colors whitespace-nowrap",
    active
      ? "bg-amber-500/15 text-slate-900"
      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        {/* Brand: fixed max width + overflow so text never draws over the nav */}
        <Link
          href="/"
          className="relative z-10 min-w-0 max-w-[9.5rem] shrink-0 overflow-hidden sm:max-w-[11.5rem] xl:max-w-[15rem]"
        >
          <span className="block truncate text-base font-bold tracking-tight text-slate-900">{SITE.name}</span>
          <span className="mt-0.5 block truncate text-[11px] font-medium leading-snug text-slate-600 sm:text-xs">
            {SITE.serviceAreaLine}
          </span>
        </Link>

        {/* Centered desktop nav — does not compete for flex space with the logo */}
        <nav
          className="absolute left-1/2 top-1/2 hidden max-w-[min(100vw-22rem,42rem)] -translate-x-1/2 -translate-y-1/2 flex-wrap justify-center gap-0.5 lg:flex xl:max-w-none"
          aria-label="Main"
        >
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(pathname === item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-2">
          <a
            href={`tel:${SITE.phoneTel}`}
            className="rounded-xl bg-slate-900 px-2.5 py-2 text-center lg:hidden"
          >
            <div className="text-[10px] font-semibold uppercase leading-none text-amber-300">Call</div>
            <div className="text-[11px] font-bold leading-tight text-white sm:text-xs">{SITE.phoneDisplay}</div>
          </a>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="flex flex-col rounded-xl border-2 border-slate-900 bg-white px-2.5 py-1.5 text-right shadow-sm hover:bg-slate-50 xl:px-3"
            >
              <span className="text-[10px] font-bold uppercase leading-none text-slate-500">Call now</span>
              <span className="text-sm font-extrabold leading-tight text-slate-900">{SITE.phoneDisplay}</span>
            </a>
            <Link
              href="/contact"
              className="rounded-xl bg-amber-500 px-3 py-2.5 text-sm font-bold text-slate-950 shadow-sm hover:bg-amber-400 xl:px-4"
            >
              Get Free Quote
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-800 lg:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-sm font-semibold">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(pathname === item.href)}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${SITE.phoneTel}`}
              className="mt-2 rounded-xl bg-slate-900 px-3 py-3 text-center text-sm font-bold text-white"
            >
              Call {SITE.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="rounded-xl bg-amber-500 py-3 text-center text-sm font-bold text-slate-950"
              onClick={() => setOpen(false)}
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
