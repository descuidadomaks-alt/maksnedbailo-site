import type { ProspectData } from "./index";

const hcmedspa: ProspectData = {
  slug: "hcmedspa",
  createdAt: "2026-04-23",  // expiresAt auto-computed: 2026-05-07
  slotExpired: false,

  ownerFirstName: "Saad",
  businessName: "HC MedSpa",
  businessDomain: "hcmedspa.com",

  agentName: "Amira",

  metrics: {
    responseTimeUs: "9 seconds",
    responseTimeThem: "19+ hours",
    monthlyLeak: "£2,700",
    yearlyLeak: "£100,000",
    locationCount: 4,
    avgTreatmentValue: "£150",
    afterHoursGap: "30%",
    benchmarkSource: "UK MedSpa industry benchmarks",
    // benchmarkUrl: "https://...",  // add source URL when verified
  },

  proofScreenshots: [
    {
      src: "/automations/hcmedspa/proof-1.png",
      caption: "The antibiotics question — clinical safety, not guesswork.",
    },
    {
      src: "/automations/hcmedspa/proof-2.png",
      caption: "Parul at Mill Hill — staff awareness, honest handoff.",
    },
    {
      src: "/automations/hcmedspa/proof-3.png",
      caption: "Morpheus8 vs microneedling — product depth, luxury vocabulary.",
    },
  ],

  offerSetupPrice: "£1,497",
  offerMonthlyPrice: "£397/mo",

  ctaCalendarUrl: "https://zcal.co/carelessmaks/free-audit",
  ctaWhatsappUrl: "https://wa.me/34641935207",
  ctaWhatsappMessage:
    "Hi Maks, I saw the personalized Amira demo for HC MedSpa and I'm interested in the free audit.",
  formWebhookUrl: "", // TODO: paste n8n / make.com webhook URL here

  slotExpiryISO: "2026-05-28",

  formPrefill: {
    name: "Saad",
    business: "HC MedSpa",
    website: "hcmedspa.com",
    locations: "4",
  },

  connectoWidget: {
    src: "https://app.theconnecto.ai/widget.js",
    widgetKey: "0cc996d7d767b1b6178dc0e6fbc0ae76",
    apiUrl: "https://www.maksnedbailo.site/api/connecto",
    title: "Amira — HC MedSpa",
    subtitle: "Trained on your clinic. Replies in 9s.",
    colour: "#392f1c",
    position: "right",
    language: "en",
  },
};

export default hcmedspa;
