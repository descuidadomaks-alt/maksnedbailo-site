import Script from "next/script";
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

export default function HomePage() {
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

      {/* Connecto Chat Widget — testing, replaces WA button */}
      <Script
        src="https://app.theconnecto.ai/widget.js"
        strategy="afterInteractive"
        data-widget-key="0cc996d7d767b1b6178dc0e6fbc0ae76"
        data-api-url="https://api.theconnecto.ai/api/v1"
        data-title="Amira — HC MedSpa"
        data-subtitle="Trained on your clinic. Replies in 9s."
        data-colour="#392f1c"
        data-position="right"
        data-language="en"
        data-auto-open="true"
      />
    </>
  );
}
