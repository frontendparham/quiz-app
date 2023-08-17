import { CheckSquare, Square } from "@phosphor-icons/react";

function Options({ question, dispatch, answers, index }) {
  const hasAnswerd = answers[index] !== undefined;

  return (
    <div className="options">
      {JSON.parse(question.options).map((option, indexOfOption) => (
        <button
          className={`btn btn-option ${
            hasAnswerd
              ? answers[index] === indexOfOption
                ? "selected"
                : "notSelected"
              : ""
          }`}
          key={option}
          onClick={() =>
            dispatch({ type: "newAnswer", payload: indexOfOption })
          }
        >
          <div className="checkbox">
            {hasAnswerd ? (
              answers[index] === indexOfOption ? (
                <CheckSquare size={25} />
              ) : (
                <Square size={25} />
              )
            ) : (
              <Square size={25} />
            )}
          </div>
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
