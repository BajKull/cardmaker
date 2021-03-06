import React, { useState } from "react";

import TextLeft from "../icons/text-align-left.svg";
import TextMiddle from "../icons/text-align-middle.svg";
import TextRight from "../icons/text-align-right.svg";
import FontSize from "../icons/font-size.svg";
import FontWeight from "../icons/font-weight.svg";
import RotationIcon from "../icons/rotation.svg";

export default function TextEl({ element, functions }) {
  const [color, setlColor] = useState(element.color);
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
              value={parseInt(element.width)}
              onChange={(event) => functions.handleWidthChange(event)}
            />
          </div>
          <div className="canvasElHeight">
            <p>H</p>
            <input
              value={parseInt(element.height)}
              onChange={(event) => functions.handleHeightChange(event)}
            />
          </div>
        </div>
        <div className="canvasElPos">
          <div className="canvasElX">
            <p>X</p>
            <input
              value={parseInt(element.posX)}
              onChange={(event) => functions.handlePosXChange(event)}
            />
          </div>
          <div className="canvasElY">
            <p>Y</p>
            <input
              value={parseInt(element.posY)}
              onChange={(event) => functions.handlePosYChange(event)}
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
      <div className="textFont">
        <div className="fontSizeContainer">
          <img className="fontSizeIcon" src={FontSize} alt="" />
          <select
            className="textFontFam"
            onChange={(event) => functions.handleFontSizeChange(event)}
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
            onChange={(event) => functions.handleFontSizeChange(event)}
            className="textFSize"
          />
        </div>
        <div className="fontWeightContainer">
          <img className="fontWeightIcon" src={FontWeight} alt="" />
          <input
            type="text"
            className="textWeight"
            value={element.weight}
            onChange={functions.handleFontWeightChange}
          />
        </div>
        <select
          className="textFontFam"
          value={element.font}
          onChange={(event) => functions.handleFontChange(event)}
        >
          <option style={{ fontFamily: "Cambria" }}>Cambria</option>
          <option style={{ fontFamily: "Georgia" }}>Georgia</option>
          <option style={{ fontFamily: "Palatino Linotype" }}>
            Palatino Linotype
          </option>
          <option style={{ fontFamily: "Times New Roman" }}>
            Times New Roman
          </option>
          <option style={{ fontFamily: "Arial" }}>Arial</option>
          <option style={{ fontFamily: "Calibri" }}>Calibri</option>
          <option style={{ fontFamily: "Candara" }}>Candara</option>
          <option style={{ fontFamily: "Impact" }}>Impact</option>
          <option style={{ fontFamily: "Lucida Sans Unicode" }}>
            Lucida Sans Unicode
          </option>
          <option style={{ fontFamily: "Quicksand" }}>Quicksand</option>
          <option style={{ fontFamily: "Tahoma" }}>Tahoma</option>
          <option style={{ fontFamily: "Trebuchet MS" }}>Trebuchet MS</option>
          <option style={{ fontFamily: "Verdana" }}>Verdana</option>
          <option style={{ fontFamily: "Courier" }}>Courier</option>
          <option style={{ fontFamily: "Lucida Console" }}>
            Lucida Console
          </option>
          <option style={{ fontFamily: "Rancher" }}>Rancher</option>
          <option style={{ fontFamily: "Lato" }}>Lato</option>
          <option style={{ fontFamily: "Oswald" }}>Oswald</option>
          <option style={{ fontFamily: "Grandstander" }}>Grandstander</option>
          <option style={{ fontFamily: "Rubik" }}>Rubik</option>
          <option style={{ fontFamily: "Josefin Sans" }}>Josefin Sans</option>
          <option style={{ fontFamily: "Inter" }}>Inter</option>
          <option style={{ fontFamily: "Yanone Kaffeesatz" }}>
            Yanone Kaffeesatz
          </option>
          <option style={{ fontFamily: "Dancing Script" }}>
            Dancing Script
          </option>
          <option style={{ fontFamily: "Grenze Gotisch" }}>
            Grenze Gotisch
          </option>
          <option style={{ fontFamily: "Lobster" }}>Lobster</option>
          <option style={{ fontFamily: "Pacifico" }}>Pacifico</option>
          <option style={{ fontFamily: "Indie Flower" }}>Indie Flower</option>
          <option style={{ fontFamily: "Arvo" }}>Arvo</option>
          <option style={{ fontFamily: "QuickShadows Into Lightand" }}>
            Shadows Into Light
          </option>
          <option style={{ fontFamily: "Acme" }}>Acme</option>
          <option style={{ fontFamily: "Amatic SC" }}>Amatic SC</option>
          <option style={{ fontFamily: "Archtects Daughter" }}>
            Archtects Daughter
          </option>
          <option style={{ fontFamily: "Fredoka One" }}>Fredoka One</option>
          <option style={{ fontFamily: "Permament Marker" }}>
            Permament Marker
          </option>
          <option style={{ fontFamily: "Hanalei" }}>Hanalei</option>
          <option style={{ fontFamily: "Caveat" }}>Caveat</option>
          <option style={{ fontFamily: "Satisfy" }}>Satisfy</option>
        </select>
      </div>

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
      <div className="fontColorContainer">
        <input
          type="color"
          className="textColor"
          value={element.color}
          onChange={(e) => setlColor(e.target.value)}
          onBlur={() => functions.handleColorChange(color)}
        />
        <p>Color</p>
      </div>
    </div>
  );
}
