import React from "react";

import TextLeft from "../icons/text-align-left.svg";
import TextMiddle from "../icons/text-align-middle.svg";
import TextRight from "../icons/text-align-right.svg";

export default function TextEl({ element, functions }) {
  return (
    <div className="canvasText">
      <input
        value={element.msg}
        onChange={(event) => functions.handleTextChange(event)}
        className="canvasMsg"
      />
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
      <div className="textFont">
        <input
          list="fontSize"
          value={element.size}
          onChange={(event) => functions.handleFontSChange(event)}
          className="textFSize"
        />

        <datalist id="fontSize">
          <option value={8} />
          <option value={12} />
          <option value={24} />
          <option value={36} />
          <option value={48} />
        </datalist>
        <select className="textFontFam">
          <option>font1</option>
          <option>font2</option>
          <option>font3</option>
          <option>font4</option>
        </select>
      </div>
      <input
        type="color"
        className="textColor"
        defaultValue={element.color}
        onBlur={(event) => functions.handleColorChange(event)}
      />
      <div className="textAlignment">
        <button onClick={() => functions.handleAlignChange("left")}>
          <img src={TextLeft} alt="" />
        </button>
        <button onClick={() => functions.handleAlignChange("center")}>
          <img src={TextMiddle} alt="" />
        </button>
        <button onClick={() => functions.handleAlignChange("right")}>
          <img src={TextRight} alt="" />
        </button>
      </div>
    </div>
  );
}
