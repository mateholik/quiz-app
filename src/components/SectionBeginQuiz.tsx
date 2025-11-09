"use client";

import useQuizStore from "@/store/quizStore";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function SectionBeginQuiz() {
  const quizData = useQuizStore((store) => store.quizData);
  if (!quizData) notFound();

  const firstQuestionId = quizData.questions[0].id;
  return (
    <div>
      <h1>First Question ID: {firstQuestionId}</h1>
      <Link href={`/quiz/${firstQuestionId}`}>Start Quiz</Link>
    </div>
  );
}
