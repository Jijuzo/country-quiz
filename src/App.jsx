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

const reducer = (state, action) => {
  switch (action.type) {
    case "updateCountries":
      return {
        allCountriesData: action.updateCountries,
        error: null,
        isLoading: false,
      };
    case "loading":
      return {
        allCountriesData: state.allCountriesData,
        error: null,
        isLoading: true,
      };
    case "error":
      return {
        allCountriesData: state.allCountriesData,
        error: action.setError,
        isLoading: state.isLoading,
      };
    case "notLoading":
      return {
        allCountriesData: state.allCountriesData,
        error: state.error,
        isLoading: false,
      };
  }
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

export const App = () => {
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [answerChoices, setAnswerChoices] = useState();
  const [rightCountry, setRightCountry] = useState(null);
  const [allCountries, dispatch] = useReducer(reducer, {
    allCountriesData: null,
    error: null,
    isLoading: false,
  });

  const setQuestionData = (allCountriesData) => {
    const answerChoices = getQuestionData(allCountriesData);
    setRightCountry(answerChoices[getRandomIndex(answerChoices)]);
    setAnswerChoices(answerChoices);
  };

  useEffect(() => {
    if (rightCountry) return;
    const fetchQuestionData = async () => {
      dispatch({ type: "loading" });
      try {
        const promise = await fetch(QUESTION_DATA_URL);
        if (!promise.ok) {
          throw new Error(`HTTP error! Status: ${promise.status}`);
        }
        const result = await promise.json();
        dispatch({ type: "updateCountries", updateCountries: result });
        setQuestionData(result);
      } catch (error) {
        console.error("Error:", error);
        dispatch({ type: "error", setError: error });
      } finally {
        dispatch({ type: "notLoading" });
      }
    };

    fetchQuestionData();
  }, [rightCountry]);

  console.log("addsaadw", rightCountry);

  return (
    <main className="page">
      {allCountries.isLoading ? (
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
                quizScore={quizScore}
                onCorrectAnswer={setQuizScore}
                isQuizEnded={isQuizEnded}
                onIncorrectAnswer={setIsQuizEnded}
                allCountriesData={allCountries.allCountriesData}
                setNextQuestion={setQuestionData}
              />
            )}
            {isQuizEnded && (
              <QuizResults
                setIsQuizEnded={setIsQuizEnded}
                onTryAgain={setQuestionData}
                quizScore={quizScore}
                setQuizScore={setQuizScore}
                allCountriesData={allCountries.allCountriesData}
              />
            )}
          </form>
        </div>
      )}
      <ErrorMessage error={allCountries.error} />
      <Footer />
    </main>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
