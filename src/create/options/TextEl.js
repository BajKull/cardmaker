import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { editCanvasEl } from "../../redux/actions/EditCanvasEl";

import TextLeft from "../icons/text-align-left.svg";
import TextMiddle from "../icons/text-align-middle.svg";
import TextRight from "../icons/text-align-right.svg";

export default function TextEl({ element }) {
  const dispatch = useDispatch();
  const index = useSelector((state) => state.canvasElIndex);

  const handleTextChange = (e) => {
    const newEl = element;
    newEl.msg = e.target.value;
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleWidthChange = (e) => {
    const newEl = element;
    if (isNaN(e.target.value)) newEl.width = 25;
    else newEl.width = parseInt(e.target.value);
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleHeightChange = (e) => {
    const newEl = element;
    if (e.target.value === isNaN()) newEl.height = 25;
    else newEl.height = parseInt(e.target.value);
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handlePosXChange = (e) => {
    const newEl = element;
    if (e.target.value === isNaN()) newEl.posX = 25;
    else newEl.posX = parseInt(e.target.value);
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handlePosYChange = (e) => {
    const newEl = element;
    if (e.target.value === isNaN()) newEl.posY = 25;
    else newEl.posY = parseInt(e.target.value);
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleFontSChange = (e) => {
    const newEl = element;
    if (e.target.value === isNaN()) newEl.size = 25;
    else newEl.size = parseInt(e.target.value);
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleAlignChange = (how) => {
    const newEl = element;
    newEl.align = how;
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  return (
    <div className="canvasText">
      <input
        value={element.msg}
        onChange={(event) => handleTextChange(event)}
        className="canvasMsg"
      />
      <div className="textSizePos">
        <div className="textSize">
          <div className="textWidth">
            <p>W</p>
            <input
              value={element.width}
              onChange={(event) => handleWidthChange(event)}
            />
          </div>
          <div className="textHeight">
            <p>H</p>
            <input
              value={element.height}
              onChange={(event) => handleHeightChange(event)}
            />
          </div>
        </div>
        <div className="textPos">
          <div className="textX">
            <p>X</p>
            <input
              value={element.posX}
              onChange={(event) => handlePosXChange(event)}
            />
          </div>
          <div className="textY">
            <p>Y</p>
            <input
              value={element.posY}
              onChange={(event) => handlePosYChange(event)}
            />
          </div>
        </div>
      </div>
      <div className="textFont">
        <input
          list="fontSize"
          value={element.size}
          onChange={(event) => handleFontSChange(event)}
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
      <div className="textAlignment">
        <button onClick={() => handleAlignChange("left")}>
          <img src={TextLeft} alt="" />
        </button>
        <button onClick={() => handleAlignChange("center")}>
          <img src={TextMiddle} alt="" />
        </button>
        <button onClick={() => handleAlignChange("right")}>
          <img src={TextRight} alt="" />
        </button>
      </div>
    </div>
  );
}
