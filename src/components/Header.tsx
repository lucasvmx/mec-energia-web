import { useRouter } from "next/router";
import NextLink from "next/link";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import MuiLink from "@mui/material/Link";

import routes from "@/routes";

const Header = () => {
  const { pathname } = useRouter();
  const { Icon, title, href } = routes[pathname];

  return (
    <AppBar position="static" elevation={0} color="default">
      <Toolbar>
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
