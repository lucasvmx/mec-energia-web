import { ComponentType } from "react";
import { SvgIconProps } from "@mui/material";
import { UserRole } from "./person";

export type RoutesPathnames =
  | "/"
  | "/uc/[id]"
  | "/distribuidoras/[id]"
  | "/distribuidorasv2/[distributorId]"
  | "/pessoas";

export type Route = {
  title: string;
  Icon: ComponentType<SvgIconProps>;
  href?: string;
  roles?: UserRole[];
};

export type Routes = Record<RoutesPathnames, Route>;
