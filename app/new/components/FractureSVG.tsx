/**
 * Three hand-authored "fracture" crack patterns — one per enemy card in
 * Reframe. Each is a distinct line, not a repeated/generated texture.
 */
const FRACTURES = [
  // 0 — AI hype: single fracture from the top-right corner, branching down-left
  {
    main: "M300 0 L242 52 L208 68 L152 112 L128 158 L94 200",
    branches: ["M208 68 L252 98 L276 148", "M152 112 L112 94 L68 58"],
  },
  // 1 — Deck consultants: fracture from bottom-left, sharp angles up-right
  {
    main: "M0 200 L58 152 L82 120 L138 82 L172 42 L222 4",
    branches: ["M82 120 L42 102 L8 72", "M172 42 L208 66 L262 54"],
  },
  // 2 — Tool bloat: chaotic network spreading from center
  {
    main: "M152 0 L146 52 L172 92 L138 142 L160 200",
    branches: ["M172 92 L222 110 L282 94", "M138 142 L88 162 L48 196", "M146 52 L92 30 L28 46"],
  },
] as const;

export default function FractureSVG({ variant }: { variant: number }) {
  const f = FRACTURES[variant % FRACTURES.length];
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 300 200"
      preserveAspectRatio="xMidYMid slice"
    >
      <path d={f.main} fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1" strokeLinecap="round" />
      {f.branches.map((b, i) => (
        <path key={i} d={b} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75" strokeLinecap="round" />
      ))}
      <path d={f.main} fill="none" stroke="rgba(212,255,43,0.12)" strokeWidth="0.5" strokeDasharray="1 7" strokeLinecap="round" />
    </svg>
  );
}
