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
  currentAnswer: string;
  correctAnswersAmount: number;
};

export type Action = { type: string; payload?: string };

export type StateWithDispatch = [
  state: InitialState,
  dispatch: ActionDispatch<[action: Action]>
];
