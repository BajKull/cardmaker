import { v4 } from "uuid";

const createCanvasRectangle = (amount, newElPos, selectedElBorder) => {
  const myEl = {
    id: v4(),
    name: `Rectangle ${amount}`,
    type: "rectangle",
    posX: newElPos.x,
    posY: newElPos.y,
    rotation: 0,
    width: selectedElBorder.w,
    height: selectedElBorder.h,
    lineWidth: 3,
    borderRadius: 0,
    color: "#000000",
    fill: true,
    fillColor: "#ffffff",
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

export { createCanvasRectangle };
