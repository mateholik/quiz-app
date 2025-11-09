import { SPECIAL_ROUTE_IDS } from "./consts";
import { Quiz, StoreAnswers, Question, NextQuestionId } from "./types";

export function getVisibleQuestions(quizData: Quiz, answers: StoreAnswers) {
  return quizData.questions.filter((question) => {
    if (!question.visibleIf || question.visibleIf.length === 0) return true;

    return question.visibleIf.every((condition) => {
      const answerFromStore = answers[condition.questionId];

      if (Array.isArray(answerFromStore)) {
        return answerFromStore.includes(String(condition.equals));
      }

      return answerFromStore === condition.equals;
    });
  });
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

export function computeNextQuestionId(
  quizData: Quiz,
  updatedAnswers: StoreAnswers,
  questionId: NextQuestionId,
) {
  const visibleQuestions = getVisibleQuestions(quizData, updatedAnswers);
  const { currentQuestionIndex } = getCurrentQuestion(
    visibleQuestions,
    questionId,
  );
  const computedNextId = getNextQuestionId(
    visibleQuestions,
    currentQuestionIndex,
  );

  return computedNextId;
}
