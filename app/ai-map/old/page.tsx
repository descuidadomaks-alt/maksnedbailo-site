/**
 * /ai-map/old - archived copy of the previous AI Map sales page (DirectPage).
 *
 * It served as /ai-map until the free-permanent offer page was promoted over
 * it. Kept because it is the last version carrying the old founding-offer
 * mechanic: "Free until July 31, normally EUR 1,470, 10k guarantee".
 *
 * noindex, nofollow, and absent from app/sitemap.ts. Two reasons, and the
 * second is the important one:
 *  1. It is a near-duplicate of /ai-map and would compete with it.
 *  2. Its copy makes a price-and-deadline promise the live page no longer
 *     makes. An indexed page saying "free until July 31" contradicts a live
 *     page saying "free, permanently", and the crawler cannot tell which is
 *     current.
 *
 * It renders inside app/ai-map/layout.tsx like every other page in this
 * segment, so it keeps the shared header and locale provider.
 */
import type { Metadata } from "next";
import DirectPage from "../DirectPage";

export const metadata: Metadata = {
  title: "Archived AI Map offer | Care Less AI Automation",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AiMapOldPage() {
  return <DirectPage />;
}
