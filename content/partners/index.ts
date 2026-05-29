// ─── Types ────────────────────────────────────────────────────────────────────

export type MessengerChannel = "telegram" | "whatsapp";

export type PartnerData = {
  slug: string;

  partner: {
    name: string;
    role: string;
    photo: string | null;    // TODO:VLAD_PHOTO — path from /public
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
    /** Optional one-liner shown between subtext and CTA — quiet scarcity signal */
    scarcity?: string;
    cta: string;
  };

  // TODO:STATS — replace with verifiable, sourced numbers
  marqueeStats: string[];

  pricing: {
    phase1Anchor: string;
    workshopValueAnchor: string;
    totalValueAnchor: string;
  };

  booking: {
    schedulerUrl: string;
    /**
     * Which messenger to show as the secondary CTA.
     * Swap per-partner without changing any component code.
     * @default "telegram"
     */
    messengerChannel: MessengerChannel;
    /** Telegram deep-link — required when messengerChannel = "telegram" */
    telegram?: string;
    /** WhatsApp deep-link — required when messengerChannel = "whatsapp" */
    whatsapp?: string;
  };

  meta: {
    title: string;
    description: string;
    noindex: boolean;
  };
};

// ─── Registry ─────────────────────────────────────────────────────────────────

const registry: Record<string, () => Promise<{ default: PartnerData }>> = {};

export function registerPartner(
  slug: string,
  loader: () => Promise<{ default: PartnerData }>
) {
  registry[slug] = loader;
}
