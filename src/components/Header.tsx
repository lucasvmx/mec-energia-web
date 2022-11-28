import NextLink from "next/link";
import { AppBar, Toolbar, Typography } from "@mui/material";
import MuiLink from "@mui/material/Link";

const Header = () => (
  <AppBar position="sticky" elevation={0}>
    <Toolbar>
      <Typography variant="h6">
        <NextLink href="/" passHref legacyBehavior>
          <MuiLink color="inherit" underline="none">
            MEC Energia
          </MuiLink>
        </NextLink>
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
