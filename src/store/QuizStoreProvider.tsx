"use client";

import React, { createContext, useContext, useState } from "react";
import { useStore } from "zustand";
import type { Quiz } from "@/lib/types";
import { createQuizStore, type QuizStore } from "@/store/quizStore";

export const QuizStoreContext = createContext<ReturnType<
  typeof createQuizStore
> | null>(null);

export function QuizStoreProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: Quiz;
}) {
  const [store] = useState(() => createQuizStore(initialData));
  return (
    <QuizStoreContext.Provider value={store}>
      {children}
    </QuizStoreContext.Provider>
  );
}

export function useQuizStoreContext<T>(selector: (state: QuizStore) => T): T {
  const store = useContext(QuizStoreContext);
  if (!store)
    throw new Error(
      "useQuizStoreContext must be used inside QuizStoreProvider",
    );
  return useStore(store, selector);
}

export function useQuizStoreApi() {
  const store = useContext(QuizStoreContext);
  if (!store)
    throw new Error("useQuizStoreApi must be used within QuizStoreProvider");
  return store; // this is the actual Zustand store instance
}
