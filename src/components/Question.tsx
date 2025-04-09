import { useContext } from 'react';
import { QuizContext } from '../contexts/quiz';
import Answer from './Answer';

const Question = () => {
  const [state, dispatch] = useContext(QuizContext);
  const { currentQuestionIndex, questions, answers, currentAnswer } = state!;
  const { question, correctAnswer } = questions[currentQuestionIndex];

  return (
    <div>
      <div className='question'>{question}</div>
      <div className='answers'>
        {answers.map((answer, idx) => (
          <Answer
            key={idx}
            index={idx}
            answerText={answer}
            currentAnswer={currentAnswer}
            correctAnswer={correctAnswer}
            onSelectAnswer={(answerText) =>
              dispatch!({ type: 'SELECT_ANSWER', payload: answerText })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
