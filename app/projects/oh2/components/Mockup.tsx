/**
 * Abstract UI Mockup — browser frame + a "booked calendar" dashboard.
 * Every number here is GENERIC SAMPLE DATA. Never tie it to a real client.
 * The "Demo — sample data" label is mandatory and stays visible.
 */

const SLOTS = [
  { time: "9:00 AM", name: "Roof inspect — sample", tag: "Qualified" },
  { time: "11:30 AM", name: "Gutter clean — sample", tag: "Qualified" },
  { time: "2:00 PM", name: "Quote visit — sample", tag: "Booked" },
  { time: "4:15 PM", name: "Repair call — sample", tag: "Booked" },
];

export function Mockup() {
  return (
    <div className="oh-card overflow-hidden rounded-xl border border-[#171e19]/10 bg-white shadow-2xl">
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-[#171e19]/10 bg-[#f8f9fa] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-[#ffe17c]" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-3 truncate rounded bg-white px-3 py-1 text-xs text-[#171e19]/50">
          app.overtimehunch.com/calendar
        </span>
      </div>

      {/* body */}
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="oh-display text-xl text-[#171e19]">Today&apos;s booked jobs</p>
            <p className="text-xs text-[#171e19]/50">4 qualified appointments</p>
          </div>
          <span className="rounded-full bg-[#171e19] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ffe17c]">
            Demo — sample data
          </span>
        </div>

        <ul className="space-y-2.5">
          {SLOTS.map((s) => (
            <li
              key={s.time}
              className="flex items-center gap-3 rounded-lg border border-[#171e19]/10 bg-[#f8f9fa] px-3 py-3"
            >
              <span className="w-20 flex-none text-sm font-bold text-[#171e19]">{s.time}</span>
              <span className="flex-1 truncate text-sm text-[#171e19]/80">{s.name}</span>
              <span
                className={`flex-none rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  s.tag === "Booked"
                    ? "bg-[#ffe17c] text-[#171e19]"
                    : "bg-[#171e19]/5 text-[#171e19]/60"
                }`}
              >
                {s.tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
