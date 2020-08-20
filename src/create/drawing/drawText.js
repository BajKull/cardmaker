const drawText = (ctx, el) => {
  ctx.font = el.size + "px " + el.font;
  ctx.textAlign = el.align;
  ctx.fillStyle = el.color;
  if (el.align === "left")
    ctx.fillText(el.msg, el.posX, el.posY + el.height / 2);
  if (el.align === "center")
    ctx.fillText(el.msg, el.posX + el.width / 2, el.posY + el.height / 2);
  if (el.align === "right")
    ctx.fillText(el.msg, el.posX + el.width, el.posY + el.height / 2);
};

export { drawText };
