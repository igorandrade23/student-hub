import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { getAvisos } from "@/lib/data/avisos";
import { formatarData, textoRelativo } from "@/lib/utils";

export const metadata = { title: "Avisos | Hub da Turma" };

export default async function AvisosPage() {
  const ordenados = (await getAvisos()).sort((a, b) => b.data.localeCompare(a.data));

  return (
    <div>
      <PageHeader
        eyebrow="Comunicação"
        title="Avisos"
        description="Comunicados da liderança e da turma, do mais recente ao mais antigo."
      />

      <div className="grid gap-3">
        {ordenados.map((aviso) => (
          <Card
            key={aviso.id}
            accent={aviso.urgente ? "prova" : "comunidade"}
            className={aviso.urgente ? "bg-prova/[0.04]" : ""}
          >
            <div className="flex flex-wrap items-center gap-2">
              {aviso.urgente ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-prova px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  <AlertTriangle className="h-3 w-3" />
                  Urgente
                </span>
              ) : null}
              <strong className="font-display text-lg font-semibold leading-tight tracking-tight text-ink">
                {aviso.titulo}
              </strong>
            </div>
            <p className="mt-2 leading-7 text-muted">{aviso.texto}</p>
            <p className="label-mono mt-3 text-muted">
              {formatarData(aviso.data)} · {textoRelativo(aviso.data)}
              {aviso.autor ? ` · ${aviso.autor}` : ""}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
