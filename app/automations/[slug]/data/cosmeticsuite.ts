import type { ProspectData } from "./index";

const cosmeticsuite: ProspectData = {
  slug: "cosmeticsuite",
  createdAt: "2026-05-21",  // expiresAt auto-computed: 2026-06-04
  slotExpired: false,

  ownerFirstName: "Paul",
  businessName: "The Cosmetic Suite",
  heroDisplayName: "Dr. Paul",
  businessDomain: "thecosmeticsuite.ie",

  agentName: "Saoirse",

  metrics: {
    responseTimeUs: "9 seconds",
    responseTimeThem: "19+ hours",
    monthlyLeak: "€3,127",
    yearlyLeak: "€130,000",
    locationCount: 3,
    avgTreatmentValue: "€350",
    afterHoursGap: "30%",
    benchmarkSource: "Irish doctor-led aesthetics benchmarks",
  },

  proofScreenshots: [
    {
      src: "/automations/cosmeticsuite/proof-1.png",
      caption: "The breastfeeding question — clinical safety with continuity, not a dead-end handoff.",
    },
    {
      src: "/automations/cosmeticsuite/proof-2.png",
      caption: "Profhilo vs polynucleotides — answers like a senior nurse, not a sales bot.",
    },
    {
      src: "/automations/cosmeticsuite/proof-3.png",
      caption: "Surgical enquiry — knows when to confidently route to Dr. Paul.",
    },
  ],

  valueStack: {
    items: [
      { label: "Lead Leak Audit",               value: "€547"   },
      { label: "Done-For-You Setup (48hr)",      value: "€1,747" },
      { label: "Monthly Optimisation × 12",      value: "€5,484" },
      { label: "Competitor Response Comparison", value: "€227"   },
      { label: "Medical Safety Guardrails",      value: "€347"   },
      { label: "Staff Handover Script",          value: "€107"   },
    ],
    totalLabel: "~€8,000+",
  },

  trustPoints: [
    {
      title: "Smart Team Routing",
      body: "Saoirse routes by treatment type: anti-wrinkle and fillers to your doctors (legally required), advanced skin to Emma and the nursing team, surgical questions directly to Dr. Paul. No misrouted enquiries.",
    },
    {
      title: "Handles 80% Without Bailing",
      body: "Most chatbots dump everything on your team. Saoirse handles pricing, comparisons, schedules, suitability questions, and aftercare basics confidently. Only escalates for safety, medication, surgical, or specific medical questions.",
    },
    {
      title: "Three-Clinic Awareness",
      body: "Saoirse knows Malahide (Dublin flagship), Tramore (Waterford), and Limerick — books patients at the right clinic with Phorest integration.",
    },
  ],

  howItWorksSteps: [
    {
      num: "01",
      title: "Deep Research",
      body: "We analyse your public website, treatments, pricing, doctor and nurse team, and tone of voice across all three clinics.",
    },
    {
      num: "02",
      title: "Custom Training",
      body: "Saoirse learns your exact tone, routes by treatment type (anti-wrinkle to doctors, advanced skin to the nurse team, surgical to Dr. Paul), and handles 80%+ of enquiries without bailing to your team.",
    },
    {
      num: "03",
      title: "Deploy & Optimise",
      body: "Fully live on WhatsApp + website within 48 hours, with ongoing weekly optimisation based on real conversation data.",
    },
  ],

  offerSetupPrice: "€497",
  offerMonthlyPrice: "€197/mo",

  ctaCalendarUrl: "https://zcal.co/carelessmaks/free-audit",
  ctaWhatsappUrl: "https://wa.me/34641935207",
  ctaWhatsappMessage:
    "Hi Maks, I saw the personalised Saoirse demo for The Cosmetic Suite and I'm interested.",
  formWebhookUrl: "", // TODO: paste n8n / make.com webhook URL here

  slotExpiryISO: "2026-06-04",

  formPrefill: {
    name: "Paul",
    business: "The Cosmetic Suite",
    website: "thecosmeticsuite.ie",
    locations: "3",
  },

  enquirySubtext:
    "I built Saoirse in 48 hours using only public info. She already knows your treatments, three clinics, your team — but she's not your team yet. Tell me what she got wrong.",

  connectoWidget: {
    src: "https://app.theconnecto.ai/widget.js",
    widgetKey: "a7a0f6615376c91ca5a91e224d5043df",
    // HTTP calls go through the Vercel proxy (avoids CORS); WS patcher in
    // page.tsx rewrites wss://[proxy] → wss://api.theconnecto.ai/api/v1
    apiUrl: "https://www.maksnedbailo.site/api/connecto",
    title: "Saoirse | The Cosmetic Suite",
    subtitle: "Private aesthetic guidance",
    colour: "#8b644b",
    position: "right",
    language: "en",  // "ua" in Connecto dashboard default → corrected to English
  },
};

export default cosmeticsuite;
