import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import {
  setIsConsumerUnitEditFormOpen,
  setIsConsumerUnitRenewContractFormOpen,
} from "@/store/appSlice";

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
    <Box display="flex" justifyContent="center">
      <Card sx={{ maxWidth: "450px" }}>
        <CardHeader title="Mocked Neoenergia" />

        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Typography variant="body2" color="GrayText">
                Início
              </Typography>

              <Typography variant="body1">09/09/2009</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="GrayText">
                Modalidade tarifária
              </Typography>

              <Typography variant="body1">Azul</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="GrayText">
                Tensão de fornecimento
              </Typography>

              <Typography variant="body1">25 kV - Subgrupo A4</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2">Demanda contratada</Typography>

              <Box display="flex">
                <Box>
                  <Typography variant="body2" color="GrayText">
                    Ponta
                  </Typography>

                  <Typography variant="body1">270 kW</Typography>
                </Box>

                <Box ml={3}>
                  <Typography variant="body2" color="GrayText">
                    Fora Ponta
                  </Typography>

                  <Typography variant="body1">150 kW</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button size="small" onClick={handleEditFormClick}>
            Editar
          </Button>

          <Button size="small" onClick={handleRenewContractClick}>
            Renovar contrato
          </Button>
        </CardActions>
      </Card>

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
              <strong>Editar</strong> na tela anterior.
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
    </Box>
  );
};

export default ConsumerUnitContractContent;
