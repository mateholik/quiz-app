"use client";

import { SingleChoiceQuestion } from "@/lib/types";
import { useQuizStoreContext } from "@/store/QuizStoreProvider";
import Image from "next/image";
import QuestionHeading from "./QuestionHeading";
import { useQuizNav } from "@/lib/hooks";
import ButtonAnswer from "./ButtonAnswer";

type QuestionTypeSingleChoiceProps = {
  question: SingleChoiceQuestion;
};
export default function QuestionTypeSingleChoice({
  question,
}: QuestionTypeSingleChoiceProps) {
  const answers = useQuizStoreContext((store) => store.answers);
  const setAnswers = useQuizStoreContext((store) => store.setAnswers);
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
          <ButtonAnswer
            key={option.value}
            handleOnClick={() => handleOnClick(option.value)}
            selected={currentAnswerInStore === option.value}
          >
            <span className="flex items-center gap-4">
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
            </span>
            <span>
              <img
                src="/icons/arrow.svg"
                alt="arrow"
                width={24}
                height={24}
                className="size-6 object-contain"
              />
            </span>
          </ButtonAnswer>
        ))}
      </div>
    </section>
  );
}
