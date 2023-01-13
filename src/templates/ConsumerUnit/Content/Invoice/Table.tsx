import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Box, Button } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnGroupingModel,
  GridInitialState,
} from "@mui/x-data-grid";
import {
  CancelRounded,
  CheckCircleOutlineRounded,
  InsightsRounded,
  WarningRounded,
} from "@mui/icons-material";

import { useFetchInvoicesQuery } from "@/api";
import {
  selectActiveConsumerUnitId,
  selectConsumerUnitInvoiceActiveFilter,
  selectConsumerUnitInvoiceDataGridRows,
  setConsumerUnitInvoiceDataGridRows,
  setEnergyBillEdiFormParams,
  setIsEnergyBillCreateFormOpen,
} from "@/store/appSlice";
import { ConsumerUnitInvoiceFilter } from "@/types/app";
import {
  InvoiceDataGridRow,
  InvoicePayload,
  InvoicesPayload,
} from "@/types/consumerUnit";

const getMonthFromNumber = (month: number, shouldCapitalize?: boolean) => {
  const date = new Date().setMonth(month);
  const monthFullName = format(date, "MMMM", { locale: ptBR });

  if (!shouldCapitalize) {
    return monthFullName;
  }

  return monthFullName.charAt(0).toUpperCase() + monthFullName.slice(1);
};

const initialState: GridInitialState = {
  sorting: { sortModel: [{ field: "month", sort: "asc" }] },
};

const getFilteredInvoices = (
  invoicesPayload: InvoicesPayload,
  activeFilter: ConsumerUnitInvoiceFilter
) => {
  if (activeFilter === "pending") {
    return Object.values(invoicesPayload)
      .flat()
      .filter(({ isEnergyBillPending }) => isEnergyBillPending);
  }

  return invoicesPayload[activeFilter];
};

const getDataGridRows = (
  invoicesPayload: InvoicePayload[],
  activeFilter: ConsumerUnitInvoiceFilter
): InvoiceDataGridRow[] => {
  return invoicesPayload.map(
    ({ month, year, isEnergyBillPending, energyBill }) => ({
      ...energyBill,
      id: parseInt(`${year}${month >= 10 ? month : "0" + month}`),
      ...(energyBill && { energyBillId: energyBill.id }),
      month,
      year,
      isEnergyBillPending,
      activeFilter,
    })
  );
};

const NoRowsOverlay = () => (
  <Box display="flex" justifyContent="center" pt={3}>
    Não há faturas para o filtro selecionado
  </Box>
);

const ConsumerUnitInvoiceContentTable = () => {
  const dispatch = useDispatch();
  const consumerUnitId = useSelector(selectActiveConsumerUnitId);

  const { data: invoicesPayload } = useFetchInvoicesQuery(
    consumerUnitId ?? skipToken
  );
  const activeFilter = useSelector(selectConsumerUnitInvoiceActiveFilter);
  const dataGridRows = useSelector(selectConsumerUnitInvoiceDataGridRows);

  const columns: GridColDef<InvoiceDataGridRow>[] = [
    {
      field: "month",
      headerName: "Mês",
      headerAlign: "left",
      align: "left",
      flex: 1,
      valueGetter: ({ row: { id } }) => id,
      renderCell: ({ row }) => renderMonthCell(row),
      colSpan: ({ row: { isEnergyBillPending } }) => {
        if (isEnergyBillPending) {
          return columns.length;
        }
      },
    },
    {
      field: "isAtypical",
      headerAlign: "center",
      align: "center",
      flex: 0,
      renderHeader: () => <InsightsRounded />,
      renderCell: ({ row: { isAtypical, energyBillId } }) => {
        if (energyBillId === undefined) {
          return "";
        }

        if (isAtypical) {
          return <CancelRounded />;
        }

        return <CheckCircleOutlineRounded />;
      },
    },
    {
      field: "peakConsumptionInKwh",
      headerClassName: "MuiDataGrid-columnHeaderMain",
      headerName: "Ponta",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "offPeakConsumptionInKwh",
      headerClassName: "MuiDataGrid-columnHeaderMain",
      headerName: "Fora Ponta",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "peakMeasuredDemandInKw",
      headerClassName: "MuiDataGrid-columnHeaderMain",
      headerName: "Ponta",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "offPeakMeasuredDemandInKw",
      headerClassName: "MuiDataGrid-columnHeaderMain",
      headerName: "Fora Ponta",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
    {
      field: "invoiceInReais",
      headerClassName: "MuiDataGrid-columnHeaderMain",
      headerName: "Valor (R$)",
      headerAlign: "right",
      align: "right",
      flex: 1,
    },
  ];

  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: "consumption",
      headerName: "Consumo (kWh)",
      headerAlign: "center",
      children: [
        { field: "peakConsumptionInKwh" },
        { field: "offPeakConsumptionInKwh" },
      ],
    },
    {
      groupId: "demand",
      headerName: "Demanda (kW)",
      headerAlign: "center",
      children: [
        { field: "peakMeasuredDemandInKw" },
        { field: "offPeakMeasuredDemandInKw" },
      ],
    },
  ];

  useEffect(() => {
    if (!invoicesPayload) {
      return;
    }

    const filteredInvoices = getFilteredInvoices(invoicesPayload, activeFilter);
    const dataGridRows = getDataGridRows(filteredInvoices, activeFilter);

    dispatch(setConsumerUnitInvoiceDataGridRows(dataGridRows));
  }, [activeFilter, invoicesPayload, dispatch]);

  const handleOpenAddEnergyBillForm = useCallback((month: number, year: number) => {
    dispatch(setEnergyBillEdiFormParams({ month, year }))
    dispatch(setIsEnergyBillCreateFormOpen(true))
  }, [dispatch])

  const renderMonthCell = useCallback((invoiceRow: InvoiceDataGridRow) => {
    const { activeFilter, isEnergyBillPending, month, year } = invoiceRow;

    const buttonLabel =
      "Lançar " +
      getMonthFromNumber(month) +
      `${activeFilter === "pending" ? " — " + year : ""}`;

    if (isEnergyBillPending) {
      return (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleOpenAddEnergyBillForm(month, year)}
          startIcon={<WarningRounded />}
        >
          {buttonLabel}
        </Button>
      );
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const isCurrentMonthInvoice = year === currentYear && month === currentMonth;

    if (isCurrentMonthInvoice) {
      return <Button variant="contained">{buttonLabel}</Button>;
    }

    return getMonthFromNumber(month, true);
  }, [handleOpenAddEnergyBillForm]);

  return (
    <DataGrid
      experimentalFeatures={{ columnGrouping: true }}
      columnGroupingModel={columnGroupingModel}
      columns={columns}
      rows={dataGridRows}
      initialState={initialState}
      components={{ NoRowsOverlay }}
      autoHeight
      hideFooter
      disableColumnMenu
    />
  );
};

export default ConsumerUnitInvoiceContentTable;
