"use client";

import { useState } from "react";

import { postQuote } from "@/lib/api";
import { isLeadApiEnabled } from "@/lib/features";

const JOB_TYPES = [
  "Single item",
  "Furniture",
  "Appliances",
  "Garage cleanout",
  "Yard waste",
  "Full cleanout",
  "Light demo debris",
  "Rental / apartment",
  "Other",
];

const CONTACT_METHODS = ["Phone", "Text", "Email"];

function validate(data: {
  full_name: string;
  phone: string;
  email: string;
  address: string;
  job_type: string;
  description: string;
  contact_method: string;
}) {
  const errors: Record<string, string> = {};
  if (!data.full_name.trim()) errors.full_name = "Please enter your name.";
  if (!data.phone.trim()) errors.phone = "Please enter a phone number.";
  if (!data.email.trim()) errors.email = "Please enter an email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email.";
  if (!data.address.trim()) errors.address = "Please enter the pickup address.";
  if (!data.job_type) errors.job_type = "Please select a job type.";
  if (!data.description.trim()) errors.description = "Please describe what needs to be removed.";
  if (!data.contact_method) errors.contact_method = "Please choose a contact method.";
  return errors;
}

export function QuoteForm() {
  const [full_name, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [job_type, setJobType] = useState("");
  const [description, setDescription] = useState("");
  const [preferred_date, setPreferredDate] = useState("");
  const [preferred_time, setPreferredTime] = useState("");
  const [contact_method, setContactMethod] = useState("Phone");
  const [urgent_request, setUrgentRequest] = useState(false);
  const [images, setImages] = useState<FileList | null>(null);
  const [company_website, setCompanyWebsite] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const next = validate({
      full_name,
      phone,
      email,
      address,
      job_type,
      description,
      contact_method,
    });
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("loading");
    try {
      if (!isLeadApiEnabled()) {
        await new Promise((r) => setTimeout(r, 450));
        setStatus("success");
        setMessage(
          "Thanks — your details look good. (Frontend-only mode: forms are not sent to a server yet. When Django is ready, set NEXT_PUBLIC_ENABLE_API=true in .env.local.)",
        );
      } else {
        const res = await postQuote({
          full_name,
          phone,
          email,
          address,
          job_type,
          description,
          preferred_date,
          preferred_time,
          contact_method,
          urgent_request,
          company_website,
          images,
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Request failed");
        }
        setStatus("success");
        setMessage("Thanks — your quote request was sent. We will contact you shortly.");
      }
      setFullName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setJobType("");
      setDescription("");
      setPreferredDate("");
      setPreferredTime("");
      setContactMethod("Phone");
      setUrgentRequest(false);
      setImages(null);
      setCompanyWebsite("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please call us or try again in a minute.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-900" htmlFor="full_name">
            Full name *
          </label>
          <input
            id="full_name"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-amber-500/30 focus:ring-4"
            autoComplete="name"
          />
          {errors.full_name ? <p className="mt-1 text-xs text-red-600">{errors.full_name}</p> : null}
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-900" htmlFor="phone">
            Phone *
          </label>
          <input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-amber-500/30 focus:ring-4"
            autoComplete="tel"
          />
          {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone}</p> : null}
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-slate-900" htmlFor="email">
            Email *
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-amber-500/30 focus:ring-4"
            autoComplete="email"
          />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-slate-900" htmlFor="address">
            Address *
          </label>
          <input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-amber-500/30 focus:ring-4"
            autoComplete="street-address"
          />
          {errors.address ? <p className="mt-1 text-xs text-red-600">{errors.address}</p> : null}
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-900" htmlFor="job_type">
            Type of job *
          </label>
          <select
            id="job_type"
            value={job_type}
            onChange={(e) => setJobType(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-amber-500/30 focus:ring-4"
          >
            <option value="">Select…</option>
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.job_type ? <p className="mt-1 text-xs text-red-600">{errors.job_type}</p> : null}
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-900" htmlFor="contact_method">
            Best contact method *
          </label>
          <select
            id="contact_method"
            value={contact_method}
            onChange={(e) => setContactMethod(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-amber-500/30 focus:ring-4"
          >
            {CONTACT_METHODS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.contact_method ? <p className="mt-1 text-xs text-red-600">{errors.contact_method}</p> : null}
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-slate-900" htmlFor="description">
            Describe the junk / items *
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-amber-500/30 focus:ring-4"
            placeholder="Examples: sectional sofa, queen mattress, washer/dryer in basement, ~15 contractor bags, etc."
          />
          {errors.description ? <p className="mt-1 text-xs text-red-600">{errors.description}</p> : null}
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-900" htmlFor="preferred_date">
            Preferred date
          </label>
          <input
            id="preferred_date"
            type="date"
            value={preferred_date}
            onChange={(e) => setPreferredDate(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-amber-500/30 focus:ring-4"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-900" htmlFor="preferred_time">
            Preferred time
          </label>
          <input
            id="preferred_time"
            value={preferred_time}
            onChange={(e) => setPreferredTime(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-amber-500/30 focus:ring-4"
            placeholder="e.g. Morning, after 2pm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-slate-900" htmlFor="images">
            Upload photos (optional)
          </label>
          <input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="mt-1 w-full text-sm"
          />
          <p className="mt-1 text-xs text-slate-500">Tip: wide shots + close-ups help us quote faster.</p>
        </div>
        <div className="sm:col-span-2 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <input
            id="urgent"
            type="checkbox"
            checked={urgent_request}
            onChange={(e) => setUrgentRequest(e.target.checked)}
            className="mt-1 h-4 w-4 accent-amber-600"
          />
          <label htmlFor="urgent" className="text-sm text-slate-700">
            <span className="font-semibold text-slate-900">Urgent / same-day request</span>
            <span className="block text-slate-600">We will confirm availability by phone/text.</span>
          </label>
        </div>

        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company_website">Company website</label>
          <input
            id="company_website"
            tabIndex={-1}
            autoComplete="off"
            value={company_website}
            onChange={(e) => setCompanyWebsite(e.target.value)}
          />
        </div>
      </div>

      {message ? (
        <div
          className={
            status === "success"
              ? "rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
              : "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          }
        >
          {message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? "Sending…" : "Submit quote request"}
      </button>
    </form>
  );
}
