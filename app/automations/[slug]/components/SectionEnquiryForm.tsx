"use client";

import { useState } from "react";
import type { ProspectData } from "../data";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

const CHANNELS = ["WhatsApp", "Website", "Instagram", "Phone"] as const;
type Channel = (typeof CHANNELS)[number];

const inputClass =
  "bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 font-sora text-fg placeholder:text-fg/22 focus:outline-none focus:border-accent/40 focus:bg-white/[0.08] transition-all duration-200";

function FieldLabel({ children }: { children: string }) {
  return (
    <span
      className="font-sora text-fg/40"
      style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase" }}
    >
      {children}
    </span>
  );
}

export default function SectionEnquiryForm({ data }: { data: ProspectData }) {
  const p = data.formPrefill ?? {};

  const [form, setForm] = useState({
    name: p.name ?? "",
    business: p.business ?? "",
    website: p.website ?? "",
    locations: p.locations ?? "",
    responseTime: "",
    channel: "" as Channel | "",
    monthlyLeakGuess: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      if (data.formWebhookUrl) {
        await fetch(data.formWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, slug: data.slug, source: "demo-page" }),
        });
      }
      window.plausible?.("form_submitted", { props: { slug: data.slug } });
      window.location.href = data.ctaCalendarUrl;
    } catch {
      setError("Something went wrong — please book directly below.");
      setSubmitting(false);
    }
  }

  return (
    <section className="section-divider py-20 md:py-28" id="get-audit">
      <div className="max-w-2xl mx-auto px-6">

        <p
          className="font-sora text-fg/30 mb-5"
          style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
        >
          Free Audit
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-3"
          style={{
            fontSize: "clamp(24px, 3.4vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.022em",
          }}
        >
          See Your Numbers
        </h2>
        <p
          data-reveal
          className="font-sora font-light text-fg/45 leading-relaxed mb-12"
          style={{ fontSize: "15px" }}
        >
          30 minutes. I map exactly where leads disappear — before you spend a pound.
        </p>

        <form data-reveal="d1" onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Name + Business */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <FieldLabel>Name *</FieldLabel>
              <input
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your first name"
                className={inputClass}
                style={{ height: "52px", fontSize: "14px" }}
              />
            </label>
            <label className="flex flex-col gap-2">
              <FieldLabel>Business *</FieldLabel>
              <input
                required
                value={form.business}
                onChange={(e) => set("business", e.target.value)}
                placeholder="e.g. Glow Clinic"
                className={inputClass}
                style={{ height: "52px", fontSize: "14px" }}
              />
            </label>
          </div>

          {/* Website + Locations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <FieldLabel>Website</FieldLabel>
              <input
                value={form.website}
                onChange={(e) => set("website", e.target.value)}
                placeholder="yourdomain.com"
                className={inputClass}
                style={{ height: "52px", fontSize: "14px" }}
              />
            </label>
            <label className="flex flex-col gap-2">
              <FieldLabel>Number of locations</FieldLabel>
              <input
                value={form.locations}
                onChange={(e) => set("locations", e.target.value)}
                placeholder="e.g. 2"
                className={inputClass}
                style={{ height: "52px", fontSize: "14px" }}
              />
            </label>
          </div>

          {/* Response time */}
          <label className="flex flex-col gap-2">
            <FieldLabel>Current response time (rough)</FieldLabel>
            <input
              value={form.responseTime}
              onChange={(e) => set("responseTime", e.target.value)}
              placeholder="e.g. within a few hours, next day, we miss some..."
              className={inputClass}
              style={{ height: "52px", fontSize: "14px" }}
            />
          </label>

          {/* Channel pills */}
          <div className="flex flex-col gap-3">
            <FieldLabel>Biggest enquiry channel</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {CHANNELS.map((ch) => (
                <button
                  key={ch}
                  type="button"
                  onClick={() => set("channel", form.channel === ch ? "" : ch)}
                  className="font-sora rounded-xl transition-all duration-200"
                  style={{
                    fontSize: "13px",
                    padding: "10px 20px",
                    border: form.channel === ch
                      ? "1px solid rgba(212,255,43,0.5)"
                      : "1px solid rgba(255,255,255,0.09)",
                    background: form.channel === ch
                      ? "rgba(212,255,43,0.1)"
                      : "rgba(255,255,255,0.03)",
                    color: form.channel === ch
                      ? "rgba(212,255,43,0.95)"
                      : "rgba(240,236,230,0.45)",
                  }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          {/* Monthly leak guess */}
          <label className="flex flex-col gap-2">
            <FieldLabel>Your guess on monthly leaked revenue</FieldLabel>
            <input
              value={form.monthlyLeakGuess}
              onChange={(e) => set("monthlyLeakGuess", e.target.value)}
              placeholder="e.g. £500–£2,000"
              className={inputClass}
              style={{ height: "52px", fontSize: "14px" }}
            />
          </label>

          {error && (
            <p className="font-sora text-red-400/75" style={{ fontSize: "13px" }}>
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-accent text-bg font-semibold rounded-xl transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_0_56px_rgba(212,255,43,0.25)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontSize: "15px", padding: "20px", minHeight: "62px", marginTop: "4px", letterSpacing: "-0.01em" }}
          >
            {submitting ? "Sending…" : "Get My Free 30-Min Audit →"}
          </button>

          <p className="font-sora text-fg/22 text-center" style={{ fontSize: "11px" }}>
            You&apos;ll be redirected to book your call immediately after.
          </p>
        </form>
      </div>
    </section>
  );
}
