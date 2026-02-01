import clsx from "clsx";
import type { AnswerOption } from "./types";

export default function AnswerOptions({
  options,
  selectedAnswer,
  onSelect,
  isChecked,
  questionId,
}: {
  options: AnswerOption[];
  selectedAnswer: string | null;
  onSelect: (id: string) => void;
  isChecked: boolean;
  questionId: string;
}) {
  return (
    <section className="mb-4 relative">
      <div className="grid gap-3">
        {options.map((opt) => (
          <label
            key={opt.id}
            className={clsx(
              "flex items-center gap-4 p-4 rounded-xl border transition-shadow",
              "cursor-pointer",
              selectedAnswer === opt.id
                ? "border-sky-500 bg-sky-50 shadow"
                : "border-slate-200 bg-white hover:shadow-sm",
              isChecked ? "opacity-80" : "opacity-100",
            )}
          >
            <input
              type="radio"
              name={`q-${questionId}`}
              checked={selectedAnswer === opt.id}
              onChange={() => onSelect(opt.id)}
              className="h-4 w-4 text-sky-600"
              aria-checked={selectedAnswer === opt.id}
            />
            <span className={clsx("text-sm md:text-base")}>{opt.text}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
