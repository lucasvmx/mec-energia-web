import { ReactNode } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { selectRoutes } from "@/store/appSlice";
import { RoutesPathnames } from "@/types/router";

const Header = ({ children }: { children?: ReactNode }) => {
  const { pathname } = useRouter();
  const routes = useSelector(selectRoutes);
  const { Icon, title } = routes[pathname as RoutesPathnames];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ backgroundColor: "background.default" }}
    >
      <Toolbar sx={{ px: 2 }} disableGutters>
        <Box flexGrow={1}>
          <Box display="flex" alignItems="center">
            <Icon fontSize="large" color="primary" />

            <Typography sx={{ ml: 1 }} variant="h6" color="primary">
              {title}
            </Typography>
          </Box>
        </Box>

        {children}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
