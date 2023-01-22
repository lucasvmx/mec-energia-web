import { Alert, Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { selectActiveDistributorId, selectIsTariffCreateFormOpen, selectIsTariffEditFormOpen, setIsErrorNotificationOpen, setIsSucessNotificationOpen, setIsTariffCreateFormOpen, setIsTariffEdiFormOpen } from '../../../store/appSlice'
import { CreateAndEditTariffForm, CreateTariffRequestPayload } from '../../../types/tariffs'
import FormDrawer from '../../Form/Drawer'
import { DatePicker } from '@mui/x-date-pickers'
import { isAfter, isFuture, isValid } from "date-fns";
import { NumericFormat } from "react-number-format";
import FormWarningDialog from '../../ConsumerUnit/Form/WarningDialog'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { LoadingButton } from '@mui/lab'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useCreateTariffMutation } from '@/api'
import { sendFormattedDate } from '@/utils/date'

const defaultValues: CreateAndEditTariffForm = {
  start_date: new Date(),
  end_date: new Date(),
  blue: {
    peakTusdInReaisPerKw: undefined,
    peakTusdInReaisPerMwh: undefined,
    peakTeInReaisPerMwh: undefined,
    offPeakTusdInReaisPerKw: undefined,
    offPeakTusdInReaisPerMwh: undefined,
    offPeakTeInReaisPerMwh: undefined,
  },
  green: {
    peakTusdInReaisPerMwh: undefined,
    peakTeInReaisPerMwh: undefined,
    offPeakTusdInReaisPerMwh: undefined,
    offPeakTeInReaisPerMwh: undefined,
    naTusdInReaisPerKw: undefined,
  }
}

const TariffCreateForm = () => {
  const dispatch = useDispatch();
  const isCreateTariffFormOpen = useSelector(selectIsTariffCreateFormOpen);
  const isEditTariffFormOpen = useSelector(selectIsTariffEditFormOpen)
  const [createTariff, { isError: isCreateTariffError, isSuccess: isCreateTariffSucess, isLoading: isCreatTariffLoading }] = useCreateTariffMutation()
  const activeDistributor = useSelector(selectActiveDistributorId);
  const [shouldShowCancelDialog, setShouldShowCancelDialog] = useState(false);
  const [startDate, setStartDate] = useState(new Date(2010))
  const form = useForm({ defaultValues })
  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty }
  } = form;

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

    const body: CreateTariffRequestPayload = {
      startDate: sendFormattedDate(start_date),
      endDate: sendFormattedDate(end_date),
      blue: blue,
      green: green,
      subgroup: 'A4',// TODO: colocar dinâmico,
      distributor: activeDistributor as number,
    }

    if (isCreateTariffFormOpen) await createTariff(body)
  }

  const handleNotification = useCallback(() => {
    if (isCreateTariffFormOpen) {
      if (isCreateTariffSucess) {
        dispatch(setIsSucessNotificationOpen({
          isOpen: true,
          text: "Tarifas adicionadas com sucesso!"
        }))
        reset();
        dispatch(setIsTariffCreateFormOpen(false))
      }
      else if (isCreateTariffError)
        dispatch(setIsErrorNotificationOpen({
          isOpen: true,
          text: "Erro ao adicionar tarifas!"
        }))
    }
    else if (isEditTariffFormOpen) { }
  }, [dispatch, isCreateTariffError, isCreateTariffFormOpen, isCreateTariffSucess, isEditTariffFormOpen, reset])

  useEffect(() => {
    handleNotification()
  }, [handleNotification])

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
                Distribuidora: Alguma
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
                    toolbarPlaceholder="kajsdfh"
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

            <Grid item xs={3}>
              <LoadingButton
                type="submit"
                variant="contained"
                size='large'
                loading={isCreatTariffLoading}
                startIcon={<TaskAltIcon />}
                loadingPosition="start"
              >
                {isCreatTariffLoading ? 'Gravando' : 'Gravar'}
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
            entity={"distribuidora"}
            onClose={handleCloseDialog}
            onDiscard={handleDiscardForm}
          />
        </Box>

      </FormProvider>

    </FormDrawer >
  )
}

export default TariffCreateForm;
