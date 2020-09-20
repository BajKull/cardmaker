import React from "react";
import Bg from "./bg.png";
import { ReactComponent as Blob } from "./blob.svg";
import { Element, Link } from "react-scroll";

export default function main() {
  return (
    <Element name="mainPage" className="mainPage">
      <div className="mainBg"></div>
      <div className="mainContent">
        <div className="mainText">
          <h1>Create your own card</h1>
          <h2>Easy, fast and pretty</h2>
          <p>
            Design your own card from scratch or choose a template and share it
            for free!
          </p>
          <Link to="choice" smooth>
            <button className="mainBtn">Get started</button>
          </Link>
        </div>
        <div className="mainImgContainer">
          <Blob className="mainBlob" />
          <img className="mainImg" src={Bg} alt="" />
        </div>
      </div>
    </Element>
  );
}
