import { createWrapper } from "next-redux-wrapper";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const store = (context: any) => createStore(reducers, applyMiddleware(thunk));

export const wrapperStore = createWrapper(store);
