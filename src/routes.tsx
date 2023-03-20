import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import TungstenRoundedIcon from "@mui/icons-material/TungstenRounded";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

import { Routes } from "@/types/router";
import { UserRole } from "@/types/person";

const routes: Routes = {
  "/": {
    title: "Painel",
    Icon: DashboardRoundedIcon,
    href: "/",
  },
  "/uc/[id]": {
    title: "Unidades Consumidoras",
    Icon: TungstenRoundedIcon,
    href: "/uc",
  },
  "/distribuidoras/[id]": {
    title: "Distribuidoras",
    Icon: FactoryRoundedIcon,
    href: "/distribuidoras",
  },
  "/distribuidorasv2/[distributorId]": {
    title: "Distribuidoras V2",
    Icon: FactoryRoundedIcon,
    href: "/distribuidorasv2",
  },
  "/pessoas": {
    title: "Pessoas",
    Icon: GroupsRoundedIcon,
    href: "/pessoas",
    roles: [UserRole.SUPER_USER, UserRole.UNIVERSITY_ADMIN],
  },
};

export default routes;
