import { makeStore } from "@/store";
import { SvgIconProps } from "@mui/material";
import { ComponentType, ReactNode } from "react";

export interface AppState {
  isDrawerOpen: boolean;
  consumerUnit: {
    isCreateFormOpen: boolean;
    isEditFormOpen: boolean;
    isRenewContractFormOpen: boolean;
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
};