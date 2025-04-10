import { ActionDispatch } from 'react';

export interface Question {
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
}

export interface UnNormalizedQuestion {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
}

export type InitialState = {
  showResults: boolean;
  currentQuestionIndex: number;
  questions: Question[];
  answers: string[];
  currentAnswer: string;
  correctAnswersAmount: number;
  error: Error | null;
};

export type Action = { type: string };

export type SelectAnswerAction = Action & {
  payload: string;
};

export type LoadedQuestionsAction = Action & {
  payload: UnNormalizedQuestion[];
};

export type FailedLoadQuestionsAction = Action & {
  payload: Error;
};

export type QuizAction =
  | Action
  | SelectAnswerAction
  | LoadedQuestionsAction
  | FailedLoadQuestionsAction;

export type StateWithDispatch = [
  state: InitialState,
  dispatch: ActionDispatch<[action: QuizAction]>
];
