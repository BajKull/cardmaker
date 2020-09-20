import React from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ChangeLoginScreen } from "../redux/actions/ChangeLoginScreen";
import { ReactComponent as LogoIcon } from "./logo4.svg";

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
          <Link to="/">
            <LogoIcon className="logo" />
          </Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/cards">Browse</Link>
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
