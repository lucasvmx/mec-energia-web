import React, { useState } from 'react'
import { CreateDistributorForm, CreateDistributorRequestPayload } from '../../../types/distributor';
import { PatternFormat } from 'react-number-format';

import {
  Controller, FormProvider, SubmitHandler, useForm,
} from "react-hook-form";
import { Box, Button, Dialog, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import FormWarningDialog from '../../ConsumerUnit/Form/WarningDialog';
import { useCreateDistributorMutation } from '@/api';
import { useSession } from 'next-auth/react';


const defaultValues: CreateDistributorForm = {
  name: "",
  cnpj: "",
};

type DistributorCreateFormDialogProps = {
  open: boolean,
  onClose: () => void,

}

const DistributorCreateFormDialog = (props: DistributorCreateFormDialogProps) => {

  const { open, onClose } = props
  const [createDistributor, { isError, error }] = useCreateDistributorMutation()
  const { data: session } = useSession()
  const user = session?.user
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
    onClose()
  };

  const handleCloseDialog = () => {
    setShouldShowCancelDialog(false);
  };

  const onSubmitHandler: SubmitHandler<CreateDistributorForm> = async (data) => {
    const cnpjSemMascara = data.cnpj.replace(/[\/.-]/g, '');
    data.cnpj = cnpjSemMascara
    const body: CreateDistributorRequestPayload = {
      name: data.name,
      cnpj: data.cnpj,
      isActive: true,
      university: user?.university_id || 0
    }

    await createDistributor(body) // TODO - Tratar erros de requisição e adição de notificação
    if (isError) {
      console.log("Esse é o erro", error)
      return
    }
    onClose()
    console.log(data);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={'xs'}
    >
      <Box m={4}>
        <DialogTitle>
          Adicionar Distribuidora
        </DialogTitle>
        <FormProvider {...form}>
          <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              <Grid item xs={12} display='flex' justifyContent='flex-end' alignItems='center'>
                <Box pr={3}>
                  <Button type="submit" variant="contained">
                    Gravar
                  </Button>
                </Box>

                <Button variant="text" onClick={handleCancelEdition}>
                  Cancelar
                </Button>
              </Grid>

            </Grid>

            <FormWarningDialog
              open={shouldShowCancelDialog}
              entity={'distribuidora'}
              onClose={handleCloseDialog}
              onDiscard={handleDiscardForm}
            />

          </Box>
        </FormProvider>
      </Box >
    </Dialog >
  )
}
export default DistributorCreateFormDialog