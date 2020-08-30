const drawImage = (ctx, el) => {
  ctx.translate(el.posX + el.width / 2, el.posY + el.height / 2);
  ctx.rotate((el.rotation * Math.PI) / 180);
  ctx.translate(-(el.posX + el.width / 2), -(el.posY + el.height / 2));
  ctx.drawImage(el.image, el.posX, el.posY, el.width, el.height);
  ctx.translate(el.posX + el.width / 2, el.posY + el.height / 2);
  ctx.rotate(-((el.rotation * Math.PI) / 180));
  ctx.translate(-(el.posX + el.width / 2), -(el.posY + el.height / 2));
};

export { drawImage };
