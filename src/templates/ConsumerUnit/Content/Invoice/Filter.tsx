import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/dist/query";

import { Box, Button, Paper, Typography } from "@mui/material";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";

import { useFetchInvoicesQuery } from "@/api";
import {
  selectActiveConsumerUnitId,
  selectConsumerUnitInvoiceActiveFilter,
  setConsumerUnitInvoiceActiveFilter,
} from "@/store/appSlice";
import { ConsumerUnitInvoiceFilter } from "@/types/app";

const ConsumerUnitInvoiceContentFilter = () => {
  const dispatch = useDispatch();
  const consumerUnitId = useSelector(selectActiveConsumerUnitId);

  const { data: invoices } = useFetchInvoicesQuery(consumerUnitId ?? skipToken);
  const invoiceActiveFilter = useSelector(
    selectConsumerUnitInvoiceActiveFilter
  );
  const [invoiceFilters, setInvoiceFilters] = useState<string[]>([]);

  useEffect(() => {
    if (!invoices) {
      return;
    }

    // 2022, 2021, 2020 instead of 2020, 2021, 2022
    setInvoiceFilters(Object.keys(invoices).reverse());
  }, [invoices]);

  const handleFilterButtonClick = (filter: ConsumerUnitInvoiceFilter) => () => {
    dispatch(setConsumerUnitInvoiceActiveFilter(filter));
  };

  return (
    <Paper>
      <Box display="flex" alignItems="center" px={2} py={1.5}>
        <Typography variant="caption">Mostrar:</Typography>

        <Box ml={2}>
          <Button
            sx={{ borderRadius: 10 }}
            size="small"
            disableElevation
            variant={
              invoiceActiveFilter === "pending" ? "contained" : "outlined"
            }
            onClick={handleFilterButtonClick("pending")}
            {...(invoiceActiveFilter === "pending" && {
              startIcon: <DoneRoundedIcon />,
            })}
          >
            Pendentes
          </Button>
        </Box>

        {invoiceFilters.map((year) => (
          <Box ml={2} key={year}>
            <Button
              sx={{ borderRadius: 10 }}
              size="small"
              disableElevation
              variant={invoiceActiveFilter === year ? "contained" : "outlined"}
              {...(invoiceActiveFilter === year && {
                startIcon: <DoneRoundedIcon />,
              })}
              onClick={handleFilterButtonClick(year)}
            >
              {year}
            </Button>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default ConsumerUnitInvoiceContentFilter;
