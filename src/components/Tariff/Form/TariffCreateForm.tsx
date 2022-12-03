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
    peak_tusd_in_reais_per_kw: 0,
    peak_tusd_in_reais_per_mwh: 0,
    peak_te_in_reais_per_mwh: 0,
    off_peak_tusd_in_reais_per_kw: 0,
    off_peak_tusd_in_reais_per_mwh: 0,
    off_peak_te_in_reais_per_mwh: 0,
  },
  green: {
    peak_tusd_in_reais_per_mwh: 0,
    peak_te_in_reais_per_mwh: 0,
    off_peak_tusd_in_reais_per_mwh: 0,
    off_peak_te_in_reais_per_mwh: 0,
    na_tusd_in_reais_per_kw: 0,
  }
}

const TariffCreateForm = () => {
  const dispatch = useDispatch();
  const isCreateTariffFormOpen = useSelector(selectIsTariffCreateFormOpen);
  const isEditTariffFormOpen = useSelector(selectIsTariffEditFormOpen)
  const [shouldShowCancelDialog, setShouldShowCancelDialog] = useState(false);
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
      return "Data inválida";
    }

    if (isFuture(new Date(date))) {
      return "Datas futuras não são permitidas";
    }

    if (!isAfter(new Date(date), new Date("2010"))) {
      return "Datas antes de 2010 não são permitidas";
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
                  required: "Campo obrigatório",
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
                    renderInput={(params) => (
                      <TextField
                        {...params}
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
                  required: "Campo obrigatório",
                  validate: isValidDate,
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <DatePicker
                    value={value}
                    label="Fim da vigência *"
                    disableFuture
                    renderInput={(params) => (
                      <TextField
                        {...params}
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
                name={"blue.peak_tusd_in_reais_per_kw"}
                rules={{ required: "Campo obrigatório" }}
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
                name={"blue.peak_tusd_in_reais_per_mwh"}
                rules={{ required: "Campo obrigatório" }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value}
                    customInput={TextField}
                    label="TUSD R$/MWh *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
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
                name={"blue.peak_te_in_reais_per_mwh"}
                rules={{ required: "Campo obrigatório" }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value}
                    customInput={TextField}
                    label="TE R$/MWh  *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
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
                name={"blue.off_peak_tusd_in_reais_per_kw"}
                rules={{ required: "Campo obrigatório" }}
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
                name={"blue.off_peak_tusd_in_reais_per_mwh"}
                rules={{ required: "Campo obrigatório" }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value}
                    customInput={TextField}
                    label="TUSD R$/MWh *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
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
                name={"blue.off_peak_te_in_reais_per_mwh"}
                rules={{ required: "Campo obrigatório" }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value}
                    customInput={TextField}
                    label="TE R$/MWh  *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
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
                name={"green.na_tusd_in_reais_per_kw"}
                rules={{ required: "Campo obrigatório" }}
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
                name={"green.peak_tusd_in_reais_per_mwh"}
                rules={{ required: "Campo obrigatório" }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value}
                    customInput={TextField}
                    label="TUSD R$/MWh *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
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
                name={"green.peak_te_in_reais_per_mwh"}
                rules={{ required: "Campo obrigatório" }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value}
                    customInput={TextField}
                    label="TE R$/MWh  *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
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
                name={"green.off_peak_tusd_in_reais_per_mwh"}
                rules={{ required: "Campo obrigatório" }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value}
                    customInput={TextField}
                    label="TUSD R$/MWh *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
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
                name={"green.off_peak_te_in_reais_per_mwh"}
                rules={{ required: "Campo obrigatório" }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value}
                    customInput={TextField}
                    label="TE R$/MWh  *"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
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
            onClose={handleCloseDialog}
            onDiscard={handleDiscardForm}
          />
        </Box>

      </FormProvider>

    </FormDrawer>
  )
}

export default TariffCreateForm;
