/**
 * A colored trailing period for section titles — echoes the "Overtime Hunch."
 * wordmark convention (yellow period) across the page's headline sentences.
 * Use `white` on titles that sit on a yellow (#ffe17c) background section,
 * where a yellow period would disappear against it (e.g. FinalCTA).
 */
export function Dot({ white = false }: { white?: boolean }) {
  return <span className={white ? "text-white" : "text-[#ffe17c]"}>.</span>;
}
