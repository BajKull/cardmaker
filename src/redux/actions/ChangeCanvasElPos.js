export const changeCanvasElPos = (start, end) => {
  return {
    type: "POSITION_CANVAS_EL",
    payload: {
      start,
      end,
    },
  };
};
