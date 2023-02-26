import { Alert, Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { selectActiveDistributorId, selectCurrentTariff, selectIsTariffCreateFormOpen, selectIsTariffEditFormOpen, setIsErrorNotificationOpen, setIsSuccessNotificationOpen as setIsSuccessNotificationOpen, setIsTariffCreateFormOpen, setIsTariffEdiFormOpen } from '../../../store/appSlice'
import { CreateAndEditTariffForm, CreateTariffRequestPayload, EditTariffRequestPayload } from '../../../types/tariffs'
import FormDrawer from '../../Form/Drawer'
import { DatePicker } from '@mui/x-date-pickers'
import { isAfter, isFuture, isValid } from "date-fns";
import { NumericFormat } from "react-number-format";
import FormWarningDialog from '../../ConsumerUnit/Form/WarningDialog'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useCreateTariffMutation, useEditTariffMutation, useGetDistributorQuery } from '@/api'
import { sendFormattedDate } from '@/utils/date'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { SubmitButton } from '@/components/Form/SubmitButton'
import { FormErrorsAlert } from '@/components/Form/FormErrorsAlert'

const defaultValues: CreateAndEditTariffForm = {
  start_date: new Date(),
  end_date: new Date(),
  blue: {
    peakTusdInReaisPerKw: "",
    peakTusdInReaisPerMwh: "",
    peakTeInReaisPerMwh: "",
    offPeakTusdInReaisPerKw: "",
    offPeakTusdInReaisPerMwh: "",
    offPeakTeInReaisPerMwh: "",
  },
  green: {
    peakTusdInReaisPerMwh: "",
    peakTeInReaisPerMwh: "",
    offPeakTusdInReaisPerMwh: "",
    offPeakTeInReaisPerMwh: "",
    naTusdInReaisPerKw: "",
  }
}

const TariffCreateEditForm = () => {
  const dispatch = useDispatch();
  const isCreateTariffFormOpen = useSelector(selectIsTariffCreateFormOpen);
  const isEditTariffFormOpen = useSelector(selectIsTariffEditFormOpen)
  const currentTariff = useSelector(selectCurrentTariff);
  const [createTariff, { isError: isCreateTariffError, isSuccess: isCreateTariffSuccess, isLoading: isCreateTariffLoading, reset: resetCreateMutation }] = useCreateTariffMutation()
  const [editTariff, { isError: isEditTariffError, isSuccess: isEditTariffSuccess, isLoading: isEditTariffLoading, reset: resetEditMutation }] = useEditTariffMutation()
  const activeDistributor = useSelector(selectActiveDistributorId);
  const distributor = useGetDistributorQuery(activeDistributor || skipToken)
  const [shouldShowCancelDialog, setShouldShowCancelDialog] = useState(false);
  const [startDate, setStartDate] = useState(new Date(2010))
  const form = useForm({ defaultValues })
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty, errors }
  } = form;

  const blue = watch('blue');
  const green = watch('green');

  useEffect(() => {
    if (isEditTariffFormOpen) {
      setValue('blue.offPeakTeInReaisPerMwh', currentTariff.blue.offPeakTeInReaisPerMwh);
      setValue('blue.offPeakTusdInReaisPerKw', currentTariff.blue.offPeakTusdInReaisPerKw);
      setValue('blue.offPeakTusdInReaisPerMwh', currentTariff.blue.offPeakTusdInReaisPerMwh);
      setValue('blue.peakTeInReaisPerMwh', currentTariff.blue.peakTeInReaisPerMwh);
      setValue('blue.peakTusdInReaisPerKw', currentTariff.blue.peakTusdInReaisPerKw);
      setValue('blue.peakTusdInReaisPerMwh', currentTariff.blue.peakTusdInReaisPerMwh);
      setValue('green.naTusdInReaisPerKw', currentTariff.green.naTusdInReaisPerKw);
      setValue('green.offPeakTeInReaisPerMwh', currentTariff.green.offPeakTeInReaisPerMwh);
      setValue('green.offPeakTusdInReaisPerMwh', currentTariff.green.offPeakTusdInReaisPerMwh);
      setValue('green.peakTeInReaisPerMwh', currentTariff.green.peakTeInReaisPerMwh);
      setValue('green.peakTusdInReaisPerMwh', currentTariff.green.peakTusdInReaisPerMwh);
      setValue('end_date', new Date(currentTariff.endDate));
      setValue('start_date', new Date(currentTariff.startDate));
    }
  }, [currentTariff.blue.offPeakTeInReaisPerMwh, currentTariff.blue.offPeakTusdInReaisPerKw, currentTariff.blue.offPeakTusdInReaisPerMwh, currentTariff.blue.peakTeInReaisPerMwh, currentTariff.blue.peakTusdInReaisPerKw, currentTariff.blue.peakTusdInReaisPerMwh, currentTariff.endDate, currentTariff.green.naTusdInReaisPerKw, currentTariff.green.offPeakTeInReaisPerMwh, currentTariff.green.offPeakTusdInReaisPerMwh, currentTariff.green.peakTeInReaisPerMwh, currentTariff.green.peakTusdInReaisPerMwh, currentTariff.startDate, isEditTariffFormOpen, setValue])

  useEffect(() => {
    if (isEditTariffFormOpen) {
      if (blue.offPeakTeInReaisPerMwh === undefined) {
        setValue('blue.offPeakTeInReaisPerMwh', '')
        return;
      }
      if (blue.offPeakTusdInReaisPerKw === undefined) {
        setValue('blue.offPeakTusdInReaisPerKw', '')
        return;
      }
      if (blue.offPeakTusdInReaisPerMwh === undefined) {
        setValue('blue.offPeakTusdInReaisPerMwh', '')
        return;
      }
      if (blue.peakTeInReaisPerMwh === undefined) {
        setValue('blue.peakTeInReaisPerMwh', '')
        return;
      }
      if (blue.peakTusdInReaisPerKw === undefined) {
        setValue('blue.peakTusdInReaisPerKw', '')
        return;
      }
      if (blue.peakTusdInReaisPerMwh === undefined) {
        setValue('blue.peakTusdInReaisPerMwh', '')
        return;
      }

      if (green.offPeakTeInReaisPerMwh === undefined) {
        setValue('green.offPeakTeInReaisPerMwh', '')
        return;
      }
      if (green.offPeakTusdInReaisPerMwh === undefined) {
        setValue('green.offPeakTusdInReaisPerMwh', '')
        return;
      }
      if (green.peakTeInReaisPerMwh === undefined) {
        setValue('green.peakTeInReaisPerMwh', '')
        return;
      }
      if (green.peakTusdInReaisPerMwh === undefined) {
        setValue('green.peakTusdInReaisPerMwh', '')
        return;
      }
      if (green.naTusdInReaisPerKw === undefined) {
        setValue('green.naTusdInReaisPerKw', '')
      }

    }
  })

  const handleCancelEdition = () => {
    if (isDirty) {
      setShouldShowCancelDialog(true);
      return;
    }
    handleDiscardForm();
  }

  const handleDiscardForm = () => {
    handleCloseDialog();
    reset();
    if (isCreateTariffFormOpen) dispatch(setIsTariffCreateFormOpen(false));
    else dispatch(setIsTariffEdiFormOpen(false));
  }

  const handleCloseDialog = () => {
    setShouldShowCancelDialog(false);
  }

  const isValidDate = (date: CreateAndEditTariffForm["start_date"]) => {
    if (!date || !isValid(date)) {
      return "Insira uma data válida no formato dd/mm/aaaa.";
    }

    if (isFuture(new Date(date))) {
      return "Insira uma data anterior ou igual a data atual no formato dd/mm/aaaa";
    }

    if (!isAfter(new Date(date), new Date("2010"))) {
      return "Insira uma data a partir de 2010";
    }

    setStartDate(new Date(date))

    return true;
  };

  const isValidEndDate = (date: CreateAndEditTariffForm["end_date"]) => {
    if (!date || !isValid(date)) {
      return "Insira uma data válida no formato dd/mm/aaaa.";
    }

    if (!isAfter(new Date(date), startDate)) {
      return "Insira uma data posterior à data de início";
    }

    return true;
  };

  const onSubmitHandler: SubmitHandler<CreateAndEditTariffForm> = async (data: CreateAndEditTariffForm) => {
    const { start_date, end_date, blue, green } = data;

    let body: CreateTariffRequestPayload | EditTariffRequestPayload = {
      startDate: sendFormattedDate(start_date),
      endDate: sendFormattedDate(end_date),
      blue: blue,
      green: green,
      subgroup: 'A4',// TODO: colocar dinâmico,
      distributor: activeDistributor as number,
    }

    if (isEditTariffFormOpen) body = { ...body, id: currentTariff?.id }

    if (isCreateTariffFormOpen) await createTariff(body);
    if (isEditTariffFormOpen) await editTariff(body as EditTariffRequestPayload);
  }

  const handleNotification = useCallback(() => {
    if (isCreateTariffFormOpen) {
      if (isCreateTariffSuccess) {
        dispatch(setIsSuccessNotificationOpen({
          isOpen: true,
          text: "Tarifas adicionadas com sucesso!"
        }))
        reset();
        resetCreateMutation()
        setTimeout(() => dispatch(setIsTariffCreateFormOpen(false)), 500)
      }
      else if (isCreateTariffError) {
        dispatch(setIsErrorNotificationOpen({
          isOpen: true,
          text: "Erro ao adicionar tarifas!"
        }))
        resetCreateMutation()
      }
    }
    else if (isEditTariffFormOpen) {
      if (isEditTariffSuccess) {
        dispatch(setIsSuccessNotificationOpen({
          isOpen: true,
          text: "Tarifas atualizadas com sucesso"
        }))
        reset();
        resetEditMutation()
        setTimeout(() => dispatch(setIsTariffEdiFormOpen(false)), 500)
      }
      else if (isEditTariffError) {
        dispatch(setIsErrorNotificationOpen({
          isOpen: true,
          text: "Erro ao editar tarifa"
        }))
        resetEditMutation()
      }
    }
  }, [dispatch, isCreateTariffError, isCreateTariffFormOpen, isCreateTariffSuccess, isEditTariffError, isEditTariffFormOpen, isEditTariffSuccess, reset, resetCreateMutation, resetEditMutation])

  useEffect(() => {
    handleNotification()
  }, [handleNotification, isCreateTariffSuccess, isCreateTariffError])

  return (
    <FormDrawer open={isEditTariffFormOpen || isCreateTariffFormOpen} handleCloseDrawer={
      handleCancelEdition
    }>
      <FormProvider {...form}>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>
                {isCreateTariffFormOpen ? 'Adicionar' : 'Editar'} tarifa
              </Typography>
              <Typography variant="h4">
                Subgrupo A4
              </Typography>
              <Typography>
                Distribuidora: {distributor.data?.name}
              </Typography>
              <Box mt={3} mb={3}>
                <Alert icon={<ErrorOutlineIcon />} severity="info">Veja o passo-a-passo a seguir para encontrar as informações de tarifa no site da ANEEL.</Alert>

              </Box>
              <Typography>
                * campos obrigatórios
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h5'>Vigência</Typography>
            </Grid>

            <Grid item xs={4.5}>
              <Controller
                control={control}
                name="start_date"
                rules={{
                  required: "Preencha este campo",
                  validate: isValidDate,
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <DatePicker
                    value={value}
                    label="Início *"
                    minDate={new Date("2010")}
                    disableFuture
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputProps={{
                          ...params.inputProps,
                          placeholder: "dd/mm/aaaa"
                        }}
                        helperText={error?.message ?? " "}
                        error={!!error}
                      />
                    )}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4.5}>
              <Controller
                control={control}
                name="end_date"
                rules={{
                  required: "Preencha este campo",
                  validate: isValidEndDate,
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <DatePicker
                    value={value}
                    label="Fim *"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputProps={{
                          ...params.inputProps,
                          placeholder: "dd/mm/aaaa"
                        }}
                        helperText={error?.message ?? " "}
                        error={!!error}
                      />
                    )}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h5'>Modalidade Azul</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='inherit' color='primary'>Ponta</Typography>
            </Grid>

            <Grid item xs={4}>
              <Controller
                control={control}
                name={"blue.peakTusdInReaisPerKw"}
                rules={{
                  required: "Preencha este campo",
                  min: {
                    value: 0.01,
                    message: "Insira um valor maior que R$ 0,00"
                  }
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value}
                    customInput={TextField}
                    label="TUSD R$/kW  *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                      placeholder: "0,00"
                    }}
                    type="text"
                    allowNegative={false}
                    isAllowed={({ floatValue }) =>
                      !floatValue || floatValue <= 9999.99
                    }
                    decimalScale={2}
                    decimalSeparator=","
                    thousandSeparator={" "}
                    onValueChange={(values) => onChange(values.floatValue)}
                    onBlur={onBlur}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <Controller
                control={control}
                name={"blue.peakTusdInReaisPerMwh"}
                rules={{
                  required: "Preencha este campo",
                  min: {
                    value: 0.01,
                    message: "Insira um valor maior que R$ 0,00"
                  }
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value !== 0 ? value : null}
                    customInput={TextField}
                    label="TUSD R$/MWh *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                      placeholder: "0,00"
                    }}
                    type="text"
                    allowNegative={false}
                    decimalScale={2}
                    decimalSeparator=","
                    thousandSeparator={" "}
                    onValueChange={(values) => onChange(values.floatValue)}
                    onBlur={onBlur}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <Controller
                control={control}
                name={"blue.peakTeInReaisPerMwh"}
                rules={{
                  required: "Preencha este campo",
                  min: {
                    value: 0.01,
                    message: "Insira um valor maior que R$ 0,00"
                  }
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value !== 0 ? value : null}
                    customInput={TextField}
                    label="TE R$/MWh  *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                      placeholder: "0,00"
                    }}
                    type="text"
                    allowNegative={false}
                    decimalScale={2}
                    decimalSeparator=","
                    thousandSeparator={" "}
                    onValueChange={(values) => onChange(values.floatValue)}
                    onBlur={onBlur}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='inherit' color='primary'>Fora Ponta</Typography>
            </Grid>

            <Grid item xs={4}>
              <Controller
                control={control}
                name={"blue.offPeakTusdInReaisPerKw"}
                rules={{
                  required: "Preencha este campo",
                  min: {
                    value: 0.01,
                    message: "Insira um valor maior que R$ 0,00"
                  }
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value !== 0 ? value : null}
                    customInput={TextField}
                    label="TUSD R$/kW  *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                      placeholder: "0,00"
                    }}
                    type="text"
                    allowNegative={false}
                    decimalScale={2}
                    decimalSeparator=","
                    thousandSeparator={" "}
                    onValueChange={(values) => onChange(values.floatValue)}
                    onBlur={onBlur}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <Controller
                control={control}
                name={"blue.offPeakTusdInReaisPerMwh"}
                rules={{
                  required: "Preencha este campo",
                  min: {
                    value: 0.01,
                    message: "Insira um valor maior que R$ 0,00"
                  }
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value !== 0 ? value : null}
                    customInput={TextField}
                    label="TUSD R$/MWh *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                      placeholder: "0,00"
                    }}
                    type="text"
                    allowNegative={false}
                    decimalScale={2}
                    decimalSeparator=","
                    thousandSeparator={" "}
                    onValueChange={(values) => onChange(values.floatValue)}
                    onBlur={onBlur}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <Controller
                control={control}
                name={"blue.offPeakTeInReaisPerMwh"}
                rules={{
                  required: "Preencha este campo",
                  min: {
                    value: 0.01,
                    message: "Insira um valor maior que R$ 0,00"
                  }
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value !== 0 ? value : undefined}
                    customInput={TextField}
                    label="TE R$/MWh  *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                      placeholder: "0,00"
                    }}
                    type="text"
                    allowNegative={false}
                    isAllowed={({ floatValue }) =>
                      !floatValue || floatValue >= 1 || floatValue <= 9999.99
                    }
                    decimalScale={2}
                    decimalSeparator=","
                    thousandSeparator={" "}
                    onValueChange={(values) => onChange(values.floatValue)}
                    onBlur={onBlur}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h5' >Modalidade Verde</Typography>
            </Grid>


            <Grid item xs={12}>
              <Typography variant='inherit' color='primary'>NA</Typography>
            </Grid>

            <Grid item xs={4}>
              <Controller
                control={control}
                name={"green.naTusdInReaisPerKw"}
                rules={{
                  required: "Preencha este campo",
                  min: {
                    value: 0.01,
                    message: "Insira um valor maior que R$ 0,00"
                  }
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value !== 0 ? value : null}
                    customInput={TextField}
                    label="TUSD R$/kW  *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                      placeholder: "0,00"
                    }}
                    type="text"
                    allowNegative={false}
                    decimalScale={2}
                    decimalSeparator=","
                    thousandSeparator={" "}
                    onValueChange={(values) => onChange(values.floatValue)}
                    onBlur={onBlur}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='inherit' color='primary'>Ponta</Typography>
            </Grid>


            <Grid item xs={4}>
              <Controller
                control={control}
                name={"green.peakTusdInReaisPerMwh"}
                rules={{
                  required: "Preencha este campo",
                  min: {
                    value: 0.01,
                    message: "Insira um valor maior que R$ 0,00"
                  }
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value !== 0 ? value : null}
                    customInput={TextField}
                    label="TUSD R$/MWh *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                      placeholder: "0,00"
                    }}
                    type="text"
                    allowNegative={false}
                    decimalScale={2}
                    decimalSeparator=","
                    thousandSeparator={" "}
                    onValueChange={(values) => onChange(values.floatValue)}
                    onBlur={onBlur}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <Controller
                control={control}
                name={"green.peakTeInReaisPerMwh"}
                rules={{
                  required: "Preencha este campo",
                  min: {
                    value: 0.01,
                    message: "Insira um valor maior que R$ 0,00"
                  }
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value !== 0 ? value : null}
                    customInput={TextField}
                    label="TE R$/MWh  *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                      placeholder: "0,00"
                    }}
                    type="text"
                    allowNegative={false}
                    decimalScale={2}
                    decimalSeparator=","
                    thousandSeparator={" "}
                    onValueChange={(values) => onChange(values.floatValue)}
                    onBlur={onBlur}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='inherit' color='primary'>Fora Ponta</Typography>
            </Grid>

            <Grid item xs={4}>
              <Controller
                control={control}
                name={"green.offPeakTusdInReaisPerMwh"}
                rules={{
                  required: "Preencha este campo",
                  min: {
                    value: 0.01,
                    message: "Insira um valor maior que R$ 0,00"
                  }
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value !== 0 ? value : null}
                    customInput={TextField}
                    label="TUSD R$/MWh *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                      placeholder: "0,00"
                    }}
                    type="text"
                    allowNegative={false}
                    decimalScale={2}
                    decimalSeparator=","
                    thousandSeparator={" "}
                    onValueChange={(values) => onChange(values.floatValue)}
                    onBlur={onBlur}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <Controller
                control={control}
                name={"green.offPeakTeInReaisPerMwh"}
                rules={{
                  required: "Preencha este campo",
                  min: {
                    value: 0.01,
                    message: "Insira um valor maior que R$ 0,00"
                  }
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value !== 0 ? value : null}
                    customInput={TextField}
                    label="TE R$/MWh  *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                      placeholder: "0,00"
                    }}
                    type="text"
                    allowNegative={false}
                    decimalScale={2}
                    decimalSeparator=","
                    thousandSeparator={" "}
                    onValueChange={(values) => onChange(values.floatValue)}
                    onBlur={onBlur}
                  />
                )}
              />
            </Grid>

            <FormErrorsAlert hasErrors={Object.keys(errors).length > 0 ? true : false} />

            <Grid container spacing={2}>
              <Grid item xs={3}>
                <SubmitButton isLoading={isCreateTariffLoading || isEditTariffLoading} />
              </Grid>

              <Grid item xs={3}>
                <Button variant="text" onClick={handleCancelEdition} size='large'>
                  <Typography pl={3} pr={3}>Cancelar</Typography>
                </Button>
              </Grid>

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

    </FormDrawer >
  )
}

export default TariffCreateEditForm;
