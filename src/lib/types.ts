import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { QUESTION_TYPES, SPECIAL_ROUTE_IDS } from "./consts";

export type Quiz = {
  id: string;
  title: string;
  ctaText: string;
  imageUrl: string;
  description?: string;
  questions: Question[];
};

export type QuestionBase = {
  id: string;
  title: string;
  text?: string;
  visibleIf?: { questionId: string; equals: string | number | boolean }[];
};

export type SingleChoiceQuestion = QuestionBase & {
  type: typeof QUESTION_TYPES.SINGLE_CHOICE;
  options: Answer[];
};

export type MultiChoiceQuestion = QuestionBase & {
  type: typeof QUESTION_TYPES.MULTI_CHOICE;
  options: Answer[];
};

export type InfoSection = QuestionBase & {
  type: typeof QUESTION_TYPES.INFO_SECTION;
  imageUrl?: string;
  bottomText?: string;
};

export type InputQuestion = QuestionBase & {
  type: typeof QUESTION_TYPES.INPUT;
  placeholder?: string;
  inputType: HTMLInputTypeAttribute;
  validation?: InputValidation;
};

export type Question =
  | SingleChoiceQuestion
  | MultiChoiceQuestion
  | InfoSection
  | InputQuestion;

export type Answer = {
  value: string;
  label: string;
  imageUrl?: string;
};

export type StoreAnswers = Record<
  string,
  string | string[] | number | undefined
>;

export type InputValidation = Partial<
  Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    "min" | "max" | "required" | "pattern" | "step"
  >
>;

export type NextQuestionId = string | typeof SPECIAL_ROUTE_IDS.LOADING;
