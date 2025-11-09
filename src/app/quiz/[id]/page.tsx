"use client";

import QuestionTypesRenderer from "@/components/QuestionTypesRenderer";
import { useQuestion } from "@/lib/hooks";
import { use } from "react";
import { notFound } from "next/navigation";
import QuestionHeader from "@/components/QuestionHeader";
import useQuizStore from "@/store/quizStore";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const quizData = useQuizStore((store) => store.quizData);

  if (!quizData) notFound();

  const {
    currentQuestion,
    previousQuestionId,
    currentQuestionIndex,
    totalQuestions,
  } = useQuestion(id, quizData);

  if (!currentQuestion) notFound();

  return (
    <>
      <QuestionHeader
        previousQuestionId={previousQuestionId}
        currentQuestionIndex={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
      />
      <div className="container mx-auto px-4">
        <QuestionTypesRenderer question={currentQuestion} />
      </div>
    </>
  );
}
