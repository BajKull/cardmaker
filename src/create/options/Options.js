import React from "react";
import { useSelector } from "react-redux";
import Element from "./Element";
import ElementPreview from "./ElementPreview";
import ElementImage from "./images/ElementImage";

export default function Options({ activeBtn }) {
  const elIndex = useSelector((state) => state.canvasElIndex);
  const elements = useSelector((state) => state.canvasEls);

  if (activeBtn === "image")
    return (
      <div className="canvasOptions">
        {activeBtn === "image" && <ElementImage />}
      </div>
    );
  else
    return (
      <div className="canvasOptions">
        {elIndex !== null ? (
          <Element element={elements[elIndex]} />
        ) : (
          elements.map((el, i) => (
            <ElementPreview element={el} key={el.id} index={i} />
          ))
        )}
      </div>
    );
}
