import { ArrowRight, GraduationCap, Megaphone } from "lucide-react";
import Link from "next/link";
import { Card, type Dominio } from "@/components/ui/Card";
import { ProvaFeita } from "@/components/ui/ProvaFeita";
import { getAvisos } from "@/lib/data/avisos";
import { getEventos, metaDoTipo, proximosEventos, type Evento } from "@/lib/data/eventos";
import { getReviewSubjects } from "@/lib/data/materias";
import { periodoAtual, turma } from "@/lib/data/turma";
import {
  diasAte,
  formatarDataCurta,
  formatarIntervaloCurto,
  rotuloDiasEvento,
  textoRelativo
} from "@/lib/utils";

const SEMANA = ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"];

export default async function Home() {
  const [todosEventos, avisos, materias] = await Promise.all([
    getEventos(),
    getAvisos(),
    getReviewSubjects()
  ]);

  const diaSemana = new Date().getDay();
  const diasAteDomingo = (7 - diaSemana) % 7;
  const futuros = proximosEventos(todosEventos);
  const daSemana = futuros.filter((e) => diasAte(e.data) <= diasAteDomingo);
  const proximaProva = futuros.find((e) => e.tipo === "prova");
  const avisosRecentes = [...avisos].sort((a, b) => b.data.localeCompare(a.data));
  const materiasDisponiveis = materias.filter((m) => m.disponivel);

  // Faixa da semana atual (segunda → domingo) + dias com evento.
  const hoje = new Date();
  const monday = new Date(hoje);
  monday.setDate(hoje.getDate() - ((hoje.getDay() + 6) % 7));
  const diasComEvento = new Set<string>();
  for (const e of todosEventos) {
    const ini = new Date(`${e.data}T12:00:00`);
    const fim = new Date(`${e.dataFim ?? e.data}T12:00:00`);
    for (let d = new Date(ini); d <= fim; d.setDate(d.getDate() + 1)) {
      diasComEvento.add(d.toLocaleDateString("en-CA"));
    }
  }
  const diasSemana = SEMANA.map((label, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const iso = d.toLocaleDateString("en-CA");
    return { label, dia: d.getDate(), iso, hoje: iso === hoje.toLocaleDateString("en-CA"), evento: diasComEvento.has(iso) };
  });
  const fimSemana = diasSemana[6];

  return (
    <div className="grid gap-8">
      {/* Saudação */}
      <header className="relative overflow-hidden">
        <p className="label-mono text-brand-600">
          {turma.curso} · {turma.instituicao} — {periodoAtual()}º período
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.6rem]">
          Bem-vindo de volta.
        </h1>
        <Folha className="pointer-events-none absolute right-0 top-0 hidden h-20 w-20 text-estudo/40 sm:block" />
      </header>

      {/* Semana + Próxima prova */}
      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <Card accent="evento" className="flex flex-col">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg font-semibold tracking-tight">Semana da turma</h2>
            <span className="label-mono text-muted">
              {monday.getDate()} a {formatarDataCurta(fimSemana.iso)}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {diasSemana.map((d) => (
              <div
                key={d.iso}
                className={`flex flex-col items-center rounded-panel py-2 ${
                  d.hoje ? "bg-brand text-white" : "bg-paper"
                }`}
              >
                <span className={`label-mono text-[10px] ${d.hoje ? "text-white/80" : "text-muted"}`}>
                  {d.label}
                </span>
                <span className="mt-1 font-display text-base">{d.dia}</span>
                <span
                  className={`mt-1 h-1 w-1 rounded-full ${
                    d.evento ? (d.hoje ? "bg-white" : "bg-evento") : "bg-transparent"
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="mt-4 flex-1 border-t border-line pt-1">
            {daSemana.length === 0 ? (
              <p className="py-3 text-sm text-muted">Sem eventos marcados para esta semana.</p>
            ) : (
              daSemana.map((e) => <EventoRow key={e.id} evento={e} />)
            )}
          </div>

          <Link href="/calendario" className="label-mono mt-2 inline-flex items-center gap-1 text-brand-600 hover:text-brand-700">
            Ver agenda completa →
          </Link>
        </Card>

        <ProvaCard prova={proximaProva} materias={materias} />
      </div>

      {/* Avisos + Próximos eventos */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Secao titulo="Avisos" accent="comunidade" icon={<Megaphone className="h-4 w-4 text-comunidade" />} href="/avisos" linkLabel="Ver todos">
          {avisosRecentes.length === 0 ? (
            <Vazio>Nenhum aviso publicado.</Vazio>
          ) : (
            avisosRecentes.slice(0, 3).map((a) => (
              <div key={a.id} className="border-b border-line py-3.5 last:border-b-0">
                <div className="flex items-center gap-2">
                  {a.urgente ? <span className="label-mono text-prova">Urgente</span> : null}
                  <strong className="text-[15px] text-ink">{a.titulo}</strong>
                </div>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted">{a.texto}</p>
                <p className="label-mono mt-2 text-muted">{formatarDataCurta(a.data)}</p>
              </div>
            ))
          )}
        </Secao>

        <Secao titulo="Próximos eventos" accent="evento" href="/calendario" linkLabel="Calendário">
          {futuros.length === 0 ? (
            <Vazio>Nenhum evento futuro no calendário.</Vazio>
          ) : (
            futuros.slice(0, 5).map((e) => <EventoRow key={e.id} evento={e} />)
          )}
        </Secao>
      </div>

      {/* Revisão */}
      <Secao titulo="Revisão para provas" accent="estudo" href="/revisao" linkLabel="Ver matérias">
        {materiasDisponiveis.length === 0 ? (
          <Vazio>Nenhuma matéria com revisão disponível.</Vazio>
        ) : (
          materiasDisponiveis.map((m) => {
            const passou = m.dataProva ? diasAte(m.dataProva) < 0 : false;
            return (
              <Link
                key={m.slug}
                href={`/revisao/${m.slug}`}
                className="group flex items-center justify-between gap-4 border-b border-line py-3.5 last:border-b-0"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <strong className="text-[15px] text-ink transition-colors group-hover:text-brand-700">
                      {m.titulo}
                    </strong>
                    {passou ? <ProvaFeita /> : null}
                  </div>
                  <p className="label-mono mt-1 text-muted">
                    {m.dataProva
                      ? `Prova ${formatarDataCurta(m.dataProva)} · ${textoRelativo(m.dataProva)}`
                      : "Revisão disponível"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  {m.totalQuestoes > 0 ? (
                    <span className="label-mono text-estudo">{m.totalQuestoes} questões</span>
                  ) : null}
                  <ArrowRight className="h-4 w-4 text-muted transition-colors group-hover:text-brand-700" />
                </div>
              </Link>
            );
          })
        )}
      </Secao>
    </div>
  );
}

function ProvaCard({ prova, materias }: { prova?: Evento; materias: Awaited<ReturnType<typeof getReviewSubjects>> }) {
  if (!prova) {
    return (
      <Card className="flex flex-col items-start justify-center">
        <div className="flex items-center gap-2 text-prova">
          <GraduationCap className="h-5 w-5" />
          <span className="label-mono">Próxima prova</span>
        </div>
        <p className="mt-3 font-display text-xl leading-snug text-ink">Nenhuma prova marcada.</p>
        <p className="mt-1 text-sm text-muted">Aproveite para revisar com calma.</p>
      </Card>
    );
  }

  const dias = diasAte(prova.data);
  const nome = prova.titulo.replace(/^\s*prova\b[\s:-]*/i, "").trim() || prova.titulo;
  const materia = materias.find((m) => m.dataProva === prova.data && m.disponivel);

  return (
    <Card accent="prova" className="flex flex-col">
      <div className="flex items-center gap-2 text-prova">
        <GraduationCap className="h-5 w-5" />
        <span className="label-mono">Próxima prova</span>
      </div>
      <h2 className="mt-3 font-display text-xl font-semibold leading-tight tracking-tight text-ink">{nome}</h2>
      <p className="mt-1 text-3xl font-semibold text-prova">
        <span className="font-display">
          {dias === 0 ? "É hoje!" : dias === 1 ? "Falta 1 dia" : `Faltam ${dias} dias`}
        </span>
      </p>
      <p className="label-mono mt-2 text-muted">
        {rotuloDiasEvento(prova.data, prova.dataFim)} · {formatarIntervaloCurto(prova.data, prova.dataFim)}
      </p>
      <div className="mt-auto pt-5">
        {materia ? (
          <Link
            href={`/revisao/${materia.slug}`}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-panel bg-prova px-4 font-semibold text-white transition hover:brightness-105"
          >
            Revisar agora{materia.totalQuestoes > 0 ? ` · ${materia.totalQuestoes} questões` : ""}
          </Link>
        ) : (
          <Link
            href="/calendario"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-panel border border-line px-4 font-semibold text-ink transition hover:bg-paper"
          >
            Ver no calendário
          </Link>
        )}
      </div>
    </Card>
  );
}

function EventoRow({ evento }: { evento: Evento }) {
  const meta = metaDoTipo(evento.tipo);
  const dias = diasAte(evento.data);
  return (
    <div className="flex items-start gap-3 border-b border-line py-3 last:border-b-0">
      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${meta.bgClass}`} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <strong className="text-[15px] text-ink">{evento.titulo}</strong>
          <span className="label-mono text-muted">{meta.label}</span>
        </div>
        <p className="label-mono mt-1 text-brand-600">
          {rotuloDiasEvento(evento.data, evento.dataFim)} · {formatarIntervaloCurto(evento.data, evento.dataFim)}
        </p>
        {evento.descricao ? (
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted">{evento.descricao}</p>
        ) : null}
      </div>
      <span className={`label-mono shrink-0 pt-0.5 ${dias <= 2 ? "text-prova" : "text-muted"}`}>
        {textoRelativo(evento.data)}
      </span>
    </div>
  );
}

function Secao({
  titulo,
  accent,
  icon,
  href,
  linkLabel,
  children
}: {
  titulo: string;
  accent: Dominio;
  icon?: React.ReactNode;
  href: string;
  linkLabel: string;
  children: React.ReactNode;
}) {
  return (
    <Card accent={accent} className="flex flex-col">
      <div className="flex items-end justify-between border-b border-line pb-3">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          {icon}
          {titulo}
        </h2>
        <Link href={href} className="label-mono text-brand-600 transition-colors hover:text-brand-700">
          {linkLabel} →
        </Link>
      </div>
      <div className="mt-1">{children}</div>
    </Card>
  );
}

function Vazio({ children }: { children: React.ReactNode }) {
  return <p className="py-4 text-sm text-muted">{children}</p>;
}

/** Folhinha decorativa (caderno de campo). */
function Folha({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M14 50C14 30 30 14 50 14c0 20-16 36-36 36Z" />
      <path d="M14 50C22 42 34 30 46 22" strokeLinecap="round" />
    </svg>
  );
}
