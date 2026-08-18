"use client";

/**
 * Real brand logo files, referenced nominatively to identify the companies
 * in the proof and funder rows. Official SVGs from Wikimedia Commons,
 * stored under /public/logos.
 *
 * NO white-out filter. An earlier version applied
 * `brightness(0) invert(1)` to unify the palette, which works for
 * transparent wordmarks but turns any logo with a filled background into a
 * solid white rectangle — IKEA's yellow panel and Goldman's square emblem
 * both rendered as blank boxes. Natural colour at slightly reduced opacity
 * is both correct and instantly recognisable.
 *
 * Sizing is per-logo because the aspect ratios are wildly different:
 * Anthropic's wordmark is 1024x115 (~8.9:1) and dominated the row at the
 * same height as the others, so it is capped by width, not height.
 */

interface LockupProps {
  /** Rendered height in px. Width is automatic unless maxWidth caps it. */
  height?: number;
  className?: string;
}

function ImageLockup({
  src,
  alt,
  height = 18,
  maxWidth,
  className,
}: LockupProps & { src: string; alt: string; maxWidth?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        height: `${height}px`,
        width: "auto",
        maxWidth: maxWidth ? `${maxWidth}px` : undefined,
        objectFit: "contain",
        opacity: 0.92,
      }}
    />
  );
}

function TextLockup({ text, height = 18, className }: LockupProps & { text: string }) {
  return (
    <span
      className={`font-label ${className ?? ""}`}
      style={{
        fontSize: `${Math.round(height * 0.72)}px`,
        letterSpacing: "0.5px",
        whiteSpace: "nowrap",
        color: "currentColor",
      }}
    >
      {text}
    </span>
  );
}

// ── Proof row: bigger, these carry the section ──
export const IkeaLockup = (p: LockupProps) => <ImageLockup {...p} src="/logos/ikea.svg" alt="IKEA" height={p.height ?? 26} />;
export const OctopusLockup = (p: LockupProps) => <ImageLockup {...p} src="/logos/octopus.svg" alt="Octopus Energy" height={p.height ?? 17} maxWidth={130} />;
export const VodafoneLockup = (p: LockupProps) => <ImageLockup {...p} src="/logos/vodafone.svg" alt="Vodafone" height={p.height ?? 22} maxWidth={120} />;

// ── Funder credit line: small, must all fit on one row ──
export const AnthropicLockup = (p: LockupProps) => <ImageLockup {...p} src="/logos/anthropic.svg" alt="Anthropic" height={p.height ?? 10} maxWidth={86} />;
export const BlackstoneLockup = (p: LockupProps) => <ImageLockup {...p} src="/logos/blackstone.svg" alt="Blackstone" height={p.height ?? 15} maxWidth={78} />;
export const GoldmanLockup = (p: LockupProps) => <ImageLockup {...p} src="/logos/goldman.svg" alt="Goldman Sachs" height={p.height ?? 18} />;
/** No Commons SVG exists; abbreviated so the credit row still fits. */
export const HellmanLockup = (p: LockupProps) => <TextLockup {...p} text="H&amp;F" height={p.height ?? 15} />;

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
