import type { PartnerData } from "@/content/partners/index";
import PartnerMarquee from "../components/PartnerMarquee";
import SectionHero from "../components/SectionHero";
import SectionValueStack from "../components/SectionValueStack";
import AiMapMockup from "../components/AiMapMockup";
import InlineCTA from "../components/InlineCTA";
import SectionPillars from "../components/SectionPillars";
import SectionIndustryExamples from "../components/SectionIndustryExamples";
import SectionCost from "../components/SectionCost";
import SectionFit from "../components/SectionFit";
import SectionComparison from "../components/SectionComparison";
import SectionGuarantee from "../components/SectionGuarantee";
import SectionProcess from "../components/SectionProcess";
import SectionAbout from "../components/SectionAbout";
import SectionBorrowedProof from "../components/SectionBorrowedProof";
import SectionFAQ from "../components/SectionFAQ";
import SectionFinalCTA from "../components/SectionFinalCTA";
import SectionLeadMagnet from "../components/SectionLeadMagnet";

/**
 * Long-form partner page — all sections in full.
 * Accessible via /partners/[slug]?v=long
 * DO NOT delete or restructure — it's the preserved original variant.
 */
export default function LongPage({ data }: { data: PartnerData }) {
  return (
    <main className="min-h-screen">
      <PartnerMarquee data={data} />
      <SectionHero data={data} />
      <SectionValueStack data={data} />

      <div className="max-w-3xl mx-auto px-6 pt-16 pb-2">
        <p className="font-sora text-fg/30" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          Deliverable
        </p>
        <h2 className="font-playfair font-normal text-fg mt-3" style={{ fontSize: "clamp(24px, 3.4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}>
          What the Map Looks Like
        </h2>
      </div>
      <AiMapMockup />

      <InlineCTA data={data} location="after_value_stack" />
      <SectionPillars />
      <SectionIndustryExamples />
      <SectionCost />
      <SectionFit />
      <SectionComparison />
      <InlineCTA data={data} location="after_fit" />
      <SectionGuarantee />
      <SectionProcess data={data} />
      <SectionAbout data={data} />
      <SectionBorrowedProof />
      <InlineCTA data={data} location="after_proof" />
      <SectionFAQ data={data} />
      <SectionFinalCTA data={data} />
      <SectionLeadMagnet data={data} />
    </main>
  );
}
