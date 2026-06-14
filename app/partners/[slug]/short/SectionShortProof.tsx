import type { ShortPartnerConfig } from "@/content/partners/index";
import type { ShortPageDict } from "../lib/i18n";
import ProofSection from "@/app/new/sections/ProofSection";

/**
 * Partner proof section — renders the exact same visual proof block as the
 * homepage (live-system mocks + "same pattern, at scale" industry strip),
 * fed by the partner dict so the copy stays localized (uk/en). The shared
 * component lives at app/new/sections/ProofSection.tsx.
 */
export default function SectionShortProof({
  d,
}: {
  config: ShortPartnerConfig;
  d: ShortPageDict;
}) {
  return <ProofSection proof={d.proof} />;
}
