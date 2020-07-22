import React from "react";
import Bg from "./bg.png";

export default function main() {
  return (
    <div className="mainPage">
      <img className="mainBg" src={Bg} alt="" />
      <div className="mainBgFilter"></div>
      <h1>Create your own card</h1>
      <h3>Easy, fast and pretty</h3>
      <button className="mainBtn">Get started</button>
    </div>
  );
}
