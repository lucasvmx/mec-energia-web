import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { makeStore } from ".";

export enum ConsumerUnitFormEnum {
  CREATE,
  EDIT,
}

type ConsumerUnitFormType = ConsumerUnitFormEnum | null;

export interface AppState {
  isDrawerOpen: boolean;
  openedConsumerUnitFormType: ConsumerUnitFormType;
}

export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
type Store = ReturnType<typeof makeStore>;

const initialState: AppState = {
  isDrawerOpen: false,
  openedConsumerUnitFormType: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
    setOpenedConsumerUnitFormType: (
      state,
      action: PayloadAction<ConsumerUnitFormType>
    ) => {
      state.openedConsumerUnitFormType = action.payload;
    },
  },
});

export default appSlice.reducer;

export const { setIsDrawerOpen, setOpenedConsumerUnitFormType } =
  appSlice.actions;

export const selectIsDrawerOpen = (state: RootState) => {
  return state.app.isDrawerOpen;
};

export const selectOpenedConsumerUnitFormType = (state: RootState) => {
  return state.app.openedConsumerUnitFormType;
};

export const selectIsConsumerUnitFormOpen = (state: RootState) => {
  return state.app.openedConsumerUnitFormType !== null;
};
