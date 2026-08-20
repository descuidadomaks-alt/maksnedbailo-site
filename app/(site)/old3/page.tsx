/**
 * /old3 - archived copy of the ORIGINAL homepage (HomePageClient), the one
 * that predates the "Bottleneck Map" page.
 *
 * It used to live at /old2. It moved here when the Bottleneck Map page was
 * itself archived and took the /old2 slot, so the archives now read oldest
 * to newest: /old, /old3, /old2, and the current homepage at "/".
 *
 * Reference only. noindex, nofollow - it must never compete with "/" for
 * the same terms.
 */
import type { Metadata } from "next";
import HomePageClient from "../HomePageClient";

export const metadata: Metadata = {
  title: "Archived homepage | Care Less AI Automation",
  robots: { index: false, follow: false },
};

export default function Old3Page() {
  return <HomePageClient />;
}
