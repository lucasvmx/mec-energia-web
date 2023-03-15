import { useMemo } from "react";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { format } from "date-fns";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  selectActiveDistributorId,
  selectActiveSubgroup,
} from "@/store/appSlice";
import { useGetTariffQuery } from "@/api";

const getTariffQueryParams = (
  activeDistributorId: number | null,
  activeSubgroup: string | null
) => {
  if (!activeDistributorId || !activeSubgroup) {
    return skipToken;
  }

  return {
    distributor: activeDistributorId,
    subgroup: activeSubgroup,
  };
};

const DistributorContentTariffsTable = () => {
  const activeDistributorId = useSelector(selectActiveDistributorId);
  const activeSubgroup = useSelector(selectActiveSubgroup);

  const tariffQueryPayload = useMemo(
    () => getTariffQueryParams(activeDistributorId, activeSubgroup),
    [activeDistributorId, activeSubgroup]
  );

  const { data: tariffData } = useGetTariffQuery(tariffQueryPayload);

  const { startDate, endDate, overdue, blue, green } = useMemo(() => {
    if (!tariffData) {
      return {
        startDate: null,
        endDate: null,
        overdue: null,
        blue: null,
        green: null,
      };
    }

    return {
      startDate: format(new Date(tariffData.startDate), "dd/MM/yyyy"),
      endDate: format(new Date(tariffData.endDate), "dd/MM/yyyy"),
      overdue: tariffData.overdue,
      blue: tariffData.blue,
      green: tariffData.green,
    };
  }, [tariffData]);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5">Tarifas</Typography>

      <Box display="flex" py={2}>
        <Box>
          <Typography variant="body2" color="textSecondary">
            Início da vigência
          </Typography>

          <Typography variant="body2">{startDate}</Typography>
        </Box>

        <Box ml={2}>
          <Typography variant="body2">Fim da vigência</Typography>

          <Box display="flex" alignItems="center">
            <Tooltip
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "warning.main",
                    color: "warning.contrastText",
                    "& .MuiTooltip-arrow": {
                      color: "warning.main",
                    },
                  },
                },
              }}
              arrow
              placement="right"
              title="Vencida"
              open={Boolean(overdue)}
            >
              <Typography
                variant="body2"
                {...(overdue && { color: "warning.main" })}
              >
                {endDate}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {blue && green && (
        <TableContainer>
          <Table>
            <TableHead
              sx={{
                backgroundColor: "primary.main",
              }}
            >
              <TableRow>
                <TableCell sx={{ color: "white" }}>Modalidade</TableCell>
                <TableCell sx={{ color: "white" }}>Posto tatrifário</TableCell>

                <Tooltip
                  arrow
                  placement="top"
                  title="Tarifa de uso do sistema de distribuição"
                >
                  <TableCell sx={{ color: "white" }}>TUSD R$/kW</TableCell>
                </Tooltip>

                <Tooltip
                  arrow
                  placement="top"
                  title="Tarifa de uso do sistema de distribuição"
                >
                  <TableCell sx={{ color: "white" }}>TUSD R$/MWh</TableCell>
                </Tooltip>
                <Tooltip arrow placement="top" title="Tarifa de energia">
                  <TableCell sx={{ color: "white" }}>TE R$/MWh</TableCell>
                </Tooltip>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell
                  rowSpan={2}
                  sx={{
                    backgroundColor: "RGBA(10, 92, 103, 0.12)",
                  }}
                >
                  Azul
                </TableCell>
                <TableCell>Ponta</TableCell>

                <TableCell>{blue.peakTusdInReaisPerKw}</TableCell>
                <TableCell>{blue.peakTusdInReaisPerMwh}</TableCell>
                <TableCell>{blue.peakTeInReaisPerMwh}</TableCell>
              </TableRow>

              <TableRow
                sx={{
                  backgroundColor: "RGBA(10, 92, 103, 0.12)",
                }}
              >
                <TableCell>Fora ponta</TableCell>

                <TableCell>{blue.offPeakTusdInReaisPerKw}</TableCell>
                <TableCell>{blue.offPeakTusdInReaisPerMwh}</TableCell>
                <TableCell>{blue.offPeakTeInReaisPerMwh}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  rowSpan={3}
                  sx={{
                    backgroundColor: "RGBA(10, 92, 103, 0.12)",
                  }}
                >
                  Verde
                </TableCell>
                <TableCell>NA</TableCell>

                <TableCell>{green.naTusdInReaisPerKw}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>

              <TableRow
                sx={{
                  backgroundColor: "RGBA(10, 92, 103, 0.12)",
                }}
              >
                <TableCell>Ponta</TableCell>

                <TableCell>-</TableCell>
                <TableCell>{green.peakTusdInReaisPerMwh}</TableCell>
                <TableCell>{green.peakTeInReaisPerMwh}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Fora ponta</TableCell>

                <TableCell>-</TableCell>
                <TableCell>{green.offPeakTusdInReaisPerMwh}</TableCell>
                <TableCell>{green.offPeakTeInReaisPerMwh}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default DistributorContentTariffsTable;
