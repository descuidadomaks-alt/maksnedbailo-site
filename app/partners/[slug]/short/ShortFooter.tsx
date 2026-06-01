import type { ShortPageDict } from "../lib/i18n";

export default function ShortFooter({ d }: { d: ShortPageDict }) {
  return (
    <footer
      className="border-t px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3"
      style={{ borderColor: "rgba(255,255,255,0.04)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt={d.footer.credit}
        style={{ height: "20px", opacity: 0.35 }}
      />
      <p className="font-sora font-light text-fg/20" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
        {d.footer.credit} · {d.footer.location}
      </p>
    </footer>
  );
}
