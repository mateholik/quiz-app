import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../styles/globals.css";

import data from "@/data/quiz.json";
import { Quiz } from "@/lib/types";
import InitializeQuizStore from "@/components/InitializeQuizStore";

const quizData = data as Quiz;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quez App",
  description: "Kilo Health task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <InitializeQuizStore quizData={quizData} />
        <div className="bg-blue-200 p-4">APP header</div>
        {children}
        <div className="bg-blue-200 p-4">APP footer</div>
      </body>
    </html>
  );
}
