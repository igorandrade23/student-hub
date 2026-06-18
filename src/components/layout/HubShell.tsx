"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { periodoAtual, turma } from "@/lib/data/turma";
import { navItems } from "./nav-items";

/**
 * Casca do hub: sidebar de navegação + header responsivo + drawer mobile.
 * Envolve todas as páginas via app/layout.tsx.
 */
export function HubShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="relative min-h-screen overflow-hidden bg-paper text-ink">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(47,125,115,0.16),transparent_30%),radial-gradient(circle_at_85%_16%,rgba(180,95,67,0.13),transparent_28%),linear-gradient(135deg,#faf8f2_0%,#f0eee7_50%,#f7f5ef_100%)]" />
      <div className="relative grid min-h-screen lg:grid-cols-[288px_1fr]">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-[288px] border-r border-line bg-white/90 p-4 shadow-2xl backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:bg-white/95 lg:p-6 lg:shadow-none ${
            mobileNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-6 flex items-center gap-3 px-1">
            <div className="grid h-11 w-11 place-items-center rounded-panel bg-ink text-sm font-black text-white shadow-lg shadow-zinc-900/20">
              HUB
            </div>
            <div className="min-w-0">
              <strong className="block truncate leading-tight">
                {turma.curso} · {turma.instituicao}
              </strong>
              <span className="text-sm leading-tight text-muted">Hub de estudos</span>
            </div>
            <button
              className="ml-auto rounded-panel border border-line p-2 lg:hidden"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Fechar menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="grid gap-2" aria-label="Navegação principal">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`group flex min-h-11 items-center justify-between rounded-panel border px-3 text-left transition ${
                    active
                      ? "border-line bg-white shadow-sm shadow-zinc-900/5"
                      : "border-transparent text-zinc-600 hover:border-line hover:bg-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 transition ${
                        active ? "text-ink" : "text-zinc-400 group-hover:text-ink"
                      }`}
                    />
                    {item.label}
                  </span>
                  {active ? <span className="h-2 w-2 rounded-full bg-ink" /> : null}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 rounded-panel border border-line bg-[#fbfaf7] p-4">
            <p className="text-sm font-extrabold">{periodoAtual()}º período</p>
            <p className="mt-1 text-sm leading-6 text-muted">
              Tudo num só lugar: materiais, calendário, avisos e revisão.
            </p>
          </div>
        </aside>

        <section className="min-w-0">
          {mobileNavOpen ? (
            <button
              className="fixed inset-0 z-30 bg-ink/30 lg:hidden"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Fechar navegação"
            />
          ) : null}

          <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-paper/85 px-5 py-4 backdrop-blur-xl lg:hidden">
            <button
              className="rounded-panel border border-line bg-white p-2"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <strong className="truncate">
              {turma.curso} · {turma.instituicao}
            </strong>
          </header>

          <div className="mx-auto w-full max-w-7xl px-5 py-6 lg:px-8 lg:py-8">{children}</div>
        </section>
      </div>
    </div>
  );
}
