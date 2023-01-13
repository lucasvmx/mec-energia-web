import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsDistributorCreateFormOpen, setIsDistributorCreateFormOpen } from '../../../store/appSlice';
import { CreateDistributorForm } from '../../../types/distributor';
import FormDrawer from '../../Form/Drawer';
import { PatternFormat } from 'react-number-format';

import {
  Controller, FormProvider, SubmitHandler, useForm,
} from "react-hook-form";
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import FormWarningDialog from '../../ConsumerUnit/Form/WarningDialog';


const defaultValues: CreateDistributorForm = {
  name: "",
  cnpj: "",
};

const DistributorCreateForm = () => {
  const dispatch = useDispatch();
  const isCreateFormOpen = useSelector(selectIsDistributorCreateFormOpen);
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

  const handleDiscardForm = () => {
    handleCloseDialog();
    reset();
    dispatch(setIsDistributorCreateFormOpen(false));
  };

  const handleCloseDialog = () => {
    setShouldShowCancelDialog(false);
  };

  const onSubmitHandler: SubmitHandler<CreateDistributorForm> = (data) => {
    console.log(data);
  };
  return (
    <FormDrawer open={isCreateFormOpen} handleCloseDrawer={handleCancelEdition}>
      <FormProvider {...form}>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <Typography variant="h4">
                Adicionar Distribuidora
              </Typography>
              <Typography>
                * campos obrigatórios
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="name"
                rules={{ required: "Preencha este campo" }}
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <TextField
                    ref={ref}
                    value={value}
                    label="Nome *"
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
                rules={{
                  required: "Preencha este campo",
                  pattern: {
                    value: /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})/,
                    message: "Insira um CNPJ válido com 14 dígitos"
                  }
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <PatternFormat
                    value={value}
                    customInput={TextField}
                    label="CNPJ *"
                    format='##.###.###/####-##'
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
            entity={"distribuidora"}
            onClose={handleCloseDialog}
            onDiscard={handleDiscardForm}
          />

        </Box>
      </FormProvider>
    </FormDrawer>
  )
}

export default DistributorCreateForm;
