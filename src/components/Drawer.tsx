import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsDrawerOpen, setIsDrawerOpen } from "../store/appSlice";
import { useRouter } from 'next/router';

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BusinessIcon from "@mui/icons-material/Business";
import LogoutIcon from "@mui/icons-material/Logout";
import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";
import theme from "../theme";

export const drawerWidth = "240px";

const Drawer = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(selectIsDrawerOpen);
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const router = useRouter();

  const menuItems = [
    {
      name: 'Painel',
      href: '/',
      pathname: '/',
      icon: <ViewModuleIcon />
    },
    {
      name: 'Unidades Consumidoras',
      href: '/uc/1',
      pathname: "/uc/[id]",
      icon: <WbIncandescentIcon />
    },
    {
      name: 'Distribuidoras',
      href: '/dt/1',
      pathname: '/dt/[id]',
      icon: <BusinessIcon />
    }
  ]

  useEffect(() => {
    dispatch(setIsDrawerOpen(isDesktop));
  }, [isDesktop]);

  const onCloseDrawer = () => {
    dispatch(setIsDrawerOpen(!isDrawerOpen));
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, href: string) => {
    e.preventDefault()
    router.push(href)
  }

  const handleActiveRoute = (href: string) => {
    return router.pathname === href;
  }

  return (
    <MuiDrawer
      open={isDrawerOpen}
      onClose={onCloseDrawer}
      variant={isDesktop ? "persistent" : "temporary"}
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <List>
          {menuItems.map(item => {
            return (
              <ListItem key={item.name}>
                <ListItemButton selected={handleActiveRoute(item.pathname)} onClick={event => handleClick(event, item.href)}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText>{item.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>

        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>

              <ListItemText>John Doe</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Divider />

      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>

            <ListItemText>Sair</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
