/**
 * /score - 308 redirect to /ai-map.
 *
 * The Bottleneck Score quiz is retired. Its job, gathering a few facts and
 * handing back an initial estimate, moves to the Scout voice agent, so a
 * second self-serve diagnostic on the site would compete with the AI Map
 * rather than feed it.
 *
 * Redirect rather than delete: /score was indexed, carried priority 0.9 in
 * the sitemap, and was linked from the city landing pages and every blog
 * post. A 308 folds that signal into /ai-map, which is the closest offer,
 * instead of turning it into a 404. Those internal links were repointed at
 * /ai-map directly in the same change, so nothing on the site relies on this
 * hop; it exists for external links and for anything already in the index.
 *
 * app/score/layout.tsx was deleted with this change. app/score/lib/ and
 * app/score/components/ are deliberately KEPT and are no longer imported by
 * anything, so they add nothing to the bundle. quiz.ts holds the eight
 * questions, the tier thresholds and the revenue multipliers behind the
 * monthly-cost estimate, which is the model Scout needs to reproduce.
 */
import { permanentRedirect } from "next/navigation";

export default function ScorePage() {
  permanentRedirect("/ai-map");
}
