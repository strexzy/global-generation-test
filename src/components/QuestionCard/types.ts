export type TipTapNode = any; // minimal typing for TipTap JSON

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
