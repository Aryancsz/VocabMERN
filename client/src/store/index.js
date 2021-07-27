import { createStore, combineReducers } from "redux";
import WordReducer from "./reducers/WordReducer";

const root = combineReducers({
  WordReducer,
});
const store = createStore(
  root,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
