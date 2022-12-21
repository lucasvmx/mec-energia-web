import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/system';
import { Button, createTheme, IconButton, ThemeProvider, Typography } from '@mui/material';
import { invoices } from '@/mocks/invoices';
import { Invoice, InvoicesYear } from '@/types/invoices';
import DoneIcon from '@mui/icons-material/Done';
import { DataGrid, GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import InsightsIcon from '@mui/icons-material/Insights';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import { setIsElectricityBillCreateFormOpen } from '@/store/appSlice';
import { useDispatch } from 'react-redux';
import CreateEditElectricityBillForm from '@/components/ElectricityBill/Form/CreateEditElectricityBillForm';

interface TableValues {
  id: number,
  month: string,
  isAtypical: React.ReactNode,
  consumption_peak: number,
  consumption_off_peak: number,
  demand_peak: number,
  demand_off_peak: number,
  value: number,
  isCurrent?: boolean
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
  },
});

export const InvoiceTable = () => {
  const buttonStyle = { borderRadius: 50, textTransform: 'none', marginLeft: 1 }
  const InvoiceButtonStyle = { textTransform: 'none' }
  const [invoicesYearActive, setInvoicesYearActive] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tableValues, setTableValues] = useState<Array<TableValues>>()
  const curretDate = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  }
  //const [pendingMonth, setPendingMonth] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    setInvoicesYearActive(invoices[0].year)
    getTableValues(invoices[0].year)
  }, [])

  useEffect(() => {
    getTableValues(invoicesYearActive)
  }, [invoicesYearActive])

  const handlerClick = (year: number) => {
    setInvoicesYearActive(year)
  }

  const getMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setMonth(monthNumber - 1)
    let month = date.toLocaleString('pt-BR', { month: 'long' })
    month = month.charAt(0).toUpperCase() + month.slice(1);
    return month
  }

  const getTableValues = (year: number) => {
    const activeInvoicesYear = invoices.find(invoice => invoice.year === year)
    const rows = activeInvoicesYear?.invoices.map((invoice) => {
      const date = new Date();
      date.setMonth(invoice.mounthNumber - 1)
      const month = getMonthName(invoice.mounthNumber)
      return {
        id: invoice.mounthNumber,
        month: month,
        consumption_peak: invoice.consumption_peak,
        isAtypical: invoice.isAtypical,
        consumption_off_peak: invoice.consumption_off_peak,
        demand_peak: invoice.demand_peak,
        demand_off_peak: invoice.demand_off_peak,
        value: invoice.invoice_value,
        isPending: invoice.isPending,
        currentMonthPending: invoice.currentMonthPending
      }
    })
    if (year === curretDate.year) {
      const hasCurrentMonth = activeInvoicesYear?.invoices.some(
        (invoice: Invoice) => invoice.mounthNumber === curretDate.month
      )
      if (!hasCurrentMonth) {
        const month = getMonthName(curretDate.month)
        rows?.push({
          id: curretDate.month,
          month: month,
          consumption_peak: 0,
          isAtypical: false,
          consumption_off_peak: 0,
          demand_peak: 0,
          demand_off_peak: 0,
          value: 0,
          isPending: false,
          currentMonthPending: true,
        })
      }
    }
    setTableValues(rows)
  }

  const handleEdit = (id: number) => {
    console.log("@handleEdit-ID", id)
  }

  const handleRemove = (id: number) => {
    console.log("@handleRemove-ID", id)
  }

  const handleCreateDistributorClick = () => {
    dispatch(setIsElectricityBillCreateFormOpen(true));
  };

  const columns: GridColDef[] = [
    {
      field: 'month',
      headerName: 'Mês',
      hideable: true,
      flex: 2,
      type: 'string',
      align: 'left',
      headerAlign: 'center',
      headerClassName: 'header',
      colSpan: (params) => {

        if (params.row.isPending || params.row.currentMonthPending) {
          return 8;
        }
        return undefined;
      },
      renderCell: (params) => {
        if (params.row.isPending) return (
          <Button
            startIcon={<WarningIcon />}
            variant='contained'
            color={'secondary'}
            sx={InvoiceButtonStyle}
            onClick={handleCreateDistributorClick}>
            <Typography sx={{ fontWeight: 'bold' }}>Lançar {params.row.month}</Typography>
          </Button>
        )
        if (params.row.currentMonthPending) return (
          <Button
            variant='contained'
            color={'primary'}
            sx={InvoiceButtonStyle}
            onClick={handleCreateDistributorClick}>
            <Typography sx={{ fontWeight: 'bold' }}>Lançar {params.row.month}</Typography>
          </Button>
        )
      }
    },
    {
      field: 'analyzable',
      renderHeader: () => <InsightsIcon />,
      renderCell: (params) => {
        if (params.row.isAtypical) return (<CancelIcon />)
        else return (<CheckCircleOutlineIcon />)
      },
      flex: 1,
      sortable: false,
      type: 'boolean',
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'header',
    },
    {
      field: 'consumption_peak',
      headerName: 'Ponta',
      flex: 2,
      sortable: false,
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header',
    },
    {
      field: 'consumption_off_peak',
      headerName: 'Fora Ponta',
      flex: 2,
      type: 'number',
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header',

    },
    {
      field: 'demand_peak',
      headerName: 'Ponta',
      type: 'number',
      flex: 2,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'header',
    },
    {
      field: 'demand_off_peak',
      headerName: 'Fora Ponta',
      flex: 2,
      type: 'number',
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'header',
    },
    {
      field: 'value',
      headerName: 'Value',
      flex: 2,
      type: 'number',
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'header',
    },
    {
      field: ' ',
      headerName: ' ',
      align: 'center',
      renderCell: (params) => {
        return (
          <>
            <ThemeProvider theme={theme}>
              <IconButton onClick={() => handleEdit(params.row.id)}>
                <EditIcon color='primary' />
              </IconButton>

              <IconButton onClick={() => handleRemove(params.row.id)}>
                <DeleteIcon color='primary' />
              </IconButton>

            </ThemeProvider>

          </>
        )
      },
      flex: 2,
      type: 'number',
      sortable: false,
      headerAlign: 'center',
      headerClassName: 'header',
    }
  ];

  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: 'gap',
      headerName: ' ',
      headerClassName: 'gap',
      children: [
        { field: 'month' },
        { field: 'analyzable' },
        { field: 'value' },
        { field: ' ' }
      ]

    },
    {
      groupId: 'consumption',
      headerName: 'Consumo (kWh)',
      headerClassName: 'header-column-group risk-border',
      headerAlign: 'center',
      renderHeaderGroup: ({ headerName }) => (
        <Typography variant='inherit'><strong>{headerName}</strong></Typography>
      ),
      children: [
        { field: 'consumption_peak' },
        { field: 'consumption_off_peak' }
      ]
    },
    {
      groupId: 'demand',
      headerName: 'Demanda (kWh)',
      headerClassName: 'header-column-group',
      headerAlign: 'center',
      renderHeaderGroup: ({ headerName }) => (
        <Typography variant='inherit'><strong>{headerName}</strong></Typography>
      ),
      children: [
        { field: 'demand_peak' },
        { field: 'demand_off_peak' }
      ]
    }
  ]

  return (
    <Box >
      <Box mb={3} >
        <Card>
          <CardContent>
            <Box display='flex' alignItems='center'>
              <Typography sx={{ marginRight: 2 }}>Mostrar:</Typography>
              <Button color='primary' variant="outlined" sx={buttonStyle}>Pendentes (2)</Button>
              {invoices.map((invoice: InvoicesYear) => {
                return (
                  <Button
                    onClick={() => handlerClick(invoice.year)}
                    key={invoice.year} color='primary'
                    variant={invoice.year === invoicesYearActive ? "contained" : "outlined"}
                    startIcon={invoice.year === invoicesYearActive ? <DoneIcon /> : null}
                    sx={buttonStyle}>
                    {invoice.year}
                  </Button>
                )
              })}
            </Box>
          </CardContent >
        </Card >

      </Box>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          minHeight: '100%',
          '& .header': {
            bgcolor: '#0A5C67',
            color: '#fff',

          },
          '& .header-column-group': {
            bgcolor: '#DDE8E9',
          },
          '& .gap': {
            bgcolor: '#EFF4F4',
            borderColor: '#EFF4F4'
          },
          '& .risk-border': {
            borderRight: '3px solid #EFF4F4',
          },
          '& .isPending': {
            bgcolor: '#EFE5E4',
            '&:hover': {
              bgcolor: '#E0C7C5'
            }
          },
          '& .even': {
            bgcolor: '#EFF4F4',
            '&:hover': {
              bgcolor: '#ABD3D3'
            }
          },
          '& .odd': {
            bgcolor: '#fff',
            '&:hover': {
              bgcolor: '#ABD3D3'
            }
          },
        }}
      >

        <DataGrid
          rows={tableValues || []}
          columns={columns}
          pageSize={12}
          hideFooter
          autoHeight
          disableColumnMenu
          rowsPerPageOptions={[12]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true, columnGrouping: true }}
          columnGroupingModel={columnGroupingModel}
          getRowClassName={(params) => {
            if (params.row.isPending) return 'isPending'
            if (params.row.id % 2 === 0) return 'even'
            if (params.row.id % 2 === 1) return 'odd'
            return ''
          }
          }
        />


      </Box>
      <CreateEditElectricityBillForm />
    </Box >
  )
}
