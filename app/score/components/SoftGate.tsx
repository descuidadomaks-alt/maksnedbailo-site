"use client";

import { useState } from "react";
import {
  QUESTIONS,
  REVENUE_BANDS,
  getScore,
  getTier,
  getMonthlyEstimate,
  getTopLeakCategory,
  LEAK_CATEGORY_LABELS,
  TIER_INTRO,
} from "../lib/quiz";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

const WEB3FORMS_ACCESS_KEY = "88b99ec9-8882-4a4b-937c-a474d6cb7af2";

const inputClass =
  "bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 font-sora text-fg placeholder:text-fg/22 focus:outline-none focus:border-accent/40 focus:bg-white/[0.08] transition-all duration-200";

function Spinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

/** /score — soft gate. Shows the tier immediately; name + email/WhatsApp unlocks the € numbers. */
export default function SoftGate({
  answers,
  onSuccess,
}: {
  answers: number[];
  onSuccess: () => void;
}) {
  const score = getScore(answers);
  const tier = getTier(score);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const bandIndex = answers[7];
      const estimate = getMonthlyEstimate(score, bandIndex);
      const leakCategory = LEAK_CATEGORY_LABELS[getTopLeakCategory(answers)];

      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Bottleneck Score: ${tier} (${name})`,
        name,
        contact,
        score,
        tier,
        revenue_band: REVENUE_BANDS[bandIndex].label,
        estimate_low_eur: estimate.low,
        estimate_high_eur: estimate.high,
        top_leak_category: leakCategory,
        answers: QUESTIONS.map((q, i) => `${q.question} → ${q.options[answers[i]]}`).join(" | "),
        page_url: window.location.href,
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message ?? "web3forms error");

      window.plausible?.("score_completed", { props: { tier } });
      onSuccess();
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="quiz-step max-w-md w-full mx-auto text-center">
      <p
        className="font-label text-accent/70 mb-4"
        style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
      >
        Result ready
      </p>
      <h2
        className="font-playfair font-normal text-fg mb-8"
        style={{ fontSize: "clamp(24px, 4vw, 38px)", lineHeight: 1.15, letterSpacing: "-0.018em" }}
      >
        {TIER_INTRO[tier]}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-left">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={inputClass}
          style={{ height: "52px", fontSize: "14px" }}
        />
        <input
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Email or WhatsApp number"
          className={inputClass}
          style={{ height: "52px", fontSize: "14px" }}
        />

        {error && (
          <p className="font-sora text-red-400/75 text-center" style={{ fontSize: "13px" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_0_56px_rgba(212,255,43,0.22)] disabled:opacity-50 disabled:cursor-not-allowed mt-1"
          style={{ fontSize: "15px", padding: "16px", minHeight: "56px", letterSpacing: "-0.01em" }}
        >
          {submitting ? (
            <>
              <Spinner />
              Sending…
            </>
          ) : (
            <>
              Show my numbers
              <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>
                →
              </span>
            </>
          )}
        </button>
      </form>

      <p className="font-sora font-light text-fg/28 mt-4" style={{ fontSize: "12px", lineHeight: 1.6 }}>
        I&apos;ll also send you the breakdown. No sequence, no spam — I don&apos;t even
        have a newsletter.
      </p>
    </div>
  );
}
