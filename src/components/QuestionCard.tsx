import { useEffect, useMemo, useState } from "react";
import type { Question as QuestionType } from "./QuestionCard/types";
import QuestionStem from "./QuestionCard/QuestionStem";
import AnswerOptions from "./QuestionCard/AnswerOptions";
import ActionBar from "./QuestionCard/ActionBar";
import Explanation from "./QuestionCard/Explanation";

type Props = {
  question: QuestionType;
  onCheck?: (
    questionId: string,
    selectedId: string,
  ) => Promise<{ correct: boolean }>;
};

export type { QuestionType as Question };

export default function QuestionCard({ question, onCheck }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [katexError, setKatexError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsChecked(false);
    setIsLoading(false);
    setError(null);
    setKatexError(null);
  }, [question.id]);

  useEffect(() => {
    if (isChecked) setIsChecked(false);
  }, [selectedAnswer]);

  const handleSelect = (id: string) => {
    setSelectedAnswer((prev) => (prev === id ? null : id));
  };

  const handleCheck = async () => {
    if (!selectedAnswer || isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      if (onCheck) {
        await onCheck(question.id, selectedAnswer);
      } else {
        await new Promise((res) => setTimeout(res, 700));
      }
      setIsChecked(true);
    } catch (err: any) {
      setError(err?.message || "Ошибка при проверке");
    } finally {
      setIsLoading(false);
    }
  };

  const showExplanation = Boolean(isChecked && question.explanation);

  const explanationContent = useMemo(
    () => question.explanation,
    [question.explanation],
  );

  return (
    <article className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 max-w-2xl mx-auto text-slate-900 transition-shadow">
      <header className="mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-slate-900">
          Вопрос
        </h2>
      </header>

      <QuestionStem
        doc={question.stem}
        onKatexError={(err) => setKatexError(err.message)}
        katexError={katexError}
      />

      <AnswerOptions
        options={question.options}
        selectedAnswer={selectedAnswer}
        onSelect={handleSelect}
        isChecked={isChecked}
        questionId={question.id}
      />

      <ActionBar
        selectedAnswer={selectedAnswer}
        isLoading={isLoading}
        onCheck={handleCheck}
        error={error}
      />

      <Explanation
        explanation={explanationContent || undefined}
        isDemo={question.isDemo}
        show={showExplanation}
      />
    </article>
  );
}
