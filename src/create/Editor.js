import React, { useState } from "react";
import Canvas from "./Canvas";
import Options from "./options/Options";
import { ReactComponent as CursorIcon } from "./icons/cursor.svg";
import { ReactComponent as MoveIcon } from "./icons/move.svg";
import { ReactComponent as TextIcon } from "./icons/text.svg";
import { ReactComponent as RectangleIcon } from "./icons/rectangle.svg";
import { ReactComponent as CircleIcon } from "./icons/circle.svg";
import { ReactComponent as ImageIcon } from "./icons/image3.svg";

export default function Editor() {
  const [activeBtn, setActiveBtn] = useState("select");

  const getStyle = (btn) => {
    return activeBtn === btn ? { fill: "rgb(84, 193, 222)" } : {};
  };

  return (
    <div className="editor">
      <div className="editorMenu">
        <button onClick={() => setActiveBtn("select")}>
          <CursorIcon style={getStyle("select")} />
        </button>
        <button onClick={() => setActiveBtn("move")}>
          <MoveIcon style={getStyle("move")} />
        </button>
        <button onClick={() => setActiveBtn("text")}>
          <TextIcon style={getStyle("text")} />
        </button>
        <button onClick={() => setActiveBtn("rectangle")}>
          <RectangleIcon style={getStyle("rectangle")} />
        </button>
        <button onClick={() => setActiveBtn("circle")}>
          <CircleIcon style={getStyle("circle")} />
        </button>
        <button onClick={() => setActiveBtn("image")}>
          <ImageIcon style={getStyle("image")} />
        </button>
      </div>
      <div className="editorImages"></div>
      <div className="editorView">
        <Canvas activeBtn={activeBtn} />
      </div>
      <div className="editorOptions">
        <Options activeBtn={activeBtn} />
      </div>
    </div>
  );
}
