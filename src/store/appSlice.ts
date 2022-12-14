import { Tariff } from "@/types/tariffs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { makeStore } from ".";

export enum ConsumerUnitFormEnum {
  CREATE,
  EDIT,
}

export interface AppState {
  isDrawerOpen: boolean;
  consumerUnit: {
    isCreateFormOpen: boolean;
    isEditFormOpen: boolean;
    isRenewContractFormOpen: boolean;
  };
  distributor: {
    isCreateFormOpen: boolean;
    isEditFormOpen: boolean;
  };
  tariff: {
    isCreateFormOpen: boolean;
    isEditFormOpen: boolean;
    currentTariff: Tariff;
  };
}

export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
type Store = ReturnType<typeof makeStore>;

const initialState: AppState = {
  isDrawerOpen: true,
  consumerUnit: {
    isCreateFormOpen: false,
    isEditFormOpen: false,
    isRenewContractFormOpen: false,
  },
  distributor: {
    isCreateFormOpen: false,
    isEditFormOpen: false,
  },
  tariff: {
    isCreateFormOpen: false,
    isEditFormOpen: false,
    currentTariff: {
      blue: {
        off_peak_te_in_reais_per_mwh: 0,
        off_peak_tusd_in_reais_per_kw: 0,
        off_peak_tusd_in_reais_per_mwh: 0,
        peak_te_in_reais_per_mwh: 0,
        peak_tusd_in_reais_per_kw: 0,
        peak_tusd_in_reais_per_mwh: 8,
      },
      end_date: "20-09-2010",
      overdue: false,
      start_date: "20-09-2010",
      subgroup: "A0",
      green: {
        na_tusd_in_reais_per_kw: 9,
        off_peak_te_in_reais_per_mwh: 2,
        off_peak_tusd_in_reais_per_mwh: 8,
        peak_te_in_reais_per_mwh: 6,
        peak_tusd_in_reais_per_mwh: 9,
      },
    },
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
    setIsDistributorCreateFormOpen: (state, action: PayloadAction<boolean>) => {
      state.distributor.isCreateFormOpen = action.payload;
    },
    setIsDistributorEditFormOpen: (state, action: PayloadAction<boolean>) => {
      state.distributor.isEditFormOpen = action.payload;
    },
    setIsTariffCreateFormOpen: (state, action: PayloadAction<boolean>) => {
      state.tariff.isCreateFormOpen = action.payload;
      if (action.payload) {
        state.tariff.isEditFormOpen = !action.payload;
      }
    },
    setIsTariffEdiFormOpen: (state, action: PayloadAction<boolean>) => {
      state.tariff.isEditFormOpen = action.payload;
      if (action.payload) {
        state.tariff.isCreateFormOpen = !action.payload;
      }
    },
    setCurrenTariff: (state, action: PayloadAction<Tariff>) => {
      state.tariff.currentTariff = action.payload;
    },
  },
});

export default appSlice.reducer;

export const {
  setIsDrawerOpen,
  setIsConsumerUnitCreateFormOpen,
  setIsConsumerUnitEditFormOpen,
  setIsConsumerUnitRenewContractFormOpen,
  setIsDistributorCreateFormOpen,
  setIsDistributorEditFormOpen,
  setIsTariffCreateFormOpen,
  setIsTariffEdiFormOpen,
  setCurrenTariff,
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
export const selectCurrentTariff = (state: RootState) => {
  return state.app.tariff.currentTariff;
};
