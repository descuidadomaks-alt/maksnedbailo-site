import type { ReactNode } from "react";

/**
 * A key headline word sitting on a rotated #ffe17c highlight bar (spec: 15°
 * marker behind the word; we keep the word upright and rotate the bar a few
 * degrees so it reads as a hand-drawn marker without becoming unreadable).
 * Only the bar rotates; the text stays level.
 */
export function Highlight({
  children,
  rotate = -3,
}: {
  children: ReactNode;
  rotate?: number;
}) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span
        aria-hidden
        className="absolute inset-x-[-0.12em] bottom-[0.08em] top-[0.14em] bg-[#ffe17c]"
        style={{ transform: `rotate(${rotate}deg)` }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}
