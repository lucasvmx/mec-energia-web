import React from "react";
import { AppBar, Toolbar, Typography, Drawer, ListItemButton, ListItemIcon, ListItemText, List, IconButton, Box, CssBaseline } from "@mui/material";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

const drawerWidth = 240;
const Header = () => {
  const [openDrawer, setopenDrawer] = useState(false);
  return (
    <div>
      <React.Fragment>
        <Box display={"flex"}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>

            <Toolbar>
              <IconButton onClick={() => setopenDrawer(!openDrawer)}>
                <MenuIcon />
              </IconButton>
              <Typography>
                MEC Eneergia Inteligente
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer open={openDrawer}
            onClose={() => setopenDrawer(false)}
            variant="persistent"
            anchor="left"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}>
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <List>
                <ListItemButton>
                  <ListItemIcon>
                    <ViewModuleIcon />
                    <ListItemText>Painel</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <ViewModuleIcon />
                    <ListItemText>Unidades Consumidoras</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <ViewModuleIcon />
                    <ListItemText>Operadoras</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
                <CssBaseline />
              </List>

            </Box>
          </Drawer>
        </Box>
      </React.Fragment>
    </div >
  )
}

export default Header;