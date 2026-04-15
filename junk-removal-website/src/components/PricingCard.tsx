type PricingCardProps = {
  title: string;
  price: string;
  description: string;
  bullets?: string[];
};

export function PricingCard({ title, price, description, bullets }: PricingCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <p className="mt-2 text-sm text-slate-600">{description}</p>
        </div>
        <div className="shrink-0 rounded-xl bg-amber-500/15 px-3 py-2 text-right">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-700">From</div>
          <div className="text-xl font-extrabold text-slate-900">{price}</div>
        </div>
      </div>
      {bullets?.length ? (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
