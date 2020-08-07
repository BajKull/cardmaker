import React from "react";
import TextEl from "./TextEl";
import RectEl from "./RectEl";
import CircEl from "./CircEl";
import ImgEl from "./ImgEl";

export default function Element({ element }) {
  return (
    <div>
      {element.type === "text" && <TextEl element={element} />}
      {element.type === "rectangle" && <TextEl element={element} />}
      {element.type === "circle" && <TextEl element={element} />}
      {element.type === "image" && <TextEl element={element} />}
    </div>
  );
}
