"use client";

import { useState } from "react";

import type { FaqItem } from "@/content/faqs";

export function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div key={item.q} className="p-2">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 rounded-xl px-4 py-3 text-left hover:bg-slate-50"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : idx)}
            >
              <span className="font-semibold text-slate-900">{item.q}</span>
              <span className="text-slate-500">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen ? <div className="px-4 pb-4 text-sm leading-relaxed text-slate-600">{item.a}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
