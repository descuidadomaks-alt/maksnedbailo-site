import type { Metadata } from "next";
export const metadata: Metadata = { robots: { index: false, follow: false } };
/** Original homepage — preserved at /old after homepage swap. */
import Hero from "@/components/Hero";
import GotAProblem from "@/components/GotAProblem";
import TheShift from "@/components/TheShift";
import TheProblem from "@/components/TheProblem";
import TheSolution from "@/components/TheSolution";
import Proof from "@/components/Proof";
import BotInAction from "@/components/BotInAction";
import TheOffer from "@/components/TheOffer";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function OldHomePage() {
  return (
    <>
      <main>
        <Hero />
        <TheShift />
        <TheProblem />
        <TheSolution />
        <Proof />
        <BotInAction />
        <TheOffer />
        <FAQ />
        <GotAProblem />
        <CTASection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
