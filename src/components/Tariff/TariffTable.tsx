import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import React, { Fragment } from 'react'

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

      <TableContainer>
        <Table>
          <colgroup>
            <col style={{ width: '20%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <TableHead >
            <TableRow sx={{ background: '#555555' }}>
              <TableCell sx={{ borderStyle: 'solid', borderWidth: '0 1px 0 0', borderColor: '#fff', color: '#fff' }} align='center'>Posto</TableCell>
              <TableCell sx={{ borderStyle: 'solid', borderWidth: '0 1px 0 0', borderColor: '#fff', color: '#fff' }} align='center'>Modalidade</TableCell>
              <TableCell sx={{ borderStyle: 'solid', borderWidth: '0 1px 0 0', borderColor: '#fff', color: '#fff' }}>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                  <Box display='flex' justifyContent='space-between' alignItems='center' width='30%'>
                    <Typography>
                      TUSD
                    </Typography>
                    <InfoIcon />
                  </Box>
                  <Box display='flex' justifyContent='space-between' width='80%'>
                    <Box>
                      R$/kW
                    </Box>
                    <Box>
                      R$/MWh
                    </Box>
                  </Box>
                </Box>
              </TableCell>
              <TableCell sx={{ color: '#fff' }}>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                  <Box display='flex' justifyContent='space-between' alignItems='center' width='30%'>
                    <Box>TE</Box> <InfoIcon />
                  </Box>
                  <Box>R$/MWh</Box>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Fragment>
              <TableRow sx={{ background: '#999999' }}>
                <TableCell rowSpan={3} align='center' sx={{ color: '#fff' }}> Azul</TableCell>
              </TableRow>
              <TableRow sx={{ background: '#EEEEEE' }}>
                <TableCell align='center'> Ponta</TableCell>
                <TableCell>
                  <Box display='flex' justifyContent='space-between' width='80%' m='0 auto'>
                    <Box>90,43</Box>
                    <Box>118,90 </Box>
                  </Box>
                </TableCell>
                <TableCell align='center'>418,67</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'> Fora Ponta</TableCell>
                <TableCell>
                  <Box display='flex' justifyContent='space-between' width='80%' m='0 auto'>
                    <Box>90,43</Box>
                    <Box>118,90 </Box>
                  </Box>
                </TableCell>
                <TableCell align='center'>418,67</TableCell>
              </TableRow>
            </Fragment>
            <Fragment>
              <TableRow sx={{ background: '#999999' }}>
                <TableCell rowSpan={4} align='center' sx={{ color: '#fff' }}>Verde</TableCell>
              </TableRow>
              <TableRow sx={{ background: '#EEEEEE' }}>
                <TableCell align='center'> Ponta</TableCell>
                <TableCell>
                  <Box display='flex' justifyContent='space-between' width='80%' m='0 auto'>
                    <Box>90,43</Box>
                    <Box>118,90 </Box>
                  </Box>
                </TableCell>
                <TableCell align='center'>418,67</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'> Fora Ponta</TableCell>
                <TableCell>
                  <Box display='flex' justifyContent='space-between' width='80%' m='0 auto'>
                    <Box>90,43</Box>
                    <Box>118,90 </Box>
                  </Box>
                </TableCell>
                <TableCell align='center'>418,67</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'> NA</TableCell>
                <TableCell>
                  <Box display='flex' justifyContent='space-between' width='80%' m='0 auto'>
                    <Box>90,43</Box>
                    <Box>118,90 </Box>
                  </Box>
                </TableCell>
                <TableCell align='center'>418,67</TableCell>
              </TableRow>
            </Fragment>
          </TableBody>
        </Table>
      </TableContainer>



    </Box >
  )
}
