import { mecEnergiaApi } from "@/api";
import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import app from "./appSlice";

const combinedReducer = combineReducers({
  app,
  [mecEnergiaApi.reducerPath]: mecEnergiaApi.reducer,
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
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(mecEnergiaApi.middleware),
  });

export const wrapper = createWrapper(makeStore);
