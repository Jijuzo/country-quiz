/* eslint-disable react/prop-types */
import cardWinnerIconSvg from "./assets/undraw_winners_ao2o_2.svg";
import "./QuizResults.css";

export function QuizResults({
  setIsQuizEnded,
  onTryAgain,
  quizScore,
  setQuizScore,
  allCountriesData,
}) {
  return (
    <div className="quiz-results-div">
      <img
        className="card-winner-icon"
        src={cardWinnerIconSvg}
        alt="winner icon"
      />
      <p className="quiz-results-text">Results</p>
      <p className="correct-answers-content">
        You got <span className="correct-answers-quantity">{quizScore}</span>{" "}
        correct answers
      </p>
      <button
        className="try-again-button"
        onSubmit={() => {
          setIsQuizEnded(false);
          onTryAgain(allCountriesData);
          setQuizScore(0);
        }}
      >
        try again
      </button>
    </div>
  );
}
