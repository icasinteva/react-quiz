import { ActionDispatch, createContext, ReactNode, useReducer } from 'react';
import questions from '../data';
import { shuffleAnswers } from '../helpers';

type InitialState = {
  showResults: boolean;
  currentQuestionIndex: number;
  questions: {
    question: string;
    incorrectAnswers: string[];
    correctAnswer: string;
  }[];
  answers: string[];
};

type Action = { type: string; payload?: unknown };

export type StateWithDispatch = [
  state: InitialState,
  dispatch: ActionDispatch<[action: Action]>
];

const initialState: InitialState = {
  showResults: false,
  currentQuestionIndex: 0,
  questions,
  answers: shuffleAnswers(questions[0]),
};

const reducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case 'NEXT_QUESTION': {
      const { currentQuestionIndex, questions } = state;
      const showResults = currentQuestionIndex === questions.length - 1;
      const newCurrentQuestionIndex = showResults
        ? currentQuestionIndex
        : currentQuestionIndex + 1;
      const answers = showResults
        ? []
        : shuffleAnswers(questions[newCurrentQuestionIndex]);

      return {
        ...state,
        showResults,
        currentQuestionIndex: newCurrentQuestionIndex,
        answers,
      };
    }
    case 'RESTART': {
      return initialState;
    }
    default:
      return state;
  }
};

export const QuizContext = createContext<StateWithDispatch | []>([]);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const value = useReducer(reducer, initialState);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
