/**
 * Quiz-funnel step config for QuizModal.tsx / QuizContext.tsx. Exact copy —
 * do not paraphrase; these strings are also the values sent to /api/lead.
 * Progress values are what the bar shows WHILE that step is on screen.
 */

export type QuizAnswers = {
  trade: string;
  phoneCoverage: string;
  missedCalls: string;
  timeline: string;
  revenue: string;
  name: string;
  email: string;
  phone: string;
  honeypot: string;
};

export const EMPTY_ANSWERS: QuizAnswers = {
  trade: "",
  phoneCoverage: "",
  missedCalls: "",
  timeline: "",
  revenue: "",
  name: "",
  email: "",
  phone: "",
  honeypot: "",
};

export type ChoiceStep = {
  type: "choice";
  key: "trade" | "phoneCoverage" | "missedCalls" | "timeline" | "revenue";
  progress: number;
  question: string;
  options: string[];
};

export type TextStep = {
  type: "text";
  key: "name" | "email" | "phone";
  progress: number;
  question: string;
  inputType: "text" | "email" | "tel";
  placeholder: string;
  cta: string;
  big?: boolean;
};

export type QuizStep = ChoiceStep | TextStep;

export const QUIZ_STEPS: QuizStep[] = [
  {
    type: "choice",
    key: "trade",
    progress: 50,
    question: "What kind of work do you do?",
    options: [
      "Roofing",
      "HVAC",
      "Plumbing",
      "Electrical",
      "Solar",
      "Other home services",
      "I'm not a home-service business",
    ],
  },
  {
    type: "choice",
    key: "phoneCoverage",
    progress: 58,
    question: "Who answers your phone right now?",
    options: ["Me, between jobs", "Office staff", "Mostly voicemail", "An answering service"],
  },
  {
    type: "choice",
    key: "missedCalls",
    progress: 66,
    question: "How many calls do you miss in a typical week?",
    options: ["Almost none", "1–5", "5–15", "Honestly, no idea"],
  },
  {
    type: "choice",
    key: "timeline",
    progress: 74,
    question: "How soon do you want every call answered?",
    options: ["ASAP — right now", "Next 1–3 months", "Just researching"],
  },
  {
    type: "choice",
    key: "revenue",
    progress: 82,
    question: "What's your current monthly revenue?",
    options: ["Under $10k", "$10k–$25k", "$25k–$100k", "$100k+"],
  },
  {
    type: "text",
    key: "name",
    progress: 90,
    question: "Your name",
    inputType: "text",
    placeholder: "First and last name",
    cta: "Continue",
  },
  {
    type: "text",
    key: "email",
    progress: 95,
    question: "Your email",
    inputType: "email",
    placeholder: "you@business.com",
    cta: "Continue",
  },
  {
    type: "text",
    key: "phone",
    progress: 98,
    question: "Your mobile phone",
    inputType: "tel",
    placeholder: "(555) 123-4567",
    cta: "YES — SHOW ME THE DEMO",
    big: true,
  },
];

// Persistent header — shown only above steps 1–2 (index 0–1).
export const QUIZ_HEADER_STEPS = 2;
export const QUIZ_HEADER_TEXT = "We help home-service pros never miss a job — for";
export const QUIZ_HEADER_PRICE = "$499/month";

export function formatUsPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  const len = digits.length;
  if (len === 0) return "";
  if (len < 4) return `(${digits}`;
  if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function isStepValid(step: QuizStep, answers: QuizAnswers): boolean {
  if (step.type === "choice") return true;
  const value = answers[step.key];
  if (step.key === "name") return value.trim() !== "";
  if (step.key === "email") return /\S+@\S+\.\S+/.test(value);
  if (step.key === "phone") return value.replace(/\D/g, "").length >= 10;
  return value.trim() !== "";
}
