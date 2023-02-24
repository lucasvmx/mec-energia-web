import {
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
  selectActiveConsumerUnitId,
  selectEnergyBillParams,
  selectIsEnergyBillCreateFormOpen,
  selectIsEnergyBillEditFormOpen,
  setIsEnergyBillCreateFormOpen,
  setIsEnergyBillEdiFormOpen,
  setIsErrorNotificationOpen,
  setIsSucessNotificationOpen,
} from '../../../store/appSlice'
import FormDrawer from '../../Form/Drawer'
import { DatePicker } from '@mui/x-date-pickers'
import { NumericFormat } from "react-number-format";
import FormWarningDialog from '../../ConsumerUnit/Form/WarningDialog'
import { CreateAndEditEnergyBillForm, EditEnergyBillRequestPayload, PostEnergyBillRequestPayload } from '@/types/energyBill'
import InsightsIcon from '@mui/icons-material/Insights';
import { useEditInvoiceMutation, useGetConsumerUnitQuery, useGetContractQuery, useGetCurrentInvoiceQuery, useGetDistributorsQuery, usePostInvoiceMutation } from '@/api'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useSession } from 'next-auth/react'
import { DistributorPropsTariffs } from '@/types/distributor'
import { sendFormattedDate } from '@/utils/date'
import { FormErrorsAlert } from '@/components/Form/FormErrorsAlert'
import { SubmitButton } from '@/components/Form/SubmitButton'

const defaultValues: CreateAndEditEnergyBillForm = {
  date: new Date(),
  invoiceInReais: undefined,
  isIncludedInAnalysis: true,
  peakMeasuredDemandInKw: "",
  peakConsumptionInKwh: "",
  offPeakConsumptionInKwh: "",
}

const CreateEditEnergyBillForm = () => {
  const session = useSession()
  const dispatch = useDispatch();
  const isCreateEnergyBillFormOpen = useSelector(selectIsEnergyBillCreateFormOpen);
  const isEditEnergyBillFormOpen = useSelector(selectIsEnergyBillEditFormOpen)
  const { month, year, id: currentInvoiceId } = useSelector(selectEnergyBillParams)
  const activeConsumerUnitId = useSelector(selectActiveConsumerUnitId)
  const [shouldShowCancelDialog, setShouldShowCancelDialog] = useState(false);
  const [postInvoice, { isError: isPostInvoiceError, isSuccess: isPostInvoiceSuccess, isLoading: isPostInvoiceLoading }] = usePostInvoiceMutation()
  const [editInvoice, { isError: isEditInvoiceError, isSuccess: isEditInvoiceSuccess, isLoading: isEditInvoiceLoading }] = useEditInvoiceMutation()
  const { data: consumerUnit } = useGetConsumerUnitQuery(activeConsumerUnitId || skipToken)
  const { data: contract } = useGetContractQuery(activeConsumerUnitId || skipToken)
  const { data: distributors } = useGetDistributorsQuery(session.data?.user.universityId || skipToken)
  const { data: currentInvoice } = useGetCurrentInvoiceQuery(currentInvoiceId || skipToken)
  const [currentDistributor, setCurrentDistributor] = useState<DistributorPropsTariffs>()

  const form = useForm({ defaultValues })
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty, errors },
  } = form;

  const invoiceInReais = watch('invoiceInReais');
  const peakConsumptionInKwh = watch('peakConsumptionInKwh')
  const offPeakConsumptionInKwh = watch('offPeakConsumptionInKwh')
  const peakMeasuredDemandInKw = watch('peakMeasuredDemandInKw')
  const offPeakMeasuredDemandInKw = watch('offPeakMeasuredDemandInKw')

  useEffect(() => {
    if (month) {
      const date = new Date(`${year}-${month + 1}`)
      setValue("date", date)
    }
  })

  useEffect(() => {
    if (isCreateEnergyBillFormOpen) {
      setValue('invoiceInReais', "")
      setValue('peakConsumptionInKwh', "")
      setValue('offPeakConsumptionInKwh', "")
      setValue('peakMeasuredDemandInKw', "")
      setValue('offPeakMeasuredDemandInKw', "")
    }
    else if (isEditEnergyBillFormOpen) {
      setValue('invoiceInReais', currentInvoice?.invoiceInReais)
      setValue('peakConsumptionInKwh', currentInvoice?.peakConsumptionInKwh)
      setValue('offPeakConsumptionInKwh', currentInvoice?.offPeakConsumptionInKwh)
      setValue('peakMeasuredDemandInKw', currentInvoice?.peakMeasuredDemandInKw)
      setValue('offPeakMeasuredDemandInKw', currentInvoice?.offPeakMeasuredDemandInKw)
    }
  }, [currentInvoice?.invoiceInReais, currentInvoice?.offPeakConsumptionInKwh, currentInvoice?.offPeakMeasuredDemandInKw, currentInvoice?.peakConsumptionInKwh, currentInvoice?.peakMeasuredDemandInKw, isCreateEnergyBillFormOpen, isEditEnergyBillFormOpen, setValue])

  useEffect(() => {
    if (isEditEnergyBillFormOpen) {
      if (invoiceInReais === undefined) {
        setValue("invoiceInReais", "")
        return
      }
      if (peakConsumptionInKwh === undefined) {
        setValue("peakConsumptionInKwh", "")
        return
      }
      if (offPeakConsumptionInKwh === undefined) {
        setValue("offPeakConsumptionInKwh", "")
        return
      }
      if (peakMeasuredDemandInKw === undefined) {
        setValue("peakMeasuredDemandInKw", "")
        return
      }
      if (offPeakMeasuredDemandInKw === undefined) {
        setValue("offPeakMeasuredDemandInKw", "")
        return
      }
    }
  }, [invoiceInReais, isEditEnergyBillFormOpen, offPeakConsumptionInKwh, offPeakMeasuredDemandInKw, peakConsumptionInKwh, peakMeasuredDemandInKw, setValue])

  useEffect(() => {
    const ditributor = distributors?.find((distributor) => distributor.id === contract?.distributor)
    if (ditributor) setCurrentDistributor(ditributor)
  }, [contract?.distributor, distributors])

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
    if (isCreateEnergyBillFormOpen) dispatch(setIsEnergyBillCreateFormOpen(false));
    else dispatch(setIsEnergyBillEdiFormOpen(false));
  }

  const handleCloseDialog = () => {
    setShouldShowCancelDialog(false);
  }

  const onSubmitHandler: SubmitHandler<CreateAndEditEnergyBillForm> = async (data) => {
    const {
      date,
      isIncludedInAnalysis,
      invoiceInReais,
      offPeakConsumptionInKwh,
      offPeakMeasuredDemandInKw,
      peakConsumptionInKwh,
      peakMeasuredDemandInKw
    } = data;

    let body: PostEnergyBillRequestPayload | EditEnergyBillRequestPayload = {
      consumerUnit: consumerUnit?.id ?? 0,
      contract: contract?.id ?? 0,
      date: date ? sendFormattedDate(date) : '',
      isAtypical: !isIncludedInAnalysis,
      invoiceInReais: invoiceInReais as number,
      offPeakConsumptionInKwh: offPeakConsumptionInKwh as number,
      peakConsumptionInKwh: peakConsumptionInKwh as number,
      peakMeasuredDemandInKw: peakMeasuredDemandInKw as number,
      offPeakMeasuredDemandInKw: offPeakMeasuredDemandInKw as number,
    }

    if (isEditEnergyBillFormOpen) body = { ...body, id: currentInvoice?.id }

    if (isCreateEnergyBillFormOpen) await postInvoice(body)
    if (isEditEnergyBillFormOpen) await editInvoice(body as EditEnergyBillRequestPayload)
  }

  const handleNotification = useCallback(() => {
    if (isCreateEnergyBillFormOpen) {
      if (isPostInvoiceSuccess) {
        dispatch(setIsSucessNotificationOpen({
          isOpen: true,
          text: "Fatura lançada com sucesso!"
        }))
        reset();
        dispatch(setIsEnergyBillCreateFormOpen(false))
      }
      else if (isPostInvoiceError)
        dispatch(setIsErrorNotificationOpen({
          isOpen: true,
          text: "Erro ao lançar fatura!"
        }))
    }
    else if (isEditEnergyBillFormOpen) {
      if (isEditInvoiceSuccess) {
        dispatch(setIsSucessNotificationOpen({
          isOpen: true,
          text: "Fatura modificada com sucesso!"
        }))
        reset();
        dispatch(setIsEnergyBillEdiFormOpen(false))
      }
      else if (isEditInvoiceError)
        dispatch(setIsErrorNotificationOpen({
          isOpen: true,
          text: "Erro ao modificar fatura!"
        }))
    }
  }, [dispatch, isCreateEnergyBillFormOpen, isEditEnergyBillFormOpen, isEditInvoiceError, isEditInvoiceSuccess, isPostInvoiceError, isPostInvoiceSuccess, reset])

  useEffect(() => {
    handleNotification()
  }, [handleNotification, isPostInvoiceSuccess, isPostInvoiceError])

  return (
    <FormDrawer open={isCreateEnergyBillFormOpen || isEditEnergyBillFormOpen} handleCloseDrawer={
      handleCancelEdition
    }>
      <FormProvider {...form}>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography>
                {isCreateEnergyBillFormOpen ? 'Lançar' : 'Editar'} fatura
              </Typography>
              <Typography variant="h4">
                Campus Gama
              </Typography>
              <Typography>
                Un. Consumidora: {consumerUnit?.code}
              </Typography>
              <Typography>
                Distribuidora: {currentDistributor?.name}
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
                  name="isIncludedInAnalysis"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormGroup>
                      <Box >
                        {isCreateEnergyBillFormOpen &&
                          <Box display='flex' justifyContent='flex-start' alignItems='center'>
                            <InsightsIcon color='primary' />
                            <FormControlLabel
                              value="start"
                              label="Incluir na análise"
                              labelPlacement="start"
                              control={
                                <Switch
                                  value={value}
                                  defaultChecked
                                  onChange={onChange}
                                />
                              }
                            />
                          </Box>
                        }
                        {isEditEnergyBillFormOpen && currentInvoice &&
                          <Box display='flex' justifyContent='flex-start' alignItems='center'>
                            <InsightsIcon color='primary' />
                            <FormControlLabel
                              value="start"
                              label="Incluir na análise"
                              labelPlacement="start"
                              control={
                                <Switch
                                  value={value}
                                  defaultChecked={!currentInvoice?.isAtypical}
                                  onChange={onChange}
                                />
                              }
                            />
                          </Box>
                        }
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

            <FormErrorsAlert hasErrors={Object.keys(errors).length > 0 ? true : false} />

            <Grid item xs={8}>
              <SubmitButton isLoading={isPostInvoiceLoading || isEditInvoiceLoading} />

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

export default CreateEditEnergyBillForm;
