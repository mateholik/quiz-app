import { getData } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await getData();
  const currentQuestionIndex = data.questions.findIndex(
    (question) => question.id === id,
  );

  if (currentQuestionIndex === -1) notFound();
  const currentQuestion = data.questions[currentQuestionIndex];
  const previousQestionId =
    currentQuestionIndex > 0
      ? data.questions[currentQuestionIndex - 1].id
      : null;
  const nextQuestionId =
    currentQuestionIndex < data.questions.length - 1
      ? data.questions[currentQuestionIndex + 1].id
      : null;

  return (
    <div>
      <div>Id: {currentQuestion?.id}</div>
      <div>Title: {currentQuestion?.title}</div>
      <div>Type: {currentQuestion?.type}</div>
      {previousQestionId && (
        <div className="mt-8">
          <Link href={`/quiz/${previousQestionId}`}>Back</Link>
        </div>
      )}
      {nextQuestionId && (
        <div className="mt-8">
          <Link href={`/quiz/${nextQuestionId}`}>Next</Link>
        </div>
      )}
    </div>
  );
}
