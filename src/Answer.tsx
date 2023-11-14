import "./Answer.css";
import classNames from "classnames";

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
  const buttonClass = classNames("answer-button", {
    "correct-answer":
      selectedAnswerIndexes.includes(index) && index === correctAnswerIndex,
    "incorrect-answer":
      selectedAnswerIndexes.includes(index) && index !== correctAnswerIndex,
    "long-answer": answer.length > 30,
    "cursor-before-answer": !answered,
    "cursor-after-answer": answered,
  });

  return (
    <li className="answer-li" key={index}>
      <button
        className={buttonClass}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          handleAnswerClick(e, index)
        }
        value={answer}
      >
        <span className="answer-span">{prefixes[index]}</span> {answer}
      </button>
    </li>
  );
}
