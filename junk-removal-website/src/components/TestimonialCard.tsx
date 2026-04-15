type TestimonialCardProps = {
  name: string;
  location?: string;
  review: string;
  rating: number;
};

export function TestimonialCard({ name, location, review, rating }: TestimonialCardProps) {
  const stars = "★".repeat(Math.min(5, Math.max(1, rating))) + "☆".repeat(5 - Math.min(5, Math.max(1, rating)));

  return (
    <figure className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-amber-500" aria-hidden>
        {stars}
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed text-slate-700">&ldquo;{review}&rdquo;</blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-slate-900">
        {name}
        {location ? <span className="font-normal text-slate-600"> — {location}</span> : null}
      </figcaption>
    </figure>
  );
}
