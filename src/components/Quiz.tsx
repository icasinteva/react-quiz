import { useContext } from 'react';
import { QuizContext } from '../contexts/quiz';
import { StateWithDispatch } from '../types';
import Question from './Question';

import '../index.css';

const Quiz = () => {
  const [state, dispatch] = useContext(QuizContext) as StateWithDispatch;
  const { showResults, currentQuestionIndex, questions, correctAnswersAmount } =
    state;

  const handleNextQuestionClick = function () {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const handleRestartClick = function () {
    dispatch({ type: 'RESTART' });
  };

  return (
    <div className='quiz'>
      {!showResults ? (
        <div>
          <div className='score'>
            Question {`${currentQuestionIndex + 1} / ${questions.length}`}
          </div>
          <Question />
          <div className='next-button' onClick={handleNextQuestionClick}>
            Next Question
          </div>
        </div>
      ) : (
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
