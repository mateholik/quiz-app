import { Quiz } from "@/lib/types";

/**
 * Centralized route builders for quiz navigation.
 * Prevents string duplication across components.
 */
export const quizRoutes = {
  root: (quiz: Quiz) => `/quiz/${quiz.id}`,
  question: (quiz: Quiz, questionId: string) =>
    `/quiz/${quiz.id}/${questionId}`,
  firstQuestion: (quiz: Quiz) => `/quiz/${quiz.id}/${quiz.questions[0].id}`,
};
