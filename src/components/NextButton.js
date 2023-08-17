function NextButton({ dispatch, answers, index, numQuestions }) {
  if (answers[index] === undefined)
    return <button className="btn hidden">Next</button>;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn default"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn default"
        onClick={() => dispatch({ type: "finishQuiz" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
