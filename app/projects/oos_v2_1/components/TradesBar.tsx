const TRADES = [
  "Roofers",
  "HVAC",
  "Contractors",
  "Plumbers",
  "Electricians",
  "Solar",
  "Remodelers",
  "Window Cleaners",
  "Landscapers",
  "Painters",
  "Garage Doors",
  "Pest Control",
  "Pool Service",
  "Flooring",
];

/**
 * Trades marquee, forked from app/projects/oos/components/TradesBar.tsx
 * (same technique: doubled content + translateX(-50%) for a seamless loop).
 * Hidden below `sm` on purpose — the mobile-first fold budget (headline,
 * subhead, video, CTA all visible on a 390px phone with no scroll) has no
 * room for a purely decorative 32px strip; it reappears once there's slack.
 */
export function TradesBar() {
  const items = [...TRADES, ...TRADES];

  return (
    <div className="relative hidden h-8 w-full overflow-hidden bg-[#0d110e] sm:block">
      <div className="oh-marquee-track flex h-full items-center whitespace-nowrap">
        {items.map((trade, i) => (
          <span key={i} className="flex items-center text-[10px] font-bold uppercase tracking-[0.25em]">
            <span className={trade === "Contractors" ? "text-[#ffe17c]" : "text-[#b7c6c2]/70"}>{trade}</span>
            <span className="mx-4 text-[#b7c6c2]/25">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
