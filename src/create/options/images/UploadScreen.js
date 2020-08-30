import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCanvasEl } from "../../../redux/actions/AddCanvasEl";
import { ReactComponent as CloseIcon } from "../../../create/icons/close.svg";

export default function UploadScreen({
  uploadUrl,
  setUploadUrl,
  setUploadScreen,
}) {
  const [error, setError] = useState(null);
  const focusWindow = useRef(null);

  const dispatch = useDispatch();
  const elements = useSelector((state) => state.canvasEls);

  const checkLink = () => {
    if (
      uploadUrl.endsWith(".jpg") ||
      uploadUrl.endsWith(".jpeg") ||
      uploadUrl.endsWith(".png")
    ) {
      try {
        new URL(uploadUrl);
        const amount = elements.filter((el) => el.type === "image").length;
        const img = new Image();
        img.onload = () => {
          let divider = 1;
          if (img.height > 512 || img.width > 512)
            img.height > img.width
              ? (divider = img.height / 512)
              : (divider = img.width / 512);

          const myEl = {
            id: `Image ${amount}`,
            type: "image",
            src: uploadUrl,
            image: img,
            posX: 150,
            posY: 150,
            rotation: 0,
            width: parseInt(img.width / divider),
            height: parseInt(img.height / divider),
            visible: true,
          };
          dispatch(addCanvasEl(myEl));
          setUploadScreen(false);
        };
        img.src = uploadUrl;
        img.onerror = () => setError("Invalid URL");
      } catch (er) {
        setError("Invalid URL");
      }
    } else {
      setError("Link must end with .jpg OR .jpeg OR .png");
    }
  };

  const closeScreen = (event) => {
    if (event.target.classList.contains("closeClass")) setUploadScreen(false);
  };

  const closeWindowKey = (e) => {
    if (e.keyCode === 27) setUploadScreen(false);
  };

  useEffect(() => {
    focusWindow.current.focus();
  }, []);

  return (
    <div
      className="uploadScreen closeClass"
      onMouseDown={closeScreen}
      onKeyDown={closeWindowKey}
      ref={focusWindow}
      tabIndex="0"
    >
      <div className="uploadForm closeClass">
        <button className="closeBtn" onClick={closeScreen}>
          <CloseIcon className="closeIcon" />
        </button>
        <h1>Provide URL</h1>
        <input
          type="text"
          placeholder="URL"
          value={uploadUrl}
          onChange={(e) => setUploadUrl(e.target.value)}
        />
        <button onClick={checkLink}>Submit</button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
