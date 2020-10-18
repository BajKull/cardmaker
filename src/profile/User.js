import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import { projectFirestore } from "../firebase/Config";

export default function User() {
  const [bg, setBg] = useState(null);
  const [cards, setCards] = useState(0);
  const location = useRouteMatch().path;
  const path = useLocation();
  const user = useSelector((state) => state.loginStatus);

  const tabsRef = useRef();

  useEffect(() => {
    projectFirestore
      .collection(user.uid)
      .doc("background")
      .get()
      .then((background) => {
        if (background.data() === undefined)
          setBg(
            "https://firebasestorage.googleapis.com/v0/b/cardmaker-e6704.appspot.com/o/global%20background.png?alt=media&token=80fb2371-17e9-4cca-8748-2aaf432b3140"
          );
        else setBg(background.data().url);
      });
    projectFirestore
      .collection("cards")
      .where("author", "==", user.uid)
      .get()
      .then((docs) => {
        setCards(docs.size);
      });
  }, [user.uid]);

  useEffect(() => {
    const tabs = Array.from(
      document.getElementsByClassName("tabs")[0].childNodes
    );
    const currentTab = tabs.find(
      (el) => el.href.replace(/.*\/\/[^/]*/, "") === path.pathname
    );

    tabs.forEach((el) => el.classList.remove("activeTab"));

    currentTab.classList.add("activeTab");
  }, [path.pathname]);

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
          <h2>Created {cards} cards</h2>
        </div>
      </div>
      <div className="tabs" ref={tabsRef}>
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
