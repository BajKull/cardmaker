import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedEl } from "../../redux/actions/setSelectedEl";
import TextIcon from "../icons/text.svg";
import RectangleIcon from "../icons/rectangle.svg";
import CircleIcon from "../icons/circle.svg";
import ImageIcon from "../icons/image3.svg";
import BinIcon from "../icons/bin.svg";
import EyeIcon from "../icons/eye.svg";

export default function ElementPreview({ element, index }) {
  const dispatch = useDispatch();
  const selectItem = () => {
    dispatch(setSelectedEl(index));
  };
  return (
    <div className="elementPreview" onClick={selectItem}>
      {element.type === "text" && <img src={TextIcon} alt="" />}
      {element.type === "rectangle" && <img src={RectangleIcon} alt="" />}
      {element.type === "circle" && <img src={CircleIcon} alt="" />}
      {element.type === "image" && <img src={ImageIcon} alt="" />}
      <h1>{element.msg}</h1>
      <div className="elementBtns">
        <button>
          <img src={BinIcon} alt="" />
        </button>
        <button>
          <img src={EyeIcon} alt="" />
        </button>
      </div>
    </div>
  );
}
