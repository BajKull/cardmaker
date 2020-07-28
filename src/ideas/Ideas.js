import React from "react";
import Idea from "./Idea";
import IdeasImgs from "./IdeasData";
import { Element } from "react-scroll";

export default function Ideas() {
  return (
    <Element name="idea" className="ideas">
      <h1 className="ideasTitle">Ideas</h1>
      <div className="ideasCards">
        {IdeasImgs.images.map((idea, i) => (
          <Idea image={idea} key={i} />
        ))}
      </div>
    </Element>
  );
}
