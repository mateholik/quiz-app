"use client";

import { useEffect, useState } from "react";
import { useQuizStoreContext } from "@/store/QuizStoreProvider";

export default function Page() {
  const answers = useQuizStoreContext((store) => store.answers);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto flex h-screen items-center justify-center px-4">
        <div className="w-full text-center">
          <div className="mb-6 text-2xl font-semibold text-gray-800">
            Analyzing your data...
          </div>

          <div role="status" className="flex justify-center">
            <svg
              aria-hidden="true"
              className="size-16 animate-spin fill-[#AA00FF] text-gray-200"
              viewBox="0 0 100 101"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex h-screen items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-xl border border-gray-200 p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Your Answers
        </h2>

        {Object.keys(answers).length === 0 ? (
          <div className="text-center text-gray-500">No answers found.</div>
        ) : (
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-600">
                <th className="px-4 py-2 font-medium">Question ID</th>
                <th className="px-4 py-2 font-medium">Answer</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(answers).map(([questionId, answer]) => (
                <tr
                  key={questionId}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {questionId}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {Array.isArray(answer) ? answer.join(", ") : String(answer)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
