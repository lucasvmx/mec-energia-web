import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import TungstenRoundedIcon from "@mui/icons-material/TungstenRounded";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";
import { Routes } from "@/types/app";

const routes: Routes = {
  "/": {
    title: "Painel",
    href: "/",
    Icon: DashboardRoundedIcon,
  },
  "/uc/[id]": {
    title: "Unidades Consumidoras",
    href: "/uc/1", // TODO Tornar o id dinâmico: pegar primeira favorita listada? com pendência?
    Icon: TungstenRoundedIcon,
  },
  "/distribuidoras/[id]": {
    title: "Distribuidoras",
    href: "/distribuidoras/1", // TODO Tornar o id dinâmico: pegar primeira favorita listada? com pendência?
    Icon: FactoryRoundedIcon,
  },
};

export default routes;
