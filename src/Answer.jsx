import "./Answer.css";
import classNames from "classnames";

const prefixes = ["A", "B", "C", "D"];

export function Answer({
  index,
  handleAnswerClick,
  answered,
  answer,
  correctAnswerIndex,
  selectedAnswer,
}) {
  const buttonClass = classNames("answer-button", {
    "correct-answer": answered && index === correctAnswerIndex,
    "incorrect-answer":
      answered && index !== correctAnswerIndex && answer === selectedAnswer,
    "long-answer": answer.length > 30,
    "cursor-before-answer": !answered,
    "cursor-after-answer": answered,
  });

  return (
    <li className="answer-li">
      <button
        type="button"
        className={buttonClass}
        onClick={handleAnswerClick}
        value={answer}
        disabled={answered}
      >
        <span className="answer-span">{prefixes[index]}</span> {answer}
      </button>
    </li>
  );
}
