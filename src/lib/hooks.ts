import quizData from "@/data/quiz.json";
import { Quiz, Question, NextQuestionId } from "@/lib/types";

import { isVisible } from "@/lib/utils";
import useQuizStore from "@/store/quizStore";
import { SPECIAL_ROUTE_IDS } from "./consts";

type UseQuestionResult = {
  currentQuestion: Question | null;
  previousQuestionId: string | null;
  nextQuestionId: NextQuestionId;
  currentQuestionIndex: number;
  totalQuestions: number;
};

export function useQuestion(id: string): UseQuestionResult {
  const data = quizData as Quiz;
  const answers = useQuizStore((store) => store.answers);

  const visibleQuestions = data.questions.filter((question) =>
    isVisible(question, answers),
  );

  console.log("answers", 3, answers);
  console.log(
    "visibleQuestions",
    4,
    visibleQuestions.map((q) => q.id),
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
      : SPECIAL_ROUTE_IDS.LOADING;

  return {
    currentQuestion,
    previousQuestionId,
    nextQuestionId,
    currentQuestionIndex,
    totalQuestions: visibleQuestions.length,
  };
}
