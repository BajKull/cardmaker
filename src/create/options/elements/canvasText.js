import { v4 } from "uuid";

const createCanvasText = (amount, newElPos, selectedElBorder) => {
  const myEl = {
    id: v4(),
    name: `Text ${amount}`,
    type: "text",
    msg: "Text",
    font: "Quicksand",
    size: 30,
    weight: 400,
    align: "center",
    posX: newElPos.x,
    posY: newElPos.y,
    rotation: 0,
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

  return myEl;
};

export { createCanvasText };
