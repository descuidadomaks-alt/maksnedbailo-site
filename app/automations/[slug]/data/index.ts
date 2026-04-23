import hcmedspa from "./hcmedspa";

export type ProspectData = {
  slug: string;
  ownerFirstName: string;
  businessName: string;
  businessDomain: string;
  agentName: string;
  heroH1: string;
  heroSub: string;
  observation: string;
  mathParagraph: string;
  mathFootnote: string;
  proofScreenshots: { src: string; caption: string }[];
  offerSetupPrice: string;
  offerMonthlyPrice: string;
  offerGuarantee: string;
  slotExpiryISO: string;
  slotExpired: boolean;
  ctaCalendarUrl: string;
  ctaWhatsappUrl: string;
  connectoWidgetScript: string | null;
  offerAuditBody: string;
};

const REGISTRY: Record<string, ProspectData> = {
  hcmedspa,
};

export function getProspect(slug: string): ProspectData | null {
  return REGISTRY[slug] ?? null;
}

export function getAllSlugs(): string[] {
  return Object.keys(REGISTRY);
}
