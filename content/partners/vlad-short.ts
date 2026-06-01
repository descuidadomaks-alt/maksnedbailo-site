import type { ShortPartnerConfig } from "./index";

const vladShort: ShortPartnerConfig = {
  slug: "vlad",
  partnerName: "Vlad",
  partnerTitle: "shaman & advisor",
  partnerPhoto: null, // TODO:VLAD_PHOTO — drop headshot at /public/partners/vlad/photo.jpg

  partnerQuote:
    "I've known Maks for years. When someone in my circle needs to think clearly about AI, I send them to him. He won't sell you anything you don't need.",

  messenger: {
    channel: "telegram",
    handle: "maksym_nedbailo",
  },

  defaultLocale: "uk", // Vlad's circle is Ukrainian — change to "en" for main-site clones

  offerDeadline: "2026-06-30", // drives countdown chip; update per offer cycle

  schedulerUrl: "https://zcal.co/carelessmaks/vlad-strategic-ai-map",

  phase1Anchor: "€4,500",
};

export default vladShort;
