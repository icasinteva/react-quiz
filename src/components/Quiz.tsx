import { useContext, useEffect } from 'react';
import { QuizContext } from '../contexts/quiz';
import { StateWithDispatch } from '../types';
import Question from './Question';

import '../index.css';

const Quiz = () => {
  const [state, dispatch] = useContext(QuizContext) as StateWithDispatch;
  const {
    showResults,
    currentQuestionIndex,
    questions,
    correctAnswersAmount,
    currentAnswer,
    error,
  } = state;

  const handleNextQuestionClick = function () {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const handleRestartClick = function () {
    dispatch({ type: 'RESTART' });
    fetchQuestions();
  };

  const fetchQuestions = () => {
    const apiUrl =
      'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple&encode=url3986';

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'LOADED_QUESTIONS', payload: data.results });
      })
      .catch((err: Error) => {
        dispatch({ type: 'FAILED_LOAD_QUESTIONS', payload: err });
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className='quiz'>
      {error && (
        <div className='results'>
          <div className='error'>Server error</div>
          <div className='results-info'>
            <div>{error.message}</div>
          </div>
          <div className='next-button' onClick={handleRestartClick}>
            Try again
          </div>
        </div>
      )}

      {!showResults && !error && !!questions?.length && (
        <div>
          <div className='score'>
            Question {`${currentQuestionIndex + 1} / ${questions.length}`}
          </div>
          <Question />
          <button
            className='next-button'
            disabled={!currentAnswer}
            onClick={handleNextQuestionClick}
          >
            Next Question
          </button>
        </div>
      )}

      {showResults && (
        <div className='results'>
          <div className='congratulations'>Congratulations</div>
          <div className='results-info'>
            <div>You have completed the quiz!</div>
            <div>
              You've got {correctAnswersAmount} of {questions.length}
            </div>
          </div>
          <div className='next-button' onClick={handleRestartClick}>
            Restart
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
