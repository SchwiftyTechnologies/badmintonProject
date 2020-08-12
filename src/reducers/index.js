import { combineReducers } from "redux";
import statsReducer from "./stats.reducer";
import courtReducer from "./court.reducer";
const rootReducer = combineReducers({
  stats: statsReducer,
  court: courtReducer,
});
export default rootReducer;
