import React, { useState } from "react";
import Canvas from "./Canvas";
import Options from "./options/Options";
import SelectResolution from "./SelectResolution";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as CursorIcon } from "./icons/cursor.svg";
import { ReactComponent as PencilIcon } from "./icons/pencil.svg";
import { ReactComponent as TextIcon } from "./icons/text.svg";
import { ReactComponent as RectangleIcon } from "./icons/rectangle.svg";
import { ReactComponent as CircleIcon } from "./icons/circle.svg";
import { ReactComponent as ImageIcon } from "./icons/image3.svg";
import { useSelector } from "react-redux";

export default function Editor() {
  const [activeBtn, setActiveBtn] = useState("select");

  const res = useSelector((state) => state.canvasRes);

  const getStyle = (btn) => {
    return activeBtn === btn ? { fill: "rgb(84, 193, 222)" } : {};
  };

  return (
    <div className="editor">
      <CSSTransition
        in={res.choice}
        timeout={500}
        classNames="canRes"
        unmountOnExit
      >
        <SelectResolution />
      </CSSTransition>
      <div className="editorMenu">
        <button onClick={() => setActiveBtn("select")}>
          <CursorIcon style={getStyle("select")} />
        </button>
        <button onClick={() => setActiveBtn("line")}>
          <PencilIcon style={getStyle("line")} />
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
        <Canvas activeBtn={activeBtn} setActiveBtn={setActiveBtn} />
      </div>
      <div className="editorOptions">
        <Options activeBtn={activeBtn} />
      </div>
    </div>
  );
}
