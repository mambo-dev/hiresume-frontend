import { createContext, useReducer } from "react";
import { user } from "./reducers";

const initialState = {
  user: {},
};

const Context = createContext<any>({});

const combineReducers =
  (...reducers: any[]) =>
  (state: any, action: any) => {
    for (let i = 0; i < reducers.length; i++)
      state = reducers[i](state, action);
    return state;
  };

const Provider = ({ children }: any) => {
  const [state, dispatch] = useReducer(combineReducers(user), initialState); // pass more reducers combineReducers(user, blogs, products)
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
