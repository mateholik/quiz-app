import data from "@/data/quizes.json";
import { Quiz } from "@/lib/types";
import { quizRoutes } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

const quizesData = data as Quiz[] | null;

// not sure how to handle this.it gives error: Next.js navigation API is not allowed to be used in Pages Router.
if (!quizesData) notFound();

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
