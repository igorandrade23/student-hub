/**
 * Marca do hub: símbolo Ψ (Psicologia) com microconstelação, em selo aubergine.
 * Pensado para a sidebar escura — traço marfim, sem gradiente.
 */
export function BrandMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span
      className={`relative inline-grid shrink-0 place-items-center rounded-panel border border-brand/40 bg-[#2c1f3d] text-inkInv ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[56%] w-[56%]"
        aria-hidden="true"
      >
        <path d="M12 5.5V18.5" />
        <path d="M7.5 8.2V11.5a4.5 4.5 0 0 0 9 0V8.2" />
      </svg>
      {/* microconstelação */}
      <span className="absolute right-1 top-1 h-1 w-1 rounded-full bg-evento" />
      <span className="absolute bottom-1.5 left-1.5 h-[3px] w-[3px] rounded-full bg-estudo" />
    </span>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <BrandMark className="h-10 w-10" />
      <span className="min-w-0 leading-none">
        <strong className="block truncate font-display text-[19px] font-semibold tracking-tight text-inkInv">
          Student Hub
        </strong>
        <span className="label-mono mt-1 block truncate text-mist">Área do Estudante</span>
      </span>
    </span>
  );
}
