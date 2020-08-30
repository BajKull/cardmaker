const drawText = (ctx, el) => {
  ctx.font = `${el.weight} ${el.size}px ${el.font}`;
  ctx.textAlign = el.align;
  ctx.fillStyle = el.color;

  const lineHeight = el.size;

  ctx.translate(el.posX + el.width / 2, el.posY + el.height / 2);
  ctx.rotate((el.rotation * Math.PI) / 180);
  ctx.translate(-(el.posX + el.width / 2), -(el.posY + el.height / 2));

  const elWidth = () => {
    if (el.align === "left") return el.posX;
    if (el.align === "center") return el.posX + el.width / 2;
    if (el.align === "right") return el.posX + el.width;
  };

  if (ctx.measureText(el.msg).width > el.width) {
    const text = el.msg.split(" ").map((el) => el + " ");
    const lines = [];
    let line = "";
    text.forEach((word, i) => {
      if (ctx.measureText(line + word).width > el.width && i !== 0) {
        lines.push(line);
        line = "";
      }
      line += word;
    });
    lines.push(line);
    lines.forEach((line, i) => {
      ctx.fillText(
        line,
        elWidth(),
        el.posY + (el.size / 4) * 3 + i * lineHeight
      );
    });
  } else {
    ctx.fillText(el.msg, elWidth(), el.posY + (el.size / 4) * 3);
  }

  ctx.translate(el.posX + el.width / 2, el.posY + el.height / 2);
  ctx.rotate(-((el.rotation * Math.PI) / 180));
  ctx.translate(-(el.posX + el.width / 2), -(el.posY + el.height / 2));
};

export { drawText };
