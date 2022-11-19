import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Divider, Typography } from '@mui/material'
import { DistributorConsumerUnits, DistributorPropsTariffs } from '../../types/distributor'
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link'
import { Link as MUILink } from '@mui/material';
import { TariffTable } from '../Tariff/TariffTable';
import { mockedDistributor } from '../../mocks/mockedDistributor';
import { mockedDistributorComsumerUnit } from '../../mocks/mockedDistributor';


export const DistributorInfo = () => {
  const router = useRouter();

  const [currentDist, setCurrentDist] = useState<DistributorPropsTariffs>()
  const [currentConsumerUnitList, setCurrentConsumerUnitList] = useState<DistributorConsumerUnits>()
  const [titleTariffs, setTitleTariffs] = useState('Tarifas')

  const createTitleTariffs = () => {
    if (currentDist?.tariffs.length === 0) setTitleTariffs('');
    else if (currentDist?.tariffs.length === 1) {
      const tarrif = currentDist.tariffs[0];
      if (tarrif.overdue) setTitleTariffs(`Tarifas do subgrupo ${tarrif.subgroup} pendentes`)
      else setTitleTariffs(`Tarifas do subgrupo ${tarrif.subgroup}`)
    }
    else if (currentDist?.tariffs.length !== 1) {
      const overdue = currentDist?.tariffs.find(tariff => tariff.overdue === true);
      if (overdue === undefined) setTitleTariffs('Tarifas')
      else setTitleTariffs('Tarifas com atualizações pendentes')
    }
  }

  useEffect(() => {
    const { id } = router.query
    setCurrentDist(mockedDistributor[Number(id) - 1])
    setCurrentConsumerUnitList(mockedDistributorComsumerUnit[Number(id) - 1])
    createTitleTariffs()
  }, [])

  useEffect(() => {
    createTitleTariffs()
  }, [currentDist])

  useEffect(() => {
    const { id } = router.query
    setCurrentDist(mockedDistributor[Number(id) - 1])
    setCurrentConsumerUnitList(mockedDistributorComsumerUnit[Number(id) - 1])
  }, [router.asPath])

  return (
    <Box display={'flex'} justifyContent="space-between" width={'100%'} mt={3}>
      <Box flex={7} mr={5} display={currentDist?.consumer_units === 0 || currentDist?.disabled ? 'none' : ''}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant='h5'>{titleTariffs}</Typography>
          <EditIcon></EditIcon>
        </Box>
        <Divider />
        <TariffTable />
      </Box>
      <Box flex={4}>
        <Typography variant='h5'>
          Unidades Consumidoras
          <Divider />
          {currentDist?.consumer_units === 0 ? (
            <Box>
              <Box ml={3} mt={2} mb={3}>
                <Typography>Nenhuma</Typography>
              </Box>
              <Typography><Box sx={{ color: 'text.secondary' }}>Para ver Tarifas, selecione esta distribuidora no contrato com uma Unidade Consumidora.</Box></Typography>
            </Box>
          ) :
            currentConsumerUnitList?.subgroups[0].consumer_units?.map(consumer_unit => {
              return <ul>
                <li><Typography><Link href={`/uc/${consumer_unit.id}`}><MUILink sx={{ cursor: 'pointer' }} color="inherit">{consumer_unit.name}</MUILink></Link></Typography></li>
              </ul>
            })
          }

          {currentDist?.disabled &&
            <Box sx={{ color: 'text.secondary' }} >
              <Typography>
                Apenas distribuidoras ativas exibem informações de tarifa.
              </Typography>
            </Box>
          }
        </Typography>
      </Box>
    </Box>
  )
}