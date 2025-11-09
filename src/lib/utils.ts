import type { Quiz } from "./types";
import type { StoreAnswers, Question } from "./types";

export async function getData(): Promise<Quiz> {
  const data = (await import("../data/quiz.json")).default;
  return data as Quiz;
}

export function isVisible(question: Question, answers: StoreAnswers): boolean {
  if (!question.visibleIf || question.visibleIf.length === 0) return true;
  return question.visibleIf.every((condition) => {
    const answerIdFromStore = answers[condition.questionId];
    return answerIdFromStore === condition.equals;
  });
}
