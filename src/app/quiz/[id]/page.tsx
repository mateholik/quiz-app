"use client";
import QuestionTypesRenderer from "@/components/QuestionTypesRenderer";
import { isVisible } from "@/lib/utils";

import Link from "next/link";
import { notFound } from "next/navigation";
import useQuizStore from "@/store/quizStore";
import quizData from "@/data/quiz.json";
import { use } from "react";
import { Quiz } from "@/lib/types";

const data = quizData as Quiz;

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const answers = useQuizStore((store) => store.answers);
  const { id } = use(params);

  const visibleQuestions = data.questions.filter((question) =>
    isVisible(question, answers),
  );

  const currentQuestionIndex = visibleQuestions.findIndex(
    (question) => question.id === id,
  );

  if (currentQuestionIndex === -1) notFound();

  const currentQuestion = visibleQuestions[currentQuestionIndex];
  const previousQestionId =
    currentQuestionIndex > 0
      ? visibleQuestions[currentQuestionIndex - 1].id
      : null;
  const nextQuestionId =
    currentQuestionIndex < visibleQuestions.length - 1
      ? visibleQuestions[currentQuestionIndex + 1].id
      : null;

  return (
    <div>
      <div className="m-4 bg-blue-100 p-4">
        <div>Id: {currentQuestion?.id}</div>
        <div>Title: {currentQuestion?.title}</div>
        <div>Type: {currentQuestion?.type}</div>
      </div>
      <div className="m-4 p-4">
        <QuestionTypesRenderer question={currentQuestion} />
      </div>
      <div className="m-4 flex flex-col gap-4">
        {previousQestionId && (
          <Link
            className="w-full rounded-lg border bg-amber-100 p-4 text-center"
            href={`/quiz/${previousQestionId}`}
          >
            Back
          </Link>
        )}
        {nextQuestionId && (
          <Link
            className="w-full rounded-lg border bg-amber-100 p-4 text-center"
            href={`/quiz/${nextQuestionId}`}
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
