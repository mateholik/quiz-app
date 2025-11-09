"use client";

import { MultiChoiceQuestion } from "@/lib/types";
import useQuizStore from "@/store/quizStore";
import QuestionHeading from "./QuestionHeading";
import Image from "next/image";
import Button from "./Button";
import { notFound, useRouter } from "next/navigation";
import { computeNextQuestionId } from "@/lib/quizService";

type QuestionTypeMultiChoiceProps = {
  question: MultiChoiceQuestion;
};
export default function QuestionTypeMultiChoice({
  question,
}: QuestionTypeMultiChoiceProps) {
  const answers = useQuizStore((store) => store.answers);
  const setAnswers = useQuizStore((store) => store.setAnswers);
  const quizData = useQuizStore((store) => store.quizData);

  if (!quizData) notFound();

  const currentAnswerInStore = answers[question.id];

  const router = useRouter();

  const selected = Array.isArray(currentAnswerInStore)
    ? currentAnswerInStore
    : [];

  const toggleAnswer = (value: string) => {
    const updatedAnswers = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setAnswers(question.id, updatedAnswers);
  };

  const handleOnClick = () => {
    const nextId = computeNextQuestionId(quizData, answers, question.id);
    router.push(`/quiz/${nextId}`);
  };

  return (
    <section>
      <QuestionHeading title={question.title} text={question.text} />

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => toggleAnswer(option.value)}
            className={`flex w-full items-center rounded-lg border p-4 ${
              selected.includes(option.value)
                ? "border-purple-600"
                : "border-gray-300"
            }`}
          >
            {option.imageUrl && (
              <Image
                src={option.imageUrl}
                alt={option.label}
                width={56}
                height={56}
                className="size-14 object-contain"
              />
            )}
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      <Button handleOnClick={handleOnClick}>Continue</Button>
    </section>
  );
}
