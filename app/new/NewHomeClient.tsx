/**
 * Care Less brand homepage (client component) — served at "/" by
 * app/page.tsx; /new permanently redirects there.
 *
 * Built from the locked "Care Less" positioning (founder-bottleneck +
 * losing-deals + anti-hype + operator-not-consultant). EN default + ES toggle
 * (NewHeader, app/new/lib/locale.tsx). Routes to the Bottleneck Map via
 * CTA_TARGET (app/new/lib/config.ts).
 *
 * The previous homepage (app/(site)/HomePageClient.tsx) is archived at /old2.
 *
 * data-short-page activates the 2-font system (Roboto Mono titles/labels +
 * IBM Plex Sans body & numerals) — see app/globals.css [data-short-page].
 */
"use client";

import { useNewLocale } from "./lib/locale";
import { getNewDict } from "./lib/i18n";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

import Hero from "./sections/Hero";
import SoundFamiliar from "./sections/SoundFamiliar";
import Reframe from "./sections/Reframe";
import Belief from "./sections/Belief";
import BottleneckMap from "./sections/BottleneckMap";
import ProofSection from "./sections/ProofSection";
import ThePath from "./sections/ThePath";
import Testimonials from "./sections/Testimonials";
import WhyMe from "./sections/WhyMe";
import ServicesTicker from "./sections/ServicesTicker";
import FinalCTA from "./sections/FinalCTA";
import NewFAQ from "./sections/NewFAQ";
import NewFooter from "./sections/NewFooter";
import MobileCtaBar from "./components/MobileCtaBar";
import ElevatorField from "./components/ElevatorField";

export default function NewHomePage() {
  const { locale } = useNewLocale();
  const d = getNewDict(locale);

  return (
    <>
      <main data-short-page>
        <Hero d={d} />
        <SoundFamiliar d={d} />
        <Reframe d={d} />
        <ElevatorField>
          <Belief d={d} />
          <BottleneckMap d={d} />
        </ElevatorField>
        <ProofSection d={d} />
        <ThePath d={d} />
        <Testimonials d={d} />
        <WhyMe d={d} />
        <ServicesTicker d={d} />
        <FinalCTA d={d} />
      </main>
      <div data-short-page>
        <NewFAQ d={d} />
      </div>
      <NewFooter d={d} />
      <MobileCtaBar />
      <FloatingWhatsApp />
    </>
  );
}
