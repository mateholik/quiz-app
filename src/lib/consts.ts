export const QUESTION_TYPES = {
  SINGLE_CHOICE: "single_choice",
  MULTI_CHOICE: "multi_choice",
  INFO_SECTION: "info_section",
  INPUT: "input",
} as const;

export type QuestionType = (typeof QUESTION_TYPES)[keyof typeof QUESTION_TYPES];
