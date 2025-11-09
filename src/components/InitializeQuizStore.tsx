"use client";
import { Quiz } from "@/lib/types";
import useQuizStore from "@/store/quizStore";

type InitializeQuizStoreProps = {
  quizData: Quiz;
};

export default function InitializeQuizStore({
  quizData,
}: InitializeQuizStoreProps) {
  const setQuizData = useQuizStore((store) => store.setQuizData);
  setQuizData(quizData);

  return null;
}
