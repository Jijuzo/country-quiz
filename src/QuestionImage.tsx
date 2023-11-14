import { AllCountriesType } from "./App";

export function QuestionImage({
  rightCountry,
}: {
  rightCountry: AllCountriesType[number];
}) {
  return (
    <img
      className="question-flag"
      src={`${rightCountry.flags.png}`}
      width="84px"
      height="54px"
      style={{ border: "1px solid black" }}
      alt="country flag"
    />
  );
}
