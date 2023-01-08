import { useCallback, useEffect, useState } from "react";
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
import { CreateConsumerUnitForm, CreateConsumerUnitRequestPayload } from "../../../types/consumerUnit";
import FormWarningDialog from "./WarningDialog";
import { isAfter, isFuture, isValid } from "date-fns";
import { useCreateConsumerUnitMutation, useGetDistributorsQuery, useGetSubgroupsQuery } from "@/api";
import { Subgroup } from "@/types/subgroups";
import { useSession } from "next-auth/react";
import DistributorCreateFormDialog from "@/components/Distributor/Form/CreateForm";
import SucessNotification from "@/components/Notification/SucessNotification";
import FailNotification from "@/components/Notification/FailNotification";
import { DistributorPropsTariffs } from "@/types/distributor";

const defaultValues: CreateConsumerUnitForm = {
  title: "",
  code: "",
  distributor: "",
  startDate: null,
  supplyVoltage: "",
  tariffFlag: "G",
  contracted: "",
  peakContractedDemandInKw: "",
  offPeakContractedDemandInKw: "",
};

const ConsumerUnitCreateForm = () => {
  //Sessão
  const { data: session } = useSession()

  //Redux
  const dispatch = useDispatch();
  const isCreateFormOpen = useSelector(selectIsConsumerUnitCreateFormOpen);

  //Requisições Redux Query
  const { data: subgroupsList } = useGetSubgroupsQuery()
  const { data: distributorList } = useGetDistributorsQuery(session?.user?.university_id || 0)
  const [createConsumerUnit, { status, isError, isSuccess }] = useCreateConsumerUnitMutation()

  //Estados
  const [shouldShowCancelDialog, setShouldShowCancelDialog] = useState(false);
  const [shouldShowDistributoFormDialog, setShouldShowDistributoFormDialog] = useState(false);
  const [openSucessNotification, setOpenSucessNotification] = useState(false)
  const [openFailNotification, setOpenFailNotification] = useState(false)

  //Formulário
  const form = useForm({ mode: "all", defaultValues });
  const {
    control,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty },
  } = form;

  const tariffFlag = watch("tariffFlag");

  useEffect(() => {
    const { contracted, peakContractedDemandInKw, offPeakContractedDemandInKw } = defaultValues;

    setValue("contracted", contracted);
    setValue("peakContractedDemandInKw", peakContractedDemandInKw);
    setValue("offPeakContractedDemandInKw", offPeakContractedDemandInKw);
  }, [setValue, tariffFlag]);


  // Validações de Formulário
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

  const isInSomeSugroups = (supplied: CreateConsumerUnitForm['supplyVoltage']) => {
    const subgroups = subgroupsList?.subgroups;
    const isValidValue = subgroups?.some((subgroup: Subgroup) => supplied >= subgroup.min && supplied <= subgroup.max)
    if (!isValidValue) {
      return "Insira um valor conforme os intervalos ao lado"
    }
    return true
  }

  const hasEnoughCaracteresLength = (value: CreateConsumerUnitForm['code'] | CreateConsumerUnitForm['title']) => {
    if (value.length < 3) return "Insira ao menos 3 caracteres"
    return true
  }

  const isValueGreaterThenZero = (value: CreateConsumerUnitForm['peakContractedDemandInKw'] | CreateConsumerUnitForm['offPeakContractedDemandInKw']) => {
    if (value <= 0) return 'Insira um valor maior que 0'
  }


  // Modal
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

  // Submissão de Formulário
  const onSubmitHandler: SubmitHandler<CreateConsumerUnitForm> = useCallback(async (data) => {
    if (data.tariffFlag === 'G') {
      data.offPeakContractedDemandInKw = data.contracted;
      data.peakContractedDemandInKw = data.contracted;
    }
    const body: CreateConsumerUnitRequestPayload = {
      consumerUnit: {
        name: data.title,
        code: data.code,
        isActive: true,
        university: session?.user.university_id || 0
      },
      contract: {
        startDate: `${data.startDate?.getFullYear()}-${data.startDate?.getMonth()}-${data.startDate?.getDate()}` as unknown as Date,
        tariffFlag: data.tariffFlag,
        peakContractedDemandInKw: data.peakContractedDemandInKw as number,
        offPeakContractedDemandInKw: data.offPeakContractedDemandInKw as number,
        supplyVoltage: data.supplyVoltage as number,
        distributor: data.distributor
      }
    }
    await createConsumerUnit(body)
  }, [createConsumerUnit, session?.user.university_id]);



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

  // Notificações

  const handleNotification = useCallback(() => {
    if (isSuccess) {
      setOpenSucessNotification(true);
      reset();
      setTimeout(() => dispatch(setIsConsumerUnitCreateFormOpen(false)), 6000)
    }
    else if (isError) setOpenFailNotification(true);
  }, [dispatch, isError, isSuccess, reset])

  useEffect(() => {
    handleNotification()
  }, [handleNotification, isSuccess, isError, status])

  const handleCloseDistributorFomrDialog = () => {
    setShouldShowDistributoFormDialog(false)
  }

  const handleCloseNotification = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFailNotification(false)
    setOpenSucessNotification(false);
  };

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
                  validate: hasEnoughCaracteresLength
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
              <Typography variant="h5">Contrato</Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="code"
                rules={{
                  required: "Preencha este campo",
                  validate: hasEnoughCaracteresLength
                }}
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <TextField
                    ref={ref}
                    value={value}
                    label="Número da Unidade *"
                    placeholder="Número da Unidade Consumidora conforme a fatura"
                    error={Boolean(error)}
                    helperText={error?.message ?? "Nº ou código da Unidade Consumidora conforme a fatura"}
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
                name="distributor"
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
                      {distributorList?.map((distributor: DistributorPropsTariffs) => {
                        return (
                          <MenuItem key={distributor.id} value={distributor.id}>{distributor.name}</MenuItem>
                        )
                      })}
                      <MenuItem>
                        <Button
                          onClick={() => setShouldShowDistributoFormDialog(true)}>
                          Adicionar
                        </Button>
                      </MenuItem>
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

            <Tooltip
              title={getSubgroupsText()}
              arrow
              placement="right"
              sx={{ color: 'red' }}
            >
              <Grid item xs={8} sm={6}>
                <Controller
                  control={control}
                  name={"supplyVoltage"}
                  rules={{
                    required: "Preencha este campo",
                    validate: isInSomeSugroups
                  }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (

                    <NumericFormat
                      value={value}
                      customInput={TextField}
                      label="Tensão constratada *"
                      helperText={error?.message ?? "Se preciso, converta a tensão de V para kV dividindo o valor por 1.000."}
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
              <Typography variant="h5">Demanda Contratada</Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="tariffFlag"
                rules={{ required: "Preencha este campo" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl error={!!error}>
                    <FormLabel>Modalidade tarifária *</FormLabel>

                    <RadioGroup value={value} onChange={onChange}>
                      <Box display={"flex"} justifyContent='flex-start' alignItems='center'>
                        <FormControlLabel
                          value="G"
                          control={<Radio />}
                          label="Verde"
                        />
                        <FormHelperText>(Demanda única)</FormHelperText>
                      </Box>
                      <Box display={"flex"} justifyContent='flex-start' alignItems='center'>
                        <FormControlLabel
                          value="B"
                          control={<Radio />}
                          label="Azul"
                        />
                        <FormHelperText>(Demanda de ponta e fora ponta)</FormHelperText>
                      </Box>
                    </RadioGroup>

                    <FormHelperText>{error?.message ?? " "}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            {tariffFlag === "G" ? (
              <Grid item xs={7}>
                <Controller
                  control={control}
                  name="contracted"
                  rules={{
                    required: "Preencha este campo",
                    validate: isValueGreaterThenZero
                  }}
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
                    name="peakContractedDemandInKw"
                    rules={{
                      required: "Preencha este campo",
                      validate: isValueGreaterThenZero
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
                    name="offPeakContractedDemandInKw"
                    rules={{
                      required: "Preencha este campo",
                      validate: isValueGreaterThenZero
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
            entity={'unidade consumidora'}
            onClose={handleCloseDialog}
            onDiscard={handleDiscardForm}
          />

          <DistributorCreateFormDialog
            open={shouldShowDistributoFormDialog}
            onClose={handleCloseDistributorFomrDialog}
          />

          <SucessNotification
            open={openSucessNotification}
            message={"Unidade Consumidora adicionada com sucesso!"}
            handleClose={handleCloseNotification}
          />

          <FailNotification
            open={openFailNotification}
            message={"Erro ao adicionar unidade consumidora. Verifique se essa unidade já existe!"}
            handleClose={handleCloseNotification}
          />
        </Box>
      </FormProvider>

    </FormDrawer >
  );
};

export default ConsumerUnitCreateForm;
