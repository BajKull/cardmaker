const drawLine = (ctx, el) => {
  const scaleX = el.width / el.sWidth || 1;
  const scaleY = el.height / el.sHeight || 1;

  ctx.beginPath();
  ctx.moveTo(el.posX - el.offsetX * scaleX, el.posY - el.offsetY * scaleY);
  ctx.lineWidth = el.lineWidth;
  ctx.setLineDash([0]);
  ctx.strokeStyle = el.color;
  el.path.forEach((point) => {
    ctx.lineTo(
      point.x * scaleX + el.posX - el.offsetX * scaleX,
      point.y * scaleY + el.posY - el.offsetY * scaleY
    );
  });
  ctx.stroke();
};

export { drawLine };
