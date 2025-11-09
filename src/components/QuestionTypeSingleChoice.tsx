"use client";

import { SingleChoiceQuestion } from "@/lib/types";
import useQuizStore from "@/store/quizStore";
import Image from "next/image";
import QuestionHeading from "./QuestionHeading";
import { useQuizNav } from "@/lib/hooks";

type QuestionTypeSingleChoiceProps = {
  question: SingleChoiceQuestion;
};
export default function QuestionTypeSingleChoice({
  question,
}: QuestionTypeSingleChoiceProps) {
  const answers = useQuizStore((store) => store.answers);
  const setAnswers = useQuizStore((store) => store.setAnswers);
  const { goToNextQuestion } = useQuizNav(question.id);

  const currentAnswerInStore = answers[question.id];

  const handleOnClick = (optionValue: string) => {
    setAnswers(question.id, optionValue);

    goToNextQuestion();
  };

  return (
    <section>
      <QuestionHeading title={question.title} text={question.text} />

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleOnClick(option.value)}
            className={`flex w-full items-center rounded-lg border p-4 ${
              currentAnswerInStore === option.value
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
    </section>
  );
}
