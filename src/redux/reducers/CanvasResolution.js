const CanvasResolution = (
  state = {
    width: 1920,
    height: 1080,
    choice: true,
  },
  action
) => {
  switch (action.type) {
    case "SET_CANVAS_RESOLUTION":
      return action.payload;
    default:
      return state;
  }
};

export default CanvasResolution;
