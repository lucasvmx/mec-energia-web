import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import app from "./appSlice";

const combinedReducer = combineReducers({
  app,
});

const reducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: AnyAction
) => {
  // if (action.type === HYDRATE) {
  //   const nextState = {
  //     ...state, // use previous state
  //   };

  //   return nextState;
  // } else {
  //   return combinedReducer(state, action);
  // }

  return combinedReducer(state, action);
};

export const makeStore = () =>
  configureStore({
    reducer,
  });

export const wrapper = createWrapper(makeStore);
