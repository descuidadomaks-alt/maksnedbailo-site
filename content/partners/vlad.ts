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
      "A 90-minute Strategic AI Mapping session — normally €1,500 — gifted to you through Vlad. By the end, you'll have a one-page Strategic AI Map of your business, ranked by ROI. No pitch deck. No filler. If there's nothing worth automating, I'll tell you and you keep the map.",
    scarcity:
      "This offer is open through June 30, 2026. After that, Vlad's allocation closes.",
    cta: "Claim Your Complimentary Session",
  },

  marqueeStats: [
    "70% OF AI PROJECTS FAIL FROM POOR PROBLEM DEFINITION — GARTNER 2024",
    "COMPANIES THAT MAP BEFORE THEY BUILD SCALE 30% MORE OFTEN — MIT 2025",
    "MANUFACTURING AI CUTS DOWNTIME 20% ON AVERAGE — IEEE",
    "UKRAINIAN BUSINESSES LOST AN ESTIMATED QUARTER OR MORE OF KEY STAFF SINCE 2022 — NBU/MOE",
  ],

  pricing: {
    phase1Anchor: "€4,500",
    workshopValueAnchor: "€1,500",
    totalValueAnchor: "€3,200+",
  },

  booking: {
    schedulerUrl: "https://zcal.co/carelessmaks/vlad-strategic-ai-map",
    whatsapp:
      "https://wa.me/34641935207?text=Hi%20Maks%2C%20Vlad%20sent%20me.%20I%27d%20like%20to%20book%20the%20Strategic%20AI%20Map%20session.",
  },

  meta: {
    title:
      "A Personal Invitation Through Vlad — Strategic AI Map · care less",
    description:
      "Vlad invited you. A 90-minute Strategic AI Mapping session for entrepreneurs who've lost team and need leverage. Normally €1,500, complimentary through Vlad's circle.",
    noindex: true,
  },
};

export default vlad;
