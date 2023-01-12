import { ComponentType, ReactNode } from "react";
import { createAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { makeStore } from "@/store";
import { IconButtonProps, SvgIconProps } from "@mui/material";
import { InvoiceDataGridRow } from "./consumerUnit";
import { Tariff } from "./tariffs";

export const STORE_HYDRATE = createAction<RootState>(HYDRATE);

export type DashboardFilter = "all" | "active" | "pending";

export type ConsumerUnitFilter = "all" | "pending";

export enum ConsumerUnitTab {
  INVOICE,
  ANALYSIS,
  CONTRACT,
}

export type ConsumerUnitInvoiceFilter = "pending" | string;

export interface AppState {
  isDrawerOpen: boolean;
  dashboard: {
    activeFilter: DashboardFilter;
  };
  consumerUnit: {
    activeId: number | null;
    isCreateFormOpen: boolean;
    isEditFormOpen: boolean;
    isRenewContractFormOpen: boolean;
    activeFilter: ConsumerUnitFilter;
    openedTab: ConsumerUnitTab;
    invoice: {
      activeFilter: ConsumerUnitInvoiceFilter;
      dataGridRows: InvoiceDataGridRow[];
    };
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
  electricityBill:{
    isCreateFormOpen:boolean,
    isEditFormOpen:boolean,
  };
  notifications:{
    sucess:NotificationProps;
    error:NotificationProps;
  }
}

type Store = ReturnType<typeof makeStore>;
export type RootState = ReturnType<Store["getState"]>;

export interface Routes {
  [key: string]: {
    title: string;
    href: string;
    Icon: ComponentType<SvgIconProps>;
  };
}

export type CardWrapperProps = {
  dense?: boolean;
  variant?: "default" | "warning" | "disabled";
  selected?: boolean;
  children?: ReactNode;
  onClick?: () => void;
};

export interface CardProps extends CardWrapperProps {
  name: string;
  isFavorite?: boolean;
  BackgroundIcon?: ComponentType<SvgIconProps>;
  action?: ReactNode;
  actionIcon?: ReactNode;
  onActionIconClick?: IconButtonProps["onClick"];
}

export interface NotificationProps{
  isOpen: boolean;
  text?: string;
}