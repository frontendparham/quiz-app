import { useState } from "react";
import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { dispatch } = useQuiz();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (isValidForm()) {
      dispatch({ type: "startQuiz", payload: [name, email, phoneNum] });
    }
  }

  // Function to check if form is valid
  function isValidForm() {
    // Validate all input fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();

    // Return true only if all input fields are valid
    return isNameValid && isEmailValid && isPhoneValid;
  }

  function validateInput(input) {
    switch (input) {
      case "name":
        validateName();
        break;
      case "email":
        validateEmail();
        break;
      case "phone":
        validatePhone();
        break;
      default:
        break;
    }
  }

  // Function to validate name input
  function validateName() {
    if (name === "") {
      setNameErrorMessage("Name is required");
      return false;
    }

    setNameErrorMessage("");
    return true;
  }

  // Function to validate phone input
  function validatePhone() {
    if (phoneNum === "") {
      setPhoneErrorMessage("Phone Number is required");
      return false;
    }

    setPhoneErrorMessage("");
    return true;
  }

  // Function to validate email input
  function validateEmail() {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = regex.test(String(email).toLowerCase());

    if (email === "") {
      setEmailErrorMessage("Email is required");
      return false;
    }

    if (!isValidEmail) {
      setEmailErrorMessage("Provide a valid email address");
      return false;
    }

    setEmailErrorMessage("");
    return true;
  }

  return (
    <div className="start">
      <h2>Welcome to The English Quiz!</h2>
      <h3>
        Please Fill the Form Below to <span>Start</span>
      </h3>
      <div className="info">
        <form className="info__form" onSubmit={(e) => handleSubmit(e)}>
          <div className="info__form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="e.g. Stephen King"
              required
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyUp={(e) => validateInput(e.target.name)}
            />
            <span className="error-message">{nameErrorMessage}</span>
          </div>
          <div className="info__form-group">
            <label htmlFor="email">Email Address</label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="e.g. stephenking@lorem.com"
              required
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyUp={(e) => validateInput(e.target.name)}
            />
            <span className="error-message">{emailErrorMessage}</span>
          </div>
          <div className="info__form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              name="phone"
              required
              type="number"
              id="phone"
              placeholder="e.g. +1 234 567 890"
              autoComplete="off"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
              onKeyUp={(e) => validateInput(e.target.name)}
            />
            <span className="error-message">{phoneErrorMessage}</span>
          </div>
        </form>
      </div>
      <button className="btn default" onClick={handleSubmit}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
