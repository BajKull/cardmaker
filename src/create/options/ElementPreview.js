import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSelectedEl } from "../../redux/actions/setSelectedEl";
import { deleteCanvasEl } from "../../redux/actions/DeleteCanvasEl";
import { editCanvasEl } from "../../redux/actions/EditCanvasEl";
import { changeCanvasElPos } from "../../redux/actions/ChangeCanvasElPos";
import TextIcon from "../icons/text.svg";
import RectangleIcon from "../icons/rectangle.svg";
import CircleIcon from "../icons/circle.svg";
import ImageIcon from "../icons/image3.svg";
import BinIcon from "../icons/bin.svg";
import EyeIcon from "../icons/eye.svg";
import LineIcon from "../icons/pencil.svg";
import EditIcon from "../icons/edit.svg";

export default function ElementPreview({ element, index }) {
  const [elName, setElName] = useState(element.name);
  const dispatch = useDispatch();
  const textToEdit = useRef(null);
  const selectItem = () => {
    dispatch(setSelectedEl(index));
  };
  const deleteItem = (e) => {
    e.stopPropagation();
    dispatch(setSelectedEl(null));
    dispatch(deleteCanvasEl(index));
  };
  const hideElement = (e) => {
    e.stopPropagation();
    const newEl = { ...element };
    newEl.visible = !newEl.visible;
    dispatch(editCanvasEl({ index, el: newEl }));
  };
  const editItem = (e) => {
    e.stopPropagation();
    textToEdit.current.removeAttribute("disabled");
    textToEdit.current.focus();
    textToEdit.current.select();
  };

  const checkForEnter = (e) => {
    if (e.keyCode === 13) {
      updateName();
      textToEdit.current.setAttribute("disabled", "");
      textToEdit.current.click();
    }
  };

  const updateName = () => {
    const newEl = { ...element };
    newEl.name = elName;
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("elementId", index);
    e.dataTransfer.setData("counter", 1);
  };

  const handleOnDrag = (e) => {
    e.preventDefault();
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    const counter = parseInt(e.currentTarget.getAttribute("counter"));
    e.currentTarget.setAttribute("counter", counter + 1);
    e.currentTarget.style.borderBottom = "1px solid #54c1de";
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    const counter = parseInt(e.currentTarget.getAttribute("counter"));
    e.currentTarget.setAttribute("counter", counter - 1);
    if (counter === 1)
      e.currentTarget.style.borderBottom = "1px solid transparent";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.style.borderBottom = "1px solid transparent";
    e.currentTarget.setAttribute("counter", 0);
    const startIndex = parseInt(e.dataTransfer.getData("elementId"));
    const endIndex = parseInt(e.currentTarget.getAttribute("index"));
    dispatch(changeCanvasElPos(startIndex, endIndex));
  };

  return (
    <div
      counter={0}
      className="elementPreview"
      onClick={selectItem}
      onDragStart={handleDragStart}
      onDrag={handleOnDrag}
      onDragOver={handleOnDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      draggable
      index={index}
    >
      {element.type === "text" && <img src={TextIcon} alt="" />}
      {element.type === "line" && <img src={LineIcon} alt="" />}
      {element.type === "rectangle" && <img src={RectangleIcon} alt="" />}
      {element.type === "circle" && <img src={CircleIcon} alt="" />}
      {element.type === "image" && <img src={ImageIcon} alt="" />}
      {element.type === "text" && <h1>{element.msg}</h1>}
      {element.type !== "text" && (
        <input
          value={elName}
          ref={textToEdit}
          onChange={(e) => setElName(e.target.value)}
          onKeyDown={checkForEnter}
          onBlur={updateName}
          disabled
        />
      )}

      <div className="elementBtns">
        <button
          className="editId"
          style={
            element.type === "text"
              ? { visibility: "hidden" }
              : { visibility: "visible" }
          }
          onClick={(event) => editItem(event)}
        >
          <img src={EditIcon} alt="" />
        </button>
        <button onClick={(event) => hideElement(event)}>
          <img src={EyeIcon} alt="" />
        </button>
        <button onClick={(event) => deleteItem(event)}>
          <img src={BinIcon} alt="" />
        </button>
      </div>
    </div>
  );
}
