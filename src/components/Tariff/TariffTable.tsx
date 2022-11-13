import { Box, Typography } from '@mui/material'
import React from 'react'

export const TariffTable = () => {
  return (
    <Box width={'100%'}>
      <Box display='flex' mt={2} width='30%' justifyContent={'space-between'}>
        <Box display='flex' flexDirection='column' >
          <Typography sx={{ color: 'text.secondary' }}>
            Inicio
          </Typography>
          <Typography>
            27/03/2020
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography sx={{ color: 'text.secondary' }}>
            Fim
          </Typography>
          <Typography>
            27/03/2022
          </Typography>
        </Box>
      </Box>



    </Box>
  )
}
