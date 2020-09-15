import React, { useState } from "react";
import Editor from "./Editor";
import GenLinkScreen from "./GenLinkScreen";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { clearCanvasEl } from "../redux/actions/ClearCanvasEl";
import { setSelectedEl } from "../redux/actions/setSelectedEl";
import { setCanvasRes } from "../redux/actions/setCanvasRes";

export default function Birthday() {
  const [genLinkScreen, setGenLinkScreen] = useState(false);

  const dispatch = useDispatch();
  const res = useSelector((state) => state.canvasRes);
  const downloadCanvas = () => {
    const canvas = document.getElementsByClassName("editorCanvas")[0];
    const img = canvas.toDataURL("image/png");
    const download = document.createElement("a");
    download.href = img;
    download.download = "card-creator.png";
    download.click();
  };

  const newCard = () => {
    dispatch(setSelectedEl(null));
    dispatch(
      setCanvasRes({ width: res.width, height: res.height, choice: true })
    );
    dispatch(clearCanvasEl());
  };

  const generateLink = () => {
    setGenLinkScreen(true);
  };

  return (
    <div className="birthday">
      <Editor />
      <div className="editorExport">
        <button onClick={newCard}>New card</button>
        <button onClick={generateLink}>Generate link</button>
        <button onClick={downloadCanvas}>Download</button>
      </div>

      <CSSTransition
        in={genLinkScreen}
        timeout={500}
        classNames="canRes"
        unmountOnExit
      >
        <GenLinkScreen setGenLinkScreen={setGenLinkScreen} />
      </CSSTransition>
    </div>
  );
}
