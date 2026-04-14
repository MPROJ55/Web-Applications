import type { TestimonialDto } from "@/lib/api";
import { getApiBaseUrl } from "@/lib/api";
import { FALLBACK_TESTIMONIALS } from "@/content/testimonials";

import { isLeadApiEnabled } from "@/lib/features";

/** Use on the home page when you want live testimonials from Django. */
export async function loadFeaturedTestimonials(): Promise<TestimonialDto[]> {
  if (!isLeadApiEnabled()) {
    return FALLBACK_TESTIMONIALS;
  }
  try {
    const res = await fetch(`${getApiBaseUrl()}/api/testimonials/?featured=1`, {
      next: { revalidate: 120 },
    });
    if (!res.ok) throw new Error("bad response");
    const data = (await res.json()) as { results: TestimonialDto[] };
    if (!data.results?.length) return FALLBACK_TESTIMONIALS;
    return data.results;
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}
