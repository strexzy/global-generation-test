import { useState } from "react";
import QuestionCard, { type Question } from "./components/QuestionCard";

const baseStem = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Решите пример" }],
    },
    {
      type: "paragraph",
      content: [{ type: "text", text: "Вычислите значение:" }],
    },
  ],
};

const normalQuestion: Question = {
  id: "q-normal",
  stem: {
    ...baseStem,
    content: [
      ...(baseStem as any).content,
      { type: "math", attrs: { value: "\\int_0^1 x^2 \\; dx = \\frac{1}{3}" } },
      {
        type: "paragraph",
        content: [{ type: "text", text: "Выберите правильный ответ." }],
      },
    ],
  },
  options: [
    { id: "a", text: "1/2" },
    { id: "b", text: "1/3" },
    { id: "c", text: "2/3" },
    { id: "d", text: "1" },
  ],
  explanation:
    "Интеграл от x^2 на [0,1] равен 1/3. Заметим, что \int x^2 dx = x^3/3.",
  isDemo: false,
};

// KaTeX с ошибкой
const katexErrorQuestion: Question = {
  id: "q-katex",
  stem: {
    ...baseStem,
    content: [
      ...(baseStem as any).content,
      { type: "math", attrs: { value: "\\invalidcommand{" } },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Этот пример намеренно содержит ошибку KaTeX.",
          },
        ],
      },
    ],
  },
  options: [
    { id: "a", text: "Ошибочный вариант 1" },
    { id: "b", text: "Ошибочный вариант 2" },
  ],
  explanation:
    "Здесь будет объяснение, но из-за ошибки рендеринга формул в стемe вы увидите fallback и сообщение об ошибке.",
  isDemo: false,
};

const longText = Array.from(
  { length: 20 },
  (_, i) =>
    `Пояснение пункт ${i + 1}: подробное объяснение как доказательство, шаги решения и дополнительные замечания.`,
).join("\n\n");

const longExplanationQuestion: Question = {
  id: "q-long",
  stem: {
    ...baseStem,
    content: [
      ...(baseStem as any).content,
      {
        type: "paragraph",
        content: [{ type: "text", text: "Длинное пояснение доступно ниже." }],
      },
    ],
  },
  options: [
    { id: "a", text: "Вариант 1" },
    { id: "b", text: "Вариант 2" },
    { id: "c", text: "Вариант 3" },
  ],
  explanation: longText,
  isDemo: false,
};

const demoQuestion: Question = {
  id: "q-demo",
  stem: {
    ...baseStem,
    content: [
      ...(baseStem as any).content,
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Демонстрационная карточка: ответы доступны только в полной версии.",
          },
        ],
      },
    ],
  },
  options: [
    { id: "a", text: "Вариант 1" },
    { id: "b", text: "Вариант 2" },
    { id: "c", text: "Вариант 3" },
  ],
  explanation:
    "Краткое пояснение доступно в демо-режиме, подробное — в полной версии.",
  isDemo: true,
};

const QUESTIONS = [
  normalQuestion,
  katexErrorQuestion,
  longExplanationQuestion,
  demoQuestion,
];

function App() {
  const [index, setIndex] = useState(0);

  const handleCheck = async (_questionId: string, selectedId: string) => {
    // имитация проверки ответа
    await new Promise((r) => setTimeout(r, 400));
    return { correct: selectedId === "b" };
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 flex items-start justify-center py-12">
      <div className="w-full max-w-3xl flex flex-col items-center">
        <div className="mb-6 flex gap-2 items-center justify-start">
          <div className="rounded-lg bg-white border border-slate-200 shadow-sm inline-flex">
            {[
              "Обычная",
              "Ошибка KaTeX",
              "Длинное объяснение",
              "Демо (заблюрено)",
            ].map((label, i) => (
              <button
                key={label}
                onClick={() => setIndex(i)}
                className={`px-4 py-2 text-sm font-medium ${i === index ? "bg-slate-100 text-slate-900 rounded-lg" : "text-slate-600"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <QuestionCard question={QUESTIONS[index]} onCheck={handleCheck} />
      </div>
    </main>
  );
}

export default App;
