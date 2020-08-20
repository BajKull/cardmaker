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
  ctx.fillStyle = el.fill;
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
};

export { drawCircle };
