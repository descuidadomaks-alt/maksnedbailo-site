/**
 * /new — permanently redirects to the homepage.
 * The Care Less "Bottleneck Map" page was promoted from /new to "/"
 * (app/page.tsx); the page component lives in ./NewHomeClient.tsx.
 */
import { permanentRedirect } from "next/navigation";

export default function NewPage() {
  permanentRedirect("/");
}
