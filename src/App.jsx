import { QuestionCard } from "./QuestionCard";
import { useEffect, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { Footer } from "./Footer";
import { QuizResults } from "./QuizResults";
import { DotSpinner } from "@uiball/loaders";
import { ErrorMessage } from "./ErrorMessage";

const baseUrl = "https://restcountries.com";
const CAPITAL_QUESTION_TYPE = 0;
const FLAG_QUESTION_TYPE = 1;

export const App = () => {
  const [isFetchCalledOnce, setIsFetchCalledOnce] = useState(false);
  const [allCountriesData, setAllCountriesData] = useState(null);
  const [error, setError] = useState(null);
  const [questionType, setQuestionType] = useState(null);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [countryAnswerChoices, setCountryAnswerChoices] = useState();
  const [rightCountry, setRightCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getRandomCountry = (countries) => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
  };

  const getQuestionType = (min, max) => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  };

  const getThreeRandomCountries = useCallback((countries, rightCountryName) => {
    const countriesArray = [];
    for (let i = 0; i < 3; i++) {
      let countryName;
      do {
        countryName = getRandomCountry(countries).name.common;
      } while (
        countriesArray.includes(countryName) ||
        countryName === rightCountryName
      );
      countriesArray.push(countryName);
    }
    const randomIndex = Math.floor(Math.random() * (countriesArray.length + 1));
    setCorrectAnswerIndex(randomIndex);
    const newCountriesArray = [...countriesArray];
    newCountriesArray.splice(randomIndex, 0, rightCountryName);
    setCountryAnswerChoices(newCountriesArray);
  }, []);

  const fetchQuestionData = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    setQuestionType(getQuestionType(CAPITAL_QUESTION_TYPE, FLAG_QUESTION_TYPE));
    const questionDataUrl = new URL(
      "/v3.1/all?fields=name,capital,flags",
      baseUrl
    );
    try {
      if (!isFetchCalledOnce) {
        const promise = await fetch(questionDataUrl);
        if (!promise.ok) {
          throw new Error(`HTTP error! Status: ${promise.status}`);
        }
        const result = await promise.json();
        setAllCountriesData(result);
        setQuestionData(result);
        setIsFetchCalledOnce(true);
      } else {
        setQuestionData(allCountriesData);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }

    function setQuestionData(allCountriesData) {
      const countryData = getRandomCountry(allCountriesData);
      if (
        countryData.capital === undefined ||
        countryData.name.common === undefined ||
        countryData.flags.png === undefined
      ) {
        fetchQuestionData();
      }
      setRightCountry(countryData);
      getThreeRandomCountries(allCountriesData, countryData.name.common);
    }
  }, [allCountriesData, getThreeRandomCountries, isFetchCalledOnce]);

  useEffect(() => {
    if (rightCountry) return;
    fetchQuestionData();
  }, [fetchQuestionData, rightCountry]);

  return (
    <main className="page">
      {isLoading ? (
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
                countryAnswerChoices={countryAnswerChoices}
                fetchQuestionData={fetchQuestionData}
                questionType={questionType}
                correctAnswerIndex={correctAnswerIndex}
                quizScore={quizScore}
                onCorrectAnswer={setQuizScore}
                isQuizEnded={isQuizEnded}
                onIncorrectAnswer={setIsQuizEnded}
              />
            )}
            {isQuizEnded && (
              <QuizResults
                setIsQuizEnded={setIsQuizEnded}
                fetchQuestionData={fetchQuestionData}
                quizScore={quizScore}
                setQuizScore={setQuizScore}
              />
            )}
          </form>
        </div>
      )}
      <ErrorMessage error={error} />
      <Footer />
    </main>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
