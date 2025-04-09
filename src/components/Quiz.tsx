import { useContext } from 'react';
import { QuizContext, StateWithDispatch } from '../contexts/quiz';
import Question from './Question';

import '../index.css';

const Quiz = () => {
  const [state, dispatch] = useContext(QuizContext) as StateWithDispatch;

  const handleNextQuestionClick = function () {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  return (
    <div className='quiz'>
      <div>
        <div className='score'>Question 1/8</div>
        <Question />
        <div className='next-button' onClick={handleNextQuestionClick}>
          Next Question {state.currentQuestionIndex}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
