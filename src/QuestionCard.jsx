/* eslint-disable react/prop-types */
import cardIconSvg from "./assets/undraw_adventure_4hum_1.svg";
import { useState } from "react";

const prefixes = ["A", "B", "C", "D"];

export function QuestionPage({
  rightCountry,
  countryAnswerChoices,
  fetchQuestionData,
  questionType,
  correctAnswerIndex,
  quizScore,
  onCorrectAnswer,
  isQuizEnded,
  onIncorrectAnswer,
}) {
  const [selectedAnswerIndexes, setSelectedAnswerIndexes] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [incorrectAnswer, setIncorrectAnswer] = useState(false);

  const handleAnswerClick = (index) => {
    if (answered) return;
    if (!selectedAnswerIndexes.includes(index)) {
      setSelectedAnswerIndexes([index, correctAnswerIndex]);
    }
    if (index === correctAnswerIndex) {
      onCorrectAnswer(quizScore + 1);
    } else {
      setIncorrectAnswer(true);
    }
    setAnswered(true);
  };

  return (
    <div>
      <img className="card-icon" src={cardIconSvg} alt="player icon" />
      <div className="question-div">
        {questionType ? (
          <img
            className="question-flag"
            src={`${rightCountry.flags.png}`}
            width="84px"
            height="54px"
            alt="country flag"
          />
        ) : null}

        <p className="question-content">
          {questionType
            ? "Which country does this flag belong to?"
            : `${rightCountry.capital[0]} is the capital of`}
        </p>
      </div>
      <div className="answers-div">
        <ul className="answers-ul">
          {countryAnswerChoices.map((answer, index) => {
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
                  onClick={() => handleAnswerClick(index)}
                  style={{
                    cursor: answered ? "not-allowed" : "pointer",
                  }}
                  value={answer}
                >
                  <span className="answer-span">{prefixes[index]}</span>{" "}
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {answered && (
        <button
          className="next-button"
          onClick={() => {
            if (incorrectAnswer) {
              onIncorrectAnswer(true);
            } else if (!isQuizEnded) {
              fetchQuestionData();
              setAnswered(false);
              setSelectedAnswerIndexes([]);
            }
          }}
        >
          {" "}
          {incorrectAnswer ? "Results" : "Next"}
        </button>
      )}
    </div>
  );
}
