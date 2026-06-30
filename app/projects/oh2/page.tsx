import { GateProvider } from "./components/GateContext";
import { GateModal } from "./components/GateModal";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { ProofStrip } from "./components/ProofStrip";
import { ProblemSolution } from "./components/ProblemSolution";
import { AntiTemplate } from "./components/AntiTemplate";
import { DemoVideo } from "./components/DemoVideo";
import { BentoGrid } from "./components/BentoGrid";
import { HowItWorks } from "./components/HowItWorks";
import { OfferStack } from "./components/OfferStack";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";

/**
 * oh2 — parallel variant of /projects/overtimehunch built around the
 * $499/mo AI-front-desk offer (no ads spend included). Single-page
 * composition. Order IS the conversion funnel — do not reorder:
 * hero → proof → problem/solution → anti-template wedge → gated demo →
 * features → how it works → value stack → guarantee.
 *
 * Testimonials (Section 7) is built (./components/Testimonials.tsx) but NOT
 * rendered: no real reviews exist, and the rule is no fabricated reviews.
 */
export default function Oh2Page() {
  return (
    <GateProvider>
      <Nav />
      <main>
        <Hero />
        <ProofStrip />
        <ProblemSolution />
        <AntiTemplate />
        <DemoVideo />
        <BentoGrid />
        <HowItWorks />
        <OfferStack />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <GateModal />
    </GateProvider>
  );
}
