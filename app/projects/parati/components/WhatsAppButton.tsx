import type { ReactNode } from "react";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      className={className}
      fill="currentColor"
    >
      <path d="M17.47 14.38c-.3-.15-1.74-.86-2-.96-.27-.1-.47-.15-.66.15-.2.3-.76.95-.93 1.15-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.5l-.56-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.74-.71 1.98-1.4.24-.69.24-1.28.17-1.4-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2.5C6.78 2.5 2.5 6.78 2.5 12.04c0 1.68.44 3.32 1.27 4.77L2.5 21.5l4.82-1.26a9.5 9.5 0 0 0 4.72 1.2h.01c5.26 0 9.54-4.28 9.54-9.54 0-2.55-.99-4.95-2.79-6.75a9.48 9.48 0 0 0-6.76-2.65zm0 17.4h-.01a7.9 7.9 0 0 1-4.02-1.1l-.29-.17-2.86.75.76-2.79-.19-.29a7.87 7.87 0 0 1-1.21-4.2c0-4.37 3.56-7.93 7.93-7.93 2.12 0 4.11.83 5.61 2.33a7.88 7.88 0 0 1 2.32 5.61c0 4.37-3.56 7.93-7.93 7.93z" />
    </svg>
  );
}

/**
 * Shared gold WhatsApp CTA. `variant` switches between the solid primary
 * fill and a quieter outline used on cards.
 */
export function WhatsAppButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2.5 rounded-full font-jost text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep";

  const styles =
    variant === "primary"
      ? "bg-gold px-7 py-3.5 text-ivory shadow-soft hover:bg-gold-deep hover:-translate-y-0.5"
      : "border border-gold/60 px-5 py-3 text-gold-deep hover:border-gold-deep hover:bg-gold/10";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      <WhatsAppGlyph className="h-4 w-4 shrink-0" />
      <span>{children}</span>
    </a>
  );
}

export { WhatsAppGlyph };
