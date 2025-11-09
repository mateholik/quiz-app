import { InfoSection } from "@/lib/types";
import Image from "next/image";
import QuestionHeading from "./QuestionHeading";
import parse from "html-react-parser";

type QuestionTypeInfoSectionProps = {
  question: InfoSection;
};
export default function QuestionTypeInfoSection({
  question,
}: QuestionTypeInfoSectionProps) {
  return (
    <section>
      <QuestionHeading title={question.title} text={question.text} />

      {question.imageUrl && (
        <Image
          src={question.imageUrl}
          alt={question.title}
          width={352}
          height={352}
          className="mx-auto w-full max-w-[352px] object-contain"
        />
      )}
      {question.bottomText && (
        <p className="mt-4">{parse(question.bottomText)}</p>
      )}
    </section>
  );
}
