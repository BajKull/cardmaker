import React, { useEffect } from "react";
import { Element } from "react-scroll";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Blob } from "./blob.svg";
import Screen1 from "./screen1.png";
import Screen2 from "./screen2.png";

export default function Choice() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/create") window.scrollTo(0, 0);
  }, [location]);

  return (
    <Element name="choice" className="choice">
      <Blob className="choiceBlob" />
      <div className="choiceBg"></div>
      <div className="choice1">
        <div className="choiceText">
          <h1>Browse free and available patterns</h1>
          <h2>
            There are many various cards which you can browse and choose
            whichever one pleases and suits your needs. Every card is free for
            everyone! If we think your card is standing out we may add it to our
            global collection!
          </h2>
          <Link to="/cards">
            <button className="choiceBtn">Browse cards</button>
          </Link>
        </div>
        <img src={Screen1} alt="" className="choiceImg" />
      </div>
      <div className="choice2">
        <div className="choiceText">
          <h1>Create your own card from scratch</h1>
          <h2>
            If you do not want to use a pattern you can design your card by
            yourself and show your creativity. Sky is the limit!
          </h2>
          <Link to="/create/editor">
            <button className="choiceBtn">Create card</button>
          </Link>
        </div>
        <img src={Screen2} alt="" className="choiceImg" />
      </div>
    </Element>
  );
}
