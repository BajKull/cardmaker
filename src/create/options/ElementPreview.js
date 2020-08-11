import React from "react";
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
import EditIcon from "../icons/edit.svg";

export default function ElementPreview({ element, index }) {
  const dispatch = useDispatch();
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
    const newEl = element;
    newEl.visible = !newEl.visible;
    dispatch(editCanvasEl({ index, el: newEl }));
  };
  const editItem = (e) => {
    e.stopPropagation();
    const newEl = element;
    newEl.visible = !newEl.visible;
    dispatch(editCanvasEl({ index, el: newEl }));
  };
  return (
    <div className="elementPreview" onClick={selectItem}>
      {element.type === "text" && <img src={TextIcon} alt="" />}
      {element.type === "rectangle" && <img src={RectangleIcon} alt="" />}
      {element.type === "circle" && <img src={CircleIcon} alt="" />}
      {element.type === "image" && <img src={ImageIcon} alt="" />}
      {element.type === "text" && <h1>{element.msg}</h1>}
      {element.type !== "text" && <h1>{element.id}</h1>}

      <div className="elementBtns">
        {element.type !== "text" && (
          <button onClick={(event) => editItem(event)}>
            <img src={EditIcon} alt="" />
          </button>
        )}
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
