import { ActionDispatch, createContext, ReactNode, useReducer } from 'react';
import questions from '../data';

type InitialState = {
  currentQuestionIndex: number;
  questions: {
    question: string;
    incorrectAnswers: string[];
    correctAnswer: string;
  }[];
};

type Action = { type: string; payload?: unknown };

export type StateWithDispatch = [
  state: InitialState,
  dispatch: ActionDispatch<[action: Action]>
];

const initialState: InitialState = {
  currentQuestionIndex: 0,
  questions,
};

const reducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case 'NEXT_QUESTION': {
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
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
