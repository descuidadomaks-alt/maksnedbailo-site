import type { ProspectData } from "./index";

const hcmedspa: ProspectData = {
  slug: "hcmedspa",
  ownerFirstName: "Saad",
  businessName: "HC MedSpa",
  businessDomain: "hcmedspa.com",
  agentName: "Amira",
  heroH1: "Saad, meet Amira. She replies in 9 seconds — in HC MedSpa's voice.",
  heroSub:
    "Built in 48 hours using only public information from hcmedspa.com. No integration. No staff retraining. Try her live below ↓",
  observation:
    "I tested your website enquiry form on Saturday at 9:14pm. It's Tuesday morning. I'm still waiting. Your clients aren't waiting — they're booking with Skins Clinic, Lumiere, or whoever answers first.",
  mathParagraph:
    "Across your four clinics, at an average treatment value of £150 and a conservative 30% after-hours response gap, HC MedSpa is losing an estimated £2,700/month in first bookings alone. Factor in the lifetime value of a laser or injectable client and the figure crosses £100,000/year.",
  mathFootnote:
    "Benchmarks from UK MedSpa industry data; your actual numbers confirmed during the complimentary audit.",
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
  offerMonthlyPrice: "£397",
  offerGuarantee:
    "If Amira doesn't capture 20+ qualified enquiries in month one, full refund. You keep the transcripts and the agent stays live through month two at no charge.",
  slotExpiryISO: "2026-05-07",
  slotExpired: false,
  ctaCalendarUrl: "https://zcal.co/carelessmaks/free-audit",
  ctaWhatsappUrl: "https://wa.me/34641935207",
  connectoWidget: {
    src: "https://app.theconnecto.ai/widget.js",
    widgetKey: "0cc996d7d767b1b6178dc0e6fbc0ae76",
    apiUrl: "https://api.theconnecto.ai/api/v1",
    title: "Amira — HC MedSpa",
    subtitle: "Trained on your clinic. Replies in 9s.",
    colour: "#392f1c",
    position: "right",
    language: "en",
  },
  offerAuditBody:
    "I map exactly where leads disappear across your 4 clinics — before you spend a pound.",
};

export default hcmedspa;
