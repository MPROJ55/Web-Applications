const DEFAULT_API = "http://127.0.0.1:8000";

export function getApiBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_API;
  return base.replace(/\/$/, "");
}

export type QuotePayload = {
  full_name: string;
  phone: string;
  email: string;
  address: string;
  job_type: string;
  description: string;
  preferred_date: string;
  preferred_time: string;
  contact_method: string;
  urgent_request: boolean;
  company_website: string;
  images: FileList | null;
};

export async function postQuote(payload: QuotePayload): Promise<Response> {
  const fd = new FormData();
  fd.append("full_name", payload.full_name);
  fd.append("phone", payload.phone);
  fd.append("email", payload.email);
  fd.append("address", payload.address);
  fd.append("job_type", payload.job_type);
  fd.append("description", payload.description);
  if (payload.preferred_date) fd.append("preferred_date", payload.preferred_date);
  if (payload.preferred_time) fd.append("preferred_time", payload.preferred_time);
  fd.append("contact_method", payload.contact_method);
  fd.append("urgent_request", payload.urgent_request ? "true" : "false");
  fd.append("company_website", payload.company_website);
  if (payload.images) {
    for (let i = 0; i < payload.images.length; i++) {
      fd.append("images", payload.images[i]);
    }
  }
  return fetch(`${getApiBaseUrl()}/api/quotes/`, {
    method: "POST",
    body: fd,
  });
}

export type BookingPayload = {
  full_name: string;
  phone: string;
  email: string;
  address: string;
  service_type: string;
  date: string;
  time: string;
  notes: string;
};

export async function postBooking(payload: BookingPayload): Promise<Response> {
  return fetch(`${getApiBaseUrl()}/api/bookings/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export type TestimonialDto = {
  id: number;
  customer_name: string;
  review: string;
  rating: number;
  location: string;
  is_featured: boolean;
};

export async function fetchTestimonials(featured = true): Promise<TestimonialDto[]> {
  const q = featured ? "?featured=1" : "";
  const res = await fetch(`${getApiBaseUrl()}/api/testimonials/${q}`, {
    next: { revalidate: 120 },
  });
  if (!res.ok) return [];
  const data = (await res.json()) as { results: TestimonialDto[] };
  return data.results ?? [];
}
