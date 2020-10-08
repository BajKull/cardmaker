import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ChangeLoginScreen } from "../redux/actions/ChangeLoginScreen";
import { ReactComponent as LogoIcon } from "./logo.svg";
import { ReactComponent as Burger } from "./burger.svg";
import { CSSTransition } from "react-transition-group";

function Links({ name, user, handleOnClick, handleMenuClick, showMenu }) {
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
        {!user && (
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
        {user && (
          <ul className="navbarLogin">
            <li className="navbarCreate">
              <Link to="/create/editor">
                <button>Create</button>
              </Link>
            </li>
            <li>{user.displayName}</li>
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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginStatus);
  const [showMenu, setShowMenu] = useState(false);

  const handleOnClick = (screen) => {
    dispatch(ChangeLoginScreen(screen));
  };

  const handleMenuClick = () => {
    if (showMenu) document.body.style.overflow = "auto";
    else document.body.style.overflow = "hidden";

    setShowMenu(!showMenu);
  };

  return (
    <div className="navbar">
      <Links
        user={user}
        handleOnClick={handleOnClick}
        name={"navbarContainer"}
      />
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
          user={user}
          handleOnClick={handleOnClick}
          name={"navbarContainer2"}
          handleMenuClick={handleMenuClick}
          showMenu={showMenu}
        />
      </CSSTransition>
    </div>
  );
}
