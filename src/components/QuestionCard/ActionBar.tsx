import clsx from "clsx";

export default function ActionBar({
  selectedAnswer,
  isLoading,
  onCheck,
  error,
}: {
  selectedAnswer: string | null;
  isLoading: boolean;
  onCheck: () => void;
  error?: string | null;
}) {
  const disabled = !selectedAnswer || isLoading;

  return (
    <footer className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div>
        <button
          onClick={onCheck}
          disabled={disabled}
          className={clsx(
            "px-4 py-2 rounded-lg font-medium transition transform active:scale-95",
            disabled
              ? "bg-slate-200 text-slate-400 cursor-not-allowed opacity-80"
              : "bg-sky-600 hover:bg-sky-700 text-white shadow-sm",
          )}
          aria-disabled={disabled}
        >
          {isLoading ? "Проверка..." : "Проверить ответ"}
        </button>
      </div>

      <div className="text-sm text-gray-600">
        {error && <span className="text-red-600">{error}</span>}
      </div>
    </footer>
  );
}
