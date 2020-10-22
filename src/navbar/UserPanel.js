import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChangeLoginScreen } from "../redux/actions/ChangeLoginScreen";
import { ChangeLoginStatus } from "../redux/actions/ChangeLoginStatus";
import { CSSTransition } from "react-transition-group";
import { auth } from "../firebase/Config";
import { Link } from "react-router-dom";

export default function UserPanel() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginStatus);
  const [userMenu, setUserMenu] = useState(false);

  const handleHideUserMenu = useCallback(
    (e) => {
      if (e.target.classList.contains("userNameBtn")) return;
      if (userMenu) setUserMenu(false);
    },
    [userMenu]
  );

  useEffect(() => {
    window.addEventListener("click", handleHideUserMenu);

    return () => window.removeEventListener("click", handleHideUserMenu);
  }, [handleHideUserMenu]);
  const handleOnClick = (screen) => {
    dispatch(ChangeLoginScreen(screen));
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => dispatch(ChangeLoginStatus(null)))
      .catch((error) => console.log(error));
  };
  if (user === "noUser")
    return (
      <ul className="navbarLogin">
        <li className="navbarCreate">
          <Link to="/create/editor">
            <button>Create</button>
          </Link>
        </li>
        <li onClick={() => handleOnClick("signin")}>Sign in</li>
        <li onClick={() => handleOnClick("signup")}>Sign up</li>
      </ul>
    );
  else if (user && user !== "noUser")
    return (
      <ul className="navbarLogin">
        <li className="navbarCreate">
          <Link to="/create/editor">
            <button>Create</button>
          </Link>
        </li>
        <li onClick={() => setUserMenu(!userMenu)} className="userNameBtn">
          {user.displayName}
        </li>
        <CSSTransition
          in={userMenu}
          timeout={250}
          unmountOnExit
          classNames="navUserName"
        >
          <ul className="navbarUserOptions">
            <Link to="/profile">
              <li>Profile</li>
            </Link>
            <Link to="/profile/cards">
              <li>My cards</li>
            </Link>
            <Link to="/profile/images">
              <li>My images</li>
            </Link>
            <li onClick={handleSignOut}>Sign out</li>
          </ul>
        </CSSTransition>
      </ul>
    );
  else return null;
}
