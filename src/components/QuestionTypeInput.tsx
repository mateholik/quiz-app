import { InputQuestion } from "@/lib/types";
import useQuizStore from "@/store/quizStore";
import QuestionHeading from "./QuestionHeading";

type QuestionTypeInputProps = {
  question: InputQuestion;
};
export default function QuestionTypeInput({
  question,
}: QuestionTypeInputProps) {
  const answers = useQuizStore((store) => store.answers);
  const setAnswers = useQuizStore((store) => store.setAnswers);
  const currentAnswerInStore = answers[question.id];

  return (
    <section>
      <QuestionHeading title={question.title} text={question.text} />
      <input
        type={question.inputType || "text"}
        value={currentAnswerInStore ?? ""}
        onChange={(e) => setAnswers(question.id, Number(e.target.value))}
        className="w-full rounded-lg border p-3"
        placeholder={question.placeholder || "Enter a value"}
      />
    </section>
  );
}
