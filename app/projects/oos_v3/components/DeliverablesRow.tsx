import { Phone, MessageSquare, Globe, Calendar, Repeat, Star } from "lucide-react";

const DELIVERABLES = [
  { label: "Calls", Icon: Phone },
  { label: "Texts", Icon: MessageSquare },
  { label: "Website leads", Icon: Globe },
  { label: "Scheduling", Icon: Calendar },
  { label: "Follow-up", Icon: Repeat },
  { label: "Reviews", Icon: Star },
];

/** Scannable icon+label row for the six things the system handles. */
export function DeliverablesRow() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-6">
      {DELIVERABLES.map(({ label, Icon }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-1.5 rounded-lg border border-[#171e19]/10 bg-[#f8f9fa] px-3 py-3 text-center"
        >
          <Icon className="h-5 w-5 text-[#171e19]" aria-hidden />
          <span className="text-xs font-semibold text-[#171e19]">{label}</span>
        </div>
      ))}
    </div>
  );
}
