/**
 * /ai-map/new — corrected offer page: the AI Map is free, permanently.
 *
 * Renders inside the existing app/ai-map/layout.tsx segment chrome
 * (DirectLocaleWrapper → shared header, Plausible + Clarity scripts,
 * ScrollReveal) — no separate layout.tsx here, which would double the
 * header. See app/ai-map/new/NewOfferClient.tsx for the page content.
 *
 * Noindexed for now: this is a companion experiment alongside /ai-map
 * (which still carries the old "Free until July 31 — normally €1,470,
 * 10k guarantee" framing, out of scope for this task per
 * docs/NEW-HOMEPAGE-V2-BRIEF.md). Once reviewed, either promote this over
 * /ai-map or fold its copy back in — both are separate follow-up calls.
 */
import type { Metadata } from "next";
import NewOfferClient from "./NewOfferClient";

const TITLE = "Free AI Map — 90 Minutes, No Deadline | Care Less AI Automation";
const DESCRIPTION =
  "A 90-minute working session that maps where your business is losing time and money, ranked by impact. Free, permanently — one-page document delivered within 48 hours.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://maksnedbailo.site/ai-map/new" },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://maksnedbailo.site/ai-map/new",
    type: "website",
    siteName: "Care Less AI Automation",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function AiMapNewPage() {
  return <NewOfferClient />;
}
