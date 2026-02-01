import { useMemo, useState } from "react";
import clsx from "clsx";

export default function Explanation({
  explanation,
  isDemo,
  show,
}: {
  explanation?: string;
  isDemo?: boolean;
  show: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  const isLong = useMemo(
    () => (explanation ? explanation.length > 360 : false),
    [explanation],
  );

  if (!explanation) return null;

  return (
    <div
      className={clsx(
        "mt-6 overflow-hidden transition-all duration-300",
        show ? "opacity-100 max-h-500" : "opacity-0 max-h-0",
      )}
      aria-hidden={!show}
    >
      <div
        className={clsx(
          "p-4 rounded-xl border border-slate-200",
          isDemo ? "bg-white/50 border-dashed" : "bg-slate-50",
        )}
        style={{ transition: "filter 250ms ease" }}
      >
        {isDemo && (
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Доступно в полной версии
            </span>
            <button className="text-sm text-sky-600 underline">
              Купить полную версию
            </button>
          </div>
        )}

        <div className={clsx("text-sm text-slate-900")}>
          {isLong ? (
            <div>
              <div
                className={clsx(
                  "overflow-hidden transition-[max-height] duration-300",
                  expanded ? "max-h-500" : "max-h-36",
                )}
              >
                <div className={clsx(isDemo ? "blur-sm" : "")}>
                  {explanation}
                </div>
              </div>
              <div className="mt-3">
                <button
                  onClick={() => setExpanded((s) => !s)}
                  className="text-sm text-sky-600 underline"
                >
                  {expanded ? "Свернуть" : "Показать полностью"}
                </button>
              </div>
            </div>
          ) : (
            <div className={clsx(isDemo ? "blur-sm" : "")}>{explanation}</div>
          )}
        </div>
      </div>
    </div>
  );
}
