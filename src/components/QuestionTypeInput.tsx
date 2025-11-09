import { InputQuestion } from "@/lib/types";
import useQuizStore from "@/store/quizStore";
import QuestionHeading from "./QuestionHeading";
import Button from "./Button";
import { computeNextQuestionId } from "@/lib/quizService";
import { notFound, useRouter } from "next/navigation";
import { ChangeEvent, useRef } from "react";

type QuestionTypeInputProps = {
  question: InputQuestion;
};
export default function QuestionTypeInput({
  question,
}: QuestionTypeInputProps) {
  const answers = useQuizStore((store) => store.answers);
  const setAnswers = useQuizStore((store) => store.setAnswers);
  const quizData = useQuizStore((store) => store.quizData);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  if (!quizData) notFound();

  const currentAnswerInStore = answers[question.id];

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    "validateNativeForm";
    setAnswers(question.id, Number(event.target.value));
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const input = inputRef.current;
    if (!input) return;

    const isValid = input.reportValidity();
    if (!isValid) return;

    const nextId = computeNextQuestionId(quizData, answers, question.id);

    router.push(`/quiz/${nextId}`);
  };

  return (
    <section>
      <QuestionHeading title={question.title} text={question.text} />
      <form onSubmit={handleOnSubmit}>
        <input
          ref={inputRef}
          type={question.inputType || "text"}
          value={currentAnswerInStore ?? ""}
          onChange={handleOnChange}
          className="w-full rounded-lg border p-3"
          placeholder={question.placeholder || "Enter a value"}
          {...question.validation}
        />
        <Button type="submit">Continue</Button>
      </form>
    </section>
  );
}
