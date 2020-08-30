const drawBorder = (ctx, el) => {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.setLineDash([6]);
  ctx.strokeStyle = "gray";

  ctx.translate(el.x + el.w / 2, el.y + el.h / 2);
  ctx.rotate((el.rotation * Math.PI) / 180);
  ctx.translate(-(el.x + el.w / 2), -(el.y + el.h / 2));

  ctx.rect(el.x + 0.5, el.y + 0.5, el.w, el.h);
  ctx.closePath();
  ctx.stroke();
  ctx.setLineDash([0]);
  ctx.strokeStyle = "black";
  if (el.resize) {
    ctx.beginPath();
    ctx.rect(el.x + 0.5, el.y + 0.5, 7, 7);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(el.x + el.w - 7 + 0.5, el.y + 0.5, 7, 7);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(el.x + el.w - 7 + 0.5, el.y + el.h - 7 + 0.5, 7, 7);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(el.x + 0.5, el.y + el.h - 7 + 0.5, 7, 7);

    ctx.translate(el.x + el.w / 2, el.y + el.h / 2);
    ctx.rotate(-((el.rotation * Math.PI) / 180));
    ctx.translate(-(el.x + el.w / 2), -(el.y + el.h / 2));

    ctx.closePath();
    ctx.stroke();
  }
};

export { drawBorder };
