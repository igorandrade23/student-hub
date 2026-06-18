import { fetchSheetRows, parseBool } from "./sheets";
import { normalizarDataIso } from "../utils";

/**
 * Mural de avisos da turma. Lido da aba `avisos` do Google Sheets.
 * Colunas esperadas: id, data, titulo, texto, urgente, autor.
 * Se a planilha estiver vazia/indisponível, usa o `seed` abaixo como fallback.
 */
export type Aviso = {
  id: string;
  data: string;
  titulo: string;
  texto: string;
  urgente?: boolean;
  autor?: string;
};

const seed: Aviso[] = [
  {
    id: "a1",
    data: "2026-05-28",
    titulo: "Bem-vindos ao hub da turma",
    texto:
      "Este é o nosso espaço central de estudos: materiais, calendário, avisos e revisão para as provas. Feedbacks são muito bem-vindos!",
    autor: "Liderança"
  }
];

export async function getAvisos(): Promise<Aviso[]> {
  const linhas = await fetchSheetRows("avisos");
  if (linhas.length === 0) return seed;

  return linhas
    .filter((l) => l.titulo)
    .map((l) => ({
      id: l.id || l.titulo,
      data: normalizarDataIso(l.data),
      titulo: l.titulo,
      texto: l.texto,
      urgente: parseBool(l.urgente),
      autor: l.autor || undefined
    }));
}
