/**
 * /new - 308 redirect to "/".
 *
 * This page WAS the V3 homepage. It was promoted to "/" (see app/page.tsx),
 * which imports app/new/_v2/V2HomeClient directly, so nothing here renders
 * any more. The redirect is permanent to fold any accumulated links and
 * crawl signal into the homepage instead of stranding them, and to make it
 * impossible for /new to be indexed as a duplicate of "/".
 *
 * app/new/layout.tsx was deleted with this change: it existed to give /new
 * its own locale provider, header and noindex metadata, all of which now
 * belong to app/page.tsx. Everything else under app/new/ is still live
 * source, imported by "/" and by /old2, and must not be removed:
 *   _v2/        the current homepage
 *   sections/   the archived Bottleneck Map homepage, served at /old2
 *   components/ shared header, ticker and dot field used by both
 *   lib/        shared locale context and i18n
 */
import { permanentRedirect } from "next/navigation";

export default function NewPage() {
  permanentRedirect("/");
}
