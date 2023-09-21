/* eslint-disable react/prop-types */
import "./Answer.css";

const prefixes = ["A", "B", "C", "D"];

export function Answer({
  index,
  correctAnswerIndex,
  handleAnswerClick,
  answered,
  answer,
  selectedAnswerIndexes,
}) {
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
        onClick={(e) => handleAnswerClick(e, index)}
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
