import quizData from "@/data/quiz.json";
import { Quiz, Question, NextQuestionId } from "@/lib/types";
import useQuizStore from "@/store/quizStore";

import {
  getCurrentQuestion,
  getNextQuestionId,
  getPreviousQuestionId,
  getVisibleQuestions,
} from "./quizService";

type UseQuestionResult = {
  currentQuestion: Question | null;
  previousQuestionId: string | null;
  nextQuestionId: NextQuestionId;
  currentQuestionIndex: number;
  totalQuestions: number;
};
const data = quizData as Quiz;

export function useQuestion(id: string): UseQuestionResult {
  const answers = useQuizStore((store) => store.answers);

  const visibleQuestions = getVisibleQuestions(data, answers);

  const { currentQuestion, currentQuestionIndex } = getCurrentQuestion(
    visibleQuestions,
    id,
  );

  const previousQuestionId = getPreviousQuestionId(
    visibleQuestions,
    currentQuestionIndex,
  );

  const nextQuestionId = getNextQuestionId(
    visibleQuestions,
    currentQuestionIndex,
  );

  return {
    currentQuestion,
    previousQuestionId,
    nextQuestionId,
    currentQuestionIndex,
    totalQuestions: visibleQuestions.length,
  };
}
