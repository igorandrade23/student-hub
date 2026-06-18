/** Card base do hub. `hover` adiciona elevação no hover (use para itens clicáveis). */
export function Card({
  children,
  className = "",
  hover = false
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <article
      className={`rounded-panel border border-line bg-white/95 p-5 shadow-panel backdrop-blur ${
        hover ? "transition hover:-translate-y-0.5 hover:shadow-xl" : ""
      } ${className}`}
    >
      {children}
    </article>
  );
}
