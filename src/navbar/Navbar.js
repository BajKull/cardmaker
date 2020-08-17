import React from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ChangeLoginScreen } from "../redux/actions/ChangeLoginScreen";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginStatus);

  const handleOnClick = (screen) => {
    dispatch(ChangeLoginScreen(screen));
  };
  return (
    <div className="navbar">
      <ul className="navbarLinks">
        <li>
          <Link to="/">logo</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/ideas">Ideas</Link>
        </li>
      </ul>
      {!user && (
        <ul className="navbarLogin">
          <li onClick={() => handleOnClick("signin")}>Sign in</li>
          <li onClick={() => handleOnClick("signup")}>Sign up</li>
        </ul>
      )}
      {user && (
        <ul className="navbarLogin">
          <li>{user.displayName}</li>
        </ul>
      )}
    </div>
  );
}
