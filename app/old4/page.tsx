/**
 * Archived homepage: the Care Less V3 page ("Win more work, with less admin"),
 * served at "/" until 2026-10-28, when the care_less experience (/new12) became
 * the homepage. Kept as-is so nothing it links to breaks.
 *
 * Archives, oldest to newest, all noindex and all absent from the sitemap:
 *   /old   original site
 *   /old3  first Care Less homepage (HomePageClient)
 *   /old2  the "Bottleneck Map" homepage
 *   /old4  this page
 */
import type { Metadata } from "next";
import { NewLocaleProvider } from "../new/lib/locale";
import V2Header from "../new/_v2/components/V2Header";
import V2HomeClient from "../new/_v2/V2HomeClient";
import ScrollReveal from "@/app/partners/[slug]/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Archived homepage (Win more work) | Care Less AI Automation",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function ArchivedHomeV3() {
  return (
    <NewLocaleProvider>
      <V2Header />
      {/* top padding so the fixed header doesn't overlap content */}
      <div style={{ paddingTop: "76px" }}>
        <V2HomeClient />
      </div>
      <ScrollReveal />
    </NewLocaleProvider>
  );
}
