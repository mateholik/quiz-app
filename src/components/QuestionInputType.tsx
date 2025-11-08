import { InputQuestion } from "@/lib/types";
import useQuizStore from "@/store/quizStore";
import QuestionCommonHeading from "./QuestionCommonHeading";

type QuestionInputTypeProps = {
  question: InputQuestion;
};
export default function QuestionInputType({
  question,
}: QuestionInputTypeProps) {
  const answers = useQuizStore((store) => store.answers);
  const setAnswers = useQuizStore((store) => store.setAnswers);
  const currentAnswerInStore = answers[question.id];

  return (
    <section>
      <QuestionCommonHeading title={question.title} text={question.text} />
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
