import { getEventos } from "./eventos";
import { getQuizSubjectCounts } from "./quiz";
import { quiz as quizSeed } from "../study-data";
import { slugify } from "../utils";

/**
 * Matérias de revisão. A lista nasce do calendário: eventos cujo título começa com
 * "PROVA" viram matérias automaticamente (nome e data tirados do evento).
 *
 * O conteúdo de revisão no código só entra como enriquecimento quando o slug da
 * prova bate com a matéria canônica.
 *
 * Uma matéria fica "disponível" se tiver página de revisão OU quiz (na planilha
 * ou semente no código). Caso contrário, aparece como "em breve".
 */
export type MateriaResumo = {
  slug: string;
  titulo: string;
  descricao: string;
  dataProva?: string;
  totalQuestoes: number;
  /** Tem página de revisão (componente no código). */
  temConteudo: boolean;
  /** Tem quiz (na planilha ou semente). */
  temQuiz: boolean;
  /** Tem algo para mostrar (conteúdo ou quiz). */
  disponivel: boolean;
  /** Slugs equivalentes aceitos na coluna `materia` da aba quiz (apelidos). */
  aliasSlugs: string[];
};

// Matérias com página de revisão escrita no código (texto estruturado).
// `matchSlugs`: slugs equivalentes — usados tanto para casar a prova do calendário
// quanto para ler o quiz da planilha lançado sob um nome antigo/alternativo.
const conteudoRegistry: Record<
  string,
  { titulo: string; descricao: string; matchSlugs: string[] }
> = {
  "psicologia-do-desenvolvimento-da-infancia": {
    titulo: "Psicologia do Desenvolvimento da Infância",
    descricao:
      "Primeira, segunda e terceira infância. Domínios físico, cognitivo e psicossocial, com Piaget, Vygotsky e Erikson.",
    matchSlugs: ["desenvolvimento-infantil", "desenvolvimento-da-infancia"]
  }
};

/** Acha a matéria-de-conteúdo cujo slug ou matchSlugs corresponde ao slug informado. */
function findMatchingContentSlug(slug: string): string | undefined {
  for (const [canonico, info] of Object.entries(conteudoRegistry)) {
    if (canonico === slug || info.matchSlugs.includes(slug)) return canonico;
  }
  return undefined;
}

// Quiz-semente embutido no código, por slug canônico (fallback quando a planilha não tem).
const seedQuiz: Record<string, number> = {
  "psicologia-do-desenvolvimento-da-infancia": quizSeed.length
};

function isExamEventTitle(title: string): boolean {
  return /^\s*prova\b/i.test(title);
}

function extractExamName(title: string): string {
  return title.replace(/^\s*prova\b[\s:-]*/i, "").trim() || title.trim();
}

export async function getReviewSubjects(): Promise<MateriaResumo[]> {
  const [eventos, quizCount] = await Promise.all([getEventos(), getQuizSubjectCounts()]);

  const map = new Map<string, MateriaResumo>();

  // Conta questões somando o slug e seus apelidos; cai na semente do código se não houver.
  const countQuestions = (slug: string, aliases: string[]) => {
    const total = [slug, ...aliases].reduce((soma, s) => soma + (quizCount.get(s) ?? 0), 0);
    return total > 0 ? total : seedQuiz[slug] ?? 0;
  };

  // Provas do calendário (título começa com "PROVA").
  for (const ev of eventos) {
    if (!isExamEventTitle(ev.titulo)) continue;
    const name = extractExamName(ev.titulo);
    const slugEvento = slugify(name);
    if (!slugEvento) continue;

    const canonico = findMatchingContentSlug(slugEvento);
    const slug = canonico ?? slugEvento;
    const info = canonico ? conteudoRegistry[canonico] : undefined;
    const aliasSlugs = info?.matchSlugs ?? [];
    const existente = map.get(slug);
    const total = existente?.totalQuestoes ?? countQuestions(slug, aliasSlugs);
    const hasContent = Boolean(info);
    const hasQuiz = total > 0;

    map.set(slug, {
      slug,
      titulo: info?.titulo ?? name,
      descricao: info?.descricao ?? (hasQuiz ? "Quiz de revisão disponível." : "Conteúdo de revisão ainda em preparação."),
      dataProva: ev.data,
      totalQuestoes: total,
      temConteudo: hasContent,
      temQuiz: hasQuiz,
      disponivel: hasContent || hasQuiz,
      aliasSlugs
    });
  }

  return [...map.values()];
}

export async function getReviewSubject(slug: string): Promise<MateriaResumo | undefined> {
  const subjects = await getReviewSubjects();
  const subject = subjects.find((m) => m.slug === slug);
  if (subject) return subject;
  return subjects.find((m) => m.aliasSlugs.includes(slug));
}
