import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedEl } from "../../redux/actions/setSelectedEl";
import { editCanvasEl } from "../../redux/actions/EditCanvasEl";
import { deleteCanvasEl } from "../../redux/actions/DeleteCanvasEl";
import TextEl from "./TextEl";
import RectEl from "./RectEl";
import CircEl from "./CircEl";
import ImgEl from "./ImgEl";
import LineEl from "./LineEl";
import CloseIcon from "../icons/close.svg";
import { ReactComponent as BinIcon } from "../icons/bin.svg";

export default function Element({ element }) {
  const dispatch = useDispatch();
  const index = useSelector((state) => state.canvasElIndex);
  const closeElementOptions = () => {
    dispatch(setSelectedEl(null));
  };

  const handleWidthChange = (e) => {
    const newEl = { ...element };
    if (!(isNaN(e.target.value) || e.target.value === ""))
      newEl.width = parseInt(e.target.value);
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleHeightChange = (e) => {
    const newEl = { ...element };
    if (!(isNaN(e.target.value) || e.target.value === ""))
      newEl.height = parseInt(e.target.value);
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleRadiusChange = (e) => {
    const newEl = { ...element };
    if (!(isNaN(e.target.value) || e.target.value === "")) {
      newEl.width = parseInt(e.target.value) * 2;
      newEl.height = parseInt(e.target.value) * 2;
      newEl.radius = parseInt(e.target.value);
    }
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handlePosXChange = (e) => {
    const newEl = { ...element };
    if (!(isNaN(e.target.value) || e.target.value === ""))
      newEl.posX = parseInt(e.target.value);
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handlePosYChange = (e) => {
    const newEl = { ...element };
    if (!(isNaN(e.target.value) || e.target.value === ""))
      newEl.posY = parseInt(e.target.value);
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleLineWidthChange = (e) => {
    const newEl = { ...element };
    if (!(isNaN(e.target.value) || e.target.value === ""))
      newEl.lineWidth = parseInt(e.target.value);
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleBorderRadiusChange = (e) => {
    const newEl = { ...element };
    if (!(isNaN(e.target.value) || e.target.value === "")) {
      newEl.borderRadius = parseInt(e.target.value);
      if (e.target.value > newEl.width / 2)
        newEl.borderRadius = newEl.width / 2;
      if (e.target.value > newEl.height / 2)
        newEl.borderRadius = newEl.height / 2;
    }
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleFillChange = () => {
    const newEl = { ...element };
    newEl.fill = !newEl.fill;
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleFillColorChange = (color) => {
    const newEl = { ...element };
    newEl.fillColor = color;
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleBorderColorChange = (color) => {
    const newEl = { ...element };
    newEl.color = color;
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleTextChange = (e) => {
    const newEl = { ...element };
    newEl.msg = e.target.value;
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleFontChange = (e) => {
    const newEl = { ...element };
    newEl.font = e.target.value;
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleFontSizeChange = (e) => {
    const newEl = { ...element };
    if (!(isNaN(e.target.value) || e.target.value === ""))
      newEl.size = parseInt(e.target.value);
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleFontWeightChange = (e) => {
    const newEl = { ...element };
    if (!(isNaN(e.target.value) || e.target.value === ""))
      newEl.weight = parseInt(e.target.value);
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleAlignChange = (how) => {
    const newEl = { ...element };
    newEl.align = how;
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleColorChange = (color) => {
    const newEl = { ...element };
    newEl.color = color;
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleRotationChange = (e) => {
    const newEl = { ...element };
    if (!(isNaN(e.target.value) || e.target.value === ""))
      newEl.rotation = parseInt(e.target.value);
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
    handleFillChange,
    handleFillColorChange,
    handleFontChange,
    handleFontSizeChange,
    handleFontWeightChange,
    handleLineWidthChange,
    handleTextChange,
    handleColorChange,
    handleRotationChange,
  };

  const deleteElement = () => {
    dispatch(setSelectedEl(null));
    dispatch(deleteCanvasEl(index));
  };

  return (
    <div className="canvasOptionsContainer">
      {element.type === "text" && (
        <TextEl element={element} functions={functions} />
      )}
      {element.type === "line" && (
        <LineEl element={element} functions={functions} />
      )}
      {element.type === "rectangle" && (
        <RectEl element={element} functions={functions} />
      )}
      {element.type === "circle" && (
        <CircEl element={element} functions={functions} />
      )}
      {element.type === "image" && (
        <ImgEl element={element} functions={functions} />
      )}
      <button className="canvasOptionsClose" onClick={closeElementOptions}>
        <img src={CloseIcon} alt="" />
      </button>
      <button className="canvasDelete" onClick={deleteElement}>
        <BinIcon className="canvasDeleteIcon" />
      </button>
    </div>
  );
}
