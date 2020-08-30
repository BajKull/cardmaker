const createCanvasCircle = (amount, newElPos, selectedElBorder) => {
  const myEl = {
    id: `Circle ${amount}`,
    type: "circle",
    posX: newElPos.x,
    posY: newElPos.y,
    rotation: 0,
    width: selectedElBorder.w,
    height: selectedElBorder.w,
    radius: selectedElBorder.w / 2,
    lineWidth: 3,
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
  if (myEl.radius < 0) myEl.radius *= -1;

  return myEl;
};

export { createCanvasCircle };
