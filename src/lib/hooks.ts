"use client";

import { Question, Quiz } from "@/lib/types";
import {
  useQuizStoreApi,
  useQuizStoreContext,
} from "@/store/QuizStoreProvider";
import { useRouter } from "next/navigation";

import {
  getCurrentQuestion,
  getPreviousQuestionId,
  getVisibleQuestions,
  computeNextQuestionId,
} from "./quizService";
import { quizRoutes } from "./utils";

type UseQuestionResult = {
  currentQuestion: Question | null;
  previousQuestionId: string | null;
  currentQuestionIndex: number;
  totalQuestions: number;
};

export function useQuestion(id: string, quizData: Quiz): UseQuestionResult {
  const answers = useQuizStoreContext((store) => store.answers);

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
  const quizData = useQuizStoreContext((store) => store.quizData);
  const quizStore = useQuizStoreApi();

  const goToNextQuestion = () => {
    const updatedAnswers = quizStore.getState().answers;
    const nextId = computeNextQuestionId(quizData, updatedAnswers, questionId);

    router.push(quizRoutes.question(quizData, nextId));
  };

  return { goToNextQuestion };
}
