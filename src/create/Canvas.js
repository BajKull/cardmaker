import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCanvasEl } from "../redux/actions/AddCanvasEl";
import { setSelectedEl } from "../redux/actions/setSelectedEl";

export default function Canvas({ activeBtn }) {
  const [action, setAction] = useState(false);
  const [newElPos, setNewElPos] = useState(null);
  const [selectedElBorder, setSelectedElBorder] = useState(null);

  const elements = useSelector((state) => state.canvasEls);
  const dispatch = useDispatch();

  const resizeCanvas = () => {
    const canvas = document.querySelector(".editorCanvas");
    const canvasContainer = document.querySelector(".editorView");
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = canvasContainer.offsetHeight;
  };

  const canvasStartAction = (event) => {
    const canvas = document.querySelector(".editorCanvas");
    const rect = canvas.getBoundingClientRect();
    setAction(true);
    setNewElPos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    if (activeBtn === "select") canvasFunctions(event);
  };

  const canvasEndAction = (event) => {
    setAction(false);
    setSelectedElBorder(null);
    if (selectedElBorder) canvasFunctions(event);
  };

  const canvasAction = (event) => {
    if (!action) return;

    if (activeBtn === "select" || activeBtn === "move") canvasFunctions(event);
    else canvasNewElSetup(event);
  };

  const canvasFunctions = (event) => {
    if (activeBtn === "select") canvasSelect(event);
    if (activeBtn === "move") canvasMove();
    if (activeBtn === "text") canvasText(event);
    if (activeBtn === "rectangle") canvasRectangle(event);
    if (activeBtn === "circle") canvasCircle(event);
    if (activeBtn === "image") canvasImage();
  };

  const canvasNewElSetup = (event) => {
    if (!newElPos) return;
    const canvas = document.querySelector(".editorCanvas");
    const rect = canvas.getBoundingClientRect();

    const startx = newElPos.x;
    const starty = newElPos.y;

    setSelectedElBorder({
      x: startx,
      y: starty,
      w: event.clientX - rect.left - startx,
      h: event.clientY - rect.top - starty,
    });
  };

  const canvasSelect = (event) => {
    const canvas = document.querySelector(".editorCanvas");
    const rect = canvas.getBoundingClientRect();
    const el = elements.find((thing) => {
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
      dispatch(setSelectedEl(index));
    } else {
      dispatch(setSelectedEl(null));
    }
  };
  const canvasMove = () => {};
  const canvasText = () => {
    const amount = elements.filter((el) => el.type === "text").length;

    const myEl = {
      id: `Text ${amount}`,
      type: "text",
      msg: "Text",
      font: "Quicksand",
      size: 30,
      align: "center",
      posX: newElPos.x,
      posY: newElPos.y,
      width: selectedElBorder.w,
      height: selectedElBorder.h,
      color: "black",
    };

    dispatch(addCanvasEl(myEl));
  };

  const canvasRectangle = () => {
    const amount = elements.filter((el) => el.type === "rectangle").length;

    const myEl = {
      id: `Rectangle ${amount}`,
      type: "rectangle",
      posX: newElPos.x,
      posY: newElPos.y,
      width: selectedElBorder.w,
      height: selectedElBorder.h,
      lineWidth: 3,
      color: "black",
      fill: false,
    };

    dispatch(addCanvasEl(myEl));
  };
  const canvasCircle = () => {
    const amount = elements.filter((el) => el.type === "circle").length;

    const myEl = {
      id: `Circle ${amount}`,
      type: "circle",
      posX: newElPos.x,
      posY: newElPos.y,
      width: selectedElBorder.w,
      height: selectedElBorder.h,
      lineWidth: 3,
      color: "black",
      fill: false,
    };

    dispatch(addCanvasEl(myEl));
  };
  const canvasImage = () => {};

  const reDraw = () => {
    const canvas = document.querySelector(".editorCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const drawText = (el) => {
      ctx.font = el.size + "px " + el.font;
      ctx.textAlign = el.align;
      ctx.fillText(el.msg, el.posX + el.width / 2, el.posY + el.height / 2);
    };
    const drawRectangle = (el) => {
      ctx.beginPath();
      ctx.lineWidth = el.lineWidth;
      ctx.setLineDash([0]);
      ctx.strokeStyle = el.color;
      ctx.rect(el.posX, el.posY, el.width, el.height);
      ctx.closePath();
      ctx.stroke();
    };
    const drawCircle = (el) => {
      ctx.beginPath();
      ctx.lineWidth = el.lineWidth;
      ctx.setLineDash([0]);
      ctx.arc(
        el.posX + el.width / 2,
        el.posY + el.height / 2,
        el.width / 2,
        0,
        2 * Math.PI
      );
      ctx.closePath();
      ctx.stroke();
    };

    const drawBorder = () => {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.setLineDash([6]);
      ctx.strokeStyle = "gray";
      ctx.rect(
        selectedElBorder.x,
        selectedElBorder.y,
        selectedElBorder.w,
        selectedElBorder.h
      );
      ctx.closePath();
      ctx.stroke();
    };

    elements.forEach((el) => {
      if (el.type === "text") drawText(el);
      if (el.type === "rectangle") drawRectangle(el);
      if (el.type === "circle") drawCircle(el);
    });

    if (selectedElBorder) drawBorder();
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    reDraw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elements, selectedElBorder]);
  return (
    <canvas
      className="editorCanvas"
      onMouseDown={canvasStartAction}
      onMouseUp={canvasEndAction}
      onMouseMove={canvasAction}
    ></canvas>
  );
}
