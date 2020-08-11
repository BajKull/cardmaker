import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedEl } from "../../redux/actions/setSelectedEl";
import { editCanvasEl } from "../../redux/actions/EditCanvasEl";
import TextEl from "./TextEl";
import RectEl from "./RectEl";
import CircEl from "./CircEl";
import ImgEl from "./ImgEl";
import CloseIcon from "../icons/close.svg";

export default function Element({ element }) {
  const dispatch = useDispatch();
  const index = useSelector((state) => state.canvasElIndex);
  const closeElementOptions = () => {
    dispatch(setSelectedEl(null));
  };

  // TE UPDATY SA ZLE, const newEl = element nie robi kopii a odnosi sie do statu!!

  const handleWidthChange = (e) => {
    const newEl = { ...element };
    if (isNaN(e.target.value) || e.target.value === "") newEl.width = 25;
    else newEl.width = parseInt(e.target.value);
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleHeightChange = (e) => {
    const newEl = { ...element };
    if (isNaN(e.target.value) || e.target.value === "") newEl.height = 25;
    else newEl.height = parseInt(e.target.value);
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleRadiusChange = (e) => {
    const newEl = { ...element };
    if (isNaN(e.target.value) || e.target.value === "") {
      newEl.width = 25;
      newEl.height = 25;
      newEl.radius = 12.5;
    } else {
      newEl.width = parseInt(e.target.value) * 2;
      newEl.height = parseInt(e.target.value) * 2;
      newEl.radius = parseInt(e.target.value);
    }
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handlePosXChange = (e) => {
    const newEl = { ...element };
    if (isNaN(e.target.value) || e.target.value === "") newEl.posX = 25;
    else newEl.posX = parseInt(e.target.value);
    // dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handlePosYChange = (e) => {
    const newEl = { ...element };
    if (isNaN(e.target.value) || e.target.value === "") newEl.posY = 25;
    else newEl.posY = parseInt(e.target.value);
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleLineWidthChange = (e) => {
    const newEl = { ...element };
    if (isNaN(e.target.value) || e.target.value === "") newEl.lineWidth = 5;
    else newEl.lineWidth = parseInt(e.target.value);
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleBorderRadiusChange = (e) => {
    const newEl = { ...element };
    if (isNaN(e.target.value) || e.target.value === "") newEl.borderRadius = 1;
    else newEl.borderRadius = parseInt(e.target.value);
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleFillColorChange = (e) => {
    const newEl = { ...element };
    newEl.fill = e.target.value;
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleBorderColorChange = (e) => {
    const newEl = { ...element };
    newEl.color = e.target.value;
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleTextChange = (e) => {
    const newEl = { ...element };
    newEl.msg = e.target.value;
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleFontSChange = (e) => {
    const newEl = { ...element };
    if (isNaN(e.target.value) || e.target.value === "") newEl.size = 25;
    else newEl.size = parseInt(e.target.value);
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleAlignChange = (how) => {
    const newEl = { ...element };
    newEl.align = how;
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleColorChange = (e) => {
    const newEl = { ...element };
    newEl.color = e.target.value;
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const functions = {
    handleWidthChange,
    handleHeightChange,
    handleRadiusChange,
    handlePosXChange,
    handlePosYChange,
    handleAlignChange,
    handleBorderColorChange,
    handleBorderRadiusChange,
    handleFillColorChange,
    handleFontSChange,
    handleLineWidthChange,
    handleTextChange,
    handleColorChange,
  };

  return (
    <div className="canvasOptionsContainer">
      {element.type === "text" && (
        <TextEl element={element} functions={functions} />
      )}
      {element.type === "rectangle" && (
        <RectEl element={element} functions={functions} />
      )}
      {element.type === "circle" && (
        <CircEl element={element} functions={functions} />
      )}
      {element.type === "image" && (
        <TextEl element={element} functions={functions} />
      )}
      <button className="canvasOptionsClose" onClick={closeElementOptions}>
        <img src={CloseIcon} alt="" />{" "}
      </button>
    </div>
  );
}
