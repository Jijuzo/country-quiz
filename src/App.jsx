import { useEffect, useState, useReducer } from "react";
import { createRoot } from "react-dom/client";
import { QuestionCard } from "./QuestionCard";
import { Footer } from "./Footer";
import { QuizResults } from "./QuizResults";
import { DotSpinner } from "@uiball/loaders";
import { ErrorMessage } from "./ErrorMessage";

const BASE_URL = "https://restcountries.com";
const QUESTION_DATA_URL = new URL(
  "/v3.1/all?fields=name,capital,flags",
  BASE_URL
);

const countriesReducer = (state, action) => {
  switch (action.type) {
    case "success":
      return {
        data: action.payload.data,
        error: null,
        isLoading: false,
      };
    case "loading":
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case "error":
      return {
        data: null,
        error: action.payload.error,
        isLoading: false,
      };
    case "idle":
      return {
        ...state,
        isLoading: false,
      };
  }
};

export const App = () => {
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [countriesState, dispatch] = useReducer(countriesReducer, {
    data: null,
    error: null,
    isLoading: false,
  });

  useEffect(() => {
    const fetchQuestionData = async () => {
      dispatch({ type: "loading" });
      try {
        const promise = await fetch(QUESTION_DATA_URL);
        if (!promise.ok) {
          throw new Error(`HTTP error! Status: ${promise.status}`);
        }
        const result = await promise.json();
        dispatch({ type: "success", payload: { data: result } });
      } catch (error) {
        console.error("Error:", error);
        dispatch({ type: "error", payload: { error } });
      } finally {
        dispatch({ type: "idle" });
      }
    };

    fetchQuestionData();
  }, []);

  return (
    <main className="page">
      {countriesState.isLoading ? (
        <div className="spinner-container">
          <DotSpinner size={100} speed={0.9} color="black" />
        </div>
      ) : (
        <div className="card-div">
          <h1 className="card-header">country quiz</h1>
          <form className="card">
            {countriesState.data && !isQuizEnded && (
              <QuestionCard
                quizScore={quizScore}
                onCorrectAnswer={setQuizScore}
                isQuizEnded={isQuizEnded}
                onIncorrectAnswer={setIsQuizEnded}
                allCountriesData={countriesState.data}
              />
            )}
            {isQuizEnded && (
              <QuizResults
                setIsQuizEnded={setIsQuizEnded}
                quizScore={quizScore}
                setQuizScore={setQuizScore}
              />
            )}
          </form>
        </div>
      )}
      <ErrorMessage error={countriesState.error} />
      <Footer />
    </main>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
