"use client";
import { QUESTION_TYPES } from "@/lib/consts";
import { Question } from "@/lib/types";
import QuestionTypeSingleChoice from "./QuestionTypeSingleChoice";
import QuestionTypeMultiChoice from "./QuestionTypeMultiChoice";
import QuestionTypeInput from "./QuestionTypeInput";
import QuestionTypeInfoSection from "./QuestionTypeInfoSection";

type QuestionTypesRendererProps = {
  question: Question;
};

export default function QuestionTypesRenderer({
  question,
}: QuestionTypesRendererProps) {
  switch (question.type) {
    case QUESTION_TYPES.SINGLE_CHOICE:
      return <QuestionTypeSingleChoice question={question} />;

    case QUESTION_TYPES.MULTI_CHOICE: {
      return <QuestionTypeMultiChoice question={question} />;
    }

    case QUESTION_TYPES.INPUT:
      return <QuestionTypeInput question={question} />;

    case QUESTION_TYPES.INFO_SECTION:
      return <QuestionTypeInfoSection question={question} />;

    default:
      return <div>Unsupported question type</div>;
  }
}
