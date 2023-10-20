import { OneCountryType } from "./App";
import { QuestionImage } from "./QuestionImage";
import { Answer } from "./Answer";
import cardIconSvg from "./assets/undraw_adventure_4hum_1.svg";
import { useState } from "react";
import "./QuestionCard.css";

type QuestionCardProps = {
  rightCountry: OneCountryType;
  countryAnswerChoices: string[] | null;
  fetchQuestionData: () => Promise<void>;
  questionType: number | null;
  correctAnswerIndex: number | null;
  quizScore: number;
  onCorrectAnswer: React.Dispatch<React.SetStateAction<number>>;
  isQuizEnded: boolean;
  onIncorrectAnswer: React.Dispatch<React.SetStateAction<boolean>>;
};

export function QuestionCard({
  rightCountry,
  countryAnswerChoices,
  fetchQuestionData,
  questionType,
  correctAnswerIndex,
  quizScore,
  onCorrectAnswer,
  isQuizEnded,
  onIncorrectAnswer,
}: QuestionCardProps) {
  const [selectedAnswerIndexes, setSelectedAnswerIndexes] = useState<number[]>(
    []
  );
  const [answered, setAnswered] = useState(false);
  const [incorrectAnswer, setIncorrectAnswer] = useState(false);

  const handleAnswerClick = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    e.preventDefault();
    if (answered) return;
    if (!selectedAnswerIndexes.includes(index)) {
      setSelectedAnswerIndexes([index, correctAnswerIndex as number]);
    }
    if (index === correctAnswerIndex) {
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
      fetchQuestionData();
      setAnswered(false);
      setSelectedAnswerIndexes([]);
    }
  };

  return (
    <div>
      <img className="card-icon" src={cardIconSvg} alt="player icon" />
      <div className="question-div">
        {questionType ? <QuestionImage rightCountry={rightCountry} /> : null}
        <p className="question-content">
          {questionType
            ? "Which country does this flag belong to?"
            : `${rightCountry.capital[0]} is the capital of`}
        </p>
      </div>
      <div className="answers-div">
        <ul className="answers-ul">
          {countryAnswerChoices!.map((answer, index) => {
            return (
              <Answer
                key={index}
                answer={answer}
                index={index}
                selectedAnswerIndexes={selectedAnswerIndexes}
                correctAnswerIndex={correctAnswerIndex}
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
