import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { makeStore } from ".";

export enum ConsumerUnitFormEnum {
  CREATE,
  EDIT,
}

export enum ContractFormEnum {
  CREATE,
  EDIT,
}

type ConsumerUnitFormType = ConsumerUnitFormEnum | null;
type ContractFormType = ContractFormEnum | null;

export interface AppState {
  isDrawerOpen: boolean;
  consumerUnit: {
    isCreateFormOpen: boolean;
    isEditFormOpen: boolean;
  };
  contract: {
    isCreateFormOpen: boolean;
    isEditFormOpen: boolean;
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
  },
  contract: {
    isCreateFormOpen: false,
    isEditFormOpen: false,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
    setIsConsumerUnitCreateFormOpen: (state,action: PayloadAction<boolean>) => {
      state.consumerUnit.isCreateFormOpen = action.payload;
    },
    setIsConsumerUnitEditFormOpen: (state, action: PayloadAction<boolean>) => {
      state.consumerUnit.isEditFormOpen = action.payload;
    },
    setIsContractCreateFormOpen: (state,action: PayloadAction<boolean>) => {
      state.contract.isCreateFormOpen = action.payload;
    },
    setIsContractEditFormOpen: (state, action: PayloadAction<boolean>) => {
      state.contract.isEditFormOpen = action.payload;
    },
  },
});

export default appSlice.reducer;

export const {
  setIsDrawerOpen,
  setIsConsumerUnitCreateFormOpen,
  setIsConsumerUnitEditFormOpen,
  setIsContractCreateFormOpen,
  setIsContractEditFormOpen
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

export const selectIsContractCreateFormOpen = (state: RootState) => {
  return state.app.contract.isCreateFormOpen;
};

export const selectIsContractEditFormOpen = (state: RootState) => {
  return state.app.contract.isEditFormOpen;
};