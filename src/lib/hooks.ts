import quizData from "@/data/quiz.json";
import { Quiz, Question } from "@/lib/types";

import { isVisible } from "@/lib/utils";
import useQuizStore from "@/store/quizStore";

type UseQuestionResult = {
  currentQuestion: Question | null;
  previousQuestionId: string | null;
  nextQuestionId: string | null;
  currentQuestionIndex: number;
  totalQuestions: number;
};
const data = quizData as Quiz;

export function useQuestion(id: string): UseQuestionResult {
  const answers = useQuizStore((store) => store.answers);

  const visibleQuestions = data.questions.filter((question) =>
    isVisible(question, answers),
  );

  const currentQuestionIndex = visibleQuestions.findIndex(
    (question) => question.id === id,
  );

  const currentQuestion =
    currentQuestionIndex === -1 ? null : visibleQuestions[currentQuestionIndex];

  const previousQuestionId =
    currentQuestionIndex > 0
      ? visibleQuestions[currentQuestionIndex - 1].id
      : null;

  const nextQuestionId =
    currentQuestionIndex < visibleQuestions.length - 1
      ? visibleQuestions[currentQuestionIndex + 1].id
      : null;

  return {
    currentQuestion,
    previousQuestionId,
    nextQuestionId,
    currentQuestionIndex,
    totalQuestions: visibleQuestions.length,
  };
}
