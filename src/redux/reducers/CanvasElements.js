const CanvasElementsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_CANVAS_EL":
      return [...state, action.payload];
    case "EDIT_CANVAS_EL":
      return state.map((item, i) => {
        if (i !== action.payload.index) return item;
        return {
          ...item,
          ...action.payload.element,
        };
      });
    default:
      return state;
  }
};

export default CanvasElementsReducer;
