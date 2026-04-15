import Link from "next/link";

type ServiceCardProps = {
  title: string;
  summary: string;
  href?: string;
  bullets?: string[];
};

export function ServiceCard({ title, summary, href, bullets }: ServiceCardProps) {
  const inner = (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{summary}</p>
      {bullets?.length ? (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ) : null}
      {href ? (
        <div className="mt-4 text-sm font-semibold text-amber-700">Learn more →</div>
      ) : null}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-2xl">
        {inner}
      </Link>
    );
  }

  return inner;
}
