/**
 * Lead forms and optional API reads are off by default so the site runs without Django.
 * Set NEXT_PUBLIC_ENABLE_API=true when the backend is ready (see .env.local.example).
 */
export function isLeadApiEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_API === "true";
}
