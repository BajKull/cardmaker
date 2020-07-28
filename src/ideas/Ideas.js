import React from "react";
import Idea from "./Idea";
import IdeasImgs from "./IdeasData";

export default function Ideas() {
  return (
    <div className="ideas">
      <h1 className="ideasTitle">Ideas</h1>
      <div className="ideasCards">
        {IdeasImgs.images.map((idea, i) => (
          <Idea image={idea} key={i} />
        ))}
      </div>
    </div>
  );
}
