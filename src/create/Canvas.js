import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCanvasEl } from "../redux/actions/AddCanvasEl";
import { editCanvasEl } from "../redux/actions/EditCanvasEl";
import { setSelectedEl } from "../redux/actions/setSelectedEl";
import { drawBorder } from "./drawing/drawBorder";
import { drawImage } from "./drawing/drawImage";
import { drawCircle } from "./drawing/drawCircle";
import { drawRectangle } from "./drawing/drawRectangle";
import { drawText } from "./drawing/drawText";

export default function Canvas({ activeBtn }) {
  const [action, setAction] = useState(false);
  const [moveOrResize, setMoveOrResize] = useState("move");
  const [newElPos, setNewElPos] = useState(null);
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
    const rect = canvas.current.getBoundingClientRect();
    setAction(true);
    setNewElPos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    if (activeBtn === "select") canvasSelect(event);
  };

  const selElBorder = (posX, posY, width, height, res) => {
    setSelectedElBorder({
      x: posX,
      y: posY,
      w: width,
      h: height,
      resize: res,
    });
  };

  const canvasEndAction = (event) => {
    if (!action) return;
    setAction(false);
    if (activeBtn !== "select") setSelectedElBorder(null);
    if (selectedElBorder) canvasFunctions(event);
    if (moveOrResize !== "move") setMoveOrResize("move");
  };

  const canvasAction = (event) => {
    if (!action) return;
    if (activeBtn === "select" || activeBtn === "move") canvasFunctions(event);
    else canvasNewElSetup(event);
  };

  const canvasFunctions = (event) => {
    if (activeBtn === "select") canvasSelectMove(event);
    if (activeBtn === "move") canvasMove();
    if (activeBtn === "text") canvasText(event);
    if (activeBtn === "rectangle") canvasRectangle(event);
    if (activeBtn === "circle") canvasCircle(event);
    if (activeBtn === "image") canvasImage();
  };

  const canvasNewElSetup = (event) => {
    if (!newElPos) return;
    const rect = canvas.current.getBoundingClientRect();
    const startx = newElPos.x;
    const starty = newElPos.y;
    const width = event.clientX - rect.left - startx;
    const height = event.clientY - rect.top - starty;
    selElBorder(startx, starty, width, height, false);
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
      selElBorder(el.posX, el.posY, el.width, el.height, true);
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
        selElBorder(newEl.posX, newEl.posY, newEl.width, newEl.height, true);
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
      if (newEl.height > 7) newEl.posY = mouseY;
    } else if (moveOrResize === "topright") {
      newEl.width = mouseX - newEl.posX;
      newEl.height += newEl.posY - mouseY;
      if (newEl.height > 7) newEl.posY = mouseY;
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
    selElBorder(newEl.posX, newEl.posY, newEl.width, newEl.height, true);
    dispatch(editCanvasEl({ index: elIndex, el: newEl }));
  };

  const canvasMove = () => {
    if (!elIndex) return;
  };
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
      color: "#000000",
      visible: true,
    };

    if (myEl.width < 0) {
      const width = (myEl.width *= -1);
      myEl.width = width;
      myEl.posX -= width;
    }
    if (myEl.height < 0) {
      const height = (myEl.height *= -1);
      myEl.height = height;
      myEl.posY -= height;
    }

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
      borderRadius: 0,
      color: "#000000",
      fill: "#ffffff",
      visible: true,
    };

    if (myEl.width < 0) {
      const width = (myEl.width *= -1);
      myEl.width = width;
      myEl.posX -= width;
    }
    if (myEl.height < 0) {
      const height = (myEl.height *= -1);
      myEl.height = height;
      myEl.posY -= height;
    }

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
      height: selectedElBorder.w,
      radius: selectedElBorder.w / 2,
      lineWidth: 3,
      color: "#000000",
      fill: "#ffffff",
      visible: true,
    };

    if (myEl.width < 0) {
      const width = (myEl.width *= -1);
      myEl.width = width;
      myEl.posX -= width;
    }
    if (myEl.height < 0) {
      const height = (myEl.height *= -1);
      myEl.height = height;
      myEl.posY -= height;
    }
    if (myEl.radius < 0) myEl.radius *= -1;

    dispatch(addCanvasEl(myEl));
  };
  const canvasImage = () => {};

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
        if (el.type === "rectangle") drawRectangle(ctx, el);
        if (el.type === "circle") drawCircle(ctx, el);
        if (el.type === "image") drawImage(ctx, el);
      }
    });

    if (selectedElBorder) drawBorder(ctx, selectedElBorder);
  }, [elements, selectedElBorder]);

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
