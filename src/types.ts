import { ActionDispatch } from 'react';

export interface Question {
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
}

export type InitialState = {
  showResults: boolean;
  currentQuestionIndex: number;
  questions: Question[];
  answers: string[];
};

export type Action = { type: string; payload?: unknown };

export type StateWithDispatch = [
  state: InitialState,
  dispatch: ActionDispatch<[action: Action]>
];
