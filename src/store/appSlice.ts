import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { makeStore } from ".";

export enum ConsumerUnitFormEnum {
  CREATE,
  EDIT,
}

type ConsumerUnitFormType = ConsumerUnitFormEnum | null;

export interface AppState {
  isDrawerOpen: boolean;
  consumerUnit: {
    isCreateFormOpen: boolean;
    isEditFormOpen: boolean;
    isRenewContractFormOpen: boolean;
  };
}

export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
type Store = ReturnType<typeof makeStore>;

const initialState: AppState = {
  isDrawerOpen: false,
  consumerUnit: {
    isCreateFormOpen: false,
    isEditFormOpen: false,
    isRenewContractFormOpen: false,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
    setIsConsumerUnitCreateFormOpen: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.consumerUnit.isCreateFormOpen = action.payload;
    },
    setIsConsumerUnitEditFormOpen: (state, action: PayloadAction<boolean>) => {
      state.consumerUnit.isEditFormOpen = action.payload;
    },
    setIsConsumerUnitRenewContractFormOpen: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.consumerUnit.isRenewContractFormOpen = action.payload;
    },
  },
});

export default appSlice.reducer;

export const {
  setIsDrawerOpen,
  setIsConsumerUnitCreateFormOpen,
  setIsConsumerUnitEditFormOpen,
  setIsConsumerUnitRenewContractFormOpen,
} = appSlice.actions;

export const selectIsDrawerOpen = (state: RootState) => {
  return state.app.isDrawerOpen;
};

export const selectIsConsumerUnitCreateFormOpen = (state: RootState) => {
  return state.app.consumerUnit.isCreateFormOpen;
};

export const selectIsConsumerUnitEditFormOpen = (state: RootState) => {
  return state.app.consumerUnit.isEditFormOpen;
};

export const selectIsConsumerUnitRenewContractFormOpen = (state: RootState) => {
  return state.app.consumerUnit.isRenewContractFormOpen;
};
