import { ArrowLeft, Clock3 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PsicologiaDoDesenvolvimentoDaInfanciaContent } from "@/components/revisao/PsicologiaDoDesenvolvimentoDaInfanciaContent";
import { ReviewView } from "@/components/revisao/MateriaView";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { getReviewSubject, getReviewSubjects } from "@/lib/data/materias";
import { getQuizQuestions } from "@/lib/data/quiz";
import { formatarData, textoRelativo } from "@/lib/utils";

// Matérias com página de revisão escrita no código, por slug.
const contentBySlug: Record<string, React.ReactNode> = {
  "psicologia-do-desenvolvimento-da-infancia": <PsicologiaDoDesenvolvimentoDaInfanciaContent />
};

export async function generateStaticParams() {
  return (await getReviewSubjects()).map((m) => ({ materia: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ materia: string }> }) {
  const { materia: slug } = await params;
  const materia = await getReviewSubject(slug);
  return { title: materia ? `${materia.titulo} | Revisão` : "Revisão" };
}

export default async function ReviewSubjectPage({ params }: { params: Promise<{ materia: string }> }) {
  const { materia: slug } = await params;
  const materia = await getReviewSubject(slug);
  if (!materia) notFound();

  const conteudo = materia.temConteudo ? contentBySlug[slug] : null;
  const quiz = materia.temQuiz ? await getQuizQuestions(slug, materia.aliasSlugs) : [];

  return (
    <div>
      <Link
        href="/revisao"
        className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Todas as matérias
      </Link>

      <PageHeader
        eyebrow="Revisão"
        title={materia.titulo}
        description={
          materia.dataProva
            ? `${materia.descricao} · Prova ${formatarData(materia.dataProva)} (${textoRelativo(
                materia.dataProva
              )}).`
            : materia.descricao
        }
      />

      {materia.disponivel ? (
        <ReviewView quiz={quiz}>{conteudo}</ReviewView>
      ) : (
        <Card className="flex flex-col items-center gap-3 py-12 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-paper text-muted">
            <Clock3 className="h-6 w-6" />
          </div>
          <strong className="text-lg">Sem revisão e quiz</strong>
          <p className="max-w-md leading-7 text-muted">
            Esta matéria ainda não tem revisão nem quiz cadastrados.
          </p>
        </Card>
      )}
    </div>
  );
}
