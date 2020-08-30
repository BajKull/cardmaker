import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCanvasEl } from "../redux/actions/AddCanvasEl";
import { editCanvasEl } from "../redux/actions/EditCanvasEl";
import { setSelectedEl } from "../redux/actions/setSelectedEl";
import {
  drawBorder,
  drawImage,
  drawCircle,
  drawRectangle,
  drawText,
  drawLine,
} from "./drawing/drawElements";
import {
  createCanvasText,
  createCanvasRectangle,
  createCanvasCircle,
  createCanvasLine,
} from "./options/elements/createCanvasElement";

export default function Canvas({ activeBtn, setActiveBtn }) {
  const [action, setAction] = useState(false);
  const [moveOrResize, setMoveOrResize] = useState("move");
  const [newElPos, setNewElPos] = useState(null);
  const [newLine, setNewLine] = useState({
    posX: null,
    posY: null,
    offsetX: 0,
    offSetY: 0,
    path: [],
  });
  const [selectedElBorder, setSelectedElBorder] = useState(null);

  const canvas = useRef(null);

  const elements = useSelector((state) => state.canvasEls);
  const elIndex = useSelector((state) => state.canvasElIndex);
  const dispatch = useDispatch();

  const resizeCanvas = () => {
    const canvasContainer = document.querySelector(".editorView");
    canvas.current.width = canvasContainer.offsetWidth;
    canvas.current.height = canvasContainer.offsetHeight;
  };

  const canvasStartAction = (event) => {
    if (activeBtn === "image") return;
    const rect = canvas.current.getBoundingClientRect();
    setAction(true);
    setNewElPos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    if (activeBtn === "select") canvasSelect(event);
  };

  const selElBorder = (posX, posY, width, height, res, rot) => {
    setSelectedElBorder({
      x: posX,
      y: posY,
      w: width,
      h: height,
      resize: res,
      rotation: rot,
    });
  };

  const canvasEndAction = (event) => {
    if (!action) return;
    setAction(false);
    if (selectedElBorder) canvasFunctions(event);
    if (moveOrResize !== "move") setMoveOrResize("move");
    if (activeBtn !== "select") setActiveBtn("select");
    if (newLine.path.length !== 0) {
      canvasLine();
      setNewLine({
        posX: null,
        posY: null,
        offsetX: 0,
        offsetY: 0,
        path: [],
      });
    }
  };

  const canvasAction = (event) => {
    if (!action) return;
    if (activeBtn === "select" || activeBtn === "line") canvasFunctions(event);
    else canvasNewElSetup(event);
  };

  const canvasFunctions = (event) => {
    if (activeBtn === "select") canvasSelectMove(event);
    if (activeBtn === "line") canvasLinePrepare(event);
    if (activeBtn === "text") canvasText(event);
    if (activeBtn === "rectangle") canvasRectangle(event);
    if (activeBtn === "circle") canvasCircle(event);
  };

  const canvasNewElSetup = (event) => {
    if (!newElPos) return;
    const rect = canvas.current.getBoundingClientRect();
    const startx = newElPos.x;
    const starty = newElPos.y;
    const width = event.clientX - rect.left - startx;
    const height = event.clientY - rect.top - starty;
    selElBorder(startx, starty, width, height, false, 0);
  };

  const canvasSelect = (event) => {
    const rect = canvas.current.getBoundingClientRect();
    const el = elements
      .slice()
      .reverse()
      .find((thing) => {
        if (thing.width) {
          if (
            event.clientX - rect.left >= thing.posX &&
            event.clientX - rect.left <= thing.posX + thing.width &&
            event.clientY - rect.top >= thing.posY &&
            event.clientY - rect.top <= thing.posY + thing.height
          )
            return true;
        }
        return false;
      });

    if (el) {
      const index = elements.findIndex((element) => element === el);
      selElBorder(el.posX, el.posY, el.width, el.height, true, el.rotation);
      dispatch(setSelectedEl(index));
    } else {
      dispatch(setSelectedEl(null));
      setSelectedElBorder(null);
    }
  };

  const canvasSelectMove = (event) => {
    if (elIndex === null) return;
    if (moveOrResize === "move") {
      const newEl = { ...elements[elIndex] };

      const rect = canvas.current.getBoundingClientRect();

      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (
        mouseX >= newEl.posX &&
        mouseX <= newEl.posX + 7 &&
        mouseY >= newEl.posY &&
        mouseY <= newEl.posY + 7
      )
        setMoveOrResize("topleft");
      else if (
        mouseX >= newEl.posX + newEl.width - 7 &&
        mouseX <= newEl.posX + newEl.width &&
        mouseY >= newEl.posY &&
        mouseY <= newEl.posY + 7
      )
        setMoveOrResize("topright");
      else if (
        mouseX >= newEl.posX + newEl.width - 7 &&
        mouseX <= newEl.posX + newEl.width &&
        mouseY >= newEl.posY + newEl.height - 7 &&
        mouseY <= newEl.posY + newEl.height
      )
        setMoveOrResize("bottomright");
      else if (
        mouseX >= newEl.posX &&
        mouseX <= newEl.posX + 7 &&
        mouseY >= newEl.posY + newEl.height - 7 &&
        mouseY <= newEl.posY + newEl.height
      )
        setMoveOrResize("bottomleft");
      else {
        newEl.posX += event.clientX - rect.left - newElPos.x;
        newEl.posY += event.clientY - rect.top - newElPos.y;
        setNewElPos({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
        selElBorder(
          newEl.posX,
          newEl.posY,
          newEl.width,
          newEl.height,
          true,
          newEl.rotation
        );
        dispatch(editCanvasEl({ index: elIndex, el: newEl }));
      }
    } else {
      canvasSelectResize(event);
    }
  };

  const canvasSelectResize = (event) => {
    const newEl = { ...elements[elIndex] };

    const rect = canvas.current.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    if (moveOrResize === "topleft") {
      newEl.width += newEl.posX - mouseX;
      newEl.height += newEl.posY - mouseY;
      if (newEl.width > 7) newEl.posX = mouseX;
      if (newEl.height > 7 && newEl.type !== "circle") newEl.posY = mouseY;
    } else if (moveOrResize === "topright") {
      newEl.width = mouseX - newEl.posX;
      newEl.height += newEl.posY - mouseY;
      if (newEl.height > 7 && newEl.type !== "circle") newEl.posY = mouseY;
    } else if (moveOrResize === "bottomright") {
      newEl.width = mouseX - newEl.posX;
      newEl.height = mouseY - newEl.posY;
    } else if (moveOrResize === "bottomleft") {
      newEl.width += newEl.posX - mouseX;
      if (newEl.width > 7) newEl.posX = mouseX;
      newEl.height = mouseY - newEl.posY;
    }
    if (newEl.width < 7) {
      newEl.width = 7;
    }
    if (newEl.height < 7) {
      newEl.height = 7;
    }
    if (newEl.type === "circle") {
      newEl.height = newEl.width;
      newEl.radius = newEl.width / 2;
    }
    selElBorder(
      newEl.posX,
      newEl.posY,
      newEl.width,
      newEl.height,
      true,
      newEl.rotation
    );
    dispatch(editCanvasEl({ index: elIndex, el: newEl }));
  };

  const canvasLinePrepare = (event) => {
    const rect = canvas.current.getBoundingClientRect();

    const newPoint = {
      x: event.clientX - rect.left - newElPos.x,
      y: event.clientY - rect.top - newElPos.y,
    };

    setNewLine({
      posX: newElPos.x,
      posY: newElPos.y,
      offsetX: 0,
      offsetY: 0,
      path: [...newLine.path, newPoint],
    });
  };

  const canvasLine = () => {
    const amount = elements.filter((el) => el.type === "line").length;
    const myEl = createCanvasLine(amount, newLine);

    dispatch(addCanvasEl(myEl));
    dispatch(setSelectedEl(elements.length));
  };

  const canvasText = () => {
    const amount = elements.filter((el) => el.type === "text").length;
    const myEl = createCanvasText(amount, newElPos, selectedElBorder);

    dispatch(addCanvasEl(myEl));
    dispatch(setSelectedEl(elements.length));
  };

  const canvasRectangle = () => {
    const amount = elements.filter((el) => el.type === "rectangle").length;
    const myEl = createCanvasRectangle(amount, newElPos, selectedElBorder);

    console.log(myEl);

    dispatch(addCanvasEl(myEl));
    dispatch(setSelectedEl(elements.length));
  };
  const canvasCircle = () => {
    const amount = elements.filter((el) => el.type === "circle").length;
    const myEl = createCanvasCircle(amount, newElPos, selectedElBorder);

    dispatch(addCanvasEl(myEl));
    dispatch(setSelectedEl(elements.length));
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

    elements.forEach((el) => {
      if (el.visible) {
        if (el.type === "text") drawText(ctx, el);
        if (el.type === "line") drawLine(ctx, el);
        if (el.type === "rectangle") drawRectangle(ctx, el);
        if (el.type === "circle") drawCircle(ctx, el);
        if (el.type === "image") drawImage(ctx, el);
      }
    });

    if (selectedElBorder) drawBorder(ctx, selectedElBorder);
    if (newLine) drawLine(ctx, newLine);
  }, [elements, selectedElBorder, newLine]);

  useEffect(() => {
    if (elIndex !== null)
      setSelectedElBorder({
        x: elements[elIndex].posX,
        y: elements[elIndex].posY,
        w: elements[elIndex].width,
        h: elements[elIndex].height,
        resize: true,
        rotation: elements[elIndex].rotation,
      });
    else setSelectedElBorder(null);
  }, [elIndex, elements]);

  return (
    <canvas
      ref={canvas}
      className="editorCanvas"
      onMouseDown={canvasStartAction}
      onMouseUp={canvasEndAction}
      onMouseMove={canvasAction}
    ></canvas>
  );
}
