/** Selo pequeno e arredondado. Passe classes de cor via `className`. */
export function Badge({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-line bg-ivory px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink ${className}`}
    >
      {children}
    </span>
  );
}
