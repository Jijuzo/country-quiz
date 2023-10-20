import cardWinnerIconSvg from "./assets/undraw_winners_ao2o_2.svg";
import "./QuizResults.css";

type QuizResultsProps = {
  setIsQuizEnded: React.Dispatch<React.SetStateAction<boolean>>;
  fetchQuestionData: () => Promise<void>;
  quizScore: number;
  setQuizScore: React.Dispatch<React.SetStateAction<number>>;
};

export function QuizResults({
  setIsQuizEnded,
  fetchQuestionData,
  quizScore,
  setQuizScore,
}: QuizResultsProps) {
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
        onClick={() => {
          setIsQuizEnded(false);
          fetchQuestionData();
          setQuizScore(0);
        }}
      >
        try again
      </button>
    </div>
  );
}
