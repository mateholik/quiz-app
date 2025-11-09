"use client";

import { InfoSection } from "@/lib/types";
import Image from "next/image";
import QuestionHeading from "./QuestionHeading";
import parse from "html-react-parser";
import Button from "./Button";
import useQuizStore from "@/store/quizStore";
import { computeNextQuestionId } from "@/lib/quizService";
import { notFound, useRouter } from "next/navigation";

type QuestionTypeInfoSectionProps = {
  question: InfoSection;
};
export default function QuestionTypeInfoSection({
  question,
}: QuestionTypeInfoSectionProps) {
  const answers = useQuizStore((store) => store.answers);
  const quizData = useQuizStore((store) => store.quizData);
  const router = useRouter();

  if (!quizData) notFound();

  const handleOnClick = () => {
    const nextId = computeNextQuestionId(quizData, answers, question.id);

    router.push(`/quiz/${nextId}`);
  };
  return (
    <section>
      <QuestionHeading title={question.title} text={question.text} />

      {question.imageUrl && (
        <Image
          src={question.imageUrl}
          alt={question.title}
          width={352}
          height={352}
          className="mx-auto w-full max-w-[352px] object-contain"
        />
      )}
      {question.bottomText && (
        <p className="mt-4">{parse(question.bottomText)}</p>
      )}
      <Button handleOnClick={handleOnClick}>Continue</Button>
    </section>
  );
}
