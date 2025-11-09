"use client";

import QuestionTypesRenderer from "@/components/QuestionTypesRenderer";
import { useQuestion } from "@/lib/hooks";
import { use } from "react";
import { notFound } from "next/navigation";
import QuestionHeader from "@/components/QuestionHeader";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const {
    currentQuestion,
    previousQuestionId,
    nextQuestionId,
    currentQuestionIndex,
    totalQuestions,
  } = useQuestion(id);

  // console.log({
  //   currentQuestion,
  //   previousQuestionId,
  //   nextQuestionId,
  //   currentQuestionIndex,
  //   totalQuestions,
  // });

  if (!currentQuestion) notFound();

  return (
    <>
      <QuestionHeader
        nextQuestionId={nextQuestionId}
        previousQuestionId={previousQuestionId}
        currentQuestionIndex={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
      />
      <div className="container mx-auto px-4">
        <QuestionTypesRenderer
          question={currentQuestion}
          nextQuestionId={nextQuestionId}
        />
      </div>
    </>
  );
}
