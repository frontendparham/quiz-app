import { ArrowCircleRight, ArrowCircleLeft } from "@phosphor-icons/react";

function Details({ index, numQuestions, dispatch, answers }) {
  const hasAnswerd = answers[index] !== undefined;
  const lastQuestion = index + 1 === numQuestions;

  return (
    <div className="quiz-details">
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <div className="quiz-details__navigate">
        <button
          onClick={() =>
            dispatch({ type: "toTheQuestion", payload: index - 1 })
          }
          className="quiz-details__btn"
        >
          <ArrowCircleLeft
            size={32}
            weight="light"
            color="#f7f7f7"
            className="quiz-details__svg"
          />
        </button>
        {lastQuestion ? (
          <button disabled={true} className="quiz-details__btn not-active">
            <ArrowCircleRight
              size={32}
              weight="light"
              color="#f7f7f7"
              className="quiz-details__svg"
            />
          </button>
        ) : (
          <button
            onClick={() => dispatch({ type: "nextQuestion", payload: index })}
            className={`quiz-details__btn ${hasAnswerd ? "" : "not-active"}`}
            disabled={!hasAnswerd}
          >
            <ArrowCircleRight
              size={32}
              weight="light"
              color="#f7f7f7"
              className="quiz-details__svg"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default Details;
