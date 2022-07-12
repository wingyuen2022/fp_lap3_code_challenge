import githubReducer from "./github";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    githubReducer
});
export default allReducers;