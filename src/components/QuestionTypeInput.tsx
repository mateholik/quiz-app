"use client";

import { InputQuestion } from "@/lib/types";
import useQuizStore from "@/store/quizStore";
import QuestionHeading from "./QuestionHeading";
import ButtonCta from "./ButtonCta";
import { ChangeEvent, useRef } from "react";
import { useQuizNav } from "@/lib/hooks";

type QuestionTypeInputProps = {
  question: InputQuestion;
};
export default function QuestionTypeInput({
  question,
}: QuestionTypeInputProps) {
  const answers = useQuizStore((store) => store.answers);
  const setAnswers = useQuizStore((store) => store.setAnswers);
  const inputRef = useRef<HTMLInputElement>(null);
  const { goToNextQuestion } = useQuizNav(question.id);

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

    goToNextQuestion();
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
          className="w-full rounded-lg border p-4 focus-within:border-2 focus-within:border-[#AA00FF] focus:ring-0 focus:outline-none"
          placeholder={question.placeholder || "Enter a value"}
          {...question.validation}
        />
        <ButtonCta type="submit">Continue</ButtonCta>
      </form>
    </section>
  );
}
