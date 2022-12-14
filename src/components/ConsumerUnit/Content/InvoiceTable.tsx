import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/system';
import { Button, createTheme, IconButton, ThemeProvider, Typography } from '@mui/material';
import { invoices } from '@/mocks/invoices';
import { InvoicesYear } from '@/types/invoices';
import DoneIcon from '@mui/icons-material/Done';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import InsightsIcon from '@mui/icons-material/Insights';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TableValues {
  id: string,
  analyzable: React.ReactNode,
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
  const [invoicesYearActive, setInvoicesYearActive] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tableValues, setTableValues] = useState<Array<TableValues>>()

  //const allMounths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

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
        analyzable: invoice.analyzable,
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
      width: 150,
      type: 'string',
      headerAlign: 'center',
      headerClassName: 'header',
    },
    {
      field: 'analyzable',
      renderHeader: () => <InsightsIcon />,
      renderCell: (params) => {
        if (params.row.analyzable) return (<CheckCircleOutlineIcon />)
        else return (<CancelIcon />)
      },
      width: 90,
      sortable: false,
      type: 'boolean',
      headerAlign: 'center',
      headerClassName: 'header',
    },
    {
      field: 'consumption_peak',
      headerName: 'Ponta',
      width: 150,
      sortable: false,
      type: 'number',
      headerAlign: 'center',
      headerClassName: 'header',
    },
    {
      field: 'consumption_off_peak',
      headerName: 'Fora Ponta',
      width: 150,
      type: 'number',
      sortable: false,
      headerAlign: 'center',
      headerClassName: 'header',

    },
    {
      field: 'demand_peak',
      headerName: 'Ponta',
      type: 'number',
      width: 150,
      sortable: false,
      headerAlign: 'center',
      headerClassName: 'header',
    },
    {
      field: 'demand_off_peak',
      headerName: 'Fora Ponta',
      width: 150,
      type: 'number',
      sortable: false,
      headerAlign: 'center',
      headerClassName: 'header',
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 150,
      type: 'number',
      sortable: false,
      headerAlign: 'center',
      headerClassName: 'header',
    },
    {
      field: ' ',
      headerName: ' ',
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
      width: 150,
      type: 'number',
      sortable: false,
      headerAlign: 'center',
      headerClassName: 'header',
    }
  ];
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
          height: 550,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          minHeight: '100%',
          '& .header': {
            backgroundColor: '#0A5C67',
            color: '#fff',
          }
        }}
      >

        <DataGrid
          rows={tableValues || []}
          columns={columns}
          pageSize={12}
          rowsPerPageOptions={[12]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />

      </Box>

    </Box >
  )
}
