import {
  Phone,
  MessageSquare,
  Globe,
  Calendar,
  Repeat,
  Star,
  Megaphone,
  MousePointerClick,
  MessagesSquare,
  PhoneCall,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const CORE = [
  { label: "Calls", Icon: Phone },
  { label: "Texts", Icon: MessageSquare },
  { label: "Website leads", Icon: Globe },
  { label: "Scheduling", Icon: Calendar },
  { label: "Follow-up", Icon: Repeat },
  { label: "Reviews", Icon: Star },
];

// What Tier 2/3 unlock — communicated here (color + a quiet caption) instead
// of inside the pricing tables, which stay a clean, uniform list (see
// PricingTiers.tsx).
const ADD_ONS = [
  { label: "Ads", Icon: Megaphone },
  { label: "Landing page", Icon: MousePointerClick },
  { label: "Social + SMS", Icon: MessagesSquare },
  { label: "Voice agent", Icon: PhoneCall },
  { label: "Optimization", Icon: TrendingUp },
];

/**
 * Same tile for both rows — identical size/shape/border. The only
 * difference for an add-on tile is the icon's color (brand yellow instead
 * of neutral) and a small, low-opacity "Add-on" caption under the label.
 * The icon is the signal; the caption is a whisper, not a badge.
 */
function CapabilityTile({ label, Icon, addOn }: { label: string; Icon: LucideIcon; addOn?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-lg border border-[#171e19]/10 bg-[#f8f9fa] px-3 py-3 text-center">
      <Icon className={`h-5 w-5 ${addOn ? "text-[#ffe17c]" : "text-[#171e19]"}`} aria-hidden />
      <span className="text-xs font-semibold text-[#171e19]">{label}</span>
      {addOn && <span className="text-[9px] font-medium text-[#171e19]/35">Add-on</span>}
    </div>
  );
}

/** Scannable icon+label rows: the six core capabilities, then what Tier 2/3 add. */
export function DeliverablesRow() {
  return (
    <div className="mt-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-6">
        {CORE.map(({ label, Icon }) => (
          <CapabilityTile key={label} label={label} Icon={Icon} />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] font-medium text-[#171e19]/45">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#171e19]/30" aria-hidden />
          Included
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffe17c]" aria-hidden />
          Add-on (Leads &amp; Full Engine)
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
        {ADD_ONS.map(({ label, Icon }) => (
          <CapabilityTile key={label} label={label} Icon={Icon} addOn />
        ))}
      </div>
    </div>
  );
}
