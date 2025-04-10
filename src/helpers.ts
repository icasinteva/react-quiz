import { Question, UnNormalizedQuestion } from './types';

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

export const normalizeQuestions = (
  questions: UnNormalizedQuestion[]
): Question[] => {
  return questions.map(({ question, correct_answer, incorrect_answers }) => {
    const mormalizedIncorrectAnswers =
      incorrect_answers.map(decodeURIComponent);

    return {
      correctAnswer: decodeURIComponent(correct_answer),
      question: decodeURIComponent(question),
      incorrectAnswers: mormalizedIncorrectAnswers,
    };
  });
};
