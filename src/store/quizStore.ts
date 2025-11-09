"use client";

import { Quiz, StoreAnswers } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type QuizStore = {
  quizData: Quiz | null;
  setQuizData: (data: Quiz) => void;
  answers: StoreAnswers;
  setAnswers: (questionId: string, value: string | string[] | number) => void;
  resetAnswers: () => void;
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      quizData: null,
      setQuizData: (data) => set({ quizData: data }),
      answers: {},
      setAnswers: (questionId, value) =>
        set((store) => {
          return {
            answers: { ...store.answers, [questionId]: value },
          };
        }),
      resetAnswers: () => set({ answers: {} }),
    }),
    {
      name: "quiz-answers",
      partialize: (store) => ({ answers: store.answers }),
    },
  ),
);

export default useQuizStore;
