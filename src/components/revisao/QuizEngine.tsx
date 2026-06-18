"use client";

import { CheckCircle2, PanelLeft, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import type { Question } from "@/lib/study-data";

/**
 * Engine de quiz como treino de prova. Recebe as questões por prop.
 * Navegação, feedback imediato (verde/clay), placar e modo revisão lateral.
 */
export function QuizEngine({ quiz }: { quiz: Question[] }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const score = useMemo(
    () =>
      Object.entries(checked).filter(
        ([index, done]) => done && selected[Number(index)] === quiz[Number(index)].answer
      ).length,
    [checked, selected, quiz]
  );

  const item = quiz[currentQuestion];
  const userChoice = selected[currentQuestion];
  const wasChecked = checked[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.length) * 100;

  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_340px]">
      <article className="min-h-[420px] rounded-card border border-line bg-surface p-5 shadow-panel">
        <div className="flex items-center justify-between gap-3">
          <span className="label-mono text-muted">{item.type}</span>
          <span className="label-mono text-muted">
            {currentQuestion + 1}/{quiz.length} · Acertos {score}
          </span>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-paper">
          <div className="h-full rounded-full bg-progresso transition-all" style={{ width: `${progress}%` }} />
        </div>
        <h2 className="mt-5 font-display text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl">
          {item.question}
        </h2>
        <div className="mt-5 grid gap-3">
          {item.options.map((option, index) => (
            <button
              key={option}
              onClick={() => setSelected((state) => ({ ...state, [currentQuestion]: index }))}
              className={`rounded-panel border p-4 text-left leading-6 transition ${
                userChoice === index
                  ? "border-brand bg-brand/10 text-ink"
                  : "border-line bg-paper/40 hover:border-brand/50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {wasChecked ? (
          <div
            className={`mt-5 rounded-panel border p-4 leading-7 ${
              userChoice === item.answer
                ? "border-progresso/40 bg-progresso/10"
                : "border-prova/40 bg-prova/10"
            }`}
          >
            <strong className={`block ${userChoice === item.answer ? "text-progresso" : "text-prova"}`}>
              {userChoice === item.answer ? "Resposta correta." : "Revise este ponto."}
            </strong>
            <span className="text-ink">{item.explanation}</span>
          </div>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            className="inline-flex min-h-11 items-center gap-2 rounded-panel bg-brand px-4 font-semibold text-white transition hover:bg-brand-600"
            onClick={() => {
              setSelected((state) => ({ ...state, [currentQuestion]: state[currentQuestion] ?? item.answer }));
              setChecked((state) => ({ ...state, [currentQuestion]: true }));
            }}
          >
            <CheckCircle2 className="h-4 w-4" />
            {item.options.length === 1 ? "Ver resposta" : "Conferir"}
          </button>
          <button
            className="min-h-11 rounded-panel border border-line bg-surface px-4 font-semibold text-ink transition hover:bg-paper"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          >
            Anterior
          </button>
          <button
            className="min-h-11 rounded-panel border border-line bg-surface px-4 font-semibold text-ink transition hover:bg-paper"
            onClick={() => setCurrentQuestion(Math.min(quiz.length - 1, currentQuestion + 1))}
          >
            Próxima
          </button>
          <button
            className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-line bg-surface px-4 font-semibold text-ink transition hover:bg-paper"
            onClick={() => {
              setSelected({});
              setChecked({});
              setCurrentQuestion(0);
            }}
          >
            <RotateCcw className="h-4 w-4" />
            Reiniciar
          </button>
        </div>
      </article>

      <aside className="rounded-card border border-line bg-surface p-5 shadow-panel">
        <div className="flex items-center gap-2">
          <PanelLeft className="h-4 w-4 text-brand" />
          <h2 className="font-display text-lg font-semibold tracking-tight text-ink">Modo revisão</h2>
        </div>
        <p className="mt-2 text-sm leading-6 text-muted">
          As questões conferidas aparecem com gabarito comentado.
        </p>
        <div className="mt-4 grid max-h-[560px] gap-2.5 overflow-auto pr-1">
          {quiz.map((question, index) => {
            const done = checked[index];
            const ok = done && selected[index] === question.answer;
            return (
              <button
                key={question.question}
                onClick={() => setCurrentQuestion(index)}
                className={`rounded-panel border p-3 text-left text-sm leading-6 transition ${
                  done
                    ? ok
                      ? "border-progresso/40 bg-progresso/10"
                      : "border-prova/40 bg-prova/10"
                    : "border-line bg-paper/40 hover:border-brand/40"
                }`}
              >
                <strong className="label-mono block text-muted">
                  {index + 1}. {done ? (ok ? "Correta" : "Revisar") : "Pendente"}
                </strong>
                <span className="mt-1 block text-ink">{question.question}</span>
                {done ? (
                  <span className="mt-2 block text-xs text-muted">
                    Gabarito: {question.options[question.answer]}.
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </aside>
    </section>
  );
}
