import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  FolderOpen,
  Megaphone
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { getAvisos } from "@/lib/data/avisos";
import { getEventos, metaDoTipo, proximosEventos } from "@/lib/data/eventos";
import { getReviewSubjects } from "@/lib/data/materias";
import { rotuloTurma, turma } from "@/lib/data/turma";
import { formatarData, textoRelativo } from "@/lib/utils";

const atalhos = [
  { href: "/materiais", label: "Materiais", descricao: "Slides e PDFs no Drive", icon: FolderOpen },
  { href: "/calendario", label: "Calendário", descricao: "Provas, aulas e entregas", icon: CalendarDays },
  { href: "/avisos", label: "Avisos", descricao: "Comunicados da turma", icon: Megaphone },
  { href: "/revisao", label: "Revisão", descricao: "Conteúdo e quiz por matéria", icon: BookOpen }
];

export default async function Home() {
  const [todosEventos, avisos, materias] = await Promise.all([
    getEventos(),
    getAvisos(),
    getReviewSubjects()
  ]);
  const eventos = proximosEventos(todosEventos, 3);
  const ultimoAviso = [...avisos].sort((a, b) => b.data.localeCompare(a.data))[0];
  const materiasDisponiveis = materias.filter((m) => m.disponivel).length;

  return (
    <div className="grid gap-5">
      <PageHeader
        eyebrow="Hub de estudos"
        title={`${turma.curso} · ${turma.instituicao}`}
        description={`${rotuloTurma()}. Materiais, calendário, avisos e revisão num só lugar.`}
      />

      {/* Atalhos */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {atalhos.map((atalho) => {
          const Icon = atalho.icon;
          return (
            <Link key={atalho.href} href={atalho.href}>
              <Card hover className="h-full">
                <div className="flex items-start justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-panel bg-ink text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted" />
                </div>
                <strong className="mt-4 block text-lg">{atalho.label}</strong>
                <span className="text-sm text-muted">{atalho.descricao}</span>
              </Card>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        {/* Próximos eventos */}
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black">Próximos eventos</h2>
            <Link href="/calendario" className="text-sm font-bold text-muted hover:text-ink">
              Ver calendário
            </Link>
          </div>
          <div className="mt-4 grid gap-3">
            {eventos.length === 0 ? (
              <p className="text-sm leading-6 text-muted">Nenhum evento futuro cadastrado.</p>
            ) : (
              eventos.map((evento) => {
                const meta = metaDoTipo(evento.tipo);
                return (
                  <div
                    key={evento.id}
                    className="flex items-start gap-3 rounded-panel border border-line bg-[#fbfaf7] p-3"
                  >
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${meta.bgClass}`} />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <strong className="text-sm">{evento.titulo}</strong>
                        <Badge className={meta.colorClass}>{meta.label}</Badge>
                      </div>
                      <p className="mt-0.5 text-sm text-muted">
                        {formatarData(evento.data)} · {textoRelativo(evento.data)}
                      </p>
                      {evento.descricao ? (
                        <p className="mt-1 text-sm leading-6 text-zinc-700">{evento.descricao}</p>
                      ) : null}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        {/* Último aviso */}
        <article className="rounded-panel border border-line bg-ink p-5 text-white shadow-panel">
          <div className="flex items-center gap-2 text-sm font-bold text-white/70">
            <Megaphone className="h-4 w-4" />
            Último aviso
          </div>
          {ultimoAviso ? (
            <div className="mt-4">
              <div className="flex flex-wrap items-center gap-2">
                <strong className="text-lg leading-tight">{ultimoAviso.titulo}</strong>
                {ultimoAviso.urgente ? (
                  <span className="rounded-full bg-second px-3 py-1 text-xs font-extrabold text-white">
                    Urgente
                  </span>
                ) : null}
              </div>
              <p className="mt-2 leading-7 text-white/80">{ultimoAviso.texto}</p>
              <p className="mt-3 text-sm text-white/50">{formatarData(ultimoAviso.data)}</p>
              <Link
                href="/avisos"
                className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-white hover:underline"
              >
                Ver todos os avisos <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <p className="mt-4 text-white/70">Nenhum aviso publicado.</p>
          )}
        </article>
      </section>

      {/* Revisão em destaque */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-black">Revisão para provas</h2>
          <Link href="/revisao" className="text-sm font-bold text-muted hover:text-ink">
            Ver todas as matérias
          </Link>
        </div>
        <Card className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <strong className="block">
              {materiasDisponiveis} matéria{materiasDisponiveis === 1 ? "" : "s"} com revisão e quiz
            </strong>
            <span className="text-sm text-muted">
              Conteúdo organizado por tópicos e questões comentadas.
            </span>
          </div>
          <Link
            href="/revisao"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-panel border border-ink bg-ink px-4 font-black text-white shadow-lg shadow-zinc-900/15"
          >
            <BookOpen className="h-4 w-4" />
            Começar a revisar
          </Link>
        </Card>
      </section>
    </div>
  );
}
