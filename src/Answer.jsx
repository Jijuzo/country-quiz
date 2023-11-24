import "./Answer.css";
import classNames from "classnames";

const prefixes = ["A", "B", "C", "D"];

export function Answer({
  index,
  onClick,
  answered,
  answer,
  correctAnswerIndex,
  selectedAnswerIndex,
}) {
  const isSelected = index === selectedAnswerIndex;
  const isCorrect = index === correctAnswerIndex;
  const buttonClass = classNames("answer-button", {
    "correct-answer": answered && isCorrect,
    "incorrect-answer": isSelected && !isCorrect,
    "long-answer": answer.length > 30,
    "cursor-before-answer": !answered,
    "cursor-after-answer": answered,
  });

  return (
    <li className="answer-li">
      <button
        type="button"
        className={buttonClass}
        onClick={onClick}
        value={answer}
        disabled={answered}
      >
        <span className="answer-span">{prefixes[index]}</span> {answer}
      </button>
    </li>
  );
}
