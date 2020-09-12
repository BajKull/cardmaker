const createCanvasImage = (amount, event) => {
  const img = new Image();
  // img.crossOrigin = "anonymous";
  img.src = event.target.src;
  let divider = 1;
  if (img.height > 512 || img.width > 512)
    img.height > img.width
      ? (divider = img.height / 512)
      : (divider = img.width / 512);

  const myEl = {
    id: `Image ${amount}`,
    type: "image",
    src: event.target.src,
    image: img,
    posX: 150,
    posY: 150,
    rotation: 0,
    width: parseInt(img.width / divider),
    height: parseInt(img.height / divider),
    visible: true,
  };

  return myEl;
};

export { createCanvasImage };
