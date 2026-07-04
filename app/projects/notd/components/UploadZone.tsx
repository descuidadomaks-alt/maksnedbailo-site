"use client";

import { useRef, useState } from "react";

export function UploadZone({ onFilesSelected }: { onFilesSelected: (files: File[]) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList).filter((f) => f.name.toLowerCase().endsWith(".xlsx"));
    if (files.length > 0) onFilesSelected(files);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-colors sm:p-12 ${
        isDragging
          ? "border-[var(--reorder-accent-deep)] bg-[var(--reorder-accent-soft)]"
          : "border-[var(--reorder-border)] bg-[var(--reorder-surface)] hover:border-[var(--reorder-accent)]"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <p className="reorder-display text-xl tracking-[0.04em] sm:text-2xl">
        Перетягніть файли .xlsx сюди
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--reorder-fg-muted)]">
        або натисніть, щоб обрати — до 2 файлів (замовлення + товари)
      </p>
    </div>
  );
}
