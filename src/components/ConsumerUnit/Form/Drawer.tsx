import { Close } from "@mui/icons-material";
import { Box, Container, Drawer, DrawerProps, IconButton } from "@mui/material";
import { ReactNode } from "react";

interface ConsumerUnitFormDrawerProps {
  open: boolean;
  children: ReactNode;
  handleCloseDrawer: () => void;
}

const ConsumerUnitFormDrawer = ({
  open,
  children,
  handleCloseDrawer,
}: ConsumerUnitFormDrawerProps) => {
  return (
    <Drawer open={open} anchor="bottom" onClose={handleCloseDrawer}>
      <Box position="relative">
        <Box position="absolute" top={0} left={0} p={2}>
          <IconButton onClick={handleCloseDrawer}>
            <Close fontSize="large" />
          </IconButton>
        </Box>

        <Container maxWidth="sm">{children}</Container>
      </Box>
    </Drawer>
  );
};

export default ConsumerUnitFormDrawer;
