"use client";
import { QUESTION_TYPES } from "@/lib/consts";
import { Question } from "@/lib/types";
import QuestionSingleChoiceType from "./QuestionSingleChoiceType";
import QuestionMultiChoiceType from "./QuestionMultiChoiceType";
import QuestionInputType from "./QuestionInputType";
import QuestionInfoSectionType from "./QuestionInfoSectionType";

type QuestionTypesRendererProps = {
  question: Question;
};

export default function QuestionTypesRenderer({
  question,
}: QuestionTypesRendererProps) {
  switch (question.type) {
    case QUESTION_TYPES.SINGLE_CHOICE:
      return <QuestionSingleChoiceType question={question} />;

    case QUESTION_TYPES.MULTI_CHOICE: {
      return <QuestionMultiChoiceType question={question} />;
    }

    case QUESTION_TYPES.INPUT:
      return <QuestionInputType question={question} />;

    case QUESTION_TYPES.INFO_SECTION:
      return <QuestionInfoSectionType question={question} />;

    default:
      return <div>Unsupported question type</div>;
  }
}
