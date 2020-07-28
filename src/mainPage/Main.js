import React from "react";
import Bg from "./bg.png";
import { Element, Link } from "react-scroll";

export default function main() {
  return (
    <Element name="mainPage" className="mainPage">
      <img className="mainBg" src={Bg} alt="" />
      <div className="mainBgFilter"></div>
      <h1>Create your own card</h1>
      <h3>Easy, fast and pretty</h3>
      <Link to="choice" smooth>
        <button className="mainBtn">Get started</button>
      </Link>
    </Element>
  );
}
