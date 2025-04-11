import classnames from 'classnames';
const Answer = ({
  index,
  answerText,
  onSelectAnswer,
  currentAnswer,
  correctAnswer,
}: {
  index: number;
  answerText: string;
  currentAnswer: string;
  correctAnswer: string;
  onSelectAnswer: (answerText: string) => void;
}) => {
  const indexToLetter = 'ABCD';
  const isCorrectAnswer = currentAnswer && answerText === correctAnswer;
  const isWrongAnswer =
    currentAnswer === answerText && answerText !== correctAnswer;

  return (
    <div
      className={classnames('answer', {
        'answer-correct': isCorrectAnswer,
        'answer-wrong': isWrongAnswer,
        'answer-disabled': currentAnswer,
      })}
      onClick={() => onSelectAnswer(answerText)}
    >
      <div className='answer-letter'>{indexToLetter[index]}</div>
      <div className='answer-text'>{answerText}</div>
    </div>
  );
};

export default Answer;
