import React from "react";
import Navbar from "../navbar/Navbar";

export default function NotFound() {
  return (
    <div className="notFound">
      <div className="topBar"></div>
      <Navbar />
      <div className="content">
        <div className="leftBar">
          <div className="btns">
            <div className="btn"></div>
            <div className="btn"></div>
            <div className="btn"></div>
            <div className="btn"></div>
            <div className="btn"></div>
            <div className="btn"></div>
          </div>
        </div>
        <div className="midSection">
          <div className="canvas">
            <h1>404 error</h1>
            <h2>Page not found</h2>
            <div className="face">
              <div className="leftEye"></div>
              <div className="rightEye"></div>
              <div className="mouth"></div>
            </div>
          </div>
        </div>
        <div className="rightBar">
          <div className="id"></div>
          <div className="option1"></div>
          <div className="option2"></div>
          <div className="option3"></div>
          <div className="option4"></div>
          <div className="option5"></div>
        </div>
      </div>
    </div>
  );
}
