"use client";

/**
 * Real brand logo files, referenced nominatively to identify the companies
 * in the proof and funder rows. Sources are the official SVGs on Wikimedia
 * Commons, stored under /public/logos.
 *
 * They are rendered white via a CSS `brightness(0) invert(1)` filter and
 * then dimmed by the caller's opacity, so a row of six different brand
 * palettes reads as one uniform credit line instead of clip art. Hellman &
 * Friedman has no Commons SVG, so it falls back to a text lockup — the
 * `Lockup` component below handles both cases with one API.
 */

interface LockupProps {
  /** Rendered height in px. Width is automatic. */
  height?: number;
  className?: string;
}

function ImageLockup({ src, alt, height = 18, className }: LockupProps & { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        height: `${height}px`,
        width: "auto",
        // Flatten every brand palette to pure white; the parent controls
        // the final tone with opacity.
        filter: "brightness(0) invert(1)",
      }}
    />
  );
}

function TextLockup({ text, height = 18, className }: LockupProps & { text: string }) {
  return (
    <span
      className={`font-label ${className ?? ""}`}
      style={{
        fontSize: `${Math.round(height * 0.62)}px`,
        letterSpacing: "0.4px",
        whiteSpace: "nowrap",
        color: "currentColor",
      }}
    >
      {text}
    </span>
  );
}

export const IkeaLockup = (p: LockupProps) => <ImageLockup {...p} src="/logos/ikea.svg" alt="IKEA" />;
export const OctopusLockup = (p: LockupProps) => <ImageLockup {...p} src="/logos/octopus.svg" alt="Octopus Energy" />;
export const VodafoneLockup = (p: LockupProps) => <ImageLockup {...p} src="/logos/vodafone.svg" alt="Vodafone" />;
export const AnthropicLockup = (p: LockupProps) => <ImageLockup {...p} src="/logos/anthropic.svg" alt="Anthropic" />;
export const BlackstoneLockup = (p: LockupProps) => <ImageLockup {...p} src="/logos/blackstone.svg" alt="Blackstone" />;
export const GoldmanLockup = (p: LockupProps) => <ImageLockup {...p} src="/logos/goldman.svg" alt="Goldman Sachs" />;
export const HellmanLockup = (p: LockupProps) => <TextLockup {...p} text="Hellman &amp; Friedman" />;

/** Proof-row marks, keyed by the company name used in copy.ts. */
export const PROOF_LOCKUPS: Record<string, (p: LockupProps) => JSX.Element> = {
  IKEA: IkeaLockup,
  "Octopus Energy": OctopusLockup,
  Vodafone: VodafoneLockup,
};

/** Funder marks for the $1.5B tile, keyed by the string in copy.ts. */
export const FUNDER_LOCKUPS: Record<string, (p: LockupProps) => JSX.Element> = {
  Anthropic: AnthropicLockup,
  Blackstone: BlackstoneLockup,
  "Goldman Sachs": GoldmanLockup,
  "Hellman & Friedman": HellmanLockup,
};
