"use client";
import { QUESTION_TYPES } from "@/lib/consts";
import { Question } from "@/lib/types";
import useQuizStore from "@/store/quizStore";

type QuestionRendererProps = {
  question: Question;
};

export default function QuestionRenderer({ question }: QuestionRendererProps) {
  const answers = useQuizStore((store) => store.answers);
  const setAnswer = useQuizStore((store) => store.setAnswer);

  const currentAnswerInStore = answers[question.id];

  switch (question.type) {
    case QUESTION_TYPES.SINGLE_CHOICE:
      return (
        <div className="space-y-3">
          {question.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setAnswer(question.id, opt.value)}
              className={`w-full rounded-lg border py-3 ${
                currentAnswerInStore === opt.value
                  ? "border-purple-600"
                  : "border-gray-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      );

    case QUESTION_TYPES.MULTI_CHOICE: {
      const selected = Array.isArray(currentAnswerInStore)
        ? currentAnswerInStore
        : [];
      const toggle = (val: string) => {
        const next = selected.includes(val)
          ? selected.filter((v) => v !== val)
          : [...selected, val];
        setAnswer(question.id, next);
      };
      return (
        <div className="space-y-3">
          {question.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => toggle(opt.value)}
              className={`w-full rounded-lg border py-3 ${
                selected.includes(opt.value)
                  ? "border-purple-600"
                  : "border-gray-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      );
    }

    case QUESTION_TYPES.INPUT:
      return (
        <input
          type="number"
          value={currentAnswerInStore ?? ""}
          onChange={(e) => setAnswer(question.id, Number(e.target.value))}
          className="w-full rounded-lg border p-3"
          placeholder="Enter a number"
        />
      );

    default:
      return <div>Unsupported question type</div>;
  }
}
