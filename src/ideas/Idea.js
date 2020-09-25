import React from "react";

export default function Idea({ image }) {
  return (
    <div className="idea">
      <img className="ideaImg" src={image} alt="" />
      <div className="ideaBg"></div>
      <button className="ideaBtn">Try it</button>
    </div>
  );
}
