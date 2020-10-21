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
import { Helmet } from "react-helmet";

export default function Birthday() {
  const [genLinkScreen, setGenLinkScreen] = useState(false);

  const dispatch = useDispatch();
  const elements = useSelector((state) => state.canvasEls);
  const res = useSelector((state) => state.canvasRes);
  const user = useSelector((state) => state.loginStatus);
  const helmetContent =
    "Bnn Card Maker creator is a tool used for creating free cards online. Use it if you want to create a card share it or download the image to your device.";

  const downloadCanvas = () => {
    const canvas = document.getElementsByClassName("editorCanvas")[0];
    const img = canvas.toDataURL("image/png");
    const download = document.createElement("a");
    download.href = img;
    download.download = "card-creator.png";
    download.click();
  };

  const newCardConfirm = () => {
    if (elements.length !== 0) {
      if (
        window.confirm(
          "Are you sure you want to delete current card and create new one?"
        )
      ) {
        newCard();
      }
    } else newCard();
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
      <Helmet>
        <title>Bnn Card Maker - Editor</title>
        <meta name="description" content={helmetContent} />
      </Helmet>
      <Link to="/" className="logoIcon">
        <LogoIcon className="logo" />
      </Link>
      <div className="editorExport">
        <button onClick={newCardConfirm}>New card</button>
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
