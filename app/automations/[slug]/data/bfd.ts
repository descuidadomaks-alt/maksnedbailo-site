import type { ProspectData } from "./index";

const bfd: ProspectData = {
  slug: "bfd",
  createdAt: "2026-05-20",  // expiresAt auto-computed: 2026-06-03
  slotExpired: false,

  ownerFirstName: "Kambiz",
  businessName: "Beacon Face & Dermatology",
  heroDisplayName: "Kambiz",
  businessDomain: "beaconfaceandderm.ie",

  agentName: "Aisling",

  metrics: {
    responseTimeUs: "9 seconds",
    responseTimeThem: "19+ hours",
    monthlyLeak: "€3,200",
    yearlyLeak: "€145,000",
    locationCount: 2,
    avgTreatmentValue: "€450",
    afterHoursGap: "30%",
    benchmarkSource: "Irish premium aesthetics industry benchmarks",
  },

  proofScreenshots: [
    {
      src: "/automations/bfd/proof-1.png",
      caption: "The rhinoplasty enquiry — routes to Mr. Golchin without trying to be a surgeon.",
    },
    {
      src: "/automations/bfd/proof-2.png",
      caption: "AviClear vs Accutane — handles acne nuance like Dr. McVerry would.",
    },
    {
      src: "/automations/bfd/proof-3.png",
      caption: "\"Pregnant — can I get Profhilo?\" — safety first, every time.",
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

  offerSetupPrice: "€497",
  offerMonthlyPrice: "€197/mo",

  ctaCalendarUrl: "https://zcal.co/carelessmaks/free-audit",
  ctaWhatsappUrl: "https://wa.me/34641935207",
  ctaWhatsappMessage:
    "Hi Maks, I saw the personalised Aisling demo for BFD and I'm interested.",
  formWebhookUrl: "", // TODO: paste n8n / make.com webhook URL here

  slotExpiryISO: "2026-06-03",

  formPrefill: {
    name: "Kambiz",
    business: "Beacon Face & Dermatology",
    website: "beaconfaceandderm.ie",
    locations: "2",
  },

  enquirySubtext:
    "I built Aisling in 48 hours using only public info. She already knows your treatments, both clinics, your doctors, your \"positive aging\" voice — but she's not your team yet. Tell me what she got wrong.",

  trustPoints: [
    {
      title: "Doctor-Routing Built In",
      body: "Aisling knows which doctor handles what. Surgical enquiries → Mr. Golchin. Acne → Dr. McVerry. Skin protocols → Dr. Grimes. Aesthetic medicine → Dr. O'Shea. No more misrouted enquiries.",
    },
    {
      title: "Surgical Safety First",
      body: "Aisling never gives surgical advice and always hands rhinoplasty, blepharoplasty, and face lift enquiries directly to Mr. Golchin. Hard guardrails. No exceptions.",
    },
    {
      title: "Two-Clinic Awareness",
      body: "Aisling knows the Sandyford clinic runs Mon–Fri and Tralee runs Tue–Fri. She books patients at the right location with the right doctor on the right day.",
    },
  ],

  connectoWidget: {
    src: "https://app.theconnecto.ai/widget.js",
    widgetKey: "8d4a8b2814a34589370bc762d9d404b7",
    // HTTP calls go through the Vercel proxy (avoids CORS); WS patcher in
    // page.tsx rewrites wss://[proxy] → wss://api.theconnecto.ai/api/v1
    apiUrl: "https://www.maksnedbailo.site/api/connecto",
    title: "Aisling | Beacon Face & Derm",   // widget said "Aoife" — corrected
    subtitle: "Private aesthetic guidance",
    colour: "#321d5c",
    position: "right",
    language: "en",
  },
};

export default bfd;
