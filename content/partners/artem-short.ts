import type { ShortPartnerConfig } from "./index";

const artemShort: ShortPartnerConfig = {
  slug: "artem",

  partnerName: "Artem",
  partnerNameUk: "Артем",          // Ukrainian nominative — shown in bylines
  partnerNameGenitiveUk: "Артема", // Ukrainian genitive — "через Артема"

  partnerTitle: "advisor & mentor",
  partnerTitleUk: "радник і ментор",

  partnerPhoto: "/partners/artem/photo_artem.jpg",

  partnerQuote:
    "I've been working alongside Maks for a while. When someone in my circle needs honest clarity on AI for their business, I send them to him.",
  partnerQuoteUk:
    "Я знайомий з Максом уже давно. Коли хтось із мого оточення потребує чіткого, чесного погляду на ШІ для свого бізнесу — я відправляю їх до нього.",

  messenger: {
    channel: "telegram",
    handle: "maksym_nedbailo",
  },

  defaultLocale: "uk",

  offerDeadline: "2026-06-30",

  schedulerUrl: "https://zcal.co/carelessmaks/ai-map",

  phase1Anchor: "€4,500",
};

export default artemShort;
