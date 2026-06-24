/**
 * Monochrome line icons for the "works with the tools you already use" row.
 * Feather/Lucide-style strokes (1.75px, round caps) inside a yellow-tinted
 * badge — consistent weight instead of mismatched platform emoji.
 */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#ffe17c]/15 text-[#ffe17c]">
      {children}
    </span>
  );
}

export function CalendarIcon() {
  return (
    <Badge>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="5" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
        <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.75" />
        <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M7.5 13.5h2M11 13.5h2M14.5 13.5h2M7.5 17h2M11 17h2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    </Badge>
  );
}

export function PhoneIcon() {
  return (
    <Badge>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5.2 4h3.1l1.4 4.2-2.1 1.6c1 2.4 2.9 4.3 5.3 5.3l1.6-2.1L19 14.5v3.1c0 1-.8 1.8-1.8 1.7C10.6 18.8 5.2 13.4 4.7 7 4.6 6 4.2 4 5.2 4z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    </Badge>
  );
}

export function CrmIcon() {
  return (
    <Badge>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.75" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="currentColor" strokeWidth="1.75" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    </Badge>
  );
}
