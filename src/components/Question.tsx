import { useContext } from 'react';
import { QuizContext, StateWithDispatch } from '../contexts/quiz';
import Answer from './Answer';

const Question = () => {
  const [state] = useContext(QuizContext);
  const { currentQuestionIndex, questions, answers } =
    state as StateWithDispatch[0];
  const { question } = questions[currentQuestionIndex];

  return (
    <div>
      <div className='question'>{question}</div>
      <div className='answers'>
        {answers.map((answer, idx) => (
          <Answer key={idx} answerText={answer} />
        ))}
      </div>
    </div>
  );
};

export default Question;
