import React from "react";
import Bg from "./bg.png";
import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";

export default function User() {
  const location = useRouteMatch().path;
  const user = useSelector((state) => state.loginStatus);
  return (
    <div className="background">
      <img src={Bg} alt="" className="bgImg" />

      <div className="profileUser">
        {user.photoURL ? (
          <img src={user.photoURL} alt="" className="profileLogo" />
        ) : (
          <div className="profileLogo">
            <h1>{user.displayName.charAt(0).toUpperCase()} </h1>
          </div>
        )}
        <div className="profileUserInfo">
          <h1>{user.displayName}</h1>
          <h2>Created 19 cards</h2>
        </div>
      </div>
      <div className="tabs">
        <Link to={location}>
          <button>Profile</button>
        </Link>
        <Link to={`${location}/cards`}>
          <button>My cards</button>
        </Link>
        <Link to={`${location}/images`}>
          <button>My images</button>
        </Link>
      </div>
    </div>
  );
}
