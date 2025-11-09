import Image from "next/image";
import Link from "next/link";
import ProgressBar from "./ProgressBar";

type QuestionHeaderProps = {
  previousQuestionId: string | null;
  currentQuestionIndex: number;
  totalQuestions: number;
};

export default function QuestionHeader({
  previousQuestionId,
  currentQuestionIndex,
  totalQuestions,
}: QuestionHeaderProps) {
  return (
    <div className="mb-10 h-[72px]">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <div className="flex h-full space-x-8">
          {previousQuestionId && (
            <Link
              className="flex items-center"
              href={`/quiz/${previousQuestionId}`}
            >
              <Image
                src="/icons/chevron.svg"
                alt="Back"
                width={24}
                height={24}
                className="mr-2 size-6"
              />
              <span className="font-semibold">Back</span>
            </Link>
          )}
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
