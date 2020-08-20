const drawImage = (ctx, el) => {
  ctx.drawImage(el.image, el.posX, el.posY, el.width, el.height);
};

export { drawImage };
