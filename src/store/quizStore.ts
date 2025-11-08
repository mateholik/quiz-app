"use client";

import { StoreAnswers } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type QuizStore = {
  answers: StoreAnswers;
  setAnswers: (questionId: string, value: string | string[] | number) => void;
  reset: () => void;
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      answers: {},
      setAnswers: (questionId, value) =>
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
