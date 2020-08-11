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
    case "DELETE_CANVAS_EL":
      // payload == index
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1),
      ];
    default:
      return state;
  }
};

export default CanvasElementsReducer;
