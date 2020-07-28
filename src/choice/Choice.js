import React from "react";
import Cards from "./Cards";
import { Element } from "react-scroll";

export default function Choice() {
  return (
    <Element name="choice" className="choice">
      <div className="choiceBg"></div>
      <h1>Choose your design</h1>
      <Cards />
    </Element>
  );
}
