import { combineReducers } from "redux";
import authReducer from "./auth.reducer";

const reducers = combineReducers({
  user: authReducer,
});

export default reducers;
