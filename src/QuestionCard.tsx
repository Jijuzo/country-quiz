import { QuestionImage } from "./QuestionImage";
import { Answer } from "./Answer";
import cardIconSvg from "./assets/undraw_adventure_4hum_1.svg";
import { useMemo, useRef, useState } from "react";
import { AllCountriesType } from "./App";
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

const getRandomIndex = (array: Array<Object>) => {
  return Math.floor(Math.random() * array.length);
};

const getRandomCountry = (countries: AllCountriesType) => {
  return countries[getRandomIndex(countries)];
};

const getQuestionData = (allCountriesData: AllCountriesType) => {
  const countriesArray: Object[] = [];
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
  return countriesArray as AllCountriesType;
};

type QuestionCardProps = {
  allCountriesData: AllCountriesType;
  quizScore: number;
  onCorrectAnswer: React.Dispatch<React.SetStateAction<number>>;
  isQuizEnded: boolean;
  onIncorrectAnswer: React.Dispatch<React.SetStateAction<boolean>>;
};

export function QuestionCard({
  quizScore,
  onCorrectAnswer,
  onIncorrectAnswer,
  isQuizEnded,
  allCountriesData,
}: QuestionCardProps) {
  const [selectedAnswerIndexes, setSelectedAnswerIndexes] = useState<number[]>(
    []
  );
  const [answered, setAnswered] = useState(false);
  const [incorrectAnswer, setIncorrectAnswer] = useState(false);
  const questionType = useRef(getQuestionType());
  const [answerChoices, setAnswerChoices] = useState<AllCountriesType>(
    getQuestionData(allCountriesData)
  );
  const rightCountry: AllCountriesType[number] = useMemo(
    () => answerChoices[getRandomIndex(answerChoices)],
    [answerChoices]
  );

  const handleAnswerClick = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
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

  const handleFormSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (incorrectAnswer) {
      onIncorrectAnswer(true);
    } else if (!isQuizEnded) {
      questionType.current = getQuestionType();
      setAnswerChoices(getQuestionData(allCountriesData));
      setAnswered(false);
      setSelectedAnswerIndexes([]);
    }
  };

  console.log("rightCountry", rightCountry);

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
