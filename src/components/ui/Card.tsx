/** Domínios que viram borda-topo colorida (cor = significado). */
export type Dominio =
  | "brand"
  | "estudo"
  | "prova"
  | "evento"
  | "comunidade"
  | "progresso"
  | "material";

const accentTop: Record<Dominio, string> = {
  brand: "border-t-brand",
  estudo: "border-t-estudo",
  prova: "border-t-prova",
  evento: "border-t-evento",
  comunidade: "border-t-comunidade",
  progresso: "border-t-progresso",
  material: "border-t-material"
};

/**
 * Card de conteúdo (superfície marfim). `accent` adiciona uma borda-topo de 3px
 * na cor do domínio (recorte de caderno). `hover` para itens clicáveis.
 */
export function Card({
  children,
  className = "",
  hover = false,
  accent
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  accent?: Dominio;
}) {
  return (
    <article
      className={`grain rounded-card border border-line bg-surface p-5 shadow-panel ${
        accent ? `border-t-[3px] ${accentTop[accent]}` : ""
      } ${hover ? "transition duration-200 hover:-translate-y-0.5 hover:shadow-lift" : ""} ${className}`}
    >
      {children}
    </article>
  );
}
