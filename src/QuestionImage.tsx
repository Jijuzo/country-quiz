import { OneCountryType } from "./App";

export function QuestionImage({
  rightCountry,
}: {
  rightCountry: OneCountryType;
}) {
  return (
    <img
      className="question-flag"
      src={`${rightCountry.flags.png}`}
      width="84px"
      height="54px"
      alt="country flag"
    />
  );
}
