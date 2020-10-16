import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { projectFirestore } from "../firebase/Config";

export default function User() {
  const [bg, setBg] = useState(null);
  const location = useRouteMatch().path;
  const user = useSelector((state) => state.loginStatus);

  useEffect(() => {
    projectFirestore
      .collection(user.uid)
      .doc("background")
      .get()
      .then((bg) => {
        if (bg === undefined)
          setBg(
            "https://firebasestorage.googleapis.com/v0/b/cardmaker-e6704.appspot.com/o/global%20background.png?alt=media&token=80fb2371-17e9-4cca-8748-2aaf432b3140"
          );
        else setBg(bg.data().url);
      });
  }, [user.uid]);
  return (
    <div className="background">
      <img src={bg} alt="" className="bgImg" />

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
