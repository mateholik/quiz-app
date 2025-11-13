import data from "@/data/quizes.json";
import { Quiz } from "@/lib/types";
import { quizRoutes } from "@/lib/utils";
import Link from "next/link";

const quizesData = data as Quiz[];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-3xl">Choose quiz to start:</h1>
      <div className="flex flex-col gap-4">
        {quizesData?.map((quiz) => (
          <Link
            className="hover:underline"
            key={quiz.id}
            href={quizRoutes.root(quiz)}
          >
            {quiz.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
