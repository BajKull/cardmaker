import React from "react";
import StepsImage from "./bg3.jpg";
import { Link } from "react-router-dom";
import { Element, Link as Scroll } from "react-scroll";
import useCardsCounter from "../hooks/useCardsCounter";

export default function Steps() {
  const { error, cards } = useCardsCounter();

  return (
    <Element name="steps" className="steps">
      <h1 className="stepsTitle">Create your card within a minute!</h1>
      <div className="stepsIntro">
        <img className="stepsImg" src={StepsImage} alt="" />
        <div className="stepsIntroText">
          <h2>Digital version of cards</h2>
          <p>
            There's no need to send letters no more! You can create your own
            cards and send them to your friends through downloaded file or share
            a link with them!
          </p>
          <Scroll to="stepsHelp" smooth>
            <button className="stepsBtn">How to</button>
          </Scroll>
        </div>
      </div>
      <div className="stepsCreated">
        <h1>
          {error}
          {cards} cards created
        </h1>
      </div>
      <Element name="stepsHelp">
        <h1 className="stepsTitle">How to</h1>
      </Element>
      <div className="stepsHelp">
        <div className="stepsHelpStep">
          <h2 className="numberBg">1</h2>
          <p className="helpText">Choose card template</p>
        </div>
        <div className="stepsHelpStep">
          <h2 className="numberBg">2</h2>
          <p className="helpText">Customize your card</p>
        </div>
        <div className="stepsHelpStep">
          <h2 className="numberBg">3</h2>
          <p className="helpText">Download the image and share it!</p>
        </div>
      </div>

      <Link to="/create">
        <button className="stepsBtn stepsBtn2">Create card</button>
      </Link>
    </Element>
  );
}
