import { Card, type Dominio } from "@/components/ui/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { getEventos, metaDoTipo, proximosEventos, type TipoEvento } from "@/lib/data/eventos";
import { calendarEmbedUrl } from "@/lib/data/turma";
import { formatarData, rotuloDiasEvento, textoRelativo } from "@/lib/utils";

export const metadata = { title: "Calendário | Hub da Turma" };

const accentPorTipo: Record<TipoEvento, Dominio> = {
  prova: "prova",
  aula: "evento",
  entrega: "estudo",
  outro: "brand"
};

export default async function CalendarioPage() {
  const ordenados = proximosEventos(await getEventos());

  return (
    <div>
      <PageHeader
        eyebrow="Agenda"
        title="Calendário"
        description="Provas, aulas e entregas da turma. O calendário abaixo é o Google Calendar compartilhado."
      />

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-0">
          <iframe
            title="Google Calendar da turma"
            src={calendarEmbedUrl()}
            className="h-[520px] w-full rounded-panel border-0"
            loading="lazy"
          />
        </Card>

        <section>
          <h2 className="label-mono mb-3 text-muted">Datas importantes</h2>
          <div className="grid gap-3">
            {ordenados.length === 0 ? (
              <Card>
                <p className="text-sm leading-6 text-muted">
                  Nenhum evento futuro no calendário. Os eventos aparecem aqui automaticamente
                  quando cadastrados no Google Calendar da turma (com visibilidade pública).
                </p>
              </Card>
            ) : null}
            {ordenados.map((evento) => {
              const meta = metaDoTipo(evento.tipo);
              return (
                <Card key={evento.id} accent={accentPorTipo[evento.tipo]} className="flex gap-3">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${meta.bgClass}`} />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <strong className="font-display font-semibold leading-tight tracking-tight text-ink">
                        {evento.titulo}
                      </strong>
                      <span className="label-mono text-muted">{meta.label}</span>
                    </div>
                    <p className="label-mono mt-1 text-brand-600">
                      {rotuloDiasEvento(evento.data, evento.dataFim)}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">
                      {evento.dataFim
                        ? `${formatarData(evento.data)} – ${formatarData(evento.dataFim)}`
                        : formatarData(evento.data)}{" "}
                      · {textoRelativo(evento.data)}
                    </p>
                    {evento.descricao ? (
                      <p className="mt-2 text-sm leading-6 text-muted">{evento.descricao}</p>
                    ) : null}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
