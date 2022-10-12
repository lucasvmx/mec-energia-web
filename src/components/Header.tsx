import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  IconButton,
  Box,
  ListItem,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";
import BusinessIcon from "@mui/icons-material/Business";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { selectIsDrawerOpen, setIsDrawerOpen } from "../store/appSlice";

const Header = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(selectIsDrawerOpen);

  const toggleDrawer = () => {
    dispatch(setIsDrawerOpen(!isDrawerOpen));
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box mr={3}>
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography variant="h6">MEC Energia</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
