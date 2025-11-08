"use client";
import QuestionRenderer from "@/components/QuestionRenderer";
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
      <div className="m-4 bg-blue-900 p-4">
        <div>Id: {currentQuestion?.id}</div>
        <div>Title: {currentQuestion?.title}</div>
        <div>Type: {currentQuestion?.type}</div>
      </div>
      <div className="m-4 mx-4 flex items-center justify-between bg-amber-900 p-4">
        {previousQestionId && (
          <div className="mt-8">
            <Link href={`/quiz/${previousQestionId}`}>Back</Link>
          </div>
        )}
        {nextQuestionId && (
          <div className="mt-8">
            <Link href={`/quiz/${nextQuestionId}`}>Next</Link>
          </div>
        )}
      </div>
      <div className="m-4 p-4">
        <QuestionRenderer question={currentQuestion} />
      </div>
    </div>
  );
}
