export const deleteCanvasEl = (index) => {
  return {
    type: "DELETE_CANVAS_EL",
    payload: index,
  };
};
