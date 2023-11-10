/* eslint-disable react/prop-types */
import { QuestionImage } from "./QuestionImage";
import { Answer } from "./Answer";
import cardIconSvg from "./assets/undraw_adventure_4hum_1.svg";
import { useRef, useState } from "react";
import "./QuestionCard.css";

const CAPITAL_QUESTION_TYPE = 0;
const FLAG_QUESTION_TYPE = 1;

const getQuestionType = () => {
  const randomNumber =
    Math.floor(
      Math.random() * (FLAG_QUESTION_TYPE - CAPITAL_QUESTION_TYPE + 1)
    ) + CAPITAL_QUESTION_TYPE;
  return randomNumber;
};

export function QuestionCard({
  rightCountry,
  answerChoices,
  quizScore,
  onCorrectAnswer,
  onIncorrectAnswer,
  isQuizEnded,
  allCountriesData,
  setNextQuestion,
}) {
  const [selectedAnswerIndexes, setSelectedAnswerIndexes] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [incorrectAnswer, setIncorrectAnswer] = useState(false);
  const questionType = useRef(getQuestionType());

  const handleAnswerClick = (e, index) => {
    e.preventDefault();
    if (answered) return;
    if (!selectedAnswerIndexes.includes(index)) {
      setSelectedAnswerIndexes([index, answerChoices.indexOf(rightCountry)]);
    }
    if (index === answerChoices.indexOf(rightCountry)) {
      onCorrectAnswer(quizScore + 1);
    } else {
      setIncorrectAnswer(true);
    }
    setAnswered(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (incorrectAnswer) {
      onIncorrectAnswer(true);
    } else if (!isQuizEnded) {
      questionType.current = getQuestionType();
      setNextQuestion(allCountriesData);
      setAnswered(false);
      setSelectedAnswerIndexes([]);
    }
  };

  return (
    <div>
      <img className="card-icon" src={cardIconSvg} alt="player icon" />
      <div className="question-div">
        {questionType.current ? (
          <QuestionImage rightCountry={rightCountry} />
        ) : null}
        <p className="question-content">
          {questionType.current
            ? "Which country does this flag belong to?"
            : `${rightCountry.capital[0]} is the capital of`}
        </p>
      </div>
      <div className="answers-div">
        <ul className="answers-ul">
          {answerChoices.map((answer, index) => {
            return (
              <Answer
                key={index}
                answer={answer.name.common}
                index={index}
                selectedAnswerIndexes={selectedAnswerIndexes}
                correctAnswerIndex={answerChoices.indexOf(rightCountry)}
                answered={answered}
                handleAnswerClick={handleAnswerClick}
              />
            );
          })}
        </ul>
      </div>
      {answered && (
        <button
          className="next-button"
          type="submit"
          onClick={(e) => handleFormSubmit(e)}
        >
          {" "}
          {incorrectAnswer ? "Results" : "Next"}
        </button>
      )}
    </div>
  );
}
