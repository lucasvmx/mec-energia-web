import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { makeStore } from ".";

export enum ConsumerUnitFormEnum {
  CREATE,
  EDIT,
}

export enum DistributorFormEnum {
  CREATE,
  EDIT,
}

export enum TariffFormEnum {
  CREATE,
  EDIT,
}

type ConsumerUnitFormType = ConsumerUnitFormEnum | null;
type DistributorFormType = DistributorFormEnum | null;
type TariffFormType = TariffFormEnum | null;

export interface AppState {
  isDrawerOpen: boolean;
  consumerUnit: {
    isCreateFormOpen: boolean;
    isEditFormOpen: boolean;
  };
  distributor: {
    isCreateFormOpen: boolean;
    isEditFormOpen: boolean;
  };
  tariff: {
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
  distributor: {
    isCreateFormOpen: false,
    isEditFormOpen: false,
  },
  tariff: {
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
    setIsConsumerUnitCreateFormOpen: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.consumerUnit.isCreateFormOpen = action.payload;
    },
    setIsConsumerUnitEditFormOpen: (state, action: PayloadAction<boolean>) => {
      state.consumerUnit.isEditFormOpen = action.payload;
    },
    setIsDistributorCreateFormOpen: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.distributor.isCreateFormOpen = action.payload;
    },
    setIsDistributorEditFormOpen: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.distributor.isEditFormOpen = action.payload;
    },
    setIsTariffCreateFormOpen: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.tariff.isCreateFormOpen = action.payload;
    },
    setIsTariffEdiFormOpen: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.tariff.isEditFormOpen = action.payload;
    },
  },
});

export default appSlice.reducer;

export const {
  setIsDrawerOpen,
  setIsConsumerUnitCreateFormOpen,
  setIsConsumerUnitEditFormOpen,
  setIsDistributorCreateFormOpen,
  setIsDistributorEditFormOpen,
  setIsTariffCreateFormOpen,
  setIsTariffEdiFormOpen,
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

export const selectIsDistributorCreateFormOpen = (state: RootState) => {
  return state.app.distributor.isCreateFormOpen;
};

export const selectIsDistributorEditFormOpen = (state: RootState) => {
  return state.app.distributor.isEditFormOpen;
};

export const selectIsTariffCreateFormOpen = (state: RootState) => {
  return state.app.tariff.isCreateFormOpen;
};

export const selectIsTariffEditFormOpen = (state: RootState) => {
  return state.app.tariff.isEditFormOpen;
};