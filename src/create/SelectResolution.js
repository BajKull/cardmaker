import React, { useState, useRef } from "react";
import { v4 } from "uuid";

import { useDispatch } from "react-redux";
import { setCanvasRes } from "../redux/actions/setCanvasRes";

export default function SelectResolution() {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);

  const dispatch = useDispatch();

  const widthInput = useRef();
  const heightInput = useRef();

  const resolutions = {
    web: [
      {
        name: "Full HD",
        width: 1920,
        height: 1080,
      },
      {
        name: "HD+",
        width: 1600,
        height: 900,
      },
      {
        name: "HD",
        width: 1366,
        height: 768,
      },
      {
        name: "HD",
        width: 1280,
        height: 720,
      },
    ],
    phone: [
      {
        name: "iPhone XR/XS Max/11",
        width: 414,
        height: 896,
      },
      {
        name: "iPhone X/XS/11 Pro",
        width: 375,
        height: 812,
      },
      {
        name: "iPhone 6/7/8 Plus",
        width: 414,
        height: 736,
      },
      {
        name: "iPhone 6/7/8",
        width: 375,
        height: 667,
      },
    ],
    media: [
      {
        name: "Social Media Story",
        width: 1080,
        height: 1920,
      },
      {
        name: "Instagram Post",
        width: 1080,
        height: 1080,
      },
      {
        name: "Facebook Post",
        width: 1200,
        height: 1200,
      },
      {
        name: "Twitter Post",
        width: 1200,
        height: 675,
      },
    ],
  };

  const widthCheckUp = (e) => {
    const re = /^[0-9\b]+$/;
    const val = e.target.value;
    if (val === "" || re.test(val)) {
      setWidth(val);
      if (val > 5000) {
        setWarning("Maximum width is 5000px");
        widthInput.current.classList.add("warningInput");
      } else if (val < 10) {
        setWarning("Minimum width is 10px");
        widthInput.current.classList.add("warningInput");
      } else {
        setWarning(null);
        widthInput.current.classList.remove("warningInput");
      }
      setError(null);
    }
  };
  const heightCheckUp = (e) => {
    const re = /^[0-9\b]+$/;
    const val = e.target.value;
    if (val === "" || re.test(val)) {
      setHeight(val);
      if (val > 5000) {
        setWarning("Maximum height is 5000px");
        heightInput.current.classList.add("warningInput");
      } else if (val < 10) {
        setWarning("Minimum height is 10px");
        heightInput.current.classList.add("warningInput");
      } else {
        setWarning(null);
        heightInput.current.classList.remove("warningInput");
      }
      setError(null);
    }
  };

  const submitRes = () => {
    if (warning) {
      setError(warning);
      setWarning(null);
    } else dispatch(setCanvasRes({ width, height, choice: false }));
  };

  return (
    <div className="canvasResolution">
      <div className="canvasResolutionContainer">
        <div className="customResolution">
          <h1>Custom resolution</h1>
          <input
            type="text"
            value={width}
            onChange={widthCheckUp}
            ref={widthInput}
          />
          <p className="resSplit">x</p>
          <input
            type="text"
            value={height}
            onChange={heightCheckUp}
            ref={heightInput}
          />
          <button onClick={submitRes}>OK</button>
          {error && <p className="error">{error}</p>}
          {warning && <p className="warning">{warning}</p>}
        </div>
        <div className="webResolutions">
          <h1 className="resolutionTitle ">Web resolutions</h1>
          <div className="resolutionCards">
            {resolutions.web.map((res) => (
              <div
                className="resolutionCard"
                key={v4()}
                onClick={() =>
                  dispatch(
                    setCanvasRes({
                      width: res.width,
                      height: res.height,
                      choice: false,
                    })
                  )
                }
              >
                <h2>{res.name}</h2>
                <p>
                  {res.width}x{res.height}
                </p>
                <div
                  className="resolutionBorder"
                  style={{
                    width: `${res.width / 10}px`,
                    height: `${res.height / 10}px`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="phoneResolutions">
          <h1 className="resolutionTitle">Phone resolutions</h1>
          <div className="resolutionCards">
            {resolutions.phone.map((res) => (
              <div
                className="resolutionCard"
                key={v4()}
                onClick={() =>
                  dispatch(
                    setCanvasRes({
                      width: res.width,
                      height: res.height,
                      choice: false,
                    })
                  )
                }
              >
                <h2>{res.name}</h2>
                <p>
                  {res.width}x{res.height}
                </p>
                <div
                  className="resolutionBorder"
                  style={{
                    width: `${res.width / 8}px`,
                    height: `${res.height / 8}px`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="socialResolutions">
          <h1 className="resolutionTitle">Social media resolutions</h1>
          <div className="resolutionCards">
            {resolutions.media.map((res) => (
              <div
                className="resolutionCard"
                key={v4()}
                onClick={() =>
                  dispatch(
                    setCanvasRes({
                      width: res.width,
                      height: res.height,
                      choice: false,
                    })
                  )
                }
              >
                <h2>{res.name}</h2>
                <p>
                  {res.width}x{res.height}
                </p>
                <div
                  className="resolutionBorder"
                  style={{
                    width: `${res.width / 12}px`,
                    height: `${res.height / 12}px`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
