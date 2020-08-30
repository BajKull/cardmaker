const drawCircle = (ctx, el) => {
  ctx.beginPath();
  ctx.lineWidth = el.lineWidth;
  ctx.setLineDash([0]);
  ctx.strokeStyle = el.color;
  ctx.arc(
    el.posX + el.width / 2,
    el.posY + el.height / 2,
    el.width / 2,
    0,
    2 * Math.PI
  );
  if (el.fill) {
    ctx.fillStyle = el.fillColor;
    ctx.fill();
  }
  ctx.closePath();
  ctx.stroke();
};

export { drawCircle };
