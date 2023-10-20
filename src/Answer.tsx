import "./Answer.css";

const prefixes = ["A", "B", "C", "D"];

type AnswerProps = {
  index: number;
  correctAnswerIndex: number | null;
  handleAnswerClick: (e: React.MouseEvent<HTMLElement>, index: number) => void;
  answered: boolean;
  answer: string;
  selectedAnswerIndexes: number[];
};

export function Answer({
  index,
  correctAnswerIndex,
  handleAnswerClick,
  answered,
  answer,
  selectedAnswerIndexes,
}: AnswerProps) {
  return (
    <li className="answer-li" key={index}>
      <button
        className={`${
          selectedAnswerIndexes.includes(index)
            ? index === correctAnswerIndex
              ? "correct-answer"
              : "incorrect-answer"
            : ""
        } ${answer.length > 30 ? "long-answer" : ""} answer-button`}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          handleAnswerClick(e, index)
        }
        style={{
          cursor: answered ? "not-allowed" : "pointer",
        }}
        value={answer}
      >
        <span className="answer-span">{prefixes[index]}</span> {answer}
      </button>
    </li>
  );
}
