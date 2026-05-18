import hcmedspa from "./hcmedspa";
import drpaul from "./drpaul";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ConnectoWidgetConfig = {
  src: string;
  widgetKey: string;
  apiUrl: string;
  title: string;
  subtitle: string;
  colour: string;
  position: "left" | "right";
  language: string;
};

export type ProspectScreenshot = {
  /** Path from /public root. null = render a 375×600 placeholder until real screenshot is supplied. */
  src: string | null;
  caption: string;
};

export type ProspectMetrics = {
  /** e.g. "9 seconds" */
  responseTimeUs: string;
  /** e.g. "19+ hours" */
  responseTimeThem: string;
  /** Formatted, e.g. "£2,700" */
  monthlyLeak: string;
  /** Formatted, e.g. "£100,000" */
  yearlyLeak: string;
  /** Number of clinic / outlet locations */
  locationCount: number;
  /** e.g. "£150" */
  avgTreatmentValue: string;
  /** e.g. "30%" */
  afterHoursGap: string;
  /** Citation text shown in footnote, e.g. "UK MedSpa industry benchmarks" */
  benchmarkSource: string;
  /** Optional URL for the citation link */
  benchmarkUrl?: string;
};

export type TrustPoint = {
  title: string;
  body: string;
};

export type ValueStackItem = {
  label: string;
  value: string;
};

export type ProspectData = {
  slug: string;
  /**
   * ISO date (YYYY-MM-DD) when this demo was created.
   * expiresAt is auto-computed: createdAt + 14 days.
   */
  createdAt: string;
  /** Set true to freeze page as a public case study (widget + slot hidden). */
  slotExpired: boolean;

  // ── Prospect ──────────────────────────────────────────────────────────────
  ownerFirstName: string;
  businessName: string;
  businessDomain: string;
  /**
   * Optional short display name for the hero H1 greeting.
   * Defaults to businessName when omitted.
   * e.g. "Dr. Paul" when businessName is "Dr. Paul Coughlan"
   */
  heroDisplayName?: string;

  // ── Agent ─────────────────────────────────────────────────────────────────
  agentName: string;

  // ── Metrics — used to generate copy dynamically ───────────────────────────
  metrics: ProspectMetrics;

  // ── Proof screenshots (exactly 3 slots) ───────────────────────────────────
  proofScreenshots: [ProspectScreenshot, ProspectScreenshot, ProspectScreenshot];

  // ── Pricing ───────────────────────────────────────────────────────────────
  offerSetupPrice: string;   // "£1,497"
  offerMonthlyPrice: string; // "£397/mo"

  // ── Links ─────────────────────────────────────────────────────────────────
  ctaCalendarUrl: string;
  ctaWhatsappUrl: string;
  /** POST endpoint for the bottom-of-page enquiry form (n8n / make.com / etc.) */
  formWebhookUrl: string;

  // ── Per-prospect overrides ────────────────────────────────────────────────
  /**
   * Override the auto-computed expiry date (createdAt + 14 days).
   * ISO date string: "2026-05-28"
   */
  slotExpiryISO?: string;

  /** Pre-fill known values in the enquiry form for this prospect. */
  formPrefill?: {
    name?: string;
    business?: string;
    website?: string;
    locations?: string;
  };

  /** Pre-filled WhatsApp message body (URL-encoded by the component). */
  ctaWhatsappMessage?: string;

  /**
   * Override the 3 trust-card points.
   * Defaults to Clinical Safety / 24/7 Availability / Plugs Into Your Stack.
   */
  trustPoints?: [TrustPoint, TrustPoint, TrustPoint];

  /**
   * Override the value-stack line items and total label.
   * Defaults to the GBP hcmedspa values.
   */
  valueStack?: {
    items: ValueStackItem[];
    totalLabel: string;
  };

  // ── Connecto widget ───────────────────────────────────────────────────────
  connectoWidget: ConnectoWidgetConfig | null;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns the demo expiry Date — slotExpiryISO override, else createdAt + 14 days */
export function getExpiryDate(data: ProspectData): Date {
  if (data.slotExpiryISO) return new Date(data.slotExpiryISO);
  const d = new Date(data.createdAt);
  d.setDate(d.getDate() + 14);
  return d;
}

/** Formats a Date as "7 May 2026" */
export function formatExpiry(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Registry ─────────────────────────────────────────────────────────────────

const REGISTRY: Record<string, ProspectData> = {
  hcmedspa,
  drpaul,
};

export function getProspect(slug: string): ProspectData | null {
  return REGISTRY[slug] ?? null;
}

export function getAllSlugs(): string[] {
  return Object.keys(REGISTRY);
}
