import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { invoices } from '@/mocks/invoices';
import { InvoicesYear } from '@/types/invoices';
import DoneIcon from '@mui/icons-material/Done';

export const InvoiceTable = () => {
  const buttonStyle = { borderRadius: 50, textTransform: 'none', marginLeft: 1 }
  const [invoicesYearActive, setInvoicesYearActive] = useState(0);

  useEffect(() => {
    setInvoicesYearActive(invoices[0].year)
  }, [])

  const handlerClick = (year: number) => {
    setInvoicesYearActive(year)
  }

  return (
    <Box >
      <Card>
        <CardContent>
          <Box display='flex' alignItems='center'>
            <Typography sx={{ marginRight: 2 }}>Mostrar:</Typography>
            <Button color='primary' variant="outlined" sx={buttonStyle}>Pendentes (3)</Button>
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

    </Box >
  )
}
