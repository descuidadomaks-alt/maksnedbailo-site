import type { Flag } from "../lib/types";

const FLAG_STYLE: Record<Flag, { dot: string; text: string; label: string }> = {
  "🔴 ORDER NOW": { dot: "bg-red-500", text: "text-red-700", label: "Замовити зараз" },
  "🟡 ORDER SOON": { dot: "bg-amber-500", text: "text-amber-700", label: "Замовити скоро" },
  "🟢 OK": { dot: "bg-emerald-500", text: "text-emerald-700", label: "Достатньо" },
  "⚠ DATA": { dot: "bg-[var(--reorder-taupe)]", text: "text-[var(--reorder-fg-muted)]", label: "Немає даних" },
};

export function FlagBadge({ flag }: { flag: Flag }) {
  const s = FLAG_STYLE[flag];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium ${s.text}`}>
      <span className={`h-2 w-2 shrink-0 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
