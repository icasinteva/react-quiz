import { createContext, ReactNode, useReducer } from 'react';
import questions from '../data';
import { shuffleAnswers } from '../helpers';
import { Action, InitialState, StateWithDispatch } from '../types';

const initialState: InitialState = {
  showResults: false,
  currentQuestionIndex: 0,
  questions,
  answers: shuffleAnswers(questions[0]),
  currentAnswer: '',
  correctAnswersAmount: 0,
};

const reducer = (state: InitialState, action: Action): InitialState => {
  const { type, payload } = action;

  switch (type) {
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
        currentAnswer: '',
      };
    }
    case 'RESTART': {
      return initialState;
    }
    case 'SELECT_ANSWER': {
      const { currentQuestionIndex, correctAnswersAmount, questions } = state;
      const newCorrectAnswersAmount =
        payload === questions[currentQuestionIndex].correctAnswer
          ? correctAnswersAmount + 1
          : correctAnswersAmount;
      return {
        ...state,
        currentAnswer: payload!,
        correctAnswersAmount: newCorrectAnswersAmount,
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
