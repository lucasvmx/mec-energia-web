import { makeStore } from "@/store";
import { BadgeProps, SvgIconProps } from "@mui/material";
import { ComponentType, ReactNode } from "react";
import { Tariff } from "./tariffs";

export type DashboardFilter = "all" | "active" | "pending";

export interface AppState {
  isDrawerOpen: boolean;
  dashboard: {
    activeFilter: DashboardFilter;
  };
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
  title: string;
  favorite?: boolean;
  BackgroundIcon?: ComponentType<SvgIconProps>;
  action?: ReactNode;
  ActionIcon?: ComponentType<SvgIconProps>;
  actionIconBadgeContent?: BadgeProps["badgeContent"];
}
