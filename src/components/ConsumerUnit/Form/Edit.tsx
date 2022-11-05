import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import {
  selectIsConsumerUnitEditFormOpen,
  setIsConsumerUnitEditFormOpen,
} from "../../../store/appSlice";
import FormDrawer from "../../Form/Drawer";
import { EditConsumerUnitForm } from "../../../types/consumerUnit";
import FormWarningDialog from "./WarningDialog";

const defaultValues: EditConsumerUnitForm = {
  isActive: true,
  title: "",
  code: "",
  supplier: "",
  startDate: null,
  supplied: "",
  tariffType: "green",
  contracted: "",
  peakContracted: "",
  outOfPeakContracted: "",
};

const ConsumerUnitEditForm = () => {
  const dispatch = useDispatch();
  const isEditFormOpen = useSelector(selectIsConsumerUnitEditFormOpen);
  const [shouldOpenDiscardDialog, setShouldOpenDiscardDialog] = useState(false);

  const form = useForm({ defaultValues });

  const {
    control,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty },
  } = form;

  const tariffType = watch("tariffType");

  useEffect(() => {
    const { contracted, peakContracted, outOfPeakContracted } = defaultValues;

    setValue("contracted", contracted);
    setValue("peakContracted", peakContracted);
    setValue("outOfPeakContracted", outOfPeakContracted);
  }, [tariffType]);

  const handleCloseDialog = () => {
    setShouldOpenDiscardDialog(false);
  };

  const handleCancelEdition = () => {
    if (isDirty) {
      setShouldOpenDiscardDialog(true);
      return;
    }

    handleDiscardForm();
  };

  const handleDiscardForm = () => {
    handleCloseDialog();
    reset();
    dispatch(setIsConsumerUnitEditFormOpen(false));
  };

  const onSubmitHandler: SubmitHandler<EditConsumerUnitForm> = (data) => {
    console.log(data);
  };

  return (
    <FormDrawer open={isEditFormOpen} handleCloseDrawer={handleCancelEdition}>
      <FormProvider {...form}>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Editar Unidade Consumidora</Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="isActive"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          value={value}
                          defaultChecked
                          onChange={onChange}
                        />
                      }
                      label="Unidade ativa"
                    />

                    <FormHelperText>
                      Unidades desativadas não recebem faturas e não geram
                      recomendações. Não é possível excluir unidades
                      consumidoras, apenas desativá-las.
                    </FormHelperText>
                  </FormGroup>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="title"
                rules={{ required: "Campo obrigatório" }}
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <TextField
                    ref={ref}
                    value={value}
                    label="Nome"
                    placeholder="Ex.: Campus Gama, Biblioteca, Faculdade de Medicina"
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
                name="code"
                rules={{ required: "Campo obrigatório" }}
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <TextField
                    ref={ref}
                    value={value}
                    label="Código *"
                    placeholder="Número da Unidade Consumidora conforme a fatura"
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
              <Typography variant="h5">Contrato</Typography>
            </Grid>

            <Grid item xs={12} pb={1}>
              <Alert severity="warning">
                Modifique o contrato apenas em caso de erro de digitação. Para
                alterações legais ou novo contrato, use a opção{" "}
                <strong>Renovar</strong> na tela anterior.
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="supplier"
                rules={{ required: "Campo obrigatório" }}
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth error={!!error}>
                    <InputLabel>Distribuidora *</InputLabel>

                    <Select
                      ref={ref}
                      value={value}
                      label="Distribuidora *"
                      onChange={onChange}
                      onBlur={onBlur}
                    >
                      <MenuItem value="a">Distribuidora A</MenuItem>
                      <MenuItem value="b">Distribuidora B</MenuItem>
                    </Select>

                    <FormHelperText>{error?.message ?? " "}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="startDate"
                rules={{ required: "Campo obrigatório" }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <DatePicker
                    value={value}
                    views={["year", "month"]}
                    openTo="year"
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
            <Grid item xs={8} sm={6}>
              <Controller
                control={control}
                name={"supplied"}
                rules={{ required: "Campo obrigatório" }}
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    value={value}
                    customInput={TextField}
                    label="Tensão de fornecimento"
                    helperText={error?.message ?? " "}
                    error={!!error}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">kV</InputAdornment>
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
              <Controller
                control={control}
                name="tariffType"
                rules={{ required: "Campo obrigatório" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl error={!!error}>
                    <FormLabel>Modalidade tarifária</FormLabel>

                    <RadioGroup value={value} row onChange={onChange}>
                      <FormControlLabel
                        value="green"
                        control={<Radio />}
                        label="Verde"
                      />
                      <FormControlLabel
                        value="blue"
                        control={<Radio />}
                        label="Azul"
                      />
                    </RadioGroup>

                    <FormHelperText>{error?.message ?? " "}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            {tariffType === "green" ? (
              <Grid item xs={7}>
                <Controller
                  control={control}
                  name="contracted"
                  rules={{ required: "Campo obrigatório" }}
                  render={({
                    field: { onChange, onBlur, value, ref },
                    fieldState: { error },
                  }) => (
                    <NumericFormat
                      value={value}
                      customInput={TextField}
                      label="Demanda contratada"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">kW</InputAdornment>
                        ),
                      }}
                      type="text"
                      allowNegative={false}
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
            ) : (
              <>
                <Grid item xs={7}>
                  <Controller
                    control={control}
                    name="peakContracted"
                    rules={{ required: "Campo obrigatório" }}
                    render={({
                      field: { onChange, onBlur, value, ref },
                      fieldState: { error },
                    }) => (
                      <NumericFormat
                        value={value}
                        customInput={TextField}
                        label="Demanda contratada — Ponta"
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">kW</InputAdornment>
                          ),
                        }}
                        type="text"
                        allowNegative={false}
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

                <Grid item xs={7}>
                  <Controller
                    control={control}
                    name="outOfPeakContracted"
                    rules={{ required: "Campo obrigatório" }}
                    render={({
                      field: { onChange, onBlur, value, ref },
                      fieldState: { error },
                    }) => (
                      <NumericFormat
                        value={value}
                        customInput={TextField}
                        label="Demanda contratada — Fora Ponta"
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">kW</InputAdornment>
                          ),
                        }}
                        type="text"
                        allowNegative={false}
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
              </>
            )}
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
            open={shouldOpenDiscardDialog}
            onClose={handleCloseDialog}
            onDiscard={handleDiscardForm}
          />
        </Box>
      </FormProvider>
    </FormDrawer>
  );
};

export default ConsumerUnitEditForm;
