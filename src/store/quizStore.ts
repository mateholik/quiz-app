"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type StoreAnswers = Record<string, string | string[] | number | undefined>;

type QuizStore = {
  answers: StoreAnswers;
  setAnswer: (questionId: string, value: string | string[] | number) => void;
  reset: () => void;
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      answers: {},
      setAnswer: (questionId, value) =>
        set((store) => {
          console.log(questionId, value);
          return {
            answers: { ...store.answers, [questionId]: value },
          };
        }),
      reset: () => set({ answers: {} }),
    }),
    { name: "quiz-answers" }, // key in localStorage
  ),
);

export default useQuizStore;
