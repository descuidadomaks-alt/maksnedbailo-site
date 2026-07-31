/**
 * Overtime OS mark — a clock face with hands mid-sweep, playing "overtime"
 * (the clock keeps running) against the OS/software framing. `badge` wraps
 * it in the charcoal rounded-square for light backgrounds (Nav); `mark`
 * drops the square for dark backgrounds (Footer) where the yellow strokes
 * already read clean against #171e19.
 */
export function ClockMark({
  className,
  variant = "badge",
}: {
  className?: string;
  variant?: "badge" | "mark";
}) {
  if (variant === "mark") {
    return (
      <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
        <circle cx="20" cy="20" r="15" stroke="#ffe17c" strokeWidth="2.5" />
        <path
          d="M20 11 L20 20 L26 24"
          stroke="#ffe17c"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <rect width="40" height="40" rx="10" fill="#171e19" />
      <circle cx="20" cy="20" r="13" stroke="#ffe17c" strokeWidth="2.5" />
      <path
        d="M20 10 L20 20 L27 24"
        stroke="#ffe17c"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
