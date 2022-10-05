import React from "react";
import { useState } from "react";
import { Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, List, IconButton} from "@mui/material";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import MenuIcon from '@mui/icons-material/Menu';
import { spacing } from '@material-ui/system';

const LeftDrawer = ()=>{
  const [openDrawer, setopenDrawer] = useState(false)
  return(
    <React.Fragment>
      <Drawer open={openDrawer}
      onClose={()=>setopenDrawer(false)}>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ViewModuleIcon/>
              <ListItemText>Painel</ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton sx={{ml:1}} onClick={()=>setopenDrawer(!openDrawer)}>
        <MenuIcon/>
      </IconButton>
    </React.Fragment>
  )
}

export default LeftDrawer;