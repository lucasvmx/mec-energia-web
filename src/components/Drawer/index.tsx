import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { selectIsDrawerOpen, setIsDrawerOpen } from "@/store/appSlice";

import theme from "@/theme";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import TungstenRoundedIcon from "@mui/icons-material/TungstenRounded";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import DrawerListItem from "@/components/Drawer/ListItem";

const menuItems = [
  {
    name: "Painel",
    href: "/",
    pathname: "/",
    Icon: DashboardRoundedIcon,
  },
  {
    name: "Unidades Consumidoras",
    href: "/uc/1", // TODO Tornar o id dinâmico
    pathname: "/uc/[id]",
    Icon: TungstenRoundedIcon,
  },
  {
    name: "Distribuidoras",
    href: "/distribuidoras/1", // TODO Tornar o id dinâmico
    pathname: "/distribuidoras/[id]",
    Icon: FactoryRoundedIcon,
  },
];

export const openDrawerWidth = 224;
export const closedDrawerWidth = `calc(${theme.spacing(8)} + 1px)`;

const openedMixin = (theme: Theme): CSSObject => ({
  width: openDrawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: closedDrawerWidth,
});

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: "208px", // TODO Para ficar um quadrado, utilizar openDrawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Drawer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(selectIsDrawerOpen);

  const isCurrentRoute = (pathname: string) => pathname === router.pathname;

  const handleLogout = () => {
    console.log("Log out");
  };

  const handleToggleDrawer = () => {
    dispatch(setIsDrawerOpen(!isDrawerOpen));
  };

  return (
    <StyledDrawer variant="permanent" open={isDrawerOpen}>
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="192px"
        p={1}
        pb={0}
      >
        <Fade in={isDrawerOpen} appear={false}>
          <Toolbar
            disableGutters
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <IconButton onClick={handleToggleDrawer}>
              <ChevronLeftRoundedIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </Fade>

        <Fade in={!isDrawerOpen} appear={false}>
          <Box
            mb={3}
            display="flex"
            justifyContent="center"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
            }}
          >
            <Toolbar>
              <IconButton onClick={handleToggleDrawer}>
                <MenuRoundedIcon fontSize="large" />
              </IconButton>
            </Toolbar>
          </Box>
        </Fade>

        <Box
          sx={{
            backgroundColor: "orange",
            width: "100%",
            maxWidth: "144px",
            aspectRatio: "1/1",
            borderRadius: "50%",
          }}
        />
      </Box>

      <List sx={{ padding: 0 }}>
        {menuItems.map(({ name, href, pathname, Icon }, index) => (
          <Box mt={index > 0 ? 1 : 0} key={name}>
            <DrawerListItem
              Icon={Icon}
              text={name}
              href={href}
              active={isCurrentRoute(pathname)}
            />
          </Box>
        ))}
      </List>

      <Box flexGrow={1} />

      <List>
        <DrawerListItem
          Icon={AccountCircleRoundedIcon}
          text="Joaquim Cruz" // TODO Resolver glitch de white-space
          href="/perfil"
          active={isCurrentRoute("/perfil")}
        />

        <Divider />

        <DrawerListItem
          Icon={LogoutRoundedIcon}
          text="Sair"
          onClick={handleLogout}
        />
      </List>
    </StyledDrawer>
  );
};

export default Drawer;
