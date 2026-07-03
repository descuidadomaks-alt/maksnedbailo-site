/**
 * Brand-yellow map pin for the localization / scarcity lines (replaces the
 * plain marker dot). Sized in `em` by default so it always renders a touch
 * larger than the line's font-size and scales with it. The charcoal stroke +
 * inner dot show on light backgrounds; on the dark value-stack band they
 * recede and the solid yellow silhouette still reads clearly as a pin.
 */
export function GeoPin({ className = "h-[1.25em] w-[1.25em]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={`flex-none ${className}`}>
      <path
        d="M12 2.25c-3.73 0-6.75 3.02-6.75 6.75 0 4.85 6.75 12.75 6.75 12.75s6.75-7.9 6.75-12.75c0-3.73-3.02-6.75-6.75-6.75z"
        fill="#ffe17c"
        stroke="#171e19"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.4" fill="#171e19" />
    </svg>
  );
}
