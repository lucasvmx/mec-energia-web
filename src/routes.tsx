import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import TungstenRoundedIcon from "@mui/icons-material/TungstenRounded";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

import { Route } from "@/types/router";
import { UserRole } from "@/types/person";

const routes: Route[] = [
  {
    title: "Instituições",
    Icon: SchoolRoundedIcon,
    href: "/instituicoes",
    pathnames: ["/instituicoes"],
    roles: [UserRole.SUPER_USER],
  },
  {
    title: "Painel",
    Icon: DashboardRoundedIcon,
    href: "/",
    pathnames: ["/"],
  },
  {
    title: "Unidades Consumidoras",
    Icon: TungstenRoundedIcon,
    href: "/uc",
    pathnames: ["/uc", "/uc/[id]"],
  },
  {
    title: "Distribuidoras",
    Icon: FactoryRoundedIcon,
    href: "/distribuidoras",
    pathnames: ["/distribuidoras", "/distribuidoras/[distributorId]"],
  },
  {
    title: "Pessoas",
    Icon: GroupsRoundedIcon,
    href: "/pessoas",
    pathnames: ["/pessoas"],
    roles: [UserRole.SUPER_USER, UserRole.UNIVERSITY_ADMIN],
  },
];

export default routes;

export const getRouteByPathname = (pathname: string) => {
  const route = routes.find((route) => route.pathnames.includes(pathname));

  return route;
};
