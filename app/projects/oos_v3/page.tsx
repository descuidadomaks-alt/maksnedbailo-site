import { AuditProvider } from "./components/AuditContext";
import { AuditModal } from "./components/AuditModal";
import { TradesBar } from "./components/TradesBar";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { ProblemSection } from "./components/ProblemSection";
import { HowItWorks } from "./components/HowItWorks";
import { Deliverables } from "./components/Deliverables";
import { WhyNotSoftware } from "./components/WhyNotSoftware";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";

/**
 * oos_v3 — "anti-SaaS" Overtime OS landing-page variant. Opposite bet from
 * oos_v2 / oos_v2_1: no price anywhere, positioned as a premium done-for-you
 * managed service, single CTA (a free missed-call audit) instead of
 * self-serve pricing. No testimonials exist yet, so belief comes from the
 * demo video (plays freely, not gated behind the lead form — see Hero.tsx)
 * and the mechanism walkthrough (HowItWorks), not social proof.
 *
 * One capture flow only (AuditContext/AuditModal — a single-step form, not
 * the sibling pages' multi-step quiz) and no exit-intent popup, per the
 * brief's "one offer, one path, no choice overload." No geo spot-count
 * scarcity either (LocationContext/geoScarcity.ts) — that mechanism reads
 * too close to fake scarcity for this page's honesty bar; the only
 * exclusivity claim here is the flat, honest line in FinalCTA.tsx.
 *
 * Leads POST to /api/oos-lead (tagged page:"oos_v3", leadType:"audit"),
 * the same GoHighLevel webhook oos_v2/oos_v2_1 use — see that route, which
 * already whitelists both fields and needed no changes.
 */
export default function OosV3Page() {
  return (
    <AuditProvider>
      <TradesBar />
      <Nav />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <Deliverables />
        <WhyNotSoftware />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <AuditModal />
    </AuditProvider>
  );
}
