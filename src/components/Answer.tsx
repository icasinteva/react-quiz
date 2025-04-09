const Answer = ({
  letter = 'A',
  answerText,
}: {
  letter?: string;
  answerText: string;
}) => {
  return (
    <div className='answer'>
      <div className='answer-letter'>{letter}</div>
      <div className='answer-text'>{answerText}</div>
    </div>
  );
};

export default Answer;
