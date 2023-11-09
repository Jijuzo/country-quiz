/* eslint-disable react/prop-types */
export function QuestionImage({ rightCountry }) {
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
