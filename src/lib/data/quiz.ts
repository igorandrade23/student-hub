import { fetchSheetRows } from "./sheets";
import { quiz as quizSeed, type Question } from "../study-data";

/**
 * Questões de quiz por matéria. Lidas da aba `quiz` do Google Sheets.
 * Colunas esperadas: materia, tipo, pergunta, opcao_a, opcao_b, opcao_c, opcao_d, resposta, explicacao.
 * - `materia`: slug (ex: psicologia-do-desenvolvimento-da-infancia)
 * - `resposta`: letra (A, B, C, D) referente à opção correta
 * - opções vazias são ignoradas (V/F usa só A/B; discursiva usa só A)
 *
 * Fallback: se a planilha não tiver questões da matéria, usa o seed do código.
 */
export async function getQuizSubjectCounts(): Promise<Map<string, number>> {
  const linhas = await fetchSheetRows("quiz");
  const contagem = new Map<string, number>();
  for (const l of linhas) {
    const subject = (l.materia || "").trim();
    if (subject && l.pergunta) contagem.set(subject, (contagem.get(subject) ?? 0) + 1);
  }
  return contagem;
}

export async function getQuizQuestions(subject: string, aliases: string[] = []): Promise<Question[]> {
  const accepted = new Set([subject, ...aliases]);
  const linhas = await fetchSheetRows("quiz");
  const subjectRows = linhas.filter((l) => accepted.has((l.materia || "").trim()) && l.pergunta);

  if (subjectRows.length === 0) {
    // Sem dados na planilha: usa o quiz-semente do código da matéria canônica.
    const matchesCanonicalSubject =
      accepted.has("psicologia-do-desenvolvimento-da-infancia") ||
      accepted.has("desenvolvimento-infantil") ||
      accepted.has("desenvolvimento-da-infancia");
    return matchesCanonicalSubject ? quizSeed : [];
  }

  return subjectRows.map(parseQuestionRow);
}

const LETRA_INDICE: Record<string, number> = { a: 0, b: 1, c: 2, d: 3, e: 4 };

function parseQuestionRow(row: Record<string, string>): Question {
  const options = [row.opcao_a, row.opcao_b, row.opcao_c, row.opcao_d]
    .map((o) => (o ?? "").trim())
    .filter((o) => o !== "");

  const letra = (row.resposta || "a").trim().toLowerCase();
  let answer = LETRA_INDICE[letra] ?? Number(letra) - 1; // aceita letra ou número
  if (Number.isNaN(answer) || answer < 0 || answer >= options.length) answer = 0;

  return {
    type: row.tipo || "Questão",
    question: row.pergunta,
    options: options.length > 0 ? options : ["Revelar resposta esperada"],
    answer,
    explanation: row.explicacao || ""
  };
}
