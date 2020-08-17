import React, { useState, useEffect, useRef } from "react";
import CloseIcon from "../create/icons/close.svg";
import { auth } from "../firebase/Config";
import { useDispatch } from "react-redux";
import { ChangeLoginScreen } from "../redux/actions/ChangeLoginScreen";
import { ChangeLoginStatus } from "../redux/actions/ChangeLoginStatus";

export default function Register() {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password, password2, email } = event.target.elements;

    const actionCodeSettings = {
      url: "https://www.google.com",
      handleCodeInApp: true,
      iOS: {
        bundleId: "com.google.ios",
      },
      android: {
        packageName: "com.google.android",
        installApp: true,
        minimumVersion: "12",
      },
      dynamicLinkDomain: "https://www.google.com",
    };

    setLoading(true);

    if (password.value !== password2.value) {
      setError("Passwords don't match");
      setLoading(false);
    } else {
      auth
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((result) => {
          result.user.sendEmailVerification();
          result.user
            .updateProfile({
              displayName: username.value,
            })
            .then(() => {
              dispatch(ChangeLoginStatus(result.user));
              dispatch(ChangeLoginScreen(null));
            });
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    focusWindow.current.focus();
  }, []);

  return (
    <div
      className="register closeClass"
      onMouseDown={closeWindow}
      onKeyDown={closeWindowKey}
      ref={focusWindow}
      tabIndex="0"
    >
      <div className="registerForm">
        <button className="closeBtn" onClick={closeWindow}>
          <img className="closeClass" src={CloseIcon} alt="" />{" "}
        </button>
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <input name="username" type="text" placeholder="Username"></input>
          <input name="email" type="email" placeholder="Email"></input>
          <input name="password" type="password" placeholder="Password"></input>
          <input
            name="password2"
            type="password"
            placeholder="Confirm password"
          ></input>
          <input className="submit" type="submit" value="Sign up"></input>
        </form>
        {loading && <div className="loading"></div>}
        {error && <p className="error">{error}</p>}
        <p>
          Already have an account?
          <span onMouseDown={() => changeScreen("signin")}> Sign in</span>
        </p>
      </div>
    </div>
  );
}
