import { turma } from "./turma";

/**
 * Leitura de uma aba do Google Sheets como linhas-objeto.
 *
 * Usa o endpoint gviz (exporta CSV por nome de aba) — basta a planilha estar
 * compartilhada como "qualquer pessoa com o link pode ver". Não precisa de chave de API.
 *
 * Em caso de falha (rede, planilha privada, aba inexistente) retorna [] e quem
 * chama decide o fallback. Cache de 5 min via revalidate do Next.
 */
export async function fetchSheetRows(aba: string): Promise<Record<string, string>[]> {
  const url = `https://docs.google.com/spreadsheets/d/${turma.sheetsId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
    aba
  )}`;

  let text: string;
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    text = await res.text();
  } catch (erro) {
    console.warn(`[sheets] não foi possível ler a aba "${aba}":`, erro);
    return [];
  }

  // gviz devolve uma página HTML quando a planilha não é pública.
  if (text.trimStart().startsWith("<")) {
    console.warn(`[sheets] aba "${aba}" inacessível — a planilha está compartilhada publicamente?`);
    return [];
  }

  const matriz = parseCsv(text).filter((linha) => linha.some((celula) => celula.trim() !== ""));
  if (matriz.length < 2) return [];

  const cabecalhos = matriz[0].map((h) => h.trim().toLowerCase());
  return matriz.slice(1).map((colunas) => {
    const obj: Record<string, string> = {};
    cabecalhos.forEach((h, i) => {
      obj[h] = (colunas[i] ?? "").trim();
    });
    return obj;
  });
}

/** Interpreta valores de coluna booleana: "sim", "true", "x", "1" → true. */
export function parseBool(valor: string | undefined): boolean {
  return ["sim", "true", "x", "1", "verdadeiro"].includes((valor ?? "").toLowerCase());
}

/** Parser de CSV que respeita aspas, vírgulas e quebras de linha dentro de campos. */
function parseCsv(texto: string): string[][] {
  const linhas: string[][] = [];
  let linha: string[] = [];
  let campo = "";
  let entreAspas = false;

  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];

    if (entreAspas) {
      if (c === '"') {
        if (texto[i + 1] === '"') {
          campo += '"';
          i++;
        } else {
          entreAspas = false;
        }
      } else {
        campo += c;
      }
      continue;
    }

    if (c === '"') {
      entreAspas = true;
    } else if (c === ",") {
      linha.push(campo);
      campo = "";
    } else if (c === "\r") {
      // ignora
    } else if (c === "\n") {
      linha.push(campo);
      linhas.push(linha);
      linha = [];
      campo = "";
    } else {
      campo += c;
    }
  }

  if (campo !== "" || linha.length > 0) {
    linha.push(campo);
    linhas.push(linha);
  }
  return linhas;
}
