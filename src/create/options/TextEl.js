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
        <div className="fontSizeContainer">
          <select
            className="textFontFam"
            onChange={(event) => functions.handleFontSChange(event)}
          >
            <option>8</option>
            <option>10</option>
            <option>12</option>
            <option>14</option>
            <option>18</option>
            <option>24</option>
            <option>30</option>
            <option>36</option>
            <option>48</option>
            <option>60</option>
            <option>72</option>
            <option>96</option>
          </select>

          <input
            type="text"
            value={element.size}
            onChange={(event) => functions.handleFontSChange(event)}
            className="textFSize"
          />
        </div>
        <select
          className="textFontFam"
          value={element.font}
          onChange={(event) => functions.handleFontChange(event)}
        >
          <option>Cambria</option>
          <option>Georgia</option>
          <option>Palatino Linotype</option>
          <option>Times New Roman</option>
          <option>Arial</option>
          <option>Calibri</option>
          <option>Candara</option>
          <option>Impact</option>
          <option>Lucida Sans Unicode</option>
          <option>Quicksand</option>
          <option>Tahoma</option>
          <option>Trebuchet MS</option>
          <option>Verdana</option>
          <option>Courier</option>
          <option>Lucida Console</option>
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
