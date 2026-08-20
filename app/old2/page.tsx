/**
 * /old2 - archived copy of the "Bottleneck Map" homepage, which served as
 * "/" until the V3 page was promoted over it.
 *
 * Deliberately NOT inside the (site) route group. That group's layout adds
 * AnnouncementBar + NavNew, and this page renders its own fixed NewHeader,
 * so it would come out with two headers and two tickers. The homepage it
 * was copied from sat outside the group for exactly this reason.
 *
 * The older HomePageClient archive that used to occupy this route moved to
 * /old3 rather than being overwritten.
 *
 * Reference only. noindex, nofollow, and absent from app/sitemap.ts. It
 * shares most of its copy with the live homepage, so letting a crawler have
 * it would be handing Google a near-duplicate of "/".
 */
import type { Metadata } from "next";
import { NewLocaleProvider } from "../new/lib/locale";
import NewHeader from "../new/components/NewHeader";
import NewHomeClient from "../new/NewHomeClient";
import ScrollReveal from "@/app/partners/[slug]/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Archived homepage (Bottleneck Map) | Care Less AI Automation",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function Old2Page() {
  return (
    <NewLocaleProvider>
      <NewHeader />
      {/* top padding so the fixed header doesn't overlap content */}
      <div style={{ paddingTop: "76px" }}>
        <NewHomeClient />
      </div>
      <ScrollReveal />
    </NewLocaleProvider>
  );
}
