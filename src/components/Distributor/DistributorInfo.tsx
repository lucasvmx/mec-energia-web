import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Divider, Typography } from '@mui/material'
import DistributorProps from '../../types/distributor'
import { SubGroup } from '../../types/tariffs';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link'
import { Link as MUILink } from '@mui/material';
import { TariffTable } from '../Tariff/TariffTable';
import { mockedDistributor } from '../../mocks/mockedDistributor';


export const DistributorInfo = () => {
  const [value, setValue] = useState(0);
  const [subgroups, setSubgroups] = useState(Array<SubGroup>)
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [currentDist, setCurrentDist] = useState<DistributorProps | undefined>()

  const getAllSubgroups = () => {
    const sub: Array<SubGroup> = [];
    currentDist?.tariffs?.forEach(tariff => {
      if (sub.findIndex(sub => sub.subgroup === tariff.subgroup) === -1) {
        sub.push({
          subgroup: tariff.subgroup,
          pending: tariff.end < new Date()
        });
      }
      else {
        const index = sub.findIndex(sub => sub.subgroup === tariff.subgroup);
        const pending = tariff.end < new Date()
        if (pending && !sub[index].pending) sub[index].pending = pending;
      }
    })
    setSubgroups(sub)

  }

  useEffect(() => {
    setLoading(true)
    const { id } = router.query
    setCurrentDist(mockedDistributor[Number(id) - 1])
    getAllSubgroups()
    setLoading(false)
  }, [])

  useEffect(() => {
    setLoading(true);
    const { id } = router.query
    setCurrentDist(mockedDistributor[Number(id) - 1])
    setLoading(false)
  }, [router.asPath])

  useEffect(() => {
    setLoading(true)
    getAllSubgroups()
    setLoading(false)
  }, [currentDist])

  return (
    <Box display={'flex'} justifyContent="space-between" width={'100%'} mt={3}>
      <Box flex={7} mr={5} display={currentDist?.linkedUC?.length === 0 ? 'none' : ''}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant='h5'> Tarifas</Typography>
          <EditIcon></EditIcon>
        </Box>
        <Divider />
        <TariffTable />
      </Box>
      <Box flex={4}>
        <Typography variant='h5'>
          Unidades Consumidoras
          <Divider />
          {currentDist?.linkedUC?.length === 0 && (
            <Box>
              <Box ml={3} mt={2} mb={3}>
                <Typography>Nenhuma</Typography>
              </Box>
              <Typography><Box sx={{ color: 'text.secondary' }}>Para ver Tarifas, selecione esta distribuidora no contrato com uma Unidade Consumidora.</Box></Typography>
            </Box>
          )}
          {currentDist?.linkedUC?.map(uc => {
            return <ul>
              <li><Typography><Link href="/uc/1"><MUILink sx={{ cursor: 'pointer' }} color="inherit">{uc}</MUILink></Link></Typography></li>
            </ul>
          })}
        </Typography>
      </Box>
    </Box>
  )
}
