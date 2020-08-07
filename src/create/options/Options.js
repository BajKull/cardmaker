import React from "react";
import { useSelector } from "react-redux";
import Element from "./Element";
import ElementPreview from "./ElementPreview";

export default function Options() {
  const elIndex = useSelector((state) => state.canvasElIndex);
  const elements = useSelector((state) => state.canvasEls);
  return (
    <div>
      {elIndex !== null ? (
        <Element element={elements[elIndex]} />
      ) : (
        elements.map((el, i) => (
          <ElementPreview element={el} key={i} index={i} />
        ))
      )}
    </div>
  );
}
