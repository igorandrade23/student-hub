import { ArrowUpRight, ListChecks } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { getReviewSubjects } from "@/lib/data/materias";
import { formatarData, textoRelativo } from "@/lib/utils";

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
              <Card hover className={`flex h-full flex-col ${materia.disponivel ? "" : "opacity-80"}`}>
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-xl font-black leading-tight">{materia.titulo}</h2>
                  {materia.disponivel ? (
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted" />
                  ) : (
                    <Badge className="text-muted">Em breve</Badge>
                  )}
                </div>
                <p className="mt-2 flex-1 leading-7 text-zinc-700">{materia.descricao}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {materia.totalQuestoes > 0 ? (
                    <Badge className="text-first">
                      <ListChecks className="h-3 w-3" />
                      {materia.totalQuestoes} questões
                    </Badge>
                  ) : null}
                  {materia.dataProva ? (
                    <Badge className="text-second">
                      Prova: {formatarData(materia.dataProva)} · {textoRelativo(materia.dataProva)}
                    </Badge>
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
