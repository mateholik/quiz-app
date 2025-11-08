import type { Quiz } from "./types";
import type { Answers, Question } from "./types";

export async function getData(): Promise<Quiz> {
  const data = (await import("../data/quiz.json")).default;
  return data as Quiz;
}

export function isVisible(q: Question, answers: Answers): boolean {
  if (!q.visibleIf || q.visibleIf.length === 0) return true;
  return q.visibleIf.every((cond) => {
    const val = answers[cond.questionId];
    return val === cond.equals;
  });
}
