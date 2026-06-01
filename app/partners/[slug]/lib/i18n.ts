/**
 * Short-template locale dictionary.
 *
 * EN is complete and production-ready.
 * UK strings are marked "TODO_UK — translate: «EN text»" so a native
 * Ukrainian copywriter can fill them in without hunting through components.
 *
 * Search the codebase for TODO_UK to find every untranslated string.
 */

import type { Locale } from "@/content/partners/index";

// ─── Industry data types ───────────────────────────────────────────────────────

export type IndustryRow = [string, string, string]; // [useCase, pain, result]

export interface IndustryTab {
  label: string;
  rows: [IndustryRow, IndustryRow, IndustryRow];
}

// ─── Full dictionary shape ─────────────────────────────────────────────────────

export interface ShortPageDict {
  header: {
    personalInvitation: string;
    langEn: string;
    langUk: string;
  };

  hero: {
    eyebrow: (partnerName: string) => string;
    // ── headline in use ──────────────────────────────────────────────────────
    headline: string;
    // alt A (swap below if Maks prefers):
    // "Everyone says 'use AI.' Almost no one tells you where it pays off in your business."
    // alt B:
    // "Before you automate anything, find what's actually worth automating."
    subheadline: (partnerName: string) => string;
    cta: string;
    daysLeft: (n: number) => string;
    offerCloses: string;
  };

  offer: {
    label: string;
    headline: (partnerName: string) => string;
    normallyLabel: string;
    normallyValue: string;
    giftedLine: (partnerName: string) => string;
    body: string;
    deliverableHeading: string;
    del1: string;
    del2: string;
    del3: string;
    sampleNote: string;
    stat1Value: string; stat1Label: string;
    stat2Value: string; stat2Label: string;
    stat3Label: (phase1Anchor: string) => string;
  };

  industry: {
    label: string;
    headline: string;
    sub: string;
    swipeHint: string;
    colUseCase: string;
    colPain: string;
    colResult: string;
    sources: string;
    tabs: {
      manufacturing: IndustryTab;
      professionalServices: IndustryTab;
      ecommerce: IndustryTab;
      investorOperators: IndustryTab;
    };
  };

  process: {
    label: string;
    headline: string;
    steps: { num: string; title: string; body: string; trust?: string }[];
  };

  proof: {
    label: string;
    headline: string;
    liveBadge: string;
    cases: { name: string; desc: string; tag: string; href: string }[];
  };

  cta: {
    headline: (partnerName: string) => string;
    sub: string;
    primaryCta: string;
    messengerLabel: (channel: "telegram" | "whatsapp") => string;
  };

  faq: {
    label: string;
    headline: string;
    items: {
      q: string;
      a: (vars: { partnerName: string; phase1Anchor: string }) => string;
    }[];
  };

  footer: {
    credit: string;
    location: string;
  };
}

// ─── EN dictionary ─────────────────────────────────────────────────────────────

const en: ShortPageDict = {
  header: {
    personalInvitation: "Personal Invitation",
    langEn: "EN",
    langUk: "UK",
  },

  hero: {
    eyebrow: (p) => `Personal invitation through ${p}'s circle`,
    headline:
      "See where AI actually pays off in your business — and where it doesn't.",
    subheadline: (p) =>
      `A 90-minute Strategic AI Map, ranked by ROI. Normally €1,500 — reserved for you through ${p}.`,
    cta: "Claim Your Complimentary Session",
    daysLeft: (n) => `${n} ${n === 1 ? "day" : "days"} left`,
    offerCloses: "offer closes June 30",
  },

  offer: {
    label: "The Offer",
    headline: (p) => `A €1,500 session — reserved through ${p}`,
    normallyLabel: "Normally",
    normallyValue: "€1,500",
    giftedLine: (p) => `Gifted to you through ${p}. No strings.`,
    body:
      "This isn't a discovery call with a pitch attached. It's a working session. You leave with a one-page map of every AI opportunity in your business — scored, ranked by ROI, and ready to act on. If nothing clears the bar, I'll tell you that. You keep the map either way.",
    deliverableHeading: "You walk away with",
    del1: "3 pillars of your operation scored for AI readiness",
    del2: "4–6 use cases ranked by estimated ROI",
    del3: "Phase 1 quoted (or an honest “not yet” — no charge either way)",
    sampleNote: "Sample output — yours will be specific to your business",
    stat1Value: "3", stat1Label: "pillars scored",
    stat2Value: "6", stat2Label: "use cases ranked",
    stat3Label: (p) => `${p} quoted`,
  },

  industry: {
    label: "Industry",
    headline: "What this looks like in your business",
    sub: "These are the exact patterns we map in the first 30 minutes.",
    swipeHint: "← swipe →",
    colUseCase: "Use case",
    colPain: "Pain it fixes",
    colResult: "Typical result",
    sources:
      "McKinsey The State of AI 2024–2025 · Deloitte smart-manufacturing 2025 · industry benchmarks · client-reported baselines. Figures are directional averages, not guarantees.",
    tabs: {
      manufacturing: {
        label: "Manufacturing",
        rows: [
          [
            "Quote/invoice acceleration",
            "\"Quotes take days; we lose jobs to whoever replies first.\"",
            "Invoice/quote prep ~15 min → ~1 min; ~3× throughput, same team",
          ],
          [
            "Production scheduling",
            "\"Scheduling lives in one head and breaks when they're out.\"",
            "Planning ~20 hrs/wk → ~5; on-time delivery 82% → 95%",
          ],
          [
            "After-sale routing",
            "\"Requests sit in an inbox; the wrong tech gets dispatched.\"",
            "60–70% tier-1 deflection; ~50% faster resolution",
          ],
        ],
      },
      professionalServices: {
        label: "Professional Services",
        rows: [
          [
            "Client intake & conflict check",
            "\"Onboarding eats half a day of partner time.\"",
            "Intake → engagement letter in minutes; up to ~30 hrs/wk saved on doc tasks",
          ],
          [
            "Document & proposal drafting",
            "\"Partners draft everything from scratch.\"",
            "~25% faster task completion",
          ],
          [
            "Billable-time capture",
            "\"We under-bill because nobody logs time accurately.\"",
            "5–8% billable-hour recovery",
          ],
        ],
      },
      ecommerce: {
        label: "E-commerce",
        rows: [
          [
            "Tier-1 support automation",
            "\"Support drowns in 'where's my order' tickets.\"",
            "60–70% of tier-1 tickets auto-resolved",
          ],
          [
            "Personalisation / recommendations",
            "\"Generic storefront leaves revenue on the table.\"",
            "Engaged-chat shoppers convert ~2–4× more",
          ],
          [
            "SKU launch copy",
            "\"Listing copy bottlenecks every launch.\"",
            "Launch copy in N languages in hours, not weeks",
          ],
        ],
      },
      investorOperators: {
        label: "Investor-Operators",
        rows: [
          [
            "Deal sourcing / underwriting",
            "\"Good deals get missed in the pile.\"",
            "~3–4× more deals screened, same team",
          ],
          [
            "Portfolio digest",
            "\"Can't see across companies without chasing each one.\"",
            "Weekly cross-portfolio digest; ~6–10 hrs/wk recovered",
          ],
          [
            "Asset / property ops",
            "\"Manual ops drag NOI.\"",
            "Up to ~10% NOI improvement (directional)",
          ],
        ],
      },
    },
  },

  process: {
    label: "Process",
    headline: "How it works",
    steps: [
      {
        num: "01",
        title: "Book",
        body: "Pick a 90-minute slot. Answer 4 pre-call questions so I show up prepared, not generic.",
      },
      {
        num: "02",
        title: "Map",
        body: "We go through your business across 3 pillars. I score it live, in front of you, on a shared screen.",
      },
      {
        num: "03",
        title: "Receive",
        body: "The Strategic AI Map lands within 48 hours — a proper document, not rough notes. Phase 1 quoted if it's worth building.",
        trust: "We do the final analysis after the call. You get a document, not rough notes.",
      },
    ],
  },

  proof: {
    label: "Proof",
    headline: "Live builds",
    liveBadge: "LIVE",
    cases: [
      {
        name: "Amira for HC MedSpa",
        desc: "AI lead-response agent. Replies in 9 seconds across WhatsApp and the website.",
        tag: "UK MedSpa · Lead response",
        href: "/automations/hcmedspa",
      },
      {
        name: "Cosmetic Suite",
        desc: "WhatsApp + Instagram lead capture. Qualification and booking, automated.",
        tag: "Aesthetic clinic · Lead capture",
        href: "/automations/cosmeticsuite",
      },
    ],
  },

  cta: {
    headline: (p) => `${p} sent you here for a reason.`,
    sub: "The map is yours either way.",
    primaryCta: "Claim Your Complimentary Session",
    messengerLabel: (channel) =>
      channel === "telegram" ? "Message on Telegram first" : "Message on WhatsApp first",
  },

  faq: {
    label: "Questions",
    headline: "Before you book",
    items: [
      {
        q: "What does the map actually look like?",
        a: () =>
          "It's a one-page scored document. Three pillars of your business (customer-facing comms, internal knowledge, repeatable execution), each broken into pain points. Each gets an AI-feasibility score and an estimated ROI. You leave with 4–6 ranked use cases and a clear recommendation on Phase 1 — or an honest 'not yet' if none of them clear the bar.",
      },
      {
        q: "Who is this for — and who isn't it?",
        a: () =>
          "It works if you're running a business doing €50k–€200k+ per month, you can act inside 30 days, and you want numbers, not hype. It doesn't work if your business is under €30k/month (the Phase 1 ROI math doesn't support it yet), or if every decision needs six people in the room.", // NOTE: €-thresholds wrapped in TODO comment in SectionFit — pending math sign-off
      },
      {
        q: "How is this different from a consultancy deck or a ChatGPT demo?",
        a: () =>
          "A consultancy charges €8–30k and gives you a presentation. A ChatGPT demo is free and gives you vague excitement. This is 90 minutes and gives you a scored, ranked, ROI-mapped document — and a clear decision point on whether to build anything. If nothing clears the bar, you keep the map and owe nothing.",
      },
      {
        q: "What's the catch?",
        a: ({ partnerName, phase1Anchor }) =>
          `There isn't one in the way you're thinking. The session is complimentary through ${partnerName}. If something's worth building, I'll quote Phase 1 — typically ${phase1Anchor}, 2–3 weeks, Ukrainian dev capacity. If not, I'll say so. No pitch, no follow-up sequence, no proposal you didn't ask for.`,
      },
      {
        q: "Who's Maks?",
        a: () =>
          "Maks Nedbailo. Built DCoast as a design agency, watched founders drown in operations they couldn't delegate, pivoted to fix that one thing. Care Less is small — me plus a vetted Ukrainian dev network. Two live builds in production: Amira (UK MedSpa) and Cosmetic Suite. I won't sell you something you don't need.",
      },
    ],
  },

  footer: {
    credit: "care less AI automation",
    location: "Santander, Spain",
  },
};

// ─── UK dictionary ─────────────────────────────────────────────────────────────
// ALL strings below are placeholders for native Ukrainian translation.
// Search: TODO_UK
// DO NOT machine-translate persuasive copy — it loses punch.
// Send this file (or the list at the bottom of the README) to a native copywriter.

const uk: ShortPageDict = {
  header: {
    personalInvitation: "TODO_UK — translate: «Personal Invitation»",
    langEn: "EN",
    langUk: "УК",
  },

  hero: {
    eyebrow: (p) => `TODO_UK — translate: «Personal invitation through ${p}'s circle»`,
    headline:
      "TODO_UK — translate: «See where AI actually pays off in your business — and where it doesn't.»",
    subheadline: (p) =>
      `TODO_UK — translate: «A 90-minute Strategic AI Map, ranked by ROI. Normally €1,500 — reserved for you through ${p}.»`,
    cta: "TODO_UK — translate: «Claim Your Complimentary Session»",
    daysLeft: (n) => `TODO_UK — translate: «${n} days left»`,
    offerCloses: "TODO_UK — translate: «offer closes June 30»",
  },

  offer: {
    label: "TODO_UK — translate: «The Offer»",
    headline: (p) => `TODO_UK — translate: «A €1,500 session — reserved through ${p}»`,
    normallyLabel: "TODO_UK — translate: «Normally»",
    normallyValue: "€1,500",
    giftedLine: (p) => `TODO_UK — translate: «Gifted to you through ${p}. No strings.»`,
    body: "TODO_UK — translate: «This isn't a discovery call with a pitch attached. It's a working session. You leave with a one-page map of every AI opportunity in your business — scored, ranked by ROI, and ready to act on. If nothing clears the bar, I'll tell you that. You keep the map either way.»",
    deliverableHeading: "TODO_UK — translate: «You walk away with»",
    del1: "TODO_UK — translate: «3 pillars of your operation scored for AI readiness»",
    del2: "TODO_UK — translate: «4–6 use cases ranked by estimated ROI»",
    del3: "TODO_UK — translate: «Phase 1 quoted (or an honest 'not yet' — no charge either way)»",
    sampleNote: "TODO_UK — translate: «Sample output — yours will be specific to your business»",
    stat1Value: "3", stat1Label: "TODO_UK — translate: «pillars scored»",
    stat2Value: "6", stat2Label: "TODO_UK — translate: «use cases ranked»",
    stat3Label: (p) => `TODO_UK — translate: «${p} quoted»`,
  },

  industry: {
    label: "TODO_UK — translate: «Industry»",
    headline: "TODO_UK — translate: «What this looks like in your business»",
    sub: "TODO_UK — translate: «These are the exact patterns we map in the first 30 minutes.»",
    swipeHint: "← TODO_UK →",
    colUseCase: "TODO_UK — translate: «Use case»",
    colPain: "TODO_UK — translate: «Pain it fixes»",
    colResult: "TODO_UK — translate: «Typical result»",
    sources:
      "McKinsey The State of AI 2024–2025 · Deloitte smart-manufacturing 2025 · industry benchmarks · client-reported baselines. TODO_UK — translate disclaimer suffix: «Figures are directional averages, not guarantees.»",
    tabs: {
      manufacturing: {
        label: "TODO_UK — translate: «Manufacturing»",
        rows: [
          [
            "TODO_UK — translate: «Quote/invoice acceleration»",
            "TODO_UK — translate: «Quotes take days; we lose jobs to whoever replies first.»",
            "Invoice/quote prep ~15 min → ~1 min; ~3× throughput, same team",
          ],
          [
            "TODO_UK — translate: «Production scheduling»",
            "TODO_UK — translate: «Scheduling lives in one head and breaks when they're out.»",
            "Planning ~20 hrs/wk → ~5; on-time delivery 82% → 95%",
          ],
          [
            "TODO_UK — translate: «After-sale routing»",
            "TODO_UK — translate: «Requests sit in an inbox; the wrong tech gets dispatched.»",
            "60–70% tier-1 deflection; ~50% faster resolution",
          ],
        ],
      },
      professionalServices: {
        label: "TODO_UK — translate: «Professional Services»",
        rows: [
          [
            "TODO_UK — translate: «Client intake & conflict check»",
            "TODO_UK — translate: «Onboarding eats half a day of partner time.»",
            "TODO_UK — translate: «Intake → engagement letter in minutes; up to ~30 hrs/wk saved on doc tasks»",
          ],
          [
            "TODO_UK — translate: «Document & proposal drafting»",
            "TODO_UK — translate: «Partners draft everything from scratch.»",
            "~25% faster task completion",
          ],
          [
            "TODO_UK — translate: «Billable-time capture»",
            "TODO_UK — translate: «We under-bill because nobody logs time accurately.»",
            "5–8% billable-hour recovery",
          ],
        ],
      },
      ecommerce: {
        label: "TODO_UK — translate: «E-commerce»",
        rows: [
          [
            "TODO_UK — translate: «Tier-1 support automation»",
            "TODO_UK — translate: «Support drowns in 'where's my order' tickets.»",
            "60–70% of tier-1 tickets auto-resolved",
          ],
          [
            "TODO_UK — translate: «Personalisation / recommendations»",
            "TODO_UK — translate: «Generic storefront leaves revenue on the table.»",
            "TODO_UK — translate: «Engaged-chat shoppers convert ~2–4× more»",
          ],
          [
            "TODO_UK — translate: «SKU launch copy»",
            "TODO_UK — translate: «Listing copy bottlenecks every launch.»",
            "TODO_UK — translate: «Launch copy in N languages in hours, not weeks»",
          ],
        ],
      },
      investorOperators: {
        label: "TODO_UK — translate: «Investor-Operators»",
        rows: [
          [
            "TODO_UK — translate: «Deal sourcing / underwriting»",
            "TODO_UK — translate: «Good deals get missed in the pile.»",
            "~3–4× more deals screened, same team",
          ],
          [
            "TODO_UK — translate: «Portfolio digest»",
            "TODO_UK — translate: «Can't see across companies without chasing each one.»",
            "TODO_UK — translate: «Weekly cross-portfolio digest; ~6–10 hrs/wk recovered»",
          ],
          [
            "TODO_UK — translate: «Asset / property ops»",
            "TODO_UK — translate: «Manual ops drag NOI.»",
            "Up to ~10% NOI improvement (directional)",
          ],
        ],
      },
    },
  },

  process: {
    label: "TODO_UK — translate: «Process»",
    headline: "TODO_UK — translate: «How it works»",
    steps: [
      {
        num: "01",
        title: "TODO_UK — translate: «Book»",
        body: "TODO_UK — translate: «Pick a 90-minute slot. Answer 4 pre-call questions so I show up prepared, not generic.»",
      },
      {
        num: "02",
        title: "TODO_UK — translate: «Map»",
        body: "TODO_UK — translate: «We go through your business across 3 pillars. I score it live, in front of you, on a shared screen.»",
      },
      {
        num: "03",
        title: "TODO_UK — translate: «Receive»",
        body: "TODO_UK — translate: «The Strategic AI Map lands within 48 hours — a proper document, not rough notes. Phase 1 quoted if it's worth building.»",
        trust: "TODO_UK — translate: «We do the final analysis after the call. You get a document, not rough notes.»",
      },
    ],
  },

  proof: {
    label: "TODO_UK — translate: «Proof»",
    headline: "TODO_UK — translate: «Live builds»",
    liveBadge: "LIVE",
    cases: [
      {
        name: "Amira for HC MedSpa",
        desc: "TODO_UK — translate: «AI lead-response agent. Replies in 9 seconds across WhatsApp and the website.»",
        tag: "UK MedSpa · Lead response",
        href: "/automations/hcmedspa",
      },
      {
        name: "Cosmetic Suite",
        desc: "TODO_UK — translate: «WhatsApp + Instagram lead capture. Qualification and booking, automated.»",
        tag: "Aesthetic clinic · Lead capture",
        href: "/automations/cosmeticsuite",
      },
    ],
  },

  cta: {
    headline: (p) => `TODO_UK — translate: «${p} sent you here for a reason.»`,
    sub: "TODO_UK — translate: «The map is yours either way.»",
    primaryCta: "TODO_UK — translate: «Claim Your Complimentary Session»",
    messengerLabel: (channel) =>
      channel === "telegram"
        ? "TODO_UK — translate: «Message on Telegram first»"
        : "TODO_UK — translate: «Message on WhatsApp first»",
  },

  faq: {
    label: "TODO_UK — translate: «Questions»",
    headline: "TODO_UK — translate: «Before you book»",
    items: [
      {
        q: "TODO_UK — translate: «What does the map actually look like?»",
        a: () => "TODO_UK — translate FAQ answer 1 (EN: «It's a one-page scored document…»)",
      },
      {
        q: "TODO_UK — translate: «Who is this for — and who isn't it?»",
        a: () => "TODO_UK — translate FAQ answer 2 (EN: «It works if you're running a business doing €50k–€200k+…»)",
      },
      {
        q: "TODO_UK — translate: «How is this different from a consultancy deck or a ChatGPT demo?»",
        a: () => "TODO_UK — translate FAQ answer 3 (EN: «A consultancy charges €8–30k…»)",
      },
      {
        q: "TODO_UK — translate: «What's the catch?»",
        a: ({ partnerName, phase1Anchor }) =>
          `TODO_UK — translate FAQ answer 4 (EN: «There isn't one… complimentary through ${partnerName}… ${phase1Anchor}…»)`,
      },
      {
        q: "TODO_UK — translate: «Who's Maks?»",
        a: () => "TODO_UK — translate FAQ answer 5 (EN: «Maks Nedbailo. Built DCoast…»)",
      },
    ],
  },

  footer: {
    credit: "care less AI automation",
    location: "TODO_UK — translate: «Santander, Spain»",
  },
};

// ─── Exported getter ───────────────────────────────────────────────────────────

export const dict: Record<Locale, ShortPageDict> = { en, uk };

export function getDict(locale: Locale): ShortPageDict {
  return dict[locale];
}
