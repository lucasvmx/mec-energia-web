import { ReactNode } from "react";
import { Box } from "@mui/material";

// TODO This grid is not responsive
const DashboardCardGrid = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(4, auto)"
      justifyContent="space-evenly"
      rowGap={5}
      py={3}
    >
      {children}
    </Box>
  );
};

export default DashboardCardGrid;
