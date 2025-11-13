import data from "@/data/quizes.json";
import { Quiz } from "@/lib/types";
import { QuizStoreProvider } from "@/store/QuizStoreProvider";
import { notFound } from "next/navigation";

const QuizesData = data as Quiz[];

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;

  const quiz = QuizesData.find((quiz) => quiz.id === quizId);
  if (!quiz) notFound();

  return (
    <div>
      <QuizStoreProvider initialData={quiz}>{children}</QuizStoreProvider>
    </div>
  );
}
