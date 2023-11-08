/* eslint-disable react/prop-types */
import "./Answer.css";
import classNames from "classnames";

const prefixes = ["A", "B", "C", "D"];

export function Answer({
  index,
  correctAnswerIndex,
  handleAnswerClick,
  answered,
  answer,
  selectedAnswerIndexes,
}) {
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
        onClick={(e) => handleAnswerClick(e, index)}
        value={answer}
      >
        <span className="answer-span">{prefixes[index]}</span> {answer}
      </button>
    </li>
  );
}
