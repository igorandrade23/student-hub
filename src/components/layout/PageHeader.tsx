/** Cabeçalho padrão de página: rótulo pequeno + título + descrição opcional. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-wide text-muted">{eyebrow}</p>
        ) : null}
        <h1 className="mt-1 text-2xl font-black tracking-normal sm:text-3xl">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-2xl leading-7 text-zinc-700">{description}</p>
        ) : null}
      </div>
      {children ? <div className="flex flex-wrap gap-2">{children}</div> : null}
    </header>
  );
}
