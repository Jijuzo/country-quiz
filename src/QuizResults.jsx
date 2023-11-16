import cardWinnerIconSvg from "./assets/undraw_winners_ao2o_2.svg";
import "./QuizResults.css";

export function QuizResults({ quizScore, onTryAgain }) {
  return (
    <div className="quiz-results-div">
      <img className="card-winner-icon" src={cardWinnerIconSvg} alt="" />
      <p className="quiz-results-text">Results</p>
      <p className="correct-answers-content">
        You got <span className="correct-answers-quantity">{quizScore}</span>{" "}
        correct answers
      </p>
      <button className="try-again-button" onSubmit={onTryAgain}>
        try again
      </button>
    </div>
  );
}
