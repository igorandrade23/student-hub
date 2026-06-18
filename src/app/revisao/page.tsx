import { ArrowUpRight, ListChecks } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProvaFeita } from "@/components/ui/ProvaFeita";
import { PageHeader } from "@/components/layout/PageHeader";
import { getReviewSubjects } from "@/lib/data/materias";
import { diasAte, formatarData, textoRelativo } from "@/lib/utils";

export const metadata = { title: "Revisão | Hub da Turma" };

export default async function RevisaoPage() {
  const materias = await getReviewSubjects();
  return (
    <div>
      <PageHeader
        eyebrow="Estudo"
        title="Revisão para provas"
        description="Conteúdo organizado por tópicos e quiz com gabarito comentado, por matéria."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {materias.map((materia) => {
          return (
            <Link key={materia.slug} href={`/revisao/${materia.slug}`}>
              <Card
                hover
                accent={materia.disponivel ? "estudo" : undefined}
                className={`flex h-full flex-col ${materia.disponivel ? "" : "opacity-75"}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-display text-xl font-semibold leading-tight tracking-tight text-ink">
                    {materia.titulo}
                  </h2>
                  {materia.disponivel ? (
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted" />
                  ) : (
                    <Badge className="text-muted">Em breve</Badge>
                  )}
                </div>
                <p className="mt-2 flex-1 leading-7 text-muted">{materia.descricao}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {materia.totalQuestoes > 0 ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-estudo/10 px-2.5 py-1 text-xs font-semibold text-estudo">
                      <ListChecks className="h-3 w-3" />
                      {materia.totalQuestoes} questões
                    </span>
                  ) : null}
                  {materia.dataProva && diasAte(materia.dataProva) < 0 ? (
                    <ProvaFeita />
                  ) : materia.dataProva ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-prova/10 px-2.5 py-1 text-xs font-semibold text-prova">
                      Prova {formatarData(materia.dataProva)} · {textoRelativo(materia.dataProva)}
                    </span>
                  ) : null}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
