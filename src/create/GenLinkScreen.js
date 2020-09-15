import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import useGenerateLink from "../hooks/useGenerateLink";
import { ReactComponent as CloseIcon } from "./icons/close.svg";
import { Link } from "react-router-dom";

export default function GenLinkScreen({ setGenLinkScreen }) {
  const [loading, setLoading] = useState(true);
  const focusWindow = useRef(null);
  const aLink = useRef(null);

  const elements = useSelector((state) => state.canvasEls);
  const user = useSelector((state) => state.loginStatus);
  const resolution = useSelector((state) => state.canvasRes);
  const { error, url } = useGenerateLink(
    elements,
    user.uid,
    user.displayName,
    resolution
  );

  useEffect(() => {
    if (url) {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (error) setLoading(false);
  }, [error]);

  const closeScreen = (e) => {
    const classes = e.target.classList;
    if (classes.contains("closeClass")) setGenLinkScreen(false);
  };

  const closeWindowKey = (e) => {
    if (e.keyCode === 27) setGenLinkScreen(false);
  };

  const copyLink = () => {
    aLink.current.select();
    document.execCommand("copy");
  };

  useEffect(() => {
    focusWindow.current.focus();
  }, []);

  return (
    <div
      className="genLink closeClass"
      onClick={closeScreen}
      onKeyDown={closeWindowKey}
      ref={focusWindow}
      tabIndex="0"
    >
      <div className="genLinkContainer">
        {loading && <div className="loadingBig"></div>}
        {error && <p className="error">{error}</p>}
        <CloseIcon className="closeIcon closeClass" />
        {url && (
          <div className="genLinkURL">
            <h1>Link ready!</h1>
            <input
              className="url"
              ref={aLink}
              value={`https://bnncardmaker.netlify.app/cards/${url}`}
              readOnly
            />
            <div>
              <button onClick={copyLink}>Copy</button>
              <Link to={`/card/${url}`}>
                <button>Go</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
