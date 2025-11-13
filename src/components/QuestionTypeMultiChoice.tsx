"use client";

import { MultiChoiceQuestion } from "@/lib/types";
import { useQuizStoreContext } from "@/store/QuizStoreProvider";
import QuestionHeading from "./QuestionHeading";
import Image from "next/image";
import ButtonCta from "./ButtonCta";
import { useQuizNav } from "@/lib/hooks";
import ButtonAnswer from "./ButtonAnswer";

type QuestionTypeMultiChoiceProps = {
  question: MultiChoiceQuestion;
};
export default function QuestionTypeMultiChoice({
  question,
}: QuestionTypeMultiChoiceProps) {
  const answers = useQuizStoreContext((store) => store.answers);
  const setAnswers = useQuizStoreContext((store) => store.setAnswers);
  const { goToNextQuestion } = useQuizNav(question.id);

  const currentAnswerInStore = answers[question.id];

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
    goToNextQuestion();
  };

  return (
    <section>
      <QuestionHeading title={question.title} text={question.text} />

      <div className="space-y-3">
        {question.options.map((option) => (
          <ButtonAnswer
            key={option.value}
            handleOnClick={() => toggleAnswer(option.value)}
            selected={selected.includes(option.value)}
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
            <span className="size-6">
              {selected.includes(option.value) ? (
                <img
                  src="/icons/check.svg"
                  alt="check"
                  width={24}
                  height={24}
                  className="size-6 object-contain"
                />
              ) : (
                <span className="inline-block size-6 rounded-full bg-gray-200"></span>
              )}
            </span>
          </ButtonAnswer>
        ))}
      </div>

      <ButtonCta handleOnClick={handleOnClick}>Continue</ButtonCta>
    </section>
  );
}
