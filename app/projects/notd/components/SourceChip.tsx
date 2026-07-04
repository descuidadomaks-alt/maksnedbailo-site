import type { LoadedSource } from "../lib/types";

const ROLE_LABELS: Record<string, string> = {
  orders: "Замовлення",
  products: "Товари",
  unknown: "Не розпізнано",
};

export function SourceChip({ source, onRemove }: { source: LoadedSource; onRemove?: () => void }) {
  const isError = !!source.error || source.role === "unknown";
  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${
        isError
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-emerald-200 bg-emerald-50 text-emerald-700"
      }`}
    >
      <span>{isError ? "✕" : "✓"}</span>
      <span className="font-medium">
        {source.error ? source.label : `${ROLE_LABELS[source.role] ?? source.role} — ${source.rowCount} рядків`}
      </span>
      {source.error && <span className="text-red-600">({source.error})</span>}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 text-current opacity-60 hover:opacity-100"
          aria-label="Видалити"
        >
          ×
        </button>
      )}
    </div>
  );
}
