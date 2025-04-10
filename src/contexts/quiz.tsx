import { createContext, ReactNode, useReducer } from 'react';
import { normalizeQuestions, shuffleAnswers } from '../helpers';
import {
  InitialState,
  LoadedQuestionsAction,
  QuizAction,
  SelectAnswerAction,
  StateWithDispatch,
} from '../types';

const initialState: InitialState = {
  showResults: false,
  currentQuestionIndex: 0,
  questions: [],
  answers: [],
  currentAnswer: '',
  correctAnswersAmount: 0,
};

const reducer = (state: InitialState, action: QuizAction): InitialState => {
  const { type } = action;

  switch (type) {
    case 'LOADED_QUESTIONS': {
      const { payload } = action as LoadedQuestionsAction;
      console.log(state, action);
      const normalizedQuestions = normalizeQuestions(payload);

      return {
        ...state,
        questions: normalizedQuestions,
        answers: shuffleAnswers(normalizedQuestions[0]),
      };
    }
    case 'SELECT_ANSWER': {
      const { payload } = action as SelectAnswerAction;
      const { currentQuestionIndex, correctAnswersAmount, questions } = state;
      const newCorrectAnswersAmount =
        payload === questions[currentQuestionIndex].correctAnswer
          ? correctAnswersAmount + 1
          : correctAnswersAmount;
      return {
        ...state,
        currentAnswer: payload,
        correctAnswersAmount: newCorrectAnswersAmount,
      };
    }
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
    default:
      return state;
  }
};

export const QuizContext = createContext<StateWithDispatch | []>([]);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const value = useReducer(reducer, initialState);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
