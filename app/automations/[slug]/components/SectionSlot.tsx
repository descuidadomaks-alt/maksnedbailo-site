import type { ProspectData } from "../data";

function formatExpiry(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function SectionSlot({ data }: { data: ProspectData }) {
  const expiry = formatExpiry(data.slotExpiryISO);

  return (
    <section className="section-divider py-12 md:py-16">
      <div className="max-w-xl mx-auto px-6 text-center">
        {data.slotExpired ? (
          <p className="font-sora font-light text-[13px] text-fg/30 leading-relaxed">
            This demo ran live for {data.businessName} from 23 April to 7 May 2026.{" "}
            <a
              href={data.ctaCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent/60 hover:text-accent underline underline-offset-4 decoration-accent/20 transition-colors"
            >
              Want one built for your clinic? Book a call →
            </a>
          </p>
        ) : (
          <p className="font-sora font-light text-[13px] text-fg/30 leading-relaxed">
            I run 10 live demos at a time. This one is live until{" "}
            <span className="text-fg/50">{expiry}</span>. After that the slot
            rotates to the next clinic in the pipeline — this page stays up as a
            public case study.
          </p>
        )}
      </div>
    </section>
  );
}
