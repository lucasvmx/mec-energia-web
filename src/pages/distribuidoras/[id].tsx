import { NextPage } from "next";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slider,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import HelpIcon from '@mui/icons-material/Help';
import FlashOffIcon from '@mui/icons-material/FlashOff';
import BusinessIcon from "@mui/icons-material/Business";
import theme from "../../theme";
import DefaultTemplate from "../../templates/Default";
import DistributorCardGrid from "../../components/Distributor/DistributorCardGrid";
import DistributorContainer from "../../components/Distributor/DistributorContainer";
import { mockedDistributor } from "../../mocks/mockedDistributor";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DistributorPropsTariffs } from "../../types/distributor";
import { setIsDistributorCreateFormOpen, setIsDistributorEditFormOpen } from "../../store/appSlice";
import { useDispatch } from "react-redux";
import DistributorCreateForm from "../../components/Distributor/Form/DistributorCreateForm";
import DistributorEditForm from "../../components/Distributor/Form/DistributorEditForm";
import TariffCreateForm from "../../components/Tariff/Form/TariffCreateForm";

const DistributorPage: NextPage = () => {
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [currentDistributor, setCurrentDistributor] = useState<DistributorPropsTariffs | undefined>()
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();
  const [slidevalue, setSlideValue] = useState<number>(0);
  const [isErrorColor, setIsErrorColor] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    const { id } = router.query
    setCurrentDistributor(mockedDistributor[Number(id) - 1])
    setIsErrorColor(false)
  }, [router.query])

  useEffect(() => {
    const { id } = router.query
    setCurrentDistributor(mockedDistributor[Number(id) - 1])
  }, [router.asPath])

  useEffect(() => {
    if (slidevalue === 100) setIsErrorColor(true)
    else setIsErrorColor(false)
  }, [slidevalue])

  useEffect(() => {
    if (openDelete === false) setSlideValue(0)
  }, [openDelete])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleCreateDistributorClick = () => {
    dispatch(setIsDistributorCreateFormOpen(true));
  };

  const handleEditDistributorClick = () => {
    dispatch(setIsDistributorEditFormOpen(true));
  };

  const handleSlideChange = (event: Event, newValue: number | number[]) => {
    setSlideValue(newValue as number);
  };

  return (
    <DefaultTemplate disableGutters>
      <Box display="flex" height="100%">
        {isDesktop && (
          <Box width="350px" borderRight="1px solid rgba(0, 0, 0, 0.12)">
            <Toolbar
              sx={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                justifyContent: "end",
              }}
            >
              <Button
                variant="outlined"
                onClick={handleCreateDistributorClick}>Adicionar</Button>
            </Toolbar>

            <Box position="relative" width="350px" height="calc(100% - 64px)">
              <Box sx={{ inset: 0 }} position="absolute" overflow="auto" p={3}>
                <DistributorCardGrid />
              </Box>
            </Box>
          </Box>
        )}

        <Box p={3} width='90%'>
          <Box display="flex" justifyContent={"space-between"}>
            <Box display="flex" justifyContent={"space-between"}>
              <Typography variant="h3">{currentDistributor?.name}</Typography>
              <Box pl={5}>
                <IconButton onClick={handleEditDistributorClick} color="inherit">
                  <EditIcon fontSize="large" />
                </IconButton>
                {currentDistributor?.consumerUnits === 0 &&
                  <IconButton color="inherit" onClick={handleClickDeleteOpen}>
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                }

              </Box>
            </Box>
            <Box pr={3}>
              {
                currentDistributor?.isActive &&
                <IconButton
                  color="inherit"
                  onClick={handleClickOpen}>
                  <HelpIcon fontSize="large" />
                </IconButton>
              }
              {
                !currentDistributor?.isActive &&
                <Box mt={2} sx={{ color: 'text.disabled' }} display="flex" justifyContent="center" alignItems="center">
                  <FlashOffIcon />
                  <Typography variant="h5" fontWeight={'medium'}>
                    DESATIVADA
                  </Typography>

                </Box>

              }

            </Box>


          </Box>

          <Box mt={1}>
            <Typography>
              CNPJ: <strong>{currentDistributor?.cnpj}</strong>
            </Typography>
          </Box>
          <Box mt={5} width="90%" m="auto">
            <DistributorContainer />
          </Box>
        </Box>


        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={'xs'}
        >
          <DialogTitle id="alert-dialog-title">
            Subgrupos e Tarifas
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography pb={1}>
                Os subgrupos correspondem à tensão de fornecimento contratada para uma Unidade Consumidora. Apenas os subgrupos usados em Un. Consumidoras ativas precisam estar atualizados.
              </Typography>
              <Typography pb={1}>
                A vigência e os valores das tarifas são determinadas pela ANEEL. Os valores podem variar de um subgrupo a outro.
              </Typography>
              <Typography pb={1}>
                Veja o passo-a-passo a seguir para encontrar as informações de tarifa no site da ANEEL.
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>FECHAR</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openDelete}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={'xs'}>
          <DialogTitle id="alert-dialog-title">
            Apagar {currentDistributor?.name}?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography pb={1}>
                Os dados não poderão ser recuperados.
              </Typography>
              <Typography>
                Para apagar, arraste para a direita.
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Box display={'flex'} flexDirection='column'>
              <Box sx={{ width: 300 }}>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                  <BusinessIcon color={isErrorColor ? 'secondary' : 'primary'} />
                  <Slider color={isErrorColor ? 'secondary' : 'primary'} aria-label="Volume"
                    value={slidevalue}
                    onChange={handleSlideChange} />
                  <DeleteIcon color="secondary" />
                </Stack>
              </Box>
              <Box display={'flex'} justifyContent='flex-end'>
                <Button onClick={handleDeleteClose}>FECHAR</Button>
              </Box>
            </Box>
          </DialogActions>
        </Dialog>
        <DistributorCreateForm />
        <DistributorEditForm />
        <TariffCreateForm />
      </Box>
    </DefaultTemplate >
  );
};

export default DistributorPage;