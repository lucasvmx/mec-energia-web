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

const drawerWidth = 240;

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
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

      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        variant="persistent"
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
      </Drawer>
    </>
  );
};

export default Header;
