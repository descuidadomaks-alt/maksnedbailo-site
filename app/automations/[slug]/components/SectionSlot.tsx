import type { ProspectData } from "../data";
import { getExpiryDate, formatExpiry } from "../data";
import SlotCountdown from "./SlotCountdown";

export default function SectionSlot({ data }: { data: ProspectData }) {
  const expiryDate = getExpiryDate(data);
  const expiry = formatExpiry(expiryDate);

  // Target: 23:59 BST on the expiry day (= 22:59 UTC, since BST = UTC+1 in summer)
  const targetMs = Date.UTC(
    expiryDate.getUTCFullYear(),
    expiryDate.getUTCMonth(),
    expiryDate.getUTCDate(),
    22, 59, 0,
  );

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
            <p className="font-sora font-light text-fg/35 leading-[1.8]" style={{ fontSize: "13px" }}>
              This personalised demo page stays live until{" "}
              <span className="text-fg/60 font-normal">{expiry}</span>.{" "}
              After that it will rotate to the next prospect.
            </p>
            <SlotCountdown targetMs={targetMs} />
          </>
        )}
      </div>
    </section>
  );
}
