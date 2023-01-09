import { ReactNode } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import MuiLink from "@mui/material/Link";

import routes from "@/routes";

const Header = ({ children }: { children?: ReactNode }) => {
  const { pathname } = useRouter();
  const { Icon, title, href } = routes[pathname];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ backgroundColor: "background.default" }}
    >
      <Toolbar sx={{ px: 2 }} disableGutters>
        <Box flexGrow={1}>
          <Typography variant="h6">
            <NextLink href={href} passHref legacyBehavior>
              <MuiLink color="primary" underline="none">
                <Box display="flex" alignItems="center">
                  <Icon fontSize="large" />
                  <Box ml={1}>{title}</Box>
                </Box>
              </MuiLink>
            </NextLink>
          </Typography>
        </Box>

        {children}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
