import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSelectedEl } from "../../redux/actions/setSelectedEl";
import { deleteCanvasEl } from "../../redux/actions/DeleteCanvasEl";
import { editCanvasEl } from "../../redux/actions/EditCanvasEl";
import TextIcon from "../icons/text.svg";
import RectangleIcon from "../icons/rectangle.svg";
import CircleIcon from "../icons/circle.svg";
import ImageIcon from "../icons/image3.svg";
import BinIcon from "../icons/bin.svg";
import EyeIcon from "../icons/eye.svg";
import LineIcon from "../icons/pencil.svg";
import EditIcon from "../icons/edit.svg";

export default function ElementPreview({ element, index }) {
  const [elId, setElId] = useState(element.id);
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
    textToEdit.current.focus();
    textToEdit.current.select();
    console.log(textToEdit.current);
  };

  const checkForEnter = (e) => {
    if (e.keyCode === 13) {
      updateId();
      textToEdit.current.click();
    }
  };

  const updateId = () => {
    const newEl = { ...element };
    newEl.id = elId;
    dispatch(editCanvasEl({ index, el: newEl }));
  };

  return (
    <div className="elementPreview" onClick={selectItem}>
      {element.type === "text" && <img src={TextIcon} alt="" />}
      {element.type === "line" && <img src={LineIcon} alt="" />}
      {element.type === "rectangle" && <img src={RectangleIcon} alt="" />}
      {element.type === "circle" && <img src={CircleIcon} alt="" />}
      {element.type === "image" && <img src={ImageIcon} alt="" />}
      {element.type === "text" && <h1>{element.msg}</h1>}
      {element.type !== "text" && (
        <input
          value={elId}
          ref={textToEdit}
          onChange={(e) => setElId(e.target.value)}
          onKeyDown={checkForEnter}
          onBlur={updateId}
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
