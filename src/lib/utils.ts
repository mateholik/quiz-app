import type { StoreAnswers, Question } from "./types";

export function isVisible(question: Question, answers: StoreAnswers): boolean {
  if (!question.visibleIf || question.visibleIf.length === 0) return true;
  return question.visibleIf.every((condition) => {
    const answerIdFromStore = answers[condition.questionId];
    return answerIdFromStore === condition.equals;
  });
}
