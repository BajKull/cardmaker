import React from "react";

export default function RectEl({ element, functions }) {
  return (
    <div className="canvasRect">
      <div className="canvasElSP">
        <div className="canvasElSize">
          <div className="canvasElWidth">
            <p>W</p>
            <input
              value={element.width}
              onChange={(event) => functions.handleWidthChange(event)}
            />
          </div>
          <div className="canvasElHeight">
            <p>H</p>
            <input
              value={element.height}
              onChange={(event) => functions.handleHeightChange(event)}
            />
          </div>
        </div>
        <div className="canvasElPos">
          <div className="canvasElX">
            <p>X</p>
            <input
              value={element.posX}
              onChange={(event) => functions.handlePosXChange(event)}
            />
          </div>
          <div className="canvasElY">
            <p>Y</p>
            <input
              value={element.posY}
              onChange={(event) => functions.handlePosYChange(event)}
            />
          </div>
        </div>
      </div>
      <div className="rectBorderWidth">
        <p>Border width</p>
        <input
          type="text"
          value={element.lineWidth}
          onChange={(event) => functions.handleLineWidthChange(event)}
        />
      </div>
      <div className="rectBorderRadius">
        <p>Corner radius</p>
        <input
          type="text"
          value={element.borderRadius}
          onChange={(event) => functions.handleBorderRadiusChange(event)}
        />
      </div>
      <div className="rectColors">
        <div className="rectFillColor">
          <input
            type="color"
            defaultValue={element.fill}
            onBlur={functions.handleFillColorChange}
          />
          <p>Fill</p>
        </div>
        <div className="rectBorderColor">
          <input
            type="color"
            defaultValue={element.color}
            onBlur={functions.handleBorderColorChange}
          />
          <p>Border</p>
        </div>
      </div>
    </div>
  );
}
