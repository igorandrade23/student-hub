/**
 * Configuração da turma. Edite aqui os IDs das integrações.
 * O "período" é calculado a partir da data atual (ver periodoAtual), então o
 * rótulo se atualiza sozinho a cada novo semestre — não precisa editar à mão.
 */
export type Turma = {
  curso: string;
  instituicao: string;
  /** Semestre em que a turma começou (= 1º período). Ex: 2025.2. */
  inicio: { ano: number; semestre: 1 | 2 };
  /** ID (e-mail) do Google Calendar público da turma. */
  calendarId: string;
  /** ID da pasta-raiz do Google Drive da turma. */
  driveFolderId: string;
  /** ID da pasta "Materiais" (subpastas por matéria ficam aqui). Mostrada na página de Materiais. */
  materiaisFolderId: string;
  /** ID da planilha do Google Sheets usada como CMS (avisos, quiz). */
  sheetsId: string;
};

export const turma: Turma = {
  curso: "Psicologia",
  instituicao: "Univali",
  // A turma começou em 2025.2 — esse é o 1º período.
  inicio: { ano: 2025, semestre: 2 },
  calendarId: "psicologia.univali.2025.2@gmail.com",
  driveFolderId: "1zsTYh32HObqRXm23VTkonr4GA1wY3Qr8",
  // Pasta "Materiais" (subpastas por matéria ficam aqui).
  materiaisFolderId: "1dFNXxfAcXzuNa-6t6GCd8h5VUEztWZxe",
  // Planilha-CMS. Para o app ler, compartilhe como "qualquer pessoa com o link pode ver".
  sheetsId: "1yUqZtAguwXp9ATSYYFO9LqCBAALLH0ddoXtbbqxYlRg"
};

// URLs derivadas dos IDs acima.
export function calendarEmbedUrl(): string {
  return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(
    turma.calendarId
  )}&ctz=America%2FSao_Paulo`;
}
export function calendarIcsUrl(): string {
  return `https://calendar.google.com/calendar/ical/${encodeURIComponent(
    turma.calendarId
  )}/public/basic.ics`;
}
export function driveFolderUrl(id: string = turma.driveFolderId): string {
  return `https://drive.google.com/drive/folders/${id}`;
}
export function driveEmbedUrl(id: string = turma.driveFolderId): string {
  return `https://drive.google.com/embeddedfolderview?id=${id}#grid`;
}

/** Índice linear de semestre: cada semestre vale 1. Segundo semestre começa em agosto. */
function indiceSemestre(ano: number, segundoSemestre: boolean): number {
  return ano * 2 + (segundoSemestre ? 1 : 0);
}

/**
 * Período atual da turma (1º, 2º, ...), calculado a partir de hoje.
 * Ex.: turma de 2025.2 → 1º período; 2026.1 → 2º; a partir de ago/2026 → 3º.
 */
export function periodoAtual(de: Date = new Date()): number {
  const base = indiceSemestre(turma.inicio.ano, turma.inicio.semestre === 2);
  const agora = indiceSemestre(de.getFullYear(), de.getMonth() + 1 >= 8);
  return Math.max(1, agora - base + 1);
}

/** Rótulo completo da turma, ex.: "Psicologia · Univali · 2º período". */
export function rotuloTurma(de: Date = new Date()): string {
  return `${turma.curso} · ${turma.instituicao} · ${periodoAtual(de)}º período`;
}
