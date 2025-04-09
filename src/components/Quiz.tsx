import { useContext } from 'react';
import { QuizContext, StateWithDispatch } from '../contexts/quiz';
import Question from './Question';

import '../index.css';

const Quiz = () => {
  const [state, dispatch] = useContext(QuizContext) as StateWithDispatch;
  const { showResults, currentQuestionIndex, questions } = state;

  console.log(state.answers);

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
            <div>You've got 4 of {questions.length}</div>
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
