const drawRectangle = (ctx, el) => {
  ctx.beginPath();
  ctx.lineWidth = el.lineWidth;
  ctx.setLineDash([0]);
  ctx.strokeStyle = el.color;
  ctx.translate(el.posX + el.width / 2, el.posY + el.height / 2);
  ctx.rotate((el.rotation * Math.PI) / 180);
  ctx.translate(-(el.posX + el.width / 2), -(el.posY + el.height / 2));
  if (el.borderRadius === 0) ctx.rect(el.posX, el.posY, el.width, el.height);
  else {
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
  if (el.fill) {
    ctx.fillStyle = el.fillColor;
    ctx.fill();
  }
  ctx.translate(el.posX + el.width / 2, el.posY + el.height / 2);
  ctx.rotate(-((el.rotation * Math.PI) / 180));
  ctx.translate(-(el.posX + el.width / 2), -(el.posY + el.height / 2));
  ctx.closePath();
  ctx.stroke();
};

export { drawRectangle };
