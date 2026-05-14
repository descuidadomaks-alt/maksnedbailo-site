import type { ProspectData } from "../data";
import { getExpiryDate, formatExpiry } from "../data";

export default function SectionSlot({ data }: { data: ProspectData }) {
  const expiry = formatExpiry(getExpiryDate(data));

  return (
    <section className="section-divider py-14 md:py-18">
      <div className="max-w-xl mx-auto px-6 text-center">
        {data.slotExpired ? (
          <p className="font-sora font-light text-fg/30 leading-relaxed" style={{ fontSize: "13px" }}>
            This demo ran live for {data.businessName}.{" "}
            <a
              href={data.ctaCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent/55 hover:text-accent underline underline-offset-4 decoration-accent/20 transition-colors"
            >
              Want one built for your clinic? Book a call →
            </a>
          </p>
        ) : (
          <>
            <p className="font-sora font-light text-fg/28 leading-relaxed mb-2" style={{ fontSize: "13px" }}>
              Demo page live until{" "}
              <span className="text-fg/50">{expiry}</span>.{" "}
              After that, the slot rotates to the next clinic — this page stays
              up as a public case study.
            </p>
            <p className="font-sora font-light text-fg/18 leading-relaxed" style={{ fontSize: "12px" }}>
              I run 10 live demos at a time. Spots refresh as clients close.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
