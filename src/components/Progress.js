import { useEffect, useRef } from "react";
import ProgressStep from "./ProgressStep";
import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { numQuestions, index } = useQuiz();
  const progress = useRef(null);

  useEffect(
    function () {
      progress.current.style.width = `${(index / (numQuestions - 1)) * 100}%`;
    },
    [index, numQuestions]
  );

  return (
    <div className="progress">
      <div className="progress__bar">
        <div className="progress__percent" ref={progress}></div>
      </div>
      <div className="progress__steps">
        {Array.from({ length: numQuestions }, (_, i) => (
          <ProgressStep id={i} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Progress;
