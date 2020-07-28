import React from "react";
import StepsImage from "./portfolio1.jpg";

export default function Steps() {
  return (
    <div className="steps">
      <h1 className="stepsTitle">Create your card within a minute!</h1>
      <div className="stepsIntro">
        <img className="stepsImg" src={StepsImage} alt="" />
        <div className="stepsIntroText">
          <p>
            Cardmaker is a website which allows you to create any card that you
            need with just a few mouse clicks!
          </p>
          <p>
            Create your own card or choose one of the finished templates and
            simply change the text to your needs.
          </p>
        </div>
      </div>
      <div className="stepsCreated">
        <h1>2137 cards created</h1>
      </div>
      <h1 className="stepsTitle">How to</h1>
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
          <p className="helpText">Create a link for free and share it!</p>
        </div>
      </div>

      <button className="stepsBtn">Create card</button>
    </div>
  );
}
