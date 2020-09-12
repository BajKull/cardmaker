import React, { useState } from "react";

import RotationIcon from "../icons/rotation.svg";

export default function RectEl({ element, functions }) {
  const [fillColor, setFillColor] = useState(element.fillColor);
  const [borderColor, setBorderColor] = useState(element.color);
  return (
    <div className="canvasRect">
      <div className="canvasElSP">
        <div className="canvasElSize">
          <div className="canvasElWidth">
            <p>W</p>
            <input
              value={parseInt(element.width)}
              onChange={functions.handleWidthChange}
            />
          </div>
          <div className="canvasElHeight">
            <p>H</p>
            <input
              value={parseInt(element.height)}
              onChange={functions.handleHeightChange}
            />
          </div>
        </div>
        <div className="canvasElPos">
          <div className="canvasElX">
            <p>X</p>
            <input
              value={parseInt(element.posX)}
              onChange={functions.handlePosXChange}
            />
          </div>
          <div className="canvasElY">
            <p>Y</p>
            <input
              value={parseInt(element.posY)}
              onChange={functions.handlePosYChange}
            />
          </div>
        </div>
        <div className="canvasElRot">
          <img src={RotationIcon} alt="" />
          <input
            value={element.rotation}
            onChange={functions.handleRotationChange}
          />
        </div>
      </div>
      <div className="rectBorderWidth">
        <p>Border width</p>
        <input
          type="text"
          value={element.lineWidth}
          onChange={functions.handleLineWidthChange}
        />
      </div>
      <div className="rectBorderRadius">
        <p>Corner radius</p>
        <input
          type="text"
          value={element.borderRadius}
          onChange={functions.handleBorderRadiusChange}
        />
      </div>
      <div className="rectColors">
        <div className="rectFillColor">
          <input
            type="color"
            value={element.fillColor}
            onChange={(e) => setFillColor(e.target.value)}
            onBlur={() => functions.handleFillColorChange(fillColor)}
          />
          <p>Fill</p>
          <input
            type="checkbox"
            className="rectFillCheckbox"
            checked={element.fill}
            onChange={functions.handleFillChange}
          />
        </div>
        <div className="rectBorderColor">
          <input
            type="color"
            value={element.color}
            onChange={(e) => setBorderColor(e.target.value)}
            onBlur={() => functions.handleBorderColorChange(borderColor)}
          />
          <p>Border</p>
        </div>
      </div>
    </div>
  );
}
