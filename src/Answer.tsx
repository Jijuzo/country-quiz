import "./Answer.css";
import classNames from "classnames";

const prefixes = ["A", "B", "C", "D"];

type AnswerProps = {
  index: number;
  correctAnswerIndex: number;
  onClick: (e: React.MouseEvent<HTMLElement>, index: number) => void;
  answered: boolean;
  answer: string;
  selectedAnswerIndex: number;
};

export function Answer({
  index,
  onClick,
  answered,
  answer,
  correctAnswerIndex,
  selectedAnswerIndex,
}: AnswerProps) {
  const isSelected = index === selectedAnswerIndex;
  const isCorrect = index === correctAnswerIndex;
  const buttonClass = classNames("answer-button", {
    "correct-answer": answered && isCorrect,
    "incorrect-answer": isSelected && !isCorrect,
    "long-answer": answer.length > 25,
    "cursor-before-answer": !answered,
    "cursor-after-answer": answered,
  });

  return (
    <li className="answer-li">
      <button
        type="button"
        className={buttonClass}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick(e, index)}
        value={answer}
        disabled={answered}
      >
        <span className="answer-span">{prefixes[index]}</span> {answer}
      </button>
    </li>
  );
}
