"use client";

import { useState } from "react";
import { useGate, type Lead } from "./GateContext";

/**
 * The 4-field lead-capture form. React state only — no <form> tag, no native
 * submit. Reused by the modal and by the inline demo gate.
 *
 * `compact` tightens spacing for the modal; the inline version runs a touch
 * larger. On success the parent (modal / demo section) swaps in its own
 * post-submit UI, so this component does not render a thank-you state itself.
 */

const EMPTY: Lead = { name: "", business: "", email: "", phone: "" };

export function GateForm({
  ctaLabel = "UNLOCK THE DEMO",
  compact = false,
}: {
  ctaLabel?: string;
  compact?: boolean;
}) {
  const { submitLead, submitting } = useGate();
  const [lead, setLead] = useState<Lead>(EMPTY);
  const [touched, setTouched] = useState(false);

  const valid =
    lead.name.trim() !== "" &&
    lead.business.trim() !== "" &&
    /\S+@\S+\.\S+/.test(lead.email) &&
    lead.phone.trim() !== "";

  const set = (key: keyof Lead) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setLead((l) => ({ ...l, [key]: e.target.value }));

  const handleSubmit = () => {
    setTouched(true);
    if (!valid || submitting) return;
    void submitLead(lead);
  };

  const inputBase =
    "w-full rounded-lg border bg-white px-4 text-base text-[#171e19] placeholder:text-[#171e19]/40 outline-none transition-colors focus:border-[#171e19] min-h-[52px]";
  const border = (key: keyof Lead, ok: boolean) =>
    touched && !ok ? "border-red-400" : "border-[#171e19]/20";

  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      <div className={`grid grid-cols-1 ${compact ? "" : "sm:grid-cols-2"} gap-3`}>
        <input
          type="text"
          inputMode="text"
          autoComplete="name"
          placeholder="Your name"
          aria-label="Your name"
          value={lead.name}
          onChange={set("name")}
          className={`${inputBase} ${border("name", lead.name.trim() !== "")}`}
        />
        <input
          type="text"
          autoComplete="organization"
          placeholder="Business name"
          aria-label="Business name"
          value={lead.business}
          onChange={set("business")}
          className={`${inputBase} ${border("business", lead.business.trim() !== "")}`}
        />
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email"
          aria-label="Email"
          value={lead.email}
          onChange={set("email")}
          className={`${inputBase} ${border("email", /\S+@\S+\.\S+/.test(lead.email))}`}
        />
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Phone"
          aria-label="Phone"
          value={lead.phone}
          onChange={set("phone")}
          className={`${inputBase} ${border("phone", lead.phone.trim() !== "")}`}
        />
      </div>

      {touched && !valid && (
        <p className="text-sm text-red-500">Please fill in all four fields.</p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
        className="oh-display oh-card w-full rounded-lg bg-[#ffe17c] px-8 py-4 text-xl text-[#171e19] shadow-lg hover:scale-[1.02] active:scale-100 disabled:opacity-70 min-h-[56px]"
      >
        {submitting ? "Unlocking…" : ctaLabel}
      </button>

      <p className="text-center text-xs text-[#171e19]/50">
        No spam. We use this to show you the demo and book your call.
      </p>
    </div>
  );
}
