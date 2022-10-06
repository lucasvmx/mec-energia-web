import React from "react";
import { useState } from "react";
import { Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, List, IconButton, Box } from "@mui/material";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import MenuIcon from '@mui/icons-material/Menu';

const LeftDrawer = () => {
  const [openDrawer, setopenDrawer] = useState(false);
  return (
    <React.Fragment>
      <Drawer open={openDrawer}
        onClose={() => setopenDrawer(false)}>
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
        </List>
      </Drawer>
      <Box ml={1}>
        <IconButton onClick={() => setopenDrawer(!openDrawer)}>
          <MenuIcon />
        </IconButton>
      </Box>
    </React.Fragment >
  )
}

export default LeftDrawer;