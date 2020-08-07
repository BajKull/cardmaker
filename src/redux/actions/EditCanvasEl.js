export const editCanvasEl = (data) => {
  console.log(data);
  return {
    type: "EDIT_CANVAS_EL",
    payload: {
      index: data.index,
      element: data.el,
    },
  };
};
