import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsDrawerOpen, setIsDrawerOpen } from "../store/appSlice";

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

  const onCloseDrawer = () => {
    dispatch(setIsDrawerOpen(!isDrawerOpen));
  };

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
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ViewModuleIcon />
              </ListItemIcon>

              <ListItemText>Painel</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <WbIncandescentIcon />
              </ListItemIcon>

              <ListItemText>Unidades Consumidoras</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>

              <ListItemText>Operadoras</ListItemText>
            </ListItemButton>
          </ListItem>
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
