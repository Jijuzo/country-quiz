import { AllCountries } from "./AllCountries";

export function QuestionImage({ country }: { country: AllCountries[number] }) {
  return (
    <img
      className="question-flag"
      src={`${country.flags.png}`}
      width="84px"
      height="54px"
      style={{ border: "1px solid black" }}
      alt="country flag"
    />
  );
}
