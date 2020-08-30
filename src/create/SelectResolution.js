import React, { useState } from "react";

export default function SelectResolution() {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);

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
  return (
    <div className="canvasResolution">
      <div className="canvasResolutionContainer">
        <div className="customResolution">
          <h1>Custom resolution</h1>
          <input
            type="text"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <p>x</p>
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <button>OK</button>
        </div>
        <div className="webResolutions">
          <h1 className="resolutionTitle ">Web resolutions</h1>
          <div className="resolutionCards">
            {resolutions.web.map((res) => (
              <div className="resolutionCard">
                <h2>{res.name}</h2>
                <p>
                  {res.width}x{res.height}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="phoneResolutions">
          <h1 className="resolutionTitle">Phone resolutions</h1>
          <div className="resolutionCards">
            {resolutions.phone.map((res) => (
              <div className="resolutionCard">
                <h2>{res.name}</h2>
                <p>
                  {res.width}x{res.height}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="socialResolutions">
          <h1 className="resolutionTitle">Social media resolutions</h1>
          <div className="resolutionCards">
            {resolutions.media.map((res) => (
              <div className="resolutionCard">
                <h2>{res.name}</h2>
                <p>
                  {res.width}x{res.height}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
