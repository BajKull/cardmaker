const CanvasElIndex = (state = null, action) => {
  switch (action.type) {
    case "SELECT_ELEMENT":
      return action.payload;
    default:
      return state;
  }
};

export default CanvasElIndex;
