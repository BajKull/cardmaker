import React, { useState } from "react";
import Editor from "./Editor";
import GenLinkScreen from "./GenLinkScreen";
import { ReactComponent as LogoIcon } from "../navbar/logo.svg";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { clearCanvasEl } from "../redux/actions/ClearCanvasEl";
import { setSelectedEl } from "../redux/actions/setSelectedEl";
import { setCanvasRes } from "../redux/actions/setCanvasRes";
import { ChangeLoginScreen } from "../redux/actions/ChangeLoginScreen";

export default function Birthday() {
  const [genLinkScreen, setGenLinkScreen] = useState(false);

  const dispatch = useDispatch();
  const res = useSelector((state) => state.canvasRes);
  const user = useSelector((state) => state.loginStatus);

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
    <div className="creator">
      <Link to="/" className="logoIcon">
        <LogoIcon className="logo" />
      </Link>
      <div className="editorExport">
        <button onClick={newCard}>New card</button>
        <button onClick={generateLink}>Generate link</button>
        <button onClick={downloadCanvas}>Download</button>
      </div>
      {!user && (
        <ul className="creatorLogin">
          <li onClick={() => dispatch(ChangeLoginScreen("signin"))}>Sign in</li>
          <li onClick={() => dispatch(ChangeLoginScreen("signup"))}>Sign up</li>
        </ul>
      )}
      {user && (
        <ul className="creatorLogin">
          <li>{user.displayName}</li>
        </ul>
      )}
      <Editor />

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
