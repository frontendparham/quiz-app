import "cooltipz-css";
import { useQuiz } from "../contexts/QuizContext";

function ProgressStep({ id }) {
  const { index, dispatch, answers } = useQuiz();

  return (
    <button
      className={`progress__step 
      ${id === index ? "selected" : ""} 
      ${id < index ? "completed" : ""} ${
        id === answers.length - 1
          ? "cooltipz--top cooltipz--visible custom-cooltipz"
          : ""
      }`}
      id={id}
      onClick={() => dispatch({ type: "toTheQuestion", payload: id })}
      aria-label="Last Question You have Answerd"
    ></button>
  );
}

export default ProgressStep;
