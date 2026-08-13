/**
 * Single-step audit-capture form config. Trimmed down from the sibling
 * pages' multi-step lib/quizSteps.ts — v3 has one screen, not a funnel, so
 * there's no step array here, just the answer shape, the trade list, and
 * the validators the form + AuditContext both need.
 */

export type AuditAnswers = {
  name: string;
  phone: string;
  email: string;
  trade: string;
  consent: boolean;
  honeypot: string;
};

export const EMPTY_ANSWERS: AuditAnswers = {
  name: "",
  phone: "",
  email: "",
  trade: "",
  consent: false,
  honeypot: "",
};

// Per the brief's exact list — narrower than the sibling pages' 8-option
// quiz dropdown (no "I'm not a home-service business" catch-all here).
export const TRADES = [
  "Roofing",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Solar",
  "General contractor",
  "Other",
];

// Verbatim consent copy from the live quiz's phone step (optional checkbox) —
// same text every sibling page uses.
export const CONSENT_TEXT =
  "I agree to receive texts and calls from Overtime OS about my enquiry, including automated texts and calls using an AI-generated voice. Not a condition of purchase. Msg & data rates may apply. Reply STOP to opt out.";

export function formatUsPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  const len = digits.length;
  if (len === 0) return "";
  if (len < 4) return `(${digits}`;
  if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function isNameValid(value: string): boolean {
  return value.trim() !== "";
}

export function isEmailValid(value: string): boolean {
  return /\S+@\S+\.\S+/.test(value);
}

export function isPhoneValid(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}

export function isTradeValid(value: string): boolean {
  return value.trim() !== "";
}

/** All four fields must be valid before the form's submit button enables. */
export function isAuditFormValid(answers: AuditAnswers): boolean {
  return (
    isNameValid(answers.name) &&
    isPhoneValid(answers.phone) &&
    isEmailValid(answers.email) &&
    isTradeValid(answers.trade)
  );
}
