/** Cabeçalho editorial de página: rótulo mono + título serifado + fio. */
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
    <header className="mb-8 border-b border-line pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {eyebrow ? <p className="label-mono text-brand-600">{eyebrow}</p> : null}
          <h1 className="mt-2 font-display text-3xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-[2.6rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-2xl leading-7 text-muted">{description}</p>
          ) : null}
        </div>
        {children ? <div className="flex flex-wrap gap-2">{children}</div> : null}
      </div>
    </header>
  );
}
