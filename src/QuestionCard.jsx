import { QuestionImage } from "./QuestionImage";
import { Answer } from "./Answer";
import cardIconSvg from "./assets/undraw_adventure_4hum_1.svg";
import { useMemo, useState } from "react";
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

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

const getRandomCountry = (countries) => {
  return countries[getRandomIndex(countries)];
};

const getQuestionData = (allCountriesData) => {
  const countriesArray = [];
  for (let i = 0; i < 4; i++) {
    let countryData;
    do {
      countryData = getRandomCountry(allCountriesData);
    } while (
      countriesArray.includes(countryData) ||
      countryData.capital[0] === undefined ||
      countryData.name.common === undefined ||
      countryData.flags.png === undefined
    );
    countriesArray.push(countryData);
  }
  return countriesArray;
};

export function QuestionCard({
  quizScore,
  onCorrectAnswer,
  onIncorrectAnswer,
  isQuizEnded,
  allCountriesData,
}) {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [questionType, setQuestionType] = useState(getQuestionType());
  const [answerChoices, setAnswerChoices] = useState(
    getQuestionData(allCountriesData)
  );
  const rightCountry = useMemo(
    () => answerChoices[getRandomIndex(answerChoices)],
    [answerChoices]
  );

  const handleAnswerClick = (e, index) => {
    setSelectedAnswerIndex(index);
    if (e.target.value === rightCountry.name.common) {
      onCorrectAnswer(quizScore + 1);
    }
  };

  const handleFormSubmit = () => {
    if (selectedAnswerIndex !== answerChoices.indexOf(rightCountry)) {
      onIncorrectAnswer(true);
    } else if (!isQuizEnded) {
      setQuestionType(getQuestionType());
      setAnswerChoices(getQuestionData(allCountriesData));
      setSelectedAnswerIndex(null);
    }
  };

  return (
    <div>
      <img className="card-icon" src={cardIconSvg} alt="" />
      <div className="question-div">
        {questionType ? <QuestionImage country={rightCountry} /> : null}
        <p className="question-content">
          {questionType
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
                selectedAnswerIndex={selectedAnswerIndex}
                correctAnswerIndex={answerChoices.indexOf(rightCountry)}
                answered={selectedAnswerIndex !== null}
                handleAnswerClick={(e) => {
                  handleAnswerClick(e, index);
                }}
              />
            );
          })}
        </ul>
      </div>
      {selectedAnswerIndex !== null && (
        <button
          className="next-button"
          type="submit"
          onClick={handleFormSubmit}
        >
          {selectedAnswerIndex === answerChoices.indexOf(rightCountry)
            ? "Next"
            : "Results"}
        </button>
      )}
    </div>
  );
}
