"use client";

import QuestionTypesRenderer from "@/components/QuestionTypesRenderer";
import { useQuestion } from "@/lib/hooks";
import QuestionHeader from "@/components/QuestionHeader";
import { useQuizStoreContext } from "@/store/QuizStoreProvider";
import { quizRoutes } from "@/lib/utils";

export default function QuestionScreen({ id }: { id: string }) {
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
        quizData={quizData}
        previousQuestionLink={
          previousQuestionId
            ? quizRoutes.question(quizData, previousQuestionId)
            : quizRoutes.root(quizData)
        }
        currentQuestionIndex={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
      />
      <div className="mx-auto mb-8 max-w-[400px] px-4">
        <QuestionTypesRenderer question={currentQuestion} />
      </div>
    </>
  );
}
