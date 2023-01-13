import { Alert, Box, Button, Divider, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsTariffCreateFormOpen, selectIsTariffEditFormOpen, setIsTariffCreateFormOpen, setIsTariffEdiFormOpen } from '../../../store/appSlice'
import { CreateAndEditTariffForm } from '../../../types/tariffs'
import FormDrawer from '../../Form/Drawer'
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { DatePicker } from '@mui/x-date-pickers'
import { isAfter, isFuture, isValid } from "date-fns";
import { NumericFormat } from "react-number-format";
import FormWarningDialog from '../../ConsumerUnit/Form/WarningDialog'

const defaultValues: CreateAndEditTariffForm = {
  start_date: '',
  end_date: '',
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

  const onSubmitHandler: SubmitHandler<CreateAndEditTariffForm> = (data) => {
    console.log(data);
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
                <Alert icon={<LiveHelpIcon fontSize="inherit" />} severity="info">Veja o passo-a-passo a seguir para encontrar as informações de tarifa no site da ANEEL.</Alert>

              </Box>
              <Typography>
                * campos obrigatórios
              </Typography>
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
                    label="Início da vigência *"
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
                    label="Fim da vigência *"
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
              <Typography variant='inherit' sx={{ color: 'text.secondary' }}>Modalidade</Typography>
              <Typography variant='h5'>Azul</Typography>
              <Divider></Divider>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='inherit' sx={{ color: 'text.secondary' }}>Ponta</Typography>
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
              <Typography variant='inherit' sx={{ color: 'text.secondary' }}>Fora Ponta</Typography>
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
              <Typography variant='inherit' sx={{ color: 'text.secondary' }}>Modalidade</Typography>
              <Typography variant='h5'>Verde</Typography>
              <Divider></Divider>
            </Grid>


            <Grid item xs={12}>
              <Typography variant='inherit' sx={{ color: 'text.secondary' }}>NA</Typography>
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
              <Typography variant='inherit' sx={{ color: 'text.secondary' }}>Ponta</Typography>
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
              <Typography variant='inherit' sx={{ color: 'text.secondary' }}>Fora Ponta</Typography>
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

export default TariffCreateForm;
