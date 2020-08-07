import CanvasElementsReducer from "./CanvasElements";
import CanvasElIndex from "./CanvasElIndex";
import { combineReducers } from "redux";
const allReducers = combineReducers({
  canvasEls: CanvasElementsReducer,
  canvasElIndex: CanvasElIndex,
});

export default allReducers;
