export const editCanvasEl = (data) => {
  return {
    type: "EDIT_CANVAS_EL",
    payload: {
      index: data.index,
      element: data.el,
    },
  };
};
