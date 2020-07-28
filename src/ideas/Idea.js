import React from "react";

export default function Idea({ image }) {
  console.log(image);
  return (
    <div className="idea">
      <img className="ideaImg" src={image} alt="" />
      <button className="ideaBtn">Try it</button>
    </div>
  );
}
