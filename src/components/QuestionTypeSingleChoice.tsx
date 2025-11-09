"use client";

import quizData from "@/data/quiz.json";
import { SPECIAL_ROUTE_IDS } from "@/lib/consts";
import { isVisible } from "@/lib/utils";
import { NextQuestionId, Quiz, SingleChoiceQuestion } from "@/lib/types";
import useQuizStore from "@/store/quizStore";
import Image from "next/image";
import QuestionHeading from "./QuestionHeading";
import { useRouter } from "next/navigation";
import {
  getCurrentQuestion,
  getNextQuestionId,
  getVisibleQuestions,
} from "@/lib/quizService";

type QuestionTypeSingleChoiceProps = {
  question: SingleChoiceQuestion;
  nextQuestionId: NextQuestionId;
};
export default function QuestionTypeSingleChoice({
  question,
}: QuestionTypeSingleChoiceProps) {
  const answers = useQuizStore((store) => store.answers);
  const setAnswers = useQuizStore((store) => store.setAnswers);
  const currentAnswerInStore = answers[question.id];

  const router = useRouter();

  const data = quizData as Quiz;

  const handleOnClick = (optionValue: string) => {
    setAnswers(question.id, optionValue);

    const updatedAnswers = useQuizStore.getState().answers;
    const visibleQuestions = getVisibleQuestions(data, updatedAnswers);
    const { currentQuestionIndex } = getCurrentQuestion(
      visibleQuestions,
      question.id,
    );
    const computedNextId = getNextQuestionId(
      visibleQuestions,
      currentQuestionIndex,
    );

    router.push(`/quiz/${computedNextId}`);
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
