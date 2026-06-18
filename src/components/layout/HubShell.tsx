"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark, Logo } from "@/components/brand/Logo";
import { periodoAtual, turma } from "@/lib/data/turma";
import { navItems } from "./nav-items";

/**
 * Casca do hub: sidebar aubergine (moldura escura) + área de conteúdo em papel
 * quente, com header de busca. Direção "campus digital".
 */
export function HubShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="grid min-h-screen lg:grid-cols-[268px_1fr]">
        {/* Sidebar — moldura escura */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-[268px] flex-col bg-aubergine px-4 py-5 text-inkInv transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:px-5 ${
            mobileNavOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:shadow-none"
          }`}
        >
          <div className="mb-9 flex items-center gap-2 px-1">
            <Logo />
            <button
              className="ml-auto rounded-panel p-2 text-mist hover:bg-white/5 lg:hidden"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Fechar menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="label-mono mb-2 px-3 text-mist/70">Navegação</p>
          <nav className="grid gap-0.5" aria-label="Navegação principal">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`relative flex min-h-10 items-center gap-3 rounded-panel px-3 text-[15px] transition-colors ${
                    active
                      ? "bg-white/10 font-semibold text-inkInv"
                      : "font-medium text-mist hover:bg-white/5 hover:text-inkInv"
                  }`}
                >
                  {active ? (
                    <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-brand" />
                  ) : null}
                  <Icon className={`h-[18px] w-[18px] ${active ? "text-brand-200" : "text-mist/80"}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto">
            <div className="rounded-panel border border-lineDark px-3 py-3">
              <p className="label-mono text-mist/70">{turma.curso} · {turma.instituicao}</p>
              <p className="mt-1 font-display text-base font-medium leading-snug text-inkInv">
                {periodoAtual()}º período
              </p>
            </div>
            <p className="mt-4 px-1 font-display text-sm italic leading-relaxed text-mist">
              “Acolher histórias é o primeiro passo para transformar realidades.”
            </p>
          </div>
        </aside>

        {/* Conteúdo — papel quente */}
        <section className="min-w-0 bg-paper">
          {mobileNavOpen ? (
            <button
              className="fixed inset-0 z-30 bg-bg/60 lg:hidden"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Fechar navegação"
            />
          ) : null}

          <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-paper/85 px-5 py-3 backdrop-blur lg:px-10">
            <button
              className="rounded-panel border border-line bg-surface p-2 text-ink lg:hidden"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="flex items-center gap-2 lg:hidden">
              <BrandMark className="h-7 w-7" />
              <strong className="font-display tracking-tight">Student Hub</strong>
            </span>
            <label className="ml-auto hidden items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted shadow-panel lg:flex lg:w-80">
              <Search className="h-4 w-4 shrink-0" />
              <input
                type="search"
                placeholder="Buscar no Hub…"
                className="w-full bg-transparent text-ink outline-none placeholder:text-muted"
                aria-label="Buscar no Hub"
              />
            </label>
          </header>

          <div className="mx-auto w-full max-w-6xl px-5 py-8 lg:px-10 lg:py-10">{children}</div>
        </section>
      </div>
    </div>
  );
}
