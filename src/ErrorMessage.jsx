import "./ErrorMessage.css";

const errorMessage =
  "Something went wrong while downloading countries information. Please check your internet connection and refresh the page.";

export const ErrorMessage = ({ error }) => {
  return error ? <div className="error-message">{errorMessage}</div> : null;
};
