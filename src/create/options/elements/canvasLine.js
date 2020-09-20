import { v4 } from "uuid";

const createCanvasLine = (amount, line) => {
  let maxLeft = line.posX;
  let maxRight = line.posX;
  let maxTop = line.posY;
  let maxBottom = line.posY;
  let offsetX = 0;
  let offsetY = 0;

  line.path.forEach((point) => {
    if (point.x + line.posX < maxLeft) maxLeft = point.x + line.posX;
    if (point.x + line.posX > maxRight) maxRight = point.x + line.posX;
    if (point.y + line.posY < maxTop) maxTop = point.y + line.posY;
    if (point.y + line.posY > maxBottom) maxBottom = point.y + line.posY;
    if (point.y < offsetY) offsetY = point.y;
    if (point.x < offsetX) offsetX = point.x;
  });

  const width = maxRight - maxLeft;
  const height = maxBottom - maxTop;

  const myEl = {
    id: v4(),
    name: `Line ${amount}`,
    type: "line",
    sWidth: width,
    sHeight: height,
    width: width,
    height: height,
    posX: maxLeft,
    posY: maxTop,
    offsetX,
    offsetY,
    path: line.path,
    lineWidth: 3,
    rotation: 0,
    color: "#000000",
    visible: true,
  };

  if (maxLeft < line.posX) myEl.posX = maxLeft;

  return myEl;
};

export { createCanvasLine };
