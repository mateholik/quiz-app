import data from "@/data/quizes.json";
import { Quiz } from "@/lib/types";
import { QuizStoreProvider } from "@/store/QuizStoreProvider";
import { use } from "react";

const QuizesData = data as Quiz[];

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = use(params);

  const quiz = QuizesData.find((quiz) => quiz.id === quizId);
  if (!quiz) throw new Error("Quiz not found");

  return (
    <div>
      <QuizStoreProvider initialData={quiz}>{children}</QuizStoreProvider>
    </div>
  );
}
