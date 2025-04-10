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
};

export type Action = { type: string };

export type SelectAnswerAction = Action & {
  payload: string;
};

export type LoadedQuestionsAction = Action & {
  payload: UnNormalizedQuestion[];
};

export type QuizAction = Action | SelectAnswerAction | LoadedQuestionsAction;

export type StateWithDispatch = [
  state: InitialState,
  dispatch: ActionDispatch<[action: QuizAction]>
];
