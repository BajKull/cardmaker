import React, { useState } from "react";

import RotationIcon from "../icons/rotation.svg";

export default function LineEl({ element, functions }) {
  const [color, setColor] = useState(element.color);
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
        <p>Line width</p>
        <input
          type="text"
          value={element.lineWidth}
          onChange={functions.handleLineWidthChange}
        />
      </div>
      <div className="rectColors">
        <div className="rectFillColor">
          <input
            type="color"
            value={element.color}
            onChange={(e) => setColor(e.target.value)}
            onBlur={() => functions.handleColorChange(color)}
          />
          <p>Color</p>
        </div>
      </div>
    </div>
  );
}
