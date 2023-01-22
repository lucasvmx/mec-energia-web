import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveDistributorId, selectIsDistributorEditFormOpen, setIsDistributorEditFormOpen, setIsErrorNotificationOpen, setIsSucessNotificationOpen } from '../../../store/appSlice';
import { EditDistributorForm, EditDistributorRequestPayload } from '../../../types/distributor';
import FormDrawer from '../../Form/Drawer';
import { PatternFormat } from 'react-number-format';

import {
  Controller, FormProvider, SubmitHandler, useForm,
} from "react-hook-form";
import { Box, Button, FormControlLabel, FormGroup, FormHelperText, Grid, Switch, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import FormWarningDialog from '../../ConsumerUnit/Form/WarningDialog';
import { useEditDistributorMutation, useGetDistributorQuery } from '@/api';
import { useSession } from 'next-auth/react';
import { skipToken } from '@reduxjs/toolkit/dist/query';


const defaultValues: EditDistributorForm = {
  isActive: true,
  name: "",
  cnpj: "",
};

const DistributorEditForm = () => {
  const user = useSession().data?.user;
  const dispatch = useDispatch();
  const activeDistributor = useSelector(selectActiveDistributorId);
  const isEditFormOpen = useSelector(selectIsDistributorEditFormOpen);
  const [shouldShowCancelDialog, setShouldShowCancelDialog] = useState(false);
  const [editDistributor, { isError, isSuccess, isLoading }] = useEditDistributorMutation()
  const { data: distributor } = useGetDistributorQuery(activeDistributor || skipToken)
  const form = useForm({ defaultValues });
  const {
    control,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty },
  } = form;

  const handleCancelEdition = () => {
    if (isDirty) {
      setShouldShowCancelDialog(true);
      return;
    }
    handleDiscardForm();
  };

  const isActive = watch("isActive")

  useEffect(() => {
    if (isEditFormOpen && distributor) {
      const { name, isActive, cnpj } = distributor
      setValue('name', name)
      setValue('cnpj', cnpj)
      setValue('isActive', isActive)
    }
  }, [distributor, isEditFormOpen, setValue])

  useEffect(() => {
    console.log("Ativo?", isActive)
    setValue("isActive", isActive)
  }, [isActive, setValue])

  const handleDiscardForm = () => {
    handleCloseDialog();
    reset();
    dispatch(setIsDistributorEditFormOpen(false));
  };

  const handleCloseDialog = () => {
    setShouldShowCancelDialog(false);
  };

  const onSubmitHandler: SubmitHandler<EditDistributorForm> = async (data) => {
    const cnpjSemMascara = data.cnpj.replace(/[\/.-]/g, '');
    data.cnpj = cnpjSemMascara
    const body: EditDistributorRequestPayload = {
      id: activeDistributor as number,
      name: data.name,
      cnpj: data.cnpj,
      isActive: data.isActive,
      university: user?.universityId as number
    }
    await editDistributor(body)
  };

  //Notificações
  const handleNotification = useCallback(() => {
    if (isSuccess) {
      dispatch(setIsSucessNotificationOpen({
        isOpen: true,
        text: "Distribuidora modificada com sucesso!"
      }))
      reset();
      dispatch(setIsDistributorEditFormOpen(false))
    }
    else if (isError)
      dispatch(setIsErrorNotificationOpen({
        isOpen: true,
        text: "Erro ao editar distribuidora."
      }))
  }, [dispatch, isError, isSuccess, reset])

  useEffect(() => {
    handleNotification()
  }, [handleNotification, isSuccess, isError])

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
                    {distributor && (
                      <FormControlLabel
                        control={
                          <Switch
                            value={value}
                            defaultChecked={distributor.isActive}
                            onChange={onChange}
                          />
                        }
                        label="Distribuidora ativa"
                      />
                    )}

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

            <Grid item xs={3}>
              <LoadingButton
                type="submit"
                variant="contained"
                size='large'
                loading={isLoading}
                startIcon={<TaskAltIcon />}
                loadingPosition="start"
              >
                {isLoading ? 'Gravando' : 'Gravar'}
              </LoadingButton>
            </Grid>

            <Grid item xs={2}>
              <Button variant="text" onClick={handleCancelEdition} size='large'>
                <Typography pl={3} pr={3}>Cancelar</Typography>
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
    </FormDrawer>
  )
}

export default DistributorEditForm;
