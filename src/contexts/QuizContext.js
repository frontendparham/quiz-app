import { useEffect } from "react";
import supabase from "../supabase";
import { useReducer } from "react";
import { createContext, useContext } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // "loading", "error", "ready", "active", "finished"
  status: "loading",
  index: 0,
  answers: [],
  points: [],
  userScore: 0,
  secondsRemaining: null,
  userInfo: [],
};

function reducer(state, action) {
  switch (action.type) {
    // CASE 1 /////////////////////////////////////
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    // CASE 2 /////////////////////////////////////
    case "dataFailed":
      return { ...state, status: "error" };

    // CASE 3 /////////////////////////////////////
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
        userInfo: action.payload,
      };

    // CASE 4 /////////////////////////////////////
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answers:
          state.answers[state.index] !== undefined
            ? state.answers.map((answer, i) =>
                i === state.index ? action.payload : answer
              )
            : [...state.answers, action.payload],
        points:
          state.points[state.index] !== undefined
            ? state.points.map((point, i) =>
                i === state.index
                  ? action.payload === question.correctOption
                    ? question.points
                    : 0
                  : point
              )
            : [
                ...state.points,
                action.payload === question.correctOption ? question.points : 0,
              ],
      };

    // CASE 5 /////////////////////////////////////
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
      };

    // CASE 6 /////////////////////////////////////
    case "toTheQuestion":
      const doesThisStepHasAnswerd = state.answers.at(action.payload);

      return {
        ...state,
        index:
          doesThisStepHasAnswerd !== undefined ? action.payload : state.index,
      };

    // CASE 7 /////////////////////////////////////
    case "finishQuiz":
      return {
        ...state,
        status: "finished",

        // Sum of all the points in the points array
        userScore: state.points.reduce((acc, cur) => acc + cur, 0),
      };

    // CASE 8 /////////////////////////////////////
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    // CASE 9 /////////////////////////////////////
    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    // DEFAULT CASE ////////////////////////////////
    default:
      throw new Error("Action in unknown");
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      answers,
      points,
      userScore,
      secondsRemaining,
      userInfo,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(function () {
    async function getQuestions() {
      try {
        const { data, error } = await supabase.from("questions").select("*");
        if (error || !data) throw new Error("Data Fetching Failed");

        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }

    getQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answers,
        points,
        userScore,
        secondsRemaining,
        userInfo,
        dispatch,
        numQuestions,
        totalPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("The Quiz context is used out of its provider");
  return context;
}

export { QuizProvider, useQuiz };
