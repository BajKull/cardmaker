import CanvasElementsReducer from "./CanvasElements";
import CanvasElIndex from "./CanvasElIndex";
import LoginScreen from "./LoginScreen";
import LoginStatus from "./LoginStatus";
import CanvasResolution from "./CanvasResolution";
import { combineReducers } from "redux";
const allReducers = combineReducers({
  canvasEls: CanvasElementsReducer,
  canvasElIndex: CanvasElIndex,
  loginScreen: LoginScreen,
  loginStatus: LoginStatus,
  canvasRes: CanvasResolution,
});

export default allReducers;
