import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/system';
import { Button, createTheme, IconButton, ThemeProvider, Typography } from '@mui/material';
import { invoices } from '@/mocks/invoices';
import { InvoicesYear } from '@/types/invoices';
import DoneIcon from '@mui/icons-material/Done';
import { DataGrid, GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import InsightsIcon from '@mui/icons-material/Insights';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';

interface TableValues {
  id: string,
  isAtypical: React.ReactNode,
  consumption_peak: number,
  consumption_off_peak: number,
  demand_peak: number,
  demand_off_peak: number,
  value: number
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
  //const allMonthsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const curretMonth = new Date('2023-12-18').getMonth() + 1
  console.log("Mes atual", curretMonth)
  //const [pendingMonth, setPendingMonth] = useState(0)

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

  const getTableValues = (year: number) => {
    const activeInvoicesYear = invoices.find(invoice => invoice.year === year)
    const rows = activeInvoicesYear?.invoicesYear.map((invoice) => {
      const date = new Date();
      date.setMonth(invoice.mounthNumber - 1)
      let mounth = date.toLocaleString('pt-BR', { month: 'long' })
      mounth = mounth.charAt(0).toUpperCase() + mounth.slice(1);
      return {
        id: mounth,
        consumption_peak: invoice.consumption_peak,
        isAtypical: invoice.isAtypical,
        consumption_off_peak: invoice.consumption_off_peak,
        demand_peak: invoice.demand_peak,
        demand_off_peak: invoice.demand_off_peak,
        value: invoice.invoice_value
      }
    })
    setTableValues(rows)
  }

  const handleEdit = (id: number) => {
    console.log("@handleEdit-ID", id)
  }

  const handleRemove = (id: number) => {
    console.log("@handleRemove-ID", id)
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Mês',
      flex: 2,
      type: 'string',
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'header',
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
      groupId: 'consumption',
      headerName: 'Consumo (kWh)',
      headerClassName: 'header-column-group',
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
            backgroundColor: '#0A5C67',
            color: '#fff',

          },
          '& .header-column-group': {
            backgroundColor: '#DDE8E9',
          },
          '& .risk-border': {
            borderRight: '3px solid #000'
          }
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
        />


      </Box>
      <Button
        startIcon={<WarningIcon />}
        variant='contained'
        color={'secondary'}
        sx={InvoiceButtonStyle}>
        <Typography sx={{ fontWeight: 'bold' }}>Lançar setembro</Typography>
      </Button>

    </Box >
  )
}
