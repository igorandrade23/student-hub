/**
 * Converte uma string de data para Date, aceitando ISO (AAAA-MM-DD) e
 * o formato brasileiro (DD/MM/AAAA) que o Google Sheets costuma exportar.
 */
function paraDate(valor: string): Date {
  const s = (valor ?? "").trim();
  const br = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (br) {
    const [, dia, mes, ano] = br;
    return new Date(`${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}T00:00:00`);
  }
  // ISO só com data → fixa meia-noite local; senão deixa o Date parsear.
  return new Date(/^\d{4}-\d{2}-\d{2}$/.test(s) ? `${s}T00:00:00` : s);
}

/** Normaliza qualquer data aceita para ISO (AAAA-MM-DD). Útil para ordenar/comparar. */
export function normalizarDataIso(valor: string): string {
  const d = paraDate(valor);
  if (Number.isNaN(d.getTime())) return valor;
  return d.toLocaleDateString("en-CA"); // YYYY-MM-DD
}

/** Formata uma data para PT-BR, ex: "12 de jun. de 2026". */
export function formatarData(valor: string): string {
  const d = paraDate(valor);
  if (Number.isNaN(d.getTime())) return valor;
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

/** Formato curto, ex: "12 jun". */
export function formatarDataCurta(valor: string): string {
  const d = paraDate(valor);
  if (Number.isNaN(d.getTime())) return valor;
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

/**
 * Dias a partir de hoje até a data informada.
 * Positivo = futuro, 0 = hoje, negativo = passado. NaN se a data for inválida.
 */
export function diasAte(valor: string, de: Date = new Date()): number {
  const alvo = paraDate(valor);
  if (Number.isNaN(alvo.getTime())) return NaN;
  const hoje = new Date(de.getFullYear(), de.getMonth(), de.getDate());
  const alvoMeiaNoite = new Date(alvo.getFullYear(), alvo.getMonth(), alvo.getDate());
  return Math.round((alvoMeiaNoite.getTime() - hoje.getTime()) / 86_400_000);
}

/** Converte um texto em slug: minúsculo, sem acento, espaços viram hífen. */
export function slugify(texto: string): string {
  return (texto ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Texto relativo amigável: "hoje", "amanhã", "em 5 dias", "há 3 dias". "" se inválido. */
export function textoRelativo(valor: string, de: Date = new Date()): string {
  const dias = diasAte(valor, de);
  if (Number.isNaN(dias)) return "";
  if (dias === 0) return "hoje";
  if (dias === 1) return "amanhã";
  if (dias === -1) return "ontem";
  if (dias > 1) return `em ${dias} dias`;
  return `há ${Math.abs(dias)} dias`;
}
