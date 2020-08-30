const drawLine = (ctx, el) => {
  console.log(el.offsetY);
  ctx.beginPath();
  ctx.moveTo(el.posX - el.offsetX, el.posY - el.offsetY);
  ctx.lineWidth = el.lineWidth;
  ctx.setLineDash([0]);
  ctx.strokeStyle = el.color;
  el.path.forEach((point) => {
    ctx.lineTo(point.x + el.posX - el.offsetX, point.y + el.posY - el.offsetY);
  });
  ctx.stroke();
};

export { drawLine };
