import React, { useState, useEffect, useCallback } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ChangeLoginStatus } from "../redux/actions/ChangeLoginStatus";
import { ChangeLoginScreen } from "../redux/actions/ChangeLoginScreen";
import { ReactComponent as LogoIcon } from "./logo.svg";
import { ReactComponent as Burger } from "./burger.svg";
import { CSSTransition } from "react-transition-group";
import { auth } from "../firebase/Config";

function Links({ name, handleMenuClick, showMenu }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginStatus);
  const [userMenu, setUserMenu] = useState(false);
  const handleOnClick = (screen) => {
    dispatch(ChangeLoginScreen(screen));
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => dispatch(ChangeLoginStatus(null)))
      .catch((error) => console.log(error));
  };

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

  return (
    <div className={name}>
      {showMenu && (
        <div className="navbarBg" onClick={() => handleMenuClick()}></div>
      )}

      <div className="navbarContent">
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
        {user === "noUser" && (
          <ul className="navbarLogin">
            <li className="navbarCreate">
              <Link to="/create/editor">
                <button>Create</button>
              </Link>
            </li>
            <li onClick={() => handleOnClick("signin")}>Sign in</li>
            <li onClick={() => handleOnClick("signup")}>Sign up</li>
          </ul>
        )}
        {user && user !== "noUser" && (
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
        )}
        <Link to="/create">
          <button className="navbarBtn" onClick={() => handleMenuClick()}>
            Get started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    if (showMenu) document.body.style.overflow = "auto";
    else document.body.style.overflow = "hidden";

    setShowMenu(!showMenu);
  };

  return (
    <div className="navbar">
      <Links name={"navbarContainer"} />
      <Burger className="navbarBurger" onClick={handleMenuClick} />
      <Link to="/">
        <LogoIcon className="logoAlone" />
      </Link>
      <CSSTransition
        in={showMenu}
        timeout={500}
        unmountOnExit
        classNames="page-from-left"
      >
        <Links
          name={"navbarContainer2"}
          handleMenuClick={handleMenuClick}
          showMenu={showMenu}
        />
      </CSSTransition>
    </div>
  );
}
