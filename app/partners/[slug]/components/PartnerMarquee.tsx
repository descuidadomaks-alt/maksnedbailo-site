import type { PartnerData } from "@/content/partners/index";

export default function PartnerMarquee({ data }: { data: PartnerData }) {
  const items = data.marqueeStats;
  const doubled = [...items, ...items];
  const sep = " ·· ";

  return (
    <div
      className="relative w-full overflow-hidden flex items-center"
      style={{
        height: "28px",
        background: "rgba(212,255,43,0.045)",
        borderBottom: "1px solid rgba(212,255,43,0.07)",
      }}
    >
      <div className="ticker-track whitespace-nowrap flex absolute top-0 left-0 h-full items-center">
        {doubled.map((msg, i) => (
          <span
            key={i}
            className="font-sora text-[9.5px] font-light text-accent/55 tracking-widest"
          >
            {msg}
            <span className="text-accent/20 mx-5">{sep}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
