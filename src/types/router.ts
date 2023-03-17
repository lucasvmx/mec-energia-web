import { ComponentType } from "react";
import { SvgIconProps } from "@mui/material";

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
};

export type Routes = Record<RoutesPathnames, Route>;
