import type { ProspectData } from "../data";

/** Wrap £X,XXX/word and £X,XXX,XXX/word in <strong> */
function boldPounds(text: string): string {
  return text.replace(/(£[\d,]+(?:\/\w+)?)/g, "<strong>$1</strong>");
}

export default function SectionMath({ data }: { data: ProspectData }) {
  return (
    <section className="section-divider py-16 md:py-20">
      <div className="max-w-2xl mx-auto px-6">
        <p
          className="font-sora font-light text-[15px] md:text-[16px] text-fg/60 leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: boldPounds(data.mathParagraph) }}
        />
        <p className="font-sora text-[11px] text-fg/25 leading-relaxed">
          * {data.mathFootnote}
        </p>
      </div>
    </section>
  );
}
