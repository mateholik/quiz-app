"use client";

import { Quiz, StoreAnswers } from "@/lib/types";
import { createStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type QuizStore = {
  quizData: Quiz;
  setQuizData: (data: Quiz) => void;
  answers: StoreAnswers;
  setAnswers: (questionId: string, value: string | string[] | number) => void;
  resetAnswers: () => void;
};

// Create a new store instance factory (not singleton)
export function createQuizStore(initialData: Quiz) {
  return createStore<QuizStore>()(
    persist(
      (set) => ({
        quizData: initialData,
        setQuizData: (data) => set({ quizData: data }),
        answers: {},
        setAnswers: (questionId, value) =>
          set((state) => ({
            answers: { ...state.answers, [questionId]: value },
          })),
        resetAnswers: () => set({ answers: {} }),
      }),
      {
        name: initialData.id,
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ answers: state.answers }),
      },
    ),
  );
}
