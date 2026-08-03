"use client";

import { useEffect, useRef, useState } from "react";
import { useQuiz } from "./QuizContext";
import { track } from "../lib/track";
import { PAGE_TAG } from "../lib/config";
import { CONSENT_TEXT, formatUsPhone, isPhoneValid } from "../lib/quizSteps";

/**
 * Last-ditch capture — a single popup that fires once per session when the
 * visitor looks like they're leaving, offering a callback instead of the
 * full quiz. Two triggers:
 *  - Desktop: mouse leaves out the TOP of the viewport (the standard
 *    exit-intent signal — `mouseout` with clientY<=0 and no relatedTarget).
 *  - Mobile: a fast upward scroll (>=80px in <150ms) after the visitor has
 *    already scrolled down past 400px. Chosen over back-button
 *    interception (the brief's other option) since hijacking history has a
 *    real risk of trapping a visitor who genuinely wants to go back.
 *
 * Never fires if the quiz was already submitted (`unlocked`), and never
 * more than once per browser session (sessionStorage flag). Posts to the
 * same /api/oos-lead route the quiz uses, same payload shape, with
 * leadType:"exit_phone" so these are distinguishable in GHL.
 */

const SESSION_KEY = "oos_v2_1-exit-shown";
const UTM_STORAGE_KEY = "oos_v2_1-utm"; // same key QuizContext.tsx caches UTM under
const SCROLL_DOWN_THRESHOLD = 400;
const FAST_SCROLL_UP_PX = 80;
const FAST_SCROLL_MS = 150;

function readUtm(): Record<string, string> {
  try {
    const cached = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (cached) return JSON.parse(cached) as Record<string, string>;
  } catch {
    // non-fatal
  }
  return {};
}

export function ExitIntentPopup() {
  const { unlocked } = useQuiz();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const alreadyShownOrDone = () => {
    if (unlocked) return true;
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      return false;
    }
  };

  const fire = () => {
    if (alreadyShownOrDone()) return;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // non-fatal — worst case it can show again this session
    }
    setVisible(true);
    track("exit_capture", { page: PAGE_TAG });
  };

  useEffect(() => {
    if (alreadyShownOrDone()) return;

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && e.relatedTarget === null) fire();
    };

    let lastY = window.scrollY;
    let lastT = performance.now();
    let hasScrolledDown = false;
    const onScroll = () => {
      const y = window.scrollY;
      const t = performance.now();
      if (y > SCROLL_DOWN_THRESHOLD) hasScrolledDown = true;
      const dy = lastY - y; // positive = scrolled up
      const dt = t - lastT;
      if (hasScrolledDown && dy > FAST_SCROLL_UP_PX && dt < FAST_SCROLL_MS) {
        fire();
      }
      lastY = y;
      lastT = t;
    };

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked]);

  useEffect(() => {
    if (!visible) return;
    firstInputRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVisible(false);
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [visible]);

  if (!visible) return null;

  const valid = isPhoneValid(phone);
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleSubmit = async () => {
    if (!valid || honeypot) {
      if (honeypot) setVisible(false); // silently drop bots, don't tip them off
      return;
    }
    track("book_click", { location: "exit_intent", page: PAGE_TAG });
    setSubmitted(true);
    try {
      await fetch("/api/oos-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: "",
          phone,
          website: "",
          trade: "",
          biggestImpact: "",
          leadsPerMonth: "",
          phoneCoverage: "",
          eliminate: "",
          timeline: "",
          consent,
          utm: readUtm(),
          page: PAGE_TAG,
          pageUrl: window.location.href,
          honeypot,
          leadType: "exit_phone",
        }),
      });
    } catch {
      // Never let a network failure trap the visitor — the popup already
      // shows a thank-you state either way.
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-[#171e19]/70 backdrop-blur-sm" onClick={() => setVisible(false)} aria-hidden />

      <div
        ref={dialogRef}
        className={`oh-card relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl ${
          reduceMotion ? "" : "animate-[exitPopIn_0.2s_ease-out]"
        }`}
      >
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-xl text-[#171e19]/50 hover:bg-[#171e19]/5"
        >
          ×
        </button>

        {!submitted ? (
          <>
            <h3 className="oh-display pr-8 text-2xl text-[#171e19]">
              Leaving? Get a 5-minute callback instead.
            </h3>
            <p className="mt-2 text-sm text-[#171e19]/70">
              We&apos;ll call and show you exactly how it&apos;d work.
            </p>

            <div className="mt-4 space-y-2.5">
              <input
                ref={firstInputRef}
                type="text"
                inputMode="text"
                autoComplete="given-name"
                placeholder="First name (optional)"
                aria-label="First name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="min-h-[48px] w-full rounded-lg border border-[#171e19]/20 bg-white px-4 text-base text-[#171e19] outline-none focus:border-[#171e19]"
              />
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(555) 123-4567"
                aria-label="Phone"
                value={phone}
                onChange={(e) => setPhone(formatUsPhone(e.target.value))}
                className="min-h-[48px] w-full rounded-lg border border-[#171e19]/20 bg-white px-4 text-base text-[#171e19] outline-none focus:border-[#171e19]"
              />
            </div>

            <input
              type="text"
              name="_hp"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />

            <label className="mt-3 flex items-start gap-2.5 text-left text-[11px] leading-snug text-[#171e19]/70">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 flex-none rounded border-[#171e19]/30"
              />
              <span>{CONSENT_TEXT}</span>
            </label>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!valid}
              className="oh-display mt-4 min-h-[52px] w-full rounded-lg bg-[#ffe17c] px-8 py-4 text-lg text-[#171e19] shadow-lg disabled:opacity-40"
            >
              Call me
            </button>
          </>
        ) : (
          <div className="py-2 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe17c] text-2xl">
              ✓
            </div>
            <h3 className="oh-display text-xl text-[#171e19]">Got it — talk soon.</h3>
            <p className="mt-2 text-sm text-[#171e19]/70">We&apos;ll call you shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
