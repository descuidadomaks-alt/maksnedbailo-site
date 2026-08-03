/**
 * Quiz-funnel step config — verbatim from the live overtimeos.com quiz
 * (extracted from its own compiled JS; see the Task 1 inventory). Exact
 * copy, do not paraphrase. `progress` is what the bar shows WHILE that step
 * is on screen.
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
  consent: boolean;
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
  consent: false,
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
  showConsent?: boolean;
};

// Merged final step — first name + phone + email + consent, all on one
// screen, submitted together. Replaces what used to be 4 separate text
// steps (name, email, website, phone) as part of the 10→3 step reduction.
export type ContactStep = {
  type: "contact";
  key: "contact";
  progress: number;
  question: string;
  cta: string;
};

export type QuizStep = ChoiceStep | TextStep | ContactStep;

// Reduced from 10 steps to 3 (trade, biggestImpact, contact) to cut
// drop-off. leadsPerMonth/phoneCoverage/eliminate/timeline/website are no
// longer asked — QuizAnswers/EMPTY_ANSWERS below still carry those keys
// (always "") so the /api/oos-lead payload shape is unchanged; see
// QuizContext.tsx's finishQuiz(), which is untouched.
export const QUIZ_STEPS: QuizStep[] = [
  {
    type: "choice",
    key: "trade",
    progress: 45,
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
    progress: 75,
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
    type: "contact",
    key: "contact",
    progress: 95,
    question: "Almost there — where should we send it?",
    cta: "YES — SHOW ME THE DEMO",
  },
];

// Persistent header — shown only above steps 1–2 (index 0–1).
export const QUIZ_HEADER_STEPS = 2;
export const QUIZ_HEADER_TEXT = "We build & run your whole front office for home-service pros";
export const QUIZ_HEADER_PRICE = "$499/month";

// Verbatim consent copy from the live quiz's phone step (optional checkbox).
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

/** All three contact fields must be valid before the merged step's CTA enables. */
export function isContactStepValid(answers: QuizAnswers): boolean {
  return isNameValid(answers.name) && isPhoneValid(answers.phone) && isEmailValid(answers.email);
}
