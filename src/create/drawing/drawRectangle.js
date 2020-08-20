const drawRectangle = (ctx, el) => {
  ctx.beginPath();
  ctx.lineWidth = el.lineWidth;
  ctx.setLineDash([0]);
  ctx.strokeStyle = el.color;
  if (el.borderRadius === 0) ctx.rect(el.posX, el.posY, el.width, el.height);
  else {
    ctx.moveTo(el.posX + el.borderRadius, el.posY);
    ctx.lineTo(el.posX + el.width - el.borderRadius, el.posY);
    ctx.quadraticCurveTo(
      el.posX + el.width,
      el.posY,
      el.posX + el.width,
      el.posY + el.borderRadius
    );
    ctx.lineTo(el.posX + el.width, el.posY + el.height - el.borderRadius);
    ctx.quadraticCurveTo(
      el.posX + el.width,
      el.posY + el.height,
      el.posX + el.width - el.borderRadius,
      el.posY + el.height
    );
    ctx.lineTo(el.posX + el.borderRadius, el.posY + el.height);
    ctx.quadraticCurveTo(
      el.posX,
      el.posY + el.height,
      el.posX,
      el.posY + el.height - el.borderRadius
    );
    ctx.lineTo(el.posX, el.posY + el.borderRadius);
    ctx.quadraticCurveTo(el.posX, el.posY, el.posX + el.borderRadius, el.posY);
  }
  ctx.fillStyle = el.fill;
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
};

export { drawRectangle };
