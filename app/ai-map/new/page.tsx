/**
 * /ai-map/new - 308 redirect to /ai-map.
 *
 * This page was promoted to /ai-map (see app/ai-map/page.tsx), which imports
 * NewOfferClient from this folder directly. The redirect is permanent so any
 * links already pointing at /ai-map/new fold their crawl signal into the
 * real page, and so this route can never be indexed as a duplicate of it.
 *
 * Everything else in this folder is live source for /ai-map and must stay:
 *   NewOfferClient.tsx, sections/, lib/copy.ts
 */
import { permanentRedirect } from "next/navigation";

export default function AiMapNewPage() {
  permanentRedirect("/ai-map");
}
