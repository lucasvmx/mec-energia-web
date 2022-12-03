import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsDistributorEditFormOpen, setIsDistributorEditFormOpen } from '../../../store/appSlice';
import { CreateDistributorForm, EditDistributorForm } from '../../../types/distributor';
import FormDrawer from '../../Form/Drawer';
import { PatternFormat } from 'react-number-format';

import {
  Controller, FormProvider, SubmitHandler, useForm,
} from "react-hook-form";
import { Box, Button, FormControlLabel, FormGroup, FormHelperText, Grid, Switch, TextField, Typography } from '@mui/material';
import FormWarningDialog from '../../ConsumerUnit/Form/WarningDialog';


const defaultValues: EditDistributorForm = {
  isActive: true,
  name: "",
  cnpj: "",
};

const DistributorEditForm = () => {
  const dispatch = useDispatch();
  const isEditFormOpen = useSelector(selectIsDistributorEditFormOpen);
  const [shouldShowCancelDialog, setShouldShowCancelDialog] = useState(false);
  const form = useForm({ defaultValues });
  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = form;
  const handleCancelEdition = () => {
    if (isDirty) {
      setShouldShowCancelDialog(true);
      return;
    }
    handleDiscardForm();
  };

  useEffect(() => {
    console.log("editarrrrr")
  })

  const handleDiscardForm = () => {
    handleCloseDialog();
    reset();
    dispatch(setIsDistributorEditFormOpen(false));
  };

  const handleCloseDialog = () => {
    setShouldShowCancelDialog(false);
  };

  const onSubmitHandler: SubmitHandler<CreateDistributorForm> = (data) => {
    console.log(data);
  };
  return (
    <FormDrawer open={isEditFormOpen} handleCloseDrawer={handleCancelEdition}>
      <FormProvider {...form}>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <Typography variant="h4">
                Editar Distribuidora
              </Typography>
              <Typography>
                * campos obrigatórios
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="isActive"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          value={value}
                          defaultChecked
                          onChange={onChange}
                        />
                      }
                      label="Distribuidora ativa"
                    />

                    <FormHelperText>
                      <p>Distribuidoras desativadas impedem a geração de recomendações para as unidades consumidoras relacionadas.</p>
                      <p>Só é possível excluir distribuidoras que não estejam relacionadas à nenhuma nenhuma unidade consumidora.</p>
                    </FormHelperText>
                  </FormGroup>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="name"
                rules={{ required: "Campo obrigatório" }}
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <TextField
                    ref={ref}
                    value={value}
                    label="Nome"
                    required
                    error={Boolean(error)}
                    helperText={error?.message ?? " "}
                    fullWidth
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="cnpj"
                rules={{ required: "Campo obrigatório" }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <PatternFormat
                    value={value}
                    customInput={TextField}
                    label="CNPJ"
                    format='##.###.###/####-##'
                    required
                    error={Boolean(error)}
                    helperText={error?.message ?? " "}
                    fullWidth
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Gravar
              </Button>

              <Button variant="text" onClick={handleCancelEdition}>
                Cancelar
              </Button>
            </Grid>

          </Grid>

          <FormWarningDialog
            open={shouldShowCancelDialog}
            onClose={handleCloseDialog}
            onDiscard={handleDiscardForm}
          />

        </Box>
      </FormProvider>
    </FormDrawer>
  )
}

export default DistributorEditForm;
