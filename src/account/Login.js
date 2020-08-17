import React, { useState, useEffect, useRef } from "react";
import CloseIcon from "../create/icons/close.svg";
import { auth } from "../firebase/Config";
import { useDispatch } from "react-redux";
import { ChangeLoginScreen } from "../redux/actions/ChangeLoginScreen";
import { ChangeLoginStatus } from "../redux/actions/ChangeLoginStatus";

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const focusWindow = useRef(null);

  const dispatch = useDispatch();

  const closeWindowKey = (e) => {
    if (e.keyCode === 27) dispatch(ChangeLoginScreen(null));
  };

  const closeWindow = (e) => {
    const classes = e.target.classList;
    if (classes.contains("closeClass")) dispatch(ChangeLoginScreen(null));
  };

  const changeScreen = (screen) => {
    dispatch(ChangeLoginScreen(screen));
  };

  const logIn = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    setLoading(true);

    auth
      .signInWithEmailAndPassword(email.value, password.value)
      .then((result) => {
        dispatch(ChangeLoginStatus(result.user));
        dispatch(ChangeLoginScreen(null));
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    focusWindow.current.focus();
  }, []);

  return (
    <div
      className="login closeClass"
      onMouseDown={closeWindow}
      onKeyDown={closeWindowKey}
      ref={focusWindow}
      tabIndex="0"
    >
      <div className="loginForm">
        <button className="closeBtn" onMouseDown={closeWindow}>
          <img className="closeClass" src={CloseIcon} alt="" />{" "}
        </button>
        <h1>Sign in</h1>
        <form onSubmit={logIn}>
          <input name="email" type="email" placeholder="Email"></input>
          <input name="password" type="password" placeholder="Password"></input>
          <p className="loginRecovery">Forgot password?</p>
          <input className="submit" type="submit" value="Sign in"></input>
        </form>
        {loading && <div className="loading"></div>}
        {error && <p className="error">{error}</p>}
        <p>
          Don't have an account?{" "}
          <span onClick={() => changeScreen("signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
