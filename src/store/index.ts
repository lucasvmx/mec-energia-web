import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { mecEnergiaApi } from "@/api";
import { mecEnergiaMockedApi } from "@/api/mocked";
import app from "./appSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      app,
      [mecEnergiaApi.reducerPath]: mecEnergiaApi.reducer,
      [mecEnergiaMockedApi.reducerPath]: mecEnergiaMockedApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        mecEnergiaApi.middleware,
        mecEnergiaMockedApi.middleware
      ),
  });

export const wrapper = createWrapper(makeStore);
