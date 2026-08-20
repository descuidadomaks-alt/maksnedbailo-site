/**
 * /score, The Bottleneck Score quiz.
 *
 * 8 questions, Q1-Q7 scored 0-3 (left→right), Q8 is a qualification
 * question (revenue band) used as the € multiplier, not scored.
 *
 * Scoring (Q1-Q7, max 21): 0-6 = Contained · 7-13 = Leaking · 14-21 = Hemorrhaging.
 * € estimate: monthlyLeak = score × bandMultiplier, shown as a ±20% range
 * rounded to the nearest €100.
 */

export interface QuizQuestion {
  question: string;
  options: string[];
}

export const QUESTIONS: QuizQuestion[] = [
  {
    question: "A new lead messages your business at 9pm. What happens?",
    options: [
      "Instant reply, automated or on-call",
      "Reply within the hour",
      "Reply next morning",
      "Honestly? Sometimes nothing",
    ],
  },
  {
    question: "How many deals are sitting in your pipeline right now waiting on YOU?",
    options: ["None", "1 to 2", "3 to 5", "More than 5"],
  },
  {
    question: "Hours per week you spend answering questions your team could handle?",
    options: ["Under 2", "2 to 5", "5 to 10", "10+"],
  },
  {
    question: "If you disappeared for two weeks, the business would...",
    options: [
      "Run fine",
      "Slow down",
      "Stall on anything important",
      "I genuinely don't know, and that scares me",
    ],
  },
  {
    question: "How many decisions route through you on a normal day?",
    options: ["A few big ones", "5 to 10", "10 to 20", "I've lost count"],
  },
  {
    question: "Your last real holiday, fully off and no checking in?",
    options: ["This year", "Last year", "2+ years ago", "What's a holiday"],
  },
  {
    question: "Your experience with AI tools so far?",
    options: [
      "Something's live and working",
      "Tried a few, abandoned them",
      "Got burned. Gave a client garbage",
      "Haven't started",
    ],
  },
  {
    question: "Annual revenue (rough band)?",
    options: ["Under €1M", "€1-3M", "€3-10M", "Over €10M"],
  },
];

export const SCORED_QUESTIONS = 7; // Q1 to Q7. Q8 is qualification only

export type Tier = "Contained" | "Leaking" | "Hemorrhaging";

export function getScore(answers: number[]): number {
  return answers.slice(0, SCORED_QUESTIONS).reduce((sum, a) => sum + Math.max(0, a), 0);
}

export function getTier(score: number): Tier {
  if (score <= 6) return "Contained";
  if (score <= 13) return "Leaking";
  return "Hemorrhaging";
}

export const TIER_INTRO: Record<Tier, string> = {
  Contained: "You're in the 'Contained' zone",
  Leaking: "You're in the 'Leaking' zone",
  Hemorrhaging: "You're in the 'Hemorrhaging' zone",
};

interface RevenueBand {
  label: string;
  multiplier: number;
}

export const REVENUE_BANDS: RevenueBand[] = [
  { label: "Under €1M", multiplier: 120 },
  { label: "€1-3M", multiplier: 260 },
  { label: "€3-10M", multiplier: 540 },
  { label: "Over €10M", multiplier: 900 },
];

export interface EstimateRange {
  low: number;
  high: number;
}

export function getMonthlyEstimate(score: number, bandIndex: number): EstimateRange {
  const base = score * REVENUE_BANDS[bandIndex].multiplier;
  return {
    low: Math.round((base * 0.8) / 100) * 100,
    high: Math.round((base * 1.2) / 100) * 100,
  };
}

export function formatEUR(n: number): string {
  return "€" + n.toLocaleString("en-US");
}

export type LeakCategory = "leadResponse" | "founderDependency" | "systemsDelegation";

export const LEAK_CATEGORY_LABELS: Record<LeakCategory, string> = {
  leadResponse: "Lead response & follow-up",
  founderDependency: "Founder-dependency & decisions",
  systemsDelegation: "Systems & delegation",
};

/** One tailored sentence per leak category, shown on the result screen. */
export const LEAK_CATEGORY_COPY: Record<LeakCategory, string> = {
  leadResponse:
    "Every hour a hot lead sits unanswered is an hour a competitor can step in, and the deals stuck in your pipeline are proof it's already happening. This is usually the fastest fix, with the clearest ROI.",
  founderDependency:
    "The business runs through your head, not through your systems, every decision, every call, every \"just check with you\" is a tax on your time and a ceiling on growth.",
  systemsDelegation:
    "Nothing's written down, so your team can't run without you and the AI tools you've tried haven't stuck, there's no process to plug them into yet.",
};

/** One generic high-leverage tip per leak category, shown to the Under €1M band instead of the Map CTA. */
export const LEAK_CATEGORY_TIPS: Record<LeakCategory, string> = {
  leadResponse:
    "Set up one auto-reply, on WhatsApp or your website, that acknowledges every new lead within 60 seconds, even if a human follows up later. That single change closes most of this gap.",
  founderDependency:
    "Pick the one decision type that lands in your inbox most often, write down the rule you use to make it, and hand that rule to one person this week.",
  systemsDelegation:
    "Before automating anything, write down the steps of your most repeated process exactly as you do it today. That document does 80% of the work, and it's free.",
};

export function getTopLeakCategory(answers: number[]): LeakCategory {
  const groups: { key: LeakCategory; score: number }[] = [
    { key: "leadResponse", score: answers[0] + answers[1] },
    { key: "founderDependency", score: answers[2] + answers[3] + answers[4] },
    { key: "systemsDelegation", score: answers[5] + answers[6] },
  ];
  return groups.reduce((max, g) => (g.score > max.score ? g : max)).key;
}

/** Encode answers (each 0-3) as an 8-character string for shareable result URLs. */
export function encodeAnswers(answers: number[]): string {
  return answers.map((a) => Math.max(0, Math.min(3, a))).join("");
}

export function decodeAnswers(s: string): number[] | null {
  if (!/^[0-3]{8}$/.test(s)) return null;
  return s.split("").map(Number);
}
