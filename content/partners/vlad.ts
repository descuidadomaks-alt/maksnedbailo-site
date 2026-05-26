import type { PartnerData } from "./index";

const vlad: PartnerData = {
  slug: "vlad",

  partner: {
    name: "Vlad",
    role: "shaman & advisor",
    photo: null, // TODO:VLAD_PHOTO — drop headshot at /public/partners/vlad.jpg
    quote:
      "I work with people building real things in hard conditions. Maks built me something I now use weekly. I asked him to share it with my circle.", // TODO:VLAD_QUOTE_FINAL
    introCircle: "Vlad's circle",
  },

  audience: {
    label: "Ukrainian entrepreneurs",
    revenueFloor: "€50k/month",
    languages: ["Ukrainian", "Russian", "English"],
  },

  hero: {
    eyebrow: "Personal invitation through Vlad's circle",
    headline: "Your team got smaller.\nYour business didn't get easier.",
    subheadline:
      "Here's what your company looks like with three AI systems handling what they used to.",
    subtext:
      "A 90-minute Strategic AI Mapping session — normally €1,500 — gifted to you through Vlad. By the end, you'll have a one-page Strategic AI Map of your business, ranked by ROI. No pitch deck. No filler. If there's nothing worth automating, I'll tell you and you keep the map.",
    cta: "Claim Your Complimentary Session",
  },

  // TODO:STATS — replace with verifiable, sourced numbers (Statista / McKinsey / EBRD)
  marqueeStats: [
    "73% OF UKRAINIAN BUSINESSES HAVE LOST KEY STAFF SINCE 2022",
    "ONE FOUNDER, ON AVERAGE, DOES THE WORK OF 3.4 ROLES",
    "AI HANDLES 80% OF FIRST-RESPONSE COMMUNICATION AT 5% OF HUMAN COST",
    "YOUR TEAM IS SHRINKING. YOUR AMBITION ISN'T.",
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
