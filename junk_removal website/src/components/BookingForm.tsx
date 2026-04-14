"use client";

import { useState } from "react";

import { postBooking } from "@/lib/api";
import { isLeadApiEnabled } from "@/lib/features";

const SERVICE_TYPES = [
  "Single-item pickup",
  "Furniture removal",
  "Appliance removal",
  "Garage cleanout",
  "Yard waste",
  "Full property cleanout",
  "Light demolition debris",
  "Rental / apartment cleanout",
  "Other",
];

function validate(data: {
  full_name: string;
  phone: string;
  email: string;
  address: string;
  service_type: string;
  date: string;
  time: string;
}) {
  const errors: Record<string, string> = {};
  if (!data.full_name.trim()) errors.full_name = "Please enter your name.";
  if (!data.phone.trim()) errors.phone = "Please enter a phone number.";
  if (!data.email.trim()) errors.email = "Please enter an email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email.";
  if (!data.address.trim()) errors.address = "Please enter the service address.";
  if (!data.service_type) errors.service_type = "Please select a service type.";
  if (!data.date) errors.date = "Please choose a date.";
  if (!data.time.trim()) errors.time = "Please enter a preferred time window.";
  return errors;
}

export function BookingForm() {
  const [full_name, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [service_type, setServiceType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const next = validate({ full_name, phone, email, address, service_type, date, time });
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("loading");
    try {
      if (!isLeadApiEnabled()) {
        await new Promise((r) => setTimeout(r, 450));
        setStatus("success");
        setMessage(
          "Booking details saved in preview mode only. Connect the API later with NEXT_PUBLIC_ENABLE_API=true in .env.local.",
        );
      } else {
        const res = await postBooking({
          full_name,
          phone,
          email,
          address,
          service_type,
          date,
          time,
          notes,
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Request failed");
        }
        setStatus("success");
        setMessage("Booking request received — we will confirm by phone or email.");
      }
      setFullName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setServiceType("");
      setDate("");
      setTime("");
      setNotes("");
    } catch {
      setStatus("error");
      setMessage("Could not submit right now. Please call us and we will book you in.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-900" htmlFor="b_full_name">
            Full name *
          </label>
          <input
            id="b_full_name"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-amber-500/30 focus:ring-4"
            autoComplete="name"
          />
          {errors.full_name ? <p className="mt-1 text-xs text-red-600">{errors.full_name}</p> : null}
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-900" htmlFor="b_phone">
            Phone *
          </label>
          <input
            id="b_phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-amber-500/30 focus:ring-4"
            autoComplete="tel"
          />
          {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone}</p> : null}
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-slate-900" htmlFor="b_email">
            Email *
          </label>
          <input
            id="b_email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-amber-500/30 focus:ring-4"
            autoComplete="email"
          />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-slate-900" htmlFor="b_address">
            Service address *
          </label>
          <input
            id="b_address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-amber-500/30 focus:ring-4"
            autoComplete="street-address"
          />
          {errors.address ? <p className="mt-1 text-xs text-red-600">{errors.address}</p> : null}
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-slate-900" htmlFor="b_service">
            Service type *
          </label>
          <select
            id="b_service"
            value={service_type}
            onChange={(e) => setServiceType(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-amber-500/30 focus:ring-4"
          >
            <option value="">Select…</option>
            {SERVICE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.service_type ? <p className="mt-1 text-xs text-red-600">{errors.service_type}</p> : null}
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-900" htmlFor="b_date">
            Preferred date *
          </label>
          <input
            id="b_date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-amber-500/30 focus:ring-4"
          />
          {errors.date ? <p className="mt-1 text-xs text-red-600">{errors.date}</p> : null}
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-900" htmlFor="b_time">
            Preferred time *
          </label>
          <input
            id="b_time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-amber-500/30 focus:ring-4"
            placeholder="e.g. 9–11am"
          />
          {errors.time ? <p className="mt-1 text-xs text-red-600">{errors.time}</p> : null}
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-slate-900" htmlFor="b_notes">
            Notes (optional)
          </label>
          <textarea
            id="b_notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-amber-500/30 focus:ring-4"
            placeholder="Gate codes, parking, stairs, special instructions…"
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
        className="w-full rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? "Submitting…" : "Submit booking request"}
      </button>
    </form>
  );
}
