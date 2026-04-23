import type { ProspectData } from "../data";

export default function SectionObservation({ data }: { data: ProspectData }) {
  return (
    <section className="section-divider py-16 md:py-20">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p
          className="font-playfair italic text-[17px] md:text-[19px] text-fg/55 leading-relaxed"
        >
          &ldquo;{data.observation}&rdquo;
        </p>
      </div>
    </section>
  );
}
