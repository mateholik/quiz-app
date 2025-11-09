"use client";

import { Question, Quiz } from "@/lib/types";
import useQuizStore from "@/store/quizStore";
import { notFound, useRouter } from "next/navigation";

import {
  getCurrentQuestion,
  getPreviousQuestionId,
  getVisibleQuestions,
  computeNextQuestionId,
} from "./quizService";

type UseQuestionResult = {
  currentQuestion: Question | null;
  previousQuestionId: string | null;
  currentQuestionIndex: number;
  totalQuestions: number;
};

export function useQuestion(id: string, quizData: Quiz): UseQuestionResult {
  const answers = useQuizStore((store) => store.answers);

  const visibleQuestions = getVisibleQuestions(quizData, answers);

  const { currentQuestion, currentQuestionIndex } = getCurrentQuestion(
    visibleQuestions,
    id,
  );

  const previousQuestionId = getPreviousQuestionId(
    visibleQuestions,
    currentQuestionIndex,
  );

  return {
    currentQuestion,
    previousQuestionId,
    currentQuestionIndex,
    totalQuestions: visibleQuestions.length,
  };
}

type UseQuizNavResult = {
  goToNextQuestion: () => void;
};

export function useQuizNav(questionId: string): UseQuizNavResult {
  const router = useRouter();
  const quizData = useQuizStore((store) => store.quizData);

  const goToNextQuestion = () => {
    if (!quizData) {
      notFound();
    }

    const updatedAnswers = useQuizStore.getState().answers;
    const nextId = computeNextQuestionId(quizData, updatedAnswers, questionId);

    router.push(`/quiz/${nextId}`);
  };

  return { goToNextQuestion };
}
