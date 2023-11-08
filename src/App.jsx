import { QuestionCard } from "./QuestionCard";
import { useEffect, useState, useCallback, useReducer } from "react";
import { createRoot } from "react-dom/client";
import { Footer } from "./Footer";
import { QuizResults } from "./QuizResults";
import { DotSpinner } from "@uiball/loaders";
import { ErrorMessage } from "./ErrorMessage";

const BASE_URL = "https://restcountries.com";
const CAPITAL_QUESTION_TYPE = 0;
const FLAG_QUESTION_TYPE = 1;
const QUESTION_DATA_URL = new URL(
  "/v3.1/all?fields=name,capital,flags",
  BASE_URL
);

const reducer = (state, action) => {
  switch (action.type) {
    case "loader":
      return { error: null, isLoading: true };
    case "error":
      return { error: action.payload, isLoading: state.isLoading };
    case "noLoader":
      return { error: state.error, isLoading: false };
  }
};

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

const getRandomCountry = (countries) => {
  return countries[getRandomIndex(countries)];
};

const getQuestionType = (min, max) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

export const App = () => {
  const [allCountriesData, setAllCountriesData] = useState(null);
  const [questionType, setQuestionType] = useState(null);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [answerChoices, setAnswerChoices] = useState();
  const [rightCountry, setRightCountry] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    error: null,
    isLoading: false,
  });

  const fetchQuestionData = useCallback(async () => {
    dispatch({ type: "loader" });
    setQuestionType(getQuestionType(CAPITAL_QUESTION_TYPE, FLAG_QUESTION_TYPE));
    try {
      const promise = await fetch(QUESTION_DATA_URL);
      if (!promise.ok) {
        throw new Error(`HTTP error! Status: ${promise.status}`);
      }
      const result = await promise.json();
      setAllCountriesData(result);
      setQuestionData(result);
    } catch (error) {
      console.error("Error:", error);
      dispatch({ type: "error", payload: error });
    } finally {
      dispatch({ type: "noLoader" });
    }
  }, []);

  const setQuestionData = (allCountriesData) => {
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
    const rightAnswerIndex = getRandomIndex(countriesArray);
    setRightCountry(countriesArray[rightAnswerIndex]);
    setAnswerChoices(countriesArray);
  };

  useEffect(() => {
    if (rightCountry) return;
    fetchQuestionData();
  }, [fetchQuestionData, rightCountry]);

  console.log("addsaadw", rightCountry);

  return (
    <main className="page">
      {state.isLoading ? (
        <div className="spinner-container">
          <DotSpinner size={100} speed={0.9} color="black" />
        </div>
      ) : (
        <div className="card-div">
          <h1 className="card-header">country quiz</h1>
          <form className="card">
            {rightCountry && !isQuizEnded && (
              <QuestionCard
                rightCountry={rightCountry}
                answerChoices={answerChoices}
                questionType={questionType}
                quizScore={quizScore}
                onCorrectAnswer={setQuizScore}
                isQuizEnded={isQuizEnded}
                onIncorrectAnswer={setIsQuizEnded}
                allCountriesData={allCountriesData}
                setNextQuestion={setQuestionData}
              />
            )}
            {isQuizEnded && (
              <QuizResults
                setIsQuizEnded={setIsQuizEnded}
                onTryAgain={setQuestionData}
                quizScore={quizScore}
                setQuizScore={setQuizScore}
                allCountriesData={allCountriesData}
              />
            )}
          </form>
        </div>
      )}
      <ErrorMessage error={state.error} />
      <Footer />
    </main>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
