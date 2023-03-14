import { Box, Paper, Typography } from "@mui/material";

const DistributorContentTariffsTable = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5">Tarifas</Typography>

      <Box display="flex" py={2}>
        <Box>
          <Typography variant="body2" color="textSecondary">
            Início da vigência
          </Typography>

          <Typography variant="body2">15/15/2015</Typography>
        </Box>

        <Box ml={2}>
          <Typography variant="body2" color="textSecondary">
            Fim da vigência
          </Typography>

          <Typography variant="body2">15/15/2015</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default DistributorContentTariffsTable;
