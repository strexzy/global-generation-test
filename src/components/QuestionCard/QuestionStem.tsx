import TipTapRenderer from "./TipTapRenderer";
import type { TipTapNode } from "./types";

export default function QuestionStem({
  doc,
  onKatexError,
  katexError,
}: {
  doc: TipTapNode;
  onKatexError?: (err: Error) => void;
  katexError?: string | null;
}) {
  return (
    <section className="mb-6">
      <TipTapRenderer doc={doc} onKatexError={onKatexError} />
      {katexError && (
        <div className="mt-3 text-sm text-red-600">
          Ошибка отображения формулы: {katexError}
        </div>
      )}
    </section>
  );
}
