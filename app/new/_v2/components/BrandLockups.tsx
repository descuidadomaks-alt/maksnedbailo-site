/**
 * Monochrome brand lockups for the proof and funder rows.
 *
 * Hand-set typographic wordmarks, NOT copies of the companies' official
 * logo files — the same approach already used in
 * app/new/components/BrandWordmarks.tsx. They render in currentColor so the
 * page can dim them to a uniform tone, which is what stops a row of
 * third-party marks reading as clip art (the previous coloured chips did).
 *
 * Each viewBox is sized to its own text so the marks optically match when
 * laid out at a shared height.
 */

interface LockupProps {
  className?: string;
  style?: React.CSSProperties;
}

function Wordmark({
  text,
  width,
  weight = 700,
  tracking = 0,
  family = "Helvetica, Arial, sans-serif",
  className,
  style,
}: LockupProps & { text: string; width: number; weight?: number; tracking?: number; family?: string }) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} 28`}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="21"
        fontFamily={family}
        fontWeight={weight}
        fontSize="24"
        letterSpacing={tracking}
        fill="currentColor"
      >
        {text}
      </text>
    </svg>
  );
}

export function IkeaLockup(p: LockupProps) {
  return <Wordmark {...p} text="IKEA" width={70} weight={800} tracking={1} />;
}

export function OctopusLockup(p: LockupProps) {
  return <Wordmark {...p} text="Octopus" width={104} weight={700} tracking={-0.4} />;
}

export function VodafoneLockup(p: LockupProps) {
  return <Wordmark {...p} text="vodafone" width={124} weight={700} tracking={-0.6} />;
}

export function AnthropicLockup(p: LockupProps) {
  return <Wordmark {...p} text="Anthropic" width={118} weight={500} tracking={-0.3} />;
}

export function BlackstoneLockup(p: LockupProps) {
  return <Wordmark {...p} text="Blackstone" width={134} weight={600} tracking={-0.2} family="Georgia, serif" />;
}

export function GoldmanLockup(p: LockupProps) {
  return <Wordmark {...p} text="Goldman Sachs" width={176} weight={500} tracking={-0.2} family="Georgia, serif" />;
}

export function HellmanLockup(p: LockupProps) {
  return <Wordmark {...p} text="Hellman &amp; Friedman" width={222} weight={500} tracking={-0.2} family="Georgia, serif" />;
}

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
