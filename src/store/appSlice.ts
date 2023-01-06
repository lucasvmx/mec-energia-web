import { Tariff } from "@/types/tariffs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState, DashboardFilter, RootState } from "@/types/app";

const initialState: AppState = {
  isDrawerOpen: true,
  dashboard: {
    activeFilter: "all",
  },
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
      distributor:1,
      blue: {
        offPeakTeInReaisPerMwh: 0,
        offPeakTusdInReaisPerKw: 0,
        offPeakTusdInReaisPerMwh: 0,
        peakTeInReaisPerMwh: 0,
        peakTusdInReaisPerKw: 0,
        peakTusdInReaisPerMwh: 8,
      },
      endDate: "2010-1-1",
      overdue: false,
      startDate: "2010-1-1",
      subgroup: "A0",
      green: {
        naTusdInReaisPerKw: 9,
        offPeakTeInReaisPerMwh: 2,
        offPeakTusdInReaisPerMwh: 8,
        peakTeInReaisPerMwh: 6,
        peakTusdInReaisPerMwh: 9,
      },
    },
  },
  electricityBill:{
    isCreateFormOpen:false,
    isEditFormOpen:false,
  }
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
    setDashboardActiveFilter: (
      state,
      action: PayloadAction<DashboardFilter>
    ) => {
      state.dashboard.activeFilter = action.payload;
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
    setIsElectricityBillCreateFormOpen: (state, action: PayloadAction<boolean>) => {
      state.electricityBill.isCreateFormOpen = action.payload;
      if (action.payload) {
        state.electricityBill.isEditFormOpen = !action.payload;
      }
    },
    setIsElectricityBillEdiFormOpen: (state, action: PayloadAction<boolean>) => {
      state.electricityBill.isEditFormOpen = action.payload;
      if (action.payload) {
        state.electricityBill.isCreateFormOpen = !action.payload;
      }
    },
  },
});

export default appSlice.reducer;

export const {
  setIsDrawerOpen,
  setDashboardActiveFilter,
  setIsConsumerUnitCreateFormOpen,
  setIsConsumerUnitEditFormOpen,
  setIsConsumerUnitRenewContractFormOpen,
  setIsDistributorCreateFormOpen,
  setIsDistributorEditFormOpen,
  setIsTariffCreateFormOpen,
  setIsTariffEdiFormOpen,
  setCurrenTariff,
  setIsElectricityBillCreateFormOpen,
  setIsElectricityBillEdiFormOpen
} = appSlice.actions;

export const selectIsDrawerOpen = (state: RootState) => {
  return state.app.isDrawerOpen;
};

export const selectDashboardActiveFilter = (state: RootState) => {
  return state.app.dashboard.activeFilter;
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

export const selectIsElectricityBillCreateFormOpen = (state: RootState) => {
  return state.app.electricityBill.isCreateFormOpen;
};

export const selectIsElectricityBillEditFormOpen = (state: RootState) => {
  return state.app.electricityBill.isEditFormOpen;
};
