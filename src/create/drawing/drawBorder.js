const drawBorder = (ctx, selectedElBorder) => {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.setLineDash([6]);
  ctx.strokeStyle = "gray";
  ctx.rect(
    selectedElBorder.x + 0.5,
    selectedElBorder.y + 0.5,
    selectedElBorder.w,
    selectedElBorder.h
  );
  ctx.closePath();
  ctx.stroke();
  ctx.setLineDash([0]);
  ctx.strokeStyle = "black";
  if (selectedElBorder.resize) {
    ctx.beginPath();
    ctx.rect(selectedElBorder.x + 0.5, selectedElBorder.y + 0.5, 7, 7);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(
      selectedElBorder.x + selectedElBorder.w - 7 + 0.5,
      selectedElBorder.y + 0.5,
      7,
      7
    );
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(
      selectedElBorder.x + selectedElBorder.w - 7 + 0.5,
      selectedElBorder.y + selectedElBorder.h - 7 + 0.5,
      7,
      7
    );
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(
      selectedElBorder.x + 0.5,
      selectedElBorder.y + selectedElBorder.h - 7 + 0.5,
      7,
      7
    );
    ctx.closePath();
    ctx.stroke();
  }
};

export { drawBorder };
