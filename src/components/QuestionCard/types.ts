export type TipTapNode = any;

export type AnswerOption = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  stem: TipTapNode;
  options: AnswerOption[];
  explanation?: string;
  isDemo?: boolean;
};
