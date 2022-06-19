import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import teamReducer from "./teamReducer";
const rootReducer = combineReducers({
  todo: todoReducer,
  team: teamReducer,
});

export default rootReducer;
