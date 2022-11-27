import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { useDispatch } from "react-redux";
import {
  setIsConsumerUnitEditFormOpen,
  setIsConsumerUnitRenewContractFormOpen,
} from "../../../store/appSlice";
import { useState } from "react";

const ConsumerUnitContractContent = () => {
  const dispatch = useDispatch();
  const [isRenewContractDialogOpen, setIsRenewContractDialogOpen] =
    useState(false);

  const handleCloseRenewContractDialog = () => {
    setIsRenewContractDialogOpen(false);
  };

  const handleRenewContractClick = () => {
    setIsRenewContractDialogOpen(true);
  };

  const handleRenewContractConfirm = () => {
    setIsRenewContractDialogOpen(false);
    dispatch(setIsConsumerUnitRenewContractFormOpen(true));
  };

  const handleEditFormClick = () => {
    dispatch(setIsConsumerUnitEditFormOpen(true));
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="space-between">
          <Box display="flex">
            <Typography variant="h4">Neoenergia</Typography>

            <IconButton disabled>
              <LaunchIcon />
            </IconButton>
          </Box>

          <Box display="flex" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              onClick={handleRenewContractClick}
            >
              Renovar
            </Button>

            <Box ml={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleEditFormClick}
              >
                Corrigir
              </Button>
            </Box>
          </Box>
        </Box>

        <Divider />

        <Box pt={3}>
          <Typography variant="body2">Início</Typography>
          <Typography variant="body1">05/01/2022</Typography>
        </Box>

        <Box pt={3}>
          <Typography variant="body2">Tensão de fornecimento</Typography>
          <Typography variant="body1">25 kV - Subgrupo A4</Typography>
        </Box>

        <Box pt={3}>
          <Typography variant="body2">Modalidade tarifária</Typography>
          <Typography variant="body1">Azul</Typography>
        </Box>

        <Box pt={3}>
          <Typography>Demanda Contratada</Typography>

          <Box pt={1} display="flex">
            <Box>
              <Typography variant="body2">Ponta</Typography>
              <Typography variant="body1">270 kW</Typography>
            </Box>

            <Box ml={5}>
              <Typography variant="body2">Fora Ponta</Typography>
              <Typography variant="body1">150 kW</Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      <Dialog
        open={isRenewContractDialogOpen}
        onClose={handleCloseRenewContractDialog}
        maxWidth="xs"
      >
        <DialogTitle>Iniciar renovação de contrato?</DialogTitle>

        <DialogContent>
          <Typography>
            Renove apenas em caso de alterações legais ou de ter recebido um
            novo contrato.
          </Typography>

          <Box pt={2}>
            <DialogContentText>
              Para corrigir erros no contrato vigente, use a opção{" "}
              <strong>Corrigir</strong> na tela anterior.
            </DialogContentText>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleCloseRenewContractDialog}>
            Cancelar
          </Button>

          <Button onClick={handleRenewContractConfirm}>
            Iniciar renovação
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConsumerUnitContractContent;
