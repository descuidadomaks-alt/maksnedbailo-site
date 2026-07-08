/** A colored trailing period for section titles — the Care Less wordmark convention. */
export function Dot({ white = false }: { white?: boolean }) {
  return <span className={white ? "text-white" : "text-[#ffe17c]"}>.</span>;
}
