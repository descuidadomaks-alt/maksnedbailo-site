/**
 * /new — Care Less brand homepage dictionary.
 * EN (default) + ES toggle. ES is currently an EN-copy placeholder — see the
 * `es` object below. Do not machine-translate the sales copy; replace field
 * by field once Maks approves the Spanish translation.
 *
 * Source of truth: D:\AI Automation\Service\care-less-positioning.md
 * (founder-bottleneck + losing-deals + anti-hype + operator-not-consultant).
 */

import type { NewLocale } from "./locale";
import { VOICE_DEMO_ANCHOR } from "./config";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SampleMapDict {
  docTitle: string;
  clientLabel: string;
  sessionLabel: string;
  studioName: string;
  pillarLabels: [string, string, string];
  /** Pain labels for the 6 sample rows (3 pillars x 2 items each) */
  pillarPains: [[string, string], [string, string], [string, string]];
  pillarPrefix: (n: number, label: string) => string;
  colPain: string;
  colLosingNow: string;
  colFeasibility: string;
  colPriority: string;
  phase1Heading: string;
  phase1Rec: string;
  phase1Timeline: string;
  phase1IfProceed: string;
  bleedLabel: string;
  bleedStat: string;
  bleedAnnual: string;
  bleedDesc: (phase1Anchor: string) => string;
  bleedPhase1Label: string;
  bleedPayback: string;
  note: string;
}

export interface ProofCase {
  name: string;
  desc: string;
  tag: string;
  href: string;
}

export interface IndustryCase {
  name: string;
  desc: string;
  tag: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export interface NewPageDict {
  header: {
    ctaLabel: string;
    aiMapLabel: string;
    blogLabel: string;
  };

  hero: {
    eyebrow: string;
    /** Each entry renders as its own line (preserves the hook's rhythm) */
    headlineLines: string[];
    sub: string;
    /** Primary CTA -> /score (Bottleneck Score quiz) */
    primaryCta: string;
    /** Shown under the primary CTA */
    primaryMicrocopy: string;
    /** Secondary ghost CTA -> CTA_TARGET (Bottleneck Map booking) */
    secondaryCta: string;
    /** Risk-reversal line shown directly under the hero CTA */
    guarantee: string;
  };

  pain: {
    label: string;
    headline: string;
    lines: string[];
    punch: string;
    /** Inline link after this section -> /score */
    ctaLabel: string;
    /** Small, muted, italic closing line under the quotes/bus card */
    closingLine: string;
  };

  reframe: {
    label: string;
    headline: string;
    body: string;
    enemies: { title: string; desc: string }[];
    /** Button after this section -> /score */
    ctaLabel: string;
  };

  belief: {
    label: string;
    headline: string;
    body: string;
    roleLine: string;
    signature: string;
  };

  map: {
    label: string;
    headline: string;
    body: string;
    bullets: string[];
    sample: SampleMapDict;
    note: string;
    /** Button after this section -> CTA_TARGET. Takes the live founding/standard rate. */
    ctaLabel: (rate: string) => string;
  };

  proof: {
    label: string;
    headline: string;
    sub: string;
    liveBadge: string;
    cases: ProofCase[];
    /** "The same pattern, at scale" — Klarna/IKEA/Octopus industry strip. */
    industryLabel: string;
    industry: IndustryCase[];
    /** Link after this section -> /score */
    ctaLabel: string;
  };

  path: {
    label: string;
    headline: string;
    steps: {
      number: string;
      title: string;
      badge?: string;
      desc: string;
      ctaLabel?: string;
      microcopy?: string;
      note?: string;
    }[];
    /** "founding" qualifier shown next to the founding rate on step 2 */
    foundingLabel: string;
    /** Single sitewide source for the "X of 5 still open" capacity line. */
    capacityLine: (slotsOpen: number) => string;
  };

  testimonials: {
    label: string;
    headline: string;
    sub: string;
    items: TestimonialItem[];
  };

  whyMe: {
    label: string;
    headline: string;
    colThem: string;
    colMe: string;
    rows: [string, string][];
  };

  services: {
    label: string;
    tags: string[];
    /** Hover/tap chip on the services ticker — links to CTA_TARGET. */
    hoverCta: string;
  };

  cta: {
    label: string;
    headline: string;
    sub: string;
    primaryCta: string;
    /** Score CTA used in the dual-CTA row (mobile-primary) */
    scoreCta: string;
    guarantee: string;
    /** WhatsApp secondary CTA (replaces the old Telegram link) */
    secondaryCta: string;
    closing: string;
  };

  faq: {
    label: string;
    headline: string;
    items: { q: string; a: string }[];
    /** Explicit guarantee, shown near the FAQ as a banner card */
    guarantee: string;
    /** Closing WhatsApp line shown after the FAQ accordion */
    closingCta: string;
  };

  footer: {
    credit: string;
    location: string;
    tagline: string;
    waLabel: string;
    navHome: string;
    navScore: string;
  };
}

// ─── Shared data (identical across locales) ────────────────────────────────

// Real client quotes — ported from components/Proof.tsx CARDS. Kept in their
// original language (English) for both locales; these are verbatim reviews.
const TESTIMONIAL_ITEMS: TestimonialItem[] = [
  {
    quote: "Wow Maks — this is f***ing awesome!! I need to check properly on my laptop but I am amazed! You're a genius!! Thank you!!",
    author: "Corinna C.",
    role: "Verified client · UK",
  },
  {
    quote: "Maksym really took the time to understand our business requirements and came up with creative solutions that perfectly matched what we needed. He was very responsive and easy to work with throughout the entire process.",
    author: "Sophie M.",
    role: "Verified client · 5★",
  },
  {
    quote: "Excellent communication and very quick to understand what I was looking for. Delivered high-quality work with great attention to detail.",
    author: "Daniel R.",
    role: "Verified client · 5★",
  },
  {
    quote: "Maksym understood the brief quickly and delivered exactly what was needed. Communication was excellent throughout.",
    author: "Eleanor K.",
    role: "Verified client · 5★",
  },
  {
    quote: "Great communication, very responsive, and delivered the work on time with high quality. Would definitely work with him again.",
    author: "Rachel T.",
    role: "Verified client · 5★",
  },
  {
    quote: "Very easy to work with, excellent communication, and always available for feedback and revisions.",
    author: "Chris B.",
    role: "Verified client · 5★",
  },
  {
    quote: "Maksym delivered exactly what we needed. He was proactive with suggestions and very responsive throughout the project.",
    author: "Laura P.",
    role: "Verified client · 5★",
  },
  {
    quote: "You are so great to work with! Thank you so much for all your hard work and for being so patient with all of my changes.",
    author: "Michelle K.",
    role: "Verified client · 5★",
  },
  {
    quote: "Maksym was a fantastic partner on this project. His attention to detail and willingness to iterate until we got it just right made all the difference.",
    author: "David W.",
    role: "Verified client · 5★",
  },
  {
    quote: "Maksym is a great designer who listens carefully to what you need and delivers great results. Very responsive and professional.",
    author: "Anna G.",
    role: "Verified client · 5★",
  },
  {
    quote: "Maksym is very professional, responsive, and attentive to details. He really took the time to understand our brand and vision.",
    author: "Tom H.",
    role: "Verified client · 5★",
  },
  {
    quote: "Professional, creative, and great at understanding the business needs behind the design request. Communication was top-notch.",
    author: "Sarah L.",
    role: "Verified client · 5★",
  },
  {
    quote: "Maksym was a pleasure to work with and very very talented.",
    author: "James T.",
    role: "Verified client · 5★",
  },
];

// Service tags — ported from components/GotAProblem.tsx SERVICES. SEO-breadth
// keyword tags; kept in English for both locales.
const SERVICES_TAGS: string[] = [
  "WhatsApp Automation",
  "AI Customer Service",
  "Custom Automated Flows",
  "Voice Agents",
  "Lead Capture Automation",
  "Appointment Booking AI",
  "Multilingual Chatbots",
  "CRM Integration",
  "Financial Automation",
  "Email Automation",
  "24/7 AI Support",
  "Sales Funnel Automation",
  "eCommerce AI",
  "Real Estate Lead Capture",
  "Hospitality Automation",
  "Healthcare Patient Intake",
  "Legal Intake Automation",
  "Restaurant Reservation AI",
  "Beauty Salon Booking",
  "After-Hours AI Support",
  "Customer Journey Automation",
  "WhatsApp Business API",
  "AI Response Systems",
  "Conversion Optimisation",
  "Outbound AI Sequences",
  "Booking & Scheduling AI",
];

// ─── EN ─────────────────────────────────────────────────────────────────────

const PILLAR_PAINS_EN: [[string, string], [string, string], [string, string]] = [
  ["Lead response delay (>4h avg)", "Manual booking follow-up"],
  ["Knowledge lives in founder's head", "Meeting notes + action tracking"],
  ["Invoice & document processing", "Weekly reporting to stakeholders"],
];

const en: NewPageDict = {
  header: {
    ctaLabel: "Book the Map",
    aiMapLabel: "AI Map",
    blogLabel: "Blog",
  },

  hero: {
    eyebrow: "The founder bottleneck",
    // Option A (live):
    headlineLines: ["Your team isn't the bottleneck.", "You are."],
    // Option B (kept for future A/B — not used):
    //   headlineLines: ["You're the bottleneck.", "Let's find out what it costs."],
    // Option C (kept for future A/B — not used):
    //   headlineLines: ["You can't be everywhere.", "That's what it's costing you."],
    sub: "I find the one leak costing you the most — and plug it with AI that actually works. Or I tell you straight where AI isn't the answer.",
    primaryCta: "Get your Bottleneck Score",
    primaryMicrocopy: "2 minutes · free · no call",
    secondaryCta: "Book the Bottleneck Map",
    guarantee: "10× the value or you don't pay — and you keep the map.",
  },

  pain: {
    label: "Sound familiar?",
    headline: "Every decision still routes through you.",
    lines: [
      "Every decision routes through you — even the small ones.",
      "Three €20k deals are sitting in the pipeline because you didn't have time to review them this week.",
      "You win when you're in the room. You lose when you delegate it. But you can't be in four rooms at once.",
      "You tried an AI tool once. It gave a real client hallucinated garbage. Never again.",
    ],
    punch: "If you got hit by a bus tomorrow, does the business survive past Friday?",
    ctaLabel: "Find out what it's costing you — 2-min Bottleneck Score",
    closingLine: "None of this means you built it wrong. It means you built it — and now it needs you less.",
  },

  reframe: {
    label: "Before we talk about AI",
    headline: "You don't need another AI tool.",
    body: "Most AI advice right now is hype — and you can't automate chaos. The question isn't “which AI tool?” It's “what's actually worth fixing first?”",
    enemies: [
      {
        title: "AI hype",
        desc: "Gurus screaming “AI agents,” courses that hand you a chatbot that hallucinates in front of your clients.",
      },
      {
        title: "Deck consultants",
        desc: "Never run a real business. They hand you buzzwords, cash the check, and leave.",
      },
      {
        title: "Tool bloat",
        desc: "€2k/month in SaaS nobody logs into. You can't automate chaos — you have to fix it first.",
      },
    ],
    ctaLabel: "Get your Bottleneck Score",
  },

  belief: {
    label: "Why I do this",
    headline: "Most founders build a prison and call it a business.",
    body: "Throwing AI at a messy business doesn't fix it — it just scales the mess. I learned that the hard way, and nearly watched it crash. Now I help founders find the safest, highest-return first move — before they waste money building the wrong thing.",
    roleLine: "Operator, not consultant. I've been the trapped founder — this isn't theory for me.",
    signature: "— Maks Nedbailo, founder, Care Less",
  },

  map: {
    label: "The mechanism",
    headline: "The Bottleneck Map — 90 minutes, ROI-ranked.",
    body: "ROI-first diagnosis, not tools. Process before automation — you can't automate chaos. We spend 90 minutes mapping the 3 places where the business still runs through you — what each one costs, and what's actually worth fixing.",
    bullets: [
      "The 3 places everything still routes through you",
      "What each one is costing you — in time, money, or both",
      "What's worth automating, delegating, simplifying, or ignoring",
      "The one fix to start with — ranked by ROI",
      "Human + AI, never AI-first. Process before automation.",
    ],
    note: "Even Klarna went AI-first, hit a quality wall, and rehired humans. We start where they ended up.",
    sample: {
      docTitle: "Bottleneck Map",
      clientLabel: "[Your Business Name]",
      sessionLabel: "90-MIN SESSION OUTPUT",
      studioName: "Care Less",
      pillarLabels: ["Customer-Facing Communication", "Internal Knowledge & Ops", "Repeatable Execution"],
      pillarPains: PILLAR_PAINS_EN,
      pillarPrefix: (n, label) => `Area ${n} — ${label}`,
      colPain: "Problem",
      colLosingNow: "Losing Now",
      colFeasibility: "AI Feasibility",
      colPriority: "Priority",
      phase1Heading: "Recommended First Move",
      phase1Rec: "#1 — AI Lead Response System · WhatsApp + website · 24/7",
      phase1Timeline: "2–3 weeks",
      phase1IfProceed: "if you proceed",
      bleedLabel: "Example: leaking",
      bleedStat: "~€6,000/mo",
      bleedAnnual: "(~€72k/yr)",
      bleedDesc: (phase1Anchor) =>
        `This business leaks ~€6,000/mo (~€72k/yr) — direct costs plus wasted founder time (~21 hrs/wk). The first move targets the biggest leak (#1 — lead-response delay, ~€2,400/mo): ${phase1Anchor} one-time. Pays for itself in under 2 months — and the savings compound.`,
      bleedPhase1Label: "First move",
      bleedPayback: "Under 2 months",
      note: "Sample output — yours will be specific to your business.",
    },
    ctaLabel: (rate) => `Book the Map — founding rate ${rate}`,
  },

  proof: {
    label: "Proof",
    headline: "Real systems, live now.",
    sub: "Software in production, handling real conversations every day.",
    liveBadge: "LIVE",
    cases: [
      {
        name: "Amira for HC MedSpa",
        desc: "AI lead-response agent. Replies in 9 seconds across WhatsApp and the website.",
        tag: "UK MedSpa · Lead response",
        href: "/automations/hcmedspa",
      },
      {
        name: "Elena Hotel & SPA",
        desc: "AI agent handles booking requests and answers guest questions — 24/7 via WhatsApp and the website.",
        tag: "Hotel · Booking & Support",
        href: "https://bukovel-elena.com.ua/en/",
      },
      {
        name: "Voice AI on Site",
        desc: "Voice agent answers site visitor questions in real time — no forms, no waiting.",
        tag: "Demo · Voice Agent",
        href: VOICE_DEMO_ANCHOR,
      },
    ],
    industryLabel: "The same pattern, at scale",
    industry: [
      {
        name: "Klarna",
        desc: "Built an AI assistant that did the work of hundreds of agents — then rehired humans for the conversations that needed one.",
        tag: "Industry · in production",
      },
      {
        name: "IKEA",
        desc: "Automated routine customer questions, then retrained call-centre staff into higher-value advisory roles.",
        tag: "Industry · in production",
      },
      {
        name: "Octopus Energy",
        desc: "AI drafts replies in the company's own voice; human agents review and send. Speed of automation, judgment of a person.",
        tag: "Industry · in production",
      },
    ],
    ctaLabel: "See your own numbers in 2 minutes",
  },

  path: {
    label: "How this works",
    headline: "Three steps. You can stop after any of them.",
    steps: [
      {
        number: "01",
        title: "Bottleneck Score",
        badge: "Free · 2 minutes",
        desc: "A self-assessment. Estimates what your founder-bottleneck is costing you per month, and shows your #1 leak category.",
        ctaLabel: "Take it",
      },
      {
        number: "02",
        title: "Bottleneck Map",
        desc: "90 minutes, ROI-ranked. The exact map of where you're the bottleneck, what it's costing you, and what's worth fixing first.",
        ctaLabel: "Book",
        microcopy: "If I don't find €10,000+/year recoverable — refunded, and you keep the map.",
      },
      {
        number: "03",
        title: "First build",
        badge: "Scoped from your Map · 2–3 weeks",
        desc: "The fix the Map points to, built and live. Scoped, ROI-ranked, no scope creep.",
        note: "Unlocked by the Map.",
      },
    ],
    foundingLabel: "founding",
    capacityLine: (slotsOpen) =>
      `I build every project myself — only 5 slots per month. ${slotsOpen} of 5 still open.`,
  },

  testimonials: {
    label: "What it's like to work with me",
    headline: "Hear it from people who've worked with me.",
    sub: "Reliable, clear, and focused on the result — not the tooling.",
    items: TESTIMONIAL_ITEMS,
  },

  whyMe: {
    label: "Why me",
    headline: "Why this isn't another agency pitch.",
    colThem: "Them",
    colMe: "Care Less",
    rows: [
      ["Consultant with a deck", "Operator who's been the trapped founder"],
      ["“AI will transform everything”", "Here's where AI pays off — and where it doesn't"],
      ["Sells you tools", "Sells you clarity, then the one fix worth building"],
      ["Claims to know your industry", "Doesn't pretend to — and doesn't need to"],
    ],
  },

  services: {
    label: "Got a different problem? We've probably solved one like it",
    tags: SERVICES_TAGS,
    hoverCta: "Book the Map",
  },

  cta: {
    label: "Find your one leak",
    headline: "Find the leak. Fix it first. Or don't — your call.",
    sub: "90 minutes. One-page, ROI-ranked map of where your time, money, and founder-energy are leaking.",
    primaryCta: "Book the Bottleneck Map",
    scoreCta: "Get your Bottleneck Score",
    guarantee: "10× the value, or you don't pay — and you keep the map either way.",
    secondaryCta: "Quick question? WhatsApp me",
    closing: "If there's no clear opportunity, I'll tell you. That's part of the work.",
  },

  faq: {
    label: "FAQ",
    headline: "Before you book",
    items: [
      {
        q: "Is this just a sales call?",
        a: "No. It's 90 minutes of real diagnostic work. You'll leave with a one-page map even if we never work together again. If there's no clear opportunity, I'll tell you straight — that's part of the deal.",
      },
      {
        q: "Why isn't this free?",
        a: "Because it's 90 minutes of focused, one-on-one diagnostic work — not a generic quiz or a sales script. Free things get a template; paid things get my full attention on your numbers. And the risk sits with me: if I don't find at least €10,000/year in recoverable cost, the session is refunded and you keep the map anyway.",
      },
      {
        q: "What's the Bottleneck Score?",
        a: "A free 2-minute self-assessment. It estimates what your founder-bottleneck is costing per month and shows your #1 leak category. No call, no obligation — the Map makes it exact.",
      },
      {
        q: "What if AI isn't the answer for my business?",
        a: "Then I'll tell you that, plainly. Sometimes the highest-ROI fix is a process change or a hire — not software. I'd rather lose a sale than oversell you something you don't need.",
      },
      {
        q: "What do I actually walk away with?",
        a: "A one-page, ROI-ranked map: the 3 areas where you're the bottleneck, what each is costing you, what's worth automating / delegating / simplifying / ignoring, and the one fix to start with.",
      },
      {
        q: "Who is this for?",
        a: "Owner-operated businesses around €3–10M revenue, 20–50 staff, where the founder is still the operating system — every decision routes through you, you decide alone, and you have real budget.",
      },
      {
        q: "Who is this NOT for?",
        a: "Solopreneurs under €1M (no team to free up), and 100–1000-employee companies (committee decisions, 6-month cycles — a different process entirely). If that's you, this probably isn't the right fit yet.",
      },
      {
        q: "Will it sound like a robot?",
        a: "No. It's trained on YOUR voice, YOUR answers, YOUR way of talking to customers. Most people can't tell the difference.",
      },
      {
        q: "How much time and money can I realistically save?",
        a: "Most clients recover 15–30 hours per month in manual follow-ups and missed-message handling. In revenue terms, capturing even 3–4 leads per month that would have gone unanswered typically pays for the entire system — often within the first week.",
      },
      {
        q: "How long does it take to see real results?",
        a: "Most clients see their first captured lead within 48 hours of going live. Measurable response-time improvements are visible from day one. ROI typically shows up within the first 2–4 weeks.",
      },
      {
        q: "Will it work with the tools I already use?",
        a: "Yes. It integrates with WhatsApp, your website, Google Calendar, and most booking systems. We map your existing tools before building anything — the goal is to plug into what you already have, not force you to switch.",
      },
      {
        q: "What if it gives a wrong answer?",
        a: "It only answers from information you approve. Anything it's unsure about gets sent straight to you. It never gives medical, legal, or professional advice — just handles bookings, hours, location, and common questions. You stay in control.",
      },
      {
        q: "Is this just another expensive tool I'll have to manage myself?",
        a: "No. You don't manage anything. We build it, monitor it, and maintain it. Your only job is to keep doing what you do — we handle the rest. And the monthly cost is less than a part-time employee's weekly wage.",
      },
      {
        q: "Can I start small with just one process?",
        a: "Absolutely. Most clients start with one channel — usually WhatsApp — and expand from there once they see results. You don't have to automate everything on day one.",
      },
      {
        q: "How secure is my business data?",
        a: "Your business data stays within systems you control. We don't store customer conversations on external servers. Everything is built with privacy-first principles, and we're happy to walk you through the technical setup before we start.",
      },
      {
        q: "What does ongoing support look like after setup?",
        a: "We're available via WhatsApp for any issues that come up. Most clients need very little support after setup — but if something breaks or needs updating, we handle it fast. No ticket systems, no waiting in queues.",
      },
      {
        q: "I'm not techy. Will this be complicated for me?",
        a: "You won't touch any technology. We set it up, configure it, and test it. You just keep doing what you're already doing.",
      },
      {
        q: "What's the difference between cheap off-the-shelf AI tools and what you build?",
        a: "Off-the-shelf tools are built for everyone, which means they work perfectly for no one. What we build is trained specifically on your business: your services, your tone, your most common questions. The result is an assistant that sounds like you — not a generic chatbot that frustrates customers.",
      },
    ],
    guarantee: "If I don't find at least €10,000/year in recoverable cost, the session is refunded and you keep the map.",
    closingCta: "Still not sure? Message me on WhatsApp",
  },

  footer: {
    credit: "care less AI automation",
    location: "Santander, Spain",
    tagline: "ROI-first AI diagnosis for owner-led businesses. Honest about where AI helps — and where it doesn't.",
    waLabel: "Quick question? Message me on WhatsApp",
    navHome: "Home",
    navScore: "Bottleneck Score",
  },
};

// ─── ES ─────────────────────────────────────────────────────────────────────
//
// TODO: translate — every string below is the EN copy, used as a placeholder
// so the EN/ES toggle is fully wired before Maks approves Spanish copy.
// Positioning copy is locked; do not machine-translate it. Replace field by
// field (or the whole object) with reviewed Spanish translations.

const es: NewPageDict = {
  ...en,
};

// ─── Accessor ───────────────────────────────────────────────────────────────

export function getNewDict(locale: NewLocale): NewPageDict {
  return locale === "es" ? es : en;
}
