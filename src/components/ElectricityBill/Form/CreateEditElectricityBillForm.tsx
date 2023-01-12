import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputAdornment,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectIsElectricityBillCreateFormOpen,
  selectIsElectricityBillEditFormOpen,
  setIsElectricityBillCreateFormOpen,
  setIsElectricityBillEdiFormOpen,
  setIsErrorNotificationOpen,
  setIsSucessNotificationOpen,
} from '../../../store/appSlice'
import FormDrawer from '../../Form/Drawer'
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { DatePicker } from '@mui/x-date-pickers'
import { NumericFormat } from "react-number-format";
import FormWarningDialog from '../../ConsumerUnit/Form/WarningDialog'
import { CreateAndEditElectricityBillForm, PostElectricityBillRequestPayload } from '@/types/electricityBill'
import InsightsIcon from '@mui/icons-material/Insights';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { usePostInvoiceMutation } from '@/api'

const defaultValues: CreateAndEditElectricityBillForm = {
  date: new Date(),
  invoiceInReais: undefined,
  isAtypical: false,
  peakMeasuredDemandInKw: "",
  peakConsumptionInKwh: "",
  offPeakConsumptionInKwh: "",
}

type CreateEditElectricityBillFormProps = {
  month: number;
  year: number;
}

const CreateEditElectricityBillForm = ({ month, year }: CreateEditElectricityBillFormProps) => {
  const dispatch = useDispatch();
  const isCreateElectricityBillFormOpen = useSelector(selectIsElectricityBillCreateFormOpen);
  const isEditElectricityBillFormOpen = useSelector(selectIsElectricityBillEditFormOpen)
  const [shouldShowCancelDialog, setShouldShowCancelDialog] = useState(false);
  const [postInvoice, { isError, isSuccess }] = usePostInvoiceMutation()

  const form = useForm({ defaultValues })
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { isDirty, errors },
  } = form;

  useEffect(() => {
    const date = new Date(`${year}-${month}`)
    setValue("date", date)
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
    if (isCreateElectricityBillFormOpen) dispatch(setIsElectricityBillCreateFormOpen(false));
    else dispatch(setIsElectricityBillEdiFormOpen(false));
  }

  const handleCloseDialog = () => {
    setShouldShowCancelDialog(false);
  }

  const onSubmitHandler: SubmitHandler<CreateAndEditElectricityBillForm> = async (data) => {
    console.log(data);
    const {
      date,
      isAtypical,
      invoiceInReais,
      offPeakConsumptionInKwh,
      offPeakMeasuredDemandInKw,
      peakConsumptionInKwh,
      peakMeasuredDemandInKw } = data;

    const formatedDate = `${date.getFullYear()}-${date.getMonth()}-01`

    const body: PostElectricityBillRequestPayload = {
      consumerUnit: 1, //TODO ADICIONAR A INFORMAÇÃO DE FORMA DINÂMICA
      contract: 1, // TODO - PRA ESSE TAMBEM
      date: formatedDate,
      isAtypical,
      invoiceInReais: invoiceInReais as number,
      offPeakConsumptionInKwh: offPeakConsumptionInKwh as number,
      peakConsumptionInKwh: peakConsumptionInKwh as number,
      peakMeasuredDemandInKw: peakMeasuredDemandInKw as number,
      offPeakMeasuredDemandInKw: offPeakMeasuredDemandInKw as number,
    }
    await postInvoice(body)
  }

  const handleNotification = useCallback(() => {
    if (isSuccess) {
      dispatch(setIsSucessNotificationOpen({
        isOpen: true,
        text: "Distribuuidora adicionada com sucesso!"
      }))
      reset();
      dispatch(setIsElectricityBillCreateFormOpen(false))
    }
    else if (isError)
      dispatch(setIsErrorNotificationOpen({
        isOpen: true,
        text: "Erro ao adicionar distribuidora."
      }))
  }, [dispatch, isError, isSuccess, reset])

  useEffect(() => {
    handleNotification()
  }, [handleNotification, isSuccess, isError])

  return (
    <FormDrawer open={isCreateElectricityBillFormOpen || isEditElectricityBillFormOpen} handleCloseDrawer={
      handleCancelEdition
    }>
      <FormProvider {...form}>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography>
                {isCreateElectricityBillFormOpen ? 'Lançar' : 'Editar'} fatura
              </Typography>
              <Typography variant="h4">
                Campus Gama
              </Typography>
              <Typography>
                Un. Consumidora: TODO
              </Typography>
              <Typography>
                Distribuidora: TODO
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography>
                * campos obrigatórios
              </Typography>

            </Grid>


            <Grid item xs={8}>
              <Typography variant='h5'>Fatura</Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="date"
                rules={{
                  required: "Já existe uma fatura lançada neste mês",
                  validate: () => true,
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <DatePicker
                    inputFormat='MMMM/yyyy'
                    value={value}
                    label="Mês de referência *"
                    minDate={new Date("2010")}
                    disableFuture
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputProps={{
                          ...params.inputProps,
                          placeholder: "mm/aaaa"
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

            <Grid item xs={4}>
              <Controller
                control={control}
                name={"invoiceInReais"}
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
                    width='20%'
                    customInput={TextField}
                    label="Valor total"
                    helperText={error?.message ?? "Campo opcional"}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                      placeholder: "0,00",
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

            <Grid container mt={2}>
              <Grid item xs={8}>
                <Controller
                  name="isAtypical"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormGroup>
                      <Box >
                        <Box display='flex' justifyContent='flex-start' alignItems='center'>
                          <InsightsIcon color='primary' />
                          <FormControlLabel
                            value="start"
                            label="Incluir na análise"
                            labelPlacement="start"
                            control={
                              <Switch
                                value={!value}
                                defaultChecked
                                onChange={onChange}
                              />
                            }
                          />
                        </Box>

                        <FormHelperText>
                          <p>Inclua todas as faturas, exceto casos radicalemente excepcionais como greves ou a pandemia</p>
                        </FormHelperText>
                      </Box>
                    </FormGroup>
                  )}
                />

              </Grid>
            </Grid>

            <Grid item xs={8} mb={2}>
              <Typography variant='h5'>Demanda medida</Typography>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Controller
                  control={control}
                  name="peakMeasuredDemandInKw"
                  rules={{ required: "Preencha este campo" }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <NumericFormat
                      value={value}
                      customInput={TextField}
                      label="Ponta *"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">kW</InputAdornment>
                        ),
                      }}
                      type="text"
                      allowNegative={false}
                      isAllowed={({ floatValue }) =>
                        !floatValue || floatValue <= 99999.99
                      }
                      placeholder='0'
                      decimalScale={2}
                      decimalSeparator=","
                      thousandSeparator={" "}
                      error={Boolean(error)}
                      helperText={error?.message ?? " "}
                      onValueChange={(values) => onChange(values.floatValue)}
                      onBlur={onBlur}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  control={control}
                  name="offPeakMeasuredDemandInKw"
                  rules={{ required: "Preencha este campo" }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <NumericFormat
                      value={value}
                      customInput={TextField}
                      label="Fora Ponta *"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">kW</InputAdornment>
                        ),
                      }}
                      type="text"
                      allowNegative={false}
                      isAllowed={({ floatValue }) =>
                        !floatValue || floatValue <= 99999.99
                      }
                      placeholder='0'
                      decimalScale={2}
                      decimalSeparator=","
                      thousandSeparator={" "}
                      error={!!error}
                      helperText={error?.message ?? " "}
                      onValueChange={(values) => onChange(values.floatValue)}
                      onBlur={onBlur}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={10}>
              <Typography variant='h5'>Consumo medido</Typography>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Controller
                  control={control}
                  name="peakConsumptionInKwh"
                  rules={{ required: "Preencha este campo" }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <NumericFormat
                      value={value}
                      customInput={TextField}
                      label="Ponta *"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">kWh</InputAdornment>
                        ),
                      }}
                      type="text"
                      allowNegative={false}
                      isAllowed={({ floatValue }) =>
                        !floatValue || floatValue <= 99999.99
                      }
                      decimalScale={2}
                      placeholder='0'
                      decimalSeparator=","
                      thousandSeparator={" "}
                      error={Boolean(error)}
                      helperText={error?.message ?? " "}
                      onValueChange={(values) => onChange(values.floatValue)}
                      onBlur={onBlur}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  control={control}
                  name="offPeakConsumptionInKwh"
                  rules={{ required: "Preencha este campo" }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <NumericFormat
                      value={value}
                      customInput={TextField}
                      label="Fora Ponta *"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">kWh</InputAdornment>
                        ),
                      }}
                      type="text"
                      allowNegative={false}
                      isAllowed={({ floatValue }) =>
                        !floatValue || floatValue <= 99999.99
                      }
                      placeholder='0'
                      decimalScale={2}
                      decimalSeparator=","
                      thousandSeparator={" "}
                      error={Boolean(error)}
                      helperText={error?.message ?? " "}
                      onValueChange={(values) => onChange(values.floatValue)}
                      onBlur={onBlur}
                    />
                  )}
                />
              </Grid>
            </Grid>
            {Object.keys(errors).length !== 0 &&
              <Grid item xs={8}>
                <Box mt={3} mb={3}>
                  <Alert icon={<LiveHelpIcon fontSize="inherit" />} severity="error">Corrija os erros acima antes de gravar</Alert>
                </Box>
              </Grid>
            }



            <Grid item xs={8}>
              <Button type="submit" variant="contained">
                <Box display='flex' justifyContent='space-around' alignItems='center'>
                  <TaskAltIcon />
                  Gravar
                </Box>
              </Button>

              <Button variant="text" onClick={handleCancelEdition}>
                Cancelar
              </Button>
            </Grid>

          </Grid>
          <FormWarningDialog
            entity='fatura'
            open={shouldShowCancelDialog}
            onClose={handleCloseDialog}
            onDiscard={handleDiscardForm}
          />
        </Box>

      </FormProvider>
    </FormDrawer>
  )
}

export default CreateEditElectricityBillForm;
