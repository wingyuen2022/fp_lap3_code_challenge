import listReducer from "./list";
import reposReducer from "./repos";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    listReducer,
    reposReducer
});
export default allReducers;