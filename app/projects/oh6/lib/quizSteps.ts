/**
 * Quiz-funnel step config for QuizModal.tsx / QuizContext.tsx. Exact copy —
 * do not paraphrase; these strings are also the values sent to /api/lead.
 * Progress values are what the bar shows WHILE that step is on screen.
 */

export type QuizAnswers = {
  trade: string;
  biggestImpact: string;
  leadsPerMonth: string;
  phoneCoverage: string;
  eliminate: string;
  timeline: string;
  name: string;
  email: string;
  website: string;
  phone: string;
  honeypot: string;
};

export const EMPTY_ANSWERS: QuizAnswers = {
  trade: "",
  biggestImpact: "",
  leadsPerMonth: "",
  phoneCoverage: "",
  eliminate: "",
  timeline: "",
  name: "",
  email: "",
  website: "",
  phone: "",
  honeypot: "",
};

export type ChoiceStep = {
  type: "choice";
  key: "trade" | "biggestImpact" | "leadsPerMonth" | "phoneCoverage" | "eliminate" | "timeline";
  progress: number;
  question: string;
  options: string[];
};

export type TextStep = {
  type: "text";
  key: "name" | "email" | "website" | "phone";
  progress: number;
  question: string;
  inputType: "text" | "email" | "url" | "tel";
  placeholder: string;
  cta: string;
  big?: boolean;
  skippable?: boolean;
  skipLabel?: string;
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
      "General contractor",
      "Other home services",
      "I'm not a home-service business",
    ],
  },
  {
    type: "choice",
    key: "biggestImpact",
    progress: 56,
    question: "Which of these would have the biggest impact on your business?",
    options: [
      "Never miss another lead",
      "Book appointments automatically",
      "Follow up with every lead automatically",
      "Make sure every lead is qualified",
      "Answer customer questions 24/7",
      "Save time for my office staff",
      "Generate new leads on autopilot",
      "All of the above",
    ],
  },
  {
    type: "choice",
    key: "leadsPerMonth",
    progress: 62,
    question: "Approximately how many inbound leads do you get each month?",
    options: ["Under 20", "20–50", "50–100", "100+"],
  },
  {
    type: "choice",
    key: "phoneCoverage",
    progress: 68,
    question: "Who answers your phone right now?",
    options: ["Me, between jobs", "Office staff", "Mostly voicemail", "An answering service"],
  },
  {
    type: "choice",
    key: "eliminate",
    progress: 74,
    question: "If you could eliminate ONE thing, what would it be?",
    options: [
      "Missed calls",
      "Playing phone tag",
      "Hiring office staff",
      "Manual follow-up",
      "Scheduling appointments",
      "Qualifying leads",
      "All of the above",
    ],
  },
  {
    type: "choice",
    key: "timeline",
    progress: 80,
    question: "How soon do you want every lead answered?",
    options: ["ASAP — right now", "Next 1–3 months", "Just researching"],
  },
  {
    type: "text",
    key: "name",
    progress: 86,
    question: "Your name",
    inputType: "text",
    placeholder: "First and last name",
    cta: "Continue",
  },
  {
    type: "text",
    key: "email",
    progress: 90,
    question: "Your email",
    inputType: "email",
    placeholder: "you@business.com",
    cta: "Continue",
  },
  {
    type: "text",
    key: "website",
    progress: 94,
    question: "Your website — if you have one",
    inputType: "url",
    placeholder: "yourcompany.com (optional)",
    cta: "Continue",
    skippable: true,
    skipLabel: "I don't have a website",
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
export const QUIZ_HEADER_TEXT = "We build & run your whole front office for home-service pros";
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
  if (step.key === "website") return true;
  const value = answers[step.key];
  if (step.key === "name") return value.trim() !== "";
  if (step.key === "email") return /\S+@\S+\.\S+/.test(value);
  if (step.key === "phone") return value.replace(/\D/g, "").length >= 10;
  return value.trim() !== "";
}
