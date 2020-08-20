import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCanvasEl } from "../../../redux/actions/AddCanvasEl";

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
    const img = new Image();
    img.src = event.target.src;
    let divider = 1;
    if (img.height > 512 || img.width > 512)
      img.height > img.width
        ? (divider = img.height / 512)
        : (divider = img.width / 512);

    const myEl = {
      id: `Image ${amount}`,
      type: "image",
      src: event.target.src,
      image: img,
      posX: 150,
      posY: 150,
      width: parseInt(img.width / divider),
      height: parseInt(img.height / divider),
      visible: true,
    };
    dispatch(addCanvasEl(myEl));
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
