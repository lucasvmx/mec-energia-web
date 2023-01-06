import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { NumericFormat } from "react-number-format";

import {
  selectIsConsumerUnitCreateFormOpen,
  setIsConsumerUnitCreateFormOpen,
} from "../../../store/appSlice";
import FormDrawer from "../../Form/Drawer";
import { CreateConsumerUnitForm } from "../../../types/consumerUnit";
import FormWarningDialog from "./WarningDialog";
import { isAfter, isFuture, isValid } from "date-fns";
import { useGetDistributorsQuery, useGetSubgroupsQuery } from "@/api";
import { Subgroup } from "@/types/subgroups";
import { useSession } from "next-auth/react";

const defaultValues: CreateConsumerUnitForm = {
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

const ConsumerUnitCreateForm = () => {
  const { data: session } = useSession()
  const dispatch = useDispatch();
  const isCreateFormOpen = useSelector(selectIsConsumerUnitCreateFormOpen);
  const [shouldShowCancelDialog, setShouldShowCancelDialog] = useState(false);
  const { data: subgroupsList } = useGetSubgroupsQuery()
  const { data: distributorList } = useGetDistributorsQuery(session?.user?.university_id || 0)
  const form = useForm({ mode: "all", defaultValues });
  console.log("Distribuidoras", distributorList)

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
  }, [setValue, tariffType]);

  const isValidDate = (date: CreateConsumerUnitForm["startDate"]) => {
    if (!date || !isValid(date)) {
      return "Insira uma data válida no formato dd/mm/aaaa";
    }

    if (isFuture(date)) {
      return "Datas futuras não são permitidas";
    }

    if (!isAfter(date, new Date("2010"))) {
      return "Datas antes de 2010 não são permitidas";
    }

    return true;
  };

  const handleSugroups = (supplied: CreateConsumerUnitForm['supplied']) => {
    const subgroups = subgroupsList?.subgroups;
    const isValidValue = subgroups?.some((subgroup: Subgroup) => supplied >= subgroup.min && supplied <= subgroup.max)
    if (!isValidValue) {
      return "Insira um valor conforme os intervalos ao lado"
    }
    return true
  }

  const handleCaractereLength = (value: CreateConsumerUnitForm['code'] | CreateConsumerUnitForm['title']) => {
    if (value.length < 3) return "Insira ao menos 3 caracteres"
    return true
  }

  const handleValueGreaterThenZero = (value: CreateConsumerUnitForm['peakContracted'] | CreateConsumerUnitForm['outOfPeakContracted']) => {
    if (value <= 0) return 'Insira um valor maior que 0'
  }

  const handleCloseDialog = () => {
    setShouldShowCancelDialog(false);
  };

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
    dispatch(setIsConsumerUnitCreateFormOpen(false));
  };

  const onSubmitHandler: SubmitHandler<CreateConsumerUnitForm> = (data) => {
    console.log(data);
  };

  const getSubgroupsText = () => {
    return <Box p={1}>
      <p>- {subgroupsList?.subgroups[0].max.toLocaleString('pt-BR')} kV ou inferior</p>
      <p>
        - De {subgroupsList?.subgroups[1].min.toLocaleString('pt-BR')} kV a {subgroupsList?.subgroups[1].max.toLocaleString('pt-BR')} kV
      </p>
      <p>
        - De {subgroupsList?.subgroups[2].min.toLocaleString('pt-BR')} kV a {subgroupsList?.subgroups[2].max.toLocaleString('pt-BR')} kV
      </p>
      <p>
        - {subgroupsList?.subgroups[3].min.toLocaleString('pt-BR')} kV
      </p>
      <p>
        - De {subgroupsList?.subgroups[4].min.toLocaleString('pt-BR')} kV a {subgroupsList?.subgroups[4].max.toLocaleString('pt-BR')} kV
      </p>
    </Box>

  }

  return (
    <FormDrawer open={isCreateFormOpen} handleCloseDrawer={handleCancelEdition}>
      <FormProvider {...form}>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">
                Adicionar Unidade Consumidora
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>* campos obrigatórios</Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="title"
                rules={{
                  required: "Preencha este campo",
                  validate: handleCaractereLength
                }}
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <TextField
                    ref={ref}
                    value={value}
                    label="Nome *"
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
                rules={{
                  required: "Preencha este campo",
                  validate: handleCaractereLength
                }}
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

            <Grid item xs={12}>
              <Controller
                control={control}
                name="supplier"
                rules={{ required: "Preencha este campo" }}
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <FormControl
                    sx={{ minWidth: "200px", maxWidth: "100%" }}
                    error={!!error}
                  >
                    <InputLabel>Distribuidora *</InputLabel>

                    <Select
                      ref={ref}
                      value={value}
                      label="Distribuidora *"
                      autoWidth
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                      }}
                      onChange={onChange}
                      onBlur={onBlur}
                    >
                      <MenuItem value="a">
                        Distribuidora com um nome longo pra chegar ultrapassar o
                        limite do container
                      </MenuItem>
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
                rules={{
                  required: "Insira uma data válida no formato dd/mm/aaaa",
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

            <Tooltip
              title={getSubgroupsText()}
              arrow
              placement="right"
              sx={{ color: 'red' }}
            >
              <Grid item xs={8} sm={6}>
                <Controller
                  control={control}
                  name={"supplied"}
                  rules={{
                    required: "Preencha este campo",
                    validate: handleSugroups
                  }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (

                    <NumericFormat
                      value={value}
                      customInput={TextField}
                      label="Tensão de fornecimento *"
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
            </Tooltip>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="tariffType"
                rules={{ required: "Preencha este campo" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl error={!!error}>
                    <FormLabel>Modalidade tarifária *</FormLabel>

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
                  rules={{ required: "Preencha este campo" }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <NumericFormat
                      value={value}
                      customInput={TextField}
                      label="Demanda contratada *"
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
            ) : (
              <Box>
                <Grid item xs={8}>
                  <Controller
                    control={control}
                    name="peakContracted"
                    rules={{
                      required: "Preencha este campo",
                      validate: handleValueGreaterThenZero
                    }}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <NumericFormat
                        value={value}
                        customInput={TextField}
                        label="Demanda contratada — Ponta *"
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

                <Grid item xs={8}>
                  <Controller
                    control={control}
                    name="outOfPeakContracted"
                    rules={{
                      required: "Preencha este campo",
                      validate: handleValueGreaterThenZero
                    }}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <NumericFormat
                        value={value}
                        customInput={TextField}
                        label="Demanda contratada — Fora Ponta *"
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
              </Box>
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
            open={shouldShowCancelDialog}
            onClose={handleCloseDialog}
            onDiscard={handleDiscardForm}
          />
        </Box>
      </FormProvider>
    </FormDrawer >
  );
};

export default ConsumerUnitCreateForm;
