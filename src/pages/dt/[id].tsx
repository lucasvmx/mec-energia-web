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
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import HelpIcon from '@mui/icons-material/Help';
import FlashOffIcon from '@mui/icons-material/FlashOff';
import theme from "../../theme";
import DefaultTemplate from "../../templates/DefaultTemplate";
import DistributorCardGrid from "../../components/Distributor/DistributorCardGrid";
import DistributorContainer from "../../components/Distributor/DistributorContainer";
import { mockedDistributor } from "../../mocks/mockedDistributor";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DistributorProps from "../../types/distributor";

interface CurrentDist {
  name: string;
  cnpj: string;
}
const DistributorPage: NextPage = () => {
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [currentDistributor, setCurrentDistributor] = useState<DistributorProps | undefined>()
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query
    setCurrentDistributor(mockedDistributor[Number(id) - 1])
  }, [])

  useEffect(() => {
    const { id } = router.query
    setCurrentDistributor(mockedDistributor[Number(id) - 1])
  }, [router.asPath])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              <Button variant="outlined">Adicionar</Button>
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
              <Typography variant="h3">{currentDistributor?.title}</Typography>
              <Box pl={5}>
                <IconButton color="inherit">
                  <EditIcon fontSize="large" />
                </IconButton>
                {currentDistributor?.linkedUC?.length === 0 &&
                  <IconButton color="inherit">
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                }

              </Box>
            </Box>
            <Box pr={3}>
              {
                !currentDistributor?.disabled &&
                <IconButton
                  color="inherit"
                  onClick={handleClickOpen}>
                  <HelpIcon fontSize="large" />
                </IconButton>
              }
              {
                currentDistributor?.disabled &&
                <Box sx={{ color: 'text.disabled' }} display="flex" justifyContent="center" alignItems="center">
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
            Iniciar renovação de contrato?
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

      </Box>
    </DefaultTemplate >
  );
};

export default DistributorPage;