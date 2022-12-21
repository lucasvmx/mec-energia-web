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
import React, { useState } from 'react'
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectIsElectricityBillCreateFormOpen,
  selectIsElectricityBillEditFormOpen,
  setIsElectricityBillCreateFormOpen,
  setIsElectricityBillEdiFormOpen,
} from '../../../store/appSlice'
import FormDrawer from '../../Form/Drawer'
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { DatePicker } from '@mui/x-date-pickers'
import { NumericFormat } from "react-number-format";
import FormWarningDialog from '../../ConsumerUnit/Form/WarningDialog'
import { CreateAndEditElectricityBillForm } from '@/types/electricityBill'

const defaultValues: CreateAndEditElectricityBillForm = {
  month_reference: new Date(),
  amount: undefined,
  isAtypical: false,
  measured_demand: undefined,
  measured_consumption_peak: undefined,
  measured_consumption_off_peak: undefined,
}

const CreateEditElectricityBillForm = () => {
  const dispatch = useDispatch();
  const isCreateElectricityBillFormOpen = useSelector(selectIsElectricityBillCreateFormOpen);
  const isEditElectricityBillFormOpen = useSelector(selectIsElectricityBillEditFormOpen)
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
    if (isCreateElectricityBillFormOpen) dispatch(setIsElectricityBillCreateFormOpen(false));
    else dispatch(setIsElectricityBillEdiFormOpen(false));
  }

  const handleCloseDialog = () => {
    setShouldShowCancelDialog(false);
  }

  const onSubmitHandler: SubmitHandler<CreateAndEditElectricityBillForm> = (data) => {
    console.log(data);
  }

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
            <Grid item xs={8}>
              <Controller
                control={control}
                name="month_reference"
                rules={{
                  required: "Já existe uma fatura lançada neste mês",
                  validate: () => true,
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <DatePicker
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

              <Controller
                control={control}
                name={"amount"}
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
                    label="Valor total"
                    helperText={error?.message ?? " "}
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

            <Grid item xs={8}>

              <Controller
                name="isAtypical"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormGroup>
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

                    <FormHelperText>
                      <p>Inclua todas as faturas, exceto casos radicalemente excepcionais como greves ou a pandemia</p>
                    </FormHelperText>
                  </FormGroup>
                )}
              />

            </Grid>

            <Grid item xs={8}>
              <Typography variant='h5'>Demanda medida</Typography>
            </Grid>

            <Grid item xs={4.5}>

              <Controller
                control={control}
                name="measured_demand"
                rules={{ required: "Preencha este campo" }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value}
                    customInput={TextField}
                    label="Demanda *"
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

            <Grid item xs={10}>
              <Typography variant='h5'>Consumo Medido</Typography>
            </Grid>


            <Grid item xs={4.5}>

              <Controller
                control={control}
                name="measured_consumption_peak"
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
                    decimalSeparator=","
                    thousandSeparator={" "}
                    error={Boolean(error)}
                    helperText={error?.message ?? " "}
                    onValueChange={(values) => onChange(values.floatValue)}
                    onBlur={onBlur}
                  />
                )}
              />

              <Controller
                control={control}
                name="measured_consumption_off_peak"
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

            <Grid item xs={8}>
              <Box mt={3} mb={3}>
                <Alert icon={<LiveHelpIcon fontSize="inherit" />} severity="error">Corrija os erros acima antes de gravar</Alert>
              </Box>
            </Grid>


            <Grid item xs={8}>
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

export default CreateEditElectricityBillForm;
