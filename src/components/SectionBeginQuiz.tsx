"use client";

import useQuizStore from "@/store/quizStore";

import { notFound, useRouter } from "next/navigation";
import ButtonCta from "./ButtonCta";
import Image from "next/image";

export default function SectionBeginQuiz() {
  const quizData = useQuizStore((store) => store.quizData);
  if (!quizData) notFound();

  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/quiz/${quizData.questions[0].id}`);
  };

  return (
    <div className="flex flex-col-reverse items-center gap-6 md:flex-row">
      <div className="flex-1">
        <h1 className="mb-6 text-3xl font-bold md:text-6xl">
          {quizData.title}
        </h1>
        <div className="md:max-w-[260px]">
          <ButtonCta handleOnClick={handleOnClick}>
            {quizData.ctaText}
          </ButtonCta>
        </div>
      </div>
      <div className="flex-1">
        <Image
          alt={quizData.title}
          src={quizData.imageUrl}
          width={640}
          height={500}
        />
      </div>
    </div>
  );
}
