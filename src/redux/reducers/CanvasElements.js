const CanvasElementsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CANVAS_EL":
      return action.payload;
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
    case "POSITION_CANVAS_EL":
      return state
        .map((item, i) => {
          if (i === action.payload.start) return [];
          if (i === action.payload.end)
            return [
              item,
              ...state.slice(action.payload.start, action.payload.start + 1),
            ];
          return item;
        })
        .flat();
    case "DELETE_CANVAS_EL":
      // payload == index
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1),
      ];
    case "CLEAR_CANVAS_EL":
      return [];
    default:
      return state;
  }
};

export default CanvasElementsReducer;
