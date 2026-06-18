import { calendarIcsUrl } from "./turma";

/**
 * Eventos da turma vindos do Google Calendar (feed .ics público).
 * Fonte única: o que estiver no calendário aparece aqui. Para os títulos
 * aparecerem (em vez de "Busy"), os eventos precisam ter visibilidade pública.
 */
export type TipoEvento = "prova" | "aula" | "entrega" | "outro";

export type Evento = {
  id: string;
  data: string; // ISO AAAA-MM-DD (no fuso America/Sao_Paulo)
  titulo: string;
  tipo: TipoEvento;
  descricao?: string;
};

export async function getEventos(): Promise<Evento[]> {
  let texto: string;
  try {
    const res = await fetch(calendarIcsUrl(), { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    texto = await res.text();
  } catch (erro) {
    console.warn("[calendario] não foi possível ler o feed .ics:", erro);
    return [];
  }

  return parseIcs(texto).sort((a, b) => a.data.localeCompare(b.data));
}

/** Infere o tipo do evento a partir de palavras-chave no título. */
function inferirTipo(titulo: string): TipoEvento {
  const t = titulo.toLowerCase();
  if (/(prova|avalia|exame|teste)/.test(t)) return "prova";
  if (/(entrega|trabalho|atividade|prazo)/.test(t)) return "entrega";
  if (/(aula|encontro|palestra|semin)/.test(t)) return "aula";
  return "outro";
}

/** Converte DTSTART do ICS em data ISO (AAAA-MM-DD) no fuso de São Paulo. */
function dataIso(valorDtstart: string): string | null {
  // Formato all-day: 20260630  | datetime UTC: 20260630T220000Z | local: 20260630T190000
  const m = valorDtstart.match(/(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?/);
  if (!m) return null;
  const [, ano, mes, dia, hh, mm, ss, z] = m;

  if (!hh) return `${ano}-${mes}-${dia}`; // all-day

  // Com hora: monta Date e formata no fuso da turma para acertar o dia.
  const iso = `${ano}-${mes}-${dia}T${hh}:${mm}:${ss}${z ? "Z" : ""}`;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return `${ano}-${mes}-${dia}`;
  // en-CA dá YYYY-MM-DD; timeZone resolve a virada de dia do UTC.
  return d.toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
}

/** Remove o "line folding" do ICS (continuações começam com espaço/tab). */
function desdobrarLinhas(texto: string): string[] {
  const linhas = texto.split(/\r?\n/);
  const out: string[] = [];
  for (const linha of linhas) {
    if (/^[ \t]/.test(linha) && out.length > 0) {
      out[out.length - 1] += linha.slice(1);
    } else {
      out.push(linha);
    }
  }
  return out;
}

function desescapar(valor: string): string {
  return valor
    .replace(/\\n/gi, " ")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\")
    .replace(/<[^>]+>/g, "") // remove tags HTML que o Google manda na descrição
    .replace(/\s+/g, " ")
    .trim();
}

function parseIcs(texto: string): Evento[] {
  const linhas = desdobrarLinhas(texto);
  const eventos: Evento[] = [];
  let atual: Partial<Record<"dtstart" | "summary" | "description" | "uid", string>> | null = null;

  for (const linha of linhas) {
    if (linha === "BEGIN:VEVENT") {
      atual = {};
      continue;
    }
    if (linha === "END:VEVENT") {
      if (atual?.dtstart) {
        const data = dataIso(atual.dtstart);
        if (data) {
          const titulo = atual.summary ? desescapar(atual.summary) : "(sem título)";
          eventos.push({
            id: atual.uid ?? `${data}-${titulo}`,
            data,
            titulo,
            tipo: inferirTipo(titulo),
            descricao: atual.description ? desescapar(atual.description) : undefined
          });
        }
      }
      atual = null;
      continue;
    }
    if (!atual) continue;

    // chave (com possíveis parâmetros após ';') : valor
    const sep = linha.indexOf(":");
    if (sep === -1) continue;
    const chave = linha.slice(0, sep).split(";")[0].toUpperCase();
    const valor = linha.slice(sep + 1);

    if (chave === "DTSTART") atual.dtstart = valor;
    else if (chave === "SUMMARY") atual.summary = valor;
    else if (chave === "DESCRIPTION") atual.description = valor;
    else if (chave === "UID") atual.uid = valor;
  }

  return eventos;
}

const tipoMeta: Record<TipoEvento, { label: string; colorClass: string; bgClass: string }> = {
  prova: { label: "Prova", colorClass: "text-second", bgClass: "bg-second" },
  aula: { label: "Aula", colorClass: "text-first", bgClass: "bg-first" },
  entrega: { label: "Entrega", colorClass: "text-third", bgClass: "bg-third" },
  outro: { label: "Evento", colorClass: "text-muted", bgClass: "bg-muted" }
};

export function metaDoTipo(tipo: TipoEvento) {
  return tipoMeta[tipo];
}

/** Filtra eventos a partir de hoje (inclusive), ordenados do mais próximo ao mais distante. */
export function proximosEventos(lista: Evento[], limite?: number, de: Date = new Date()): Evento[] {
  const hoje = new Date(de.getFullYear(), de.getMonth(), de.getDate());
  const futuros = lista
    .filter((e) => new Date(`${e.data}T00:00:00`) >= hoje)
    .sort((a, b) => a.data.localeCompare(b.data));
  return typeof limite === "number" ? futuros.slice(0, limite) : futuros;
}
