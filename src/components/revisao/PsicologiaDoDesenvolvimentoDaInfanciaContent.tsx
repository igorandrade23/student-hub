import { Layers3 } from "lucide-react";
import { examFocus, phases, theories, type Phase } from "@/lib/study-data";

const phaseGradient: Record<Phase["id"], string> = {
  primeira: "from-first/20 via-white to-white",
  segunda: "from-second/20 via-white to-white",
  terceira: "from-third/20 via-white to-white"
};

/**
 * Conteúdo de revisão da matéria Psicologia do Desenvolvimento da Infância.
 * Apresentacional (sem estado): fases, comparativo, teorias e roteiro num fluxo único.
 */
export function PsicologiaDoDesenvolvimentoDaInfanciaContent() {
  return (
    <div className="grid gap-8">
      <section>
        <h2 className="mb-3 text-sm font-black uppercase tracking-wide text-muted">As três fases</h2>
        <div className="grid gap-5">
          {phases.map((phase) => (
            <PhaseBlock key={phase.id} phase={phase} />
          ))}
        </div>
      </section>

      <Comparison />
      <Theories />
      <ExamPoints />
      <StudyGuide />
    </div>
  );
}

function PhaseBlock({ phase }: { phase: Phase }) {
  return (
    <article
      className={`overflow-hidden rounded-panel border border-line bg-gradient-to-br ${phaseGradient[phase.id]} shadow-panel`}
    >
      <div className={`h-1.5 ${phase.accentClass}`} />
      <div className="p-6">
        <span className={`text-sm font-black ${phase.colorClass}`}>{phase.age}</span>
        <h3 className="mt-1 text-xl font-black">{phase.label}</h3>
        <p className="mt-2 max-w-4xl leading-7 text-zinc-700">{phase.thesis}</p>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-zinc-600">
          <strong>Exemplo: </strong>
          {phase.example}
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <ConceptCard title="Físico e motor" items={phase.physical} />
          <ConceptCard title="Cognitivo" items={phase.cognitive} />
          <ConceptCard title="Psicossocial/emocional" items={phase.psychosocial} />
          <ConceptCard title="Linguagem" items={phase.language} />
        </div>
      </div>
    </article>
  );
}

function ConceptCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-panel border border-line bg-white/95 p-4">
      <h4 className="text-base font-black">{title}</h4>
      <ul className="mt-2 space-y-1.5 text-sm text-zinc-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2 leading-6">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Comparison() {
  const rows = [
    ["Idade", "0 a 3 anos", "3 a 6 anos", "6 a 12 anos"],
    ["Físico", "Crescimento acelerado, marcha e preensão", "Destreza motora e lateralidade", "Crescimento lento, força e coordenação"],
    ["Cognitivo", "Exploração sensorial e esquemas", "Simbolismo, egocentrismo e centração", "Lógica concreta, conservação e reversibilidade"],
    ["Psicossocial", "Apego, confiança e autonomia", "Iniciativa, papéis e brincadeira", "Produtividade, autoestima e pares"],
    ["Linguagem", "Balbucio, holofrase, fala telegráfica", "Explosão vocabular e pragmática", "Leitura, escrita e argumentação concreta"]
  ];

  return (
    <section>
      <h2 className="mb-3 text-sm font-black uppercase tracking-wide text-muted">Comparativo entre fases</h2>
      <div className="overflow-hidden rounded-panel border border-line bg-white shadow-panel">
        <div className="grid grid-cols-3 border-b border-line">
          {phases.map((phase) => (
            <div key={phase.id} className={`h-1.5 ${phase.accentClass}`} />
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead className="bg-[#efede6]">
              <tr>
                {["Aspecto", "Primeira", "Segunda", "Terceira"].map((head) => (
                  <th key={head} className="border-b border-line p-4 text-sm font-black">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td
                      key={cell}
                      className={`border-b border-line p-4 align-top leading-6 ${
                        i === 0 ? "font-bold text-ink" : "text-zinc-700"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Theories() {
  return (
    <section>
      <h2 className="mb-3 text-sm font-black uppercase tracking-wide text-muted">Teorias e autores</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {theories.map(([name, text]) => (
          <article
            key={name}
            className="rounded-panel border border-line bg-white/95 p-5 shadow-panel backdrop-blur"
          >
            <h3 className="text-lg font-black text-theory">{name}</h3>
            <p className="mt-2 leading-7 text-zinc-700">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExamPoints() {
  return (
    <section className="rounded-panel border border-line bg-ink p-6 text-white shadow-panel">
      <div className="flex items-center gap-2 text-sm font-bold text-white/70">
        <Layers3 className="h-4 w-4" />
        Pontos que mais caem na prova
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {examFocus.map((item, index) => (
          <li key={item} className="flex gap-3 rounded-panel border border-white/10 bg-white/10 p-3">
            <span className="text-xs font-black text-white/50">0{index + 1}</span>
            <span className="text-sm leading-6">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StudyGuide() {
  const blocks = [
    ["Abertura", "Estudar desenvolvimento infantil é compreender como corpo, mente, linguagem e vínculos se organizam desde os primeiros anos."],
    ["Bloco 1: Primeira infância", "Do nascimento aos 3 anos, a criança passa da dependência à exploração ativa. Crescimento rápido, apego e sensório-motor são centrais."],
    ["Bloco 2: Segunda infância", "Dos 3 aos 6 anos, simbolismo, faz de conta e iniciativa marcam a fase. O pensamento é criativo, mas ainda centrado na aparência."],
    ["Bloco 3: Terceira infância", "Dos 6 aos 12 anos, escola, pares e lógica concreta ganham força. Conservação, reversibilidade e produtividade tornam-se pontos-chave."],
    ["Bloco 4: Comparação", "O bebê explora com o corpo; a criança pequena representa; a criança escolar classifica e opera logicamente com situações concretas."],
    ["Bloco 5: Aplicações práticas", "Use disciplina indutiva em casa e ZDP na escola: ofereça suporte graduado, não resposta pronta."],
    ["Fechamento", "Cada fase tem lógica própria. Desenvolvimento físico, cognitivo, emocional e social avançam de forma interdependente."]
  ];

  return (
    <section>
      <h2 className="mb-3 text-sm font-black uppercase tracking-wide text-muted">Roteiro de estudo</h2>
      <div className="relative grid gap-4 before:absolute before:left-5 before:top-6 before:hidden before:h-[calc(100%-3rem)] before:w-px before:bg-line sm:before:block">
        {blocks.map(([name, text], index) => (
          <article
            key={name}
            className="relative rounded-panel border border-line bg-white/95 p-5 shadow-panel backdrop-blur sm:ml-12"
          >
            <span className="absolute -left-[3.25rem] top-5 hidden h-9 w-9 place-items-center rounded-full border border-line bg-white text-sm font-black shadow-sm sm:grid">
              {index + 1}
            </span>
            <h3 className="text-lg font-black">{name}</h3>
            <p className="mt-2 leading-7 text-zinc-700">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
