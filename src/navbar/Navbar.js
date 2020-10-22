import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from "./logo.svg";
import { ReactComponent as Burger } from "./burger.svg";
import { CSSTransition } from "react-transition-group";

import UserPanel from "./UserPanel";

function Links({ name, handleMenuClick, showMenu }) {
  useEffect(() => {
    return () => (document.body.style.overflow = "auto");
  }, []);

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
        <UserPanel />
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
