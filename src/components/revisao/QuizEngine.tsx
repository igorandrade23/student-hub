"use client";

import { CheckCircle2, PanelLeft, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import type { Question } from "@/lib/study-data";

/**
 * Engine de quiz genérica e auto-contida. Recebe as questões por prop,
 * então serve para qualquer matéria. Mantém navegação, feedback imediato,
 * placar e modo revisão lateral.
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
      <article className="min-h-[420px] rounded-panel border border-line bg-white/95 p-5 shadow-panel backdrop-blur">
        <div className="flex items-center justify-between gap-3 text-sm font-extrabold text-muted">
          <span>{item.type}</span>
          <span>
            {currentQuestion + 1}/{quiz.length} · Acertos: {score}
          </span>
        </div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#e4e1d8]">
          <div className="h-full rounded-full bg-ink transition-all" style={{ width: `${progress}%` }} />
        </div>
        <h2 className="mt-5 text-xl font-black leading-8 sm:text-2xl">{item.question}</h2>
        <div className="mt-5 grid gap-3">
          {item.options.map((option, index) => (
            <button
              key={option}
              onClick={() => setSelected((state) => ({ ...state, [currentQuestion]: index }))}
              className={`rounded-panel border p-4 text-left leading-6 transition hover:-translate-y-0.5 ${
                userChoice === index
                  ? "border-ink bg-zinc-50 shadow-[inset_0_0_0_1px_#232323]"
                  : "border-line bg-white hover:border-zinc-400 hover:shadow-sm"
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
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            <strong>{userChoice === item.answer ? "Resposta correta." : "Revise este ponto."}</strong>
            <div>{item.explanation}</div>
          </div>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-ink bg-ink px-4 font-black text-white shadow-lg shadow-zinc-900/15"
            onClick={() => {
              setSelected((state) => ({ ...state, [currentQuestion]: state[currentQuestion] ?? item.answer }));
              setChecked((state) => ({ ...state, [currentQuestion]: true }));
            }}
          >
            <CheckCircle2 className="h-4 w-4" />
            {item.options.length === 1 ? "Ver resposta" : "Conferir"}
          </button>
          <button
            className="min-h-11 rounded-panel border border-line bg-white px-4 font-black shadow-sm"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          >
            Anterior
          </button>
          <button
            className="min-h-11 rounded-panel border border-line bg-white px-4 font-black shadow-sm"
            onClick={() => setCurrentQuestion(Math.min(quiz.length - 1, currentQuestion + 1))}
          >
            Próxima
          </button>
          <button
            className="inline-flex min-h-11 items-center gap-2 rounded-panel border border-line bg-white px-4 font-black shadow-sm"
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

      <aside className="rounded-panel border border-line bg-white/95 p-5 shadow-panel backdrop-blur">
        <div className="flex items-center gap-2">
          <PanelLeft className="h-4 w-4" />
          <h2 className="text-lg font-black">Modo revisão</h2>
        </div>
        <p className="mt-2 text-sm leading-6 text-muted">
          As questões conferidas aparecem com gabarito comentado.
        </p>
        <div className="mt-4 grid max-h-[560px] gap-3 overflow-auto pr-1">
          {quiz.map((question, index) => {
            const done = checked[index];
            const ok = done && selected[index] === question.answer;
            return (
              <button
                key={question.question}
                onClick={() => setCurrentQuestion(index)}
                className={`rounded-panel border p-3 text-left text-sm leading-6 transition hover:-translate-y-0.5 ${
                  done
                    ? ok
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-red-200 bg-red-50"
                    : "border-line bg-[#fbfaf7] hover:bg-white"
                }`}
              >
                <strong>
                  {index + 1}. {done ? (ok ? "Correta" : "Revisar") : "Pendente"}
                </strong>
                <span className="mt-1 block text-zinc-700">{question.question}</span>
                {done ? (
                  <span className="mt-2 block text-xs text-zinc-600">
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
