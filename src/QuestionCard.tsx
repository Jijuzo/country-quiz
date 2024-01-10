import { QuestionImage } from "./QuestionImage";
import { Answer } from "./Answer";
import cardIconSvg from "./assets/undraw_adventure_4hum_1.svg";
import { useMemo, useState } from "react";
import { AllCountries, Country } from "./types";
import "./QuestionCard.css";

const CAPITAL_QUESTION_TYPE = 0;
const FLAG_QUESTION_TYPE = 1;
const ANSWER_OPTIONS_NUMBER = 4;

const getQuestionType = () => {
  const randomNumber =
    Math.floor(
      Math.random() * (FLAG_QUESTION_TYPE - CAPITAL_QUESTION_TYPE + 1)
    ) + CAPITAL_QUESTION_TYPE;
  return randomNumber;
};

const getRandomIndex = (array: Array<unknown>) => {
  return Math.floor(Math.random() * array.length);
};

function getAnswersData(allCountriesData: AllCountries) {
  const countriesMap: Map<number, Country> = new Map();

  while (countriesMap.size < ANSWER_OPTIONS_NUMBER) {
    const randomIndex = getRandomIndex(allCountriesData);
    countriesMap.set(randomIndex, allCountriesData[randomIndex]);
  }
  return [...countriesMap.values()];
}

type QuestionCardProps = {
  allCountriesData: AllCountries;
  onCorrectAnswer: (value: number) => void;
  onIncorrectAnswer: (value: boolean) => void;
  quizScore: number;
  isQuizEnded: boolean;
};

export function QuestionCard({
  quizScore,
  onCorrectAnswer,
  onIncorrectAnswer,
  isQuizEnded,
  allCountriesData,
}: QuestionCardProps) {
  const [questionType, setQuestionType] = useState(getQuestionType());
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [answerChoices, setAnswerChoices] = useState(
    getAnswersData(allCountriesData)
  );
  const rightCountry = useMemo(
    () => answerChoices[getRandomIndex(answerChoices)],
    [answerChoices]
  );

  const handleAnswerClick = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedAnswerIndex(index);
    if ((e.target as HTMLInputElement).value === rightCountry.name.common) {
      onCorrectAnswer(quizScore + 1);
    }
  };

  const handleOnClick = () => {
    if (selectedAnswerIndex !== answerChoices.indexOf(rightCountry)) {
      onIncorrectAnswer(true);
    } else if (!isQuizEnded) {
      setQuestionType(getQuestionType());
      setAnswerChoices(getAnswersData(allCountriesData));
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
                selectedAnswerIndex={selectedAnswerIndex as number}
                correctAnswerIndex={answerChoices.indexOf(rightCountry)}
                answered={selectedAnswerIndex !== null}
                onClick={handleAnswerClick}
              />
            );
          })}
        </ul>
      </div>
      {selectedAnswerIndex !== null && (
        <button className="next-button" type="submit" onClick={handleOnClick}>
          {selectedAnswerIndex === answerChoices.indexOf(rightCountry)
            ? "Next"
            : "Results"}
        </button>
      )}
    </div>
  );
}
