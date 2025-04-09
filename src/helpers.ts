import { Question } from './types';

export const shuffleAnswers = (question: Question) => {
  const unShuffledAnswers = [
    question.correctAnswer,
    ...question.incorrectAnswers,
  ];

  return unShuffledAnswers
    .map((unShuffledAnswer) => ({
      sort: Math.random(),
      value: unShuffledAnswer,
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};
