import { combineReducers } from "redux";
import statsReducer from "./stats.reducer";
const rootReducer = combineReducers({ stats: statsReducer });
export default rootReducer;
