import { Question, Quiz } from "@/lib/types";
import useQuizStore from "@/store/quizStore";

import {
  getCurrentQuestion,
  getPreviousQuestionId,
  getVisibleQuestions,
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
