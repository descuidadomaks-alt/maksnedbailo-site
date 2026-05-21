import type { ProspectData } from "./index";

const ediblehealth: ProspectData = {
  slug: "ediblehealth",
  createdAt: "2026-05-21",  // expiresAt auto-computed: 2026-06-04
  slotExpired: false,

  ownerFirstName: "Corinna",
  businessName: "Edible Health",
  heroDisplayName: "Corinna",
  businessDomain: "ediblehealth.co.uk",

  agentName: "Ellie",

  metrics: {
    responseTimeUs: "9 seconds",
    responseTimeThem: "19+ hours",
    monthlyLeak: "£1,840",
    yearlyLeak: "£22,000",
    locationCount: 1,
    avgTreatmentValue: "£58",
    afterHoursGap: "30%",
    benchmarkSource: "UK health supplement e-commerce benchmarks",
  },

  // Override the auto-generated "clinic / treatment" paragraph — doesn't fit
  // an e-commerce supplement brand.
  mathParagraphOverride:
    "With one online store, an average order value of £58, and a conservative 30% after-hours response gap, Edible Health is handing first-mover advantage to whoever answers their customers first.",

  proofScreenshots: [
    {
      src: null,
      caption: "Bovine vs marine — explains the science without reading from a textbook.",
    },
    {
      src: null,
      caption: "\"I'm 52, where do I start?\" — confident, personalised, sounds like the team.",
    },
    {
      src: null,
      caption: "Guide follow-up — bridges the gap between curious download and right product.",
    },
  ],

  valueStack: {
    items: [
      { label: "Lead Leak Audit",               value: "£397"   },
      { label: "Done-For-You Setup (48hr)",      value: "£1,747" },
      { label: "Monthly Optimisation × 12",      value: "£5,484" },
      { label: "Competitor Response Comparison", value: "£227"   },
      { label: "Guide Follow-up Sequence",       value: "£347"   },
      { label: "Reorder Nudge Automation",       value: "£197"   },
    ],
    totalLabel: "~£8,000+",
  },

  trustPoints: [
    {
      title: "Every Channel, Not Just the Website",
      body: "Ellie answers on Instagram DMs, Facebook Messenger, WhatsApp, and your website — same voice, same science, same patience at 9pm as at 9am. Help Scout handles your support tickets; Ellie handles the questions that never made it there.",
    },
    {
      title: "Knows the 30-Day Collagen Rhythm",
      body: "Collagen is a 30-day product. Ellie knows that. She follows up at the right moment — not aggressively, just helpfully. \"Hey, you're probably nearly out — here's your reorder in one tap.\" Quiet. Useful. Keeps customers coming back.",
    },
    {
      title: "Bridges Education to Purchase",
      body: "The free guides are smart — they build trust and grow the list. Ellie picks up where they leave off: a short follow-up sequence, in Edible Health's tone, that turns curious readers into confident buyers. No hard sell. No jargon.",
    },
  ],

  howItWorksSteps: [
    {
      num: "01",
      title: "Deep Research",
      body: "We go through your product range, the free guides, Corinna and Simon's story, your tone of voice across the site and socials — everything that makes Edible Health, Edible Health.",
    },
    {
      num: "02",
      title: "Custom Training",
      body: "Ellie learns your science, your language, and your values — human to human, no-BS, long game. She handles 80%+ of first-touch questions without passing the buck to your inbox.",
    },
    {
      num: "03",
      title: "Deploy & Optimise",
      body: "Live on WhatsApp + website within 48 hours. Each week we review real conversations and sharpen her — she gets better every week, just like a new team member would.",
    },
  ],

  offerSetupPrice: "£497",
  offerMonthlyPrice: "£197/mo",

  ctaCalendarUrl: "https://zcal.co/carelessmaks/free-audit",
  ctaWhatsappUrl: "https://wa.me/34641935207",
  ctaWhatsappMessage:
    "Alright Maks, I played with the Edible Health agent — let's talk.",
  formWebhookUrl: "", // TODO: paste n8n / make.com webhook URL here

  slotExpiryISO: "2026-06-04",

  formPrefill: {
    name: "Corinna",
    business: "Edible Health",
    website: "ediblehealth.co.uk",
    locations: "1",
  },

  enquirySubtext:
    "I built Ellie in 48 hours using only public info. She already knows your products, the science behind them, and Corinna and Simon's story — but she's not your brand yet. Tell me what she got wrong.",

  // Widget key to be added once the Edible Health agent is set up in Connecto.
  // Follow the standard checklist: verify agent name in data-title, language "en",
  // apiUrl through the Vercel proxy (/api/connecto).
  connectoWidget: null, // TODO: add ConnectoWidgetConfig once widget is ready
};

export default ediblehealth;
