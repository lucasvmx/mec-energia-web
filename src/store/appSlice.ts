import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  AppState,
  ConsumerUnitFilter,
  ConsumerUnitInvoiceFilter,
  ConsumerUnitTab,
  DashboardFilter,
  RootState,
  STORE_HYDRATE,
} from "@/types/app";
import { InvoiceDataGridRow } from "@/types/consumerUnit";
import { Tariff } from "@/types/tariffs";

const initialState: AppState = {
  isDrawerOpen: true,
  dashboard: {
    activeFilter: "all",
  },
  consumerUnit: {
    activeId: null,
    isCreateFormOpen: false,
    isEditFormOpen: false,
    isRenewContractFormOpen: false,
    activeFilter: "all",
    openedTab: ConsumerUnitTab.INVOICE,
    invoice: {
      activeFilter: "pending",
      dataGridRows: [],
    },
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
      end_date: "2010-1-1",
      overdue: false,
      start_date: "2010-1-1",
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
    // App
    setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },

    // Dashboard
    setDashboardActiveFilter: (
      state,
      action: PayloadAction<DashboardFilter>
    ) => {
      state.dashboard.activeFilter = action.payload;
    },

    // Consumer unit
    setActiveConsumerUnitId: (state, action: PayloadAction<number>) => {
      state.consumerUnit.activeId = action.payload;
    },
    setConsumerUnitActiveFilter: (
      state,
      action: PayloadAction<ConsumerUnitFilter>
    ) => {
      state.consumerUnit.activeFilter = action.payload;
    },
    setConsumerUnitInvoiceActiveFilter: (
      state,
      action: PayloadAction<ConsumerUnitInvoiceFilter>
    ) => {
      state.consumerUnit.invoice.activeFilter = action.payload;
    },
    setConsumerUnitInvoiceDataGridRows: (
      state,
      action: PayloadAction<InvoiceDataGridRow[]>
    ) => {
      state.consumerUnit.invoice.dataGridRows = action.payload;
    },
    setConsumerUnitOpenedTab: (
      state,
      action: PayloadAction<ConsumerUnitTab>
    ) => {
      state.consumerUnit.openedTab = action.payload;
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
  extraReducers: (builder) => {
    builder.addCase(STORE_HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.app,
      };
    });
  },
});

export default appSlice.reducer;

export const {
  setIsDrawerOpen,

  setDashboardActiveFilter,

  setActiveConsumerUnitId,
  setConsumerUnitActiveFilter,
  setConsumerUnitInvoiceActiveFilter,
  setConsumerUnitInvoiceDataGridRows,
  setConsumerUnitOpenedTab,
  setIsConsumerUnitCreateFormOpen,
  setIsConsumerUnitEditFormOpen,
  setIsConsumerUnitRenewContractFormOpen,

  setIsDistributorCreateFormOpen,
  setIsDistributorEditFormOpen,
  setIsTariffCreateFormOpen,
  setIsTariffEdiFormOpen,
  setCurrenTariff,
} = appSlice.actions;

// App
export const selectIsDrawerOpen = (state: RootState) => {
  return state.app.isDrawerOpen;
};

// Dashboard
export const selectDashboardActiveFilter = (state: RootState) => {
  return state.app.dashboard.activeFilter;
};

// Consumer unit
export const selectActiveConsumerUnitId = (state: RootState) => {
  return state.app.consumerUnit.activeId;
};

export const selectConsumerUnitActiveFilter = (state: RootState) => {
  return state.app.consumerUnit.activeFilter;
};

export const selectConsumerUnitInvoiceActiveFilter = (state: RootState) => {
  return state.app.consumerUnit.invoice.activeFilter;
};

export const selectConsumerUnitInvoiceDataGridRows = (state: RootState) => {
  return state.app.consumerUnit.invoice.dataGridRows;
};

export const selectConsumerUnitOpenedTab = (state: RootState) => {
  return state.app.consumerUnit.openedTab;
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
