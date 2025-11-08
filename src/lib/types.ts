export type Quiz = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};

export type QuestionBase = {
  id: string;
  title: string;
  text: string;
  visibleIf?: { questionId: string; equals: string | number | boolean }[];
};

export type SingleChoiceQuestion = QuestionBase & {
  type: "single-choice";
  options: { value: string; label: string }[];
};

export type MultiChoiceQuestion = QuestionBase & {
  type: "multi-choice";
  options: { value: string; label: string }[];
};

export type NumberQuestion = QuestionBase & {
  type: "number";
};

export type Question =
  | SingleChoiceQuestion
  | MultiChoiceQuestion
  | NumberQuestion;

export type Answers = Record<string, string | string[] | number | undefined>;
