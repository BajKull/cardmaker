import React from "react";

export default function CircEl({ element, functions }) {
  return (
    <div className="canvasCircle">
      <div className="canvasElSP">
        <div className="canvasElSize">
          <div className="canvasElWidth">
            <p>R</p>
            <input
              value={element.radius}
              onChange={(event) => functions.handleRadiusChange(event)}
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
      <div className="circleBorderWidth">
        <p>Border width</p>
        <input
          type="text"
          value={element.lineWidth}
          onChange={(event) => functions.handleLineWidthChange(event)}
        />
      </div>
      <div className="circleColors">
        <div className="circleFillColor">
          <input
            type="color"
            defaultValue={element.fill}
            onBlur={functions.handleFillColorChange}
          />
          <p>Fill</p>
        </div>
        <div className="circleBorderColor">
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
