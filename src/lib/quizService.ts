import { SPECIAL_ROUTE_IDS } from "./consts";
import { Quiz, StoreAnswers, Question, NextQuestionId } from "./types";
import { isVisible } from "./utils";

export function getVisibleQuestions(quizData: Quiz, answers: StoreAnswers) {
  return quizData.questions.filter((q) => isVisible(q, answers));
}

export function getCurrentQuestion(visibleQuestions: Question[], id: string) {
  const index = visibleQuestions.findIndex((q) => q.id === id);
  return {
    currentQuestion: index === -1 ? null : visibleQuestions[index],
    currentQuestionIndex: index,
  };
}

export function getNextQuestionId(
  visibleQuestions: Question[],
  currentQuestionIndex: number,
): NextQuestionId {
  return currentQuestionIndex < visibleQuestions.length - 1
    ? visibleQuestions[currentQuestionIndex + 1].id
    : SPECIAL_ROUTE_IDS.LOADING;
}

export function getPreviousQuestionId(
  visibleQuestions: Question[],
  currentQuestionIndex: number,
) {
  return currentQuestionIndex > 0
    ? visibleQuestions[currentQuestionIndex - 1].id
    : null;
}
