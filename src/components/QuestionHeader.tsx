"use client";
import Image from "next/image";
import Link from "next/link";
import ProgressBar from "./ProgressBar";
import { useQuizStoreContext } from "@/store/QuizStoreProvider";
import { useRouter } from "next/navigation";
import { quizRoutes } from "@/lib/utils";
import { Quiz } from "@/lib/types";

type QuestionHeaderProps = {
  previousQuestionLink: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  quizData: Quiz;
};

export default function QuestionHeader({
  previousQuestionLink,
  currentQuestionIndex,
  totalQuestions,
  quizData,
}: QuestionHeaderProps) {
  const resetAnswers = useQuizStoreContext((state) => state.resetAnswers);
  const router = useRouter();
  const handleReset = () => {
    resetAnswers();
    router.replace(quizRoutes.root(quizData));
  };
  return (
    <div className="mb-10 h-[72px]">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <div className="flex h-full items-center space-x-8">
          <Link className="flex items-center" href={previousQuestionLink}>
            <img
              src="/icons/chevron.svg"
              alt="Back"
              width={24}
              height={24}
              className="mr-2 size-6"
            />
            <span className="font-semibold">Back</span>
          </Link>
          <button onClick={handleReset} className="cursor-pointer text-red-700">
            Reset quiz
          </button>
        </div>
        <div>
          {currentQuestionIndex} of {totalQuestions}
        </div>
      </div>
      <ProgressBar
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />
    </div>
  );
}
