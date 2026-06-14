import type { PartnerData } from "./index";

const vlad: PartnerData = {
  slug: "vlad",

  partner: {
    name: "Vlad",
    role: "shaman & advisor",
    photo: null, // TODO:VLAD_PHOTO — drop headshot at /public/partners/vlad.jpg
    quote:
      "I've known Maks for years. When someone in my circle needs to think clearly about AI, I send them to him. He won't sell you anything you don't need.",
    introCircle: "Vlad's circle",
  },

  audience: {
    label: "Ukrainian entrepreneurs",
    revenueFloor: "€50k/month",
    languages: ["Ukrainian", "Russian", "English"],
  },

  hero: {
    eyebrow: "Personal invitation through Vlad's circle",
    headline: "The bottleneck isn't your team.\nIt's the five things only you can answer.",
    subheadline:
      "Map the gaps — and hand three of them to AI — in 90 minutes.",
    subtext:
      "A €1,470 Strategic AI Mapping session, gifted through Vlad. You walk away with a one-page map of your business ranked by ROI. If nothing's worth automating, I'll say so — and you keep the map.",
    cta: "Claim Your Complimentary Session",
  },

  marqueeStats: [
    "70% OF AI PROJECTS FAIL FROM POOR PROBLEM DEFINITION — GARTNER 2024",
    "COMPANIES THAT MAP BEFORE THEY BUILD SCALE 30% MORE OFTEN — MIT 2025",
    "MANUFACTURING AI CUTS DOWNTIME 20% ON AVERAGE — IEEE",
    "UKRAINIAN BUSINESSES LOST AN ESTIMATED QUARTER OR MORE OF KEY STAFF SINCE 2022 — NBU/MOE",
  ],

  pricing: {
    phase1Anchor: "€3–4k",
    workshopValueAnchor: "€1,470",
    totalValueAnchor: "€3,170+",
  },

  booking: {
    schedulerUrl: "https://zcal.co/carelessmaks/vlad-strategic-ai-map",
    messengerChannel: "telegram",
    telegram: "https://t.me/maksym_nedbailo",
  },

  meta: {
    title:
      "A Personal Invitation Through Vlad — Strategic AI Map · care less",
    description:
      "Vlad invited you. A 90-minute Strategic AI Mapping session for entrepreneurs who've lost team and need leverage. Normally €1,470, complimentary through Vlad's circle.",
    noindex: true,
  },
};

export default vlad;
