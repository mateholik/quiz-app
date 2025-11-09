"use client";
import { QUESTION_TYPES } from "@/lib/consts";
import { NextQuestionId, Question } from "@/lib/types";
import QuestionTypeSingleChoice from "./QuestionTypeSingleChoice";
import QuestionTypeMultiChoice from "./QuestionTypeMultiChoice";
import QuestionTypeInput from "./QuestionTypeInput";
import QuestionTypeInfoSection from "./QuestionTypeInfoSection";

type QuestionTypesRendererProps = {
  question: Question;
  nextQuestionId: NextQuestionId;
};

export default function QuestionTypesRenderer({
  question,
  nextQuestionId,
}: QuestionTypesRendererProps) {
  switch (question.type) {
    case QUESTION_TYPES.SINGLE_CHOICE:
      return (
        <QuestionTypeSingleChoice
          question={question}
          nextQuestionId={nextQuestionId}
        />
      );

    case QUESTION_TYPES.MULTI_CHOICE: {
      return (
        <QuestionTypeMultiChoice
          question={question}
          nextQuestionId={nextQuestionId}
        />
      );
    }

    case QUESTION_TYPES.INPUT:
      return <QuestionTypeInput question={question} />;

    case QUESTION_TYPES.INFO_SECTION:
      return <QuestionTypeInfoSection question={question} />;

    default:
      return <div>Unsupported question type</div>;
  }
}
