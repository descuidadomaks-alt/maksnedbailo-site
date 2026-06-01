// ─── Shared types ─────────────────────────────────────────────────────────────

export type MessengerChannel = "telegram" | "whatsapp";
export type Locale = "en" | "uk";

// ─── Long-form page (existing) ─────────────────────────────────────────────

export type PartnerData = {
  slug: string;

  partner: {
    name: string;
    role: string;
    photo: string | null;
    quote: string;
    introCircle: string;
  };

  audience: {
    label: string;
    revenueFloor: string;
    languages: string[];
  };

  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    subtext: string;
    scarcity?: string;
    cta: string;
  };

  marqueeStats: string[];

  pricing: {
    phase1Anchor: string;
    workshopValueAnchor: string;
    totalValueAnchor: string;
  };

  booking: {
    schedulerUrl: string;
    messengerChannel: MessengerChannel;
    telegram?: string;
    whatsapp?: string;
  };

  meta: {
    title: string;
    description: string;
    noindex: boolean;
  };
};

// ─── Short-form template config ────────────────────────────────────────────────
//
// Cloning a partner = create a new file exporting one object of this type.
// No code changes needed in any component.

export type ShortPartnerConfig = {
  slug: string;

  partnerName: string;
  /** Ukrainian nominative form — shown in bylines, captions. e.g. "Влад" */
  partnerNameUk?: string;
  /**
   * Ukrainian genitive form — used in sentences: "через Влада", "зарезервовано через Влада".
   * Falls back to partnerNameUk → partnerName if not set.
   */
  partnerNameGenitiveUk?: string;

  partnerTitle: string;
  partnerPhoto: string | null; // TODO: path from /public, e.g. /partners/vlad/photo.jpg

  /** Truthful, first-person referral quote */
  partnerQuote: string;

  messenger: {
    channel: MessengerChannel;
    /** Handle without leading @, e.g. "maksym_nedbailo" */
    handle: string;
  };

  /**
   * Default locale shown when the page loads.
   * Partner pages default "uk"; main-site clones default "en".
   */
  defaultLocale: Locale;

  /** ISO date "YYYY-MM-DD" — drives the countdown chip */
  offerDeadline: string;

  schedulerUrl: string;

  /** Shown in FAQ + offer anchor. Default: "€4,500" */
  phase1Anchor: string;
};

// ─── Registry helpers ──────────────────────────────────────────────────────────

const _longRegistry: Record<string, () => Promise<{ default: PartnerData }>> = {};
const _shortRegistry: Record<string, () => Promise<{ default: ShortPartnerConfig }>> = {};

export function registerPartner(slug: string, loader: () => Promise<{ default: PartnerData }>) {
  _longRegistry[slug] = loader;
}
export function registerShortPartner(slug: string, loader: () => Promise<{ default: ShortPartnerConfig }>) {
  _shortRegistry[slug] = loader;
}
