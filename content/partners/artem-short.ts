import type { ShortPartnerConfig } from "./index";

const artemShort: ShortPartnerConfig = {
  slug: "artem",

  partnerName: "Artem",
  partnerNameUk: "Артем",          // Ukrainian nominative — shown in bylines
  partnerNameGenitiveUk: "Артема", // Ukrainian genitive — "через Артема"

  partnerTitle: "Property Developer",
  partnerTitleUk: "Забудовник нерухомості",

  partnerPhoto: "/partners/artem/photo_artem.jpg",

  partnerQuote:
    "I've been friends with Maks for over 30 years. When someone in my circle needs to think clearly about AI, I send them to him. He won't sell you anything you don't need.",
  partnerQuoteUk:
    "Я дружу з Максом вже понад 30 років. Коли комусь із мого кола потрібно тверезо розібратися з ШІ, я відправляю їх до нього. Він не буде продавати вам те, що вам не потрібно.",

  messenger: {
    channel: "telegram",
    handle: "maksym_nedbailo",
  },

  defaultLocale: "uk",

  offerDeadline: "2026-06-30",

  schedulerUrl: "https://zcal.co/carelessmaks/ai-map",

  phase1Anchor: "€3–4k",
};

export default artemShort;
