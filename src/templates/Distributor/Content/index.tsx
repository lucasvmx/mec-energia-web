import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/dist/query";

import { Box, Grid, Typography } from "@mui/material";

import { useGetDistributorSubgroupsQuery } from "@/api";
import {
  selectActiveDistributorId,
  selectActiveSubgroup,
} from "@/store/appSlice";

import DistributorContentConsumerUnitsList from "./ConsumerUnitsList";
import DistributorContentTariffsTable from "./TariffsTable";

const DistributorContent = () => {
  const distributorId = useSelector(selectActiveDistributorId);
  const selectedSubgroupTariff = useSelector(selectActiveSubgroup);

  const { isLoading } = useGetDistributorSubgroupsQuery(
    distributorId ?? skipToken
  );

  if (isLoading) {
    return <Box pt={4}>Carregando...</Box>;
  }

  if (!selectedSubgroupTariff) {
    return (
      <Box pt={4}>
        <Typography variant="h5">
          Nenhuma unidade consumidora associada
        </Typography>

        <Box pt={2}>
          <Typography variant="body2" color="text.secondary">
            Para ver tarifas, selecione esta distribuidora no contrato de uma
            unidade consumidora.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Grid container pt={2} spacing={2}>
      <Grid item xs={8}>
        <DistributorContentTariffsTable />
      </Grid>

      <Grid item xs={4}>
        <DistributorContentConsumerUnitsList />
      </Grid>
    </Grid>
  );
};

export default DistributorContent;
