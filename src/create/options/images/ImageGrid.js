import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCanvasEl } from "../../../redux/actions/AddCanvasEl";
import { createCanvasImage } from "../elements/createCanvasElement";
import { setSelectedEl } from "../../../redux/actions/setSelectedEl";

export default function ImageGrid({
  images,
  loading,
  userImages,
  imagesSource,
  uid,
}) {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.canvasEls);

  const addImage = (event) => {
    const amount = elements.filter((el) => el.type === "image").length;
    const myEl = createCanvasImage(amount, event);

    dispatch(addCanvasEl(myEl));
    dispatch(setSelectedEl(elements.length));
  };

  if (imagesSource === "global") {
    return (
      <div className="imageGrid">
        {loading && <div className="loadingBig" />}
        {images.map((img) => (
          <div className="imgWrap" key={img.id} onClick={addImage}>
            <img src={img.url} alt={img.name} id={img.id} />
          </div>
        ))}
      </div>
    );
  } else {
    if (!uid)
      return (
        <div className="imageGrid">
          <p className="error">Sign in to see your images</p>
        </div>
      );
    return (
      <div className="imageGrid">
        {loading && <div className="loadingBig" />}
        {userImages.length === 0 && (
          <p className="information">
            You have 0 images in your collection, upload some!
          </p>
        )}
        {userImages.map((img) => (
          <div className="imgWrap" key={img.id} onClick={addImage}>
            <img src={img.url} alt={img.name} id={img.id} />
          </div>
        ))}
      </div>
    );
  }
}
