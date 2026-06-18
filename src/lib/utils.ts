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

/**
 * Intervalo de datas curto. Um dia: "19 jun". Mesmo mês: "19–21 jun".
 * Meses diferentes: "30 jun – 2 jul".
 */
export function formatarIntervaloCurto(inicio: string, fim?: string): string {
  if (!fim || fim === inicio) return formatarDataCurta(inicio);
  const di = new Date(`${inicio}T12:00:00`);
  const df = new Date(`${fim}T12:00:00`);
  if (di.getFullYear() === df.getFullYear() && di.getMonth() === df.getMonth()) {
    return `${di.getDate()}–${formatarDataCurta(fim)}`;
  }
  return `${formatarDataCurta(inicio)} – ${formatarDataCurta(fim)}`;
}

/** Intervalo de datas por extenso. Um dia: "19 de jun.". Vários: "19 de jun. – 21 de jun.". */
export function formatarIntervalo(inicio: string, fim?: string): string {
  if (!fim || fim === inicio) return formatarData(inicio);
  return `${formatarData(inicio)} – ${formatarData(fim)}`;
}

/** Nome do dia da semana em PT-BR, ex: "sexta-feira". */
export function diaDaSemana(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("pt-BR", { weekday: "long" });
}

/** Versão curta sem "-feira", ex: "sexta". */
export function diaDaSemanaCurto(iso: string): string {
  return diaDaSemana(iso).replace(/-feira$/, "");
}

/**
 * Rótulo de dia(s) de um evento: "sexta-feira" para um dia,
 * "sexta a domingo" quando há intervalo (dataFim).
 */
export function rotuloDiasEvento(inicio: string, fim?: string): string {
  if (fim && fim !== inicio) return `${diaDaSemanaCurto(inicio)} a ${diaDaSemanaCurto(fim)}`;
  return diaDaSemana(inicio);
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
