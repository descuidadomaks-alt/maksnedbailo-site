import type { ProspectData } from "./index";

const drpaul: ProspectData = {
  slug: "drpaul",
  createdAt: "2026-05-19",  // expiresAt auto-computed: 2026-06-02
  slotExpired: false,

  ownerFirstName: "Paul",
  businessName: "Dr. Paul Coughlan",
  heroDisplayName: "Dr. Paul",
  businessDomain: "drpaul.ie",

  agentName: "Aoife",

  metrics: {
    responseTimeUs: "9 seconds",
    responseTimeThem: "19+ hours",
    monthlyLeak: "€2,475",
    yearlyLeak: "€105,000",
    locationCount: 4,
    avgTreatmentValue: "€275",
    afterHoursGap: "35%",
    benchmarkSource: "Irish aesthetics industry benchmarks",
  },

  proofScreenshots: [
    {
      src: null,  // TODO: capture Aoife conversation screenshot → /public/automations/drpaul/proof-1.png
      caption: "The breastfeeding question — clinical safety, not guesswork.",
    },
    {
      src: null,  // TODO: capture Aoife conversation screenshot → /public/automations/drpaul/proof-2.png
      caption: "Tuesday in Waterford — schedule awareness, honest handoff.",
    },
    {
      src: null,  // TODO: capture Aoife conversation screenshot → /public/automations/drpaul/proof-3.png
      caption: "Profhilo vs polynucleotides — treatment depth, natural vocabulary.",
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
    totalLabel: "~€14,000+",
  },

  trustPoints: [
    {
      title: "Clinical Safety First",
      body: "Aoife never gives medical advice and always hands off to Dr. Paul on clinical topics. Hard guardrails. No exceptions.",
    },
    {
      title: "24/7 Availability",
      body: "Instant replies on WhatsApp and your website — after hours, between clinic days, bank holidays. No missed enquiry, ever.",
    },
    {
      title: "Multi-Clinic Schedule Awareness",
      body: "Aoife knows your rotation across Dublin, Waterford, and Wexford. She books patients at the right clinic on the right day.",
    },
  ],

  offerSetupPrice: "€1,747",
  offerMonthlyPrice: "€457/mo",

  ctaCalendarUrl: "https://zcal.co/carelessmaks/free-audit",
  ctaWhatsappUrl: "https://wa.me/34641935207",
  ctaWhatsappMessage:
    "Hi Maks, I saw the personalised Aoife demo for Dr. Paul and I'm interested in the free audit.",
  formWebhookUrl: "", // TODO: paste n8n / make.com webhook URL here

  slotExpiryISO: "2026-06-01",

  formPrefill: {
    name: "Paul",
    business: "Dr. Paul Coughlan",
    website: "drpaul.ie",
    locations: "4",
  },

  // TODO: set widgetKey once Aoife agent is created in Connecto dashboard
  connectoWidget: null,
};

export default drpaul;
