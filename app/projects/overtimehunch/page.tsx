import { GateProvider } from "./components/GateContext";
import { GateModal } from "./components/GateModal";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { ProofStrip } from "./components/ProofStrip";
import { ProblemSolution } from "./components/ProblemSolution";
import { DemoVideo } from "./components/DemoVideo";
import { BentoGrid } from "./components/BentoGrid";
import { HowItWorks } from "./components/HowItWorks";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";

/**
 * Single-page composition. Order IS the conversion funnel — do not reorder:
 * hero → proof → problem/solution → gated demo → features → how → guarantee.
 *
 * Testimonials (Section 7) is built (./components/Testimonials.tsx) but NOT
 * rendered: no real reviews exist, and the rule is no fabricated reviews. Drop
 * <Testimonials /> in here once real quotes land, and Section 8 carries the
 * close until then.
 */
export default function OvertimeHunchPage() {
  return (
    <GateProvider>
      <Nav />
      <main>
        <Hero />
        <ProofStrip />
        <ProblemSolution />
        <DemoVideo />
        <BentoGrid />
        <HowItWorks />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <GateModal />
    </GateProvider>
  );
}
