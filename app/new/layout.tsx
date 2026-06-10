/**
 * Standalone layout for /new — the Care Less brand homepage.
 *
 * Lives OUTSIDE the (site) route group so it doesn't inherit
 * app/(site)/layout.tsx — that parent layout would add a second
 * AnnouncementBar and a second Nav, causing duplicate ticker + duplicate header.
 *
 * Provides: EN/UK locale context (NewLocaleProvider), the minimal fixed
 * header (NewHeader), and the [data-reveal] scroll-reveal observer
 * (ScrollReveal — reused from the partner short-page, identical IO logic).
 * Lenis smooth scroll is already mounted globally by the root layout.
 */
import type { ReactNode } from "react";
import { NewLocaleProvider } from "./lib/locale";
import NewHeader from "./components/NewHeader";

// Reuse the partner-page ScrollReveal (identical IntersectionObserver logic).
// The [slug] directory name is valid for module resolution; Next.js routing is separate.
import ScrollReveal from "@/app/partners/[slug]/components/ScrollReveal";

export default function NewLayout({ children }: { children: ReactNode }) {
  return (
    <NewLocaleProvider>
      <NewHeader />
      {/* top padding so the fixed header doesn't overlap content */}
      <div style={{ paddingTop: "76px" }}>{children}</div>
      <ScrollReveal />
    </NewLocaleProvider>
  );
}
