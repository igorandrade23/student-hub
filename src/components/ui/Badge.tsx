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
      className={`inline-flex items-center gap-1 rounded-full border border-line bg-white px-3 py-1 text-xs font-extrabold ${className}`}
    >
      {children}
    </span>
  );
}
