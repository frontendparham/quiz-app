function FinishScreen({ userScore, totalPoints, dispatch }) {
  const percentage = (userScore / totalPoints) * 100;

  let emoji;

  if (percentage === 100) emoji = "🥇";

  if (percentage < 100 && percentage >= 80) emoji = "🎉";

  if (percentage < 80 && percentage >= 50) emoji = "😊";

  if (percentage < 50 && percentage >= 0) emoji = "😌";

  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <div className="finish">
      <div className="result">
        <span className="result__icon">{emoji}</span>
        <p className="result__text">
          You score{" "}
          <span>
            <strong>{userScore}</strong>
          </span>{" "}
          out of{" "}
          <span>
            <strong>{totalPoints}</strong>
          </span>{" "}
          ({Math.ceil(percentage)}%)
        </p>
      </div>
      <button
        className="btn default"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default FinishScreen;
