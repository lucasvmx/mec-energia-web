import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import LeftDrawer from "./LeftDrawer";

const Header = ()=>{
  return (
    <div>
      <React.Fragment>
        <AppBar sx={{display: 'flex', flexDirection:'row'}}>
          <LeftDrawer/>
          <Toolbar>
            <Typography>
              MEC Eneergia Inteligente
            </Typography> 
          </Toolbar>
        </AppBar>
      </React.Fragment>

    </div>
  )
}

export default Header;