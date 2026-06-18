import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { getEventos, metaDoTipo, proximosEventos } from "@/lib/data/eventos";
import { calendarEmbedUrl } from "@/lib/data/turma";
import { formatarData, textoRelativo } from "@/lib/utils";

export const metadata = { title: "Calendário | Hub da Turma" };

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
          <h2 className="mb-3 text-sm font-black uppercase tracking-wide text-muted">
            Datas importantes
          </h2>
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
                <Card key={evento.id} className="flex gap-3">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${meta.bgClass}`} />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <strong className="leading-tight">{evento.titulo}</strong>
                      <Badge className={meta.colorClass}>{meta.label}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {formatarData(evento.data)} · {textoRelativo(evento.data)}
                    </p>
                    {evento.descricao ? (
                      <p className="mt-2 text-sm leading-6 text-zinc-700">{evento.descricao}</p>
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
