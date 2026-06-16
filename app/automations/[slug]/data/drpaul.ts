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
      src: "/automations/drpaul/proof-1.png",
      caption: "The breastfeeding question — clinical safety, not guesswork.",
    },
    {
      src: "/automations/drpaul/proof-2.png",
      caption: "Tuesday in Waterford — schedule awareness, honest handoff.",
    },
    {
      src: "/automations/drpaul/proof-3.png",
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
    totalLabel: "~€8,000+",
  },

  trustPoints: [
    {
      title: "Clinical Safety First",
      body: "Aoife never gives medical advice and always hands off to Dr. Paul on clinical topics. Hard guardrails. No exceptions.",
    },
    {
      title: "24/7 Availability",
      body: "Instant replies on WhatsApp and Dr. Paul's website — after hours, between clinic days, bank holidays. No missed enquiry, ever.",
    },
    {
      title: "Multi-Clinic Schedule Awareness",
      body: "Aoife knows Dr. Paul's rotation across Dublin, Waterford, and Wexford, booking patients at the right clinic on the right day.",
    },
  ],

  offerSetupPrice: "€497",
  offerMonthlyPrice: "€197/mo",

  ctaCalendarUrl: "https://zcal.co/carelessmaks/free-audit",
  ctaWhatsappUrl: "https://wa.me/34641935207",
  ctaWhatsappMessage:
    "Hi Maks, I saw the Dr. Paul case study and I'd like one for my clinic.",
  formWebhookUrl: "", // TODO: paste n8n / make.com webhook URL here

  slotExpiryISO: "2026-06-01",

  enquirySubtext:
    "This is a working example built for a live aesthetics practice. If you run a clinic and want your own, the first build takes 48 hours.",

  formPrefill: {
    name: "Paul",
    business: "Dr. Paul Coughlan",
    website: "drpaul.ie",
    locations: "4",
  },

  mathParagraphOverride:
    "Across Dr. Paul's 4 clinics, at an average treatment value of €275 and a conservative 35% after-hours response gap, an aesthetics practice this size hands first-mover advantage to whoever answers first.",
  mathDisclaimerOverride:
    "Illustrative figures for a clinic of this size, based on Irish aesthetics industry benchmarks.",

  heroH1Override:
    "How We Reply to Aesthetic Clinic Leads in 9 Seconds. Competitors Take 19+ hours.",
  metaTitleOverride:
    "Case study: AI receptionist built for Dr. Paul Coughlan — care less AI automation",
  metaDescriptionOverride:
    "Built in 48 hours on public data only. A working example of a custom AI receptionist for an aesthetics clinic.",

  caseStudy: true,
  heroSubtext:
    "73% of customers buy from the first responder. We built Aoife for Dr. Paul Coughlan in 48 hours, using public information only — here's what a custom AI receptionist looks like for an aesthetics clinic.",
  caseStudyBand: "Built in 48 hours · Public data only · Part of the care less AI portfolio",
  agentRetiredNotice:
    "The live agent has been retired from this page. Below is the build we delivered for Dr. Paul Coughlan.",

  ctaLabel: "Next Step",
  ctaHeading: "Want one for your clinic?",
  ctaSubtext:
    "Aoife was a live demo built in 48 hours for Dr. Paul Coughlan, using public information only. She's since been retired from this page — but the same custom AI receptionist can be built for your aesthetics clinic, trained on your treatments, your team, and your tone.",
  ctaPrimaryLabel: "Book a 15-Min Call",
  ctaFooterLinkText: "Or explore the full offer → maksnedbailo.site",
  ctaFooterLinkHref: "https://www.maksnedbailo.site",

  connectoWidget: {
    src: "https://app.theconnecto.ai/widget.js",
    widgetKey: "a95e6cbd87c56d36c9b6554c5c2d439e",
    // HTTP calls go through the Vercel proxy (avoids CORS); the inline WS patcher
    // in page.tsx rewrites wss://[proxy] → wss://api.theconnecto.ai/api/v1 so
    // WebSocket connections bypass the proxy (Vercel drops WS upgrade requests).
    apiUrl: "https://www.maksnedbailo.site/api/connecto",
    title: "Aoife | Dr. Paul Aesthetics",
    subtitle: "Aesthetic guidance & booking",
    colour: "#022540",
    position: "right",
    language: "en",  // "ua" in Connecto dashboard default → corrected to English
  },
};

export default drpaul;
