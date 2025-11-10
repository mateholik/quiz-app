"use client";

import QuestionTypesRenderer from "@/components/QuestionTypesRenderer";
import { useQuestion } from "@/lib/hooks";
import { use } from "react";
import QuestionHeader from "@/components/QuestionHeader";
import { useQuizStoreContext } from "@/store/QuizStoreProvider";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const quizData = useQuizStoreContext((store) => store.quizData);

  const {
    currentQuestion,
    previousQuestionId,
    currentQuestionIndex,
    totalQuestions,
  } = useQuestion(id, quizData);

  if (!currentQuestion) throw new Error("Error loading currentQuestion");

  return (
    <>
      <QuestionHeader
        previousQuestionId={previousQuestionId}
        currentQuestionIndex={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
      />
      <div className="mx-auto mb-8 max-w-[400px] px-4">
        <QuestionTypesRenderer question={currentQuestion} />
      </div>
    </>
  );
}
