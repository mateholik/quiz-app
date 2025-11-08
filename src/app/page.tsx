import { getData } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  const data = await getData();
  console.log(data.questions[0].id);
  const firstQuestionId = data.questions[0].id;

  return (
    <div>
      <h1>First Question ID: {firstQuestionId}</h1>
      <Link href={`/quiz/${firstQuestionId}`}>Start Quiz</Link>
    </div>
  );
}
