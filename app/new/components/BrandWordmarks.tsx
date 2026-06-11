/**
 * Small text-based wordmarks for industry-name mentions (Bottleneck Map note,
 * Proof section's industry strip). Stylised lockups, not the official logos.
 */

export function KlarnaWordmark({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 72 20" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="72" height="20" rx="4" fill="#FFB3C7" />
      <text
        x="36" y="14.5"
        textAnchor="middle"
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight="700"
        fontSize="11"
        letterSpacing="0.3"
        fill="#0A0A0A"
      >
        Klarna
      </text>
    </svg>
  );
}

export function IkeaWordmark({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 72 20" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="72" height="20" rx="4" fill="#0058A3" />
      <text
        x="36" y="14.5"
        textAnchor="middle"
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight="800"
        fontSize="11"
        letterSpacing="0.5"
        fill="#FFCC00"
      >
        IKEA
      </text>
    </svg>
  );
}

export function OctopusWordmark({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 96 20" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="96" height="20" rx="4" fill="#E0218A" />
      <text
        x="48" y="14.5"
        textAnchor="middle"
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight="700"
        fontSize="10.5"
        letterSpacing="0.3"
        fill="#FFFFFF"
      >
        Octopus Energy
      </text>
    </svg>
  );
}
