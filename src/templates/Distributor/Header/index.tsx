import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/dist/query";

import { Box, Button, Container, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useGetDistributorSubgroupsQuery, useGetDistributorQuery } from "@/api";
import {
  selectActiveDistributorId,
  setIsDistributorEditFormOpen,
} from "@/store/appSlice";

import DistributorContentHeaderTabs from "./Tabs";

const DistributorContentHeader = () => {
  const dispatch = useDispatch();
  const distributorId = useSelector(selectActiveDistributorId);

  const { data: distributor } = useGetDistributorQuery(
    distributorId ?? skipToken
  );

  const { data: tariffsSubgroups, isLoading: isTariffsSubgroupsLoading } =
    useGetDistributorSubgroupsQuery(distributorId ?? skipToken);

  const shouldShowTabs = useMemo(
    () =>
      tariffsSubgroups &&
      tariffsSubgroups.length > 0 &&
      !isTariffsSubgroupsLoading,
    [tariffsSubgroups, isTariffsSubgroupsLoading]
  );

  const handleEditDistributorClick = useCallback(() => {
    dispatch(setIsDistributorEditFormOpen(true));
  }, [dispatch]);

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={1}
      sx={{ backgroundColor: "background.default" }}
    >
      <Container>
        <Box display="flex">
          <Box>
            <Box display="flex" alignItems="center">
              <Typography variant="h4">{distributor?.name}</Typography>

              <Box pl={2}>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  size="small"
                  onClick={handleEditDistributorClick}
                >
                  Editar
                </Button>
              </Box>
            </Box>

            <Typography>
              CNPJ: <strong>{distributor?.cnpj}</strong>
            </Typography>
          </Box>
        </Box>

        {shouldShowTabs && <DistributorContentHeaderTabs />}
      </Container>
    </Box>
  );
};

export default DistributorContentHeader;
