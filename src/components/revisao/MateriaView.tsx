"use client";

import { BookOpen, ListChecks } from "lucide-react";
import { useState } from "react";
import type { Question } from "@/lib/study-data";
import { QuizEngine } from "./QuizEngine";

type Aba = "revisao" | "quiz";

/**
 * Visão de uma matéria. Mostra abas Revisão/Quiz quando há os dois;
 * se só houver um, mostra direto, sem abas. O conteúdo de revisão entra
 * por children (server component); o quiz por prop.
 */
export function ReviewView({
  quiz,
  children
}: {
  quiz: Question[];
  children?: React.ReactNode;
}) {
  const temConteudo = Boolean(children);
  const temQuiz = quiz.length > 0;
  const [aba, setAba] = useState<Aba>(temConteudo ? "revisao" : "quiz");

  if (temConteudo && !temQuiz) return <>{children}</>;
  if (!temConteudo && temQuiz) return <QuizEngine quiz={quiz} />;

  return (
    <div>
      <div className="mb-6 inline-flex gap-1 rounded-panel border border-line bg-surface p-1">
        <TabButton active={aba === "revisao"} onClick={() => setAba("revisao")} icon={BookOpen}>
          Revisão
        </TabButton>
        <TabButton active={aba === "quiz"} onClick={() => setAba("quiz")} icon={ListChecks}>
          Quiz ({quiz.length})
        </TabButton>
      </div>

      {aba === "revisao" ? children : <QuizEngine quiz={quiz} />}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  children
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex min-h-10 items-center gap-2 rounded-[6px] px-4 text-sm font-semibold transition ${
        active ? "bg-brand text-white" : "text-muted hover:bg-paper"
      }`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
}
