export function QuestionImage({ country }) {
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
